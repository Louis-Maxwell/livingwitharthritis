/**
 * Shared IP rate limiting middleware for Supabase Edge Functions.
 *
 * Production uses a Redis-compatible REST API (Upstash by default). Local
 * development and tests use an isolate-local in-memory store.
 */
import { getCorsHeaders } from "./http.ts";

export type RateLimitCategory =
  | "authentication"
  | "contact"
  | "search"
  | "general"
  | "exempt";

export interface RateLimitConfig {
  limit: number;
  windowSeconds: number;
}

export interface RateLimitStore {
  increment(key: string, ttlSeconds: number): Promise<number>;
}

export interface RateLimitDecision {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetEpochSeconds: number;
  retryAfterSeconds: number;
  identifier: string;
}

type EnvReader = (name: string) => string | undefined;
type Handler = (request: Request) => Response | Promise<Response>;

const DEFAULTS: Record<Exclude<RateLimitCategory, "exempt">, RateLimitConfig> = {
  authentication: { limit: 5, windowSeconds: 60 },
  contact: { limit: 3, windowSeconds: 60 },
  search: { limit: 30, windowSeconds: 60 },
  general: { limit: 100, windowSeconds: 15 * 60 },
};

const ENV_PREFIX: Record<Exclude<RateLimitCategory, "exempt">, string> = {
  authentication: "AUTH",
  contact: "CONTACT",
  search: "SEARCH",
  general: "GENERAL",
};

const ERROR_BODY = {
  error: "Too many requests. Please try again later.",
};

export const ENDPOINT_RATE_LIMIT_CATEGORIES = {
  "auth-email-hook": "authentication",
  "book-appointment": "contact",
  chat: "search",
  "conditions-feed": "general",
  "create-donation-checkout": "general",
  "daily-content-freshness": "general",
  "daily-seo-refresh": "general",
  "generate-sitemap": "general",
  "generate-syndication-pack": "general",
  "handle-email-suppression": "general",
  "handle-email-unsubscribe": "general",
  "index-content": "general",
  "indexnow-ping": "general",
  "ingest-content": "general",
  mcp: "search",
  "notify-patient-status": "general",
  "preview-transactional-email": "general",
  "process-donation": "general",
  "process-email-queue": "general",
  "reindex-content": "general",
  "request-buddy-match": "contact",
  "run-psi-audit": "exempt",
  "send-patient-email": "general",
  "send-transactional-email": "general",
  "seo-rank-sync": "exempt",
  "serve-sitemap": "general",
  "submit-contact": "contact",
  "submit-fundraising": "contact",
  "submit-triage": "contact",
  "symptom-ranker": "search",
} as const satisfies Record<string, RateLimitCategory>;

export type RateLimitedEndpoint =
  keyof typeof ENDPOINT_RATE_LIMIT_CATEGORIES;

function defaultEnv(name: string): string | undefined {
  const deno = (globalThis as {
    Deno?: { env?: { get: (key: string) => string | undefined } };
  }).Deno;
  return deno?.env?.get(name);
}

