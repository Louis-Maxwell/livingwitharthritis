import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface DonationRequest {
  amount: number;
  currency: string;
  fundType: string;
  donorName?: string;
  donorEmail?: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    const { amount, currency, fundType, donorName, donorEmail }: DonationRequest = await req.json();

    // Validate amount
    if (!amount || amount < 1) {
      throw new Error("Invalid donation amount");
    }

    // Convert to smallest currency unit (pence/cents)
    const amountInSmallestUnit = Math.round(amount * 100);

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    // Create checkout session with dynamic price_data for donations
    const session = await stripe.checkout.sessions.create({
      customer_email: donorEmail || undefined,
      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: {
              name: `Donation - ${fundType}`,
              description: `Thank you for your generous donation to ${fundType}`,
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
        fundType,
        donorName: donorName || "Anonymous",
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
