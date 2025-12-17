import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field, ID, Int } from 'type-graphql';

@ObjectType()
@Entity('traffic_cache')
export class TrafficCache {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => String)
  @Column('text')
  data_source!: string;

  @Field(() => String)
  @Column('text')
  cached_response!: string;

  @Field(() => Int)
  @Column('int')
  cached_at!: number;

  @Field(() => Int)
  @Column('int')
  expires_at!: number;
}
