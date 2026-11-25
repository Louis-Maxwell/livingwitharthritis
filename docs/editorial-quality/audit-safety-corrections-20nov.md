# Audit safety corrections, 20 November 2026

Scope: two confirmed issues from the frozen blog audit, not a full rewrite or completed audit.

## Heart failure / arthritis article
Current NHS DVT page read on 20 November 2026:
https://www.nhs.uk/conditions/deep-vein-thrombosis-dvt/

The NHS distinguishes urgent GP/NHS 111 assessment for suspected DVT from 999/A&E for DVT symptoms with chest pain or breathlessness. The previous article assigned 999 to an isolated painful, warm, swollen leg. Corrected that distinction, removed generic elevation/ankle exercise as the response to new unilateral painful swelling, and linked the source. Northern Ireland urgent routing uses GP/out-of-hours rather than a fictional UK-wide 111 service. No medicine dose or self-discontinuation advice added.

This is a limited editorial correction. Removed inherited author self-review attestation for the changed text and marked separate qualified clinical review pending. Kept route, original publication, public access and unrelated advice.

## Pressure-care illustration
Current NHS pressure-ulcer page read on 20 November 2026:
https://www.nhs.uk/conditions/pressure-sores/

Actual public mobile and desktop pixels showed a surgical wrist/tissue image inserted into the practical skin-pressure prevention guide. Traced it to filename/topic-based selection in articleImagePicks.ts, called by BlogPost.tsx, not an image authored in the body. Added an exact-slug-only replacement with an original labelled SVG about position changes, daily skin checks and equipment assessment. No fixed repositioning interval, diagnostic image, product endorsement or unrelated global change. Cover remains unchanged. The second automatically selected arthritis image on this same guide is also replaced by this single coherent prevention figure. Other guides retain their existing selection.

## Verification
Regression test covers DVT urgency, preserved publication, pending review and exact-slug image selection. Full source tests after regeneration: 233 files, 1,335 tests passed. Prebuild blog guards: 30 tests passed. Both TypeScript projects and full zero-warning ESLint passed. Local actual 390/1280 affected sections inspected; no overflow or browser errors in those four views. The image load was explicitly awaited before the final screenshots. Local build and hosted required checks remain separate gates. Production requires ordinary republishing and separate live verification.
