# Sitewide depth and motion, 18 November 2026

Requested after the red homepage restoration. This is a shared CSS 3D interaction system, not a medical/anatomical model or a claim that every pixel should move. The existing SiteMotion mount covers every route, including lazy sections and route changes.

## Treatment

- Substantial interactive cards get perspective, a short one-time angled entrance below the fold, and a restrained desktop hover tilt with a layered red-tinted shadow.
- Shared help/action buttons get short depth presses. Fine-pointer hover adds depth; touch users do not inherit sticky desktop tilt.
- Existing homepage reveal wrappers keep their own entrance ownership. No duplicated observer, pointer-move handler, frame loop, new package, canvas or model download.
- Fully visible text in every frame. No opacity-zero entrance. The page wrapper, title and LCP content are not delayed for decoration.
- Navigation, forms, long-form prose, alerts, key takeaways, callouts and review notes are excluded. Small pills and badges do not get card depth. Keyboard focus flattens interactive cards so focus outlines stay stable.
- Reduced-motion, including an OS preference changed while the page is open, disables the depth treatment immediately through media queries. Printing is flat and shadow-free. Unsupported transforms fall back to the normal card.

## Preservation and boundaries

Keep the explicitly restored red/white homepage, existing words, links, service claims, data capture, article sources and review status. No old homepage copy/ticker/donation-bar rollback. No spending or Lovable credits. Editorial accuracy work remains open separately.

## Verification gates

Unit tests cover selection, nested-card prevention, prose/form/alert/header/footer exclusions, existing reveal ownership, static/reduced-motion behaviour and per-route mounting. Local and normal CI checks, seven representative page families at phone/desktop sizes, actual hover/entry/press pixels, dynamic reduced motion, keyboard focus, print and route-change behaviour are required before delivery. Final production is a separate gate. Representative checks are not an assertion that every individual URL was manually inspected.
