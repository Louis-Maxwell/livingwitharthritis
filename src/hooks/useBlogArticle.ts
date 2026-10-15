import { useQuery } from "@tanstack/react-query";
import { readEmbeddedBlogArticle } from "@/lib/embeddedBlogArticle";
import { loadBlogPost } from "@/lib/blog/postLoader";
import type { BlogPost } from "@/lib/blog/schema";

/** Single article by slug — body is lazy-loaded from its own chunk. */
export function useBlogArticle(slug: string | undefined) {
  const initialData =
    typeof document === "undefined" ? null : readEmbeddedBlogArticle<BlogPost>(document, slug);
  return useQuery({
    queryKey: ["blog_article", slug],
    queryFn: async () => (slug ? loadBlogPost(slug) : null),
    enabled: !!slug,
    // The embedded copy is built from the same guide file as the lazy chunk,
    // so it never needs refetching during the session.
    ...(initialData ? { initialData, initialDataUpdatedAt: Date.now(), staleTime: Infinity } : {}),
  });
}
