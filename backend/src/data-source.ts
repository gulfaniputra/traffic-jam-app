import { DataSource } from "typeorm";
import { TrafficSegment } from "./entities/TrafficSegment";
import { TrafficInsight } from "./entities/TrafficInsight";
import { TrafficCache } from "./entities/TrafficCache";

const isDevelopment = process.env.NODE_ENV !== "production";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  // Validate SSL in production
  ssl: isDevelopment ? false : { rejectUnauthorized: true },
  // Sync schema in development
  synchronize: isDevelopment,
  // Use migrations in production
  migrations: [__dirname + "/migrations/*.{ts,js}"],
  logging: isDevelopment ? ["error", "warn"] : false,
  entities: [TrafficSegment, TrafficInsight, TrafficCache],
  subscribers: [],
});
