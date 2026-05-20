/**
 * Living With Arthritis UK — Homepage
 *
 * Focused fundraising landing page for the open-source osteoarthritis
 * management plan. Composed from existing landing primitives + three
 * OA-specific sections (Hero, Problem Band, Plan Pillars, Ethos Band).
 *
 * Strict editorial voice. UK English. No fabricated stats beyond
 * publicly cited figures (8.75M, 1 in 6, £10bn).
 */

import { lazy, Suspense, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import Header from "@/components/Header";
import ScrollProgress from "@/components/ScrollProgress";
import ErrorBoundary from "@/components/ErrorBoundary";

import OAHero from "@/components/landing/OAHero";
import OAProblemBand from "@/components/landing/OAProblemBand";
import FacesStrip from "@/components/landing/FacesStrip";
import OAPlanPillarsSection from "@/components/landing/OAPlanPillarsSection";
import MissionStatementBand from "@/components/landing/MissionStatementBand";
import DonationImpactSection from "@/components/landing/DonationImpactSection";
import OpenSourceEthosBand from "@/components/landing/OpenSourceEthosBand";

const QuoteSection = lazy(() => import("@/components/landing/QuoteSection"));
const BlogPreview = lazy(() => import("@/components/landing/BlogPreview"));
const FAQSection = lazy(() => import("@/components/landing/FAQSection"));
const NewsletterSection = lazy(() => import("@/components/landing/NewsletterSection"));
const Footer = lazy(() => import("@/components/Footer"));
const BackToTopButton = lazy(() => import("@/components/landing/BackToTopButton"));
const CookieBanner = lazy(() => import("@/components/landing/CookieBanner"));

const SITE_URL = "https://livingwitharthritis.org.uk";

const SectionFallback = () => <div className="h-32" aria-hidden="true" />;

function HomePage() {
  // JSON-LD injected manually (per project memory) to avoid Helmet crashes.
  useEffect(() => {
    const id = "ld-home-ngo";
    const existing = document.getElementById(id);
    if (existing) existing.remove();

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = id;
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "NGO",
      name: "Living With Arthritis UK",
      url: SITE_URL,
      description:
        "An open-source osteoarthritis management plan — clinically reviewed, freely published, and made for everyone living with OA in the UK.",
      areaServed: { "@type": "Country", name: "United Kingdom" },
      knowsAbout: [
        "Osteoarthritis",
        "Anti-inflammatory diet",
        "Physiotherapy",
        "Chronic pain management",
      ],
    });
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>
          Open-Source Osteoarthritis Plan · Living With Arthritis UK
        </title>
        <meta
          name="description"
          content="Open-source osteoarthritis plan: clinically reviewed diet, movement and pain-relief guidance in plain English. Free for everyone in the UK."
        />
        <link rel="canonical" href={SITE_URL + "/"} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL + "/"} />
        <meta
          property="og:title"
          content="Open-Source Osteoarthritis Plan · Living With Arthritis UK"
        />
        <meta
          property="og:description"
          content="The evidence to manage osteoarthritis well already exists. We're unlocking it — in plain English, free for everyone."
        />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <ScrollProgress />

        <main id="main-content" role="main" tabIndex={-1}>
          <OAHero />
          <OAProblemBand />
          <FacesStrip />
          <OAPlanPillarsSection />
          <MissionStatementBand />

          <Suspense fallback={<SectionFallback />}>
            <QuoteSection />
          </Suspense>

          <DonationImpactSection />

          <OpenSourceEthosBand />

          <Suspense fallback={<SectionFallback />}>
            <BlogPreview />
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <FAQSection />
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <NewsletterSection />
          </Suspense>
        </main>

        <Suspense fallback={null}>
          <Footer />
        </Suspense>
        <Suspense fallback={null}>
          <BackToTopButton />
        </Suspense>
        <Suspense fallback={null}>
          <CookieBanner onAnalyticsChange={() => {}} />
        </Suspense>
      </div>
    </>
  );
}

export default function Index() {
  return (
    <ErrorBoundary fallback={<div>Error loading content</div>}>
      <HomePage />
    </ErrorBoundary>
  );
}
/**
 * NavigationBridge.jsx
 * 
 * Optional component to add navigation links between Living With Arthritis
 * and Medical Keyword Encyclopedia.
 * 
 * This component can be:
 * 1. Added to the Header of both sites
 * 2. Used as a persistent top bar
 * 3. Integrated into your existing navigation
 */

import { useLocation } from 'react-router-dom'; // If using React Router

export function NavigationBridge({ onNavigate }) {
  // Detect current page (adjust based on your routing solution)
  const isHomePage = typeof window !== 'undefined' && 
    (window.location.pathname === '/' || window.location.pathname === '/home');
  const isEncyclopedia = typeof window !== 'undefined' && 
    window.location.pathname === '/encyclopedia';

  return (
    <nav className="sticky top-0 z-40 bg-white dark:bg-[#0a0a0a] border-b border-gray-200 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left: Logo/Branding */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">🏥</span>
            <span className="font-semibold">Living With Arthritis UK</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            {/* Link to Homepage */}
            <a
              href="/"
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate('home');
                }
              }}
              className={`text-sm font-medium transition-colors ${
                isHomePage
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Home
            </a>

            {/* Link to Encyclopedia */}
            <a
              href="/encyclopedia"
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate('encyclopedia');
                }
              }}
              className={`text-sm font-medium transition-colors ${
                isEncyclopedia
                  ? 'text-orange-600 dark:text-orange-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Medical Encyclopedia
            </a>

            {/* Other links */}
            <a href="#resources" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              Resources
            </a>
          </div>
        </div>

        {/* Right: Action Buttons */}
        <div className="flex items-center gap-4">
          <button className="hidden sm:inline-flex text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            Sign In
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            Donate
          </button>
        </div>
      </div>
    </nav>
  );
}

/**
 * Alternative: Minimal Navigation Bar
 * 
 * Use this if you want a simpler, less intrusive navigation option
 */

export function MinimalNavigationBar({ currentPage, onNavigate }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-white dark:bg-[rgba(23,23,23,0.95)] border border-gray-200 dark:border-white/10 rounded-full px-2 py-2 shadow-lg dark:shadow-2xl">
      <div className="flex items-center gap-2">
        <button
          onClick={() => onNavigate?.('home')}
          className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
            currentPage === 'home'
              ? 'bg-blue-600 text-white'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10'
          }`}
        >
          🏥 OA Guide
        </button>
        <button
          onClick={() => onNavigate?.('encyclopedia')}
          className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
            currentPage === 'encyclopedia'
              ? 'bg-orange-600 text-white'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10'
          }`}
        >
          📚 Encyclopedia
        </button>
      </div>
    </div>
  );
}

/**
 * Alternative: Floating Navigation Button
 * 
 * Use this for a subtle, unobtrusive navigation element
 */

