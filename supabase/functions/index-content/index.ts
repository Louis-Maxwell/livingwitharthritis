// Batch content indexer — embeds chunks of site content and upserts into content_embeddings.
// POST { items: [{ source_type, source_slug, url, title, content, chunk_index?, snippet? }] }
// Uses SHA-256 checksum to skip unchanged content (zero embedding cost on re-runs).

import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

interface IndexItem {
  source_type: string;
  source_slug: string;
  url: string;
  title: string;
  content: string;
  chunk_index?: number;
  snippet?: string;
}

async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function embedBatch(inputs: string[]): Promise<number[][]> {
  const resp = await fetch("https://ai.gateway.lovable.dev/v1/embeddings", {
    method: "POST",
    headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: "openai/text-embedding-3-small", input: inputs }),
  });
  if (!resp.ok) {
    const t = await resp.text();
    throw new Error(`embedding failed ${resp.status}: ${t}`);
  }
  const json = await resp.json();
  return json.data.map((d: { embedding: number[] }) => d.embedding);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const { items } = (await req.json()) as { items: IndexItem[] };
    if (!Array.isArray(items) || items.length === 0) {
      return new Response(JSON.stringify({ error: "items required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);

    // Compute checksums, look up existing rows
    const enriched = await Promise.all(items.map(async (it) => ({
      ...it,
      chunk_index: it.chunk_index ?? 0,
      snippet: it.snippet ?? it.content.slice(0, 220),
      checksum: await sha256(it.content),
    })));

    const keys = enriched.map((e) => `${e.source_type}::${e.source_slug}::${e.chunk_index}`);
    const { data: existing } = await supabase
      .from("content_embeddings")
      .select("source_type, source_slug, chunk_index, checksum")
      .in("source_slug", [...new Set(enriched.map((e) => e.source_slug))]);

    const existingMap = new Map<string, string>();
    (existing ?? []).forEach((r) => {
      existingMap.set(`${r.source_type}::${r.source_slug}::${r.chunk_index}`, r.checksum);
    });

    const toEmbed = enriched.filter((e, i) => existingMap.get(keys[i]) !== e.checksum);
    if (toEmbed.length === 0) {
      return new Response(JSON.stringify({ indexed: 0, skipped: items.length }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Embed in batches of 64
    const BATCH = 64;
    let indexed = 0;
    for (let i = 0; i < toEmbed.length; i += BATCH) {
      const slice = toEmbed.slice(i, i + BATCH);
      const vectors = await embedBatch(slice.map((s) => s.content));
      const rows = slice.map((s, idx) => ({
        source_type: s.source_type,
        source_slug: s.source_slug,
        chunk_index: s.chunk_index,
        url: s.url,
        title: s.title,
        snippet: s.snippet,
        content: s.content,
        checksum: s.checksum,
        embedding: vectors[idx] as unknown as string,
      }));
      const { error } = await supabase
        .from("content_embeddings")
        .upsert(rows, { onConflict: "source_type,source_slug,chunk_index" });
      if (error) throw error;
      indexed += slice.length;
    }

    return new Response(JSON.stringify({ indexed, skipped: items.length - toEmbed.length }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("index-content error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "unknown" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
