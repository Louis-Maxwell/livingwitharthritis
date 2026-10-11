# Backlinko homepage audit — 11 October 2026

Observed report: SEO 94/100, 0 critical issues, 3 warnings, 21 passed.

| Check | Reported result | Response |
| --- | --- | --- |
| Mobile performance | 86/100; lab LCP 3.0s, FCP 2.3s, TBT 30ms, CLS 0.008 | Avoid late font-swap repaint; let entry scripts outrank the non-LCP photo; reduce below-fold prefetch distance from 600px to 200px. |
| Mobile field CWV | LCP 2.9s, INP 107ms, CLS 0 | LCP needs improvement. Recheck field data after deployment and the rolling collection window. |
| Desktop field CWV | LCP 2.3s, INP 88ms, CLS 0; labelled Needs Improvement | Displayed values pass all three thresholds. Do not claim the checker label is fixed by code. Verify directly in Search Console/PageSpeed Insights. |
| Static landmarks | Two mains, no header/footer | Remove boot-shell main landmark; add header/footer and skip link to homepage and generated route HTML. |
| Static skip navigation | Missing | Add a keyboard-focusable content target and matching skip link. React already has its own skip control. |

No fabricated address, coordinates, opening hours or LocalBusiness schema were added. A national online charity needs verified premises before those local signals are appropriate. Unknown AI visibility and undetected technology are tool observations, not errors repairable by inventing data. Authority and backlinks require ongoing genuine external recognition.

Performance improvements are implementation changes, not a promise of a particular Lighthouse score. Font display optional can retain the metric-adjusted system font on a slow first visit. Validate fresh lab measurements and actual field data after publication.
