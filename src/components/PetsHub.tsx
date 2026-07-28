import React, { useState, useMemo } from 'react';
import ArticleCard from '@/components/ArticleCard';
import PetTypeTag from '@/components/PetTypeTag';
import { Search, Filter } from 'lucide-react';

interface PetArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  thumbnail?: string;
  readTime: number;
  date: string;
  category: string;
  petType: 'dog' | 'cat' | 'equine' | 'rabbit' | 'other';
  petCondition: string;
}

const PET_TYPES = [
  { value: 'all', label: 'All Pets' },
  { value: 'dog', label: 'Dogs' },
  { value: 'cat', label: 'Cats' },
  { value: 'equine', label: 'Horses & Equines' },
  { value: 'rabbit', label: 'Rabbits' },
];

const CATEGORIES = [
  { value: 'all', label: 'All Topics' },
  { value: 'exercise', label: 'Exercise & Movement' },
  { value: 'nutrition', label: 'Nutrition & Diet' },
  { value: 'healthcare', label: 'Healthcare & Treatment' },
  { value: 'support', label: 'Owner Support' },
];

interface PetsHubProps {
  articles: PetArticle[];
  isLoading?: boolean;
}

export const PetsHub: React.FC<PetsHubProps> = ({ articles, isLoading = false }) => {
  const [selectedPetType, setSelectedPetType] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter and search logic
  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesPetType =
        selectedPetType === 'all' || article.petType === selectedPetType;
      const matchesCategory =
        selectedCategory === 'all' || article.category === selectedCategory;
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesPetType && matchesCategory && matchesSearch;
    });
  }, [articles, selectedPetType, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-white px-4 py-16 md:py-24">
        {/* Decorative paw prints */}
        <div className="absolute top-10 right-10 text-red-300/20 text-6xl">🐾</div>
        <div className="absolute bottom-10 left-10 text-red-300/20 text-6xl">🐾</div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block mb-4 px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">
            <span className="text-sm font-semibold">NEW: Pet Arthritis Hub</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Supporting Our Furry & Feathered Friends
          </h1>
          <p className="text-lg text-red-100 max-w-2xl mx-auto mb-8">
            Discover evidence-based information on arthritis care, exercise, nutrition,
            and comfort strategies for dogs, cats, horses, and other beloved pets.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {PET_TYPES.slice(1).map((pet) => (
              <div key={pet.value} className="text-center">
                <div className="text-3xl mb-1">
                  {pet.value === 'dog' && '🐕'}
                  {pet.value === 'cat' && '🐱'}
                  {pet.value === 'equine' && '🐴'}
                  {pet.value === 'rabbit' && '🐰'}
                </div>
                <p className="text-xs text-red-100">{pet.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 text-muted-foreground" size={20} />
            <input
              type="text"
              placeholder="Search pet health articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Pet Type Filters */}
          <div>
            <h3 className="font-semibold text-black mb-3 flex items-center gap-2">
              <Filter size={18} className="text-red-600" />
              Pet Type
            </h3>
            <div className="flex flex-wrap gap-2">
              {PET_TYPES.map((pet) => (
                <button
                  key={pet.value}
                  onClick={() => setSelectedPetType(pet.value)}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    selectedPetType === pet.value
                      ? 'bg-red-600 text-white shadow-md'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  {pet.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filters */}
          <div>
            <h3 className="font-semibold text-black mb-3 flex items-center gap-2">
              <Filter size={18} className="text-red-600" />
              Topic
            </h3>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === cat.value
                      ? 'bg-red-600 text-white shadow-md'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="mt-8 text-sm text-gray-600">
          Showing <span className="font-semibold text-black">{filteredArticles.length}</span> of{' '}
          <span className="font-semibold text-black">{articles.length}</span> articles
        </div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-96 bg-gray-200 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <ArticleCard
                key={article.id}
                {...article}
                isPet={true}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-black mb-2">
              No articles found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters or search query
            </p>
            <button
              onClick={() => {
                setSelectedPetType('all');
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-red-50 border-t border-red-200 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-black mb-4">
            Can't find what you're looking for?
          </h2>
          <p className="text-gray-700 mb-6">
            Our pet health community is growing. Suggest a topic for future articles.
          </p>
          <button className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors">
            Suggest a Topic
          </button>
        </div>
      </section>
    </div>
  );
};

export default PetsHub;
