## Add a /debug/schema page for JSON-LD inspection

### Goal
Create a `/debug/schema` route that displays the exact `application/ld+json` blocks currently rendered in the page `<head>`, so the team can verify which schema types (MedicalWebPage, FAQPage, BreadcrumbList, etc.) are present on any given route and spot leaks or duplicates.

### How it works
The page renders the target route in a same-origin `<iframe>` (controlled via `?page=` query param, default `/`), waits for load, then scans the iframe’s `document.head` for every `<script type="application/ld+json">` block. It parses each block, shows a summary badge with the `@type`, and renders the full JSON in an expandable, pretty-printed code panel.

### Files to create
- `src/pages/DebugSchema.tsx` — the debug inspector UI

### Files to edit
- `src/App.tsx` — add `<Route path="/debug/schema" element={<DebugSchema />} />`

### Page design
- Uses existing `Header` and `Footer` for consistency.
- Top section: route selector (preset buttons for common routes + a custom URL input).
- Middle section: iframe preview of the selected route (bordered, labeled).
- Bottom section: list of detected schema blocks.
  - Each block card shows:
    - `@type` as a coloured badge (e.g. MedicalWebPage, FAQPage, BreadcrumbList, Article, CollectionPage)
    - Key identifying field extracted (e.g. `name`, `headline`)
    - A collapsible `<pre>` with syntax-highlighted JSON
  - If no blocks are found, shows an empty-state message.
- Page has `noindex` robots meta to keep it out of search results.

### Technical details
- Reads `?page=` from `URLSearchParams`; falls back to `/`.
- iframe `src` is built from `window.location.origin + pagePath`.
- JSON extraction runs on iframe `load` event via `iframe.contentWindow.document.head.querySelectorAll('script[type="application/ld+json"]')`.
- Parsed JSON is stored in local component state and displayed with `JSON.stringify(data, null, 2)`.
- iframe is sandboxed with `allow-same-origin` only (no scripts needed in iframe for schema extraction, but same-origin access is required).
- Route is added to the router without lazy loading (the component is tiny and we want it available immediately for debugging).

### Out of scope
- No backend or database changes.
- No modifications to existing schema injection logic — this page is read-only.
- No automated validation rules beyond basic @type detection.