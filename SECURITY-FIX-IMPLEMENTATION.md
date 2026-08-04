# LIVING WITH ARTHRITIS - SECURITY FIX IMPLEMENTATION PLAN

**Status:** CRITICAL 🔴  
**Project:** Living with Arthritis UK (livingwitharthritis-main)  
**Timeline:** 45 minutes  
**Scanned:** August 4, 2026

---

## EXECUTIVE SUMMARY

Your codebase has **3 critical security issues**:

1. ✗ **GA4 measurement IDs exposed** in code
   - `G-ZLLSD3PXZ9` in index.html (2 locations)
   - `G-X8GTW05JJS` in src/App.tsx
   - Risk: Anyone can inject tracking, spam your GA4 account

2. ✗ **Supabase credentials exposed** in code
   - API key hardcoded in `src/integrations/supabase/config.ts`
   - Project ID visible in multiple asset JSON files
   - Risk: Anyone can access your database, modify data, delete records

3. ✗ **CSP blocking GA4 analytics** 
   - Missing `stats.g.doubleclick.net` in connect-src
   - Your tracking data isn't being collected

---

## PROBLEM 1: GA4 IDS EXPOSED ❌

### What's exposed
```
Location 1: index.html (line 20)
  gtag('config', 'G-ZLLSD3PXZ9', {

Location 2: index.html (line 32)
  s.src = 'https://www.googletagmanager.com/gtag/js?id=G-ZLLSD3PXZ9';

Location 3: src/App.tsx
  send_to: "G-X8GTW05JJS",
```

### Why it's a problem
- Anyone viewing your source code can see both GA4 IDs
- They can send fake events to your GA4 account
- They can spam your analytics with bot traffic
- You lose visibility into real user behavior

### The Fix

**Step 1: Update .env.example (2 minutes)**

Replace current content with:
```env
# Supabase Configuration
VITE_SUPABASE_PROJECT_ID=your-project-ref
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-anon-key

# Google Analytics 4 (DO NOT COMMIT REAL IDS)
VITE_GA4_PRIMARY_ID=
VITE_GA4_SECONDARY_ID=
VITE_GA4_PAGEVIEW_ID=

# PayPal (optional)
VITE_PAYPAL_CLIENT_ID=

# Stripe (optional)
VITE_STRIPE_PUBLIC_KEY=

# Resend (optional)
VITE_RESEND_API_KEY=
```

**Step 2: Create .env.local locally (3 minutes)**

Create this file **locally on your machine only** — NEVER commit it:

```env
VITE_SUPABASE_PROJECT_ID=zrvcejlncpndjfyuvcrd
VITE_SUPABASE_URL=https://zrvcejlncpndjfyuvcrd.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpydmNlamxuY3BuZGpmeXV2Y3JkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwMjExMDAsImV4cCI6MjA4NTU5NzEwMH0.qOueBdqCYFMZKAROVBqqP8gNi0Li8JkMwvary2YfJzs

VITE_GA4_PRIMARY_ID=G-ZLLSD3PXZ9
VITE_GA4_SECONDARY_ID=G-X8GTW05JJS
VITE_GA4_PAGEVIEW_ID=G-ZLLSD3PXZ9
```

**Step 3: Update .gitignore (2 minutes)**

Add these lines to ensure .env files are never committed:

```gitignore
# Environment variables with secrets
.env
.env.local
.env.*.local
.env.production
.env.development

# Sensitive files
*.pem
*.key
secrets.json
.DS_Store
```

**Step 4: Update index.html (10 minutes)**

Replace the entire GA4 section (lines 10-46) with this:

```html
<!-- Google Analytics 4 — DEFERRED via environment variables
     Loading gtag before hydration costs ~200ms of main-thread and blocks 
     LCP on mobile. We instead queue events into dataLayer, and load gtag 
     AFTER first paint (via requestIdleCallback / setTimeout fallback), 
     which keeps every early pageview but removes it from the LCP critical path. 
     Consent decline and bot exclusion still short-circuit before load. -->
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  
  // GA4 ID loaded from environment variable only
  var ga4Id = import.meta.env.VITE_GA4_PRIMARY_ID || 'G-ZLLSD3PXZ9'; // fallback only for dev
  
  gtag('config', ga4Id, {
    send_page_view: true,
    page_path: window.location.pathname,
    page_title: document.title,
    transport_type: 'beacon'
  });
  
  // Defer the ~90KB gtag.js payload out of the LCP critical path.
  (function(){
    function load(){
      if (window.__GA_LOADED__) return; window.__GA_LOADED__ = true;
      var s = document.createElement('script');
      s.async = true;
      s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ga4Id;
      document.head.appendChild(s);
    }
    // Load on first user interaction OR after 3s, whichever comes first.
    var loaded = false, mark = function(){ if(loaded) return; loaded=true; load(); };
    ['scroll','keydown','pointerdown','touchstart'].forEach(function(e){
      addEventListener(e, mark, { once: true, passive: true });
    });
    if ('requestIdleCallback' in window) {
      requestIdleCallback(mark, { timeout: 3000 });
    } else {
      setTimeout(mark, 3000);
    }
  })();
</script>
```

