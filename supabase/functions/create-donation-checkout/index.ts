import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { z } from 'npm:zod@3.23.8';
import { createStripeClient } from '../_shared/stripe.ts';

const FUND_LABELS: Record<string, string> = {
  research: 'Arthritis Research Fund',
  support: 'Patient Support Fund',
  helpline: 'Helpline Support',
  zakat: 'Zakat Appeal',
  general: 'General Donation',
};

const ALLOWED_RETURN_HOST = /^(www\.)?livingwitharthritis\.org\.uk$|\.lovable\.app$|\.lovableproject\.com$|^localhost$/;

const BodySchema = z.object({
  amount: z.number().min(1).max(10000),
  currency: z.enum(['GBP', 'USD', 'EUR']),
  fundType: z.string().max(40),
  recurring: z.boolean().default(false),
  giftAid: z.boolean().default(false),
  returnUrl: z.string().url().max(500),
  environment: z.enum(['sandbox', 'live']),
});

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return json({ error: 'Invalid JSON' }, 400);
  }
  const parsed = BodySchema.safeParse(raw);
  if (!parsed.success) return json({ error: parsed.error.flatten().fieldErrors }, 400);
  const { amount, currency, fundType, recurring, giftAid, returnUrl, environment } = parsed.data;

  const host = new URL(returnUrl).hostname;
  if (!ALLOWED_RETURN_HOST.test(host)) return json({ error: 'Invalid return URL' }, 400);

  const fundLabel = FUND_LABELS[fundType] ?? FUND_LABELS.general;
  const name = recurring ? `Monthly donation – ${fundLabel}` : `Donation – ${fundLabel}`;
  const metadata = {
    fund: fundType,
    fund_label: fundLabel,
    gift_aid: giftAid ? 'yes' : 'no',
    recurring: recurring ? 'yes' : 'no',
  };

  try {
    const stripe = createStripeClient(environment);
    const session = await stripe.checkout.sessions.create({
      line_items: [{
        price_data: {
          currency: currency.toLowerCase(),
          product_data: { name },
          unit_amount: Math.round(amount * 100),
          ...(recurring && { recurring: { interval: 'month' as const } }),
        },
        quantity: 1,
      }],
      mode: recurring ? 'subscription' : 'payment',
      ui_mode: 'embedded_page',
      return_url: returnUrl,
      submit_type: recurring ? undefined : 'donate',
      metadata,
      ...(recurring
        ? { subscription_data: { metadata, description: name } }
        : { payment_intent_data: { description: name, metadata } }),
    });
    return json({ clientSecret: session.client_secret });
  } catch (e) {
    console.error('create-donation-checkout error', e);
    return json({ error: 'Could not start checkout' }, 500);
  }
});
