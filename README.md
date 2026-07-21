# Living With Arthritis

Living With Arthritis is the frontend for the Living With Arthritis project — a Vite + React + TypeScript application styled with Tailwind CSS and using shadcn-ui components.

This repository was created from a Lovable project and contains frontend code, visual tests, and edge-function preflight helpers.

Quick links

- Repository: https://github.com/Louis-Maxwell/livingwitharthritis
- Project: https://lovable.dev/projects/3d3ed0e7-eb8c-4aef-b309-fc873c84a796

Getting started (local)

Prerequisites

- Node.js 20+ (use nvm or your preferred manager)
- npm (or bun if you prefer, some scripts use bun)

Install and run

```bash
# install deps
npm ci

# start dev server
npm run dev

# build for production
npm run build

# run lint
npm run lint
```

Testing

- Visual regression tests (Playwright) live under `tests/visual/` — see `tests/visual/README.md` for instructions.
- Unit tests use Vitest when present (run `npm test` or `npx vitest` if configured).

Edge functions

This repository contains Supabase edge functions (if present) and a preflight helper. See the existing preflight instructions earlier in this README and the scripts under `scripts/` for guidance.

Contributing

Contributions are welcome. Please read CONTRIBUTING.md and CODE_OF_CONDUCT.md before opening issues or PRs.

License

This project is licensed under the MIT License — see LICENSE for details.
