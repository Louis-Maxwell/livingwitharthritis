import type { BlogMeta, BlogPost } from "../../src/lib/blog/schema";
export declare const BLOG_POSTS_DIR: string;
export declare const BLOG_CATALOG_PATH: string;
export declare const WORDS_PER_MINUTE: number;
export declare function readAllBlogPosts(root?: string): BlogPost[];
export declare function readPublishedBlogPosts(root?: string): BlogPost[];
export declare function countWords(body: string | null | undefined): number;
export declare function readingMinutes(words: number): number;
export declare function compareBlogOrder(
  a: { display_order?: number; date?: string; slug: string },
  b: { display_order?: number; date?: string; slug: string },
): number;
export declare function readBlogCatalog(root?: string): BlogMeta[];
