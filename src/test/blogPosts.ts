/// <reference types="node" />
/**
 * Test helper: every guide from the single source of truth
 * (src/content/blog/posts/<slug>.json), read synchronously from disk.
 */
import { readAllBlogPosts } from "../../scripts/lib/blog-posts.mjs";
import type { BlogPost } from "@/lib/blog/schema";

export const ALL_BLOG_POSTS: BlogPost[] = readAllBlogPosts();
export const PUBLISHED_BLOG_POSTS: BlogPost[] = ALL_BLOG_POSTS.filter((p) => p.is_published);
export const BLOG_POSTS_BY_SLUG = new Map(ALL_BLOG_POSTS.map((p) => [p.slug, p]));
