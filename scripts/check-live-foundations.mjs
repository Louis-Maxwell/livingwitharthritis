/** Read-only live hosting checks. curl uses the same transport as existing CI checks. */
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { writeFileAtomicSync } from './lib/atomic-write.mjs';

const run = promisify(execFile);
const site = 'https://livingwitharthritis.org.uk';
const output = resolve(process.argv[2] || '.preflight-reports/live-foundations.json');
const checks = [];

async function request(url) {
  try {
    const { stdout } = await run('curl', ['--silent', '--show-error', '--max-time', '25',
      '--dump-header', '-', '--write-out', '\nLWA_STATUS:%{http_code}', url], { maxBuffer: 2_000_000 });
    const status = Number(stdout.match(/LWA_STATUS:(\d+)\s*$/)?.[1]);
    const chunks = stdout.split(/\r?\n\r?\n/);
    let headers = chunks.shift() || '';
    // HTTPS proxies prepend their CONNECT response.
    while (/^HTTP\//.test(chunks[0] || '')) headers = chunks.shift();
    const body = chunks.join('\n\n').replace(/\nLWA_STATUS:\d+\s*$/, '');
    const header = (key) => headers.match(new RegExp(`^${key}:\\s*(.+)$`, 'im'))?.[1]?.trim() || '';
    return { status, body, header };
  } catch (error) {
    return { status: 0, body: '', header: () => '', error: error.message };
  }
}

function record(name, passed, evidence) { checks.push({ name, passed, evidence }); }

await Promise.all(['http://livingwitharthritis.org.uk', 'http://www.livingwitharthritis.org.uk',
  'https://www.livingwitharthritis.org.uk'].map(async (origin) => {
  // Test a deep URL so redirects cannot silently discard the requested guide.
  const path = '/conditions/osteoarthritis';
  const result = await request(origin + path);
  const target = result.header('location');
  record(`Permanent canonical redirect: ${origin}`, [301, 308].includes(result.status) && target === site + path,
    { status: result.status, location: target, error: result.error });
}));

const home = await request(site + '/');
record('HTTPS homepage and HSTS', home.status === 200 && /max-age=[1-9]\d*/i.test(home.header('strict-transport-security')),
  { status: home.status, hsts: home.header('strict-transport-security'), error: home.error });
const mixed = [...home.body.matchAll(/<(?:img|script|iframe|link|source)\b[^>]*\b(?:src|href|srcset)=["']http:\/\/[^"']*/gi)].map((m) => m[0]);
record('No HTTP assets in homepage response HTML', home.status === 200 && mixed.length === 0, mixed);

const robots = await request(site + '/robots.txt');
record('Public robots.txt advertises sitemap', robots.status === 200 &&
  /^Sitemap:\s*https:\/\/livingwitharthritis\.org\.uk\/sitemap(?:-index)?\.xml\s*$/im.test(robots.body),
  { status: robots.status });
const sitemap = await request(site + '/sitemap.xml');
record('Public sitemap XML', sitemap.status === 200 && /<urlset\b/.test(sitemap.body) && /<url>/.test(sitemap.body),
  { status: sitemap.status, pages: (sitemap.body.match(/<url>/g) || []).length });

const missing = await request(site + '/__lwa_missing_page_probe_20261009__');
record('Unknown URL returns HTTP 404 or 410', [404, 410].includes(missing.status),
  { status: missing.status, title: missing.body.match(/<title>(.*?)<\/title>/s)?.[1], error: missing.error });

mkdirSync(dirname(output), { recursive: true });
writeFileAtomicSync(output, JSON.stringify({ ranAt: new Date().toISOString(), site, checks }, null, 2) + '\n');
for (const check of checks) console.log(`${check.passed ? 'PASS' : 'FAIL'} ${check.name}: ${JSON.stringify(check.evidence)}`);
console.log(`Report: ${output}`);
if (checks.some((check) => !check.passed)) process.exitCode = 1;
