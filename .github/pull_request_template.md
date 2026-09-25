## What changed and why

<!-- One or two plain-English sentences. Link the issue if there is one. -->

## Risk

- [ ] Low (docs, copy, tests, CI only)
- [ ] Medium (UI or content change on a few pages)
- [ ] High (routing, build, SEO head data, dependencies, redirects)

## Checks before merge

- [ ] All required checks are green (never merge on red or "skipped")
- [ ] `npm run lint`, `npx tsc --noEmit` and `npx vitest run` pass locally (or CI shows them green)
- [ ] If routes, sitemap, redirects or head data changed: `npm run build` works and the smoke tests pass
- [ ] If dependencies changed: `package-lock.json` **and** `bun.lock` are both updated
- [ ] No Supabase, Vercel or other removed backends; no city doorway pages; no Oswestry address
- [ ] No invented statistics or medical claims without a source

## After merge

- [ ] Wait for **Publish readiness (Lovable)** to say "SAFE TO PUBLISH" for the merge commit
- [ ] Publish in Lovable, then spot-check /, /blog, /faq on the live site
