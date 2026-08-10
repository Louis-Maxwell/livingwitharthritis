# Read This Before Uploading Anything

## ⚠️ One important check before you upload — please don't skip this

This update removes a hidden safety net: right now, if your Supabase login key
isn't set correctly on your live site, the site quietly uses a backup key
that's built into the code (which is the actual security problem we're
fixing). Once you upload these files, that backup goes away on purpose.

**This means: if your live site's Supabase key isn't already set up correctly
in Lovable, your site could go blank or show errors after this update.**

### How to check first (2 minutes, no coding)

1. Go to your Lovable project
2. Look for **Project Settings → Environment Variables** (or similar wording)
3. Confirm these three exist and have real values (not blank):
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
   - `VITE_SUPABASE_PROJECT_ID`

If all three are already there with real values — you're safe to proceed.
If any are missing, add them there first, **then** upload these files.

(You do NOT need to add anything for analytics — see below, GA4 has been
removed entirely, so there's nothing to configure for it.)

---

## What's changed in this update

**Note:** Supabase itself is being **kept** — it still runs your donations,
logins, and admin dashboard. Only the exposed key is being fixed. Google
Analytics (GA4) is being **removed entirely**, per your instruction — you will
stop receiving any visitor/traffic statistics after this goes live.

| File | Repo location | What it does |
|---|---|---|
| `index.html` | root of repo | Removes all GA4 tracking scripts; tightens the security policy now that GA4 domains aren't needed |
| `src/App.tsx` | `src/` folder | Removes the GA4 page-view tracking code; adds the new accessibility button |
| `src/main.tsx` | `src/` folder | Loads the new accessibility styling |
| `src/integrations/supabase/config.ts` | `src/integrations/supabase/` | Removes the hidden backup login key (the real security fix — Supabase itself stays) |
| `src/components/HelplineWidget.tsx` | `src/components/` | Removes a direct GA4 tracking call (helpline button clicks) |
| `src/pages/guides/NewlyDiagnosed.tsx` | `src/pages/guides/` | Removes a direct GA4 tracking call (print button) |
| `src/components/a11y/AccessibilityToolbar.tsx` | new folder `src/components/a11y/` | The accessibility settings button your readers will see |
| `src/hooks/a11y/useAccessibilityPreferences.ts` | new folder `src/hooks/a11y/` | Makes the accessibility button remember each reader's settings |
| `src/styles/accessibility.css` | new folder `src/styles/` | The styling for large text, dyslexia font, high contrast |

**Not touched, but worth knowing:** your codebase has a shared helper file
(`src/lib/analytics.ts`) that ~20 other files call into for tracking events.
I did not delete it or its imports, since that would mean editing 20 files
and risking breaking the build. Instead, because GA4 no longer loads at all,
that helper now safely does nothing when those 20 files call it — no errors,
no data sent anywhere, just inert code. If you'd like those 20 files properly
cleaned up too (not just harmless), let me know and I'll do that as a
separate, careful pass.

---

## How to upload to GitHub (no terminal needed)

1. Go to your repo: `https://github.com/Louis-Maxwell/livingwitharthritis`
2. Click **Add file → Upload files** (top right of the file list)
3. **Drag the whole extracted folder** into the upload box — GitHub will
   place each file in the matching folder automatically, as long as you
   drag folders and not just loose files
4. Scroll down, write a commit message like: `"Remove GA4, fix hardcoded Supabase key, add accessibility toolbar"`
5. Click **Commit changes**

If GitHub asks whether to replace existing files (like `App.tsx`), say yes —
that's expected, it's an update.

---

## After uploading

1. Go back to Lovable and click **Deploy** (or wait for auto-deploy if that's on)
2. Open your live site
3. Check it looks normal and loads properly
4. Open a blog post — you should see a small gear/settings icon in the
   bottom-right corner. That's the new accessibility toolbar.
5. Open your browser's console (F12 → Console tab) — you should see **no**
   more requests to `google-analytics.com` or `googletagmanager.com` at all

If the site breaks after deploying, it's almost certainly the environment
variable check above — go back and confirm those 3 Supabase values are set
in Lovable.

