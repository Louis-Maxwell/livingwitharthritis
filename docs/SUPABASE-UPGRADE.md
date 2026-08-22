# Supabase Upgrade Plan

**Audit date:** 2026-08-16 (hosting sections revised 2026-08-22)
**Status:** Ready for upgrades

---

## Current state

### Supabase configuration

```
Project ID: eswdtpmknwjxtvkyxvmi
Location:   EU (default)
Database:   PostgreSQL
Status:     Active
```

### Hosting

The frontend is built and served by Lovable behind Cloudflare. See
[`PRODUCTION-DEPLOYMENT.md`](./PRODUCTION-DEPLOYMENT.md). This project does not
use Vercel, Netlify, or any other external hosting platform.

### Dependencies

```
@sentry/react:  latest
web-vitals:     latest
react:          18.3.1
typescript:     5.8.3
vite:           6.4.3
tailwindcss:    3.4.17
```

---

## Supabase upgrade checklist

### 1. Enable PgBouncer (connection pooling)

**Status:** Documented, not yet enabled
**Benefit:** Reduces connection overhead

1. Open https://app.supabase.com → project `eswdtpmknwjxtvkyxvmi`
2. **Settings → Database → Connection Pooling**
3. Toggle **on** and select **Transaction mode**
4. Copy the pooled connection string
5. Update `DATABASE_URL` in the Lovable project environment settings
6. Verify: `psql postgresql://...@...pooling.supabase.co:6543/postgres`

See [`SUPABASE-PGBOUNCER.md`](./SUPABASE-PGBOUNCER.md) for detail.

### 2. Backups and recovery

1. **Settings → Backups**
2. Confirm daily backups are enabled
3. Set retention to at least 30 days
4. Test the restore procedure quarterly

### 3. Row-Level Security

RLS is already configured in migrations. To verify:

```sql
SELECT * FROM pg_policies;
```

Confirm policies exist for every table in an exposed schema.

### 4. Realtime (optional)

Enable only when a feature needs live updates, for example buddy matching or an
admin dashboard.

1. **Settings → Realtime**
2. Select the specific tables required
3. Update client code to subscribe

### 5. Pro plan (optional)

Consider upgrading when traffic exceeds roughly 50K requests per month, the
database exceeds 500 MB, or dedicated support is required. Approximately
$25/month.

### 6. Edge Functions

Already in use for contact, chat, donations, email and SEO automation.

```bash
supabase functions new function-name
npm run deploy:functions
```

Every new function must be registered for rate limiting — see
[`RATE-LIMITING.md`](./RATE-LIMITING.md).

---

## Security

### Two-factor authentication

- Supabase: https://app.supabase.com → Account settings
- Lovable: workspace account settings
- GitHub: https://github.com/settings/security

### Secret rotation (quarterly)

- Supabase service role key
- Supabase publishable/anon key if exposed unexpectedly
- Sentry auth tokens
- Rate limiting Redis token and `RATE_LIMIT_KEY_SALT`

### Transport security

HTTPS and HSTS are already enforced. Response headers are configured in
`public/_headers`.

---

## Performance

### Database queries

```sql
SELECT * FROM pg_stat_statements
ORDER BY mean_exec_time DESC
LIMIT 10;
```

Add indexes on frequently filtered columns, enable pooling, and archive old
data where practical.

### Caching

Configure cache headers in edge functions. Static asset and sitemap caching is
defined in `public/_headers`.

### Images

Images are self-hosted WebP under `public/`. Prefer responsive `srcset` and
explicit `width`/`height` to protect CLS. There is no third-party image
optimisation service in use.

### JavaScript bundles

Code splitting is configured in `vite.config.ts`.

```bash
npm run build
ANALYZE=1 npm run build   # writes dist/stats.html
```

---

## Upgrade priority

### Phase 1

- [ ] Enable PgBouncer
- [ ] Confirm backup retention
- [ ] Provision rate limiting Redis secrets

### Phase 2

- [ ] Enable 2FA on Supabase, Lovable and GitHub
- [ ] Test backup restore
- [ ] Review Sentry alert routing

### Phase 3

- [ ] Evaluate Pro plan
- [ ] Enable Realtime if a feature requires it
- [ ] Run a performance optimisation audit

---

## Cost

| Service | Plan | Cost |
| --- | --- | ---: |
| Supabase | Free | $0 |
| Lovable hosting | Per workspace plan | Varies |
| Sentry | Free | $0 |
| Google Analytics | Free | $0 |

Upgrading Supabase to Pro is roughly $25/month; Sentry Developer is roughly
$29/month.

---

## Verification

**Supabase**

- [ ] Pooled connection works
- [ ] Backups automated
- [ ] RLS policies enforced
- [ ] No unexplained slow queries

**Hosting**

- [ ] Latest Lovable deployment is live
- [ ] Custom domain resolves over HTTPS
- [ ] Sentry receiving events
- [ ] GA4 receiving pageviews after consent

**Security**

- [ ] 2FA enabled
- [ ] No secrets committed
- [ ] Edge Function rate limiting active

**Performance**

- [ ] Core Web Vitals in the good range
- [ ] No sustained 5xx errors

---

## Support

- Supabase: https://supabase.com/support
- Lovable: support@lovable.dev
- Sentry: https://sentry.io/support
