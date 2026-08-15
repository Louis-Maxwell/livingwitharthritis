# Production Deployment Guide

**Last Updated:** 2026-08-16  
**Status:** Ready for Production

## Deployment Architecture

```
GitHub Main Branch
        ↓
   [git push]
        ↓
  Lovable Platform
        ↓
   [npm build]
        ↓
  Vercel CDN
        ↓
  https://livingwitharthritis.org.uk (Live)
```

## Step 1: Deploy to Lovable

After pushing to GitHub main, trigger Lovable deployment:

### Manual Deployment (via Lovable Dashboard)
1. Go to [Lovable Studio](https://lovable.dev)
2. Select **livingwitharthritis** project (ID: `0b2fd6ca-4e21-4ac7-99fa-d741e996f45e`)
3. Click **Deploy to Vercel**
4. Confirm deployment
5. Wait for build to complete (2-5 minutes)
6. Verify at https://livingwitharthritis.org.uk

### CLI Deployment (if available)
```bash
lovable deploy --project 0b2fd6ca-4e21-4ac7-99fa-d741e996f45e
```

## Step 2: Production Environment Variables

Add these to Vercel Project Settings:

### Critical (Required)
```
VITE_SUPABASE_PROJECT_ID=eswdtpmknwjxtvkyxvmi
VITE_SUPABASE_URL=https://eswdtpmknwjxtvkyxvmi.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<your-key>
DATABASE_URL=postgresql://postgres:<password>@eswdtpmknwjxtvkyxvmi.pooling.supabase.co:6543/postgres
```

### Error Tracking (Sentry)
```
VITE_SENTRY_DSN=<your-sentry-dsn>
SENTRY_ORG=<your-org>
SENTRY_PROJECT=<your-project>
SENTRY_AUTH_TOKEN=<your-auth-token>
```

### Analytics
```
VITE_GA4_PRIMARY_ID=G-<your-ga4-id>
VITE_GA4_SECONDARY_ID=<optional>
VITE_GA4_PAGEVIEW_ID=<optional>
```

### E-Commerce (if enabled)
```
VITE_SHOPIFY_STOREFRONT_TOKEN=<your-token>
VITE_STRIPE_PUBLIC_KEY=pk_live_<your-key>
VITE_PAYPAL_CLIENT_ID=<your-id>
```

### Email Service
```
VITE_RESEND_API_KEY=<your-key>
```

### Vercel Specific
```
NODE_ENV=production
```

**How to set in Vercel:**
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select **livingwitharthritis** project
3. **Settings > Environment Variables**
4. Add each variable above (mark as Production only)
5. Save and redeploy

## Step 3: Verify Production Deployment

### Check Deployment Status
1. Vercel Dashboard > **Deployments** tab
2. Latest deployment should show ✅ Ready
3. Verify domains: 
   - https://livingwitharthritis.org.uk
   - https://www.livingwitharthritis.org.uk (if configured)

### Smoke Tests
```bash
# Test homepage loads
curl -I https://livingwitharthritis.org.uk

# Check status code (should be 200)
# Verify no 5xx errors
```

### Monitor Errors
1. Sentry: https://sentry.io/organizations/yourorg/issues/
2. Vercel: Dashboard > **Function Logs** tab
3. Check for deployment errors

### Performance Check
1. Google PageSpeed Insights: https://pagespeed.insights.com
2. Enter: livingwitharthritis.org.uk
3. Verify Core Web Vitals are in "Good" range

### Analytics Verification
1. Google Analytics: Check real-time dashboard
2. Verify traffic is being tracked
3. Check event tracking (button clicks, forms)

## Step 4: Post-Deployment Verification

### SEO & Indexing
```bash
# Check if site is indexed
site:livingwitharthritis.org.uk
```

1. Google Search Console > Coverage
   - Verify pages are indexed
   - Check for crawl errors
   - Submit sitemaps if needed

2. Robots.txt check
   ```bash
   curl https://livingwitharthritis.org.uk/robots.txt
   ```

### SSL/Security
1. Browser: Check 🔒 icon in address bar
2. SSL Labs: https://www.ssllabs.com/ssltest/
3. Verify certificate is valid

### Database Connectivity
```bash
# Test Supabase connection via API
curl -H "Authorization: Bearer <anon-key>" \
  https://eswdtpmknwjxtvkyxvmi.supabase.co/rest/v1/
```

## Step 5: Rollback Procedure

If issues occur after deployment:

### Quick Rollback (via Vercel)
1. Vercel Dashboard > **Deployments**
2. Find the previous stable deployment
3. Click **...** > **Promote to Production**
4. Vercel will redeploy the previous version

### Full Rollback (via Git)
```bash
# Revert the last commit
git revert HEAD
git push origin main

# Then redeploy via Lovable
```

### Partial Rollback (Environment Variables)
If an env var caused issues:
1. Go to Vercel > Settings > Environment Variables
2. Update or remove problematic variable
3. Trigger redeploy: Vercel > Deployments > **Redeploy**

## Continuous Monitoring

### Daily
- Check Sentry for new errors
- Monitor Google Analytics (traffic, bounce rate)
- Review Vercel deployment logs

### Weekly
- Google Search Console: Performance report
- Core Web Vitals monitoring
- Error tracking review
- Database query performance

### Monthly
- Comprehensive SEO audit
- Performance optimization review
- Security audit (SSL, dependencies)
- Cost review (Vercel, Supabase, Sentry)

## Deployment Checklist

Before each deployment:

- [ ] All tests pass locally (`npm run lint`, `npm run build`)
- [ ] Phase complete and committed
- [ ] Environment variables configured in Vercel
- [ ] Sentry DSN configured for error tracking
- [ ] Database backups taken (Supabase)
- [ ] Google Search Console sitemaps updated
- [ ] Google Analytics tracking verified

After each deployment:

- [ ] Homepage loads without errors
- [ ] Core Web Vitals are "Good"
- [ ] Sentry shows no critical errors
- [ ] Google Analytics shows real-time traffic
- [ ] Database queries are responsive
- [ ] SSL certificate is valid
- [ ] No 5xx server errors in logs

## Troubleshooting

### "Build failed" error
- Check build logs in Vercel
- Verify all environment variables are set
- Check for TypeScript errors: `npm run build`
- Check node_modules: `rm -rf node_modules && npm ci`

### "500 Internal Server Error"
- Check Vercel Function Logs
- Check Sentry for stack traces
- Verify database connection (DATABASE_URL)
- Check API endpoint availability

### "Page not found" (404)
- Verify route exists in src/pages/
- Check for routing errors in App.tsx
- Vercel: Check for build output in .vercel/output

### Analytics not tracking
- Verify VITE_GA4_PRIMARY_ID is set
- Check browser console for gtag errors
- Verify GA4 property is receiving events
- Check for Content Security Policy blocking gtag

### Slow performance
- Check Core Web Vitals in PageSpeed Insights
- Review Vercel Analytics
- Check database query logs
- Verify CDN caching headers

## Cost Optimization

### Vercel
- Monitor deployment frequency (excessive builds cost)
- Use Vercel's pricing calculator
- Consider Pro plan if over free tier limits

### Supabase
- Monitor database rows and storage
- Use PgBouncer to reduce connection overhead
- Archive old data if needed

### Sentry
- Adjust error sampling (e.g., 10% in production)
- Set up noise filters for known non-critical errors
- Review monthly quota usage

## Resources

- [Lovable Documentation](https://docs.lovable.dev)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [Supabase Production Checklist](https://supabase.com/docs/guides/getting-started/architecture)
- [Sentry Release Tracking](https://docs.sentry.io/product/releases/)

## Support Contacts

- **Lovable:** support@lovable.dev
- **Vercel:** support@vercel.com (Pro plan) / Community forums
- **Supabase:** Community forums or Pro support
- **Sentry:** https://sentry.io/support/

---

**Next:** Monitor production metrics and iterate on Phase 2 enhancements.
