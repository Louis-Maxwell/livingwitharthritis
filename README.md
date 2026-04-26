# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/3d3ed0e7-eb8c-4aef-b309-fc873c84a796

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/3d3ed0e7-eb8c-4aef-b309-fc873c84a796) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/3d3ed0e7-eb8c-4aef-b309-fc873c84a796) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## Edge Functions Preflight (Local Development)

Before opening a PR that touches `supabase/functions/**`, run the preflight suite locally to catch type errors, dependency drift, and runtime issues that wouldn't surface from frontend builds alone.

### Prerequisites

- **Deno** — the version is pinned in [`.deno-version`](./.deno-version) (currently `2.6.10`). CI installs this exact version; please match it locally:
  ```bash
  # Install/upgrade via deno_install or your version manager (e.g. asdf, dvm)
  deno --version  # should match .deno-version
  ```
- **Node.js 20+** — the preflight orchestrators are Node ESM scripts.

### Required `deno.json` setup (`nodeModulesDir`)

Each edge function directory contains a `deno.json` config. When a function imports any `npm:` specifier (Stripe, Supabase JS, etc.), Deno 2.x requires an explicit `nodeModulesDir` setting so npm packages resolve consistently across local, CI, and the Supabase edge runtime.

The preflight script **auto-creates / patches** `supabase/functions/<name>/deno.json` to include:

```json
{
  "nodeModulesDir": "auto"
}
```

You don't need to add this by hand — running `node scripts/preflight-edge-functions.mjs` will write the field if missing. Commit the resulting `deno.json` change alongside your function edits.

> If you maintain a `deno.json` manually, keep `"nodeModulesDir": "auto"` to avoid `error: Could not resolve npm specifier` failures in CI.

### Running the preflight locally

All commands are run from the repo root:

```bash
# 1. Type-check every edge function entrypoint (index.ts + any alternate main files)
node scripts/preflight-edge-functions.mjs

# 2. Generate / refresh per-function deno.lock files (reproducible deps)
node scripts/lock-edge-functions.mjs

# 3. Verify lockfiles are in sync (CI uses this — exits 1 on drift)
node scripts/lock-edge-functions.mjs --check

# 4. Run the smoke tests against process-donation and process-email-queue
node scripts/smoke-edge-functions.mjs
```

JSON reports for each run are written to `.preflight-reports/` (gitignored).

### Recommended workflow before pushing

```bash
node scripts/preflight-edge-functions.mjs \
  && node scripts/lock-edge-functions.mjs --check \
  && node scripts/smoke-edge-functions.mjs
```

The same preflight check runs on every PR via `.github/workflows/edge-functions-preflight.yml` and must pass before merge.
