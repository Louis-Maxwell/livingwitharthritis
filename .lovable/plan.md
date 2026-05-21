GitHub Push Protection is a **GitHub-side setting**, not something configured in the codebase. It must be enabled through GitHub's UI or API on the repository itself.

### What needs to happen

**1. Connect the project to GitHub (if not done yet)**
- Plus menu → GitHub → Connect project

**2. Enable Secret Scanning + Push Protection in GitHub**

For **public repos**: both are free and on by default — verify they're enabled.

For **private repos**: requires GitHub Advanced Security (paid for orgs) OR GitHub Free for personal accounts (free as of 2024).

Steps in GitHub:
1. Go to the repo → **Settings → Code security**
2. Under **Secret scanning**, click **Enable**
3. Under **Push protection**, click **Enable**
4. Optionally enable **Push protection for users** at the org level so it applies to all repos

Once enabled, any `git push` containing a recognised secret pattern (AWS keys, Stripe keys, Supabase service-role keys, OpenAI tokens, etc.) is **blocked at the GitHub server** before the commit is accepted — no local hook needed.

### What I'll add to the repo to complement it

To make push protection more effective and document the policy, I'll add:

**`.github/SECURITY.md`** — security policy referenced by GitHub's UI, explaining how to report leaked credentials and what the project's secret-handling rules are.

**Update `.gitleaks.toml`** — already exists from the previous step. I'll align its allowlist with the GitHub push-protection patterns so the local Gitleaks workflow and GitHub push protection agree on what is/isn't a secret (no false-positive conflicts on Supabase publishable keys, Stripe `pk_*` keys, etc.).

### What this plan does NOT do

- It does **not** flip the GitHub setting itself — only a repo admin clicking in GitHub can do that. I'll give you a direct link in chat after the files are added.
- It does **not** replace the Gitleaks workflow — push protection runs server-side on accepted patterns; Gitleaks runs in CI on the full diff and catches custom patterns. Both are complementary.

### Files to create / edit

- `.github/SECURITY.md` (new)
- `.gitleaks.toml` (small alignment edit)