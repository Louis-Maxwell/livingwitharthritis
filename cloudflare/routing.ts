import { BLOG_SLUG_REDIRECTS } from "../src/data/blogRedirects";

const STATIC_REDIRECTS = new Map<string, string>([
  ...Object.entries(BLOG_SLUG_REDIRECTS).map(
    ([source, destination]) =>
      [`/blog/${source}`, `/blog/${destination}`] as const,
  ),
  ["/conditions/elbow-pain", "/conditions/elbow-arthritis"],
  ["/conditions/axial-spondyloarthritis", "/conditions/ankylosing-spondylitis"],
  ["/conditions/calcific-tendinitis", "/conditions/calcific-periarthritis"],
  ["/regions/greater-manchester", "/regions/north-west"],
  ["/regions/merseyside", "/regions/north-west"],
  ["/regions/lancashire", "/regions/north-west"],
  ["/regions/cheshire", "/regions/north-west"],
  ["/regions/west-midlands", "/regions/midlands"],
  ["/regions/east-midlands", "/regions/midlands"],
  ["/regions/staffordshire", "/regions/midlands"],
  ["/regions/warwickshire", "/regions/midlands"],
]);

const SPA_SHELL_PATHS = new Set([
  "/auth",
  "/.lovable/oauth/consent",
  "/donation-result",
  "/donation-result/success",
  "/unsubscribe",
  "/buddy/match",
  "/debug/schema",
]);

export function redirectTarget(pathname: string): string | undefined {
  return STATIC_REDIRECTS.get(normalisePath(pathname));
}

export function shouldServeSpaShell(pathname: string): boolean {
  const path = normalisePath(pathname);
  return path === "/admin" || path.startsWith("/admin/") ||
    SPA_SHELL_PATHS.has(path);
}

export function normalisePath(pathname: string): string {
  if (pathname === "/") return "/";
  return pathname.replace(/\/{2,}/g, "/").replace(/\/+$/, "");
}

export function cacheControlFor(pathname: string, contentType: string): string {
  if (
    pathname.startsWith("/assets/") ||
    pathname.startsWith("/og/") ||
    pathname.startsWith("/fonts/") ||
    pathname.startsWith("/hero/") ||
    pathname.startsWith("/openverse/")
  ) {
    return "public, max-age=31536000, immutable";
  }
  if (pathname.startsWith("/images/")) {
    return "public, max-age=2592000";
  }
  if (
    /^\/(?:sitemap[^/]*\.xml|robots\.txt|llms[^/]*\.txt)$/.test(pathname)
  ) {
    return "public, max-age=86400";
  }
  if (contentType.includes("text/html")) {
    return "public, max-age=0, must-revalidate";
  }
  return "public, max-age=3600";
}
