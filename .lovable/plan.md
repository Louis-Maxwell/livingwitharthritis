## Heads-up before we build

You picked **Full visual clone**. This overrides several locked rules in project memory:
- White-bg / black-text / red-accent (arthritis.org-inspired) → becomes **red-bg / cream / black** like text.com
- Montserrat + Open Sans → becomes a **bold serif display + clean grotesk body** (text.com uses a Didone-style serif)
- "No AI branding, charity neutrality" → text.com is SaaS marketing copy (`Start free trial`, `Sign up free`, stat blocks like "$1.5M revenue"). I will keep your charity copy intact and only port the **visual patterns**, not the SaaS wording (donations/help, not trials/sign-ups). If you want the SaaS wording too, say so and I will swap the CTAs.

I will update `mem://index.md` and the visual-identity memory to reflect the pivot so future work doesn't snap back.

---

## Visual system (tokens — `src/index.css` + `tailwind.config.ts`)

Palette (HSL):
- `--background`: cream `40 33% 96%` (#FBF7EE)
- `--foreground`: near-black `0 0% 7%`
- `--primary`: text.com red `0 100% 50%` (#FF0000) — used as **full-bleed section background**, not just an accent
- `--primary-foreground`: cream
- `--accent` / CTA pill: black `0 0% 7%` on cream pill text
- Borders: removed (text.com uses blocks of colour, not lines) — already aligns

Typography (install via `@fontsource`):
- Display: **Fraunces** (free Didone-leaning serif, closest to text.com's custom serif) — weights 400/600/900, optical size axis on
- Body: **Inter Tight** or keep **Open Sans** — text.com body is a tight grotesk
- Wordmark: keep current "Living With Arthritis" but render in Fraunces 900 italic at hero scale

Update `tailwind.config.ts` `fontFamily.display` → Fraunces, `fontFamily.sans` → Inter Tight.

## Components to add (in `src/components/marketing/`)

1. **HeroBigType.tsx** — full-bleed red section, giant serif headline left, supporting paragraph + black pill CTA top-right, oversized outline letters as background graphic (text.com's "sells" treatment). Used on `/` replacing current `HomeHero`.
2. **LogoProofBand.tsx** — cream band with 4–6 greyscale logos. For charity context: HCPC, CSP, NICE, Charity Commission, Stripe — already trust marks you use.
3. **StatCard.tsx** + **StatGrid.tsx** — text.com's "$1.5M / Revenue in last 6 months" pattern. Repurposed as impact stats (people helped, free guides, exercise videos, articles reviewed).
4. **UseCaseGrid.tsx** — text.com's product use-case section as a 3×N grid of large cards with serif headline + short body + arrow link. Cards link to your existing hubs: Exercise Hub, Diet Hub, Conditions, Self-Help Tool, Help & Support, Donate.
5. **CtaPill.tsx** — black rounded-full button with white text, replaces current primary button styling sitewide via `buttonVariants` default override.
6. **DarkFooterBand.tsx** — cream-on-black footer band above existing footer (text.com's closing CTA).

## Pages touched

- `src/pages/Index.tsx` — swap hero, add LogoProofBand, StatGrid, UseCaseGrid, DarkFooterBand. Keep existing trust content + quotes below.
- `src/components/Header.tsx` — slim transparent header, wordmark left in Fraunces, nav centre, black pill "Donate" right (mirrors text.com's "Sign up free").
- `src/components/Footer.tsx` — repaint to black bg + cream text (keeps existing 5-col grid + Maxwell Health credit).
- Global: `Button` `default` variant → black pill via `buttonVariants` so all existing CTAs adopt the look.

## Memory updates

- Rewrite `mem://style/visual-identity` and `mem://style/branding-identity` to: "Red full-bleed sections + cream + black, Fraunces display, text.com-inspired editorial SaaS marketing patterns."
- Update Core in `mem://index.md` (replace the white-bg/black-text/red-accent rule).

## Out of scope

- No copy changes to charity content beyond CTA labels.
- No new routes; only visual reskin + new homepage marketing sections.
- No removal of existing condition/guide pages.

## Technical notes

- Install: `bun add @fontsource/fraunces @fontsource-variable/inter-tight`, import in `src/main.tsx`.
- All colours stay as semantic HSL tokens — no hardcoded hex in components.
- Mobile-first: hero headline scales `clamp(3rem, 10vw, 10rem)`; use-case grid collapses to 1 col.
- No Framer Motion AnimatePresence for routing (respects memory). Reveal-on-scroll uses existing `useRevealOnScroll`.

Confirm and I'll execute. If you actually want the SaaS marketing **copy** too (free trials, sign-ups), tell me before I start.