# Testing

Unit: bunx vitest run
Playwright: bunx playwright test
Identity: node scripts/validate-ai-identity.mjs

CI runs lint, typecheck, Vitest, Playwright and identity checks. There is no backend in CI.
