# Balikpapan Traffic Jam Web App (MVP)

This project is the MVP for the Balikpapan Traffic Jam Web App. It provides:

- Live traffic visualization for Balikpapan using Google Maps JavaScript API.
- Insights tab showing the top 5 most congested roads/areas.
- Responsive, Nordic-inspired UI.
- Convex backend for caching and insights.

## Tech Stack

- React
- TypeScript
- Vite
- pnpm
- Convex
- Google Maps JavaScript API

## PRD

The PRD is available at [GitHub Gist](https://gist.github.com/gulfaniputra/4adcfa6e11a769a6865b57815e992d8a).

## How To Run Locally

1. Install dependencies:
   ```sh
   pnpm install
   ```
2. Configure your Google Maps JavaScript API keys in the environment variables.
3. Start frontend development server:
   ```sh
   pnpm dev
   ```
4. Start backend development server:
   ```sh
   npx convex dev
   ```

## Features (MVP)

- Live map with traffic overlay (auto-refresh every 5 minutes).
- Insights tab (auto-refresh every 15 minutes).
- Responsive and mobile-friendly.

## Note (MVP)

Only MVP/Phase 1 features are implemented. No Phase 2 or future features are included.

## `// In progress...`
