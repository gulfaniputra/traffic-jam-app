# Use an official Node.js runtime as a parent image
FROM node:20-slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Install pnpm
RUN npm install -g pnpm

# Copy the root package.json and pnpm-workspace.yaml to leverage Docker cache
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY backend/package.json ./backend/

# Install app dependencies using pnpm
RUN pnpm install --prod --filter backend

# Copy the rest of the backend source code
COPY backend/ ./backend/

# Build the TypeScript code
RUN pnpm --filter backend run build

# Expose the port the app runs on
EXPOSE 4000

# Define the command to run the app
CMD [ "pnpm", "--filter", "backend", "start" ]
