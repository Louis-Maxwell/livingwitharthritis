/**
 * Cluster Hub Template
 * Used for all 9 topic cluster hub pages
 * Example: /library/osteoarthritis-hub
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Zap, TrendingUp } from 'lucide-react';
import { useAnalytics } from '../components/AnalyticsTracker';

interface ClusterArticle {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
}

interface ClusterHubProps {
  clusterSlug: string;
  clusterName: string;
  clusterDescription: string;
  pillarArticleSlug: string;
  pillarArticleTitle: string;
  articles: ClusterArticle[];
  statsKeywords: number;
  statsTraffic: string;
  statsSnippets: number;
}

export default function ClusterHub({
  clusterSlug,
  clusterName,
  clusterDescription,
  pillarArticleSlug,
  pillarArticleTitle,
  articles,
}: ClusterHubProps) {
  useAnalytics('library', `${clusterSlug}-hub`);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Breadcrumb */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-3 text-sm">
          <Link to="/library" className="text-blue-600 hover:underline">
            Library
          </Link>
          {' / '}
          <span className="text-gray-600">{clusterName} Hub</span>
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {clusterName}: Complete Resource Hub
          </h1>
          <p className="text-xl text-gray-700 mb-6">{clusterDescription}</p>

          {/* CTA to Pillar Article */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-blue-900 mb-3">Start Here</h2>
            <p className="text-blue-800 mb-4">
              Begin with our comprehensive guide to understand the fundamentals:
            </p>
            <Link
              to={`/blog/${pillarArticleSlug}`}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              data-analytics="true"
              data-page-type="article"
              data-slug={pillarArticleSlug}
            >
              {pillarArticleTitle}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

        </header>

        {/* Cluster Articles Grid */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-blue-600" />
            {articles.length} Essential Guides
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((article) => (
              <div
                key={article.slug}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  <Link
                    to={`/blog/${article.slug}`}
                    className="text-blue-600 hover:underline"
                    data-analytics="true"
                    data-page-type="article"
                    data-slug={article.slug}
                  >
                    {article.title}
                  </Link>
                </h3>

                <p className="text-gray-700 mb-4">{article.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {article.keywords.slice(0, 3).map((keyword) => (
                    <span
                      key={keyword}
                      className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>

                <Link
                  to={`/blog/${article.slug}`}
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
                  data-analytics="true"
                  data-page-type="article"
                  data-slug={article.slug}
                >
                  Read Guide <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Related Topics */}
        <section className="bg-gray-50 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Topics</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Link
              to="/guides/arthritis-pain-relief"
              className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all"
            >
              <p className="font-semibold text-gray-900">Pain Management</p>
              <p className="text-sm text-gray-600">UK pain-relief guide</p>
            </Link>
            <Link
              to="/exercises"
              className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all"
            >
              <p className="font-semibold text-gray-900">Exercise & Movement</p>
              <p className="text-sm text-gray-600">Exercise hub</p>
            </Link>
            <Link
              to="/diet"
              className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all"
            >
              <p className="font-semibold text-gray-900">Diet & Nutrition</p>
              <p className="text-sm text-gray-600">Diet hub</p>
            </Link>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 text-white rounded-lg p-8 text-center mb-12">
          <h2 className="text-2xl font-bold mb-3">Get Expert Guidance</h2>
          <p className="mb-6">
            Don't navigate {clusterName.toLowerCase()} alone. Explore all {articles.length} guides to find what works for
            you.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Save This Hub
          </button>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>

          <div className="space-y-4">
            {[
              {
                q: `What's the best way to start learning about ${clusterName.toLowerCase()}?`,
                a: `Start with our pillar article "${pillarArticleTitle}" to understand the fundamentals, then explore specific guides based on your interests.`,
              },
              {
                q: 'How often is this content updated?',
                a: 'We review and update all content quarterly to reflect the latest research and evidence.',
              },
              {
                q: 'Can I share these guides with others?',
                a: 'Yes! We encourage sharing these resources with friends and family who might benefit from them.',
              },
              {
                q: 'Is this medical advice?',
                a: 'No. This is educational content. Always consult with your healthcare provider before making treatment decisions.',
              },
            ].map((item, i) => (
              <details key={i} className="bg-white rounded-lg border border-gray-200 p-4 cursor-pointer">
                <summary className="font-semibold text-gray-900 hover:text-blue-600">
                  {item.q}
                </summary>
                <p className="text-gray-700 mt-3 pt-3 border-t border-gray-200">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: `${clusterName}: Resource Hub`,
            description: clusterDescription,
            url: `https://livingwitharthritis.org.uk/library/${clusterSlug}-hub`,
            mainEntity: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Library',
                  item: 'https://livingwitharthritis.org.uk/library',
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: `${clusterName} Hub`,
                  item: `https://livingwitharthritis.org.uk/library/${clusterSlug}-hub`,
                },
              ],
            },
          })}
        </script>
      </article>
    </div>
  );
}
