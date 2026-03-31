

## Fix: Footer "Terms & Conditions" Bug

**Problem**: "Terms & Conditions" links to `/privacy` instead of its own page.

**Solution**: Create a dedicated Terms & Conditions page and update the footer link.

### Changes

1. **Create `src/pages/TermsConditions.tsx`**
   - Standard legal page matching the style of existing Privacy/Cookies pages
   - Content covering: use of website, intellectual property, donations & refunds, limitation of liability, governing law (England & Wales), contact information
   - SEO metadata via Helmet

2. **Update `src/components/Footer.tsx`**
   - Change href from `/privacy` to `/terms` on line 37

3. **Update `src/App.tsx`**
   - Add lazy import for TermsConditions page
   - Add route: `/terms` → `<TermsConditions />`

