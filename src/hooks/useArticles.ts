import { useState, useEffect, useCallback } from 'react';

interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  thumbnail?: string;
  readTime: number;
  date: string;
  category: string;
  keyword?: string;
  content: string;
  author: string;
  reviewed_by?: string;
}

interface PetArticle extends Article {
  petType: 'dog' | 'cat' | 'equine' | 'rabbit' | 'other';
  petCondition: string;
}

interface UseArticlesReturn {
  articles: Article[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

interface UsePetArticlesReturn {
  articles: PetArticle[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Hook to fetch human-focused arthritis articles
 * @param filters - Optional filters (category, keyword, etc.)
 * @param limit - Maximum number of articles to fetch
 */
export const useArticles = (
  filters?: {
    category?: string;
    keyword?: string;
    author?: string;
  },
  limit?: number
): UseArticlesReturn => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchArticles = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Build query parameters
      const params = new URLSearchParams();
      if (filters?.category) params.append('category', filters.category);
      if (filters?.keyword) params.append('keyword', filters.keyword);
      if (filters?.author) params.append('author', filters.author);
      if (limit) params.append('limit', limit.toString());

      const response = await fetch(`/api/articles?${params.toString()}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch articles: ${response.statusText}`);
      }

      const data = await response.json();
      setArticles(data.articles || []);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      console.error('Error fetching articles:', err);
    } finally {
      setIsLoading(false);
    }
  }, [filters, limit]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  return { articles, isLoading, error, refetch: fetchArticles };
};

/**
 * Hook to fetch pet-focused arthritis articles
 * @param petType - Filter by pet type (dog, cat, equine, rabbit, other)
 * @param filters - Additional filters (category, condition, etc.)
 * @param limit - Maximum number of articles to fetch
 */
export const usePetArticles = (
  petType?: 'dog' | 'cat' | 'equine' | 'rabbit' | 'other' | 'all',
  filters?: {
    category?: string;
    condition?: string;
    author?: string;
  },
  limit?: number
): UsePetArticlesReturn => {
  const [articles, setArticles] = useState<PetArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPetArticles = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Build query parameters
      const params = new URLSearchParams();
      if (petType && petType !== 'all') {
        params.append('petType', petType);
      }
      if (filters?.category) params.append('category', filters.category);
      if (filters?.condition) params.append('condition', filters.condition);
      if (filters?.author) params.append('author', filters.author);
      if (limit) params.append('limit', limit.toString());

      const response = await fetch(`/api/pet-articles?${params.toString()}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch pet articles: ${response.statusText}`);
      }

      const data = await response.json();
      setArticles(data.articles || []);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      console.error('Error fetching pet articles:', err);
    } finally {
      setIsLoading(false);
    }
  }, [petType, filters, limit]);

  useEffect(() => {
    fetchPetArticles();
  }, [fetchPetArticles]);

  return {
    articles,
    isLoading,
    error,
    refetch: fetchPetArticles,
  };
};

/**
 * Hook to fetch a single article by slug
 * @param slug - Article slug
 * @param isPet - Whether this is a pet article
 */
export const useArticleBySlug = (slug: string, isPet = false) => {
  const [article, setArticle] = useState<Article | PetArticle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setIsLoading(true);
        const endpoint = isPet ? `/api/pet-articles/${slug}` : `/api/articles/${slug}`;
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error(`Article not found: ${response.statusText}`);
        }

        const data = await response.json();
        setArticle(data.article);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchArticle();
    }
  }, [slug, isPet]);

  return { article, isLoading, error };
};

/**
 * Hook for client-side search across articles
 */
export const useArticleSearch = (query: string, articles: Article[]) => {
  const [results, setResults] = useState<Article[]>(articles);

  useEffect(() => {
    if (!query.trim()) {
      setResults(articles);
      return;
    }

    const lowercaseQuery = query.toLowerCase();
    const filtered = articles.filter(
      (article) =>
        article.title.toLowerCase().includes(lowercaseQuery) ||
        article.excerpt.toLowerCase().includes(lowercaseQuery) ||
        article.keyword?.toLowerCase().includes(lowercaseQuery)
    );

    setResults(filtered);
  }, [query, articles]);

  return results;
};