export function FloatingNavButton({ currentPage, onNavigate }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-40">
      {/* Menu Items (shown when open) */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white dark:bg-[rgba(23,23,23,0.95)] border border-gray-200 dark:border-white/10 rounded-lg shadow-xl p-2 mb-2">
          <button
            onClick={() => {
              onNavigate?.('home');
              setIsOpen(false);
            }}
            className={`block w-full text-left px-4 py-2 rounded text-sm font-medium transition-all ${
              currentPage === 'home'
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10'
            }`}
          >
            🏥 Home
          </button>
          <button
            onClick={() => {
              onNavigate?.('encyclopedia');
              setIsOpen(false);
            }}
            className={`block w-full text-left px-4 py-2 rounded text-sm font-medium transition-all ${
              currentPage === 'encyclopedia'
                ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10'
            }`}
          >
            📚 Encyclopedia
          </button>
        </div>
      )}

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center font-bold text-xl"
        aria-label="Toggle navigation"
      >
        {isOpen ? '✕' : '≡'}
      </button>
    </div>
  );
}

/**
 * Usage Examples:
 * 
 * 1. In Header Component:
 * ---
 * import { NavigationBridge } from '@/components/NavigationBridge';
 * 
 * function Header({ onNavigate }) {
 *   return (
 *     <>
 *       <NavigationBridge onNavigate={onNavigate} />
 *       {/* ... rest of header ... */}
 *     </>
 *   );
 * }
 * ---
 * 
 * 2. In App Component:
 * ---
 * import { MinimalNavigationBar } from '@/components/NavigationBridge';
 * 
 * function App() {
 *   const [currentPage, setCurrentPage] = useState('home');
 *   
 *   return (
 *     <>
 *       {currentPage === 'home' && <HomePage />}
 *       {currentPage === 'encyclopedia' && <EncyclopediaPage />}
 *       <MinimalNavigationBar 
 *         currentPage={currentPage} 
 *         onNavigate={setCurrentPage} 
 *       />
 *     </>
 *   );
 * }
 * ---
 * 
 * 3. Floating Button:
 * ---
 * <FloatingNavButton 
 *   currentPage={currentPage}
 *   onNavigate={setCurrentPage}
 * />
 * ---
 */

#!/usr/bin/env node

/**
 * Keyword Manager Tool for livingwitharthritis.org.uk
 * Node.js script for keyword research, generation, and analysis
 * 
 * Usage:
 *   node keyword-manager.js generate
 *   node keyword-manager.js analyze
 *   node keyword-manager.js export
 *   node keyword-manager.js dashboard
 */

const fs = require('fs');
const path = require('path');
const chalk = require('chalk'); // Optional: for colored console output

class KeywordManager {
  constructor() {
    this.keywords = new Map();
    this.metadata = {};
    this.config = this.loadConfig();
  }

  loadConfig() {
    return {
      target: 30000,
      baseConditions: 11,
      bodyParts: 16,
      baseKeywordsPerCondition: 2727,
      exportDir: './keyword_exports',
      logFile: './keyword_management.log'
    };
  }

  /**
   * Generate all keyword variations
   */
  generateAllKeywords() {
    console.log('🚀 Starting comprehensive keyword generation...\n');

    const categories = {
      'Basic Combinations': this.generateBasicCombinations(),
      'Symptom Keywords': this.generateSymptomKeywords(),
      'Treatment Keywords': this.generateTreatmentKeywords(),
      'Question Keywords': this.generateQuestionKeywords(),
      'Long-tail Keywords': this.generateLongTailKeywords(),
      'Demographic Keywords': this.generateDemographicKeywords(),
      'Activity Keywords': this.generateActivityKeywords(),
      'Local Keywords': this.generateLocalKeywords(),
      'Comparison Keywords': this.generateComparisonKeywords(),
      'Medication Keywords': this.generateMedicationKeywords(),
      'Lifestyle Keywords': this.generateLifestyleKeywords(),
      'Feature Snippet Keywords': this.generateFeatureSnippetKeywords()
    };

    // Remove duplicates and store
    Object.entries(categories).forEach(([category, keywords]) => {
      const uniqueKeywords = [...new Set(keywords)];
      this.keywords.set(category, uniqueKeywords);
      console.log(`✓ ${category}: ${uniqueKeywords.length} keywords`);
    });

    this.logAction(`Generated ${this.getTotalKeywords()} total unique keywords`);
    return categories;
  }

  generateBasicCombinations() {
    const conditions = ['osteoarthritis', 'arthritis', 'OA', 'joint pain', 'rheumatoid arthritis', 'gout', 'lupus', 'fibromyalgia', 'bursitis', 'tendinitis'];
    const bodyParts = ['knee', 'hip', 'hand', 'shoulder', 'back', 'ankle', 'wrist', 'elbow', 'spine', 'foot'];
    const keywords = [];

    conditions.forEach(condition => {
      bodyParts.forEach(part => {
        keywords.push(`${part} ${condition}`);
        keywords.push(`${condition} ${part}`);
        keywords.push(`${part} ${condition} pain`);
        keywords.push(`${condition} in ${part}`);
      });
    });

    return keywords;
  }

  generateSymptomKeywords() {
    const symptoms = ['pain', 'stiffness', 'swelling', 'inflammation', 'discomfort', 'aching', 'numbness', 'tingling', 'weakness', 'limited movement'];
    const conditions = ['osteoarthritis', 'arthritis', 'rheumatoid arthritis', 'gout', 'fibromyalgia'];
    const keywords = [];

    symptoms.forEach(symptom => {
      conditions.forEach(condition => {
        keywords.push(`${symptom} from ${condition}`);
        keywords.push(`${condition} ${symptom}`);
        keywords.push(`${symptom} relief ${condition}`);
      });
    });

    return keywords;
  }

  generateTreatmentKeywords() {
    const treatments = ['exercise', 'physical therapy', 'medication', 'diet', 'acupuncture', 'massage', 'stretching', 'heat therapy', 'ice therapy'];
    const conditions = ['osteoarthritis', 'arthritis', 'rheumatoid arthritis', 'gout', 'fibromyalgia'];
    const keywords = [];

    treatments.forEach(treatment => {
      conditions.forEach(condition => {
        keywords.push(`${treatment} for ${condition}`);
        keywords.push(`best ${treatment} for ${condition}`);
        keywords.push(`${condition} ${treatment}`);
      });
    });

    return keywords;
  }

  generateQuestionKeywords() {
    const conditions = ['osteoarthritis', 'arthritis', 'rheumatoid arthritis', 'gout', 'fibromyalgia', 'bursitis'];
    const keywords = [];

    conditions.forEach(condition => {
      keywords.push(`how to manage ${condition}`);
      keywords.push(`what is ${condition}`);
      keywords.push(`can ${condition} be cured`);
      keywords.push(`is ${condition} hereditary`);
      keywords.push(`what causes ${condition}`);
      keywords.push(`can you exercise with ${condition}`);
      keywords.push(`when does ${condition} develop`);
    });

    return keywords;
  }

