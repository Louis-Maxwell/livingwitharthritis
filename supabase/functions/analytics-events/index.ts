/**
 * Analytics Events API
 * Receives and stores analytics events from client-side tracker
 */

import { serve } from 'https://deno.land/std@0.208.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') || '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
);

serve(async (req) => {
  // CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { events } = await req.json();

    if (!Array.isArray(events) || events.length === 0) {
      return new Response(JSON.stringify({ error: 'No events provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Insert events into database
    const { error } = await supabase.from('analytics_events').insert(
      events.map((event: any) => ({
        type: event.type,
        page: event.page,
        page_type: event.pageType,
        slug: event.slug,
        timestamp: event.timestamp,
        session_id: event.sessionId,
        referrer: event.referrer,
        time_on_page: event.timeOnPage,
        created_at: new Date().toISOString(),
      }))
    );

    if (error) throw error;

    // Update daily aggregates
    await updateDailyAggregates();

    return new Response(JSON.stringify({ success: true, count: events.length }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Analytics error:', error);
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
 * Update daily aggregate stats
 */
async function updateDailyAggregates() {
  const today = new Date().toISOString().split('T')[0];

  try {
    // Count events for today
    const { data: events } = await supabase
      .from('analytics_events')
      .select('type')
      .gte('created_at', `${today}T00:00:00`)
      .lt('created_at', `${today}T23:59:59`);

    const traffic = events?.length || 0;

    // Count unique keywords ranking
    const { data: keywords } = await supabase
      .from('seo_analytics')
      .select('keyword', { count: 'exact' })
      .eq('date', today)
      .neq('rank_position', null);

    const keywordCount = keywords?.length || 0;

    // Upsert daily record
    await supabase.from('analytics_daily').upsert(
      {
        date: today,
        traffic,
        keywords: keywordCount,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'date' }
    );
  } catch (error) {
    console.error('Daily aggregates error:', error);
  }
}
