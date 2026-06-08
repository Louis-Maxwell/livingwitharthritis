// One-shot admin endpoint to execute upsert SQL against the database.
// Deleted immediately after sync. Protected by short-lived shared token.
import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

const TOKEN = "sync-7f4a9e1c-blog-2026-06-08";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-sync-token",
      },
    });
  }
  if (req.headers.get("x-sync-token") !== TOKEN) {
    return new Response("Unauthorized", { status: 401 });
  }
  const sql = await req.text();
  if (!sql.trim()) return new Response("empty", { status: 400 });

  const dbUrl = Deno.env.get("SUPABASE_DB_URL")!;
  const client = new Client(dbUrl);
  try {
    await client.connect();
    await client.queryArray(sql);
    return new Response(JSON.stringify({ ok: true, bytes: sql.length }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: String(e) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  } finally {
    try { await client.end(); } catch (_) {}
  }
});
