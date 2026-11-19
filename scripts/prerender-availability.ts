import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';

type PrerenderEnvironment = { PRERENDER?: string; PUPPETEER_EXECUTABLE_PATH?: string };
type Dependencies = { executablePath: () => string; exists: (path: string) => boolean };

/** Only explicit prerender runs need Chromium; ordinary hosted builds stay opt-in. */
export function explicitPrerenderEnabled(
  env: PrerenderEnvironment = { PRERENDER: process.env.PRERENDER, PUPPETEER_EXECUTABLE_PATH: process.env.PUPPETEER_EXECUTABLE_PATH },
  deps: Dependencies = {
    executablePath: () => createRequire(import.meta.url)('puppeteer').executablePath(),
    exists: existsSync,
  },
): boolean {
  if (env.PRERENDER !== '1') return false;
  let available = false;
  try {
    const executable = env.PUPPETEER_EXECUTABLE_PATH || deps.executablePath();
    available = Boolean(executable) && deps.exists(executable);
  } catch {
    // A missing package/path is an error only after PRERENDER=1 was requested.
  }
  if (!available) {
    throw new Error('[prerender] PRERENDER=1 requires an available Chromium binary. Install the Puppeteer browser or set PUPPETEER_EXECUTABLE_PATH to an existing executable. No prerender build was produced.');
  }
  return true;
}
