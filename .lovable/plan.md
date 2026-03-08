

## Comprehensive Website Improvement Plan

This is a large, multi-part request. Here is a structured plan covering all requested changes, broken into manageable implementation phases.

---

### Phase 1: Header Navigation Cleanup & Shop Button

**Goal:** Clean up header nav buttons into a single row, add "Shop" link next to "Get Involved".

- Reorganize `Header.tsx` nav links so all items sit in one clean horizontal row (desktop)
- Add a new "Shop" nav link positioned right after "Get Involved" in the `navLinks` array
- The Shop link will scroll to a placeholder section or navigate to a future `/shop` route
- Update mobile menu to include Shop as well

---

### Phase 2: Privacy & Cookies Policy Pages

**Goal:** Add Privacy Policy and Cookies Policy pages paraphrased from BBC Children in Need's policies.

- Create `/privacy` route and `src/pages/PrivacyPolicy.tsx` with paraphrased content covering: data collection, usage, sharing, cookies, rights (GDPR-compliant, UK-focused)
- Create `/cookies` route and `src/pages/CookiesPolicy.tsx` with paraphrased cookie policy content
- Register both routes in `App.tsx`
- Update Footer links (currently placeholder `#` hrefs for "Privacy" and "Terms") to point to `/privacy` and `/cookies`
- Add a simple cookie consent banner component

---

### Phase 3: Hero Stat Update — 30 Million Global

**Goal:** Change hero stat from "10M+ People affected" to "30M+ Aiming to support globally".

- Update `STATS` array in `HeroSection.tsx`: change first stat from `{value: 10000000, display: "10M+", label: "People affected"}` to `{value: 30000000, display: "30M+", label: "Aiming to support globally"}`
- Update Footer text from "Supporting 10 million people" to "Aiming to support over 30 million people globally"

---

### Phase 4: Performance & Speed Improvements

**Goal:** Reduce lag, speed up the site, fix bugs.

- Add `will-change: transform` to animated elements and remove unnecessary framer-motion re-renders
- Reduce animation durations across sections (hero entrance, scroll animations)
- Add `loading="lazy"` and `decoding="async"` to all non-critical images
- Memoize expensive computations in BlogIndex (category filtering, pagination)
- Reduce SectionLoader spinner size and simplify
- Debounce scroll handlers in Header and ScrollProgress

---

### Phase 5: Security Hardening

**Goal:** Strengthen frontend security.

- Add CSP meta tag in `index.html` with appropriate directives
- Ensure all external links use `rel="noopener noreferrer"`
- Validate and sanitize all user inputs in forms (contact, appointment, newsletter, comments) using the existing `sanitize.ts` utility
- Add `X-Content-Type-Options`, `X-Frame-Options` headers to `public/_headers`

---

### Phase 6: SEO Improvements

**Goal:** Boost search engine visibility.

- Add `<link rel="canonical">` tags to all pages missing them (Index, BlogIndex)
- Add Open Graph image meta tags where missing
- Add `hreflang` alternate tags for en-GB on all pages
- Update `robots.txt` to also disallow `/privacy` and `/cookies` from crawling if desired, or keep them indexable
- Add breadcrumb structured data (JSON-LD) to Blog, About, Conditions pages
- Ensure all images have descriptive `alt` text

---

### Phase 7: Blog, Self-Help & About Backend Improvements

**Goal:** Improve backend data management for these pages.

- **Blog:** Add a `blog_articles` database table to store articles in the backend instead of hardcoded arrays, with fields: slug, title, excerpt, content, category, date, image_url, is_published. Migrate existing articles data. Add RLS policies (public read, admin write).
- **Self-Help Tool:** Add a `joint_exercises` database table to store exercises per joint dynamically, with fields: joint_id, exercise_name, duration, reps, description, display_order. Add RLS policies. Update `JointExerciseSection.tsx` to fetch from backend.
- **About:** The `about_us_sections` table already exists and is used. No additional backend changes needed — already database-driven.

---

### Phase 8: Humanoid Body Diagram Redesign

**Goal:** Improve the mannequin's visual appeal, change colours, make individual joint selection more intuitive.

- Replace the current red-themed joint dots with a gradient teal-to-blue colour scheme that contrasts better against the mannequin
- Make dots larger (w-5 h-5) with a glowing pulse animation in teal/cyan
- Add a hover tooltip showing the joint name with a smooth fade
- When clicked, highlight the selected joint with a bright ring animation and show the exercise panel with a slide-in from the right
- Add a subtle gradient overlay behind the mannequin image (light blue-to-transparent) for a premium feel
- Ensure each individual joint (left/right shoulder, left/right knee, etc.) opens its own specific exercise panel — this already works but will be visually enhanced
- Add a "body heat map" style glow effect on hover to indicate clickable areas

---

### Phase 9: Graphic Design Enhancements

**Goal:** Add luxurious, clean design elements across the site.

- Add subtle gradient dividers between sections (thin gradient lines)
- Add glass-morphism card effects to key cards (services, conditions)
- Introduce decorative SVG patterns (dot grids, wave dividers) between major sections
- Add smooth parallax scroll effect on hero background
- Refine card hover states with subtle scale transforms and shadow elevation
- Add a decorative gradient mesh background to the Explore Resources section

---

### Technical Details

**Files to create:**
- `src/pages/PrivacyPolicy.tsx`
- `src/pages/CookiesPolicy.tsx`
- `src/components/CookieConsent.tsx`

**Files to modify:**
- `src/App.tsx` — add routes
- `src/components/Header.tsx` — add Shop nav link, clean layout
- `src/components/HeroSection.tsx` — update stat to 30M global
- `src/components/Footer.tsx` — update links, update support text
- `src/components/JointExerciseSection.tsx` — redesign dots, colours, interactions
- `src/index.css` — add new utility classes for glass effects, gradient dividers
- `src/pages/Index.tsx` — add decorative elements between sections
- `public/_headers` — add security headers
- `index.html` — CSP meta tag

**Database migrations (Phase 7):**
- Create `blog_articles` table with RLS
- Create `joint_exercises` table with RLS

**No new dependencies needed** — all enhancements use existing packages (framer-motion, tailwind, lucide-react).