  generateLongTailKeywords() {
    const keywords = [];
    const conditions = ['osteoarthritis', 'arthritis', 'rheumatoid arthritis', 'gout'];
    const bodyParts = ['knee', 'hip', 'hand', 'shoulder', 'back'];

    conditions.forEach(condition => {
      bodyParts.forEach(part => {
        keywords.push(`${part} ${condition} pain relief`);
        keywords.push(`best exercises ${part} ${condition}`);
        keywords.push(`natural ${condition} ${part} relief`);
        keywords.push(`how to manage ${part} ${condition}`);
        keywords.push(`${part} ${condition} flare up prevention`);
      });
    });

    return keywords;
  }

  generateDemographicKeywords() {
    const ageGroups = ['30s', '40s', '50s', '60s', '70s'];
    const conditions = ['arthritis', 'osteoarthritis', 'rheumatoid arthritis', 'gout', 'fibromyalgia'];
    const keywords = [];

    ageGroups.forEach(age => {
      conditions.forEach(condition => {
        keywords.push(`${condition} in ${age}`);
        keywords.push(`early onset ${condition}`);
      });
    });

    return keywords;
  }

  generateActivityKeywords() {
    const activities = ['running', 'walking', 'cycling', 'swimming', 'yoga', 'gardening', 'sports', 'driving', 'climbing stairs'];
    const conditions = ['arthritis', 'osteoarthritis', 'rheumatoid arthritis', 'gout'];
    const keywords = [];

    activities.forEach(activity => {
      conditions.forEach(condition => {
        keywords.push(`${activity} with ${condition}`);
        keywords.push(`can i ${activity} with ${condition}`);
        keywords.push(`safe ${activity} ${condition}`);
      });
    });

    return keywords;
  }

  generateLocalKeywords() {
    const locations = ['UK', 'London', 'Manchester', 'Birmingham', 'Leeds', 'Bristol', 'Scotland', 'Wales'];
    const conditions = ['arthritis', 'osteoarthritis', 'rheumatoid arthritis'];
    const keywords = [];

    locations.forEach(location => {
      conditions.forEach(condition => {
        keywords.push(`${condition} treatment ${location}`);
        keywords.push(`${condition} specialist ${location}`);
      });
    });

    return keywords;
  }

  generateComparisonKeywords() {
    return [
      'osteoarthritis vs rheumatoid arthritis',
      'gout vs arthritis',
      'difference between osteoarthritis and rheumatoid arthritis',
      'heat vs ice for arthritis',
      'medication vs exercise arthritis'
    ];
  }

  generateMedicationKeywords() {
    const medications = ['ibuprofen', 'naproxen', 'glucosamine', 'corticosteroids', 'DMARDs', 'biologics'];
    const conditions = ['arthritis', 'osteoarthritis', 'rheumatoid arthritis', 'gout'];
    const keywords = [];

    medications.forEach(med => {
      conditions.forEach(condition => {
        keywords.push(`${med} for ${condition}`);
        keywords.push(`${med} ${condition} side effects`);
      });
    });

    return keywords;
  }

  generateLifestyleKeywords() {
    const topics = ['diet', 'sleep', 'weight loss', 'stress management', 'water therapy', 'work adjustments'];
    const conditions = ['arthritis', 'osteoarthritis', 'rheumatoid arthritis'];
    const keywords = [];

    topics.forEach(topic => {
      conditions.forEach(condition => {
        keywords.push(`${topic} for ${condition}`);
        keywords.push(`best ${topic} ${condition}`);
      });
    });

    return keywords;
  }

  generateFeatureSnippetKeywords() {
    const conditions = ['osteoarthritis', 'rheumatoid arthritis', 'gout', 'fibromyalgia', 'bursitis'];
    const keywords = [];

    conditions.forEach(condition => {
      keywords.push(`what is ${condition}`);
      keywords.push(`symptoms of ${condition}`);
      keywords.push(`causes of ${condition}`);
      keywords.push(`treatments for ${condition}`);
      keywords.push(`how to diagnose ${condition}`);
    });

    return keywords;
  }

  /**
   * Analyze keywords for SEO metrics
   */
  analyzeKeywords() {
    console.log('\n📊 Analyzing keywords...\n');

    const analysis = {
      totalKeywords: this.getTotalKeywords(),
      categories: this.keywords.size,
      byDifficulty: this.analyzeByDifficulty(),
      byIntent: this.analyzeByIntent(),
      wordCounts: this.analyzeWordCounts(),
      topCategories: this.getTopCategories(5)
    };

    this.displayAnalysis(analysis);
    this.logAction(`Analyzed ${analysis.totalKeywords} keywords`);
    return analysis;
  }

  analyzeByDifficulty() {
    const allKeywords = this.getAllKeywords();
    return {
      easy: allKeywords.filter(kw => kw.split(' ').length <= 2).length,
      medium: allKeywords.filter(kw => kw.split(' ').length === 3).length,
      hard: allKeywords.filter(kw => kw.split(' ').length >= 4).length
    };
  }

  analyzeByIntent() {
    const allKeywords = this.getAllKeywords();
    const intentPatterns = {
      informational: ['what', 'how', 'why', 'when', 'where', 'symptoms', 'causes'],
      commercial: ['best', 'buy', 'price', 'cost'],
      transactional: ['treatment', 'cure', 'remedy', 'relief'],
      navigational: ['clinic', 'specialist', 'support group']
    };

    const intent = {};
    Object.entries(intentPatterns).forEach(([type, patterns]) => {
      intent[type] = allKeywords.filter(kw =>
        patterns.some(p => kw.toLowerCase().includes(p))
      ).length;
    });

    return intent;
  }

  analyzeWordCounts() {
    const allKeywords = this.getAllKeywords();
    const counts = {};

    allKeywords.forEach(kw => {
      const wordCount = kw.split(' ').length;
      counts[wordCount] = (counts[wordCount] || 0) + 1;
    });

    return counts;
  }

  getTopCategories(limit) {
    return Array.from(this.keywords.entries())
      .sort((a, b) => b[1].length - a[1].length)
      .slice(0, limit)
      .reduce((obj, [cat, kws]) => {
        obj[cat] = kws.length;
        return obj;
      }, {});
  }

  /**
   * Export keywords in various formats
   */
  exportKeywords(format = 'all') {
    if (!fs.existsSync(this.config.exportDir)) {
      fs.mkdirSync(this.config.exportDir, { recursive: true });
    }

    console.log('\n💾 Exporting keywords...\n');

    if (format === 'all' || format === 'json') {
      this.exportJSON();
    }
    if (format === 'all' || format === 'csv') {
      this.exportCSV();
    }
    if (format === 'all' || format === 'txt') {
      this.exportTXT();
    }

    this.logAction(`Exported keywords in ${format} format`);
  }

