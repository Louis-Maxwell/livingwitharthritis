# CODE CHANGES REFERENCE GUIDE

Quick before/after for the files you need to update.

---

## FILE 1: index.html

### WHAT TO FIND
Lines 8-46 (the entire GA4 setup section)

### CURRENT CODE (INSECURE) ❌

```html
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.supabase.co https://js.stripe.com https://www.googletagmanager.com https://www.google-analytics.com https://*.evarist.ai; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob: https:; media-src 'self' https://*.supabase.co; connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api.resend.com https://api-m.paypal.com https://api-m.sandbox.paypal.com https://ai.gateway.lovable.dev https://api.stripe.com https://*.lovable.app https://*.lovableproject.com https://www.google-analytics.com https://analytics.google.com https://*.google-analytics.com https://*.analytics.google.com https://*.evarist.ai; frame-src 'self' https://*.paypal.com https://js.stripe.com https://hooks.stripe.com; object-src 'none'; base-uri 'self'; form-action 'self' https://checkout.stripe.com;" />

    <!-- Google Analytics 4 — DEFERRED. Loading gtag before hydration costs
         ~200ms of main-thread and blocks LCP on mobile. We instead queue
         events into dataLayer, and load gtag AFTER first paint (via
         requestIdleCallback / setTimeout fallback), which keeps every early
         pageview but removes it from the LCP critical path. Consent decline
         and bot exclusion (below) still short-circuit before load. -->
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-ZLLSD3PXZ9', {
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
          s.src = 'https://www.googletagmanager.com/gtag/js?id=G-ZLLSD3PXZ9';
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

### UPDATED CODE (SECURE) ✅

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

### KEY CHANGES:
1. **Added `https://stats.g.doubleclick.net` to connect-src** (enables GA4 tracking)
2. **Load GA4 ID from `import.meta.env.VITE_GA4_PRIMARY_ID`** (instead of hardcoding)
3. **Use `ga4Id` variable** in both gtag config and script URL

---

## FILE 2: src/App.tsx

### WHAT TO FIND
Search for `send_to: "G-X8GTW05JJS"`

It should be in a `useEffect` that tracks page views.

### CURRENT CODE (INSECURE) ❌

```typescript
    if (typeof w.gtag !== "function") return;
    w.gtag("event", "page_view", {
      page_path: location.pathname + location.search,
      page_location: window.location.href,
      page_title: document.title,
      send_to: "G-X8GTW05JJS",
    });
```

### UPDATED CODE (SECURE) ✅

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

### KEY CHANGES:
1. **Remove the `send_to` property** (no longer needed)
2. **Add comment** explaining why (optional, but helpful for future developers)

---

## FILE 3: .gitignore

### WHAT TO FIND
The `.gitignore` file in your project root

### ADD THESE LINES (if not already present)

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
```

### Important:
- The lines `# Node modules` / `node_modules/` should already be there
- We're just adding the env-var-specific lines

---

## FILE 4: src/integrations/supabase/config.ts

### REPLACE THE ENTIRE FILE

See: `supabase-config-UPDATED.ts` in the output folder

The key changes:
1. **Remove hardcoded FALLBACK_PROJECT_ID**
2. **Remove hardcoded FALLBACK_PUBLISHABLE_KEY**
3. **Use empty strings as fallbacks** (fail safely if env not set)
4. **Add production validation** (ensures env vars are set before deploying)

---

## FILE 5: Create New File - src/config/storage-config.ts

See: `storage-config.ts` in the output folder

This file:
- Builds Supabase storage URLs dynamically
- Prevents hardcoding URLs in asset files
- Works across all environments

Usage:
```typescript
import { getExerciseVideoUrl } from '@/config/storage-config';

const url = getExerciseVideoUrl('exercise-ankle.mp4');
// Returns: https://zrvcejlncpndjfyuvcrd.supabase.co/storage/v1/object/public/exercise-videos/exercise-ankle.mp4
```

---

## FILE 6: .env.example (UPDATE)

See: `.env.example` in the output folder

Replace with the template that has:
- All required variables listed
- No real values
- Clear documentation
- Comments explaining where to get each value

---

## QUICK CHECKLIST

- [ ] Update index.html (GA4 section + CSP)
- [ ] Update src/App.tsx (remove send_to)
- [ ] Replace src/integrations/supabase/config.ts
- [ ] Create src/config/storage-config.ts (new file)
- [ ] Update .gitignore
- [ ] Update .env.example
- [ ] Create .env.local locally with real values
- [ ] Verify no GA4 IDs visible in code
- [ ] Verify no Supabase keys visible in code
- [ ] Test locally with `npm run dev`
- [ ] Commit and push to GitHub
- [ ] Verify .env.local is NOT in git

---

## TESTING AFTER CHANGES

Run locally:
```bash
npm run dev
```

In browser DevTools console:
- Should see NO "Supabase URL not set" errors
- Should see NO "GA4 ID missing" warnings
- When you interact with page, check Network tab
- Look for `stats.g.doubleclick.net` requests
- If you see them, GA4 tracking is working ✅

---

## NEED HELP?

Common issues:

**Q: "VITE_GA4_PRIMARY_ID is undefined in index.html"**
A: import.meta.env only works in .ts/.tsx files, not in <script> tags in HTML.
   Use `var ga4Id = 'G-ZLLSD3PXZ9';` in index.html as a fallback.

**Q: "Supabase connection fails after changes"**
A: Make sure .env.local has VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY set.
   If on production, verify env vars are set in Lovable/Netlify.

**Q: "Still seeing hardcoded IDs in git history"**
A: Follow the "Remove secrets from git history" section in the main guide.
   You'll need to use `git filter-branch` or a tool like `gitleaks`.

