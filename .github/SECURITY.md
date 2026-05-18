# Security Policy

## Reporting a vulnerability

If you discover a security vulnerability or a leaked credential in this
repository, please **do not** open a public issue.

Email: **info@livingwitharthritis.org.uk** with the subject line
`SECURITY: <short description>`. We aim to acknowledge reports within
2 working days.

If a secret has been committed to git history, also:

1. Rotate the credential immediately at the upstream provider.
2. Notify a maintainer so the commit can be purged and the deploy keys
   rotated.

## Supported versions

Only the `main` branch and the currently published version on
livingwitharthritis.org.uk receive security updates.

## Secret handling rules

This repository enforces three layers of secret protection:

| Layer | Where | What it does |
|-------|-------|--------------|
| GitHub Push Protection | GitHub server | Blocks pushes containing recognised secret patterns (AWS, Stripe `sk_*`, OpenAI, Supabase service-role keys, etc.) **before** the commit lands. |
| Gitleaks CI | `.github/workflows/gitleaks.yml` | Scans every PR + push for custom and default secret patterns. Fails the build on any finding. |
| Lefthook pre-push | `lefthook.yml` | Local pre-push gate (`supabase db lint` and optional Gitleaks). |

### Safe to commit

- Supabase **publishable / anon** JWT keys — public by design, access is
  gated by Row Level Security.
- Stripe **publishable** keys (`pk_live_*`, `pk_test_*`).
- Google Analytics measurement IDs (`G-*`).
- Public Google site-verification HTML files.

### Never commit

- Supabase **service role** keys (`SUPABASE_SERVICE_ROLE_KEY`).
- Stripe **secret** keys (`sk_live_*`, `sk_test_*`, `whsec_*`).
- Resend, PayPal, PageSpeed, Shopify Admin API tokens.
- Any value listed in Lovable Cloud → Secrets.
- `.env` files containing real credentials (the project's `.env` is
  auto-generated and contains only public Supabase URLs + anon keys).

All runtime secrets live in **Lovable Cloud → Secrets** and are injected
into edge functions at runtime. They never need to appear in source.

## Enabling GitHub Push Protection (one-time, repo admin)

After connecting this project to GitHub:

1. Open the repo on GitHub → **Settings → Code security**.
2. Under **Secret scanning**, click **Enable**.
3. Under **Push protection**, click **Enable**.
4. Recommended: enable **Push protection for users** at the
   organisation level so the policy applies to every repo.

Once enabled, any `git push` containing a recognised secret pattern is
rejected by GitHub before the commit is accepted. Contributors get an
inline error explaining which secret was detected and how to remediate.
