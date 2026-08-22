/// <reference types="node" />
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  ENDPOINT_RATE_LIMIT_CATEGORIES,
  MemoryRateLimitStore,
  RedisRestRateLimitStore,
  checkRequestRateLimit,
  createRateLimitStore,
  getClientIp,
  getRateLimitConfig,
  withEndpointRateLimit,
  withRateLimit,
  type RateLimitStore,
} from "../../../supabase/functions/_shared/rate-limit";

const envFrom = (values: Record<string, string>) => (name: string) =>
  values[name];

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("edge rate limiting", () => {
  it("uses the required default limits", () => {
    const env = envFrom({});
    expect(getRateLimitConfig("authentication", env)).toEqual({
      limit: 5,
      windowSeconds: 60,
    });
    expect(getRateLimitConfig("contact", env)).toEqual({
      limit: 3,
      windowSeconds: 60,
    });
    expect(getRateLimitConfig("search", env)).toEqual({
      limit: 30,
      windowSeconds: 60,
    });
    expect(getRateLimitConfig("general", env)).toEqual({
      limit: 100,
      windowSeconds: 900,
    });
  });

  it("allows three contact submissions then returns the standard 429", async () => {
    const violationLog = vi
      .spyOn(console, "warn")
      .mockImplementation(() => undefined);
    let now = Date.UTC(2026, 7, 22);
    const store = new MemoryRateLimitStore(() => now);
    const handler = vi.fn(async () =>
      new Response(JSON.stringify({ ok: true }), { status: 200 })
    );
    const limited = withRateLimit("submit-contact", "contact", handler, {
      store,
      now: () => now,
      env: envFrom({ RATE_LIMIT_KEY_SALT: "test" }),
    });
    const request = () =>
      new Request("https://example.test/functions/v1/submit-contact", {
        method: "POST",
        headers: { "cf-connecting-ip": "203.0.113.10" },
      });

    for (const remaining of [2, 1, 0]) {
      const response = await limited(request());
      expect(response.status).toBe(200);
      expect(response.headers.get("X-RateLimit-Limit")).toBe("3");
      expect(response.headers.get("X-RateLimit-Remaining")).toBe(
        String(remaining),
      );
      expect(response.headers.get("X-RateLimit-Reset")).toMatch(/^\d+$/);
    }

    const blocked = await limited(request());
    expect(blocked.status).toBe(429);
    expect(await blocked.json()).toEqual({
      error: "Too many requests. Please try again later.",
    });
    expect(blocked.headers.get("X-RateLimit-Limit")).toBe("3");
    expect(blocked.headers.get("X-RateLimit-Remaining")).toBe("0");
    expect(blocked.headers.get("Retry-After")).toMatch(/^\d+$/);
    expect(handler).toHaveBeenCalledTimes(3);
    expect(violationLog).toHaveBeenCalledWith(
      expect.stringContaining('"event":"rate_limit_exceeded"'),
    );

    now += 61_000;
    expect((await limited(request())).status).toBe(200);
  });

  it("uses trusted proxy headers without accepting a prepended spoof", () => {
    expect(
      getClientIp(
        new Request("https://example.test", {
          headers: {
            "cf-connecting-ip": "203.0.113.7",
            "x-forwarded-for": "198.51.100.99, 192.0.2.4",
          },
        }),
      ),
    ).toBe("203.0.113.7");

    expect(
      getClientIp(
        new Request("https://example.test", {
          headers: {
            "x-forwarded-for": "198.51.100.99, 203.0.113.8",
          },
        }),
        envFrom({ RATE_LIMIT_TRUST_PROXY_HOPS: "1" }),
      ),
    ).toBe("203.0.113.8");
  });

  it("supports environment overrides", () => {
    expect(
      getRateLimitConfig(
        "search",
        envFrom({
          RATE_LIMIT_SEARCH_REQUESTS: "12",
          RATE_LIMIT_SEARCH_WINDOW_SECONDS: "90",
        }),
      ),
    ).toEqual({ limit: 12, windowSeconds: 90 });
  });

  it("uses memory locally and requires Redis credentials in production", () => {
    expect(
      createRateLimitStore(
        envFrom({
          DENO_ENV: "development",
          SUPABASE_URL: "http://127.0.0.1:54321",
        }),
      ),
    ).toBeInstanceOf(MemoryRateLimitStore);

    expect(() =>
      createRateLimitStore(envFrom({ ENVIRONMENT: "production" }))
    ).toThrow(/Redis rate limiting requires/);
  });

  it("increments production counters through the Redis REST pipeline", async () => {
    const fetchMock = vi.fn(
      async (_input: RequestInfo | URL, _init?: RequestInit) =>
        new Response(
        JSON.stringify([{ result: 2 }, { result: 1 }]),
        { status: 200, headers: { "Content-Type": "application/json" } },
        ),
    );
    vi.stubGlobal("fetch", fetchMock);
    const store = new RedisRestRateLimitStore(
      "https://redis.example.test/",
      "secret-token",
    );

    await expect(store.increment("rate-limit:key", 60)).resolves.toBe(2);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://redis.example.test/pipeline",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          Authorization: "Bearer secret-token",
        }),
      }),
    );
    const init = fetchMock.mock.calls[0][1] as RequestInit;
    expect(JSON.parse(String(init.body))).toEqual([
      ["INCR", "rate-limit:key"],
      ["EXPIRE", "rate-limit:key", "65"],
    ]);
  });

  it("exempts monitoring endpoints and OPTIONS requests", async () => {
    const store: RateLimitStore = {
      increment: vi.fn(async () => {
        throw new Error("must not run");
      }),
    };
    const handler = vi.fn(async () => new Response("ok"));

    const monitoring = withRateLimit(
      "run-psi-audit",
      "exempt",
      handler,
      { store },
    );
    expect(
      (await monitoring(new Request("https://example.test"))).status,
    ).toBe(200);

    const general = withRateLimit("test", "general", handler, { store });
    expect(
      (
        await general(
          new Request("https://example.test", { method: "OPTIONS" }),
        )
      ).status,
    ).toBe(200);
    expect(store.increment).not.toHaveBeenCalled();
  });

  it("uses the contact limit only for submissions", async () => {
    const store = new MemoryRateLimitStore();
    const options = {
      store,
      now: () => 1_700_000_000_000,
      env: envFrom({ RATE_LIMIT_KEY_SALT: "test" }),
    };
    const handler = async () => new Response("ok");
    const endpoint = withEndpointRateLimit(
      "book-appointment",
      handler,
      options,
    );

    const availability = await endpoint(
      new Request("https://example.test", {
        method: "GET",
        headers: { "x-real-ip": "192.0.2.22" },
      }),
    );
    expect(availability.headers.get("X-RateLimit-Limit")).toBe("100");

    const submission = await endpoint(
      new Request("https://example.test", {
        method: "POST",
        headers: { "x-real-ip": "192.0.2.22" },
      }),
    );
    expect(submission.headers.get("X-RateLimit-Limit")).toBe("3");
  });

  it("fails closed when the production store is unavailable", async () => {
    const handler = vi.fn(async () => new Response("ok"));
    const limited = withRateLimit("general", "general", handler, {
      store: {
        increment: async () => {
          throw new Error("redis unavailable");
        },
      },
      env: envFrom({}),
    });

    const response = await limited(
      new Request("https://example.test", {
        headers: { "cf-connecting-ip": "203.0.113.11" },
      }),
    );
    expect(response.status).toBe(503);
    expect(handler).not.toHaveBeenCalled();
  });

  it("returns decision metadata for integration with custom handlers", async () => {
    const decision = await checkRequestRateLimit(
      new Request("https://example.test", {
        headers: { "x-real-ip": "192.0.2.10" },
      }),
      "search",
      "search",
      {
        store: new MemoryRateLimitStore(),
        now: () => 1_700_000_000_000,
        env: envFrom({ RATE_LIMIT_KEY_SALT: "test" }),
      },
    );
    expect(decision).toMatchObject({
      allowed: true,
      limit: 30,
      remaining: 29,
    });
  });

  it("classifies and wraps every deployed Edge Function", () => {
    const functionsRoot = resolve(process.cwd(), "supabase/functions");
    const deployed = readdirSync(functionsRoot, { withFileTypes: true })
      .filter(
        (entry) =>
          entry.isDirectory() &&
          existsSync(resolve(functionsRoot, entry.name, "index.ts")),
      )
      .map((entry) => entry.name)
      .sort();
    const classified = Object.keys(ENDPOINT_RATE_LIMIT_CATEGORIES).sort();

    expect(classified).toEqual(deployed);
    for (const scope of classified) {
      const source = readFileSync(
        resolve(functionsRoot, scope, "index.ts"),
        "utf8",
      );
      expect(source).toContain("withEndpointRateLimit");
      expect(source).toMatch(
        new RegExp(`withEndpointRateLimit\\(\\s*["']${scope}["']`),
      );
    }
  });
});
