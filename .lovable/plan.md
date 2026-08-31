# Listen to this article — voiceover player on every blog post

Add an audio player under the title/byline of every blog article so visitors can
hear the article read aloud in a natural voice. Audio is generated once per
article and cached, so repeat listens are instant and cost nothing.

## What a visitor sees

A slim bar directly below the author and date:

```text
[ >  ]  Listen to this article
        0:00  ────────────────────────  -8:36        [1x]
```

- Play/pause button, scrub bar, elapsed and remaining time
- Playback speed menu: 1x, 1.25x, 1.5x, 1.75x, 2x
- First press on a brand-new article shows "Preparing audio…" for a few seconds
  while narration is generated; after that it plays immediately for everyone
- If audio can't be generated, the bar hides itself rather than showing an error
- Fully keyboard accessible with labelled controls; styled in the existing
  black/red/white system, no layout or navigation changes elsewhere

## How it works

1. **Narration text**: the article's HTML body is stripped to clean prose
   (headings kept as spoken sentences, tables/figures/CTAs skipped), prefixed
   with the title and a short "Reviewed by" line.
2. **Cached audio**: a private-read/public-read storage bucket `article-audio`
   holds one MP3 per article, keyed by slug plus a hash of the narration text.
   A new hash on content change means new audio is generated automatically.
3. **Generation**: an edge function `article-audio` checks the cache first; on a
   miss it synthesises the narration via the Lovable AI text-to-speech endpoint
   (`openai/gpt-4o-mini-tts`, voice `alloy`, mp3), chunking long articles at
   sentence boundaries and concatenating, then uploads the MP3 and returns its
   URL plus duration.
4. **Playback**: the player fetches the URL once and plays a normal `<audio>`
   element — no streaming complexity, scrubbing and speed work natively.

## Technical notes

- New table `article_audio` (slug, content_hash, audio_path, duration_seconds,
  created_at) with RLS: public `SELECT`, writes only from the edge function via
  service role. Grants issued for `anon`, `authenticated`, `service_role`.
- New storage bucket `article-audio`, public read.
- New edge function `supabase/functions/article-audio/index.ts` — public
  (verify_jwt false), rate-limited per IP, returns `{ url, duration }`.
- New component `src/components/article/ArticleVoiceover.tsx` plus a
  `src/lib/articleNarration.ts` helper for HTML-to-speech-text extraction.
- Mounted in `src/pages/BlogPost.tsx` immediately after the byline block; no
  other page is touched.
- Player is client-only and lazy — it does not affect prerendered HTML, SEO
  metadata, canonicals, or the sitemap.
- Optional follow-up (not in this pass): `audio` property in the article
  JSON-LD once URLs are stable.

## Cost note

Generation is charged once per article version. About 60 published articles at
roughly 1,500 words each is a modest one-off; every later listen is free.
