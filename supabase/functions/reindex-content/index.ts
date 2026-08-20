/**
 * Rebuilds the chat retrieval index (public.content_embeddings).
 *
 * Sources:
 *  1. site-corpus.json — 238 condition/guide/glossary/city page passages,
 *     generated from scripts/ai-head-data.json (the same reviewed data used
 *     for on-page schema and llms-full.txt).
 *  2. public.blog_articles — every published article, chunked.
 *
 * Content is checksummed, so re-runs only re-embed what actually changed.
 *
 * POST /functions/v1/reindex-content
 * Header: x-reindex-token: <CONTENT_REINDEX_TOKEN>  (or a service-role bearer)
 * Body:   { "source": "pages" | "blog" | "all", "offset": 0, "limit": 60 }
 * Returns: { source, offset, processed, embedded, skipped, nextOffset }
 */
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";
import sitePages from "./site-corpus.json" with { type: "json" };

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const REINDEX_TOKEN = Deno.env.get("CONTENT_REINDEX_TOKEN") ?? "";

const EMBED_MODEL = "openai/text-embedding-3-small"; // 1536 dims — matches column
const EMBED_BATCH = 32;
const MAX_CHARS = 4000; // ~1k tokens per chunk, well under the 8192 cap

interface Item {
  source_type: string;
  source_slug: string;
  chunk_index: number;
  url: string;
  title: string;
  content: string;
}

async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

/** Strip markdown/HTML so the embedded text is prose, not syntax. */
function toPlainText(raw: string): string {
  return raw
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[#*_`>|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Split into ~MAX_CHARS passages on sentence boundaries. */
function chunk(text: string): string[] {
  if (text.length <= MAX_CHARS) return [text];
  const sentences = text.split(/(?<=[.!?])\s+/);
  const out: string[] = [];
  let current = "";
  for (const s of sentences) {
    if ((current + " " + s).length > MAX_CHARS && current) {
      out.push(current.trim());
      current = s;
    } else {
      current = current ? `${current} ${s}` : s;
    }
  }
  if (current.trim()) out.push(current.trim());
  return out;
}

async function embedBatch(inputs: string[]): Promise<number[][]> {
  const resp = await fetch("https://ai.gateway.lovable.dev/v1/embeddings", {
    method: "POST",
    headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: EMBED_MODEL, input: inputs }),
  });
  if (!resp.ok) {
    throw new Error(`embedding failed ${resp.status}: ${await resp.text()}`);
  }
  const json = await resp.json();
  return json.data
    .sort((a: { index: number }, b: { index: number }) => a.index - b.index)
    .map((d: { embedding: number[] }) => d.embedding);
}

function pageItems(): Item[] {
  return (sitePages as Omit<Item, "chunk_index">[]).flatMap((p) =>
    chunk(p.content).map((c, i) => ({ ...p, chunk_index: i, content: c })),
  );
}

async function blogItems(
  client: ReturnType<typeof createClient>,
  offset: number,
  limit: number,
  sinceIso?: string,
): Promise<{ items: Item[]; hasMore: boolean }> {
  let query = client
    .from("blog_articles")
    .select("slug, title, excerpt, direct_answer, content, category")
    .eq("is_published", true);
  if (sinceIso) query = query.gte("updated_at", sinceIso);
  const { data, error } = await query
    .order("slug", { ascending: true })
    .range(offset, offset + limit - 1);
  if (error) throw new Error(`blog fetch failed: ${error.message}`);


  const rows = (data ?? []) as Array<Record<string, string | null>>;
  const items: Item[] = [];
  for (const r of rows) {
    if (!r.slug) continue;
    const head = [r.title, r.direct_answer, r.excerpt].filter(Boolean).join(". ");
    const body = toPlainText(r.content ?? "");
    const full = toPlainText(`${head}. ${body}`);
    if (full.length < 80) continue;
    chunk(full).forEach((c, i) => {
      items.push({
        source_type: "article",
        source_slug: r.slug as string,
        chunk_index: i,
        url: `/blog/${r.slug}`,
        title: r.title ?? (r.slug as string),
        // Every chunk keeps the article title so an isolated middle chunk
        // still identifies its own topic when retrieved.
        content: i === 0 ? c : `${r.title ?? r.slug}: ${c}`,
      });
    });
  }
  return { items, hasMore: rows.length === limit };
}

