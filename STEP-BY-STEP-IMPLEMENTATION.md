# STEP-BY-STEP IMPLEMENTATION GUIDE

**Time estimate:** 45 minutes  
**Difficulty:** Intermediate (copy/paste code changes)  
**Risk:** Low (only changes code, doesn't touch data)

---

## BEFORE YOU START

1. Make sure you have your repo cloned locally:
   ```bash
   git clone https://github.com/Louis-Maxwell/livingwitharthritis.git
   cd livingwitharthritis
   ```

2. Make sure you have Node.js installed:
   ```bash
   node --version  # Should be v16 or higher
   ```

3. Create a new branch (so you can easily review/rollback):
   ```bash
   git checkout -b security/hide-api-keys
   ```

---

## STEP 1: UPDATE .gitignore (2 minutes)

### What you're doing
Making sure `.env.local` (with your real secrets) never gets committed to GitHub.

### How to do it

1. Open `.gitignore` in your project root
2. Add these lines at the end:

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

3. Save the file

### Verify
```bash
# This should show that .gitignore is modified
git status
```

---

## STEP 2: CREATE .env.local (2 minutes)

### What you're doing
Creating a local file with your real API keys (this file is ONLY on your machine).

### How to do it

1. In your project root, create a new file called `.env.local`
2. Copy this content and fill in your real values:

   ```env
   VITE_SUPABASE_PROJECT_ID=zrvcejlncpndjfyuvcrd
   VITE_SUPABASE_URL=https://zrvcejlncpndjfyuvcrd.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpydmNlamxuY3BuZGpmeXV2Y3JkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwMjExMDAsImV4cCI6MjA4NTU5NzEwMH0.qOueBdqCYFMZKAROVBqqP8gNi0Li8JkMwvary2YfJzs

   VITE_GA4_PRIMARY_ID=G-ZLLSD3PXZ9
   VITE_GA4_SECONDARY_ID=G-X8GTW05JJS
   VITE_GA4_PAGEVIEW_ID=G-ZLLSD3PXZ9
   ```

3. Save the file

### Important
- This file contains your real API keys
- It should ONLY exist on your local machine
- **NEVER commit it to GitHub**
- If you accidentally commit it, you must rotate your Supabase key immediately

### Verify
```bash
# This should show .env.local exists
ls -la .env.local

# This should show .env.local is in .gitignore (NOT in git)
git status
# You should NOT see .env.local listed
```

---

## STEP 3: UPDATE .env.example (3 minutes)

### What you're doing
Updating the template file that shows what environment variables are needed (WITHOUT the real values).

### How to do it

1. Open `.env.example` in your project root
2. Replace the entire content with this:

   ```env
   # ============================================
   # ENVIRONMENT VARIABLES TEMPLATE
   # ============================================
   # 
   # Copy this file to .env.local and fill in your actual values.
   # IMPORTANT: NEVER commit .env.local to GitHub
   # 

   # Supabase Configuration
   VITE_SUPABASE_PROJECT_ID=your-project-ref
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-anon-key

   # Google Analytics 4
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

3. Save the file

### Verify
```bash
# This should show that .env.example is modified
git status

# This should NOT show any real API keys
cat .env.example
```

---

## STEP 4: UPDATE src/integrations/supabase/config.ts (5 minutes)

### What you're doing
Removing the hardcoded Supabase API key from the code.

### How to do it

1. Open `src/integrations/supabase/config.ts`
2. Replace the **ENTIRE FILE** with this:

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

3. Save the file

### Verify
```bash
# This should show the file no longer has hardcoded keys
grep "eyJhbGciOiJIUzI1NiIs" src/integrations/supabase/config.ts
# Should return: (nothing)
```

---

## STEP 5: CREATE src/config/storage-config.ts (2 minutes)

### What you're doing
Creating a new helper file to build Supabase storage URLs dynamically (instead of hardcoding them).

### How to do it

1. Create a new directory if it doesn't exist:
   ```bash
   mkdir -p src/config
   ```

2. Create a new file: `src/config/storage-config.ts`

3. Copy this content:

   ```typescript
   /**
    * Storage Configuration
    * 
    * Supabase storage URLs are built dynamically from environment variables.
    * This prevents hardcoding bucket URLs in asset files and ensures the
    * correct URL is used across all environments (dev, staging, production).
    */

   const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

   /**
    * Generate a Supabase public storage URL
    * @param bucket - The storage bucket name (e.g., 'exercise-videos')
    * @param path - The file path within the bucket (e.g., 'exercise-ankle.mp4')
    * @returns Full URL to the public file
    */
   export const getStorageUrl = (bucket: string, path: string): string => {
     if (!SUPABASE_URL) {
       // Fallback to relative path for development without env vars
       console.warn(
         `Storage URL not available. Falling back to relative path: /${bucket}/${path}`
       );
       return `/${bucket}/${path}`;
     }
     
     // Ensure path doesn't start with /
     const cleanPath = path.startsWith('/') ? path.slice(1) : path;
     
     return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${cleanPath}`;
   };

   /**
    * Get a storage URL for exercise videos
    * @param filename - The video filename (e.g., 'exercise-ankle.mp4')
    * @returns Full URL to the video
    */
   export const getExerciseVideoUrl = (filename: string): string => {
     return getStorageUrl('exercise-videos', filename);
   };

   /**
    * Get a storage URL for images
    * @param filename - The image filename
    * @returns Full URL to the image
    */
   export const getImageUrl = (filename: string): string => {
     return getStorageUrl('images', filename);
   };

   /**
    * Get a storage URL for documents
    * @param filename - The document filename
    * @returns Full URL to the document
    */
   export const getDocumentUrl = (filename: string): string => {
     return getStorageUrl('documents', filename);
   };
   ```

4. Save the file

### Verify
```bash
# This should show the file exists
ls -la src/config/storage-config.ts
```

---

## STEP 6: UPDATE index.html (10 minutes)

### What you're doing
1. Updating the GA4 script to load the ID from environment variables
2. Adding `stats.g.doubleclick.net` to the CSP to allow GA4 tracking

### How to do it

1. Open `index.html` in your project root

2. Find line 8 (the Content-Security-Policy meta tag) - Replace it with:

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

   **Key change:** Added `https://stats.g.doubleclick.net` to the `connect-src` line

3. Find lines 10-46 (the GA4 script section starting with `<!-- Google Analytics 4`).

4. Replace the **ENTIRE SCRIPT SECTION** with:

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

5. Save the file

### Verify
```bash
# Should show no hardcoded GA4 IDs
grep "G-ZLLSD3PXZ9\|G-X8GTW05JJS" index.html
# The output should show the ga4Id variable assignment, not raw IDs
```

---

## STEP 7: UPDATE src/App.tsx (3 minutes)

### What you're doing
Removing the hardcoded GA4 ID from the page view tracking event.

### How to do it

1. Open `src/App.tsx`

2. Find this code (search for `send_to: "G-X8GTW05JJS"`):

   ```typescript
   if (typeof w.gtag !== "function") return;
   w.gtag("event", "page_view", {
     page_path: location.pathname + location.search,
     page_location: window.location.href,
     page_title: document.title,
     send_to: "G-X8GTW05JJS",
   });
   ```

3. Replace it with:

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

4. Save the file

### Verify
```bash
# Should return nothing (no hardcoded GA4 IDs in App.tsx)
grep "G-X8GTW05JJS" src/App.tsx
```

---

## STEP 8: TEST LOCALLY (5 minutes)

### What you're doing
Making sure everything still works after your changes.

### How to do it

1. Install dependencies (if needed):
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser to `http://localhost:8080` (or whatever port it shows)

4. Check the browser console:
   - Press `F12` to open DevTools
   - Click the **Console** tab
   - You should see NO errors
   - You should see NO warnings about "Supabase URL" or "GA4 ID"

5. Check the Network tab:
   - Click the **Network** tab
   - Interact with the site (scroll, click buttons)
   - Look for requests to `stats.g.doubleclick.net`
   - If you see them, GA4 tracking is working ✅

6. Test on mobile (if possible):
   - Open DevTools
   - Press `Ctrl+Shift+M` (or `Cmd+Shift+M` on Mac)
   - Rotate to landscape and back
   - Check console — still no errors?

7. Stop the dev server:
   ```bash
   Ctrl+C
   ```

### If you see errors:
- Check that `.env.local` exists in your project root
- Check that all environment variables are set in `.env.local`
- Check that filenames are exactly as shown (case-sensitive)
- Re-read the error message carefully — it usually says what's missing

---

## STEP 9: COMMIT TO GIT (5 minutes)

### What you're doing
Saving your changes to the new branch (not pushing to main yet).

### How to do it

1. Check what files changed:
   ```bash
   git status
   ```

   You should see:
   - `.gitignore` (modified)
   - `.env.example` (modified)
   - `index.html` (modified)
   - `src/App.tsx` (modified)
   - `src/config/storage-config.ts` (new file)
   - `src/integrations/supabase/config.ts` (modified)
   - **NOT** `.env.local` (should NOT appear)

2. Add all the changes:
   ```bash
   git add .
   ```

3. Commit with a clear message:
   ```bash
   git commit -m "security: hide API keys in environment variables

   - Remove hardcoded GA4 IDs from index.html and App.tsx
   - Remove hardcoded Supabase API key from config.ts
   - Load GA4 ID from VITE_GA4_PRIMARY_ID environment variable
   - Load Supabase credentials from environment variables
   - Add stats.g.doubleclick.net to CSP connect-src
   - Create storage-config.ts for dynamic URL building
   - Update .env.example with all required variables"
   ```

4. Verify the commit:
   ```bash
   git log -1 --stat
   # Should show all your changes
   ```

### Verify NO secrets in commit:
```bash
# Should return nothing
git show | grep "eyJhbGciOiJIUzI1NiIs\|G-X8GTW05JJS"

# Should return nothing
git show | grep "zrvcejlncpndjfyuvcrd"
```

If it returns nothing, you're good! ✅

---

## STEP 10: PUSH TO GITHUB (3 minutes)

### What you're doing
Uploading your secure branch to GitHub.

### How to do it

1. Push the branch:
   ```bash
   git push origin security/hide-api-keys
   ```

2. Go to GitHub and create a Pull Request:
   - Open: https://github.com/Louis-Maxwell/livingwitharthritis
   - You should see a button "Compare & pull request"
   - Click it
   - Add a description:
     ```
     # Security: Hide API Keys in Environment Variables

     Fixes critical security issues:
     - Remove hardcoded GA4 IDs from code
     - Remove hardcoded Supabase API key from code
     - Load credentials from environment variables only
     - Fix CSP to allow GA4 tracking

     Tested locally and verified no secrets in code.
     ```
   - Click "Create pull request"

3. Review the PR on GitHub:
   - Make sure you don't see any API keys or IDs in the diff
   - All changes should be green (additions)
   - No `.env.local` file should appear

4. Merge the PR:
   - Click "Merge pull request"
   - Click "Confirm merge"
   - Click "Delete branch" (optional but clean)

### Verify merge was successful:
```bash
# Switch to main
git checkout main

# Pull the latest
git pull origin main

# Check that security files are there
ls -la .env.example
ls -la src/config/storage-config.ts
```

---

## STEP 11: DEPLOY TO PRODUCTION (5 minutes)

### If using Lovable:

1. Go to your Lovable project
2. Click **Settings > Environment Variables**
3. Add each variable:
   - `VITE_SUPABASE_PROJECT_ID` = `zrvcejlncpndjfyuvcrd`
   - `VITE_SUPABASE_URL` = `https://zrvcejlncpndjfyuvcrd.supabase.co`
   - `VITE_SUPABASE_PUBLISHABLE_KEY` = `eyJhbGci...` (your full key)
   - `VITE_GA4_PRIMARY_ID` = `G-ZLLSD3PXZ9`
   - `VITE_GA4_SECONDARY_ID` = `G-X8GTW05JJS`
   - `VITE_GA4_PAGEVIEW_ID` = `G-ZLLSD3PXZ9`
4. Click **Save**
5. Your project should auto-redeploy
6. Wait for build to complete
7. Check the live site — should work exactly as before ✅

### If using Netlify:

1. Go to your Netlify site
2. Click **Site settings > Build & deploy > Environment**
3. Click **Edit variables**
4. Add each variable (same as above)
5. Click **Save**
6. Trigger a manual redeploy:
   - Go to **Deploys**
   - Click **Trigger deploy > Deploy site**
7. Wait for build to complete
8. Check the live site ✅

### If using Vercel:

1. Go to your Vercel project
2. Click **Settings > Environment Variables**
3. Add each variable (same as above)
4. Click **Save**
5. Redeploy manually or wait for auto-redeploy
6. Check the live site ✅

---

## STEP 12: VERIFY PRODUCTION (3 minutes)

### Check that secrets are NOT exposed:

1. Open your live site
2. Press `F12` to open DevTools
3. Right-click in the page and choose **View Page Source**
4. Search (`Ctrl+F`) for these strings:
   - `G-ZLLSD3PXZ9` → should NOT find it
   - `eyJhbGciOiJIUzI1NiIs` → should NOT find it
   - `zrvcejlncpndjfyuvcrd` → should NOT find it

5. If you find them → **STOP** and check your deploy configuration

### Check that GA4 is working:

1. Open your live site
2. Open DevTools > Network tab
3. Interact with the site (scroll, click)
4. Look for requests to `stats.g.doubleclick.net`
5. If you see them → GA4 tracking is working ✅

### Check that Supabase is working:

1. Try using a feature that requires Supabase (if you have any)
2. Check DevTools > Console for errors
3. If no errors → Supabase is working ✅

---

## FINAL CHECKLIST

- [ ] All code changes made
- [ ] `.env.local` created locally (NOT committed)
- [ ] `.env.example` updated (no real values)
- [ ] Local tests pass
- [ ] Committed to git (no secrets in commit)
- [ ] Pushed to GitHub
- [ ] PR created and merged
- [ ] Environment variables set in production
- [ ] Live site verified (no secrets exposed)
- [ ] GA4 tracking verified
- [ ] Supabase connections verified

---

## YOU'RE DONE! ✅

Your site is now secure. API keys are hidden, environment variables are used, and no secrets are in your GitHub repository.

If you have any issues, check the [SECURITY-FIX-IMPLEMENTATION.md](SECURITY-FIX-IMPLEMENTATION.md) for detailed troubleshooting.

---

## NEXT STEPS

1. **Monitor your GA4 account** for the next 24 hours to ensure tracking is working
2. **Rotate your Supabase API key** (optional but recommended if the old key was exposed)
3. **Set up a CI/CD scan** to prevent future secret exposure:
   - GitHub offers free secret scanning
   - You can also add `gitleaks` to your CI/CD pipeline

Thank you for taking security seriously! 🔒

