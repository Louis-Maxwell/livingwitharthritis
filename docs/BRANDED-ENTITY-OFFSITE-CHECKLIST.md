# Branded entity — off-site checklist (Louis only)

On-site Phase 1–2 (titles, About entity block, Organization JSON-LD, `sameAs`) ships in the repo. **These steps need Louis** in official portals and social accounts. Do not invent Wikipedia pages or buy citations.

**Canonical facts (use exactly):**

- Legal name: Living With Arthritis
- Brand: Living With Arthritis UK
- Charity number (England & Wales): **1218461**
- Website: **https://livingwitharthritis.org.uk**
- Independent of Arthritis UK
- Founder: Louis Maxwell, HCPC PH128483
- Phone: 07760 512 084 (+44 7760 512084)
- Email: info@livingwitharthritis.org.uk
- **Do not publish** the Oswestry registered address (Oswestry Primary Care Centre / Thomas Savin Road / SY11 1GA) on the website, social About tabs, or schema.

---

## 1. Charity Commission portal

- [ ] Log in to the Charity Commission register for **1218461**.
- [ ] Set **website** to `https://livingwitharthritis.org.uk` (no www, no trailing path).
- [ ] Activities / what you do: free clinically reviewed UK arthritis guidance (exercise, diet, benefits, waiting-list help). Independent of Arthritis UK.
- [ ] Contact: email + phone only on any field that is copied onto the public website.
- [ ] Leave the statutory registered-office field as the Commission requires. That is **not** a reason to restore the street on livingwitharthritis.org.uk.

## 2. Social bios (owned profiles only)

Use the exact brand string + number + URL. Do not add a street.

| Platform | Profile | Bio / About (suggested) |
|----------|---------|-------------------------|
| Facebook | [Page id 61583723925315](https://www.facebook.com/profile.php?id=61583723925315) | Living With Arthritis UK (charity 1218461). Independent of Arthritis UK. https://livingwitharthritis.org.uk |
| Instagram | [@livingwitharthritisuk](https://www.instagram.com/livingwitharthritisuk/) | Living With Arthritis UK (charity 1218461) · https://livingwitharthritis.org.uk |
| LinkedIn | [company/112596569](https://www.linkedin.com/company/112596569/) | Living With Arthritis UK (charity 1218461). Independent UK CIO. https://livingwitharthritis.org.uk |
| YouTube | [@livingwitharthritisuk](https://www.youtube.com/@livingwitharthritisuk) | Living With Arthritis UK (charity 1218461). https://livingwitharthritis.org.uk |

- [ ] Display name = **Living With Arthritis** or **Living With Arthritis UK** (not “Arthritis UK”).
- [ ] Website button / link = `https://livingwitharthritis.org.uk`.
- [ ] Do not create or link X/Twitter, TikTok, or Pinterest until ownership is confirmed in `src/config/social-media.ts`.

## 3. Optional Wikidata (draft only)

- [ ] When ready, **create or claim** a Wikidata item for the charity (not a Wikipedia article).
- Suggested fields: `name` Living With Arthritis; `official name` Living With Arthritis; `inception` 15 June 2026; `official website` https://livingwitharthritis.org.uk; Charity Commission ID **1218461**; `instance of` charitable organization / CIO.
- [ ] **Do not** create a Wikipedia stub. No notability shortcut, no promotional article.

## 4. After the next Lovable publish

- [ ] Confirm live `/` title is `Living With Arthritis UK | Registered Charity 1218461`.
- [ ] Confirm live `/about` has the entity block (name, 1218461, CIO, independent of Arthritis UK, email/phone — **no street**).
- [ ] Google Search Console → **URL Inspection** → Request indexing for `https://livingwitharthritis.org.uk/` and `https://livingwitharthritis.org.uk/about`.
- [ ] Bing Webmaster Tools: verify the property if needed; submit `https://livingwitharthritis.org.uk/sitemap.xml`.

## 5. Out of scope here

Google Ads, buying links, trade mark filing, restoring the Oswestry address on the public site, Dependabot/CodeRabbit.

---

*Written 2026-09-20. Companion to `docs/BRANDED-SEARCH-FIRST-PLAN.md`.*
