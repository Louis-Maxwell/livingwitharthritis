export interface RelatedPost {
  slug: string;
  title?: string;
  keywords?: string | null;
  category?: string;
}
export function relatedBlogPosts<T extends RelatedPost>(current: RelatedPost | null | undefined, catalog: T[], limit?: number): T[];
