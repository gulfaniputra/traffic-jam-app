import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  traffic_segments: defineTable(
    v.object({
      road_name: v.string(),
      area_name: v.string(),
      congestion_score: v.number(),
      congestion_level: v.string(),
      latitude: v.number(),
      longitude: v.number(),
      updated_at: v.number(), // Unix timestamp (ms)
    })
  ).index('by_road_name', ['road_name']),
  traffic_insights: defineTable(
    v.object({
      generated_at: v.number(), // Unix timestamp (ms)
      summary: v.string(),
      top_congested_roads: v.array(
        v.object({
          road_name: v.string(),
          area_name: v.string(),
          congestion_score: v.number(),
        })
      ), // Array of road objects
      average_congestion_score: v.number(),
    })
  ),
  traffic_cache: defineTable(
    v.object({
      data_source: v.string(),
      cached_response: v.string(), // Stored as a JSON string
      cached_at: v.number(),
      expires_at: v.number(),
    })
  ),
});
