# 04 — Accessibility (WCAG 2.2 AA) programme

**Target:** WCAG **2.2 Level AA** on primary templates within 12 months; Phase 1 fixes on Home, Donate, Conditions, Exercises, Blog post, Contact.

**Honest status:** Skip-to-content exists on the live site. A full conformance claim is **not** justified until audit evidence is recorded. Treat this as a delivery programme.

---

## Known / likely issue classes (from audits + SPA patterns)

| Area | Issue class | Impact | Priority |
|---|---|---|---|
| Navigation | Mega-menu keyboard & escape; focus trap | High | P1 |
| Forms | Mailto fallbacks; label/error association; autocomplete | High | P1 |
| Media | Decorative vs informative images; alt quality on blog covers | Medium | P1 |
| Colour | Contrast on chips, donate bars, banners | High | P1 |
| Motion | Reduced-motion respect on animations / joint figure | Medium | P1 |
| SPA routing | Focus move to H1 on route change (`RouteFocus` exists — verify all routes) | High | P1 |
| Modals | Stripe / chat / cookie dialogs — focus restore | High | P1 |
| Documents | PDF clinic packs — tagged PDFs / HTML alternatives | Medium | P2 |
| Touch | 2.5.8 Target size (min) on chip clouds | Medium | P1 |
| Cognitive | Competing CTAs, long pages without landmarks | Medium | P1 |
| Autocomplete | 2.2 new criteria on login/donate fields | Medium | P2 |
| Dragging | Avoid drag-only joint UI; provide chip alternative (chips exist — keep parity) | Medium | P1 |

---

## Implementation plan

### Sprint A (Phase 1 weeks 1–4)

1. Manual keyboard pass: Home, Donate, Symptom checker, Chat, Cookie banner.  
2. axe-core / Playwright a11y checks in CI on 6 templates.  
3. Fix contrast tokens in Tailwind theme for text on brand colours.  
4. Ensure every form control has visible label + `aria-describedby` for errors.  
5. Verify `prefers-reduced-motion` disables non-essential animation.  
6. Confirm skip link visible on focus and lands on `#main`.

### Sprint B (Phase 1–2)

1. Blog images: alt from editorial SOP (`docs/BLOG-IMAGES.md` / guardrails).  
2. Video (tai chi etc.): captions where audio conveys meaning.  
3. Table markup on comparison pages.  
4. Language attributes on any localised routes (`/es`, `/fr`, …).  
5. Accessible name for icon-only Donate / Chat buttons.

### Sprint C (Phase 2–3)

1. Third-party audit (optional paid).  
2. PDF remediation or HTML equivalents for clinic pack.  
3. Publish Accessibility Statement with dated known issues (honest).  
4. User testing with people who have arthritis + assistive tech (recruit via Connect; compensate).

---

## Definition of done (template)

- [ ] Keyboard-only complete path for primary CTA  
- [ ] No critical axe violations on template  
- [ ] Visible focus; focus order matches visual order  
- [ ] Errors identified in text, not colour alone  
- [ ] Touch targets meet 2.2 AA where feasible  

## Ownership

| Role | Responsibility |
|---|---|
| Louis / product | Prioritise templates; clinical copy clarity |
| Lovable / contractor | Implement component fixes |
| Future eng (rebuild) | Bake a11y into Next.js design system |

*Next: [05-TRUST-EEAT-ROADMAP.md](./05-TRUST-EEAT-ROADMAP.md)*
