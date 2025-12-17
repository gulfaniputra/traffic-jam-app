import { DataSource } from 'typeorm';
import { TrafficSegment } from './entities/TrafficSegment';
import { TrafficInsight } from './entities/TrafficInsight';
import { TrafficCache } from './entities/TrafficCache';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true,
  logging: false,
  entities: [TrafficSegment, TrafficInsight, TrafficCache],
  subscribers: [],
  migrations: [],
});
