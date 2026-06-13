## Goal
Drop `<AnswerBox>` + expanded FAQ schema into the top 12 high-intent pages so AI answer engines (ChatGPT, Perplexity, Google AI Overviews) lift clean, attributable summaries verbatim.

## Pages to update (12)

Hubs & guides (5):
1. `/diet` — DietHub.tsx
2. `/exercises` — ExerciseHub.tsx
3. `/arthritis-flare-ups` — ArthritisFlareUps.tsx
4. `/self-help` — SelfHelpTool.tsx
5. `/guides/diet` — pillar/DietGuide.tsx

Conditions (7 most-searched):
6. `/conditions/osteoarthritis`
7. `/conditions/rheumatoid-arthritis`
8. `/conditions/knee-arthritis`
9. `/conditions/hand-arthritis`
10. `/conditions/gout`
11. `/conditions/psoriatic-arthritis`
12. `/conditions/polymyalgia-rheumatica`

## What each page gets

- One `<AnswerBox>` placed directly under the page H1.
  - Question phrased as a real search query (e.g. "What is the best diet for arthritis?")
  - 40–60 word plain-English answer sourced from the project knowledge base (Mediterranean diet, NICE first-line exercise, flare-up steps, etc.)
  - `reviewed` date set to today.
- 5–8 high-intent FAQ Q&As appended to each page's existing `PageSchema` `faqs` array (or added if absent). Questions follow People-Also-Ask patterns: "how to…", "best…", "is X safe…", "how long…".

## Visual treatment
AnswerBox already styled to project tokens: white bg, black text, red left rule, `speakable-intro` class. No new components, no design changes.

## Files to touch
The 12 page files above only. No new components, no schema/backend changes, no routing changes.

## Out of scope
- Author entity pages (Phase 3 of earlier plan) — defer until you confirm.
- City pages, blog posts — too many to batch in one pass.
- `RootOrganizationSchema.sameAs` expansion — needs you to confirm live social URLs first.

Proceed?
