import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';
import { PostHog } from 'posthog-node';
import db from './db';
import { buildSchema } from 'type-graphql';
import {
  TrafficSegmentResolver,
  TrafficInsightResolver,
  TrafficCacheResolver,
} from './graphql/resolvers';

const app = express();
const httpServer = http.createServer(app);

// Initialize PostHog
const posthog = new PostHog(process.env.POSTHOG_API_KEY || '', {
  host: 'https://app.posthog.com',
});

import { AppDataSource } from './data-source';

async function startServer() {
  // Initialize TypeORM Data Source
  await AppDataSource.initialize();

  // Build TypeGraphQL schema
  const schema = await buildSchema({
    resolvers: [
      TrafficSegmentResolver,
      TrafficInsightResolver,
      TrafficCacheResolver,
    ],
    validate: false,
  });

  // Apollo Server setup
  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(express.json());

  // Clerk authentication middleware
  // Uncomment this to protect your entire API
  // app.use(ClerkExpressWithAuth());

  app.use(
    '/graphql',
    cors(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        // You can access the authenticated user's info from req.auth
        return { auth: req.auth };
      },
    })
  );

  app.get('/', (req, res) => {
    // Example of capturing a PostHog event
    posthog.capture({
      distinctId: req.auth?.userId || 'anonymous',
      event: 'root_visited',
    });
    res.send('Welcome to the Traffic Jam App API!');
  });

  const port = process.env.PORT || 4000;
  httpServer.listen({ port }, () => {
    console.log(`🚀 Server ready at http://localhost:${port}`);
    console.log(
      `🚀 GraphQL endpoint ready at http://localhost:${port}/graphql`
    );
  });
}

startServer();

// Graceful shutdown for PostHog
process.on('SIGTERM', async () => {
  await posthog.shutdown();
  process.exit(0);
});
