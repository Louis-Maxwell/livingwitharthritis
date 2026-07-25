import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';

interface ArticleCardProps {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  thumbnail?: string;
  readTime: number;
  date: string;
  category: string;
  isPet?: boolean;
  petType?: 'dog' | 'cat' | 'equine' | 'rabbit' | 'other';
}

const PET_TYPE_COLORS: Record<string, string> = {
  dog: 'bg-amber-100 text-amber-800',
  cat: 'bg-orange-100 text-orange-800',
  equine: 'bg-rose-100 text-rose-800',
  rabbit: 'bg-pink-100 text-pink-800',
  other: 'bg-gray-100 text-gray-800',
};

const CATEGORY_COLORS: Record<string, string> = {
  exercise: 'bg-blue-100 text-blue-800',
  nutrition: 'bg-green-100 text-green-800',
  benefits: 'bg-purple-100 text-purple-800',
  support: 'bg-indigo-100 text-indigo-800',
  healthcare: 'bg-teal-100 text-teal-800',
  conditions: 'bg-red-100 text-red-800',
};

export const ArticleCard: React.FC<ArticleCardProps> = ({
  id,
  slug,
  title,
  excerpt,
  thumbnail,
  readTime,
  date,
  category,
  isPet = false,
  petType,
}) => {
  const baseUrl = isPet ? '/pets' : '/learn';
  const href = `${baseUrl}/${slug}`;
  const categoryColor = CATEGORY_COLORS[category] || 'bg-gray-100 text-gray-800';
  const petColor = petType ? PET_TYPE_COLORS[petType] : '';

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <Link to={href}>
      <article className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
        {/* Thumbnail */}
        {thumbnail ? (
          <div className="relative h-48 w-full overflow-hidden bg-gray-200">
            <img
              src={thumbnail}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        ) : (
          <div className="h-48 w-full bg-gradient-to-br from-red-100 to-red-50 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">{isPet ? '🐾' : '❤️'}</div>
              <p className="text-sm text-red-700 font-medium">Article</p>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-4 flex flex-col h-[240px]">
          {/* Tags row */}
          <div className="flex flex-wrap gap-2 mb-3">
            <span
              className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-colors ${categoryColor}`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </span>
            {petType && (
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-colors ${petColor}`}
              >
                {petType.charAt(0).toUpperCase() + petType.slice(1)}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-bold text-lg leading-snug text-gray-900 mb-2 line-clamp-2 group-hover:text-red-700 transition-colors">
            {title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-gray-600 line-clamp-2 mb-auto">
            {excerpt}
          </p>

          {/* Footer: Meta + CTA */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-3">
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>{readTime} min</span>
              </div>
              <span>•</span>
              <time>{formatDate(date)}</time>
            </div>
            <ArrowRight
              size={16}
              className="text-red-600 transition-transform group-hover:translate-x-1"
            />
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ArticleCard;