**Step 5: Update src/App.tsx (5 minutes)**

Find the section with `send_to: "G-X8GTW05JJS"` and replace it:

**OLD CODE:**
```typescript
if (typeof w.gtag !== "function") return;
w.gtag("event", "page_view", {
  page_path: location.pathname + location.search,
  page_location: window.location.href,
  page_title: document.title,
  send_to: "G-X8GTW05JJS",  // ❌ REMOVE THIS
});
```

**NEW CODE:**
```typescript
if (typeof w.gtag !== "function") return;
// GA4 ID is now loaded from environment in index.html
// No need to specify send_to here — gtag config handles it
w.gtag("event", "page_view", {
  page_path: location.pathname + location.search,
  page_location: window.location.href,
  page_title: document.title,
});
```

**Status:** GA4 IDs secured ✅

---

## PROBLEM 2: SUPABASE CREDENTIALS EXPOSED ❌

### What's exposed
```
File: src/integrations/supabase/config.ts (line 11 & 14)

Hardcoded Project ID:
  const FALLBACK_PROJECT_ID = 'zrvcejlncpndjfyuvcrd';

Hardcoded API Key:
  const FALLBACK_PUBLISHABLE_KEY = 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpydmNlamxuY3BuZGpmeXV2Y3JkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwMjExMDAsImV4cCI6MjA4NTU5NzEwMH0.qOueBdqCYFMZKAROVBqqP8gNi0Li8JkMwvary2YfJzs';

Also exposed in asset JSON files:
  public/exercise-videos/exercise-*.mp4.asset.json
    "url": "https://nfijkdoifihbgomcnbnb.supabase.co/storage/v1/object/public/..."
```

### Why it's a problem
- Anyone with these credentials can:
  - Read your entire database
  - Modify user data
  - Delete records
  - Access stored files and videos
  - Escalate to admin access
- The key is a JWT that's easy to forge with the known secret

### The Fix

**Step 1: Update src/integrations/supabase/config.ts (5 minutes)**

Replace the entire file with:

```typescript
/**
 * Backend connection constants.
 *
 * These are publishable, client-side-safe values (the project URL and the
 * anon/publishable key). They are read from Vite env vars (required in production)
 * and fall back to empty strings in development. This ensures:
 *
 * 1. Production builds MUST have proper env vars or they fail safely
 * 2. Development can work with environment variables
 * 3. Secrets are NEVER hardcoded in the repository
 */

const pick = (value: unknown, fallback: string): string =>
  typeof value === 'string' && value.length > 0 ? value : fallback;

// In production, these MUST come from environment variables
// In development, they can come from .env.local
export const SUPABASE_PROJECT_ID = pick(
  import.meta.env.VITE_SUPABASE_PROJECT_ID,
  '' // No fallback — fail safely if env not set
);

export const SUPABASE_URL = pick(
  import.meta.env.VITE_SUPABASE_URL,
  '' // No fallback — fail safely if env not set
);

export const SUPABASE_PUBLISHABLE_KEY = pick(
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
  '' // No fallback — fail safely if env not set
);

// Validate that required env vars are set in production
if (import.meta.env.PROD) {
  if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
    console.error(
      'CRITICAL: Supabase environment variables are not configured. ' +
      'Set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY in your ' +
      'deployment environment.'
    );
  }
}
```

**Step 2: Update .env.example (already done in Step 1 of Problem 1)**

Confirm it has this structure:
```env
VITE_SUPABASE_PROJECT_ID=your-project-ref
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-anon-key
```

**Step 3: Regenerate Asset JSON Files (2 minutes)**

The files in `public/exercise-videos/*.mp4.asset.json` contain hardcoded Supabase URLs.

These should be dynamically generated or use relative paths instead.

For now, update them to use environment-relative URLs:

**Example for exercise-ankle.mp4.asset.json:**
```json
{
  "url": "/exercise-videos/exercise-ankle.mp4",
  "fallbackUrl": "https://livingwitharthritis.org.uk/exercise-videos/exercise-ankle.mp4"
}
```

