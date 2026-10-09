import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { z } from "npm:zod@3.23.8";
import { createStripeClient } from "../_shared/stripe.ts";

const FUND_LABELS: Record<string, string> = {
  research: "Arthritis Research Fund",
  general: "Most Needed Now",
  support: "Patient Support Fund",
  helpline: "Helpline Support",
  zakat: "Zakat – Palestine & Gaza appeal only",
};

const ALLOWED_HOSTS = [
  "livingwitharthritis.org.uk",
  "www.livingwitharthritis.org.uk",
  "livingwitharthritis.lovable.app",
  "localhost",
];

const Body = z.object({
  amount: z.number().min(1).max(20000),
  recurring: z.boolean().default(false),
  fundType: z.enum(["research", "general", "support", "helpline", "zakat"]).default("general"),
  giftAid: z.boolean().default(false),
  returnUrl: z.string().url(),
  environment: z.enum(["sandbox", "live"]),
});

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  try {
    const parsed = Body.safeParse(await req.json());
    if (!parsed.success) return json({ error: parsed.error.flatten().fieldErrors }, 400);
    const { amount, recurring, fundType, giftAid, returnUrl, environment } = parsed.data;

    const host = new URL(returnUrl).hostname;
    const hostOk = ALLOWED_HOSTS.includes(host) || host.endsWith(".lovable.app") ||
      host.endsWith(".lovableproject.com");
    if (!hostOk) return json({ error: "Invalid return address" }, 400);

    const fundLabel = FUND_LABELS[fundType];
    const name = `${recurring ? "Monthly donation" : "Donation"} – ${fundLabel}`;
    const metadata = { fund: fundType, gift_aid: giftAid ? "yes" : "no" };
    const stripe = createStripeClient(environment);

    const session = await stripe.checkout.sessions.create({
      line_items: [{
        price_data: {
          currency: "gbp",
          product_data: { name },
          unit_amount: Math.round(amount * 100),
          ...(recurring && { recurring: { interval: "month" as const } }),
        },
        quantity: 1,
      }],
      mode: recurring ? "subscription" : "payment",
      ui_mode: "embedded_page",
      return_url: returnUrl,
      metadata,
      ...(recurring
        ? { subscription_data: { metadata, description: name } }
        : { payment_intent_data: { description: name, metadata } }),
    });

    return json({ clientSecret: session.client_secret });
  } catch (err) {
    console.error("create-donation-checkout failed", err);
    return json({ error: err instanceof Error ? err.message : "Checkout failed" }, 500);
  }
});
