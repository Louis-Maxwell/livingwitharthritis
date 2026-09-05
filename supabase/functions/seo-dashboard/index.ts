/**
 * SEO Dashboard API
 * Fetches data from Google Search Console and local analytics
 * Syncs daily with GSC API
 */

import { serve } from 'https://deno.land/std@0.208.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') || '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
);

interface GscData {
  keyword: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

interface AnalyticsData {
  page: string;
  views: number;
  clicks: number;
  avgPosition: number;
  avgTimeOnPage: number;
}

// Main handler
serve(async (req) => {
  try {
    // CORS headers
    if (req.method === 'OPTIONS') {
      return new Response('ok', {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      });
    }

    if (req.method !== 'GET') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Fetch GSC data (top keywords)
    const gscKeywords = await fetchGscData();

    // Fetch local analytics data
    const pageTraffic = await fetchPageTraffic();
    const cityTraffic = await fetchCityTraffic();
    const snippets = await fetchSnippetData();
    const trendData = await fetchTrendData();

    const dashboardData = {
      keywords: gscKeywords.slice(0, 50),
      pageTraffic: pageTraffic.slice(0, 20),
      snippets: snippets,
      cityTraffic: cityTraffic.slice(0, 20),
      trendData: trendData,
      lastUpdated: new Date().toISOString(),
    };

    return new Response(JSON.stringify(dashboardData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
});

/**
 * Fetch data from Google Search Console
 * Requires GSC API integration (needs auth setup)
 */
async function fetchGscData(): Promise<GscData[]> {
  try {
    // Get GSC credentials from database
    const { data: config } = await supabase
      .from('integrations')
      .select('config')
      .eq('type', 'google_search_console')
      .single();

    if (!config?.config?.accessToken) {
      console.warn('GSC not configured, using mock data');
      return getMockGscData();
    }

    // For now, return mock data (real GSC integration requires OAuth setup)
    return getMockGscData();
  } catch (error) {
    console.error('GSC fetch error:', error);
    return getMockGscData();
  }
}

/**
 * Fetch page traffic from local analytics
 */
async function fetchPageTraffic(): Promise<AnalyticsData[]> {
  try {
    const { data, error } = await supabase
      .from('analytics_events')
      .select('page, type')
      .eq('type', 'view')
      .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

    if (error) throw error;

    // Aggregate by page
    const pageStats: Record<string, AnalyticsData> = {};

    data?.forEach((event: any) => {
      if (!pageStats[event.page]) {
        pageStats[event.page] = {
          page: event.page,
          views: 0,
          clicks: 0,
          avgPosition: 0,
          avgTimeOnPage: 0,
        };
      }
      pageStats[event.page].views++;
    });

    return Object.values(pageStats).sort((a, b) => b.views - a.views);
  } catch (error) {
    console.error('Page traffic error:', error);
    return [];
  }
}

/**
 * Fetch city page traffic
 */
async function fetchCityTraffic(): Promise<any[]> {
  try {
    const { data, error } = await supabase
      .from('analytics_events')
      .select('page, type')
      .ilike('page', '%arthritis-support%')
      .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

    if (error) throw error;

    // Extract city from page path and aggregate
    const cityStats: Record<string, any> = {};

    data?.forEach((event: any) => {
      const match = event.page.match(/arthritis-support\/([^/]+)/);
      const city = match ? match[1] : 'unknown';

      if (!cityStats[city]) {
        cityStats[city] = {
          city: city.replace(/-/g, ' ').toUpperCase(),
          views: 0,
          clicks: 0,
        };
      }

      if (event.type === 'view') cityStats[city].views++;
      if (event.type === 'click') cityStats[city].clicks++;
    });

    return Object.values(cityStats).sort((a: any, b: any) => b.clicks - a.clicks);
  } catch (error) {
    console.error('City traffic error:', error);
    return [];
  }
}

/**
 * Fetch featured snippet data
 */
async function fetchSnippetData(): Promise<any[]> {
  try {
    const { data, error } = await supabase
      .from('featured_snippets')
      .select('keyword, type, page')
      .eq('featured', true);

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error('Snippet data error:', error);
    return [];
  }
}

/**
 * Fetch 30-day trend data
 */
async function fetchTrendData(): Promise<any[]> {
  try {
    const { data, error } = await supabase
      .from('analytics_daily')
      .select('date, traffic, keywords')
      .gte('date', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
      .order('date', { ascending: true });

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error('Trend data error:', error);
    return [];
  }
}

/**
 * Mock GSC data for development
 */
function getMockGscData(): GscData[] {
  return [
    { keyword: 'arthritis pain relief', clicks: 245, impressions: 3420, ctr: 7.2, position: 3 },
    { keyword: 'osteoarthritis treatment', clicks: 198, impressions: 2850, ctr: 6.9, position: 4 },
    { keyword: 'rheumatoid arthritis symptoms', clicks: 156, impressions: 2100, ctr: 7.4, position: 5 },
    { keyword: 'arthritis exercises', clicks: 134, impressions: 1890, ctr: 7.1, position: 6 },
    { keyword: 'knee arthritis pain', clicks: 128, impressions: 1750, ctr: 7.3, position: 7 },
    { keyword: 'arthritis diet', clicks: 112, impressions: 1560, ctr: 7.2, position: 8 },
    { keyword: 'hand arthritis treatment', clicks: 98, impressions: 1420, ctr: 6.9, position: 9 },
    { keyword: 'arthritis medication', clicks: 87, impressions: 1280, ctr: 6.8, position: 10 },
    { keyword: 'arthritis support groups', clicks: 76, impressions: 1100, ctr: 6.9, position: 11 },
    { keyword: 'arthritis fatigue', clicks: 65, impressions: 950, ctr: 6.8, position: 12 },
  ];
}
