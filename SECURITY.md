# Security

If you find a vulnerability or a leaked credential, do not open a public issue.

Email info@livingwitharthritis.org.uk with the subject SECURITY: short description.
We aim to acknowledge reports within 2 working days.

Only the main branch and the live site at https://livingwitharthritis.org.uk receive updates.

Never commit secret API tokens or real .env / .env.local files.
Stripe publishable keys and Google Analytics IDs are public by design.

GitHub Push Protection and the Gitleaks workflow scan every push.
Lefthook runs a CSS utility check on pre-push.
