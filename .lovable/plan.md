## Plan: make all wording visible in black and remove AI branding

### 1. Strengthen global text visibility
- Update `src/index.css` so every normal text-bearing element and Tailwind text colour utility resolves to black.
- Include missing cases such as SVG/icon text, placeholder text, disabled text, gradient/transparent text utilities, prose content, and inline colour styles.
- Keep the existing exception for red CTA/button backgrounds so button labels remain readable.

### 2. Remove user-facing AI touch
- Search frontend files for user-facing AI wording such as `AI`, `AI-powered`, `AI assistant`, `AI-generated`, `artificial intelligence`, `robot`, and related labels.
- Remove or reword any visible AI references to neutral health/support language.
- Replace AI-style decorative icons such as sparkles/robot-style marks where they appear in visible UI.

### 3. Verify pages are visible
- Re-check the homepage preview after the CSS update.
- Run a final search for remaining visible AI-branded copy.

### Scope
- No content sections, page layout, routes, backend logic, or donation logic will be changed.