import { readFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

const root = '.agents/skills/security-audit';
const pin = JSON.parse(readFileSync(join(root, 'upstream.json'), 'utf8'));
if (pin.repo !== 'cloudflare/security-audit-skill' || !/^[a-f0-9]{40}$/.test(pin.commit)) {
  throw new Error('Invalid upstream provenance');
}
const actual = readdirSync(root).filter(name => name !== 'upstream.json').sort();
if (JSON.stringify(actual) !== JSON.stringify(Object.keys(pin.files).sort())) {
  throw new Error('Audit resource inventory changed; review and re-pin upstream');
}
for (const name of actual) {
  const hash = createHash('sha256').update(readFileSync(join(root, name))).digest('hex');
  if (hash !== pin.files[name]) throw new Error(`Audit resource changed: ${name}`);
}
console.log(`Verified ${actual.length} files from ${pin.repo} at ${pin.commit}`);