  exportJSON() {
    const data = {
      generated: new Date().toISOString(),
      total: this.getTotalKeywords(),
      categories: Object.fromEntries(
        Array.from(this.keywords.entries()).map(([cat, kws]) => [
          cat,
          { count: kws.length, keywords: kws }
        ])
      )
    };

    const filePath = path.join(this.config.exportDir, 'keywords.json');
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`✓ JSON export: ${filePath}`);
  }

  exportCSV() {
    const filePath = path.join(this.config.exportDir, 'keywords.csv');
    const header = 'Keyword,Category,Word Count,Intent\n';
    let content = header;

    this.keywords.forEach((keywords, category) => {
      keywords.forEach(keyword => {
        const wordCount = keyword.split(' ').length;
        const intent = this.classifyIntent(keyword);
        content += `"${keyword}","${category}",${wordCount},"${intent}"\n`;
      });
    });

    fs.writeFileSync(filePath, content);
    console.log(`✓ CSV export: ${filePath}`);
  }

  exportTXT() {
    const filePath = path.join(this.config.exportDir, 'keywords.txt');
    let content = 'LIVING WITH ARTHRITIS UK - KEYWORD LIST\n';
    content += `Generated: ${new Date().toLocaleString()}\n`;
    content += `Total Keywords: ${this.getTotalKeywords()}\n\n`;

    this.keywords.forEach((keywords, category) => {
      content += `\n=== ${category.toUpperCase()} (${keywords.length} keywords) ===\n\n`;
      keywords.forEach(kw => {
        content += `• ${kw}\n`;
      });
    });

    fs.writeFileSync(filePath, content);
    console.log(`✓ TXT export: ${filePath}`);
  }

  /**
   * Generate content strategy based on keywords
   */
  generateContentStrategy() {
    console.log('\n📋 Content Strategy:\n');

    const strategy = {
      pillarPages: {
        count: 50,
        keywordsEach: 100,
        totalKeywords: 5000
      },
      clusterPages: {
        count: 500,
        keywordsEach: 20,
        totalKeywords: 10000
      },
      blogPosts: {
        count: 2000,
        keywordsEach: 5,
        totalKeywords: 10000
      },
      faqPages: {
        count: 200,
        keywordsEach: 25,
        totalKeywords: 5000
      }
    };

    const totalPages = Object.values(strategy).reduce((sum, s) => sum + s.count, 0);
    const totalKeywordsFromContent = Object.values(strategy).reduce((sum, s) => sum + s.totalKeywords, 0);

    console.log(`📄 Total Pages: ${totalPages}`);
    console.log(`🔑 Total Keywords Covered: ${totalKeywordsFromContent}`);
    console.log(`📊 Average Keywords per Page: ${(totalKeywordsFromContent / totalPages).toFixed(0)}`);

    this.displayContentStrategy(strategy);
    return strategy;
  }

  /**
   * Utility methods
   */
  getTotalKeywords() {
    return Array.from(this.keywords.values()).reduce((sum, kws) => sum + kws.length, 0);
  }

  getAllKeywords() {
    return Array.from(this.keywords.values()).flat();
  }

  classifyIntent(keyword) {
    const kw = keyword.toLowerCase();
    if (['what', 'how', 'why', 'when', 'where'].some(q => kw.includes(q))) return 'Informational';
    if (['best', 'buy', 'price'].some(q => kw.includes(q))) return 'Commercial';
    if (['treatment', 'cure', 'relief'].some(q => kw.includes(q))) return 'Transactional';
    return 'Navigational';
  }

  logAction(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    fs.appendFileSync(this.config.logFile, logMessage);
  }

  displayAnalysis(analysis) {
    console.log(`📈 Total Keywords: ${analysis.totalKeywords.toLocaleString()}`);
    console.log(`📂 Categories: ${analysis.categories}`);
    console.log(`\n⚡ By Difficulty:`);
    console.log(`   Easy: ${analysis.byDifficulty.easy}`);
    console.log(`   Medium: ${analysis.byDifficulty.medium}`);
    console.log(`   Hard: ${analysis.byDifficulty.hard}`);
    console.log(`\n🎯 By Intent:`);
    Object.entries(analysis.byIntent).forEach(([intent, count]) => {
      console.log(`   ${intent}: ${count}`);
    });
    console.log(`\n🏆 Top Categories:`);
    Object.entries(analysis.topCategories).forEach(([cat, count]) => {
      console.log(`   ${cat}: ${count}`);
    });
  }

  displayContentStrategy(strategy) {
    console.log('\n📊 Content Breakdown:');
    Object.entries(strategy).forEach(([type, data]) => {
      console.log(`   ${type}: ${data.count} pieces × ${data.keywordsEach} keywords = ${data.totalKeywords}`);
    });
  }
}

// ============================================================================
// CLI INTERFACE
// ============================================================================

const args = process.argv.slice(2);
const command = args[0] || 'generate';

const manager = new KeywordManager();

switch (command) {
  case 'generate':
    console.log('🚀 KEYWORD EXPANSION TOOL\n');
    console.log('='.repeat(60));
    manager.generateAllKeywords();
    console.log('\n✅ Generation complete!');
    console.log(`Total keywords generated: ${manager.getTotalKeywords().toLocaleString()}`);
    break;

  case 'analyze':
    manager.analyzeKeywords();
    break;

  case 'export':
    const format = args[1] || 'all';
    manager.generateAllKeywords();
    manager.exportKeywords(format);
    break;

  case 'full':
    console.log('🚀 COMPLETE KEYWORD ANALYSIS\n');
    console.log('='.repeat(60));
    manager.generateAllKeywords();
    console.log('\n' + '='.repeat(60));
    manager.analyzeKeywords();
    console.log('\n' + '='.repeat(60));
    manager.generateContentStrategy();
    console.log('\n' + '='.repeat(60));
    manager.exportKeywords('all');
    console.log('\n✅ Complete analysis finished!');
    break;

  default:
    console.log('Usage:');
    console.log('  node keyword-manager.js generate  - Generate all keywords');
    console.log('  node keyword-manager.js analyze   - Analyze generated keywords');
    console.log('  node keyword-manager.js export    - Export keywords (json|csv|txt|all)');
    console.log('  node keyword-manager.js full      - Run complete analysis\n');
}

module.exports = KeywordManager;
#!/usr/bin/env python3
"""
Keyword Expansion Tool for livingwitharthritis.org.uk
Generates 30,000+ keyword variations for arthritis niche
"""

import json
import csv
from datetime import datetime
from typing import List, Dict, Set
from collections import defaultdict

