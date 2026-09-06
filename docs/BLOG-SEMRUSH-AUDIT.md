# Blog Semrush-style On-Page Audit

Generated: 2026-09-06 (Europe/London). Inventory: **505** published blog slugs.

## Summary

Overall Semrush-style pass rate (averaged across core checks): **100.0%**.

| Check | Pass | Fail | Pass % |
| --- | ---: | ---: | ---: |
| Title length 30–70 chars | 505 | 0 | 100.0% |
| Keyword token in title | 505 | 0 | 100.0% |
| Meta description present | 505 | 0 | 100.0% |
| Meta description 70–160 chars | 505 | 0 | 100.0% |
| Single H1 in body (≤1) | 505 | 0 | 100.0% |
| H2 outline present (≥2) | 505 | 0 | 100.0% |
| Word count ≥ 300 | 505 | 0 | 100.0% |
| Word count ≥ 1000 (stretch) | 505 | 0 | 100.0% |
| Cover file exists on disk | 505 | 0 | 100.0% |
| Diet posts use food/nutrition cover | 42 | 0 | 100.0% |
| No literal \\n in stored HTML | 505 | 0 | 100.0% |
| No fake clinician name patterns | 505 | 0 | 100.0% |
| Internal links present | 505 | 0 | 100.0% |
| Not thin / not duplicate title | 505 | 0 | 100.0% |

## Mediterranean diet post (Louis bug)

- Slug: `/blog/mediterranean-diet-arthritis-14-day-plan`
- Cover before: `cover-0307-an-elderly-chinese-man-practices-tai-chi-jard.webp`
- Cover after: `nutrition-01-oliven-v1.webp`
- Fixes: topic-matched olive/nutrition cover; content converted to proper HTML; Priya Sharma removed; real key-takeaways list; 2–3 inline nutrition images; renderer handles mixed HTML+markdown literal `\\n`.

## Diet cover remaps

Swapped **39** diet/nutrition posts onto food Openverse covers (1:1 uniqueness preserved via pairwise swap with non-diet donors).

| Diet slug | New cover |
| --- | --- |
| `anti-inflammatory-diet-rheumatoid-arthritis` | `nutrition-07-woman-writing-notes-while-enjoying-a-fresh-fruit-p.webp` |
| `anti-inflammatory-smoothie-recipes` | `cover-0461-korean-food.webp` |
| `appetite-loss-arthritis-frailty-uk` | `cover-0479-salad.webp` |
| `arthritis-and-diet-myths-uk` | `nutrition-04-healthy-meal-prep-with-fresh-salad-fruits-and-plan.webp` |
| `arthritis-and-omega-3-fish-oil` | `cover-0477-bean-salad-over-lettuce.webp` |
| `arthritis-and-weight-loss-uk` | `cover-0440-edamame-and-radish-salad.webp` |
| `arthritis-friendly-recipes-uk` | `cover-0470-egg-salad-bento.webp` |
| `arthritis-meal-planning-uk` | `cover-0476-potato-salad.webp` |
| `berries-antioxidants-inflammation` | `cover-0453-kale-salad.webp` |
| `best-diet-for-joint-pain-uk` | `cover-0443-are-you-eating-fruits.webp` |
| `best-foods-to-eat-for-arthritis` | `nutrition-10-mysore-special-fruit-salad-with-ice-cream.webp` |
| `calcium-foods-arthritis-frailty-uk` | `cover-0469-organic-olive-oil-salad.webp` |
| `cooking-with-hand-oa-frailty-uk` | `cover-0438-natural-fruit-salad-bowls-34699.webp` |
| `fatty-fish-omega-3-arthritis-evidence` | `cover-0449-grilled-chicken-fattoush-salad.webp` |
| `foods-to-avoid-with-arthritis` | `cover-0436-mid-morning-salad-snack.webp` |
| `ginger-root-natural-anti-inflammatory` | `cover-0467-lentil-salad-kci-1361.webp` |
| `ginger-vs-turmeric-for-arthritis` | `cover-0485-kale-and-pomegranate-salad.webp` |
| `gout-older-people-frailty-hydration-uk` | `cover-0481-white-bean-salad.webp` |
| `meal-delivery-arthritis-frailty-uk` | `cover-0435-400kcal-diet-020.webp` |
| `mediterranean-diet-arthritis-14-day-plan` | `nutrition-01-oliven-v1.webp` |
| `mediterranean-diet-shopping-list-arthritis` | `cover-0442-salad-days.webp` |
| `mediterranean-eating-frail-osteoarthritis-uk` | `nutrition-09-dfc-3934-a-colorful-medley-of-freshly-chopped-frui.webp` |
| `oily-fish-arthritis-frailty-simple-meals-uk` | `cover-0474-salad.webp` |
| `olive-oil-polyphenols-pain-management` | `nutrition-06-fruit-salad-or-fruit-bowl.webp` |
| `omega-3-foods-for-joints` | `cover-0439-watermelon-mint-raspberry-salad.webp` |
| `protein-painful-joints-frailty-uk` | `cover-0455-simple-salad-honey-mustard-vinaigrette.webp` |
| `rheumatoid-arthritis-diet-uk` | `cover-0440-tomato-bread-salad.webp` |
| `soft-foods-jaw-arthritis-frailty-uk` | `nutrition-03-colorful-assortment-of-fresh-fruits-arranged-in-a-.webp` |
| `turmeric-and-methotrexate-interaction` | `cover-0466-virgie-s-peruvian-seafood-ceviche.webp` |
| `turmeric-curcumin-arthritis-evidence` | `nutrition-12-the-small-acai-bowl-in-a-cup.webp` |
| `turmeric-for-arthritis` | `cover-0438-spinach-salad.webp` |
| `vitamin-d-and-falls-arthritis-uk` | `cover-0459-lunchtime-salad.webp` |
| `vitamin-d-winter-arthritis-frailty-uk` | `cover-0446-hearty-autumn-salad.webp` |
| `weight-management-arthritis-evidence` | `cover-0447-pasta-salad.webp` |

## Gap-fill round (titles / meta / H2)

Closed the remaining Semrush-style fails from the 99.0% baseline:

- **Titles (10):** replaced mid-phrase clipped `meta_title` values with complete 30–70 char headlines (phase2 batch + head regen).
- **Keyword-in-title (1):** `oa-vs-ra-comparison` meta_title now includes “comparison”.
- **Meta length (8):** word-boundary clipped `meta_description` (or set from long excerpt) into 70–160.
- **H2 outline (34):** promoted existing structural H3s (Practical next steps / Quick questions / Safety / related sections) to H2 — no new medical claims; charity identity unchanged.

## Worst offenders (sample)

_None — all core checks at 0 fails._

## Method notes

- Mirrors Semrush On-Page / Content Quality factors: title & meta length, H1/H2 structure, word count, images, internal links, thin/duplicate titles.
- Charity identity preserved; fake clinicians (Priya Sharma / PH123456) flagged and stripped where found.
- Cover uniqueness still enforced by `seo:blog-guards` (1:1 slug → openverse file).
- Title/meta fixes use `meta_title` / `meta_description` then `generate-blog-head-data` (`buildPageTitle` / `clipText`) — no mid-phrase SERP clips.
- H2 repair prefers promoting existing H3 section headers over inventing new copy.

## Deploy note

After push to `main`, run the dual-pipeline deploy (Vite/static + worker as documented). Regenerate head data is included in prebuild (`generate-blog-head-data` + `seo:blog-guards`). Soft-publish is not enough for crawlers — production deploy required for title/meta/H2 HTML changes.
