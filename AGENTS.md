# AGENTS.md

## Project Overview

This is a **Traffic Jam Web App** for Balikpapan, built as a proof of concept for AI-assisted software development. It visualizes live traffic data using Google Maps and provides insights on congestion.

## Technology Stack

### Frontend

- **Framework**: React 19 + Vite 7
- **Language**: TypeScript (~5.9)
- **Styling**: Vanilla CSS with CSS Variables (Nordic Palette). See `src/index.css`.
- **Map Integration**: `@react-google-maps/api` + Google Maps JavaScript API.
- **Analytics**: PostHog.
- **Auth**: None (Clerk available in backend but not active on frontend).

### Backend

- **Runtime**: Node.js (v22+ recommended).
- **Framework**: Express.js.
- **API**: GraphQL (Apollo Server + TypeGraphQL).
- **Database**: SQLite (`database.sqlite`) via TypeORM.
- **Language**: TypeScript (`tsx` for execution).
- **Auth**: Clerk (SDK installed, middleware available but optional).

### Infrastructure

- **Package Manager**: `pnpm` (Workspace supported but currently simple).
- **Containerization**: Docker (`Dockerfile` in `backend/`).
- **CI/CD**: GitHub Actions.

## Project Structure

- `src/`: Frontend source code.
- `src/components/`: React components (e.g., `GoogleMap.tsx`, `Insights.tsx`).
- `src/index.css`: Global styles and Nordic color palette definition.
- `backend/`: Backend application code.
- `backend/src/`: Backend source (`index.ts`, resolvers, entities).

## Development Workflow

### Frontend

1. Install dependencies: `pnpm install`
2. Start dev server: `pnpm dev`
3. Build: `pnpm build`

### Backend

1. Navigate to backend: `cd backend`
2. Install dependencies: `pnpm install`
3. Start dev server: `pnpm dev` (uses `tsx watch src/index.ts`)
4. Build: `pnpm build` (uses `tsc`)

## Design System

- **Theme**: Nordic-inspired.
- **Colors**: Defined in `src/index.css` (e.g., `--congestion-low`, `--background-primary`).
- **Typography**: Inter (via Google Fonts).
- **Components**: Functional React components with strong typing.

## AI Guidelines

- **Context**: When suggesting changes, respect the existing monorepo-like structure (root frontend, `backend/` folder).
- **Style**: Match the "Nordic" aesthetic—clean, minimal, muted colors.
- **Code**: Prefer functional components, hooks, and strict TypeScript. Use `async/await` for async operations.
- **GraphQL**: Use TypeGraphQL decorators for schema definition.
