/**
 * Advanced Sitemap Generator
 * Creates optimized sitemaps with priorities, frequencies, and last modified dates
 */

import blogSlugs from '../data/blog-slugs.generated.json';

export interface SitemapPage {
  url: string;
  lastModified?: string;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number; // 0.0 to 1.0
  category: string;
  audioUrl?: string; // Optional audio file URL for the page
}

/**
 * Enhanced site pages with metadata
 */
export const ENHANCED_SITE_PAGES: SitemapPage[] = [
  // Critical pages - high priority, frequent updates
  {
    url: 'https://livingwitharthritis.org.uk/',
    changeFrequency: 'daily',
    priority: 1.0,
    category: 'home',
  },
  {
    url: 'https://livingwitharthritis.org.uk/about',
    changeFrequency: 'monthly',
    priority: 0.8,
    category: 'core',
  },
  {
    url: 'https://livingwitharthritis.org.uk/contact',
    changeFrequency: 'weekly',
    priority: 0.9,
    category: 'core',
  },
  {
    url: 'https://livingwitharthritis.org.uk/blog',
    changeFrequency: 'daily',
    priority: 0.9,
    category: 'content',
  },
  {
    url: 'https://livingwitharthritis.org.uk/chat',
    changeFrequency: 'weekly',
    priority: 0.85,
    category: 'tools',
  },

  // Main hubs - high priority
  {
    url: 'https://livingwitharthritis.org.uk/exercises',
    changeFrequency: 'weekly',
    priority: 0.9,
    category: 'hub',
  },
  {
    url: 'https://livingwitharthritis.org.uk/diet',
    changeFrequency: 'weekly',
    priority: 0.9,
    category: 'hub',
  },
  {
    url: 'https://livingwitharthritis.org.uk/community',
    changeFrequency: 'daily',
    priority: 0.85,
    category: 'community',
  },

  // Conditions - medium-high priority
  {
    url: 'https://livingwitharthritis.org.uk/conditions/osteoarthritis',
    changeFrequency: 'monthly',
    priority: 0.8,
    category: 'conditions',
  },
  {
    url: 'https://livingwitharthritis.org.uk/conditions/rheumatoid-arthritis',
    changeFrequency: 'monthly',
    priority: 0.8,
    category: 'conditions',
  },
  {
    url: 'https://livingwitharthritis.org.uk/conditions/psoriatic-arthritis',
    changeFrequency: 'monthly',
    priority: 0.75,
    category: 'conditions',
  },
  {
    url: 'https://livingwitharthritis.org.uk/conditions/gout',
    changeFrequency: 'monthly',
    priority: 0.75,
    category: 'conditions',
  },
  {
    url: 'https://livingwitharthritis.org.uk/conditions/fibromyalgia',
    changeFrequency: 'monthly',
    priority: 0.75,
    category: 'conditions',
  },
  {
    url: 'https://livingwitharthritis.org.uk/conditions/lupus',
    changeFrequency: 'monthly',
    priority: 0.7,
    category: 'conditions',
  },
  {
    url: 'https://livingwitharthritis.org.uk/conditions/ankylosing-spondylitis',
    changeFrequency: 'monthly',
    priority: 0.7,
    category: 'conditions',
  },
  {
    url: 'https://livingwitharthritis.org.uk/conditions/juvenile-arthritis',
    changeFrequency: 'monthly',
    priority: 0.7,
    category: 'conditions',
  },

  // Joint-specific - medium priority
  {
    url: 'https://livingwitharthritis.org.uk/conditions/knee-arthritis',
    changeFrequency: 'monthly',
    priority: 0.8,
    category: 'joints',
  },
  {
    url: 'https://livingwitharthritis.org.uk/conditions/hand-arthritis',
    changeFrequency: 'monthly',
    priority: 0.75,
    category: 'joints',
  },
  {
    url: 'https://livingwitharthritis.org.uk/conditions/shoulder-arthritis',
    changeFrequency: 'monthly',
    priority: 0.75,
    category: 'joints',
  },
  {
    url: 'https://livingwitharthritis.org.uk/conditions/hip-arthritis',
    changeFrequency: 'monthly',
    priority: 0.75,
    category: 'joints',
  },

  // Exercises - high priority
  {
    url: 'https://livingwitharthritis.org.uk/exercises/tai-chi-for-arthritis',
    changeFrequency: 'monthly',
    priority: 0.85,
    category: 'exercises',
  },
  {
    url: 'https://livingwitharthritis.org.uk/exercises/tai-chi-for-balance',
    changeFrequency: 'monthly',
    priority: 0.8,
    category: 'exercises',
  },
  {
    url: 'https://livingwitharthritis.org.uk/exercises/tai-chi-for-beginners',
    changeFrequency: 'monthly',
    priority: 0.8,
    category: 'exercises',
  },
  {
    url: 'https://livingwitharthritis.org.uk/guides/knee-exercises-for-osteoarthritis',
    changeFrequency: 'monthly',
    priority: 0.85,
    category: 'blog',
  },

  // Guides - medium-high priority
  {
    url: 'https://livingwitharthritis.org.uk/guides/exercise',
    changeFrequency: 'monthly',
    priority: 0.8,
    category: 'guides',
  },
  {
    url: 'https://livingwitharthritis.org.uk/guides/diet',
    changeFrequency: 'monthly',
    priority: 0.8,
    category: 'guides',
  },
  {
    url: 'https://livingwitharthritis.org.uk/guides/uk-arthritis',
    changeFrequency: 'monthly',
    priority: 0.8,
    category: 'guides',
  },
  {
    url: 'https://livingwitharthritis.org.uk/guides/health-services',
    changeFrequency: 'monthly',
    priority: 0.75,
    category: 'guides',
  },
  {
    url: 'https://livingwitharthritis.org.uk/guides/benefits-pip',
    changeFrequency: 'monthly',
    priority: 0.75,
    category: 'guides',
  },
  {
    url: 'https://livingwitharthritis.org.uk/guides/newly-diagnosed',
    changeFrequency: 'monthly',
    priority: 0.85,
    category: 'guides',
  },

  // Diet & Supplements - medium priority
  {
    url: 'https://livingwitharthritis.org.uk/diet/mediterranean-diet-for-arthritis',
    changeFrequency: 'monthly',
    priority: 0.8,
    category: 'diet',
  },
  {
    url: 'https://livingwitharthritis.org.uk/supplements',
    changeFrequency: 'monthly',
    priority: 0.75,
    category: 'supplements',
  },

  // Support & Community - medium priority
  {
    url: 'https://livingwitharthritis.org.uk/buddy',
    changeFrequency: 'weekly',
    priority: 0.75,
    category: 'support',
  },
  {
    url: 'https://livingwitharthritis.org.uk/arthritis-support',
    changeFrequency: 'weekly',
    priority: 0.75,
    category: 'support',
  },
  {
    url: 'https://livingwitharthritis.org.uk/stories',
    changeFrequency: 'weekly',
    priority: 0.7,
    category: 'stories',
  },

  // Info & Policies - lower priority
  {
    url: 'https://livingwitharthritis.org.uk/about-us',
    changeFrequency: 'monthly',
    priority: 0.6,
    category: 'info',
  },
  {
    url: 'https://livingwitharthritis.org.uk/trust',
    changeFrequency: 'monthly',
    priority: 0.6,
    category: 'info',
  },
  {
    url: 'https://livingwitharthritis.org.uk/governance',
    changeFrequency: 'yearly',
    priority: 0.5,
    category: 'info',
  },
  {
    url: 'https://livingwitharthritis.org.uk/privacy',
    changeFrequency: 'yearly',
    priority: 0.5,
    category: 'legal',
  },
  {
    url: 'https://livingwitharthritis.org.uk/cookies',
    changeFrequency: 'yearly',
    priority: 0.5,
    category: 'legal',
  },
  {
    url: 'https://livingwitharthritis.org.uk/terms',
    changeFrequency: 'yearly',
    priority: 0.5,
    category: 'legal',
  },
  {
    url: 'https://livingwitharthritis.org.uk/accessibility',
    changeFrequency: 'yearly',
    priority: 0.6,
    category: 'legal',
  },

  // Donate & Support
  {
    url: 'https://livingwitharthritis.org.uk/donate',
    changeFrequency: 'weekly',
    priority: 0.8,
    category: 'donate',
  },
  {
    url: 'https://livingwitharthritis.org.uk/ways-to-help',
    changeFrequency: 'monthly',
    priority: 0.75,
    category: 'donate',
  },

  // AI & Transparency
  {
    url: 'https://livingwitharthritis.org.uk/ai',
    changeFrequency: 'monthly',
    priority: 0.7,
    category: 'ai',
  },
  {
    url: 'https://livingwitharthritis.org.uk/about/ai-transparency',
    changeFrequency: 'monthly',
    priority: 0.7,
    category: 'ai',
  },
  {
    url: 'https://livingwitharthritis.org.uk/sources',
    changeFrequency: 'monthly',
    priority: 0.6,
    category: 'ai',
  },

  // Misc Pages - lower priority
  {
    url: 'https://livingwitharthritis.org.uk/arthritis-flare-ups',
    changeFrequency: 'monthly',
    priority: 0.7,
    category: 'guides',
  },
  {
    url: 'https://livingwitharthritis.org.uk/faq',
    changeFrequency: 'weekly',
    priority: 0.7,
    category: 'info',
  },
  {
    url: 'https://livingwitharthritis.org.uk/health-tools',
    changeFrequency: 'monthly',
    priority: 0.7,
    category: 'tools',
  },
  {
    url: 'https://livingwitharthritis.org.uk/symptom-checker',
    changeFrequency: 'monthly',
    priority: 0.75,
    category: 'tools',
  },
  {
    url: 'https://livingwitharthritis.org.uk/self-help',
    changeFrequency: 'monthly',
    priority: 0.7,
    category: 'tools',
  },
];

