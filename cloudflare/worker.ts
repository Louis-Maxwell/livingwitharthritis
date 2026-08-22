import { WorkerEntrypoint } from "cloudflare:workers";
import {
  cacheControlFor,
  normalisePath,
  redirectTarget,
  shouldServeSpaShell,
} from "./routing";

const SECURITY_HEADERS: Record<string, string> = {
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(self)",
};

function withProductionHeaders(
  response: Response,
  pathname: string,
  status = response.status,
): Response {
  const headers = new Headers(response.headers);
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
    headers.set(name, value);
  }
  headers.set(
    "Cache-Control",
    cacheControlFor(pathname, headers.get("Content-Type") ?? ""),
  );
  return new Response(response.body, {
    status,
    statusText: status === response.status ? response.statusText : undefined,
    headers,
  });
}

function permanentRedirect(requestUrl: URL, target: string): Response {
  const destination = new URL(target, requestUrl.origin);
  destination.search = requestUrl.search;
  return new Response(null, {
    status: 301,
    headers: {
      Location: destination.toString(),
      "Cache-Control": "public, max-age=86400",
      ...SECURITY_HEADERS,
    },
  });
}

export default class extends WorkerEntrypoint<Env> {
  override async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const pathname = normalisePath(url.pathname);

    if (!["GET", "HEAD"].includes(request.method)) {
      return new Response("Method Not Allowed", {
        status: 405,
        headers: {
          Allow: "GET, HEAD",
          ...SECURITY_HEADERS,
        },
      });
    }

    const redirect = redirectTarget(pathname);
    if (redirect) return permanentRedirect(url, redirect);

    try {
      const assetResponse = await this.env.ASSETS.fetch(request);
      if (assetResponse.status !== 404) {
        return withProductionHeaders(assetResponse, pathname);
      }

      if (shouldServeSpaShell(pathname)) {
        const shellUrl = new URL("/index.html", url);
        const shellResponse = await this.env.ASSETS.fetch(
          new Request(shellUrl, request),
        );
        return withProductionHeaders(shellResponse, pathname);
      }

      const notFoundUrl = new URL("/404.html", url);
      const notFoundResponse = await this.env.ASSETS.fetch(
        new Request(notFoundUrl, request),
      );
      const response = withProductionHeaders(notFoundResponse, pathname, 404);
      response.headers.set("X-Robots-Tag", "noindex, nofollow");
      console.info(JSON.stringify({
        event: "not_found",
        pathname,
        ray: request.headers.get("cf-ray"),
      }));
      return response;
    } catch (error) {
      console.error(JSON.stringify({
        event: "asset_error",
        pathname,
        message: error instanceof Error ? error.message : String(error),
      }));
      return new Response("Service Unavailable", {
        status: 503,
        headers: {
          "Cache-Control": "no-store",
          ...SECURITY_HEADERS,
        },
      });
    }
  }
}
