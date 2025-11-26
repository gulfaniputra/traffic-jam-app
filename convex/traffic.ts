// convex/traffic.ts
/*
IMPORTANT: This backend logic requires a Google Maps API key with the "Directions API" enabled.
You must create a .env file in the convex/ directory (i.e., /convex/.env) and add the following line:
GOOGLE_MAPS_API_KEY="YOUR_API_KEY_HERE"

You can get an API key from the Google Cloud Console: https://console.cloud.google.com/
*/

import {
  query,
  internalAction,
  internalMutation,
} from './_generated/server';
import { v } from 'convex/values';
import { api, internal } from './_generated/api';
import { BALIKPAPAN_ROAD_SEGMENTS } from './lib/balikpapan_roads';

// =================================================================================
// PUBLIC QUERIES (for frontend)
// =================================================================================

// Query: Get the latest traffic insights for the Insights tab.
export const getLatestInsights = query({
  args: {},
  handler: async (ctx) => {
    const latestInsight = await ctx.db
      .query('traffic_insights')
      .order('desc')
      .first();
    return latestInsight;
  },
});

// Query: Get all traffic data for the map.
export const getTrafficData = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('traffic_segments').collect();
  },
});

// =================================================================================
// INTERNAL ACTIONS & MUTATIONS (for cron job)
// =================================================================================

// INTERNAL ACTION: Main entry point for the cron job.
// Orchestrates fetching data for all segments and then generating insights.
export const updateAllTrafficData = internalAction({
  handler: async ctx => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.error(
        'GOOGLE_MAPS_API_KEY is not set in environment variables. Skipping traffic update.'
      );
      return;
    }

    // Fan out and fetch data for all road segments in parallel.
    await Promise.all(
      BALIKPAPAN_ROAD_SEGMENTS.map(segment =>
        ctx.scheduler.runAfter(
          0,
          internal.traffic.fetchAndProcessSegment,
          { segment }
        )
      )
    );

    // After a short delay to allow segments to be processed, generate the insight.
    await ctx.scheduler.runAfter(
      60000, // 60-second delay to ensure segments are written
      internal.traffic.generateAndStoreInsights,
      {}
    );
  },
});

// INTERNAL ACTION: Fetches data for a single road segment from Google Maps API.
export const fetchAndProcessSegment = internalAction({
  args: {
    segment: v.object({
      name: v.string(),
      area: v.string(),
      start: v.object({ lat: v.number(), lng: v.number() }),
      end: v.object({ lat: v.number(), lng: v.number() }),
    }),
  },
  handler: async (ctx, { segment }) => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY!;
    const origin = `${segment.start.lat},${segment.start.lng}`;
    const destination = `${segment.end.lat},${segment.end.lng}`;
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&departure_time=now&key=${apiKey}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Google Maps API request failed: ${response.statusText}`);
      }
      const data = await response.json();

      if (data.status !== 'OK' || !data.routes[0]?.legs[0]) {
        console.warn(`No route found for segment: ${segment.name} (${segment.area})`);
        return;
      }

      const leg = data.routes[0].legs[0];
      const durationInTraffic = leg.duration_in_traffic.value; // seconds
      const durationWithoutTraffic = leg.duration.value; // seconds

      // Calculate congestion score. Score > 0 indicates congestion.
      const congestionScore =
        durationWithoutTraffic > 0
          ? (durationInTraffic - durationWithoutTraffic) / durationWithoutTraffic
          : 0;

      // Classify congestion level
      const congestionLevel = getCongestionLevel(congestionScore);

      // Call the internal mutation to upsert the data into the database.
      await ctx.runMutation(internal.traffic.upsertTrafficSegment, {
        road_name: segment.name,
        area_name: segment.area,
        congestion_score: parseFloat(congestionScore.toFixed(2)),
        congestion_level: congestionLevel,
        latitude: segment.start.lat,
        longitude: segment.start.lng,
        updated_at: Date.now(),
      });
    } catch (error) {
      console.error(
        `Failed to fetch or process traffic data for ${segment.name}:`,
        error
      );
    }
  },
});

// INTERNAL MUTATION: Generates and stores the top 5 insights.
export const generateAndStoreInsights = internalMutation({
  handler: async ctx => {
    const fifteenMinutesAgo = Date.now() - 15 * 60 * 1000;

    // Get all segments updated in the last 15 minutes.
    const recentSegments = await ctx.db
      .query('traffic_segments')
      .filter(q => q.gt(q.field('updated_at'), fifteenMinutesAgo))
      .order('desc')
      .collect();

    if (recentSegments.length === 0) {
      console.warn('No recent segments found to generate insights.');
      return;
    }

    // Sort by congestion score and take the top 5.
    const top5 = recentSegments
      .sort((a, b) => b.congestion_score - a.congestion_score)
      .slice(0, 5);

    const totalScore = recentSegments.reduce(
      (sum, s) => sum + s.congestion_score,
      0
    );
    const averageScore = totalScore / recentSegments.length;

    // Insert the new insight into the database.
    await ctx.db.insert('traffic_insights', {
      generated_at: Date.now(),
      summary: `Top 5 congested roads in the last 15 minutes. Average congestion score: ${averageScore.toFixed(2)}.`,
      top_congested_roads: top5.map(s => ({
        road_name: s.road_name,
        area_name: s.area_name,
        congestion_score: s.congestion_score,
      })),
      average_congestion_score: parseFloat(averageScore.toFixed(2)),
    });
  },
});

// INTERNAL MUTATION: Upserts a traffic segment into the database.
export const upsertTrafficSegment = internalMutation({
  args: {
    road_name: v.string(),
    area_name: v.string(),
    congestion_score: v.number(),
    congestion_level: v.string(),
    latitude: v.number(),
    longitude: v.number(),
    updated_at: v.number(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query('traffic_segments')
      .withIndex('by_road_name', q => q.eq('road_name', args.road_name))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, args);
    } else {
      await ctx.db.insert('traffic_segments', args);
    }
  },
});

// =================================================================================
// HELPER FUNCTIONS
// =================================================================================

function getCongestionLevel(score: number): string {
  if (score < 0.1) return 'Low';
  if (score < 0.4) return 'Medium';
  if (score < 0.8) return 'High';
  return 'Very High';
}