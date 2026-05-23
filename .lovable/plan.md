## Goal

Resolve the Semrush "less than 200 words" thin-content warning across every public route by ensuring each indexable page renders at least ~250 words of meaningful, on-topic body copy (comfortably clearing the 200 threshold).

## Approach

1. **Build a word-count audit script** (`scripts/audit-word-count.ts`)
   - Parse every route under `src/pages/**` plus their composing components.
   - Strip JSX tags, imports, props, className strings, and code-only literals; keep visible text nodes and string children.
   - Print a table: `route | word count | status (PASS ≥250 / WARN 200–249 / FAIL <200)`.
   - Exclude admin pages and `/auth` callbacks (already `noindex`).

2. **Run the audit** and produce the failing list. Expected likely offenders based on the codebase:
   - `Auth.tsx` (mostly a form)
   - `NotFound.tsx`
   - `Chat.tsx` (interactive shell, little static text)
   - Short utility pages: `Accessibility.tsx`, `CorporateGiving.tsx`, smaller condition stubs, `JustGiving`, `Zakat`, etc.
   - Landing sub-pages with mostly imagery.

3. **Fix each failing page** by adding genuinely useful copy that fits the page intent — never filler. Patterns:
   - **Auth**: Add a left-rail "Why create an account" block (3 bullets + paragraph on privacy, saved progress, free access). Keep above the fold clean.
   - **NotFound**: Add a short paragraph + helpful links to top resources (Exercise Hub, Diet Hub, Self-Help Tool, Contact).
   - **Chat**: Add an SEO-only intro section above the chat (visible, not hidden) describing what the AI assistant does, sources, medical-safety disclaimer, and example questions.
   - **Short condition / topic pages**: Add an "Overview", "Common questions", or "How we can help" block consistent with the editorial voice (plain English, MedicallyReviewed component where clinical).
   - **Utility pages** (Accessibility, CorporateGiving, etc.): Expand with concrete UK-specific detail (WCAG 2.2 AA commitments; corporate matched-giving/Gift Aid mechanics).

4. **Re-run the audit** until every indexable route reports ≥250 words.

## Constraints

- Keep the institutional Crimson/White aesthetic; new copy goes into existing section patterns (no new visual paradigms).
- Strict neutrality, no NHS references, no placeholder registration numbers.
- Use "for everyone" instead of "zero cost".
- No new dependencies; script uses Node + regex (no headless browser).
- Don't touch admin or auth-callback routes (already `noindex`).

## Out of scope

- The two open Lighthouse findings (slow load, contrast) — separate fixes.
- Rewriting already-rich pages for SEO keyword density.

## Deliverable

- `scripts/audit-word-count.ts` committed.
- Each previously-failing page updated with on-topic copy clearing 250 words.
- Final audit table pasted in the response, all routes PASS.
