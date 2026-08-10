# Living With Arthritis

Living With Arthritis is the frontend for the Living With Arthritis project — a Vite + React + TypeScript application styled with Tailwind CSS and using shadcn-ui components, backed by Supabase (Postgres + Row-Level Security + edge functions).

This repository was created from a Lovable project and contains frontend code, visual tests, Supabase migrations/edge functions, and edge-function preflight helpers.

Quick links

- Repository: https://github.com/Louis-Maxwell/livingwitharthritis
- Live site: https://livingwitharthritis.org.uk

Getting started (local)

Prerequisites

- Node.js 20+ (use nvm or your preferred manager)
- npm (or bun if you prefer, some scripts use bun)

Environment variables

Copy `.env.example` to `.env` and fill in real values (never commit `.env`):

- `VITE_SUPABASE_PROJECT_ID`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` — from Supabase Project Settings → API. These are public, client-side-safe values; the actual security boundary is Row-Level Security on the database, not secrecy of these values.

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
- End-to-end tests live under `e2e/`.

Supabase (backend)

- SQL migrations: `supabase/migrations/`
- Edge functions: `supabase/functions/` (deploy with `npm run deploy:functions`, which runs a preflight check first)
- Config/project link: `supabase/config.toml`

Contributing

Contributions are welcome. Please read CONTRIBUTING.md and CODE_OF_CONDUCT.md before opening issues or PRs.

License

This project is licensed under the MIT License — see LICENSE for details.
