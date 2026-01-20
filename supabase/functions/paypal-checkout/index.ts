import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

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

async function getPayPalAccessToken(): Promise<string> {
  const clientId = Deno.env.get("PAYPAL_CLIENT_ID");
  const clientSecret = Deno.env.get("PAYPAL_CLIENT_SECRET");
  
  if (!clientId) throw new Error("PAYPAL_CLIENT_ID is not set");
  
  // For client-side only flow, we'll return the client ID for the PayPal JS SDK
  // If you have a client secret, we can use server-side order creation
  if (!clientSecret) {
    return clientId;
  }

  const auth = btoa(`${clientId}:${clientSecret}`);
  const response = await fetch("https://api-m.paypal.com/v1/oauth2/token", {
    method: "POST",
    headers: {
      "Authorization": `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(`PayPal auth failed: ${data.error_description || "Unknown error"}`);
  }

  return data.access_token;
}

async function createPayPalOrder(accessToken: string, amount: number, currency: string, fundType: string): Promise<any> {
  const response = await fetch("https://api-m.paypal.com/v2/checkout/orders", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: currency.toUpperCase(),
            value: amount.toFixed(2),
          },
          description: `Donation - ${fundType}`,
        },
      ],
      application_context: {
        brand_name: "Living With Arthritis",
        landing_page: "BILLING",
        user_action: "PAY_NOW",
        return_url: `${Deno.env.get("SUPABASE_URL") || ""}/?donation=success`,
        cancel_url: `${Deno.env.get("SUPABASE_URL") || ""}/?donation=cancelled`,
      },
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(`PayPal order creation failed: ${JSON.stringify(data)}`);
  }

  return data;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const clientId = Deno.env.get("PAYPAL_CLIENT_ID");
    if (!clientId) throw new Error("PAYPAL_CLIENT_ID is not set");

    const { amount, currency, fundType, donorName, donorEmail }: DonationRequest = await req.json();

    // Validate amount
    if (!amount || amount < 1) {
      throw new Error("Invalid donation amount");
    }

    const clientSecret = Deno.env.get("PAYPAL_CLIENT_SECRET");
    
    // If we have client secret, create order server-side
    if (clientSecret) {
      const accessToken = await getPayPalAccessToken();
      const order = await createPayPalOrder(accessToken, amount, currency, fundType);
      
      // Find approval URL
      const approvalUrl = order.links?.find((link: any) => link.rel === "approve")?.href;
      
      return new Response(JSON.stringify({ 
        orderId: order.id,
        approvalUrl,
        clientId 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Otherwise, return client ID for client-side PayPal buttons
    return new Response(JSON.stringify({ 
      clientId,
      amount,
      currency,
      fundType,
      donorName,
      donorEmail,
      message: "Use PayPal JS SDK with the provided client ID"
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("PayPal checkout error:", message);
    return new Response(JSON.stringify({ error: message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
