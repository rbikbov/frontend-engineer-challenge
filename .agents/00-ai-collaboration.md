# How AI was used in this challenge

This project uses **pair programming** with an AI agent. The process is set up so that the candidate (User) acts as the lead engineer and architect, personally defining detailed specifications and implementation criteria.

## Roles and responsibilities

### Candidate (Lead Engineer & Architect)

- **Owning the architecture**: personally choosing the tech stack (Nx, pnpm, Next.js 15, Tailwind v4).
- **Detailed task definitions**: providing concrete technical instructions, including:
  - **Design spec**: exact CSS code from Figma and SVG assets.
  - **State logic**: the exact behavior of components (e.g. "the label in the input appears only on focus", "the disabled state must use a specific HEX code").
  - **A11y & UX**: requirements to use specific libraries (Radix UI) for accessibility.
  - **Architectural boundaries**: strict control of the Public API and the layer hierarchy, despite the compatibility issues with ESLint 9 and the need to roll eslint-plugin-boundaries back to version 5.4.0.
- **Review and correction**: full control over every line of code through `Implementation Plans`. The agent does not start a task until the candidate has approved the approach in detail.
- **Asset organization**: grouping and moving favicons, icons and logos to match Next.js conventions.

### AI agent (Senior Frontend Developer)

- **Implementing to spec**: writing code strictly according to the parameters set by the candidate.
- **Infrastructure setup**: configuring the environment (Nx, ESLint, Prettier, Husky) according to the candidate's architectural vision.
- **Documentation**: keeping a technical log in the `.agents` folder, recording decisions and writing a `Walkthrough` report after each task.
- **Optimization**: suggesting best practices (e.g. `useId` in SVGs, the Slots pattern in components) to meet the candidate's requirements.

## Development methodology

The process is as transparent and controlled as possible:

1.  **Specification**: the candidate sets a concrete task, backed by code from Figma or design assets.
2.  **Planning**: the agent writes an `Implementation Plan` describing the step-by-step solution.
3.  **Approve**: the candidate edits the plan or approves it. No code changes without this step.
4.  **Execute & Walkthrough**: the agent completes the task and provides a report.
5.  **Commit**: the candidate gives the final assessment and the go-ahead to commit the changes.

This approach ensures that the AI is a tool in the engineer's hands, not an independent author of the architecture.
