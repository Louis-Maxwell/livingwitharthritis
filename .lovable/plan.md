

## Plan: Add Social Media Links to Footer

### What changes
Update the **Connect** column in `src/components/Footer.tsx` to replace the placeholder `#` hrefs with real URLs:

- **X / Twitter** → `https://x.com/ArthritisOrg`
- **LinkedIn** → `https://www.linkedin.com/company/112596569/`
- **Facebook, Instagram, YouTube** → keep as `#` for now (no URLs provided), or remove them to keep the footer clean

### Decision needed
Should I remove Facebook, Instagram, and YouTube from the footer since you don't have those yet, or keep them as placeholders?

### Technical detail
- Single file edit: `src/components/Footer.tsx`, lines in the `columns` array under the "Connect" section
- LinkedIn URL will be trimmed to the public-facing company URL (without `/admin/dashboard/`)