function positiveInteger(
  value: string | undefined,
  fallback: number,
): number {
  if (!value) return fallback;
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

export function getRateLimitConfig(
  category: Exclude<RateLimitCategory, "exempt">,
  env: EnvReader = defaultEnv,
): RateLimitConfig {
  const prefix = ENV_PREFIX[category];
  const defaults = DEFAULTS[category];
  return {
    limit: positiveInteger(
      env(`RATE_LIMIT_${prefix}_REQUESTS`),
      defaults.limit,
    ),
    windowSeconds: positiveInteger(
      env(`RATE_LIMIT_${prefix}_WINDOW_SECONDS`),
      defaults.windowSeconds,
    ),
  };
}

function validIp(value: string | null): string | undefined {
  const candidate = value?.trim();
  if (!candidate || candidate.length > 64) return undefined;
  if (!/^[0-9a-f:.]+$/i.test(candidate)) return undefined;
  return candidate;
}

/**
 * Prefer headers overwritten by the edge proxy. For X-Forwarded-For, select
 * from the trusted (right-hand) side so caller-prepended spoof values do not
 * bypass the limiter.
 */
export function getClientIp(
  request: Request,
  env: EnvReader = defaultEnv,
): string {
  const cloudflare = validIp(request.headers.get("cf-connecting-ip"));
  if (cloudflare) return cloudflare;

  const realIp = validIp(request.headers.get("x-real-ip"));
  if (realIp) return realIp;

  const forwarded = (request.headers.get("x-forwarded-for") ?? "")
    .split(",")
    .map((part) => validIp(part))
    .filter((part): part is string => Boolean(part));
  if (forwarded.length > 0) {
    const trustedHops = positiveInteger(
      env("RATE_LIMIT_TRUST_PROXY_HOPS"),
      1,
    );
    return forwarded[Math.max(0, forwarded.length - trustedHops)];
  }

  return "unknown";
}

async function hashIdentifier(value: string, salt: string): Promise<string> {
  const bytes = new TextEncoder().encode(`${salt}:${value}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, "0")
  ).join("").slice(0, 32);
}

interface MemoryEntry {
  count: number;
  expiresAt: number;
}

export class MemoryRateLimitStore implements RateLimitStore {
  private readonly entries = new Map<string, MemoryEntry>();
  private operations = 0;

  constructor(private readonly now: () => number = Date.now) {}

  async increment(key: string, ttlSeconds: number): Promise<number> {
    const now = this.now();
    const existing = this.entries.get(key);
    const count = !existing || existing.expiresAt <= now
      ? 1
      : existing.count + 1;
    this.entries.set(key, {
      count,
      expiresAt: now + ttlSeconds * 1000,
    });

    this.operations += 1;
    if (this.operations % 500 === 0) {
      for (const [entryKey, entry] of this.entries) {
        if (entry.expiresAt <= now) this.entries.delete(entryKey);
      }
    }
    return count;
  }

  clear(): void {
    this.entries.clear();
  }
}

export class RedisRestRateLimitStore implements RateLimitStore {
  constructor(
    private readonly url: string,
    private readonly token: string,
  ) {}

  async increment(key: string, ttlSeconds: number): Promise<number> {
    const response = await fetch(`${this.url.replace(/\/$/, "")}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        ["INCR", key],
        ["EXPIRE", key, String(ttlSeconds + 5)],
      ]),
    });
    if (!response.ok) {
      throw new Error(`Redis rate-limit request failed (${response.status})`);
    }
    const result = await response.json() as Array<{
      result?: number | string;
      error?: string;
    }>;
    if (result[0]?.error) throw new Error(result[0].error);
    const count = Number(result[0]?.result);
    if (!Number.isFinite(count)) {
      throw new Error("Redis rate-limit response did not contain a count");
    }
    return count;
  }
}

let sharedStore:
  | { signature: string; store: RateLimitStore }
  | undefined;

function isLocalEnvironment(env: EnvReader): boolean {
  const environment = (
    env("DENO_ENV") ??
    env("ENVIRONMENT") ??
    ""
  ).toLowerCase();
  const supabaseUrl = env("SUPABASE_URL") ?? "";
  return (
    ["local", "development", "test"].includes(environment) ||
    /localhost|127\.0\.0\.1/.test(supabaseUrl)
  );
}

export function createRateLimitStore(
  env: EnvReader = defaultEnv,
): RateLimitStore {
  const configuredMode = env("RATE_LIMIT_STORE")?.toLowerCase();
  const mode = configuredMode ?? (isLocalEnvironment(env) ? "memory" : "redis");
  if (mode === "memory") return new MemoryRateLimitStore();
  if (mode !== "redis") {
    throw new Error(`Unsupported RATE_LIMIT_STORE value: ${mode}`);
  }

  const url =
    env("RATE_LIMIT_REDIS_URL") ?? env("UPSTASH_REDIS_REST_URL");
  const token =
    env("RATE_LIMIT_REDIS_TOKEN") ?? env("UPSTASH_REDIS_REST_TOKEN");
  if (!url || !token) {
    throw new Error(
      "Redis rate limiting requires RATE_LIMIT_REDIS_URL and RATE_LIMIT_REDIS_TOKEN",
    );
  }
  return new RedisRestRateLimitStore(url, token);
}

function getSharedStore(env: EnvReader): RateLimitStore {
  const signature = [
    env("RATE_LIMIT_STORE"),
    env("DENO_ENV"),
    env("ENVIRONMENT"),
    env("SUPABASE_URL"),
    env("RATE_LIMIT_REDIS_URL"),
    env("UPSTASH_REDIS_REST_URL"),
  ].join("|");
  if (!sharedStore || sharedStore.signature !== signature) {
    sharedStore = { signature, store: createRateLimitStore(env) };
  }
  return sharedStore.store;
}

export function resetRateLimitStoreForTests(): void {
  sharedStore = undefined;
}

