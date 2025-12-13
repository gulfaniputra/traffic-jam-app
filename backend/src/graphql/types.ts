import { ObjectType, Field, Float, Int, ID } from 'type-graphql';

@ObjectType()
export class TrafficSegment {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  road_name!: string;

  @Field(() => String)
  area_name!: string;

  @Field(() => Float)
  congestion_score!: number;

  @Field(() => String)
  congestion_level!: string;

  @Field(() => Float)
  latitude!: number;

  @Field(() => Float)
  longitude!: number;

  @Field(() => Int)
  updated_at!: number;
}

@ObjectType()
export class TrafficInsight {
  @Field(() => ID)
  id!: string;

  @Field(() => Int)
  generated_at!: number;

  @Field(() => String)
  summary!: string;

  @Field(() => [TrafficSegment])
  top_congested_roads!: TrafficSegment[];

  @Field(() => Float)
  average_congestion_score!: number;
}

@ObjectType()
export class TrafficCache {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  data_source!: string;

  @Field(() => String)
  cached_response!: string;

  @Field(() => Int)
  cached_at!: number;

  @Field(() => Int)
  expires_at!: number;
}
