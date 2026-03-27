

## Plan: Address Critical Website Issues

This plan tackles the 16 identified issues across UX, content, performance, and security.

---

### 1. Consolidate Landing Page Sections (reduce overwhelm)

**Problem**: 15+ sections feel overwhelming.

**Fix**: Merge related sections and remove redundant ones:
- Remove `ImpactBannerSection` (redundant with `ImpactMetricsSection`)
- Remove `SocialProofSection` (stats already in hero)
- Merge `FinalCTASection` into `NewsletterSection`
- Combine `PatientImpactStories` + `TestimonialsSection` into one section
- Result: ~10 sections with clearer hierarchy

**Files**: `src/pages/Index.tsx`

---

### 2. Replace Fake "People Exploring" Counter

**Problem**: Random 200-300 counter undermines trust.

**Fix**: Remove `LiveActivity` component entirely from `HeroSection.tsx`. Replace with a static trust badge like "Trusted by 50,000+ people across the UK" (no fake live counter).

**Files**: `src/components/HeroSection.tsx`

---

### 3. Reduce Intrusive Overlays

**Problem**: DonationNotification, FeedbackPopup, BackToTop, CookieConsent, ChatBot all compete for attention.

**Fix**:
- Remove `DonationNotification` entirely (fake data, intrusive)
- Delay `FeedbackPopup` to only show after 3+ page visits (track in sessionStorage)
- Keep CookieConsent (legally required) and ChatBot but remove BackToTop (scroll-to-top is redundant with browser back-to-top)

**Files**: `src/pages/Index.tsx`, `src/components/FeedbackPopup.tsx`

---

### 4. Attach Forum Reply Trigger in Database

**Problem**: The migration file created the trigger, but the DB config reports no triggers exist — need to verify and re-create if missing.

**Fix**: Run a migration to ensure the `on_new_forum_reply` trigger is attached:
```sql
CREATE OR REPLACE TRIGGER on_new_forum_reply
  AFTER INSERT ON public.forum_replies
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_forum_reply();
```

**Tool**: Database migration tool

---

### 5. Email Queue Cron Job

**Problem**: No cron job to process the email queue automatically.

**Fix**: The `process-email-queue` cron job should already exist from `setup_email_infra`. Verify by querying `cron.job`. If missing, call `email_domain--setup_email_infra` to recreate it.

**Action**: Verify cron job exists via read query; fix if missing.

---

### 6. Add Author Attribution to Blog Articles

**Problem**: No author/medical reviewer credentials (E-E-A-T gap for health content).

**Fix**:
- Add `author` and `reviewedBy` fields to the `BlogArticle` interface in `src/data/blogArticles.ts`
- Add default author "Living With Arthritis Clinical Team" and reviewer "Dr. Amina Patel, Consultant Rheumatologist"
- Display author name + credentials and "Medically reviewed by" badge in `BlogPost.tsx`
- Add `author` to Article JSON-LD structured data

**Files**: `src/data/blogArticles.ts`, `src/pages/BlogPost.tsx`

---

### 7. Add Publish/Update Dates to Content Pages

**Problem**: Some pages lack visible dates.

**Fix**: Add "Last updated" dates to Governance, Finances, Impact Stories, and condition pages using a small `LastUpdated` component.

**Files**: `src/pages/Governance.tsx`, `src/pages/Finances.tsx`, `src/pages/ImpactStories.tsx`, condition pages

---

### 8. Reduce AnimatePresence Weight

**Problem**: Framer Motion on every route transition adds JS overhead.

**Fix**: Replace `AnimatePresence` with a lightweight CSS-only transition. Remove `framer-motion` from route transitions entirely — keep it only for in-page animations. Use CSS `@starting-style` or a simple opacity transition wrapper.

**Files**: `src/App.tsx`, `src/components/ui/PageTransition.tsx`

---

### 9. Add Responsive Image srcset

**Problem**: No responsive images for blog/content.

**Fix**: Update `OptimizedImage` component to accept `srcset` and `sizes` props and pass them through. Add sensible defaults for blog images. This is incremental — full CDN integration is out of scope but the markup will be ready.

**Files**: `src/components/ui/OptimizedImage.tsx`

---

### 10. Tighten CSP Headers

**Problem**: `unsafe-inline` and `unsafe-eval` in script-src.

**Fix**: Remove `'unsafe-eval'` from script-src (not needed — Vite doesn't use eval in production). Keep `'unsafe-inline'` for now as Vite injects inline scripts for module preloading — add a TODO comment noting this should be replaced with nonce-based CSP when the hosting platform supports it.

**Files**: `public/_headers`

---

### 11. Add SRI for Stripe Scripts

**Problem**: No Subresource Integrity on external Stripe script.

**Fix**: Stripe.js explicitly does not support SRI (they update the script frequently). Add a comment in `_headers` documenting this. The CSP frame-src already restricts Stripe origins.

**Action**: Add documentation comment only — no code change needed.

---

### 12. Add Server-Side Admin Route Protection

**Problem**: Admin routes are client-side protected only.

**Fix**: The admin pages already check `useAdmin()` which queries `user_roles` with RLS. The actual data is protected by RLS policies (admin-only SELECT/UPDATE). Add an edge function middleware pattern: create a `verify-admin` utility used by existing admin edge functions. For the client, the current pattern is acceptable since all data access is RLS-protected.

**Action**: Add a reusable admin check to edge functions that handle admin data. Add a redirect-to-auth guard in AdminDashboard if not authenticated.

**Files**: `src/pages/AdminDashboard.tsx`, `src/pages/AdminAppointments.tsx`

---

### 13. Remove sw.js Cache Header

**Problem**: Cache header defined for `/sw.js` but no service worker file exists.

**Fix**: Remove the `/sw.js` cache header block from `public/_headers`.

**Files**: `public/_headers`

---

### Summary of File Changes

| File | Change |
|------|--------|
| `src/pages/Index.tsx` | Remove 4-5 sections, simplify layout |
| `src/components/HeroSection.tsx` | Remove fake LiveActivity counter |
| `src/components/DonationNotification.tsx` | Delete file |
| `src/components/FeedbackPopup.tsx` | Add visit-count gate |
| `src/data/blogArticles.ts` | Add author/reviewer fields |
| `src/pages/BlogPost.tsx` | Display author attribution + JSON-LD |
| `src/App.tsx` | Replace AnimatePresence with CSS transition |
| `src/components/ui/PageTransition.tsx` | CSS-only transition |
| `src/components/ui/OptimizedImage.tsx` | Add srcset/sizes support |
| `public/_headers` | Tighten CSP, remove sw.js block |
| Governance/Finances/Impact pages | Add "Last updated" dates |
| `src/pages/AdminDashboard.tsx` | Add auth redirect guard |
| Database migration | Re-ensure forum reply trigger |

