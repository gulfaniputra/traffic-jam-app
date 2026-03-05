import "reflect-metadata";
import "dotenv/config";
import express from "express";
import http from "http";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";

import { PostHog } from "posthog-node";
import { buildSchema } from "type-graphql";
import {
  TrafficSegmentResolver,
  TrafficInsightResolver,
  TrafficCacheResolver,
} from "./graphql/resolvers";

import { AppDataSource } from "./data-source";

interface RequestWithAuth extends express.Request {
  auth?: {
    userId?: string;
  };
}

const app = express();
const httpServer = http.createServer(app);

// Initialize PostHog
const posthog = new PostHog(process.env.POSTHOG_API_KEY || "", {
  host: "https://app.posthog.com",
});

async function startServer() {
  // Check for DATABASE_URL
  if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL is not set in environment variables");
    process.exit(1);
  }

  // Initialize TypeORM Data Source
  try {
    await AppDataSource.initialize();
    console.log("✅ Data Source has been initialized!");
  } catch (err) {
    console.error("❌ Error during Data Source initialization:", err);
    process.exit(1);
  }

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
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: false }),
    ],
  });

  await server.start();

  app.use(express.json());

  // Support for Chrome's Private Network Access security feature
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Private-Network", "true");
    next();
  });

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        return { auth: (req as RequestWithAuth).auth };
      },
    }),
  );

  app.get("/", (req, res) => {
    posthog.capture({
      distinctId: (req as RequestWithAuth).auth?.userId || "anonymous",
      event: "root_visited",
    });
    res.send("Welcome to the Traffic Jam App API!");
  });

  const port = process.env.PORT || 4000;
  httpServer.listen({ port }, () => {
    console.log(`🚀 Server ready at http://localhost:${port}`);
    console.log(
      `🚀 GraphQL endpoint ready at http://localhost:${port}/graphql`,
    );
  });
}

startServer();

// Graceful shutdown for PostHog
process.on("SIGTERM", async () => {
  await posthog.shutdown();
  process.exit(0);
});
