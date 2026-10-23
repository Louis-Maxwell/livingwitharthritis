/**
 * Build src/data/cover-credits.generated.json from public/openverse/ATTRIBUTION.json
 * so CC BY / CC BY-SA covers show the creator and licence (required by the licence)
 * instead of a generic "Openly licensed image" line.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const attr = JSON.parse(readFileSync('public/openverse/ATTRIBUTION.json', 'utf8'));
const LIC = { by: 'CC BY', 'by-sa': 'CC BY-SA', cc0: 'CC0', pdm: 'Public domain' };
const out = {};
for (const [file, a] of Object.entries(attr)) {
  if (!a || a.source === 'existing') continue;
  if (a.source === 'ai-generated') { out[file] = 'AI-generated illustration'; continue; }
  const rawLic = String(a.license || '').trim();
  const lic = LIC[rawLic.toLowerCase()] ?? rawLic;
  const ver = (a.license_url || '').match(/\/(\d\.\d)\/?/)?.[1];
  const licence = lic && ver && !/\d/.test(lic) && lic.startsWith('CC BY') ? `${lic} ${ver}` : lic;
  const host = /wikimedia/.test(a.source || '') ? 'Wikimedia Commons' : /flickr/.test(a.source || '') ? 'Flickr' : 'Openverse';
  const creator = String(a.creator || '').replace(/\s+/g, ' ').trim().slice(0, 80);
  const parts = [creator ? `Photo: ${creator}` : 'Photo', licence, `via ${host}`].filter(Boolean);
  out[file] = parts.join(' · ');
}
writeFileSync('src/data/cover-credits.generated.json', JSON.stringify(out, null, 0) + '\n');
console.log(`[cover-credits] ${Object.keys(out).length} credits written`);
