import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field, ID, Int, Float } from 'type-graphql';
import { TrafficSegment } from './TrafficSegment';

@ObjectType()
@Entity('traffic_insights')
export class TrafficInsight {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => Int)
  @Column('int')
  generated_at!: number;

  @Field(() => String)
  @Column('text')
  summary!: string;

  @Field(() => [TrafficSegment])
  @Column('simple-json')
  top_congested_roads!: TrafficSegment[];

  @Field(() => Float)
  @Column('float')
  average_congestion_score!: number;
}
