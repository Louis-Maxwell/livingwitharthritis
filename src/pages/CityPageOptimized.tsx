/**
 * Optimized City Support Page with Local SEO
 * Example: /arthritis-support/london
 *
 * Local SEO Optimizations:
 * - City name in title & meta description
 * - LocalBusiness schema markup
 * - Local services section
 * - City-specific content
 * - Internal linking to nearby cities
 * - Click tracking for analytics
 */

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, Users, Heart } from 'lucide-react';
import { useAnalytics } from '../components/AnalyticsTracker';

interface CityPageProps {
  citySlug: string;
  cityName: string;
  region: string;
  population: string;
  coordinates: { lat: number; lng: number };
}

export default function CityPageOptimized({
  citySlug,
  cityName,
  region,
  population,
  coordinates,
}: CityPageProps) {
  useAnalytics('city', citySlug);

  useEffect(() => {
    // Update page title with city name for SEO
    document.title = `Arthritis Support in ${cityName} | Living With Arthritis UK`;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        `Find arthritis support, services, and resources in ${cityName}. NHS-approved guidance, local support groups, and exercise classes for ${cityName} residents.`
      );
    }
  }, [cityName]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Breadcrumb Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-3 text-sm">
          <Link to="/arthritis-support" className="text-blue-600 hover:underline">
            Arthritis Support
          </Link>
          {' / '}
          <Link to={`/arthritis-support/${region.toLowerCase()}`} className="text-blue-600 hover:underline">
            {region}
          </Link>
          {' / '}
          <span className="text-gray-600">{cityName}</span>
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section with Local SEO */}
        <header className="mb-12">
          {/* H1 with city name (critical for local SEO) */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Arthritis Support in {cityName}
          </h1>

          {/* Subheading with location info */}
          <p className="text-xl text-gray-700 mb-6">
            Comprehensive arthritis resources, support services, and expert guidance for residents of {cityName}, {region}.
          </p>

          {/* City Info Card */}
          <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-6 mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-600 font-semibold">City</p>
                <p className="text-gray-900 font-bold">{cityName}</p>
              </div>
              <div>
                <p className="text-gray-600 font-semibold">Region</p>
                <p className="text-gray-900 font-bold">{region}</p>
              </div>
              <div>
                <p className="text-gray-600 font-semibold">Population</p>
                <p className="text-gray-900 font-bold">{population}</p>
              </div>
              <div>
                <p className="text-gray-600 font-semibold">Coordinates</p>
                <p className="text-gray-900 font-bold">{coordinates.lat.toFixed(2)}, {coordinates.lng.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Local Services Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <MapPin className="h-8 w-8 text-blue-600" />
            Arthritis Services in {cityName}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* NHS Services */}
            <div className="bg-white rounded-lg border-2 border-green-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Heart className="h-5 w-5 text-green-600" />
                NHS Services
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Rheumatology clinics at local NHS hospitals</li>
                <li>• GP-led arthritis management programs</li>
                <li>• Physiotherapy on the NHS</li>
                <li>• Joint injection clinics</li>
              </ul>
              <p className="mt-4 text-sm text-gray-600">
                <strong>Contact:</strong> Your GP surgery or{' '}
                <a href="https://www.nhs.uk" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  NHS.uk
                </a>
              </p>
            </div>

            {/* Support Groups */}
            <div className="bg-white rounded-lg border-2 border-purple-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-600" />
                Support Groups in {cityName}
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Local arthritis support groups</li>
                <li>• Exercise classes (aqua, yoga, tai chi)</li>
                <li>• Peer support meetings</li>
                <li>• Online communities</li>
              </ul>
              <p className="mt-4 text-sm text-gray-600">
                <strong>Find local:</strong>{' '}
                <a
                  href="https://www.arthritisresearch.org.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Arthritis Research UK
                </a>
              </p>
            </div>

            {/* Private Services */}
            <div className="bg-white rounded-lg border-2 border-amber-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-600" />
                Private Services
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Private rheumatologists</li>
                <li>• Osteopaths & chiropractors</li>
                <li>• Private physiotherapy clinics</li>
                <li>• Pain management centers</li>
              </ul>
              <p className="mt-4 text-sm text-gray-600">
                <strong>Search:</strong> Google Maps "{cityName} rheumatologist" or "physiotherapy"
              </p>
            </div>

            {/* Community Resources */}
            <div className="bg-white rounded-lg border-2 border-blue-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Heart className="h-5 w-5 text-blue-600" />
                Local Resources
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Libraries with health information</li>
                <li>• Leisure centers with accessible activities</li>
                <li>• Community health centers</li>
                <li>• Workplace support services</li>
              </ul>
              <p className="mt-4 text-sm text-gray-600">
                <strong>Contact:</strong> Your local council or community center
              </p>
            </div>
          </div>
        </section>

        {/* Nearby Cities (Internal Linking) */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Arthritis Support in Nearby Areas</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Example nearby cities - would be dynamic */}
            {[
              { name: 'Manchester', slug: 'manchester' },
              { name: 'Birmingham', slug: 'birmingham' },
              { name: 'Leeds', slug: 'leeds' },
              { name: 'Bristol', slug: 'bristol' },
              { name: 'Sheffield', slug: 'sheffield' },
              { name: 'Edinburgh', slug: 'edinburgh' },
              { name: 'Cardiff', slug: 'cardiff' },
              { name: 'Belfast', slug: 'belfast' },
            ].map((city) => (
              <Link
                key={city.slug}
                to={`/arthritis-support/${city.slug}`}
                className="p-3 bg-white rounded-lg border border-gray-300 hover:border-blue-400 hover:shadow-md transition-all text-center"
                data-analytics="true"
                data-page-type="city"
                data-slug={city.slug}
              >
                <p className="font-semibold text-gray-900">{city.name}</p>
                <p className="text-xs text-gray-600">Support & resources</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Hub Pages - Link to Cluster Resources */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Comprehensive Guides & Resources</h2>
          <p className="text-gray-700 mb-6">
            Explore detailed guides on managing arthritis, regardless of where you live. These resources apply to everyone in the UK:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Pain Management', slug: 'pain-management-hub' },
              { name: 'Exercise & Movement', slug: 'exercise-hub' },
              { name: 'Diet & Nutrition', slug: 'nutrition-hub' },
              { name: 'Treatment Options', slug: 'treatments-hub' },
              { name: 'Mental Wellbeing', slug: 'mental-health-hub' },
              { name: 'Living Well', slug: 'living-well-hub' },
            ].map((hub) => (
              <Link
                key={hub.slug}
                to={`/library/${hub.slug}`}
                className="p-6 bg-blue-50 rounded-lg border-2 border-blue-200 hover:border-blue-400 hover:shadow-md transition-all"
                data-analytics="true"
                data-page-type="library"
                data-slug={hub.slug}
              >
                <h3 className="font-semibold text-gray-900 mb-2">{hub.name}</h3>
                <p className="text-sm text-gray-600">Read guides & expert advice →</p>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: `How do I find rheumatology services in ${cityName}?`,
                a: `Contact your GP to be referred to the nearest NHS rheumatology clinic. Private rheumatologists are also available in ${cityName} and surrounding areas.`,
              },
              {
                q: `Are there arthritis support groups in ${cityName}?`,
                a: `Yes. Check Arthritis Research UK's website, your GP surgery, or local community centers for support groups, exercise classes, and peer support meetings.`,
              },
              {
                q: `Can I access physiotherapy on the NHS in ${cityName}?`,
                a: `Yes, your GP can refer you to NHS physiotherapy services. Waiting times vary, and private options are also available.`,
              },
              {
                q: `What should I do if I'm experiencing a flare?`,
                a: `Contact your GP or rheumatology team immediately. For severe symptoms, visit your local A&E. In the meantime, rest the affected joints and use heat/ice therapy.`,
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

        {/* Local SEO Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: `Arthritis Support in ${cityName}`,
            description: `Comprehensive arthritis support, services, and resources for ${cityName} residents`,
            areaServed: {
              '@type': 'City',
              name: cityName,
              containedIn: {
                '@type': 'State',
                name: region,
              },
            },
            url: `https://livingwitharthritis.org.uk/arthritis-support/${citySlug}`,
            image: 'https://livingwitharthritis.org.uk/og-image.png',
            address: {
              '@type': 'PostalAddress',
              addressLocality: cityName,
              addressRegion: region,
              addressCountry: 'GB',
            },
            sameAs: [
              'https://www.facebook.com/livingwitharthritis',
              'https://twitter.com/livingwarthritis',
            ],
          })}
        </script>

        {/* Breadcrumb Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Arthritis Support',
                item: 'https://livingwitharthritis.org.uk/arthritis-support',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: region,
                item: `https://livingwitharthritis.org.uk/arthritis-support/${region.toLowerCase()}`,
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: cityName,
                item: `https://livingwitharthritis.org.uk/arthritis-support/${citySlug}`,
              },
            ],
          })}
        </script>
      </article>
    </div>
  );
}
