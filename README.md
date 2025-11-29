# Balikpapan Traffic Jam Web App (MVP)

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

This project is the MVP for the Balikpapan Traffic Jam Web App. It provides:

- Live traffic visualization for Balikpapan using the Google Maps JavaScript API.
- Insights tab showing the top 5 most congested roads/areas.
- Responsive, Nordic-inspired UI.
- Convex backend for caching and insights.

Only MVP/Phase 1 features from the PRD are implemented. No Phase 2 or future features are included.

## Description

This app serves as a proof of concept for AI-assisted software development. Most of the codebase was written by AI-powered coding assistants inside VS Code using:

- GitHub Copilot (LLM: GPT-4.1)
- Gemini Code Assist (LLM: Gemini 2.5 Flash)

## Stack

- React
- TypeScript
- Vite
- pnpm
- Convex
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
- Responsive and mobile-friendly.

## Demo

https://traffic-jam-app.vercel.app/

## How To Run Locally

0. Requirements:
   - [Node.js](https://nodejs.org/en)
   - [pnpm](https://pnpm.io/)
   - [Convex](https://www.convex.dev/)

1. Install dependencies:

   ```
   pnpm install
   ```

2. Configure your Google Maps JavaScript API keys in the environment variables:

   ```
   npx convex env set GOOGLE_MAPS_API_KEY "YOUR_API_KEY_HERE"
   ```

3. Start frontend development server in a terminal:

   ```
   pnpm dev
   ```

4. Start backend development server on another terminal:

   ```
   npx convex dev
   ```
