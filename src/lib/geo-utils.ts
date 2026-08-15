/**
 * Geographic targeting utilities
 * Provides geo-targeting meta tags and schema data
 */

export const GEO_CONFIG = {
  region: 'GB',
  country: 'United Kingdom',
  // UK geographic center (approximate)
  latitude: 54.5973,
  longitude: -3.436,
  // UK bounding box (rough)
  boundingBox: {
    north: 55.811741,
    south: 49.674957,
    east: 1.681531,
    west: -6.362801,
  },
  language: 'en-GB',
  currency: 'GBP',
  timezone: 'Europe/London',
};

// Generate geo meta tags
export const getGeoMetaTags = () => {
  return {
    'geo.placename': GEO_CONFIG.country,
    'geo.region': `GB-${GEO_CONFIG.region}`,
    'geo.position': `${GEO_CONFIG.latitude};${GEO_CONFIG.longitude}`,
    'ICBM': `${GEO_CONFIG.latitude}, ${GEO_CONFIG.longitude}`,
  };
};

// Generate geo schema for Organization
export const getGeoOrganizationSchema = (baseUrl: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Living With Arthritis UK',
    url: baseUrl,
    areaServed: {
      '@type': 'Country',
      name: GEO_CONFIG.country,
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: GEO_CONFIG.region,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Support',
      availableLanguage: [GEO_CONFIG.language],
    },
    geo: {
      '@type': 'Place',
      name: GEO_CONFIG.country,
      geo: {
        '@type': 'GeoShape',
        box: `${GEO_CONFIG.boundingBox.south} ${GEO_CONFIG.boundingBox.west} ${GEO_CONFIG.boundingBox.north} ${GEO_CONFIG.boundingBox.east}`,
      },
    },
  };
};

// Generate hreflang tags for regional variations
export const getHrefLangTags = (currentPath: string, baseUrl: string = 'https://livingwitharthritis.org.uk') => {
  return [
    {
      rel: 'alternate',
      hrefLang: 'en-GB',
      href: `${baseUrl}${currentPath}`,
    },
    {
      rel: 'alternate',
      hrefLang: 'en',
      href: `${baseUrl}${currentPath}`,
    },
    {
      rel: 'canonical',
      href: `${baseUrl}${currentPath}`,
    },
  ];
};

// Check if user is in UK (basic geo-location based on timezone)
export const isLikelyInUK = (): boolean => {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // Europe/London is the primary UK timezone
    // Europe/Belfast is alternate for Northern Ireland
    return timezone === 'Europe/London' || timezone === 'Europe/Belfast';
  } catch {
    return false;
  }
};

// Get user's country from IP (requires backend call)
export const getUserCountry = async (): Promise<string | null> => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return data.country_code || null;
  } catch {
    return null;
  }
};

// Generate geo-specific content variation
export const getGeoContentVariation = (country: string) => {
  const variations: Record<string, { currency: string; language: string; contactEmail: string }> = {
    GB: {
      currency: '£',
      language: 'en-GB',
      contactEmail: 'info@livingwitharthritis.org.uk',
    },
    IE: {
      currency: '€',
      language: 'en-IE',
      contactEmail: 'info@livingwitharthritis.org.uk',
    },
    // Default to UK for others
    DEFAULT: {
      currency: '£',
      language: 'en-GB',
      contactEmail: 'info@livingwitharthritis.org.uk',
    },
  };

  return variations[country] || variations.DEFAULT;
};

// Generate local business schema (if applicable)
export const getLocalBusinessSchema = (baseUrl: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Living With Arthritis UK',
    url: baseUrl,
    areaServed: 'GB',
    serviceArea: {
      '@type': 'Country',
      name: 'United Kingdom',
    },
  };
};

// Geo-targeted metadata
export const getGeoPageMetadata = (pageTitle: string, pageDescription: string) => {
  return {
    title: `${pageTitle} | Living With Arthritis UK`,
    description: pageDescription,
    openGraph: {
      type: 'website',
      locale: GEO_CONFIG.language,
      site_name: 'Living With Arthritis UK',
    },
    twitter: {
      card: 'summary_large_image',
    },
  };
};
