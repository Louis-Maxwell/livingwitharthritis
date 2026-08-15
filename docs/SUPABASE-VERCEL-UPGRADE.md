# Supabase & Vercel Upgrade Plan

**Audit Date:** 2026-08-16  
**Status:** Ready for Upgrades

---

## 📊 CURRENT STATE AUDIT

### Supabase Configuration
```
Project ID: eswdtpmknwjxtvkyxvmi
Location: EU (Default)
Database: PostgreSQL
Status: Active
```

### Vercel Configuration
```
Framework: Vite + React
Environment: Production
Domain: livingwitharthritis.org.uk
Status: Ready
```

### Dependencies Status
```
@sentry/react: ✅ Latest
web-vitals: ✅ Latest
react: 18.3.1 ✅
typescript: 5.8.3 ✅
vite: 6.4.3 ✅
tailwindcss: 3.4.17 ✅
```

---

## 🚀 SUPABASE UPGRADE CHECKLIST

### 1. Enable PgBouncer (Connection Pooling)
**Status:** Documented, not yet enabled
**Benefit:** Reduce connection overhead, improve performance

**Steps:**
1. Go to: https://app.supabase.com > eswdtpmknwjxtvkyxvmi
2. **Settings > Database > Connection Pooling**
3. Toggle **ON**
4. Select: **Transaction mode** (recommended for web apps)
5. Copy pooled connection string
6. Update DATABASE_URL in Vercel with pooled URL
7. Test connection: `psql postgresql://...@...pooling.supabase.co:6543/postgres`

### 2. Enable Replication (Backup & Recovery)
**Status:** Recommended for production
**Benefit:** Data redundancy, disaster recovery

**Steps:**
1. **Settings > Backups**
2. Ensure backups are enabled (default: daily)
3. Check backup retention (recommend 30 days)
4. Test restore procedure quarterly

### 3. Enable Row-Level Security (RLS) Policies
**Status:** Already configured in migrations
**Benefit:** Data security at database level

**Verification:**
1. **SQL Editor** > Run:
   ```sql
   SELECT * FROM pg_policies;
   ```
2. Verify policies exist for tables
3. Document security model

### 4. Enable Realtime (If Needed)
**Status:** Optional, for live features
**Benefit:** Real-time data updates to clients

**When to enable:**
- Buddy scheme matching (live updates)
- Community forum (live posts)
- Admin dashboards (live stats)

**To enable:**
1. **Settings > Realtime**
2. Select tables to enable realtime
3. Configure SSL certificates if using custom domain
4. Update client code to use realtime subscription

### 5. Upgrade to Pro Plan (Optional)
**Current:** Free tier
**Consider upgrading if:**
- Traffic exceeds 50K requests/month
- Database exceeds 500MB
- Need dedicated support
- Want priority infrastructure

**Pro Plan Benefits:**
- ✅ More database connections
- ✅ More storage
- ✅ Priority support
- ✅ Advanced security features
- ✅ Custom SSL certificates

**Cost:** ~$25/month

### 6. Enable Edge Functions (Serverless Computing)
**Status:** Already using for some operations
**Enhancement:** Add more edge functions for:
- Real-time notifications
- Email sending (Resend integration)
- Webhook processing
- Image optimization

**Steps:**
1. Create new edge function: `supabase functions new function-name`
2. Deploy: `npm run deploy:functions`
3. Test via API

---

## 🚀 VERCEL UPGRADE CHECKLIST

### 1. Enable Vercel Analytics (Already Documented)
**Status:** Ready to enable
**Benefit:** Real-time performance monitoring

**Steps:**
1. Vercel Dashboard > **Analytics**
2. Click **Enable Web Analytics**
3. Choose: **Pro plan** for unlimited events
4. Monitor in real-time dashboard

### 2. Enable Vercel Speed Insights
**Status:** Ready to enable
**Benefit:** Core Web Vitals monitoring

**Steps:**
1. Vercel Dashboard > **Analytics > Speed Insights**
2. Click **Enable**
3. View real user performance data by device/geo/page

### 3. Configure Vercel Monitoring & Alerts
**Status:** Ready
**Benefit:** Instant alerts on failures

**Steps:**
1. **Settings > Monitoring**
2. Create alerts for:
   - Core Web Vitals degradation
   - High error rate (>5%)
   - Function timeout
3. Connect to Slack/Email

### 4. Enable Vercel Firewall (DDoS Protection)
**Status:** Recommended
**Benefit:** Protection against attacks

**Steps:**
1. **Settings > Security > Firewall**
2. Enable WAF (Web Application Firewall)
3. Configure rules for:
   - Rate limiting
   - Bot protection
   - Geographic restrictions (optional)

### 5. Set Up Vercel Preview Deployments
**Status:** Automatic, can be enhanced
**Benefit:** Test before production

**Steps:**
1. Already enabled for pull requests
2. Configure in vercel.json:
   ```json
   {
     "preview": {
       "bypassToken": "preview-secret-token"
     }
   }
   ```

