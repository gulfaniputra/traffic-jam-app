import { Resolver, Query } from 'type-graphql';
import { TrafficSegment, TrafficInsight, TrafficCache } from './types';
import db from '../db';

@Resolver(() => TrafficSegment)
export class TrafficSegmentResolver {
  @Query(() => [TrafficSegment], { description: 'Get all traffic segments' })
  async trafficSegments(): Promise<TrafficSegment[]> {
    const rows = db.prepare('SELECT * FROM traffic_segments').all();
    return rows.map(row => Object.assign(new TrafficSegment(), row));
  }
}

@Resolver(() => TrafficInsight)
export class TrafficInsightResolver {
  @Query(() => [TrafficInsight], { description: 'Get all traffic insights' })
  async trafficInsights(): Promise<TrafficInsight[]> {
    const rows = db.prepare('SELECT * FROM traffic_insights').all();
    return rows.map(row => Object.assign(new TrafficInsight(), row));
  }
}

@Resolver(() => TrafficCache)
export class TrafficCacheResolver {
  @Query(() => [TrafficCache], { description: 'Get all traffic caches' })
  async trafficCaches(): Promise<TrafficCache[]> {
    const rows = db.prepare('SELECT * FROM traffic_cache').all();
    return rows.map(row => Object.assign(new TrafficCache(), row));
  }
}
