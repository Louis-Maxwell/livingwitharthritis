# Database Migrations

## Overview

This project uses Supabase migrations to version and deploy database schema changes. Migrations are automatically deployed to production via GitHub Actions when merged to `main`.

## File Structure

```
supabase/
├── migrations/          # Database migration files
│   ├── 20260101120000_initial_schema.sql
│   ├── 20260105143022_add_users_table.sql
│   └── ...
├── functions/           # Edge functions (deployed separately)
├── config.toml         # Supabase project configuration
└── seed.sql            # (Optional) initial data
```

## Migration Naming

Migrations use ISO 8601 timestamps and UUIDs:

```
[timestamp]_[description].sql
20260815120000_add_missing_fk_indexes.sql
```

Generate with: `supabase migration new <description>`

## Creating Migrations

### Via Supabase CLI (Recommended)

```bash
supabase migration new add_user_accounts
# Edits: supabase/migrations/20260815120000_add_user_accounts.sql
nano supabase/migrations/20260815120000_add_user_accounts.sql

# Test locally
supabase start
# Make changes...

# When satisfied:
git add supabase/migrations/
git commit -m "Add user accounts table"
git push  # Automatically deploys via GitHub Actions
```

### Via Supabase Dashboard

**Not recommended** for projects with tracked migrations. Always use the CLI to ensure:
- Changes are version-controlled
- Commit history is maintained
- CI/CD deployments work correctly

If you make a dashboard-only change, generate a reconciling migration:

```bash
supabase db pull  # Pulls dashboard changes
git diff supabase/migrations/  # Review changes
git add supabase/migrations/
git commit -m "Sync dashboard changes"
```

## Deployment

### Automatic Deployment (CI/CD)

1. Create migration file locally
2. Test with `supabase start`
3. Push to main branch
4. GitHub Actions automatically runs `.github/workflows/supabase-deploy.yml`
5. Migration is applied to production

**Requirements:**
- `SUPABASE_ACCESS_TOKEN` secret configured in GitHub Actions
- Supabase CLI's migration tracking must be reconciled (one-time setup)

### First-Time Setup (One-Time Reconciliation)

If you see migration errors during CI/CD:

```bash
# Run the repair script
./scripts/repair-migrations.sh

# Or manually:
supabase link --project-ref eswdtpmknwjxtvkyxvmi
for version in 20260101120000 20260105143022 ...; do
  supabase migration repair --status applied "$version"
done
```

This tells the CLI that all existing migrations have already been applied, so it only tracks new ones going forward.

### Manual Deployment

For emergencies or testing, deploy manually:

```bash
supabase link --project-ref eswdtpmknwjxtvkyxvmi
supabase db push --linked
```

## Best Practices

### DO

✅ Use descriptive migration names: `add_user_indexes`, not `migration_1`  
✅ Keep migrations focused: One feature per migration when possible  
✅ Test locally: `supabase start` before pushing  
✅ Review SQL: Check for syntax errors and performance implications  
✅ Write idempotent changes: Use `CREATE TABLE IF NOT EXISTS`, etc.  
✅ Include rollback comments: Document how to undo if needed  

### DON'T

❌ Edit migration files after merging to main  
❌ Mix schema changes and data operations  
❌ Use migrations for backfills (use edge functions instead)  
❌ Modify migrations from the dashboard  
❌ Commit transaction-breaking changes in a single migration  

## Migration Examples

### Adding a Column

```sql
ALTER TABLE users ADD COLUMN avatar_url TEXT;
```

### Adding an Index for Performance

```sql
CREATE INDEX idx_users_email ON users(email);
```

### Adding a Foreign Key with Cleanup

```sql
-- Remove any rows with invalid references first
DELETE FROM orders WHERE customer_id NOT IN (SELECT id FROM customers);

-- Then add the constraint
ALTER TABLE orders 
  ADD CONSTRAINT fk_orders_customer 
  FOREIGN KEY (customer_id) 
  REFERENCES customers(id) ON DELETE RESTRICT;
```

### Idempotent Operation

```sql
-- Safe: won't error if already exists
CREATE TABLE IF NOT EXISTS audit_log (
  id BIGSERIAL PRIMARY KEY,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  action TEXT NOT NULL,
  changes JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Troubleshooting

### "relation already exists"

Your migration SQL has a syntax error or the object was created manually. Options:

1. Check if the object was created on the dashboard (manually)
   - Use `supabase db pull` to sync
2. Update your migration to use `IF NOT EXISTS`
3. Contact the team — may need manual reconciliation

### "ERROR: Unexpected migration version X"

The CLI's tracking doesn't match the live database. Run:

```bash
supabase migration repair --status applied <version>
```

### Migration hangs / takes too long

Large table operations may lock the database. Deploy:
- During off-peak hours
- With proper concurrency controls (for `CREATE INDEX CONCURRENTLY`)
- In smaller chunks for bulk data operations

### Need to rollback?

Database migrations don't have built-in rollback. Options:

1. **Preferred:** Create a new migration that undoes the change
   ```sql
   -- 20260815130000_rollback_user_avatars.sql
   ALTER TABLE users DROP COLUMN avatar_url;
   ```

2. **For small changes:** Manual SQL in dashboard (NOT RECOMMENDED)
   - Use this only as an emergency
   - Always follow with a migration file to ensure consistency

## CI/CD Configuration

The GitHub Actions workflow is configured in `.github/workflows/supabase-deploy.yml`.

- Runs on every push to `main` that touches `supabase/migrations/**`
- Uses `SUPABASE_ACCESS_TOKEN` secret (available to authorized contributors)
- Checks migration history before deploying

To add a new environment or project, update:
1. The project ref in `.github/workflows/supabase-deploy.yml`
2. Add a new `SUPABASE_ACCESS_TOKEN_*` secret if different project
3. Update the workflow conditionals if needed

## Additional Resources

- [Supabase Migrations Guide](https://supabase.com/docs/guides/cli/managing-data#data-migrations)
- [PostgreSQL Docs](https://www.postgresql.org/docs/) (for SQL syntax)
- [our SUPABASE-PGBOUNCER.md](./SUPABASE-PGBOUNCER.md) (connection pooling)