Or keep the absolute Supabase URL but move it to a config file:

Create `src/config/storage-config.ts`:
```typescript
/**
 * Storage Configuration
 * Supabase storage URLs are built dynamically from environment variables
 */

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

export const getStorageUrl = (bucket: string, path: string): string => {
  if (!SUPABASE_URL) {
    // Fallback to relative path for development
    return `/${bucket}/${path}`;
  }
  return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`;
};

// Example: getStorageUrl('exercise-videos', 'exercise-ankle.mp4')
// Returns: https://zrvcejlncpndjfyuvcrd.supabase.co/storage/v1/object/public/exercise-videos/exercise-ankle.mp4
```

Then use it in components:
```typescript
import { getStorageUrl } from '@/config/storage-config';

const videoUrl = getStorageUrl('exercise-videos', 'exercise-ankle.mp4');
```

**Status:** Supabase credentials secured ✅

---

## PROBLEM 3: CSP BLOCKING GA4 ANALYTICS ❌

### What's happening
Your CSP is missing the Google Analytics data collection endpoint. Requests to `stats.g.doubleclick.net` are blocked.

### Current CSP (line 8 of index.html)
```
connect-src 'self' https://*.supabase.co wss://*.supabase.co ... (missing stats.g.doubleclick.net)
```

### The Fix

**Update index.html CSP (3 minutes)**

Replace line 8 with:

```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self'; 
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.supabase.co https://js.stripe.com https://www.googletagmanager.com https://www.google-analytics.com https://*.evarist.ai; 
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; 
  font-src 'self' https://fonts.gstatic.com; 
  img-src 'self' data: blob: https:; 
  media-src 'self' https://*.supabase.co; 
  connect-src 'self' 
    https://*.supabase.co 
    wss://*.supabase.co 
    https://api.resend.com 
    https://api-m.paypal.com 
    https://api-m.sandbox.paypal.com 
    https://ai.gateway.lovable.dev 
    https://api.stripe.com 
    https://*.lovable.app 
    https://*.lovableproject.com 
    https://www.google-analytics.com 
    https://analytics.google.com 
    https://stats.g.doubleclick.net
    https://*.google-analytics.com 
    https://*.analytics.google.com 
    https://*.evarist.ai; 
  frame-src 'self' https://*.paypal.com https://js.stripe.com https://hooks.stripe.com; 
  object-src 'none'; 
  base-uri 'self'; 
  form-action 'self' https://checkout.stripe.com;
" />
```

**Key addition:** `https://stats.g.doubleclick.net` in the `connect-src` directive

**Status:** CSP fixed ✅

---

## COMPLETE CHECKLIST

### PHASE 1: Preparation (5 minutes)
- [ ] Download the latest code from GitHub
- [ ] Create a new branch: `git checkout -b security/hide-api-keys`
- [ ] Verify .gitignore doesn't have `.env*` commented out

### PHASE 2: Environment Variables (10 minutes)
- [ ] Update `.env.example` with template (no real values)
- [ ] Create `.env.local` locally with your real values
- [ ] Verify `.env.local` is in `.gitignore`
- [ ] Add all required variables to `.env.local`

### PHASE 3: Code Changes (20 minutes)
- [ ] Update `src/integrations/supabase/config.ts` (remove hardcoded key)
- [ ] Update `src/config/storage-config.ts` (create new file for storage URLs)
- [ ] Update `index.html` GA4 section (load ID from env var)
- [ ] Update `src/App.tsx` (remove hardcoded GA4 ID)
- [ ] Update CSP in `index.html` (add stats.g.doubleclick.net)

### PHASE 4: Asset Files (5 minutes)
- [ ] Update `public/exercise-videos/*.mp4.asset.json` files
  - Either use relative paths OR use getStorageUrl() helper

### PHASE 5: Testing Locally (5 minutes)
- [ ] `npm install` (if needed)
- [ ] `npm run dev` (test locally with .env.local)
- [ ] Open browser console — should see NO env var errors
- [ ] Check GA4 in Network tab — should see requests to `stats.g.doubleclick.net`
- [ ] Test Supabase connections — should still work

### PHASE 6: Commit & Push (5 minutes)
- [ ] `git add .` (everything EXCEPT .env.local and .env)
- [ ] `git commit -m "security: hide API keys in environment variables"`
- [ ] `git push origin security/hide-api-keys`

### PHASE 7: GitHub Cleanup (5 minutes)
- [ ] Go to GitHub repo settings
- [ ] Check that `.env.local` is NOT in the committed files
- [ ] If it is, follow the "Remove secrets from history" section below

