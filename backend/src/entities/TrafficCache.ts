import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ObjectType, Field, ID, Float } from "type-graphql";

@ObjectType()
@Entity("traffic_cache")
export class TrafficCache {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field(() => String)
  @Column("text")
  data_source!: string;

  @Field(() => String)
  @Column("text")
  cached_response!: string;

  @Field(() => Float)
  @Column("bigint")
  cached_at!: number;

  @Field(() => Float)
  @Column("bigint")
  expires_at!: number;
}