async function upsert(
  client: ReturnType<typeof createClient>,
  items: Item[],
): Promise<{ embedded: number; skipped: number }> {
  if (!items.length) return { embedded: 0, skipped: 0 };

  const enriched = await Promise.all(
    items.map(async (it) => ({ ...it, checksum: await sha256(it.content) })),
  );

  const { data: existing } = await client
    .from("content_embeddings")
    .select("source_type, source_slug, chunk_index, checksum")
    .in("source_slug", [...new Set(enriched.map((e) => e.source_slug))]);

  const seen = new Map<string, string>();
  for (const r of (existing ?? []) as Array<Record<string, string | number>>) {
    seen.set(`${r.source_type}::${r.source_slug}::${r.chunk_index}`, String(r.checksum));
  }

  const todo = enriched.filter(
    (e) => seen.get(`${e.source_type}::${e.source_slug}::${e.chunk_index}`) !== e.checksum,
  );
  if (!todo.length) return { embedded: 0, skipped: enriched.length };

  let embedded = 0;
  for (let i = 0; i < todo.length; i += EMBED_BATCH) {
    const slice = todo.slice(i, i + EMBED_BATCH);
    const vectors = await embedBatch(slice.map((s) => s.content));
    const rows = slice.map((s, idx) => ({
      source_type: s.source_type,
      source_slug: s.source_slug,
      chunk_index: s.chunk_index,
      url: s.url,
      title: s.title,
      snippet: s.content.slice(0, 700),
      content: s.content,
      checksum: s.checksum,
      embedding: vectors[idx] as unknown as string,
    }));
    const { error } = await client
      .from("content_embeddings")
      .upsert(rows, { onConflict: "source_type,source_slug,chunk_index" });
    if (error) throw new Error(`upsert failed: ${error.message}`);
    embedded += rows.length;
  }
  return { embedded, skipped: enriched.length - todo.length };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  try {
    const token =
      req.headers.get("x-reindex-token") ??
      (req.headers.get("Authorization") ?? "").replace(/^Bearer\s+/i, "").trim();
    const authorised =
      (REINDEX_TOKEN && token === REINDEX_TOKEN) || (SERVICE_ROLE && token === SERVICE_ROLE);
    if (!authorised) return json({ error: "Unauthorized" }, 401);

    const body = (await req.json().catch(() => ({}))) as {
      source?: string;
      offset?: number;
      limit?: number;
    };
    const source =
      body.source === "blog" || body.source === "pages" || body.source === "recent"
        ? body.source
        : "all";
    const offset = Math.max(0, Number(body.offset ?? 0) | 0);
    const limit = Math.min(80, Math.max(1, Number(body.limit ?? 40) | 0));

    const client = createClient(SUPABASE_URL, SERVICE_ROLE, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    if (source === "pages") {
      const all = pageItems();
      const slice = all.slice(offset, offset + limit);
      const res = await upsert(client, slice);
      const nextOffset = offset + limit < all.length ? offset + limit : null;
      return json({ source, offset, processed: slice.length, ...res, nextOffset, total: all.length });
    }

    if (source === "blog" || source === "recent") {
      // "recent" is the daily maintenance mode: only articles created or
      // edited in the last 3 days, so the nightly run is cheap and the index
      // never drifts behind the site.
      const sinceIso =
        source === "recent"
          ? new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
          : undefined;
      const { items, hasMore } = await blogItems(client, offset, limit, sinceIso);
      const res = await upsert(client, items);
      return json({
        source,
        offset,
        processed: items.length,
        ...res,
        nextOffset: hasMore ? offset + limit : null,
      });
    }


    // "all" — pages first, then blog, in caller-driven pages to stay inside
    // the function time budget.
    const all = pageItems();
    if (offset < all.length) {
      const slice = all.slice(offset, offset + limit);
      const res = await upsert(client, slice);
      return json({
        source: "pages",
        offset,
        processed: slice.length,
        ...res,
        nextOffset: offset + limit,
        total: all.length,
      });
    }
    const blogOffset = offset - all.length;
    const { items, hasMore } = await blogItems(client, blogOffset, limit);
    const res = await upsert(client, items);
    return json({
      source: "blog",
      offset: blogOffset,
      processed: items.length,
      ...res,
      nextOffset: hasMore ? offset + limit : null,
    });
  } catch (e) {
    console.error("reindex-content error:", e);
    return json({ error: e instanceof Error ? e.message : "unknown" }, 500);
  }
});
