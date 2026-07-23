# Blog article style rules

Living With Arthritis UK blog structure, as rendered by `src/pages/BlogPost.tsx` and the components in `src/components/blog/`.

## Required sections (top → bottom)

1. **Quick Answer** — 2–3 sentence direct answer to the article's headline question. Rendered by `Callouts.tsx` as a highlighted block.
2. **Key Takeaways** — 3–5 short bullets. Placed immediately after Quick Answer.
3. **Body** — H2 sections in question form where natural (AEO). H3 sub-sections allowed. Short paragraphs (≤ 4 sentences).
4. **Callouts** — use sparingly:
   - `> [!NOTE]` for context
   - `> [!TIP]` for practical guidance
   - `> [!WARNING]` for red-flag / safety
5. **FAQ** — `ArticleFaqSection.tsx` renders `## FAQ` followed by `### Question` / answer pairs. 3–6 Q&As.
6. **Closing CTA** — one paragraph pointing to a relevant hub (`/exercises`, `/diet`, `/self-help`, `/community`). Rendered by `ArticleClosingCTA.tsx`.

## Voice

- UK English: colour, oesophagus, paracetamol, mum, GP, A&E, NHS.
- Plain, warm, evidence-based. No hype ("groundbreaking", "revolutionary"). No US-isms ("ER", "Tylenol", "shot").
- Second person ("you") when addressing the reader; third person for medical descriptions.
- Never say "AI", "AI-powered", or reference robots.
- Never say "zero cost" — say "for everyone" or "free".

## Medical guardrails

- NICE guidelines and NHS.uk are the default UK evidence anchors.
- Never invent a statistic or a study. If unsourced, omit.
- Include a "When to see your GP" or "Seek urgent help if…" block on any symptom-focused post.
- Never recommend a specific prescription-only medication dose.

## What NEVER to change during expansion

- `title`, `slug`, `excerpt`, `meta_description`
- Existing FAQ questions (you may extend answers or append new Q&As)
- Existing statistics or citations (you may add new ones with sources)
- Existing internal links
