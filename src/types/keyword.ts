export interface KeywordCluster {
  cluster: string;
  keywords: string[];
  pillar_article: string;
  target_articles: number;
}

export interface KeywordCategory {
  id: string;
  name: string;
  keywords: number;
  clusters: KeywordCluster[];
}

export interface KeywordTaxonomy {
  categories: KeywordCategory[];
  total_keywords: number;
  last_updated: string;
}

export interface ArticleKeywordMap {
  slug: string;
  title: string;
  type: "pillar" | "cluster";
  word_count_target: [number, number];
  primary_keyword: string;
  secondary_keywords: string[];
  internal_links: string[]; // slugs
  category_id: string;
  cluster: string;
}

export interface KeywordContentMap {
  pillars: ArticleKeywordMap[];
  clusters: ArticleKeywordMap[];
  generated_at: string;
}
