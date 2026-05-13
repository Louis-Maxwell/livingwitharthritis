## Current state

`index.html` already ships sitewide JSON-LD blocks for:

- **Organization** — `MedicalOrganization`/`NGO`/`Organization` block (line ~133) with name, URL, logo, address, contact point and area-served.
- **WebSite** — block at line ~308 with `name`, `url`, `inLanguage`, `description`. Comment says "WebSite with SearchAction" but the `potentialAction` is missing.
- **BreadcrumbList** — a static homepage trail (line ~204) **plus** per-route dynamic breadcrumbs injected by `src/components/ui/PageBreadcrumb.tsx` via `useEffect` (used on every interior page).

So the three schemas already exist site-wide. Two small gaps to close so the request is genuinely complete:

## Changes

1. **Enhance the WebSite block in `index.html`** — add `potentialAction` `SearchAction` pointing at the on-site search/blog index (`/blog?q={search_term_string}` or, if preferred, `/sitemap`), plus `publisher` reference back to the Organization via `@id`. Add `@id` to the Organization block so WebSite can reference it cleanly.

   ```json
   {
     "@context": "https://schema.org",
     "@type": "WebSite",
     "@id": "https://livingwitharthritis.org.uk/#website",
     "url": "https://livingwitharthritis.org.uk/",
     "name": "Living With Arthritis UK",
     "inLanguage": "en-GB",
     "publisher": { "@id": "https://livingwitharthritis.org.uk/#organization" },
     "potentialAction": {
       "@type": "SearchAction",
       "target": {
         "@type": "EntryPoint",
         "urlTemplate": "https://livingwitharthritis.org.uk/blog?q={search_term_string}"
       },
       "query-input": "required name=search_term_string"
     }
   }
   ```

2. **Audit the static homepage BreadcrumbList** in `index.html` (lines ~204–215). It currently lists Home → Conditions → Exercises → Diet, which isn't a real trail. Replace with a homepage-only single-item list (`Home`) so it doesn't confuse Google. Per-route trails continue to come from `PageBreadcrumb`.

3. **No changes** to `Organization` itself — it's already complete and conformant. Just add the `@id` anchor so WebSite can reference it.

## Out of scope

- Per-page Article/Product/FAQ schemas (already injected by individual route components — the project memory notes JSON-LD is added via `useEffect` to avoid Helmet crashes; that pattern stays).
- Changes to `PageBreadcrumb.tsx`.

## Verify after

- View source on `/` and confirm the three JSON-LD blocks render.
- Paste the homepage HTML into Google's Rich Results Test to confirm Organization, WebSite and BreadcrumbList are detected without warnings.
