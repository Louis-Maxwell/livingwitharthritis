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
 * Articles are static (blogList / frailty-batch / phase2). The old /api/articles
 * Worker is not deployed on GitHub-only static hosting — do not call it.
 */
export const useArticles = (
  _filters?: {
    category?: string;
    keyword?: string;
    author?: string;
  },
  _limit?: number
): UseArticlesReturn => {
  const [articles] = useState<Article[]>([]);
  const [isLoading] = useState(false);
  const [error] = useState<Error | null>(null);
  const refetch = useCallback(async () => {}, []);
  return { articles, isLoading, error, refetch };
};

export const usePetArticles = (
  _filters?: {
    petType?: string;
    condition?: string;
  },
  _limit?: number
): UsePetArticlesReturn => {
  const [articles] = useState<PetArticle[]>([]);
  const [isLoading] = useState(false);
  const [error] = useState<Error | null>(null);
  const refetch = useCallback(async () => {}, []);
  return { articles, isLoading, error, refetch };
};

export const useArticle = (_slug: string, _isPet = false) => {
  const [article] = useState<Article | PetArticle | null>(null);
  const [isLoading] = useState(false);
  const [error] = useState<Error | null>(null);
  const refetch = useCallback(async () => {}, []);
  return { article, isLoading, error, refetch };
};
