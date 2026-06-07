## Diagnosis

The issue is not the React blog page now.

- Preview/Test database: **204 total articles, 203 published**
- Live/production database: **0 total articles, 0 published**
- Preview `/blog` correctly shows **203 Articles**
- Published site `/blog` correctly connects to the current backend, but Live has no article rows, so it shows **0 Articles**

Publishing updates code, schema, functions, and secrets. It does **not** copy database content from Test to Live. That is why the republish did not fix it.

## Complete fix plan

1. **Export the 204 blog article rows from Test**
   - Include all article fields used by the website: slug, title, excerpt, content, date, category, image, SEO fields, author/reviewer fields, published status, display order, timestamps if present.

2. **Import the same rows into Live**
   - Use an upsert by article slug so the operation is safe to repeat.
   - Preserve published/unpublished status exactly.
   - Do not touch patient data, donations, appointments, users, or any unrelated tables.

3. **Verify Live article visibility**
   - Query Live after import and confirm: **204 total / 203 published**.
   - Confirm the public anonymous read policy still allows published articles.

4. **Verify the public website**
   - Check `https://livingwitharthritis.org.uk/blog` shows **203 Articles**.
   - Confirm category counts are populated.
   - Confirm an individual article opens.

5. **Prevent this exact confusion going forward**
   - Add a short internal note to the project plan explaining that article content must exist separately in Live; publishing alone does not sync article rows.

## Technical notes

- No frontend redesign is needed.
- No RLS policy change appears necessary; Live already has the public published-article read policy.
- The likely change is a controlled data copy from Test to Live for `public.blog_articles` only.
- If direct Live writes are restricted by the environment tools, I will generate an exact SQL import file for you to run in Lovable Cloud with the **Live** environment selected.