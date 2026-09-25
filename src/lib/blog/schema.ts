/**
 * Single typed contract for every blog guide.
 *
 * Source of truth: one JSON file per guide in `src/content/blog/posts/<slug>.json`.
 * `scripts/generate-blog-catalog.ts` validates every file against
 * `blogPostSchema` and writes the metadata-only index
 * (`src/content/blog/catalog.generated.json`) that listing pages import.
 *
 * Runtime code only imports the *types* from here (zod stays out of the
 * browser bundle); the generator and Vitest use the schemas.
 */
import { z } from "zod";

export const BLOG_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
/** Full ISO timestamp or plain date. */
const ISO_DATETIME_PATTERN = /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:Z|[+-]\d{2}:?\d{2})?)?$/;

const nonEmpty = (label: string) => z.string().trim().min(1, `${label} is required`);
const nullableText = z.string().nullable();

export const blogCitationSchema = z.object({
  label: nonEmpty("citation label"),
  url: z.string().regex(/^https?:\/\//i, "citation url must be absolute http(s)"),
  publisher: z.string().optional(),
});

export const blogPostSchema = z
  .object({
    slug: z.string().regex(BLOG_SLUG_PATTERN, "slug must be lowercase kebab-case"),
    title: nonEmpty("title"),
    meta_title: nullableText,
    /** SEO description. Falls back to `excerpt` when null. */
    meta_description: nullableText,
    excerpt: nonEmpty("excerpt"),
    direct_answer: nullableText,
    /** Publish date, YYYY-MM-DD. */
    date: z.string().regex(ISO_DATE_PATTERN, "date must be YYYY-MM-DD"),
    updated_at: z.string().regex(ISO_DATETIME_PATTERN, "updated_at must be ISO 8601"),
    /** Explicit clinical-review date. When absent, `updated_at` is used. */
    last_reviewed: z.string().regex(ISO_DATE_PATTERN, "last_reviewed must be YYYY-MM-DD").optional(),
    category: nonEmpty("category"),
    /** Unique cover file under public/openverse/ (1:1 per slug). */
    cover: z.string().regex(/^[\w.-]+\.(?:webp|jpe?g|png|avif)$/i, "cover must be a file name in public/openverse/"),
    author: nullableText,
    author_credentials: nullableText,
    reviewed_by: nullableText,
    reviewer_credentials: nullableText,
    keywords: nullableText,
    display_order: z.number().int(),
    is_published: z.boolean(),
    citations: z.array(blogCitationSchema).optional(),
    /** Article body — HTML (preferred) or Markdown. */
    content: z.string().trim().min(200, "content must be a real article body"),
  })
  .strict();

export type BlogCitation = z.infer<typeof blogCitationSchema>;
export type BlogPost = z.infer<typeof blogPostSchema>;

/** Fields copied verbatim from a post into the listing index. */
export const BLOG_META_FIELDS = [
  "slug",
  "title",
  "meta_title",
  "excerpt",
  "date",
  "updated_at",
  "category",
  "cover",
  "author",
  "keywords",
  "display_order",
] as const;

export const blogMetaSchema = blogPostSchema
  .pick(Object.fromEntries(BLOG_META_FIELDS.map((k) => [k, true])) as { [K in (typeof BLOG_META_FIELDS)[number]]: true })
  .extend({
    /** last_reviewed ?? updated_at (date part). Always present. */
    last_reviewed: z.string().regex(ISO_DATE_PATTERN),
    /** `/openverse/<cover>` — derived, kept for older callers. */
    image_url: z.string().startsWith("/openverse/"),
    word_count: z.number().int().positive(),
    reading_minutes: z.number().int().positive(),
  })
  .strict();

/** Metadata-only listing row (no body). */
export type BlogMeta = z.infer<typeof blogMetaSchema>;
