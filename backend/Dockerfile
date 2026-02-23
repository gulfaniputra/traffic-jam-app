# Base & Dependencies
FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@10.27.0 --activate
WORKDIR /app

# Build Stage
FROM base AS build
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY backend/package.json ./backend/package.json
RUN pnpm install --frozen-lockfile --filter backend...

COPY backend ./backend
WORKDIR /app/backend
RUN pnpm build

# Production Runtime
FROM base AS runtime
ENV NODE_ENV=production

COPY --from=build /app/package.json ./package.json
COPY --from=build /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=build /app/pnpm-workspace.yaml ./pnpm-workspace.yaml

COPY --from=build /app/backend/package.json ./backend/package.json
COPY --from=build /app/backend/dist ./backend/dist

RUN pnpm install --prod --frozen-lockfile --filter backend...

WORKDIR /app/backend
USER node
EXPOSE 4000

CMD ["node", "dist/index.js"]