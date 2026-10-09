# Lesson Map

Use these stable IDs for sequencing and progress records. This is a dependency map, not a promise that every lesson takes one session. Split a lesson when cognitive load is too high, but keep the same ID with a suffix such as `-A` and `-B`. Compress or test out only when the learner demonstrates the exit evidence.

## P0 — Computer and learning setup

| ID | Lesson | Required hands-on evidence |
|---|---|---|
| P0-L01 | How computers run programs | Run a small program and explain source, process, input, and output |
| P0-L02 | Files, folders, paths, and the terminal | Create, navigate, inspect, move, and safely remove practice files |
| P0-L03 | Editor and error-reading workflow | Trigger, read, locate, and fix a simple error |
| P0-L04 | Git foundations | Use status, diff, add, commit, and log on a small project |

## P1 — Programming foundations with JavaScript

| ID | Lesson | Required hands-on evidence |
|---|---|---|
| P1-L01 | Values, types, variables, and expressions | Build a unit converter with input validation |
| P1-L02 | Conditions and boolean reasoning | Implement branching rules and test boundary cases |
| P1-L03 | Loops and state tracing | Build a bounded guessing-game loop and trace state |
| P1-L04 | Functions and decomposition | Split a small requirement into named functions |
| P1-L05 | Arrays and objects | Build an expense summary from structured records |
| P1-L06 | Errors and systematic debugging | Diagnose and repair several seeded defects |
| P1-L07 | Refactoring and automated checks | Remove duplication and add repeatable assertions |
| P1-L08 | Foundations project | Build and explain a small command-line application |

## P2 — Web foundations

| ID | Lesson | Required hands-on evidence |
|---|---|---|
| P2-L01 | Semantic HTML | Build an accessible document structure |
| P2-L02 | CSS cascade and box model | Diagnose competing styles and sizing |
| P2-L03 | Flexbox, Grid, and responsive layout | Recreate a responsive layout at multiple widths |
| P2-L04 | Forms, validation, and accessibility | Build a keyboard-usable form with helpful errors |
| P2-L05 | DOM and events | Implement interactive UI without a framework |
| P2-L06 | Modules and browser state | Split behavior into modules and persist state |
| P2-L07 | Async JavaScript, JSON, and HTTP | Trace requests and handle asynchronous failure |
| P2-L08 | API-driven browser app | Build loading, empty, success, and error states |

## P3 — Professional JavaScript and TypeScript

| ID | Lesson | Required hands-on evidence |
|---|---|---|
| P3-L01 | Closures, transformations, and immutability | Refactor stateful logic and explain tradeoffs |
| P3-L02 | Promises and async failure | Implement and test success, timeout, and failure paths |
| P3-L03 | Packages, modules, linting, and scripts | Configure and explain a small project toolchain |
| P3-L04 | TypeScript primitives and narrowing | Convert unsafe JavaScript without using `any` |
| P3-L05 | Domain modeling with types | Model API success and failure states |
| P3-L06 | Unit testing and Git collaboration | Test business rules and review a small change |

## P4 — React and TypeScript

| ID | Lesson | Required hands-on evidence |
|---|---|---|
| P4-L01 | Components, JSX, props, and composition | Decompose a static interface into components |
| P4-L02 | State, events, and derived values | Place state deliberately and avoid duplicated state |
| P4-L03 | Controlled forms and state ownership | Build and validate an accessible form |
| P4-L04 | Effects and external synchronization | Explain and implement a justified effect |
| P4-L05 | Data fetching and request states | Handle cancellation and all visible request states |
| P4-L06 | Routing and URL-driven state | Build shareable filters and nested layouts |
| P4-L07 | React testing and debugging | Test user behavior and diagnose a render bug |
| P4-L08 | React project | Deliver a tested multi-page task-manager frontend |

## P5 — Backend and Go

| ID | Lesson | Required hands-on evidence |
|---|---|---|
| P5-L01 | HTTP and backend mental models | Trace a request through server boundaries |
| P5-L02 | Go syntax, packages, slices, and maps | Implement and test a small Go program |
| P5-L03 | Structs, methods, pointers, and zero values | Model a domain and explain mutation choices |
| P5-L04 | Errors, package design, and table tests | Build explicit error paths with tests |
| P5-L05 | Interfaces at consumer boundaries | Introduce a small interface only where useful |
| P5-L06 | Goroutines, channels, context, and races | Cancel concurrent work and inspect race safety |
| P5-L07 | Standard-library HTTP handlers | Build validated JSON handlers and middleware |
| P5-L08 | Configuration, logging, and shutdown | Run and stop a configurable server safely |
| P5-L09 | Go API project | Deliver the task API with in-memory storage and tests |

