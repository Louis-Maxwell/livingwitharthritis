## Add accurate lat/lng to all UK cities + surface in city-page schema

The `ukCities` dataset (~50 cities in `src/data/ukCities.ts`) has no coordinates today. The user wants correct lat/lng across the dataset and the city pages still rendering / valid after the change.

### 1. Extend the data model
- Add `lat: number;` and `lng: number;` (required) to the `UKCity` interface.
- Populate every existing city with WGS84 city-centre coordinates rounded to 4 decimals (≈11 m precision), e.g. London 51.5074 / −0.1278, Manchester 53.4808 / −2.2426, Edinburgh 55.9533 / −3.1883, Belfast 54.5973 / −5.9301, Cardiff 51.4816 / −3.1791, etc. Source: Ordnance Survey OS Open Names / ONS centroids — cross-checked against Wikipedia infobox values.
- Reformat the array one city per line in clean multi-line objects so the file stays diff-readable (current single-line rows are hard to review).

### 2. Use the coordinates in JSON-LD (AEO / GEO)
In both `src/pages/CityArthritisPage.tsx` and `src/pages/CityConditionPage.tsx`, upgrade the existing schema block where `geographicArea` is set:

```jsonc
geographicArea: {
  "@type": "City",
  name: cityData.name,
  containedInPlace: { "@type": "Country", name: "United Kingdom" },
  geo: { "@type": "GeoCoordinates", latitude: cityData.lat, longitude: cityData.lng }
}
```

Keep the existing `<meta name="geo.placename">` / `geo.region` tags; add `<meta name="geo.position" content="{lat};{lng}">` and `<meta name="ICBM" content="{lat}, {lng}">` for legacy AEO/GEO crawlers.

### 3. Keep prerender + sitemap valid
- `scripts/prerender-routes.mjs` and `public/sitemap.xml` already list city routes through patterns — no schema change needed. Re-run prerender to confirm output.
- Run `node scripts/validate-jsonld.mjs` (already exists per prior work) on the prerendered city pages to confirm the new `GeoCoordinates` block parses.
- Spot-check 3 representative cities (London, Edinburgh, Belfast) in the browser preview: title still <60 chars, single H1, schema valid in Rich Results syntax.

### Out of scope
- No new cities, no copy changes, no design changes, no new components, no backend.
- No edits to other pages or to the prerender route list.

### Verification checklist
- TypeScript compiles (interface required, every row populated → catches omissions).
- `validate-jsonld.mjs` exits 0 for `/arthritis-help/london`, `/arthritis-help/edinburgh`, `/conditions/[c]/[city]` samples.
- Prerendered HTML for a sample city contains `"latitude":51.5074` (London) and the `geo.position` meta tag.
