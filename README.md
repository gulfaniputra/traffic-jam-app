# Balikpapan Traffic Jam Web App

## Table Of Contents

- [About](#about)
- [Description](#description)
- [Stack](#stack)
- [PRD](#prd)
- [Project Structure](#project-structure)
- [Features](#features)
- [Demo](#demo)
- [How To Run Locally](#how-to-run-locally)

## About

This project is a Balikpapan Traffic Jam Web App. It provides:

- Live traffic visualization for Balikpapan using the Google Maps JavaScript API.
- Insights tab showing the top 5 most congested roads/areas.
- Responsive, Nordic-inspired UI.
- ~~Convex backend for caching and insights.~~
- Dockerized Node.js backend with GraphQL for caching and insights.

## Description

This app serves as a proof of concept for AI-assisted software development. Most of the codebase was written by AI-powered coding assistants ~~inside VS Code using~~:

- ~~GitHub Copilot (LLM: GPT-4.1)~~
- ~~Gemini Code Assist (LLM: Gemini 2.5 Flash)~~
- Google Antigravity (LLM: Gemini 3 Flash)

## Stack

- React
- TypeScript
- Vite
- pnpm
- ~~Convex~~
- Node.js
- Express.js
- Apollo Client & Server
- TypeGraphQL
- NeonDB (PostgreSQL)
- Docker
- GitHub Actions
- PostHog
- Clerk
- Google Maps JavaScript API

## PRD

The PRD is available [here](https://gist.github.com/gulfaniputra/4adcfa6e11a769a6865b57815e992d8a).

## Project Structure

```
.
├── convex/
│ ├── crons.ts
│ ├── schema.ts
│ ├── traffic.ts
│ └── traffic/
│   ├── getTrafficInsights.ts
│   └── getTrafficSegments.ts
│
├── src/
│ ├── components/
│ │ ├── GoogleMap.tsx
│ │ └── Insights.tsx
│ ├── assets/
│ ├── App.tsx
│ └── main.tsx
│
├── public/
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Features

- Live map with traffic overlay (auto-refresh every 5 minutes).
- Insights tab (auto-refresh every 15 minutes).

## Demo

https://traffic-jam-app.vercel.app/

## How To Run Locally

Prerequisites: [Node.js](https://nodejs.org/en), [pnpm](https://pnpm.io/), & ~~[Convex](https://www.convex.dev/)~~

### Frontend (Root Directory)

```bash
pnpm install
pnpm dev
```

URL: http://localhost:5173

Config: Ensure `.env.local` exists in the root and has your `VITE_GOOGLE_MAPS_API_KEY`.

### Backend (`backend/` Directory)

```bash
cd backend
pnpm dev
```

GraphQL Endpoint: http://localhost:4000/graphql

Config: Ensure `backend/.env` exists with your `POSTHOG_API_KEY` and `DATABASE_URL`.
