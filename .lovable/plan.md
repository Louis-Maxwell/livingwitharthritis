## Plan: Internal links from condition pages to new hip-exercises guide

### Relevance audit
Two condition pages have direct topical overlap with `/guides/hip-exercises-for-osteoarthritis`:

1. **`src/pages/conditions/HipArthritis.tsx`** — primary target
2. **`src/pages/conditions/Osteoarthritis.tsx`** — secondary (osteoarthritis of the hip)

A third, lighter link from the parent hub **`src/pages/conditions/Arthritis.tsx`** is optional and only added if a natural placement exists.

### Edits

**1. `HipArthritis.tsx`**
- Replace the generic `"Hip-specific exercises" → /exercises` entry in the related-links sidebar with a direct link to `/guides/hip-exercises-for-osteoarthritis`.
- Add one inline contextual sentence in the exercise / self-management section: "For a step-by-step routine, follow our [8-move hip osteoarthritis exercise guide](/guides/hip-exercises-for-osteoarthritis)."
- Update the "surgical options" line's stray self-link (`/conditions/hip-arthritis`) → out of scope; leave untouched.

**2. `Osteoarthritis.tsx`**
- Update the related-link entry `"Hip arthritis exercises" → /exercises` to point at `/guides/hip-exercises-for-osteoarthritis`.
- Add a one-line inline mention in the exercise paragraph linking to the new guide alongside the existing exercise-hub link.

**3. `Arthritis.tsx`** (hub) — only if it already has a "See also" or related-content block for hip content. If not, skip.

### Breadcrumbs & schema
Already in place:
- Both condition pages emit `PageBreadcrumb` + `BreadcrumbList` JSON-LD.
- The new hip guide emits `PageSchema` with `MedicalWebPage`, `BreadcrumbList`, and `FAQPage` JSON-LD (breadcrumbs: Home → Guides → Hip exercises for osteoarthritis).

No schema changes needed. No new breadcrumbs to add.

### Out of scope
- No visual/layout changes to condition pages beyond the link text.
- No copy rewrites outside the added sentence.
- No sitemap/routing changes (guide is already registered).
- No changes to other condition pages (knee, hand, etc.) — not directly relevant to a hip-specific guide.

### Deliverable
Two small edits (`HipArthritis.tsx`, `Osteoarthritis.tsx`) — one related-link swap and one inline contextual link each.
