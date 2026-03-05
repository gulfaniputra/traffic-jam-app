import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ObjectType, Field, ID, Float } from "type-graphql";

@ObjectType()
@Entity("traffic_segments")
export class TrafficSegment {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field(() => String)
  @Column("text")
  road_name!: string;

  @Field(() => String)
  @Column("text")
  area_name!: string;

  @Field(() => Float)
  @Column("float")
  congestion_score!: number;

  @Field(() => String)
  @Column("text")
  congestion_level!: string;

  @Field(() => Float)
  @Column("float")
  latitude!: number;

  @Field(() => Float)
  @Column("float")
  longitude!: number;

  @Field(() => Float)
  @Column("bigint")
  updated_at!: number;
}
