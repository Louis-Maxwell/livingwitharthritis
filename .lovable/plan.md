## Goal

Two coordinated changes to the homepage:

1. **Empathetic copy rewrite** across the landing sections — warmer, more human, written for people living with arthritis (not corporate/institutional).
2. **Strict red + white palette** — remove the remaining black-dominant sections and stray hex colors so the only colors on the page are red, white, and minimal black for body text.

---

## 1. Copy rewrite (empathetic voice)

Rewrite the wording in these landing components only (no logic, no layout changes):

- `OAHero.tsx` — softer headline, eyebrow, subhead, CTAs. Less "institutional", more "we know what you're going through".
- `OAProblemBand.tsx` — reframe stats as lived experience ("8.75 million people in the UK wake up with stiff, painful joints"), not just data.
- `OAPlanPillarsSection.tsx` — describe each pillar (diet, movement, pain relief, mindset) in plain, kind language.
- `MissionStatementBand.tsx` — speak directly to the reader ("You are not alone…").
- `DonationImpactSection.tsx` — frame donations as helping a neighbour, not funding an institution.
- `OpenSourceEthosBand.tsx` — explain "free, open, for everyone" warmly.
- `FAQSection.tsx` — keep questions, soften answers.
- `NewsletterSection.tsx` — gentle invitation, not a hard sell.

Voice guardrails:
- UK English, plain language, second person ("you", "your joints").
- Acknowledge pain, fatigue, frustration honestly.
- No fabricated stats — keep existing 8.75M / 1-in-6 / £10bn figures.
- Keep "for everyone" phrasing (per memory) — never "zero cost".
- Keep medical neutrality and the open-source plan framing.

## 2. Palette cleanup (red + white only)

The design tokens already enforce red/black/white via `tailwind.config.ts` and `index.css`, but several landing components have **hardcoded hex colors** and **black-dominant backgrounds** that break the red+white feel. Fix:

- `DonationImpactSection.tsx` — remove `bg-[#ff0505]` (use `bg-primary`).
- `OpenSourceEthosBand.tsx` — remove `bg-foreground text-background` (black band) and `bg-[#f90606]` / `bg-[#ff0000]`. Convert to white background with red accents, or solid `bg-primary` with white text.
- `OAPlanPillarsSection.tsx` — remove `bg-[#ff0000]` on inner container; keep white card surfaces with red accents.
- `OAProblemBand.tsx` — remove `bg-[#ff0000]` on inner container.
- `GeometricCubeSection.tsx` and `ParticleNetworkSection.tsx` — these are not currently mounted on the homepage (Index.tsx doesn't import them), so **leave them** unless the user later adds them back.

Replace all inline hex with semantic tokens (`bg-primary`, `text-primary`, `bg-background`, `text-foreground`, `border-primary/20`). No raw `bg-white` / `text-black` — use `bg-background` / `text-foreground`.

Result: page reads as white surfaces with red as the only accent. Black survives only as body text (per the existing `--foreground: 0 0% 0%` token), which is needed for readability.

## Out of scope

- Header, Footer, FacesStrip, QuoteSection, BlogPreview — copy untouched unless they contain non-red hex.
- No route changes, no new sections, no image regeneration.
- No design-token edits — the system already enforces red/black/white.
- Dark mode untouched.

## Verification

After edits: load `/`, scroll the page, confirm (a) every coloured band is red or white, (b) no purple/blue/green/gold remains, (c) copy reads warmly and addresses the reader directly.
