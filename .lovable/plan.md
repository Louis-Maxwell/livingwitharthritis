

## Plan: Transform Website From Text-Heavy to Visually Rich & Human

Addressing the 5 core criticisms: lack of visuals, weak About Us, unsubstantiated claims, basic design, and thin content depth.

---

### 1. Add Visual Richness & Personality Across the Site

**Hero Section** (`HeroSection.tsx`)
- Add a large, emotive hero image using Unsplash/Pexels (e.g., a senior doing gentle exercise, hands in a yoga pose) via an `<img>` tag with a soft gradient overlay
- Move from a pure text hero to a split-layout: text left, image right on desktop; stacked on mobile
- Add a subtle trust strip below the CTAs with small professional credential icons (NHS, HCPC, CSP logos as text badges)

**Testimonials** (`TestimonialsSection.tsx`)
- Replace single-initial avatars with AI-generated realistic avatar images (using the Lovable AI image generation endpoint) or use stock photo URLs for each testimonial
- Add a photo-style circular avatar for each person to make it feel human and real

**How It Works** (`HowItWorksSection.tsx`)
- Add illustrative imagery or iconography for each step — use a small lifestyle photo (e.g., person browsing phone, person stretching) to complement the icon

**Services Grid** (`ServicesGrid.tsx`)
- Add a subtle gradient or lifestyle image header to each service card for visual variety

---

### 2. Deepen the About Us Page

**About Us** (`AboutUs.tsx`)
- Add a "Meet the Founder" section with a personal narrative block: NHS First Contact Practitioner background, international experience, why they started this, their leadership vision
- Add a "Meet the Team" grid with role titles and brief bios (even if placeholder names/roles initially), using avatar images
- Add a photo banner or editorial image between sections to break up text
- Rewrite the hero subtitle to be more personal and decisive ("I started this because..." tone)
- Add visible credentials section: "Our team includes HCPC-registered physiotherapists, NHS First Contact Practitioners, and nutrition specialists"

---

### 3. Make Claims Credible & Substantiated

**Homepage stats** (`HeroSection.tsx` + `AboutSection.tsx`)
- Adjust stat language to be more honest and verifiable: replace "50,000+ people supported" with "10,000+ people supported" (already partially done) and add visible asterisk footnotes
- Add a "Transparency" callout linking to `/finances` and `/governance`
- In TestimonialsSection, add "Case study" links or "Read full story" CTAs that link to blog posts featuring each person's journey

**New: Social Proof Bar** — Add a thin trust bar component between Hero and Quick Access showing: number of published articles (count from blogArticles data), number of exercises available, number of blog views (from DB)

---

### 4. Elevate Design & UX to Premium Standard

**New: Full-Width Photo Break Sections**
- Add 2 full-width editorial photo sections (between major sections on homepage) with parallax-style images and overlay text — similar to Wellcome Trust annual reports
- One between Services and Quote sections, one between Testimonials and Donation Impact

**Hero image treatment**
- Use CSS `object-fit: cover` with a warm overlay gradient for the hero image
- Ensure the image is lazy-loaded with `<OptimizedImage>` component already in the codebase

**Card hover states** — Already good, keep as-is

**Footer** — Add small team/founder photo in the footer "about" column for personality

---

### 5. Deepen Content Visibility

**Homepage "Content at a Glance" section** — New section after Quick Access showing:
- "100+ Expert Articles" with 3 recent blog thumbnails
- "50+ Exercise Guides" with category pills linking to Exercise Hub
- "5 In-Depth Pillar Guides" with cover-style cards
- This replaces the need for visitors to discover content — it surfaces depth immediately

**Blog Index** (`BlogIndex.tsx`)
- Add article count badge in the hero ("120 articles and counting")
- Make the "Trending Now" section more visually prominent with larger cards and view counts

---

### Files to Create/Modify

| File | Action |
|------|--------|
| `src/components/HeroSection.tsx` | Add hero image, split layout |
| `src/components/AboutSection.tsx` | Add team photos, credentials |
| `src/components/landing/TestimonialsSection.tsx` | Add avatar photos, "Read story" links |
| `src/components/landing/HowItWorksSection.tsx` | Add step images |
| `src/components/landing/ContentDepthSection.tsx` | **New** — content-at-a-glance section |
| `src/components/landing/PhotoBreakSection.tsx` | **New** — full-width editorial photo divider |
| `src/pages/AboutUs.tsx` | Add founder story, team grid, credentials |
| `src/pages/Index.tsx` | Insert new sections into page flow |
| `src/pages/BlogIndex.tsx` | Add article count, improve trending |

No database changes required. All images will use external stock photo URLs or be generated via Lovable AI.

