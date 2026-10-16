# 14: Recovery after a rebase and README refactoring

Some README sections were lost during a rebase that restored the original commits with the challenge content (they had been overwritten because Vercel deployment does not allow multiple collaborators). The sections were fully restored, the README structure was aligned with the challenge requirements, and the technical description was expanded.

## 🛠 Key changes:

### 1. README restructuring

- **Synced with the template**: the main README now strictly follows the structure of `README_challenge.md`.
- **Consolidation**: technical details from `README_full.md` were moved into the main file, and `README_full.md` was deleted to remove duplication.
- **Roadmap**: development plans are sorted by criticality (Security > Backend Contract > CI/CD > Observability). Added concrete tasks for fixing SMTP and rate limiting.
- **BFF & Security**: clarified the selective proxying logic (auth requests only) and explained the backend changes for working with cookies directly.

### 2. Security and architecture

- **Password Reset Flow**: documented the protective measure that uses `router.replace` to clear sensitive data from the URL and browser history right after it is saved to state.
- **IoC & DI**: removed mentions of singletons and shifted the focus to factories and dependency inversion. This architectural decision follows from the fact that the API clients are now used not only in the browser but also in the BFF layer (SSR). Using "client" singletons in the Next.js server environment would cause a critical problem: state (tokens, data) leaking between requests from different users. Introducing IoC prevented this.
- **Multi-Zones**: added recommendations on isolating the ports of the dependent apps (`dashboard`) in production.

### 3. UI/UX (Dev Experience)

- **`devConfirmationBuilder`**: the texts in the password recovery dialogs are more informative. They now clearly explain that the email was not sent because of backend limitations and tell the user to copy the link to continue the demo.
- **Demo Status**: added an honest note that the `main` and `dashboard` pages are demos and that the main focus was the auth architecture.
