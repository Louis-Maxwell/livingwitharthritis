## Plan: Expand Tai Chi FAQ with safety-focused questions and optimised headings

The hub page `TaiChiForArthritis.tsx` already has a 6-question FAQ with `FAQPage` JSON-LD, but it's missing the high-intent **safety** cluster ("is tai chi safe…") and the question H3s render as plain `<summary>` text — not optimal for SEO crawl/parse. Same gap on `SeatedTaiChiForArthritis.tsx`.

### What I'll change

**1. `src/pages/exercises/TaiChiForArthritis.tsx`** — Append 4 new FAQ entries targeting safety, contraindications, and joint-specific intent (all rephrased as natural questions Google surfaces in People Also Ask):

- **Is tai chi safe for arthritis?** — Yes for most; covers low-impact mechanics, NICE NG226 safety profile, when to pause (acute flare, recent joint replacement <6wk, severe balance issues without support).
- **Is tai chi safe for knee arthritis?** — Specifics on weight-shift, avoiding deep stances, modifications.
- **Is tai chi safe after a joint replacement?** — 6–12 week post-op window guidance, surgeon clearance, seated start.
- **What are the side effects or risks of tai chi for arthritis?** — Mild post-session soreness vs. red-flag pain, fall risk if practising unsupported with severe instability.

**2. Optimise heading semantics** — Promote each question from `<summary>` text-only to a true `<h3>` inside the `<summary>`, so crawlers parse the FAQ list as a heading hierarchy under the existing `<h2>Common questions</h2>`. Keep the `<details>/<summary>` accordion behaviour intact (no JS change).

**3. Rename the section heading** from "Common questions" → **"Tai Chi for Arthritis: FAQs"** — keyword-aligned H2 that matches what people search.

**4. `src/pages/exercises/SeatedTaiChiForArthritis.tsx`** — Mirror the same two structural changes (h3 inside summary, keyword-rich H2: "Seated Tai Chi: FAQs") and add 2 seated-specific safety FAQs:
- **Is seated tai chi safe if I have severe arthritis or use a wheelchair?**
- **Can I do seated tai chi after hip or knee replacement surgery?**

### Files touched
- `src/pages/exercises/TaiChiForArthritis.tsx` (extend `faqs` array, change H2 copy, wrap summary text in `<h3>`)
- `src/pages/exercises/SeatedTaiChiForArthritis.tsx` (same pattern + 2 seated FAQs)

### Out of scope
- No new routes, no sitemap changes (these pages are already indexed).
- No changes to the dynamic joint matrix pages — can follow up if you want per-joint FAQs there too.
- JSON-LD `FAQPage` schema auto-picks up the new entries (it maps from `faqs`), no schema edit needed.