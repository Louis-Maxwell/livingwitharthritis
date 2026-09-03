/**
 * IndexNow ping — tells Bing, Copilot, Yandex and other IndexNow
 * participants that our key hub URLs changed. Runs after a production
 * build (see package.json postbuild). Deliberately simple: a fixed list
 * of hub URLs, one POST, never fails the build.
 *
 * The key file must stay reachable at
 * https://livingwitharthritis.org.uk/<KEY>.txt (public/<KEY>.txt).
 */
const KEY = 'c98cc1e7f04d43b213d256e243f9ddd6';
const HOST = 'livingwitharthritis.org.uk';
const ORIGIN = `https://${HOST}`;

const PATHS = [
  '/',
  '/llms.txt',
  '/guides/benefits-pip',
  '/arthritis-waiting-list-help',
  '/diet',
  '/guides/exercise',
  '/about',
];

async function main() {
  // Only ping for real production builds — local/dev builds would
  // otherwise submit URLs on every run.
  if (process.env.INDEXNOW !== '1' && process.env.NODE_ENV !== 'production') {
    console.log('[indexnow] skipped (set INDEXNOW=1 to force)');
    return;
  }

  const body = {
    host: HOST,
    key: KEY,
    keyLocation: `${ORIGIN}/${KEY}.txt`,
    urlList: PATHS.map((p) => `${ORIGIN}${p}`),
  };

  const res = await fetch('https://api.indexnow.org/IndexNow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });

  console.log(`[indexnow] submitted ${body.urlList.length} URLs — HTTP ${res.status}`);
}

main().catch((err) => {
  console.warn('[indexnow] ping failed (non-fatal):', err?.message ?? err);
});