function rateLimitHeaders(decision: RateLimitDecision): Record<string, string> {
  return {
    "X-RateLimit-Limit": String(decision.limit),
    "X-RateLimit-Remaining": String(decision.remaining),
    "X-RateLimit-Reset": String(decision.resetEpochSeconds),
    "Access-Control-Expose-Headers":
      "X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, Retry-After",
  };
}

export async function checkRequestRateLimit(
  request: Request,
  scope: string,
  category: Exclude<RateLimitCategory, "exempt">,
  options: {
    env?: EnvReader;
    store?: RateLimitStore;
    now?: () => number;
  } = {},
): Promise<RateLimitDecision> {
  const env = options.env ?? defaultEnv;
  const now = options.now?.() ?? Date.now();
  const config = getRateLimitConfig(category, env);
  const window = Math.floor(now / (config.windowSeconds * 1000));
  const resetEpochSeconds = (window + 1) * config.windowSeconds;
  const ip = getClientIp(request, env);
  const identifier = await hashIdentifier(
    ip,
    env("RATE_LIMIT_KEY_SALT") ?? "living-with-arthritis",
  );
  const key = `rate-limit:v1:${scope}:${category}:${identifier}:${window}`;
  const store = options.store ?? getSharedStore(env);
  const count = await store.increment(key, config.windowSeconds);
  const remaining = Math.max(0, config.limit - count);
  const retryAfterSeconds = Math.max(
    1,
    resetEpochSeconds - Math.floor(now / 1000),
  );
  return {
    allowed: count <= config.limit,
    limit: config.limit,
    remaining,
    resetEpochSeconds,
    retryAfterSeconds,
    identifier,
  };
}

function isScopeExempt(scope: string, env: EnvReader): boolean {
  const configured = (env("RATE_LIMIT_EXEMPT_SCOPES") ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  return configured.includes(scope);
}

function withHeaders(response: Response, headers: Record<string, string>) {
  const merged = new Headers(response.headers);
  for (const [name, value] of Object.entries(headers)) {
    merged.set(name, value);
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: merged,
  });
}

export function withRateLimit(
  scope: string,
  category: RateLimitCategory,
  handler: Handler,
  options: {
    env?: EnvReader;
    store?: RateLimitStore;
    now?: () => number;
  } = {},
): Handler {
  return async (request) => {
    const env = options.env ?? defaultEnv;
    if (
      request.method === "OPTIONS" ||
      category === "exempt" ||
      env("RATE_LIMIT_ENABLED") === "false" ||
      isScopeExempt(scope, env)
    ) {
      return handler(request);
    }

    let decision: RateLimitDecision;
    try {
      decision = await checkRequestRateLimit(
        request,
        scope,
        category,
        options,
      );
    } catch (error) {
      console.error(JSON.stringify({
        event: "rate_limit_store_error",
        scope,
        message: error instanceof Error ? error.message : String(error),
      }));
      return new Response(
        JSON.stringify({ error: "Service temporarily unavailable." }),
        {
          status: 503,
          headers: {
            ...getCorsHeaders(request),
            "Content-Type": "application/json",
          },
        },
      );
    }

    const headers = rateLimitHeaders(decision);
    if (!decision.allowed) {
      console.warn(JSON.stringify({
        event: "rate_limit_exceeded",
        scope,
        category,
        identifier: decision.identifier,
        limit: decision.limit,
        reset: decision.resetEpochSeconds,
        userAgent: request.headers.get("user-agent")?.slice(0, 200) ?? "",
      }));
      return new Response(JSON.stringify(ERROR_BODY), {
        status: 429,
        headers: {
          ...getCorsHeaders(request),
          "Content-Type": "application/json",
          "Retry-After": String(decision.retryAfterSeconds),
          ...headers,
        },
      });
    }

    return withHeaders(await handler(request), headers);
  };
}

export function withEndpointRateLimit(
  scope: RateLimitedEndpoint,
  handler: Handler,
  options: {
    env?: EnvReader;
    store?: RateLimitStore;
    now?: () => number;
  } = {},
): Handler {
  const configuredCategory = ENDPOINT_RATE_LIMIT_CATEGORIES[scope];
  const endpointHandler: Handler = (request) => {
    const category =
      configuredCategory === "contact" && request.method !== "POST"
        ? "general"
        : configuredCategory;
    return withRateLimit(scope, category, handler, options)(request);
  };
  return endpointHandler;
}
