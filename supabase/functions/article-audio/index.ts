// Article voiceover generator.
//
// POST { slug } -> { url, duration, cached }
//
// Generates a natural-voice narration of a published blog article once, stores
// the MP3 in the private `article-audio` bucket, records it in
// public.article_audio keyed by slug + a hash of the narration text, and
// returns a signed URL. Later requests for the same article version reuse the
// stored file, so repeat listens cost nothing.

import { createClient } from 'npm:@supabase/supabase-js@2';
import {
  errJson,
  getCorsHeaders,
  newRequestId,
  okJson,
  parseJsonBody,
} from '../_shared/http.ts';
import {
  checkRateLimit,
  getClientIp,
  rateLimitResponse,
} from '../_shared/rate-limiter-v2.ts';

const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY') ?? '';
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? '';
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

const BUCKET = 'article-audio';
const TTS_MODEL = 'openai/gpt-4o-mini-tts';
const TTS_VOICE = 'alloy';
/** Signed URL lifetime: a week is plenty for a page session and keeps
 *  the URL cacheable by the browser. */
const SIGNED_URL_TTL_SECONDS = 60 * 60 * 24 * 7;
/** Conservative per-request budget; the model caps input length. */
const MAX_WORDS_PER_CHUNK = 350;
/** Guard against pathological inputs. */
const MAX_NARRATION_CHARS = 40_000;