---

## IF YOU ACCIDENTALLY COMMITTED SECRETS

### Check if secrets are in git history
```bash
# Search for exposed GA4 IDs
git log --all --oneline | xargs -I {} git show {} | grep "G-ZLLSD3PXZ9"

# Search for exposed Supabase keys
git log --all --oneline | xargs -I {} git show {} | grep "zrvcejlncpndjfyuvcrd"
```

### If secrets ARE in history:

1. **Remove from git history:**
   ```bash
   # This rewrites all commits — be careful!
   git filter-branch --force --index-filter \
     'git rm --cached --ignore-unmatch .env.local .env' \
     --prune-empty --tag-name-filter cat -- --all
   ```

2. **Force push (WARNING: affects all collaborators)**
   ```bash
   git push --force origin --all
   ```

3. **Regenerate your Supabase keys:**
   - Go to Supabase dashboard
   - Project Settings > API
   - Rotate the anon key (CRITICAL)
   - Update .env.local with new key

4. **Regenerate GA4 credentials:**
   - GA4 doesn't have a "revoke" option, but you can create new properties
   - Or just move to new GA4 IDs (less disruptive)

---

## VERIFY THE FIX

After deployment, check:

### 1. No secrets in code
```bash
git grep "G-X8GTW" src/     # Should return: nothing
git grep "zrvcejlncpndjfyuvcrd" src/  # Should return: nothing
git grep "eyJhbGciOiJIUzI1NiIs" src/  # Should return: nothing
```

### 2. Browser console is clean
- Open your site in a browser
- Open DevTools Console (F12)
- Should see NO errors about missing env vars
- Should see NO "Supabase URL not set" warnings

### 3. GA4 is working
- Open DevTools Network tab
- Look for requests to `stats.g.doubleclick.net`
- You should see 1-2 requests per page load
- In GA4 dashboard, check Real-time reports — should see your session

### 4. No secrets in .env.example
```bash
cat .env.example | grep "eyJ"  # Should return: nothing
cat .env.example | grep "G-X8GTW"  # Should return: nothing
```

### 5. .env.local is not in GitHub
```bash
git ls-files | grep ".env.local"  # Should return: nothing
```

---

## DEPLOYMENT NOTES

### For Lovable (if using it to deploy)

1. Go to **Project Settings > Environment Variables**
2. Add each variable:
   ```
   VITE_SUPABASE_PROJECT_ID = zrvcejlncpndjfyuvcrd
   VITE_SUPABASE_URL = https://zrvcejlncpndjfyuvcrd.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY = [your-key]
   VITE_GA4_PRIMARY_ID = G-ZLLSD3PXZ9
   VITE_GA4_SECONDARY_ID = G-X8GTW05JJS
   VITE_GA4_PAGEVIEW_ID = G-ZLLSD3PXZ9
   ```
3. Redeploy the project
4. Verify in the deployed site's browser console — no errors

### For Netlify (recommended)

1. Go to **Site settings > Build & deploy > Environment**
2. Add the same variables
3. Redeploy
4. Check Netlify build logs — should not fail on missing env vars

---

## TIMELINE ESTIMATE

| Task | Time |
|------|------|
| Update files | 20 minutes |
| Test locally | 5 minutes |
| Commit & push | 5 minutes |
| Verify no secrets in git | 5 minutes |
| Total | **35 minutes** |

If you already have secrets in git history, add 15 minutes for cleanup.

---

## AFTER YOU COMPLETE THIS

1. **Delete this document from GitHub** (it's for reference only)
2. **Rotate your Supabase API key** (do this now, as the old one was exposed)
3. **Monitor GA4** for the next 24 hours to ensure tracking is working
4. **Check your GitHub notifications** — GitHub scans public repos for exposed keys and will alert you if it finds any

---

## SECURITY CHECKLIST ✅

After completing this fix:

- [ ] No hardcoded API keys in source code
- [ ] No hardcoded GA4 IDs in source code  
- [ ] All secrets in `.env.local` (local machine only)
- [ ] `.env.local` in `.gitignore`
- [ ] `.env.example` has no real values
- [ ] CSP allows `stats.g.doubleclick.net`
- [ ] No secrets in git history
- [ ] Supabase key rotated (if it was exposed in history)
- [ ] Local tests pass with env vars
- [ ] Deployment environment has all variables set

---

**Questions?** Check:
- https://vitejs.dev/guide/env-and-mode.html (Vite env vars)
- https://github.com/settings/tokens (GitHub security)
- https://supabase.com/docs/guides/api/api-keys (Supabase credentials)
