# Fix the broken landing page

## Likely cause (confirmed)
The software package the site needs to start (`@supabase/supabase-js`) has disappeared from the project again, most likely after another GitHub sync. Without it the home page fails to load.

## Steps
1. Reinstall the missing package and refresh both lockfiles.
2. Check the build log shows no errors.
3. Open the home page in a phone-sized browser (390px wide) and confirm it renders with no error overlay or runtime errors; screenshot as evidence.
4. If anything else is still broken, fix that root cause too (e.g. Tailwind drift from v3).

Nothing will be published.
