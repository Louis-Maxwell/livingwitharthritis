---
name: Technical Debt - Resolved
description: Index.tsx refactored from 1928-line monolith to ~280-line orchestrator with 16 extracted components.
type: feature
---
Index.tsx was refactored from ~1928 lines to ~280 lines. All inline components extracted to src/components/landing/:
- CookieBanner, GridBg, GlassCard, PageModal
- ActionPathSection, WhyUsSection, ExpertContentSection
- LeadCaptureSection, TrustBar, ContactSection (replaces both old GetInTouchSection files)
- AITrustSection, PhotoBreak, StatsBand, BlogPreview
- SkeletonSection, BackToTopButton

All hardcoded colors (text-gray-900, bg-teal-700, etc.) replaced with semantic design tokens (text-foreground, bg-primary, etc.).
Removed: unused Lucide icon imports, stale comment blocks, unnecessary React Context (analytics passed as prop instead).
Duplicate GetInTouchSection deleted (landing/GetInTouchSection.tsx removed; ContactSection.tsx is the canonical version).
