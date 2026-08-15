# Supabase PgBouncer Configuration

## Overview

PgBouncer is a lightweight connection pooler for PostgreSQL. Enabling it in Supabase helps manage database connections efficiently and prevents connection exhaustion under load.

## How to Enable PgBouncer

### In Supabase Dashboard

1. Go to your project in [Supabase Console](https://app.supabase.com)
2. Navigate to **Settings** > **Database** > **Connection Pooling**
3. Toggle **Connection Pooling** to **ON**
4. Select pool mode: **Transaction** (recommended for web apps) or **Session**
5. Set max connections (default is usually fine)
6. Copy the new pooled connection string

### Environment Configuration

PgBouncer is accessed via a separate connection string. Update your deployment platform:

**Lovable:** Settings > Environment Variables:
```
VITE_SUPABASE_URL=https://[project-ref].supabase.co  # Regular URL (for frontend)
DATABASE_URL=postgresql://[user]:[password]@[project-ref].pooling.supabase.co:6543/postgres
```

**Vercel:** Project Settings > Environment Variables:
```
DATABASE_URL=postgresql://[user]:[password]@[project-ref].pooling.supabase.co:6543/postgres
```

## Connection String Format

- **Regular:** `postgresql://[user]:[password]@[project-ref].supabase.co:5432/postgres`
- **Pooled (PgBouncer):** `postgresql://[user]:[password]@[project-ref].pooling.supabase.co:6543/postgres`

Note the `.pooling` subdomain and port `6543`.

## Pool Modes

| Mode | Best For | Connection Reuse |
|------|----------|-----------------|
| **Transaction** | Web apps, serverless functions | Per transaction |
| **Session** | Long-lived connections | Per session |

**Recommendation:** Use Transaction mode for this app (Lovable + serverless functions).

## When to Use Direct Connection

Use the regular (non-pooled) connection string for:
- Long-running migrations
- Administrative tasks
- Batch operations
- Initial schema setup

## Monitoring

Check pool usage in Supabase Dashboard:
- Settings > Database > Connection Pooling > Stats
- Monitor active/idle connections
- Alert if approaching max connection limit

## Troubleshooting

**"Too many connections" errors:**
- Increase max pool connections
- Switch from Session to Transaction mode
- Check for connection leaks in application code

**Connection timeout:**
- Verify pooled connection string uses `.pooling.supabase.co:6543`
- Check network access rules allow connections
- Test with `psql` command line tool
