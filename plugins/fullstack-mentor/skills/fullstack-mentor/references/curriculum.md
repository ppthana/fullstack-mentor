# Curriculum Map

Use this as a dependency map, not a rigid calendar. Advance by evidence. Reorder examples around the learner's interests, but preserve prerequisites.

## Phase 0 — Learning setup and computer fluency

Outcomes: navigate files and folders, use a terminal safely, run an editor, interpret error messages, and describe how source code becomes a running program.

Hands-on artifacts:

- Create and navigate a small project folder.
- Run a simple program and deliberately trigger, read, and fix an error.
- Use Git for status, diff, add, commit, and log without destructive commands.

Exit evidence: learner can reproduce the workflow and explain working tree, file path, process, command, and commit.

## Phase 1 — Programming foundations with JavaScript

Topics: values and types, variables, operators, conditions, loops, functions, scope, arrays, objects, decomposition, input/output, errors, debugging, and basic complexity intuition.

Hands-on sequence:

1. Calculator and unit converter.
2. Text-based guessing game with validation.
3. Expense summarizer using arrays and objects.
4. Refactor repeated logic into functions and add automated checks.

Exit evidence: learner can turn a small written requirement into functions, trace state changes, test edge cases, and debug without random edits.

## Phase 2 — Web foundations

Topics: semantic HTML, forms, CSS cascade and box model, layout with Flexbox/Grid, responsive design, accessibility, browser developer tools, DOM, events, modules, async behavior, JSON, HTTP, and APIs.

Hands-on sequence:

1. Accessible responsive profile page.
2. Form with client-side validation and helpful error states.
3. Vanilla JavaScript task tracker with persistence.
4. API-driven search page with loading, empty, success, and error states.

Exit evidence: learner can build and debug a small browser application without a framework and explain request/response, DOM state, and accessibility basics.

## Phase 3 — Professional JavaScript and TypeScript

Topics: closures, array transformations, immutability tradeoffs, promises and async/await, modules, package management, TypeScript primitives, unions, narrowing, interfaces/types, generics where justified, linting, unit tests, and Git collaboration basics.

Hands-on sequence:

1. Convert a JavaScript module to strict TypeScript.
2. Model API success and failure states without unsafe casts.
3. Test business logic and handle asynchronous failures.

Exit evidence: learner can explain TypeScript errors, model domain data, avoid `any` by default, and test pure logic.

## Phase 4 — React

Prerequisite: Phase 2 exit evidence and stable JavaScript fundamentals.

Teach in this order unless demonstrated knowledge permits compression:

1. Component model, JSX, props, composition, and rendering.
2. State, events, derived values, controlled forms, and state ownership.
3. Effects as synchronization with external systems—not as a default computation tool.
4. Data fetching, cancellation, loading/error/empty states, and reusable boundaries.
5. Routing, shared layouts, accessibility, and URL-driven state.
6. TypeScript component and API modeling.
7. Component/integration testing and debugging render behavior.
8. Performance measurement before memoization; production build fundamentals.

React project: build a multi-page issue or task manager frontend against a mock API. Require accessible forms, validation, filters reflected in the URL, robust request states, and tests for important user flows.

Exit evidence: learner can choose component boundaries, place state deliberately, explain an effect, test behavior, and diagnose common stale-state or rendering bugs.

## Phase 5 — Backend and Go foundations

First teach backend concepts independent of framework: server lifecycle, HTTP methods/status/headers, REST tradeoffs, validation, authentication versus authorization, concurrency, persistence, and failure handling.

Then teach Go in this order:

1. Toolchain, packages, variables, functions, control flow, arrays/slices/maps.
2. Structs, methods, interfaces from consumer needs, pointers, and zero values.
3. Explicit errors, wrapping, testing, table-driven tests, and package design.
4. Goroutines, channels, context, cancellation, and race awareness.
5. HTTP handlers and middleware with the standard library before a framework.
6. JSON boundaries, validation, configuration, logging, graceful shutdown, and integration tests.

Go project: build the task-manager API with in-memory storage first. Add tests around handlers and domain logic before adding the database.

Exit evidence: learner can design a small Go package, handle errors explicitly, write tests, explain interface placement, and build an HTTP API with graceful failure behavior.

## Phase 6 — Data and PostgreSQL

Topics: relational modeling, keys, constraints, normalization, SQL CRUD, joins, aggregates, transactions, indexes, query plans, migrations, connection pooling, and repository boundaries.

Hands-on sequence:

1. Model the task-manager domain and defend cardinality choices.
2. Write SQL manually before adopting query helpers or generators.
3. Add migrations and integration tests.
4. Inspect a query plan and justify an index.

Exit evidence: learner can prevent invalid data with constraints, write non-trivial queries, explain transactions, and diagnose a basic slow query.

## Phase 7 — Full-stack integration

Integrate React + TypeScript, Go, and PostgreSQL.

Topics: API contracts, schema evolution, CORS, authentication and authorization, cookies/tokens tradeoffs, validation on both boundaries, optimistic UI when appropriate, pagination/filtering, error contracts, and end-to-end tests.

Core project requirements:

- Register/login/logout and protected actions.
- Role or ownership authorization enforced by the backend.
- CRUD with search, filtering, sorting, and pagination.
- Accessible responsive UI with complete request states.
- Database migrations, seed data, unit/integration/end-to-end tests.
- API documentation and a reproducible local setup.

Exit evidence: learner can trace a feature from UI through HTTP and domain logic to SQL, then debug failures at each boundary.

## Phase 8 — Production engineering

Topics: OWASP-informed security basics, secret management, structured logs, metrics and traces conceptually, Docker, CI, deployment, health checks, backups, performance profiling, dependency maintenance, and incident-style debugging.

Hands-on artifacts:

- Containerized local environment.
- CI that formats, lints, tests, and builds.
- Deployed application with documented configuration and rollback awareness.
- Threat-model notes and fixes for the most relevant risks.
- Debugging report based on logs and a deliberately introduced failure.

Exit evidence: learner can deploy safely, observe failure, explain basic security controls, and reproduce the system from documentation.

## Phase 9 — Portfolio and job readiness

Build at least two credible projects:

1. **Flagship full-stack application:** React + TypeScript, Go, PostgreSQL, tests, CI, deployment, and a thoughtful README.
2. **Depth project:** emphasize one dimension such as concurrency, data modeling, accessibility, performance, or third-party integration.

For each project require a problem statement, user stories, architecture sketch, tradeoff record, issue-sized work plan, meaningful commit history, automated verification, deployed demo when feasible, and a retrospective.

Practice explaining code, debugging an unfamiliar defect, reviewing a pull request, making a small change in an existing codebase, and discussing tradeoffs. Avoid puzzle-only preparation.

## Spiral review

Revisit earlier skills inside later phases:

- Functions and data structures reappear in React state and Go domain logic.
- HTTP reappears in every frontend/backend integration.
- Accessibility remains part of every UI review.
- SQL constraints reappear in API validation and concurrency cases.
- Git, tests, debugging, and explanation are assessed in every project.

