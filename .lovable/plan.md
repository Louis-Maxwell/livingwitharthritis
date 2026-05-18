Set up a pre-push lint gate that runs `supabase db lint` before code reaches the remote.

### What will be created

**1. lefthook.yml (local pre-push hook)**
- Adds lefthook configuration with a `pre-push` command that runs `supabase db lint`
- When the user clones the repo locally (after GitHub connect), running `bunx lefthook install` registers the hook in their local `.git/hooks`
- Fails the push if the linter reports migration or policy issues

**2. .github/workflows/supabase-db-lint.yml (CI gate)**
- Runs on every PR and push to `main`
- Installs the Supabase CLI via `supabase/setup-cli`
- Links to the project using `SUPABASE_ACCESS_TOKEN` (stored as a GitHub secret)
- Runs `supabase db lint` and fails the check on any finding
- Uploads the lint report as an artifact for review

### Why both?

| Layer | When it runs | Best for |
|-------|-------------|----------|
| lefthook | Local `git push` from cloned repo | Fast feedback for developers working locally |
| GitHub Actions | Every PR / push | Catches issues from Lovable edits or web-based commits where local hooks aren't active |

### Setup needed after implementation

1. Connect the project to GitHub (Plus menu → GitHub → Connect) so the workflow is active
2. Add a `SUPABASE_ACCESS_TOKEN` secret in the GitHub repo settings for the Actions workflow to authenticate with the project

No database changes are required. No frontend changes are required.