### 6. Upgrade to Pro Plan (If Needed)
**Current:** Likely on Free tier
**Consider if:**
- Deployments exceed 100/month
- Function execution exceeds 100GB-hours
- Need priority support
- Want custom domains

**Pro Plan Benefits:**
- ✅ Unlimited deployments
- ✅ More function execution
- ✅ Priority support
- ✅ Advanced analytics
- ✅ Concurrent deployments

**Cost:** ~$20/month

### 7. Configure Custom Domain (Already Done)
**Status:** ✅ livingwitharthritis.org.uk is working
**Verify:**
1. **Domains** tab shows custom domain
2. DNS is configured correctly
3. SSL certificate is valid (🔒 in browser)

---

## 🔐 SECURITY UPGRADES

### 1. Enable 2FA on All Accounts
**Supabase:** https://app.supabase.com > Account Settings
**Vercel:** https://vercel.com/account/security
**GitHub:** https://github.com/settings/security

### 2. Rotate API Keys & Secrets
**Recommended quarterly:**
- Supabase anon key (if exposed)
- Supabase service role key
- Sentry auth tokens
- Vercel deployment tokens

### 3. Set Up CORS Policies
**Supabase:** Already configured via RLS
**Vercel:** Configure in vercel.json if needed

### 4. Enable HTTPS Everywhere
**Status:** ✅ Already enabled
**Verify:**
1. All URLs use https://
2. Automatic redirect from http://
3. HSTS headers enabled (checked in response headers)

---

## 📈 PERFORMANCE UPGRADES

### 1. Database Query Optimization
**Audit:** Check slow queries
```sql
-- View slow queries (requires monitoring)
SELECT * FROM pg_stat_statements 
ORDER BY mean_exec_time DESC 
LIMIT 10;
```

**Optimize:**
- Add indexes on frequently filtered columns
- Use connection pooling (PgBouncer)
- Archive old data

### 2. Edge Caching Improvements
**Vercel:** Already optimized
**Supabase:** Configure cache headers in edge functions

### 3. Image Optimization
**Current:** Using Vercel Image Optimization
**Enhance:**
- Add responsive images with srcset
- Use WebP format with fallbacks
- Compress before upload

### 4. JavaScript Bundle Optimization
**Current:** Already optimized with code splitting
**Verify:**
```bash
npm run build
# Check dist/assets/ for bundle sizes
```

---

## 📋 UPGRADE PRIORITY

### Phase 1: Critical (Do Now)
- [ ] Enable PgBouncer in Supabase
- [ ] Enable Vercel Analytics & Speed Insights
- [ ] Configure Vercel Monitoring & Alerts
- [ ] Set environment variables in Vercel

### Phase 2: Important (This Week)
- [ ] Enable Vercel Firewall
- [ ] Enable 2FA on Supabase/Vercel/GitHub
- [ ] Test backup/restore procedure
- [ ] Configure Slack/Email alerts

### Phase 3: Enhancement (This Month)
- [ ] Evaluate Pro plan upgrades
- [ ] Enable Realtime if needed
- [ ] Add more edge functions
- [ ] Performance optimization audit

---

## 💰 COST ANALYSIS

### Current Estimated Monthly Costs

| Service | Plan | Cost | Usage |
|---------|------|------|-------|
| Supabase | Free | $0 | <500MB, <50K API calls |
| Vercel | Free | $0 | <100 deployments, <100GB-hours |
| Sentry | Free | $0 | <5K errors/month |
| Google Analytics | Free | $0 | Unlimited |
| **TOTAL** | | **~$0/month** | — |

### If Upgrading to Pro (Recommended)

| Service | Plan | Cost | Reason |
|---------|------|------|--------|
| Supabase | Pro | $25 | Better performance, support |
| Vercel | Pro | $20 | Unlimited deployments |
| Sentry | Developer | $29 | Better error tracking |
| **TOTAL** | | **~$74/month** | Production-grade infrastructure |

---

## ✅ VERIFICATION STEPS

After upgrades, verify:

1. **Supabase:**
   - [ ] PgBouncer connection working
   - [ ] Database backups automated
   - [ ] RLS policies enforced
   - [ ] No slow queries

2. **Vercel:**
   - [ ] Deployments completing successfully
   - [ ] Analytics data flowing
   - [ ] Speed Insights showing real data
   - [ ] Alerts configured

3. **Security:**
   - [ ] 2FA enabled
   - [ ] SSL certificate valid
   - [ ] No exposed secrets in code
   - [ ] API rate limiting working

4. **Performance:**
   - [ ] Core Web Vitals "Good"
   - [ ] Database queries < 100ms
   - [ ] Page load < 2.5s
   - [ ] Zero 5xx errors

---

## 📞 SUPPORT CONTACTS

- **Supabase:** https://supabase.com/support
- **Vercel:** https://vercel.com/support
- **Sentry:** https://sentry.io/support

---

**Status:** Audit complete, ready for upgrades

**Next Step:** Complete Phase 1 upgrades above