/**
 * Generate blog post sitemap entries with audio URLs
 * Each blog post can have an optional audio file for the listening experience
 */
export const generateBlogPostEntries = (): SitemapPage[] => {
  return blogSlugs.map((slug: string) => ({
    url: `https://livingwitharthritis.org.uk/blog/${slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
    category: 'blog',
    audioUrl: `https://livingwitharthritis.org.uk/audio/blog/${slug}.mp3`, // Audio file URL for the blog post
  }));
};

/**
 * Generate XML sitemap with audio support
 * Includes both static pages and blog posts with audio files
 */
export const generateSitemapXML = (): string => {
  const today = new Date().toISOString().split('T')[0];

  // Combine static pages and blog post entries
  const allPages = [...ENHANCED_SITE_PAGES, ...generateBlogPostEntries()];

  const urlEntries = allPages.map(page => {
    const changeFreq = page.changeFrequency || 'monthly';
    const priority = page.priority || 0.5;
    const lastMod = page.lastModified || today;

    let audioEntry = '';
    if (page.audioUrl) {
      const fileName = page.audioUrl.split('/').pop() || 'audio';
      audioEntry = `
    <media:content url="${escapeXml(page.audioUrl)}" type="audio/mpeg">
      <media:title type="plain">${escapeXml(fileName)}</media:title>
    </media:content>`;
    }

    return `  <url>
    <loc>${page.url}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>${changeFreq}</changefreq>
    <priority>${priority.toFixed(2)}</priority>${audioEntry}
  </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:media="http://search.google.com/schemas/sitemap-media/1.0">
${urlEntries.join('\n')}
</urlset>`;
};

/**
 * Generate sitemap index (for multiple sitemaps)
 */
export const generateSitemapIndex = (): string => {
  const sitemaps = [
    'https://livingwitharthritis.org.uk/sitemap.xml',
    'https://livingwitharthritis.org.uk/sitemap-es.xml',
    'https://livingwitharthritis.org.uk/sitemap-fr.xml',
    'https://livingwitharthritis.org.uk/sitemap-de.xml',
    'https://livingwitharthritis.org.uk/sitemap-pt.xml',
  ];

  const today = new Date().toISOString().split('T')[0];

  const sitemapEntries = sitemaps
    .map(
      sitemap => `  <sitemap>
    <loc>${sitemap}</loc>
    <lastmod>${today}</lastmod>
  </sitemap>`,
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</sitemapindex>`;
};

/**
 * Generate sitemap with images (if you have image URLs)
 */
export const generateSitemapWithImages = (
  pageImages: Map<string, string[]>,
): string => {
  const today = new Date().toISOString().split('T')[0];

  const urlEntries = ENHANCED_SITE_PAGES.map(page => {
    const images = pageImages.get(page.url) || [];
    const imageEntries = images
      .map(
        imgUrl => `    <image:image>
      <image:loc>${imgUrl}</image:loc>
    </image:image>`,
      )
      .join('\n');

    const changeFreq = page.changeFrequency || 'monthly';
    const priority = page.priority || 0.5;

    return `  <url>
    <loc>${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changeFreq}</changefreq>
    <priority>${priority.toFixed(2)}</priority>
${imageEntries ? `\n${imageEntries}\n  ` : '  '}
  </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlEntries.join('\n')}
</urlset>`;
};

/**
 * Get page statistics
 */
export const getSitemapStats = () => {
  const stats = {
    totalPages: ENHANCED_SITE_PAGES.length,
    byCategory: {} as Record<string, number>,
    byPriority: {
      high: 0, // >= 0.8
      medium: 0, // 0.6-0.79
      low: 0, // < 0.6
    },
    byChangeFrequency: {} as Record<string, number>,
    averagePriority: 0,
  };

  let totalPriority = 0;

  ENHANCED_SITE_PAGES.forEach(page => {
    // By category
    stats.byCategory[page.category] = (stats.byCategory[page.category] || 0) + 1;

    // By priority
    const priority = page.priority || 0.5;
    if (priority >= 0.8) stats.byPriority.high++;
    else if (priority >= 0.6) stats.byPriority.medium++;
    else stats.byPriority.low++;

    // By change frequency
    const freq = page.changeFrequency || 'monthly';
    stats.byChangeFrequency[freq] = (stats.byChangeFrequency[freq] || 0) + 1;

    // Average priority
    totalPriority += priority;
  });

  stats.averagePriority = parseFloat((totalPriority / ENHANCED_SITE_PAGES.length).toFixed(2));

  return stats;
};

/**
 * Log sitemap information
 */
export const logSitemapInfo = (): void => {
  const stats = getSitemapStats();

  console.group('📋 Sitemap Information');

  console.log('\n📊 Pages by Category:');
  console.table(stats.byCategory);

  console.log('\n⭐ Pages by Priority:');
  console.table(stats.byPriority);

  console.log('\n🔄 Pages by Update Frequency:');
  console.table(stats.byChangeFrequency);

  console.log(`\n📈 Statistics:`);
  console.table({
    'Total Pages': stats.totalPages,
    'Average Priority': stats.averagePriority,
    'High Priority Pages': stats.byPriority.high,
    'Medium Priority Pages': stats.byPriority.medium,
    'Low Priority Pages': stats.byPriority.low,
  });

  console.groupEnd();
};

/**
 * Export sitemap as file
 */
export const exportSitemap = (): void => {
  if (typeof window === 'undefined') return;

  const xml = generateSitemapXML();
  const blob = new Blob([xml], { type: 'application/xml' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'sitemap.xml';
  link.click();
  window.URL.revokeObjectURL(url);

  console.log('[Sitemap] Exported sitemap.xml');
};

/**
 * Escape special XML characters
 */
function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Initialize sitemap system
 */
export const initSitemapGenerator = (): void => {
  if (import.meta.env.MODE === 'development') {
    console.log('[Sitemap] System initialized');
    console.log(`[Sitemap] ${ENHANCED_SITE_PAGES.length} pages with optimized priorities`);
    console.log('[Sitemap] Available functions:');
    console.log('  - generateSitemapXML()');
    console.log('  - generateSitemapIndex()');
    console.log('  - getSitemapStats()');
    console.log('  - logSitemapInfo()');
  }
};
