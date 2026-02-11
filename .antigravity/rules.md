# Full-Stack Development Rules

## 1. General Principles

- **Package Manager**: Strictly use `pnpm`.
- **Language**: TypeScript (Strict Mode).
- **Workflow**: Before writing code, provide a high-level plan. If the task is complex, request a "Plan Review" from the user.
- **DRY Check**: Before creating a new utility or component, scan the codebase for existing patterns to maintain consistency.

## 2. Frontend (React + Vite)

- **Component Architecture**:
  - Functional components with arrow functions.
  - Separate UI from logic: If a component has more than one `useEffect` or complex state logic, extract it into a Custom Hook (e.g. `useComponentLogic.ts`).
- **Styling**: Vanilla CSS. Use the Nordic Palette defined in `src/index.css`. Avoid inline styles; use CSS variables for theme consistency.
- **Data Fetching**:
  - Apollo Client.
  - Generate types from the schema (e.g. via GraphQL Code Generator).

## 3. Backend (Node.js + Express + GraphQL)

- **Architecture**: Resolver-Entity Pattern (TypeGraphQL + TypeORM).
- **Database**: SQLite. Use TypeORM to maintain type-safe queries unless raw SQL is requested for performance.
- **Schema Management**: Code-first (TypeGraphQL). Keep resolvers thin; delegate complex logic to services or utility functions.

## 4. Code Quality & Safety

- **Naming**: `camelCase` (variables), `PascalCase` (types/components), `kebab-case` (folders).
- **Imports**: standard relative paths (e.g., `./` or `../`). Absolute path aliases are not configured.
- **Security**:
  - Check for exposed `.env` keys before every commit suggestion.
  - Sanitize all user inputs to prevent SQL injection or XSS.
- **Error Handling**: Use a standard `AppError` class for backend exceptions to ensure consistent GraphQL error extensions.
