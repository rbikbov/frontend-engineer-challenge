# Advanced Frontend Engineer Challenge

> Original assignment by [ATLS Academy](https://github.com/atls-academy), translated from Russian.

This repository is an engineering challenge for frontend candidates.

The task is narrow in product scope and broad in engineering decisions: the goal is to see not just the layout, but the ability to design a client side for a real backend.

## Context

Take any fork of the [backend/fullstack challenge](https://github.com/atls-academy/engineer-challenge) and build a frontend for it covering 3 scenarios:

1. Sign up
2. Sign in
3. Password recovery

The design stays the same: [Orbitto Service Figma file](https://www.figma.com/design/31KetUbya482vMSGgyiNIf/Orbitto-%7C-Service--Copy-?node-id=102-12806&t=TMlkJ3c3j3vJF5fb-4)

## What matters

The solution should demonstrate engineering maturity:

- UI decomposition and component reuse
- State management and asynchronous scenarios
- Working with backend contracts (errors, edge cases, unstable responses)
- Accessibility (a11y), UX states and performance
- Well-reasoned trade-offs

`Just building the layout` is not the target level for this challenge.

## Mandatory requirements

1. UI and UX

- Implement all screens and states of the auth flow according to the design
- Handle loading/error/empty/success states
- Make it responsive for at least desktop and mobile

2. Backend integration

- Connect to the chosen fork and its contracts
- Handle real service responses, including failure scenarios
- Document your assumptions about the contracts in the README

3. Frontend architecture

- Show the structure of layers/modules and their responsibilities
- Avoid an `everything in one components/ and services/` project layout
- Describe the key engineering decisions in the README

4. Quality and reliability

- Add tests for critical user scenarios (unit/integration/e2e, your choice)
- Add basic protection against common UX issues (duplicate submissions, race conditions, stale requests)

5. Technology choices

- You choose the framework and the stack
- There are no stack restrictions: React, Vue, Angular, Svelte, WASM or anything else
- The README must explain the choice and the alternatives you considered

## Constraints and anti-patterns

The following are considered weak solutions:

- A visual clone without engineering structure
- Ignoring failed responses and backend errors
- Local hacks without explaining the trade-offs and consequences
- Full lock-in to a specific framework without justification

## Deliverables

1. Frontend source code in your fork
2. An updated README in your fork with:

- how to run the project
- an explicit link to the chosen backend fork
- how the frontend architecture works
- which trade-offs were made
- what you would do next for a production version
- a link to a demo or a screencast of the main scenarios (if any)

3. A test suite and instructions for running it

## How to proceed

1. Choose the backend fork you want to work with
2. Fork this repository
3. Build the frontend for the chosen backend
4. Describe the result in the README
5. Submit:

- a link to your frontend fork
- a link to a `moodboard`
- a link to an `anti-moodboard`

## Use of AI

- AI tools are allowed in this challenge
- If you use AI, add an `.agents` folder to your fork to show how you approached the solution

## Evaluation criteria

1. Quality of the frontend architecture and code maintainability
2. Correctness of the auth flow and backend integration
3. Quality of UX states, error handling and responsiveness
4. Testability and reliability of the key scenarios
5. Clarity of the engineering reasoning in the README

## Bonus signals

- A well-thought-out mini design system or UI kit layer within the solution
- A contract typing strategy (e.g. codegen/typed clients)
- Basic frontend observability (telemetry/error tracking), with reasoning where appropriate
- Micro-frontends, where appropriate and justified
- FSD, with reasoning about layer boundaries and composition
- SOLID principles in the client-side architecture

## Important

What matters is not pixel-perfect output at any cost, but the quality of engineering thinking and the ability to build a robust frontend for a real backend.
