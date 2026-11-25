/**
 * Build src/data/cover-credits.generated.json from public/openverse/ATTRIBUTION.json
 * so CC BY / CC BY-SA covers show the creator and licence (required by the licence)
 * instead of a generic "Openly licensed image" line.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const attr = JSON.parse(readFileSync('public/openverse/ATTRIBUTION.json', 'utf8'));
const LIC = { by: 'CC BY', 'by-sa': 'CC BY-SA', cc0: 'CC0', pdm: 'Public domain' };
const out = {};
for (const [file, a] of Object.entries(attr)) {
  if (!a || a.source === 'existing') continue;
  // Images supplied by Living With Arthritis carry their own credit line.
  if (typeof a.credit === 'string' && a.credit.trim()) { out[file] = a.credit.trim(); continue; }
  const rawLic = String(a.license || '').trim();
  const lic = LIC[rawLic.toLowerCase()] ?? rawLic;
  const ver = (a.license_url || '').match(/\/(\d\.\d)\/?/)?.[1];
  const licence = lic && ver && !/\d/.test(lic) && lic.startsWith('CC BY') ? `${lic} ${ver}` : lic;
  const host = /wikimedia/.test(a.source || '') ? 'Wikimedia Commons' : /flickr/.test(a.source || '') ? 'Flickr' : 'Openverse';
  const creator = String(a.creator || '').replace(/\s+/g, ' ').trim().slice(0, 80);
  const parts = [creator ? `Photo: ${creator}` : 'Photo', licence, `via ${host}`].filter(Boolean);
  out[file] = parts.join(' · ');
}
// These checksum-validated title cards are created by Living With Arthritis.
const editorial = JSON.parse(readFileSync('scripts/data/editorial-covers.json', 'utf8'));
const additional = 'scripts/data/editorial-herbs-cover.json';
if (existsSync(additional)) Object.assign(editorial, JSON.parse(readFileSync(additional, 'utf8')));
const care = 'scripts/data/editorial-care-covers.json';
if (existsSync(care)) Object.assign(editorial, JSON.parse(readFileSync(care, 'utf8')));
const reviewed = 'scripts/data/editorial-reviewed-blog-covers.json';
if (existsSync(reviewed)) Object.assign(editorial, JSON.parse(readFileSync(reviewed, 'utf8')));
const imageAudit1 = 'scripts/data/editorial-image-audit-25nov-1.json';
if (existsSync(imageAudit1)) Object.assign(editorial, JSON.parse(readFileSync(imageAudit1, 'utf8')));
const imageAudit2 = 'scripts/data/editorial-image-audit-25nov-2.json';
if (existsSync(imageAudit2)) Object.assign(editorial, JSON.parse(readFileSync(imageAudit2, 'utf8')));
const imageAudit3 = 'scripts/data/editorial-image-audit-25nov-3.json';
if (existsSync(imageAudit3)) Object.assign(editorial, JSON.parse(readFileSync(imageAudit3, 'utf8')));
const imageAudit4 = 'scripts/data/editorial-image-audit-25nov-4.json';
if (existsSync(imageAudit4)) Object.assign(editorial, JSON.parse(readFileSync(imageAudit4, 'utf8')));
const imageAudit5 = 'scripts/data/editorial-image-audit-25nov-5.json';
if (existsSync(imageAudit5)) Object.assign(editorial, JSON.parse(readFileSync(imageAudit5, 'utf8')));
for (const file of Object.keys(editorial)) out[file] = 'Image: Living With Arthritis';
writeFileSync('src/data/cover-credits.generated.json', JSON.stringify(out, null, 0) + '\n');
console.log(`[cover-credits] ${Object.keys(out).length} credits written`);
