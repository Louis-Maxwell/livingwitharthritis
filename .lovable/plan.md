## What's actually happening

What you're seeing in the screenshot ("Living With Arthritis UK — Free Support, Exercises…" as plain unstyled text with blue underlined links) is **not** the real homepage loading slowly. It's the **static SEO fallback** that lives inside `<div id="root">` in `index.html` (lines 290–412).

That block exists on purpose — it's a text-only copy of the homepage so non-JS crawlers (Backlinko, Semrush, social previews, basic Lighthouse) can read the headings, word count and internal links. React's `createRoot().render()` replaces it on hydration, so it disappears as soon as the JS bundle parses and mounts.

The problem is that during those 200–2000 ms before React mounts, the browser paints the fallback because it's normal visible HTML. That's the "thing that pops up for 1–2 seconds".

## Fix

Keep the SEO fallback in the DOM (so crawlers still read it) but make it invisible to real users until React replaces it.

### 1. Hide the fallback visually in `index.html`
- Wrap the fallback `<main>` in a container with `aria-hidden="true"` and an inline style that takes it off-screen but leaves it parseable:
  ```html
  <div id="seo-fallback" aria-hidden="true"
       style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap;">
    <main> … existing fallback content … </main>
  </div>
  ```
- Crawlers (including text-mode auditors and Googlebot before JS) still parse it. Sighted users see a blank background instead of the unstyled text.
- React's `createRoot(...).render(<App/>)` still replaces the entire `#root` children on mount, so this wrapper disappears the moment hydration completes — no leftover hidden DOM after mount.

### 2. Match the page background so the blank moment isn't jarring
- Add `background:#ffffff` to `body` in `index.html` (or rely on the existing `index.css` `--background`). Currently the brief flash also shows because the unstyled text contrasts hard against white. With the fallback hidden, the user sees a clean white page for the few hundred ms before React paints — that feels instant, not broken.

### 3. Audit other places this can happen
The same SEO-fallback pattern only exists in `index.html`. Other pages are React routes that mount instantly once the app is loaded. I'll grep for:
- any other `<main>` or large prerendered block inside `#root` or `index.html`
- any `dangerouslySetInnerHTML` that injects pre-rendered HTML on first paint
- any prerender script (`scripts/prerender-routes.mjs`) output that might dump similar fallback into other built pages

If found, apply the same offscreen-but-readable treatment.

### 4. Verify
- Hard-reload `/` on the preview with throttled "Slow 3G" — confirm the page goes straight from blank white to the real homepage, with no plain-text flash.
- Run `curl -s https://livingwitharthritis.org.uk/ | grep -c "<h1>"` (or view-source) and confirm the fallback `<h1>` and internal links are still present in the HTML — SEO untouched.
- Quick Lighthouse pass — accessibility score shouldn't drop (the wrapper is `aria-hidden`, content is offscreen via clip, not `display:none`, so screen readers behave correctly and crawlers still see it).

## Files touched
- `index.html` — wrap the fallback `<main>` in an `aria-hidden`, offscreen container; add a white body background.
- (Possibly) `scripts/prerender-routes.mjs` — only if it's emitting similar visible fallbacks into other built routes.

No backend, schema, content or component changes. Pure presentational fix to stop the SEO fallback from flashing.
