# Security Policy

Living With Arthritis UK (registered charity 1218461) serves people managing
long-term health conditions. We take the security of our website and our
visitors' data seriously.

## Reporting a vulnerability

If you believe you have found a security vulnerability in
livingwitharthritis.org.uk or this repository, please report it privately:

- **Email:** info@livingwitharthritis.org.uk with the subject line
  `SECURITY: <short description>`
- Or use GitHub's **"Report a vulnerability"** button (Security tab →
  Advisories) if enabled on this repository.

Please include steps to reproduce, the affected URL or file, and any proof of
concept. Please do **not** open a public issue for security problems, access
other users' data, or run automated scanning against the production site
without contacting us first.

We aim to acknowledge reports within **5 working days** and to remediate
confirmed issues promptly. We are grateful to researchers who disclose
responsibly — with your permission we will credit you once a fix ships.

## Scope

- livingwitharthritis.org.uk (production website)
- This repository's application code, build scripts and CI workflows
- Supabase edge functions belonging to this project

Out of scope: third-party platforms we rely on (Lovable, Supabase, Stripe,
PayPal, GitHub) — please report issues in those directly to the vendor.

## Supported versions

The production deployment always tracks the `main` branch. Only the latest
deployed version is supported.
