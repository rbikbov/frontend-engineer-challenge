# 🧠 Development log (Agent Logs)

Welcome to the story of how Orbitto Service was built. This folder records every key stage, from setting up the first configuration to implementing complex security systems.

## Timeline

| Stage  | Topic                                                             | Description                                                     |
| :----- | :---------------------------------------------------------------- | :-------------------------------------------------------------- |
| **00** | [AI Collaboration](00-ai-collaboration.md)                        | Principles of working with the AI agent in this project.        |
| **01** | [Setup Monorepo](01-setup-monorepo.md)                            | Initializing Nx and the base structure.                         |
| **02** | [Main App & UI Lib](02-add-main-app-and-ui-lib.md)                | Adding the first app and the component library.                 |
| **03** | [Consolidate Deps](03-relocate-ui-and-consolidate-deps.md)        | Optimizing dependencies and import paths.                       |
| **04** | [Git Hooks](04-setup-git-hooks.md)                                | Setting up Husky and code quality automation.                   |
| **05** | [Modularize Configs](05-modularize-configs.md)                    | Moving configs (TS, ESLint) into separate packages.             |
| **06** | [Storybook](06-setup-storybook.md)                                | A visual sandbox for component development.                     |
| **07** | [Modernize UI](07-modernize-ui-components.md)                     | Moving to Tailwind v4 and refreshing the visuals.               |
| **08** | [FSD Architecture](08-fsd-architecture-enforcement.md)            | Introducing Feature-Sliced Design.                              |
| **09** | [Multi-Zones](09-monorepo-optimization-and-multi-zones.md)        | Scaling by combining Next.js apps.                              |
| **10** | [Secure Auth](10-secure-auth-and-architecture-refinement.md)      | Introducing the BFF, HttpOnly cookies and dependency inversion. |
| **11** | [Testing Strategy](11-testing-strategy-and-quality-assurance.md)  | The test pyramid: Vitest, JSDOM, Playwright.                    |
| **12** | [Observability](12-observability-and-logging.md)                  | Logging patterns and error interception.                        |
| **13** | [Final Refactoring](13-final-refactoring.md)                      | Final refactoring.                                              |
| **14** | [Readme Recovery](14-readme-recovery-after-rebase-and-rewrite.md) | Recovering the README after a rebase, and refactoring it.       |
| **15** | [E2E Stabilization](15-e2e-stabilization.md)                      | Stabilizing the E2E tests.                                      |
| **16** | [Code Review Fixes](16-code-review-fixes.md)                      | Fixing code review findings.                                    |

---

## Why does this matter?

We believe in a transparent process. These logs show not only the final result but also the **decision-making process**, the mistakes that were fixed and the architectural maneuvers that usually stay hidden behind the commits.