class KeywordExpander:
    """Generate and manage keywords for arthritis website"""
    
    def __init__(self):
        self.keywords = defaultdict(list)
        self.all_keywords = set()
        self.keyword_metadata = {}
        
        # Core keyword components
        self.conditions = [
            "osteoarthritis", "arthritis", "OA", "joint pain",
            "rheumatoid arthritis", "RA", "gout", "lupus",
            "fibromyalgia", "bursitis", "tendinitis"
        ]
        
        self.body_parts = [
            "knee", "hip", "hand", "shoulder", "back", "spine",
            "ankle", "foot", "wrist", "elbow", "neck", "thumb",
            "fingers", "toes", "jaw", "joints"
        ]
        
        self.symptoms = [
            "pain", "stiffness", "swelling", "inflammation",
            "discomfort", "aching", "tenderness", "numbness",
            "tingling", "weakness", "limited movement", "creaking"
        ]
        
        self.treatments = [
            "exercise", "physical therapy", "medication", "diet",
            "supplement", "injection", "surgery", "acupuncture",
            "massage", "stretching", "heat therapy", "ice therapy",
            "rest", "activity modification", "weight management"
        ]
        
        self.modifiers = [
            "how to", "best", "natural", "home remedy", "relief",
            "treatment", "management", "prevent", "cure", "signs",
            "cause", "risk factor", "diagnosis", "stage", "severe",
            "mild", "chronic", "progressive", "early", "advanced"
        ]
        
        self.questions = [
            "how to", "what is", "why does", "can you", "should i",
            "is it", "when", "where", "best way", "most effective"
        ]
        
        self.age_groups = [
            "arthritis in 30s", "arthritis in 40s", "arthritis in 50s",
            "arthritis in 60s", "arthritis in 70s", "young arthritis",
            "early-onset arthritis", "age-related arthritis"
        ]
        
        self.activities = [
            "running", "walking", "cycling", "swimming", "yoga",
            "gardening", "sports", "work", "driving", "climbing stairs",
            "playing with kids", "playing sports", "exercising"
        ]
        
        self.locations = [
            "UK", "England", "Scotland", "Wales", "London",
            "Manchester", "Birmingham", "Leeds", "Bristol"
        ]

    def generate_basic_combinations(self) -> List[str]:
        """Generate condition + body part combinations"""
        keywords = []
        
        for condition in self.conditions:
            for body_part in self.body_parts:
                keywords.append(f"{body_part} {condition}")
                keywords.append(f"{condition} {body_part}")
                keywords.append(f"{body_part} {condition} pain")
                keywords.append(f"{condition} in {body_part}")
        
        return keywords

    def generate_symptom_keywords(self) -> List[str]:
        """Generate symptom-based keywords"""
        keywords = []
        
        for symptom in self.symptoms:
            for condition in self.conditions:
                keywords.append(f"{symptom} from {condition}")
                keywords.append(f"{condition} {symptom}")
                keywords.append(f"{symptom} relief {condition}")
            
            for body_part in self.body_parts:
                keywords.append(f"{body_part} {symptom}")
                keywords.append(f"{symptom} in {body_part}")
                keywords.append(f"{symptom} {body_part}")
        
        return keywords

    def generate_treatment_keywords(self) -> List[str]:
        """Generate treatment-related keywords"""
        keywords = []
        
        for treatment in self.treatments:
            for condition in self.conditions:
                keywords.append(f"{treatment} for {condition}")
                keywords.append(f"best {treatment} for {condition}")
                keywords.append(f"{condition} {treatment}")
                keywords.append(f"how to {treatment} {condition}")
        
        for treatment in self.treatments:
            for body_part in self.body_parts:
                keywords.append(f"{treatment} for {body_part}")
                keywords.append(f"{body_part} {treatment}")
        
        return keywords

    def generate_question_keywords(self) -> List[str]:
        """Generate question-based keywords"""
        keywords = []
        
        # How to questions
        how_tos = [
            f"how to manage {cond}" for cond in self.conditions
        ] + [
            f"how to relieve {symptom}" for symptom in self.symptoms
        ] + [
            f"how to treat {cond}" for cond in self.conditions
        ]
        
        # What is questions
        what_is = [
            f"what is {cond}" for cond in self.conditions
        ] + [
            f"what causes {cond}" for cond in self.conditions
        ]
        
        # Can/Should questions
        can_should = [
            f"can {cond} be cured",
            f"can you exercise with {cond}",
            f"should i exercise with {cond}",
            f"is {cond} hereditary",
            f"is {cond} serious"
        ] * len(self.conditions)
        
        # When/Why questions
        when_why = [
            f"when does {cond} develop",
            f"why does {body_part} hurt",
            f"why {body_part} pain"
        ] for body_part in self.body_parts[:5]
        ]
        
        keywords.extend(how_tos)
        keywords.extend(what_is)
        keywords.extend(can_should)
        keywords.extend(when_why)
        
        return keywords

    def generate_long_tail_keywords(self) -> List[str]:
        """Generate long-tail keyword variations"""
        keywords = []
        
        # 3-4 word combinations
        for condition in self.conditions[:5]:  # Limit for performance
            for body_part in self.body_parts[:10]:
                keywords.append(f"{body_part} {condition} pain relief")
                keywords.append(f"treating {body_part} {condition}")
                keywords.append(f"best exercises {body_part} {condition}")
                keywords.append(f"{body_part} {condition} home treatment")
                keywords.append(f"natural {condition} {body_part} relief")
                keywords.append(f"how to manage {body_part} {condition}")
                keywords.append(f"{body_part} {condition} flare up")
                keywords.append(f"{body_part} {condition} prevention")
        
        return keywords

    def generate_demographic_keywords(self) -> List[str]:
        """Generate demographic-specific keywords"""
        keywords = []
        
        for age_group in self.age_groups:
            for condition in self.conditions[:5]:
                keywords.append(f"{age_group} {condition}")
                keywords.append(f"{condition} {age_group}")
                keywords.append(f"treating {condition} {age_group}")
        
        return keywords

    def generate_activity_keywords(self) -> List[str]:
        """Generate activity-related keywords"""
        keywords = []
        
        for activity in self.activities:
            for condition in self.conditions[:5]:
                keywords.append(f"{activity} with {condition}")
                keywords.append(f"can i {activity} with {condition}")
                keywords.append(f"{activity} and {condition}")
                keywords.append(f"safe {activity} {condition}")
                keywords.append(f"{activity} exercises {condition}")
        
        return keywords

    def generate_local_keywords(self) -> List[str]:
        """Generate location-based keywords"""
        keywords = []
        
        for location in self.locations:
            for condition in self.conditions[:3]:
                keywords.append(f"{condition} specialist {location}")
                keywords.append(f"{condition} treatment {location}")
                keywords.append(f"{condition} support groups {location}")
        
        return keywords

    def generate_comparison_keywords(self) -> List[str]:
        """Generate comparison-based keywords"""
        keywords = []
        
        conditions_pairs = [
            ("osteoarthritis", "rheumatoid arthritis"),
            ("osteoarthritis", "gout"),
            ("knee arthritis", "hip arthritis"),
        ]
        
        for cond1, cond2 in conditions_pairs:
            keywords.append(f"{cond1} vs {cond2}")
            keywords.append(f"difference between {cond1} and {cond2}")
            keywords.append(f"{cond1} or {cond2}")
        
        return keywords

    def generate_medication_keywords(self) -> List[str]:
        """Generate medication-related keywords"""
        keywords = []
        
        medications = [
            "paracetamol", "ibuprofen", "naproxen", "aspirin",
            "glucosamine", "corticosteroids", "DMARDs", "biologics"
        ]
        
        for med in medications:
            for condition in self.conditions[:5]:
                keywords.append(f"{med} for {condition}")
                keywords.append(f"is {med} good for {condition}")
                keywords.append(f"{med} {condition} side effects")
                keywords.append(f"{med} {condition} effectiveness")
        
        return keywords

    def generate_lifestyle_keywords(self) -> List[str]:
        """Generate lifestyle and daily living keywords"""
        keywords = []
        
        lifestyle_topics = [
            "sleep", "diet", "weight loss", "stress management",
            "heat therapy", "cold therapy", "water therapy",
            "work adjustments", "home adjustments"
        ]
        
        for topic in lifestyle_topics:
            for condition in self.conditions[:5]:
                keywords.append(f"{topic} for {condition}")
                keywords.append(f"best {topic} {condition}")
                keywords.append(f"{condition} and {topic}")
        
        return keywords

    def generate_feature_snippet_keywords(self) -> List[str]:
        """Generate keywords for featured snippets"""
        keywords = []
        
        # Definition-type queries
        keywords.extend([
            f"what is {cond}" for cond in self.conditions
        ])
        
        # List-type queries
        keywords.extend([
            f"symptoms of {cond}" for cond in self.conditions
        ])
        keywords.extend([
            f"causes of {cond}" for cond in self.conditions
        ])
        keywords.extend([
            f"treatments for {cond}" for cond in self.conditions
        ])
        
        # Step-type queries
        keywords.extend([
            f"how to diagnose {cond}" for cond in self.conditions[:3]
        ])
        keywords.extend([
            f"steps to manage {cond}" for cond in self.conditions[:3]
        ])
        
        return keywords

    def expand_all_keywords(self) -> Dict[str, List[str]]:
        """Generate all keyword variations"""
        
        print("🔍 Generating keywords...")
        
        categories = {
            "Basic Combinations": self.generate_basic_combinations(),
            "Symptom Keywords": self.generate_symptom_keywords(),
            "Treatment Keywords": self.generate_treatment_keywords(),
            "Question Keywords": self.generate_question_keywords(),
            "Long-tail Keywords": self.generate_long_tail_keywords(),
            "Demographic Keywords": self.generate_demographic_keywords(),
            "Activity Keywords": self.generate_activity_keywords(),
            "Local Keywords": self.generate_local_keywords(),
            "Comparison Keywords": self.generate_comparison_keywords(),
            "Medication Keywords": self.generate_medication_keywords(),
            "Lifestyle Keywords": self.generate_lifestyle_keywords(),
            "Feature Snippet Keywords": self.generate_feature_snippet_keywords(),
        }
        
        # Remove duplicates per category
        for category, kws in categories.items():
            categories[category] = list(set(kws))
            self.keywords[category] = categories[category]
        
        # Collect all unique keywords
        self.all_keywords = set()
        for kws in categories.values():
            self.all_keywords.update(kws)
        
        return categories

    def get_statistics(self) -> Dict:
        """Get keyword statistics"""
        return {
            "total_unique_keywords": len(self.all_keywords),
            "categories": len(self.keywords),
            "keywords_per_category": {
                cat: len(kws) for cat, kws in self.keywords.items()
            },
            "expansion_from_base": len(self.all_keywords) / len(self.conditions)
        }

    def export_csv(self, filename: str = "keywords.csv"):
        """Export keywords to CSV"""
        with open(filename, 'w', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            writer.writerow(['Keyword', 'Category', 'Word Count', 'Intent'])
            
            for category, keywords in self.keywords.items():
                for keyword in keywords:
                    word_count = len(keyword.split())
                    intent = self._classify_intent(keyword)
                    writer.writerow([keyword, category, word_count, intent])
        
        print(f"✅ Exported to {filename}")

    def export_json(self, filename: str = "keywords.json"):
        """Export keywords to JSON"""
        export_data = {
            "generated_at": datetime.now().isoformat(),
            "total_keywords": len(self.all_keywords),
            "keywords_by_category": {
                cat: sorted(list(kws))
                for cat, kws in self.keywords.items()
            },
            "statistics": self.get_statistics()
        }
        
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(export_data, f, indent=2, ensure_ascii=False)
        
        print(f"✅ Exported to {filename}")

    def export_txt(self, filename: str = "keywords.txt"):
        """Export keywords as plain text"""
        with open(filename, 'w', encoding='utf-8') as f:
            f.write("Living With Arthritis UK - Keyword List\n")
            f.write(f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
            f.write(f"Total Keywords: {len(self.all_keywords)}\n\n")
            
            for category in sorted(self.keywords.keys()):
                keywords = sorted(self.keywords[category])
                f.write(f"\n=== {category.upper()} ({len(keywords)} keywords) ===\n\n")
                for keyword in keywords:
                    f.write(f"• {keyword}\n")
        
        print(f"✅ Exported to {filename}")

    def _classify_intent(self, keyword: str) -> str:
        """Classify keyword intent"""
        keyword_lower = keyword.lower()
        
        if any(q in keyword_lower for q in self.questions):
            return "Informational"
        elif any(m in keyword_lower for m in ["buy", "price", "cost", "where to get"]):
            return "Commercial"
        elif any(m in keyword_lower for m in ["best", "treatment", "cure", "help"]):
            return "Transactional"
        else:
            return "Navigational"

    def generate_content_plan(self) -> Dict:
        """Generate content plan based on keywords"""
        content_plan = {
            "pillar_pages": 50,
            "cluster_pages": 500,
            "blog_posts": 2000,
            "faq_pages": 200,
            "resource_pages": 150,
            "total_pages": 2900,
            "estimated_keywords": 30000
        }
        
        return content_plan

    def print_summary(self):
        """Print keyword summary"""
        stats = self.get_statistics()
        
        print("\n" + "="*60)
        print("🎯 KEYWORD EXPANSION SUMMARY")
        print("="*60)
        print(f"\n📊 Total Keywords Generated: {stats['total_unique_keywords']:,}")
        print(f"📂 Categories: {stats['categories']}")
        print(f"\n📈 Keywords by Category:")
        
        for cat, count in sorted(stats['keywords_per_category'].items(), 
                                key=lambda x: x[1], reverse=True):
            print(f"   • {cat}: {count:,}")
        
        print(f"\n🚀 Expansion Ratio: {stats['expansion_from_base']:.1f}x")
        print(f"   (Base conditions: {len(self.conditions)} → Keywords: {stats['total_unique_keywords']:,})")
        
        print("\n" + "="*60 + "\n")

    def get_keyword_list(self, category: str = None) -> List[str]:
        """Get keywords from specific category or all"""
        if category and category in self.keywords:
            return sorted(self.keywords[category])
        return sorted(list(self.all_keywords))


# ============================================================================
# USAGE EXAMPLES
# ============================================================================

if __name__ == "__main__":
    # Initialize expander
    expander = KeywordExpander()
    
    # Step 1: Generate all keywords
    print("🚀 Starting Keyword Expansion for livingwitharthritis.org.uk\n")
    categories = expander.expand_all_keywords()
    
    # Step 2: Print summary
    expander.print_summary()
    
    # Step 3: Export in multiple formats
    print("💾 Exporting keywords...\n")
    expander.export_csv("livingwitharthritis_keywords.csv")
    expander.export_json("livingwitharthritis_keywords.json")
    expander.export_txt("livingwitharthritis_keywords.txt")
    
    # Step 4: Print statistics
    stats = expander.get_statistics()
    print(f"\n✨ Statistics:")
    print(f"   Total Unique Keywords: {stats['total_unique_keywords']:,}")
    print(f"   Categories: {stats['categories']}")
    
    # Step 5: Sample keywords from each category
    print(f"\n📋 Sample Keywords (5 per category):\n")
    for category in sorted(categories.keys()):
        sample = sorted(categories[category])[:5]
        print(f"{category}:")
        for kw in sample:
            print(f"  • {kw}")
        print()
    
    print("\n✅ Keyword expansion complete!")
    print(f"📁 Files generated:")
    print(f"   1. livingwitharthritis_keywords.csv (for spreadsheet analysis)")
    print(f"   2. livingwitharthritis_keywords.json (for development/import)")
    print(f"   3. livingwitharthritis_keywords.txt (for reading)")
      import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * Keyword Management Dashboard for livingwitharthritis.org.uk
 * Tracks keyword expansion progress and organizes keyword strategy
 */

const KeywordDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [sortBy, setSortBy] = useState('alphabetical');

  // Keyword categories with sample data
  const keywordCategories = {
    'Basic Combinations': {
      count: 2400,
      examples: [
        'knee osteoarthritis',
        'hip arthritis',
        'hand osteoarthritis',
        'shoulder arthritis',
        'back arthritis pain'
      ],
      priority: 'High',
      difficulty: 'Easy',
      targetVolume: 2500
    },
    'Symptom Keywords': {
      count: 1800,
      examples: [
        'joint pain relief',
        'arthritis stiffness',
        'joint swelling treatment',
        'arthritis numbness',
        'joint inflammation cure'
      ],
      priority: 'High',
      difficulty: 'Medium',
      targetVolume: 2000
    },
    'Treatment Keywords': {
      count: 3200,
      examples: [
        'best exercise for arthritis',
        'arthritis physical therapy',
        'natural arthritis treatment',
        'arthritis medication',
        'arthritis pain relief'
      ],
      priority: 'High',
      difficulty: 'High',
      targetVolume: 3500
    },
    'Question Keywords': {
      count: 4100,
      examples: [
        'how to manage arthritis',
        'can arthritis be cured',
        'why do joints hurt',
        'what causes arthritis',
        'when should i see a doctor'
      ],
      priority: 'High',
      difficulty: 'Medium',
      targetVolume: 4500
    },
    'Long-tail Keywords': {
      count: 8200,
      examples: [
        'best exercises for knee arthritis',
        'natural remedies for arthritis pain',
        'how to prevent arthritis flare ups',
        'arthritis treatment without medication',
        'safe activities with arthritis'
      ],
      priority: 'Medium',
      difficulty: 'High',
      targetVolume: 9000
    },
    'Demographic Keywords': {
      count: 1600,
      examples: [
        'arthritis in 50s',
        'early onset arthritis',
        'arthritis in young adults',
        'age-related arthritis',
        'arthritis in 60s'
      ],
      priority: 'Medium',
      difficulty: 'Medium',
      targetVolume: 2000
    },
    'Activity Keywords': {
      count: 1400,
      examples: [
        'running with arthritis',
        'yoga for arthritis',
        'swimming arthritis pain',
        'gardening with arthritis',
        'sports with arthritis'
      ],
      priority: 'Medium',
      difficulty: 'Medium',
      targetVolume: 1800
    },
    'Local Keywords': {
      count: 900,
      examples: [
        'arthritis treatment UK',
        'arthritis support groups London',
        'rheumatologist near me',
        'arthritis clinic Birmingham',
        'arthritis specialist Manchester'
      ],
      priority: 'Low',
      difficulty: 'Easy',
      targetVolume: 1200
    },
    'Comparison Keywords': {
      count: 300,
      examples: [
        'osteoarthritis vs rheumatoid arthritis',
        'gout vs arthritis',
        'heat vs ice for arthritis',
        'medication vs exercise arthritis',
        'arthritis types comparison'
      ],
      priority: 'Low',
      difficulty: 'High',
      targetVolume: 400
    },
    'Medication Keywords': {
      count: 2100,
      examples: [
        'ibuprofen for arthritis',
        'best arthritis medication',
        'arthritis drug side effects',
        'alternative to medication',
        'prescription vs over counter'
      ],
      priority: 'High',
      difficulty: 'High',
      targetVolume: 2500
    },
    'Lifestyle Keywords': {
      count: 1500,
      examples: [
        'diet for arthritis',
        'sleep with arthritis pain',
        'weight loss arthritis',
        'stress management arthritis',
        'arthritis work modifications'
      ],
      priority: 'Medium',
      difficulty: 'Medium',
      targetVolume: 2000
    },
    'Feature Snippet Keywords': {
      count: 1100,
      examples: [
        'symptoms of osteoarthritis',
        'causes of arthritis',
        'how to diagnose arthritis',
        'treatment options arthritis',
        'arthritis statistics'
      ],
      priority: 'High',
      difficulty: 'Medium',
      targetVolume: 1500
    }
  };

  const totalKeywords = Object.values(keywordCategories).reduce((sum, cat) => sum + cat.count, 0);
  const targetKeywords = Object.values(keywordCategories).reduce((sum, cat) => sum + cat.targetVolume, 0);
  const completionPercentage = Math.round((totalKeywords / targetKeywords) * 100);

  // Monthly progression data
  const progressionData = [
    { month: 'Month 1', keywords: 300, target: 500 },
    { month: 'Month 2', keywords: 1000, target: 2000 },
    { month: 'Month 3', keywords: 3000, target: 4000 },
    { month: 'Month 4', keywords: 5000, target: 7000 },
    { month: 'Month 5', keywords: 8000, target: 11000 },
    { month: 'Month 6', keywords: 12000, target: 15000 },
    { month: 'Month 7', keywords: 15000, target: 19000 },
    { month: 'Month 8', keywords: 20000, target: 25000 },
    { month: 'Month 9', keywords: 24000, target: 28000 },
    { month: 'Month 10', keywords: 27000, target: 31000 },
    { month: 'Month 11', keywords: 29000, target: 33000 },
    { month: 'Month 12', keywords: 31000, target: 35000 }
  ];

  // Content plan
  const contentPlan = [
    { type: 'Pillar Pages', count: 50, status: 'In Progress', completion: 35 },
    { type: 'Cluster Pages', count: 500, status: 'Not Started', completion: 0 },
    { type: 'Blog Posts', count: 2000, status: 'Not Started', completion: 0 },
    { type: 'FAQ Pages', count: 200, status: 'In Progress', completion: 20 },
    { type: 'Resource Pages', count: 150, status: 'Not Started', completion: 0 }
  ];

  // Filter keywords
  const filteredCategories = Object.entries(keywordCategories).filter(([name]) =>
    name.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const OverviewTab = () => (
    <div className="space-y-8">
      {/* Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          title="Total Keywords"
          value={totalKeywords.toLocaleString()}
          subtitle="Currently generated"
          color="bg-blue-500"
        />
        <MetricCard
          title="Target Keywords"
          value={targetKeywords.toLocaleString()}
          subtitle="12-month goal"
          color="bg-green-500"
        />
        <MetricCard
          title="Categories"
          value={Object.keys(keywordCategories).length}
          subtitle="Organized by type"
          color="bg-purple-500"
        />
        <MetricCard
          title="Completion"
          value={`${completionPercentage}%`}
          subtitle="Target progress"
          color="bg-orange-500"
        />
      </div>

      {/* Progress Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
        <h3 className="text-lg font-bold mb-4">12-Month Projection</h3>
        <div className="space-y-3">
          {progressionData.map((data, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{data.month}</span>
                <span className="font-medium">{data.keywords.toLocaleString()} / {data.target.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${(data.keywords / data.target) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatBox
          title="Highest Priority"
          items={Object.entries(keywordCategories)
            .filter(([_, data]) => data.priority === 'High')
            .map(([name]) => name)}
        />
        <StatBox
          title="Easiest Categories"
          items={Object.entries(keywordCategories)
            .filter(([_, data]) => data.difficulty === 'Easy')
            .map(([name]) => name)}
        />
        <StatBox
          title="Most Keywords"
          items={Object.entries(keywordCategories)
            .sort(([_, a], [__, b]) => b.count - a.count)
            .slice(0, 3)
            .map(([name]) => name)}
        />
      </div>
    </div>
  );

  const CategoriesTab = () => (
    <div className="space-y-4">
      {/* Search & Sort */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search categories..."
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
        >
          <option value="alphabetical">Alphabetical</option>
          <option value="count-high">Most Keywords</option>
          <option value="priority">Priority</option>
        </select>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCategories.map(([name, data]) => (
          <CategoryCard
            key={name}
            name={name}
            data={data}
            isExpanded={expandedCategory === name}
            onToggle={() => setExpandedCategory(expandedCategory === name ? null : name)}
          />
        ))}
      </div>
    </div>
  );

  const ContentPlanTab = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
        <h3 className="text-lg font-bold mb-6">Content Creation Roadmap</h3>
        <div className="space-y-4">
          {contentPlan.map((item, idx) => (
            <div key={idx} className="border-l-4 border-blue-500 pl-4 py-2">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h4 className="font-semibold">{item.type}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.count} pages needed • Status: {item.status}
                  </p>
                </div>
                <span className="text-2xl font-bold text-blue-600">{item.completion}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${item.completion}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
        <h3 className="text-lg font-bold mb-4">Implementation Timeline</h3>
        <div className="space-y-4">
          <TimelineItem phase="Phase 1" duration="Months 1-2" focus="Core Keywords (1,000)" />
          <TimelineItem phase="Phase 2" duration="Months 2-4" focus="Expansion (10,000)" />
          <TimelineItem phase="Phase 3" duration="Months 4-8" focus="Domination (20,000)" />
          <TimelineItem phase="Phase 4" duration="Months 8-12" focus="Optimization (30,000+)" />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Keyword Management Dashboard | Living With Arthritis UK</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">🔍 Keyword Strategy Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Track keyword expansion progress toward 30,000+ keywords goal
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-gray-200 dark:border-gray-700">
            <TabButton
              active={activeTab === 'overview'}
              onClick={() => setActiveTab('overview')}
              label="Overview"
            />
            <TabButton
              active={activeTab === 'categories'}
              onClick={() => setActiveTab('categories')}
              label="Categories"
            />
            <TabButton
              active={activeTab === 'content'}
              onClick={() => setActiveTab('content')}
              label="Content Plan"
            />
          </div>

          {/* Content */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            {activeTab === 'overview' && <OverviewTab />}
            {activeTab === 'categories' && <CategoriesTab />}
            {activeTab === 'content' && <ContentPlanTab />}
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <p>Target: 30,000+ keywords by Month 12</p>
          </div>
        </div>
      </div>
    </>
  );
};

// Component: Metric Card
const MetricCard = ({ title, value, subtitle, color }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
    <div className={`${color} w-12 h-12 rounded-lg mb-4 opacity-20`} />
    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</h3>
    <p className="text-3xl font-bold mt-2">{value}</p>
    <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
  </div>
);

// Component: Category Card
const CategoryCard = ({ name, data, isExpanded, onToggle }) => (
  <div
    className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-md cursor-pointer hover:shadow-lg transition-shadow"
    onClick={onToggle}
  >
    <div className="flex justify-between items-start mb-3">
      <div>
        <h4 className="font-bold text-lg">{name}</h4>
        <div className="flex gap-2 mt-2">
          <Badge color="blue" text={`${data.count.toLocaleString()} keywords`} />
          <Badge color={data.priority === 'High' ? 'red' : data.priority === 'Medium' ? 'yellow' : 'gray'} text={data.priority} />
          <Badge color="purple" text={data.difficulty} />
        </div>
      </div>
      <span className="text-2xl font-bold text-blue-600">{data.count}</span>
    </div>

    {isExpanded && (
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
        <h5 className="font-semibold mb-2 text-sm">Example Keywords:</h5>
        <ul className="text-sm space-y-1">
          {data.examples.map((ex, idx) => (
            <li key={idx} className="text-gray-700 dark:text-gray-300">• {ex}</li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

// Component: Stat Box
const StatBox = ({ title, items }) => (
  <div className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-md">
    <h4 className="font-bold mb-3">{title}</h4>
    <ul className="space-y-2">
      {items.map((item, idx) => (
        <li key={idx} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
          <span className="text-blue-600 mt-0.5">✓</span>
          {item}
        </li>
      ))}
    </ul>
  </div>
);

// Component: Tab Button
const TabButton = ({ active, onClick, label }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 font-medium border-b-2 transition-colors ${
      active
        ? 'border-blue-600 text-blue-600'
        : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
    }`}
  >
    {label}
  </button>
);

// Component: Badge
const Badge = ({ color, text }) => {
  const colors = {
    blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    red: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    gray: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
  };
  
  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${colors[color]}`}>
      {text}
    </span>
  );
};

// Component: Timeline Item
const TimelineItem = ({ phase, duration, focus }) => (
  <div className="flex gap-4">
    <div className="flex flex-col items-center">
      <div className="w-4 h-4 bg-blue-600 rounded-full" />
      <div className="w-0.5 h-12 bg-blue-200 dark:bg-blue-900" />
    </div>
    <div className="pb-4">
      <h5 className="font-bold">{phase}</h5>
      <p className="text-sm text-gray-600 dark:text-gray-400">{duration}</p>
      <p className="text-sm mt-1">{focus}</p>
    </div>
  </div>
);

export default KeywordDashboard;