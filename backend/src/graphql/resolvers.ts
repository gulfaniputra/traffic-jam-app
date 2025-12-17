import { Resolver, Query } from 'type-graphql';
import { TrafficSegment } from '../entities/TrafficSegment';
import { TrafficInsight } from '../entities/TrafficInsight';
import { TrafficCache } from '../entities/TrafficCache';
import { AppDataSource } from '../data-source';

@Resolver(() => TrafficSegment)
export class TrafficSegmentResolver {
  @Query(() => [TrafficSegment], { description: 'Get all traffic segments' })
  async trafficSegments(): Promise<TrafficSegment[]> {
    return AppDataSource.getRepository(TrafficSegment).find();
  }
}

@Resolver(() => TrafficInsight)
export class TrafficInsightResolver {
  @Query(() => [TrafficInsight], { description: 'Get all traffic insights' })
  async trafficInsights(): Promise<TrafficInsight[]> {
    return AppDataSource.getRepository(TrafficInsight).find();
  }
}

@Resolver(() => TrafficCache)
export class TrafficCacheResolver {
  @Query(() => [TrafficCache], { description: 'Get all traffic caches' })
  async trafficCaches(): Promise<TrafficCache[]> {
    return AppDataSource.getRepository(TrafficCache).find();
  }
}
