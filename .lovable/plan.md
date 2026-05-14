## Root cause

`src/components/ui/PageBreadcrumb.tsx` (lines 83–101) wraps each separator + item pair in `<span className="contents">` to satisfy React's `key` requirement inside a `.map()`:

```tsx
{segments.map((segment, i) => (
  <span key={i} className="contents">
    <BreadcrumbSeparator />
    <BreadcrumbItem>...</BreadcrumbItem>
  </span>
))}
```

shadcn's `BreadcrumbList` renders `<ol>` and `BreadcrumbItem` renders `<li>`. The `<span>` becomes the real DOM parent of those `<li>`s, so the actual tree is `<ol> > <span> > <li>`. Lighthouse / axe-core enforce two rules that fail on this:

- **`listitem`** — every `<li>` must be a direct child of `<ul>` / `<ol>` / `<menu>`.
- **`list`** — every `<ul>` / `<ol>` may only contain `<li>` (and a few permitted elements) as direct children.

`display: contents` flattens box generation for layout but does not change the DOM tree the accessibility tree and axe traverse, so the rule still fires. This affects every page that renders `PageBreadcrumb` — the osteoarthritis page is just where the user noticed it.

## Fix

Replace the `<span className="contents">` with a keyed `React.Fragment`. Fragments don't emit a DOM node, so `<li>` becomes a direct child of `<ol>` again. Tailwind's `contents` class is no longer needed because there's no wrapper to flatten.

```tsx
{segments.map((segment, i) => (
  <Fragment key={i}>
    <BreadcrumbSeparator />
    <BreadcrumbItem>...</BreadcrumbItem>
  </Fragment>
))}
```

Add `Fragment` to the existing `react` import.

## Verify

1. Read the rendered HTML in the preview at `/conditions/osteoarthritis` and confirm the `<ol>` contains only `<li>` and `<li role="presentation">` (separator) direct children — no `<span>` between them.
2. Run a Lighthouse accessibility pass on `/conditions/osteoarthritis` from the preview and confirm the `list` and `listitem` audits pass. Report any other a11y findings the run surfaces.

## Out of scope

- No visual changes — the breadcrumb already renders inline; removing the `<span>` doesn't affect layout because `BreadcrumbList` is already `flex`.
- No changes to the JSON-LD injection or the BreadcrumbSeparator component.

## Files touched

- **Edit:** `src/components/ui/PageBreadcrumb.tsx` (≈4 lines)
