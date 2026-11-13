/**
 * Host routing shared by vercel.json, the built `_redirects` file, and the
 * status check.
 *
 * Vercel applies `redirects` before the filesystem, then serves `404.html`
 * with HTTP 404 when nothing matches. It does not read Netlify `_redirects`.
 * Lovable ignores both files and returns the SPA shell with HTTP 200.
 *
 * Locale splats (`/es/*` and the other language prefixes) are omitted from
 * vercel.json. On Netlify they sit below explicit 200 pass-throughs. Vercel
 * has no pass-through, so the same splat would 301 real translated pages
 * such as `/es/conditions/osteoarthritis`.
 */

/** Netlify splats that must not be copied into vercel.json. */
export const SKIP_VERCEL_SOURCES = new Set(["/es/*", "/fr/*", "/de/*", "/pt/*"]);

/** Vercel rejects a redirects array longer than this. */
export const VERCEL_REDIRECT_LIMIT = 2048;

const STATUS_RE = /^(301|302|303|307|308|200|404|401|410|451)!?$/;

export function parseNetlifyRedirects(text) {
  const rules = [];
  for (const raw of String(text).split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const parts = line.split(/\s+/);
    if (parts.length < 3 || !STATUS_RE.test(parts[2])) continue;
    const statusToken = parts[2];
    rules.push({
      from: parts[0],
      to: parts[1],
      status: Number(statusToken.replace("!", "")),
      force: statusToken.endsWith("!"),
    });
  }
  return rules;
}

/**
 * Force 3xx rules so a static host that prefers an existing file still
 * emits the redirect. Redirect stubs under dist/<path>/index.html would
 * otherwise win and return HTTP 200.
 */
export function forcePermanentRedirects(text) {
  return String(text).replace(/^(\s*\/\S+\s+\S+\s+)301\s*$/gm, "$1301!");
}

function toVercelSource(from) {
  if (!from.includes("*")) return from;
  if (!from.endsWith("/*")) {
    throw new Error(`Unsupported Netlify splat (expected a trailing /*): ${from}`);
  }
  return `${from.slice(0, -1)}:path*`;
}

/**
 * Exact 301s in file order (first source wins), then the safe splat rules.
 * @returns {{ $schema: string, trailingSlash: false, redirects: {source: string, destination: string, statusCode: 301}[] }}
 */
export function buildVercelConfig(redirectsText) {
  const rules = parseNetlifyRedirects(redirectsText);
  const redirects = [];
  const seen = new Set();
  const add = (source, destination) => {
    if (!source.startsWith("/") || source.startsWith("//")) {
      throw new Error(`Redirect source must be a site path: ${source}`);
    }
    if (!destination.startsWith("/") || destination.startsWith("//")) {
      throw new Error(`Redirect destination must be a site path: ${destination}`);
    }
    if (seen.has(source)) return;
    seen.add(source);
    redirects.push({ source, destination, statusCode: 301 });
  };

  for (const rule of rules) {
    if (rule.status !== 301 || rule.from.includes("*") || rule.from.includes(":")) continue;
    add(rule.from, rule.to);
  }
  for (const rule of rules) {
    if (rule.status !== 301) continue;
    if (!(rule.from.includes("*") || rule.from.includes(":"))) continue;
    if (SKIP_VERCEL_SOURCES.has(rule.from)) continue;
    if (rule.to.includes(":splat")) {
      throw new Error(`Refusing to copy a Netlify splat destination into vercel.json: ${rule.from}`);
    }
    add(toVercelSource(rule.from), rule.to);
  }

  if (redirects.length > VERCEL_REDIRECT_LIMIT) {
    throw new Error(
      `vercel.json would contain ${redirects.length} redirects; Vercel allows ${VERCEL_REDIRECT_LIMIT}`,
    );
  }

  return {
    $schema: "https://openapi.vercel.sh/vercel.json",
    trailingSlash: false,
    redirects,
  };
}

export function serializeVercelConfig(config) {
  return `${JSON.stringify(config, null, 2)}\n`;
}

function compileSource(source) {
  const names = [];
  const body = source
    .split("/")
    .map((segment) => {
      if (/^:[A-Za-z0-9_]+\*$/.test(segment)) {
        names.push(segment.slice(1, -1));
        return "(.*)";
      }
      if (/^:[A-Za-z0-9_]+$/.test(segment)) {
        names.push(segment.slice(1));
        return "([^/]+)";
      }
      return segment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    })
    .join("/");
  return { re: new RegExp(`^${body}/?$`), names };
}

function applyDestination(destination, names, match) {
  const values = {};
  names.forEach((name, index) => {
    values[name] = match[index + 1] ?? "";
  });
  return destination.replace(/:([A-Za-z0-9_]+)\*?/g, (_, name) => values[name] ?? "");
}

/**
 * Vercel static order: trailing-slash normalisation, then redirects
 * (these win over files), then a real file, then 404.html.
 */
export function resolveHostRequest({ pathname, search = "", files, redirects, trailingSlash = false }) {
  const pathOnly = String(pathname || "/").split("?")[0].split("#")[0];
  if (!pathOnly.startsWith("/") || pathOnly.includes("\\") || pathOnly.split("/").includes("..")) {
    return { status: 400, file: null, location: null };
  }

  if (trailingSlash === false && pathOnly.length > 1 && pathOnly.endsWith("/")) {
    return { status: 308, file: null, location: pathOnly.slice(0, -1) + search };
  }

  for (const rule of redirects) {
    const { re, names } = compileSource(rule.source);
    const match = re.exec(pathOnly);
    if (!match) continue;
    const location = applyDestination(rule.destination, names, match);
    return { status: rule.statusCode || 301, file: null, location: location + search };
  }

  const rel = pathOnly.replace(/^\/+/, "");
  const candidates = rel === "" ? ["index.html"] : [rel, `${rel}/index.html`, `${rel}.html`];
  for (const candidate of candidates) {
    if (files.has(candidate)) return { status: 200, file: candidate, location: null };
  }

  if (files.has("404.html")) return { status: 404, file: "404.html", location: null };
  return { status: 404, file: null, location: null };
}
