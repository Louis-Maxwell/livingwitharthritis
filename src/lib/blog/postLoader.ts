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
  // Slugs come from the URL: accept only real guide slugs and look them up
  // as own keys, never through the prototype chain.
  if (!slug || !/^[a-z0-9-]+$/.test(slug)) return null;
  const key = `/src/content/blog/posts/${slug}.json`;
  if (!Object.prototype.hasOwnProperty.call(POST_LOADERS, key)) return null;
  const loader = POST_LOADERS[key];
  if (typeof loader !== "function") return null;
  const post = await loader();
  return post && post.is_published ? post : null;
}
