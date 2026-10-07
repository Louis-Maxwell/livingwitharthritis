import { z } from "https://esm.sh/zod@3.23.8";
import { createStripeClient } from "../_shared/stripe.ts";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const FUNDS: Record<string, string> = {
  research: "Arthritis Research Fund",
  support: "Patient Support Fund",
  helpline: "Helpline Support",
  zakat: "Palestine & Gaza Appeal (Zakat/Sadaqah)",
  general: "General Donation",
};

const ALLOWED_HOST =
  /^((www\.)?livingwitharthritis\.org\.uk|.+\.lovable\.app|.+\.lovableproject\.com|localhost)$/;

const Body = z.object({
  amount: z.number().min(1).max(10000),
  currency: z.enum(["GBP", "USD", "EUR"]).default("GBP"),
  fundType: z.string().default("general"),
  recurring: z.boolean().default(false),
  returnUrl: z.string().url(),
  environment: z.enum(["sandbox", "live"]),
});

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);

  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return json({ error: "invalid_request" }, 400);
  const b = parsed.data;

  if (!ALLOWED_HOST.test(new URL(b.returnUrl).hostname)) {
    return json({ error: "invalid_return_url" }, 400);
  }

  const fundKey = FUNDS[b.fundType] ? b.fundType : "general";
  const fundLabel = FUNDS[fundKey];
  const name = `${b.recurring ? "Monthly donation" : "Donation"}: ${fundLabel}`;
  const metadata = { fund: fundKey, fund_label: fundLabel };

  try {
    const stripe = createStripeClient(b.environment);
    const session = await stripe.checkout.sessions.create({
      line_items: [{
        price_data: {
          currency: b.currency.toLowerCase(),
          product_data: { name },
          unit_amount: Math.round(b.amount * 100),
          ...(b.recurring && { recurring: { interval: "month" as const } }),
        },
        quantity: 1,
      }],
      mode: b.recurring ? "subscription" : "payment",
      ui_mode: "embedded_page",
      return_url: b.returnUrl,
      metadata,
      ...(b.recurring
        ? { subscription_data: { metadata, description: name } }
        : { payment_intent_data: { description: name, metadata } }),
    });
    return json({ clientSecret: session.client_secret });
  } catch (e) {
    console.error("create-donation-checkout failed", e);
    return json({ error: "checkout_failed" }, 502);
  }
});
