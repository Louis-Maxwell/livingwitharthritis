import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const ALLOWED_ORIGINS = [
  "https://id-preview--0b2fd6ca-4e21-4ac7-99fa-d741e996f45e.lovable.app",
  "https://livingwitharthritis.org.uk",
  "https://www.livingwitharthritis.org.uk",
  "http://localhost:8080",
  "http://localhost:5173",
  "http://localhost:3000",
];

function getCorsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get("Origin") || "";
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };
}

// Input validation
const VALID_CURRENCIES = ["GBP", "USD", "EUR"];
const VALID_FUND_TYPES = ["research", "support", "helpline", "general"];
const MAX_AMOUNT = 100000;
const MIN_AMOUNT = 1;

interface DonationRequest {
  amount: number;
  currency: string;
  fundType: string;
  donorName?: string;
  donorEmail?: string;
}

function validateDonation(data: unknown): { valid: boolean; error?: string; donation?: DonationRequest } {
  if (!data || typeof data !== "object") {
    return { valid: false, error: "Invalid request body" };
  }

  const { amount, currency, fundType, donorName, donorEmail } = data as Record<string, unknown>;

  if (typeof amount !== "number" || isNaN(amount)) {
    return { valid: false, error: "Amount must be a valid number" };
  }

  if (amount < MIN_AMOUNT || amount > MAX_AMOUNT) {
    return { valid: false, error: `Amount must be between ${MIN_AMOUNT} and ${MAX_AMOUNT}` };
  }

  if (typeof currency !== "string" || !VALID_CURRENCIES.includes(currency.toUpperCase())) {
    return { valid: false, error: "Invalid currency. Allowed: GBP, USD, EUR" };
  }

  if (typeof fundType !== "string" || !VALID_FUND_TYPES.includes(fundType)) {
    return { valid: false, error: "Invalid fund type" };
  }

  if (donorName !== undefined && (typeof donorName !== "string" || donorName.length > 100)) {
    return { valid: false, error: "Invalid donor name" };
  }

  if (donorEmail !== undefined && typeof donorEmail === "string") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(donorEmail) || donorEmail.length > 255) {
      return { valid: false, error: "Invalid email address" };
    }
  }

  return {
    valid: true,
    donation: {
      amount,
      currency: (currency as string).toUpperCase(),
      fundType: fundType as string,
      donorName: donorName as string | undefined,
      donorEmail: donorEmail as string | undefined,
    },
  };
}

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    // Parse and validate request body
    let requestBody: unknown;
    try {
      requestBody = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid JSON in request body" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const validation = validateDonation(requestBody);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ error: validation.error }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { donation } = validation;

    // Convert to smallest currency unit (pence/cents)
    const amountInSmallestUnit = Math.round(donation!.amount * 100);

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    // Create checkout session with dynamic price_data for donations
    const session = await stripe.checkout.sessions.create({
      customer_email: donation!.donorEmail || undefined,
      line_items: [
        {
          price_data: {
            currency: donation!.currency.toLowerCase(),
            product_data: {
              name: `Donation - ${donation!.fundType}`,
              description: `Thank you for your generous donation to ${donation!.fundType}`,
            },
            unit_amount: amountInSmallestUnit,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/?donation=success`,
      cancel_url: `${req.headers.get("origin")}/?donation=cancelled`,
      metadata: {
        fundType: donation!.fundType,
        donorName: donation!.donorName || "Anonymous",
      },
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Donation checkout error:", message);
    return new Response(JSON.stringify({ error: message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