## P6 — PostgreSQL and persistence

| ID | Lesson | Required hands-on evidence |
|---|---|---|
| P6-L01 | Relational modeling and constraints | Draw and defend the task-manager schema |
| P6-L02 | SQL CRUD, joins, and aggregates | Write and explain representative queries |
| P6-L03 | Transactions and concurrency | Preserve an invariant across a multi-step write |
| P6-L04 | Migrations and seed data | Apply, verify, and reverse a safe schema change |
| P6-L05 | Go database integration | Add a repository boundary and integration tests |
| P6-L06 | Indexes and query plans | Diagnose a slow query and justify an index |

## P7 — Full-stack integration

| ID | Lesson | Required hands-on evidence |
|---|---|---|
| P7-L01 | API contracts and error design | Connect one typed vertical slice end to end |
| P7-L02 | Authentication and authorization | Protect actions and test ownership rules |
| P7-L03 | Search, sorting, filtering, and pagination | Implement consistent UI, API, and SQL behavior |
| P7-L04 | Schema evolution and compatibility | Ship a backward-compatible contract change |
| P7-L05 | End-to-end testing | Test a critical user journey across the stack |
| P7-L06 | Integrated product milestone | Deliver reproducible React + Go + PostgreSQL setup |

## P8 — Production engineering

| ID | Lesson | Required hands-on evidence |
|---|---|---|
| P8-L01 | Threat modeling and web security | Identify, prioritize, and fix relevant risks |
| P8-L02 | Docker and local environments | Build reproducible images and a local stack |
| P8-L03 | CI/CD foundations | Automate format, lint, test, build, and artifact checks |
| P8-L04 | Configuration, secrets, and environments | Deploy without storing secrets in source |
| P8-L05 | Logs, metrics, traces, and health | Diagnose an introduced failure from evidence |
| P8-L06 | Deployment and rollback | Release, verify, and roll back one version safely |

## P9 — DevOps and Kubernetes

Prerequisite: the learner has passed P8 and can deploy the application without Kubernetes.

| ID | Lesson | Required hands-on evidence |
|---|---|---|
| P9-L01 | Linux, networking, DNS, and TLS for operators | Trace external traffic to the application |
| P9-L02 | Kubernetes architecture and declarative state | Explain control plane, nodes, Pods, and reconciliation |
| P9-L03 | Deployments, Services, and configuration | Run the application on a local cluster |
| P9-L04 | Probes, resources, scaling, and disruption | Configure safe scheduling and failure recovery |
| P9-L05 | Ingress, TLS, secrets, and policy | Expose the service with secure boundaries |
| P9-L06 | Stateful data and managed-service tradeoffs | Choose and defend a PostgreSQL operating model |
| P9-L07 | Kubernetes delivery and observability | Automate rollout and diagnose a broken deployment |
| P9-L08 | Operations capstone | Deploy, observe, scale, and roll back the full stack |

## P10 — Portfolio and job readiness

| ID | Lesson | Required hands-on evidence |
|---|---|---|
| P10-L01 | Product scoping and architecture | Produce user stories, a diagram, and tradeoff notes |
| P10-L02 | Flagship implementation | Deliver the independently built full-stack product |
| P10-L03 | Depth project | Demonstrate depth in one engineering dimension |
| P10-L04 | Code review and unfamiliar code | Review, explain, and safely change an existing codebase |
| P10-L05 | Debugging and technical communication | Diagnose live and explain decisions with evidence |
| P10-L06 | Portfolio readiness review | Pass the project rubric and define remaining gaps |

## Sequencing decisions

Use React before Go by default because the learner can see fast feedback after web and TypeScript foundations. Go follows so backend ideas are learned against a UI the learner already understands. PostgreSQL follows an in-memory Go API so persistence is introduced as a deliberate boundary rather than hidden inside a framework.

If the learner's goal is backend-first and the diagnostic proves JavaScript/web prerequisites, P5 may precede P4. P4 and P5 must both pass before P7. Never skip P6 before integration, or P8 before Kubernetes.
