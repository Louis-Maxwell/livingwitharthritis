/**
 * Lazy loader for one full guide, kept apart from the listing catalog so the
 * article page does not download metadata for every guide just to show one.
 */
import type { BlogPost } from "./schema";

const POST_LOADERS = import.meta.glob<BlogPost>("/src/content/blog/posts/*.json", {
  import: "default",
});

/** Lazy-load one published guide (body, citations, credentials). */
export async function loadBlogPost(slug: string | undefined | null): Promise<BlogPost | null> {
  if (!slug) return null;
  const loader = POST_LOADERS[`/src/content/blog/posts/${slug}.json`];
  if (!loader) return null;
  const post = await loader();
  return post && post.is_published ? post : null;
}
