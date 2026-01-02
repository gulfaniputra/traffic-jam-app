# Full-Stack Development Rules

## 1. General Principles

- **Package Manager**: Strictly use `pnpm`. Never use `npm` or `yarn`.
- **Language**: All code must be written in TypeScript with strict type checking.
- **Communication**: Explain architectural decisions before implementation. Highlight trade-offs between speed and scalability.

## 2. Frontend (React + Vite + TypeScript)

- **Component Structure**: Use functional components with arrow functions.
- **State Management**: Prefer standard React Hooks (`useState`, `useContext`) for local state. If global state is needed, ask before installing a library.
- **Styling**: Use Tailwind CSS for all styling. Follow mobile-first responsive design.
- **Data Fetching**: Use a typed GraphQL client (e.g. Apollo Client). Always define TypeScript interfaces for query results.
- **Performance**: Use `Vite` for the build pipeline. Ensure all components are modular and exported from `index.ts` files within feature folders.
- **Design Pattern**: When integrating third-party tools and libraries, enforce the latest recommended React patterns.

## 3. Backend (Node.js + Express + GraphQL)

- **Architecture**: Use a "Controller-Service-Repository" pattern to keep logic separated.
- **Schema**: Use a schema-first approach for GraphQL. Keep the `.graphql` files clean and documented.
- **Database**: Use SQLite. Write raw SQL only when necessary; otherwise, use a lightweight query builder or ORM as discussed.
- **Error Handling**: Implement a centralized Express error handler. Ensure GraphQL errors return meaningful messages and appropriate status codes.

## 4. Code Quality & Pitfalls

- **Naming**: Use `camelCase` for variables/functions and `PascalCase` for components/types.
- **Imports**: Use absolute paths (e.g., `@/components/...`) as configured in `tsconfig.json`.
- **Safety**: Never hardcode secrets. Always use `.env` files and provide a `.env.example`.
- **Avoid**: Avoid using `any`. If a type is unknown, use `unknown` and type guards.