/** Strip HTML to clean, speakable prose. */
function htmlToNarration(html: string): string {
  let text = html;
  // Drop non-spoken blocks entirely.
  text = text.replace(
    /<(script|style|figure|table|nav|aside|form|button)[\s\S]*?<\/\1>/gi,
    ' ',
  );
  // Headings become their own sentence.
  text = text.replace(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi, (_m, inner) => {
    const t = String(inner).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    if (!t) return ' ';
    return `\n\n${/[.?!:]$/.test(t) ? t : `${t}.`}\n\n`;
  });
  // Block breaks.
  text = text.replace(/<\/(p|li|div|blockquote|tr)>/gi, '\n\n');
  text = text.replace(/<br\s*\/?>/gi, '\n');
  // Remaining tags.
  text = text.replace(/<[^>]*>/g, ' ');
  // Entities.
  text = text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, 'and')
    .replace(/&lt;/g, ' ')
    .replace(/&gt;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&hellip;/g, '...')
    .replace(/&mdash;/g, ' - ')
    .replace(/&ndash;/g, ' - ');
  // Markdown leftovers.
  text = text.replace(/[*_`#>]+/g, ' ');
  text = text.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');
  // Whitespace.
  text = text.replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
  return text;
}

function buildNarration(article: {
  title: string;
  content: string;
  excerpt?: string | null;
  reviewed_by?: string | null;
}): string {
  const parts: string[] = [];
  parts.push(`${article.title.replace(/\s+/g, ' ').trim()}.`);
  parts.push('From Living With Arthritis UK.');
  if (article.reviewed_by && article.reviewed_by.trim()) {
    parts.push(`Reviewed by ${article.reviewed_by.trim()}.`);
  }
  const body = htmlToNarration(article.content || '');
  parts.push(body);
  parts.push(
    'This article is general information and is not a substitute for personal medical advice. ' +
      'Read more at living with arthritis dot org dot uk.',
  );
  const full = parts.filter(Boolean).join('\n\n');
  return full.length > MAX_NARRATION_CHARS
    ? full.slice(0, MAX_NARRATION_CHARS)
    : full;
}

/** Split into chunks that stay well under the model's input limit. */
function chunkForTts(text: string, maxWords = MAX_WORDS_PER_CHUNK): string[] {
  const wordCount = (s: string) => (s.match(/\S+/g) ?? []).length;
  const sentences = text.match(/[^.!?]+[.!?]*\s*/g) ?? [text];
  const chunks: string[] = [];
  let current = '';
  const flush = () => {
    if (current.trim()) chunks.push(current.trim());
    current = '';
  };
  for (const sentence of sentences) {
    if (wordCount(sentence) > maxWords) {
      flush();
      const words = sentence.match(/\S+/g) ?? [];
      for (let i = 0; i < words.length; i += maxWords) {
        chunks.push(words.slice(i, i + maxWords).join(' '));
      }
      continue;
    }
    if (current && wordCount(current) + wordCount(sentence) > maxWords) flush();
    current += sentence;
  }
  flush();
  return chunks;
}

async function sha256Hex(input: string): Promise<string> {
  const buf = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(input),
  );
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .slice(0, 32);
}

async function synthesiseChunk(text: string): Promise<Uint8Array> {
  const res = await fetch('https://ai.gateway.lovable.dev/v1/audio/speech', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: TTS_MODEL,
      input: text,
      voice: TTS_VOICE,
      response_format: 'mp3',
      instructions:
        'Read clearly and warmly at a measured pace, in a British English accent, ' +
        'as a health charity narrating an article for people living with arthritis.',
    }),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    const err = new Error(`TTS ${res.status}: ${detail.slice(0, 300)}`);
    // deno-lint-ignore no-explicit-any
    (err as any).status = res.status;
    throw err;
  }
  return new Uint8Array(await res.arrayBuffer());
}

Deno.serve(async (req) => {
  const requestId = newRequestId();

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: getCorsHeaders(req) });
  }
  if (req.method !== 'POST') {
    return errJson(req, {
      code: 'method_not_allowed',
      message: 'Use POST.',
      requestId,
    });
  }
  if (!LOVABLE_API_KEY || !SUPABASE_URL || !SERVICE_ROLE_KEY) {
    return errJson(req, {
      code: 'service_unavailable',
      message: 'Audio narration is not configured.',
      requestId,
    });
  }

  const parsed = await parseJsonBody(req, requestId);
  if (!parsed.ok) return parsed.response;
  const slug = String(
    (parsed.data as { slug?: unknown } | null)?.slug ?? '',
  ).trim();
  if (!slug || !/^[a-z0-9-]{2,160}$/i.test(slug)) {
    return errJson(req, {
      code: 'validation_failed',
      message: 'A valid article slug is required.',
      requestId,
    });
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

  const { data: article, error: articleError } = await supabase
    .from('blog_articles')
    .select('slug, title, content, excerpt, reviewed_by')
    .eq('slug', slug)
    .eq('is_published', true)
    .maybeSingle();

  if (articleError) {
    return errJson(req, {
      code: 'server_error',
      message: 'Could not load the article.',
      requestId,
    });
  }
  if (!article) {
    return errJson(req, {
      code: 'not_found',
      message: 'Article not found.',
      requestId,
    });
  }

  const narration = buildNarration(article as {
    title: string;
    content: string;
    excerpt?: string | null;
    reviewed_by?: string | null;
  });
  if (narration.replace(/\s+/g, ' ').trim().length < 200) {
    return errJson(req, {
      code: 'not_found',
      message: 'This article is too short to narrate.',
      requestId,
    });
  }

  const contentHash = await sha256Hex(`${TTS_MODEL}|${TTS_VOICE}|${narration}`);
  const objectPath = `${slug}/${contentHash}.mp3`;

  const signAndRespond = async (durationSeconds: number, cached: boolean) => {
    const { data: signed, error: signError } = await supabase.storage
      .from(BUCKET)
      .createSignedUrl(objectPath, SIGNED_URL_TTL_SECONDS);
    if (signError || !signed?.signedUrl) {
      return errJson(req, {
        code: 'server_error',
        message: 'Could not prepare the audio file.',
        requestId,
      });
    }
    return okJson(
      { url: signed.signedUrl, duration: durationSeconds, cached },
      req,
      { requestId },
    );
  };

  // 1. Cache hit?
  const { data: existing } = await supabase
    .from('article_audio')
    .select('audio_path, duration_seconds')
    .eq('slug', slug)
    .eq('content_hash', contentHash)
    .maybeSingle();

  if (existing?.audio_path) {
    return await signAndRespond(existing.duration_seconds ?? 0, true);
  }

  // 2. Generating is the expensive path — rate limit it per IP.
  const limit = await checkRateLimit(supabase, {
    tier: 'public',
    ip: getClientIp(req),
    route: 'article-audio',
  });
  if (!limit.allowed) return rateLimitResponse(limit, getCorsHeaders(req));

  // 3. Synthesise chunk by chunk and concatenate the MP3 frames.
  const chunks = chunkForTts(narration);
  const buffers: Uint8Array[] = [];
  try {
    for (const chunk of chunks) {
      buffers.push(await synthesiseChunk(chunk));
    }
  } catch (err) {
    // deno-lint-ignore no-explicit-any
    const status = (err as any)?.status as number | undefined;
    console.error('[article-audio] synthesis failed', requestId, String(err));
    if (status === 429) {
      return errJson(req, {
        code: 'rate_limited',
        message: 'Audio narration is busy right now. Please try again shortly.',
        requestId,
      });
    }
    if (status === 402 || status === 403) {
      return errJson(req, {
        code: 'service_unavailable',
        message: 'Audio narration is temporarily unavailable.',
        requestId,
      });
    }
    return errJson(req, {
      code: 'server_error',
      message: 'Could not generate the audio for this article.',
      requestId,
    });
  }

  const total = buffers.reduce((n, b) => n + b.length, 0);
  const mp3 = new Uint8Array(total);
  let offset = 0;
  for (const b of buffers) {
    mp3.set(b, offset);
    offset += b.length;
  }

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(objectPath, mp3, { contentType: 'audio/mpeg', upsert: true });
  if (uploadError) {
    console.error('[article-audio] upload failed', requestId, uploadError.message);
    return errJson(req, {
      code: 'server_error',
      message: 'Could not save the generated audio.',
      requestId,
    });
  }

  // ~155 spoken words per minute is a close estimate; the player replaces it
  // with the real duration once metadata loads.
  const words = (narration.match(/\S+/g) ?? []).length;
  const durationSeconds = Math.max(1, Math.round((words / 155) * 60));

  await supabase.from('article_audio').upsert(
    {
      slug,
      content_hash: contentHash,
      audio_path: objectPath,
      duration_seconds: durationSeconds,
    },
    { onConflict: 'slug,content_hash' },
  );

  return await signAndRespond(durationSeconds, false);
});
