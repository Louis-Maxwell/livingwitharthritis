import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const ALLOWED_ORIGINS = [
  "https://id-preview--0b2fd6ca-4e21-4ac7-99fa-d741e996f45e.lovable.app",
  "https://0b2fd6ca-4e21-4ac7-99fa-d741e996f45e.lovableproject.com",
  "https://livingwitharthritis.lovable.app",
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
  // Use sandbox for testing, production for live
  const paypalBaseUrl = Deno.env.get("PAYPAL_MODE") === "live" 
    ? "https://api-m.paypal.com" 
    : "https://api-m.sandbox.paypal.com";
  const response = await fetch(`${paypalBaseUrl}/v1/oauth2/token`, {
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
  const paypalBaseUrl = Deno.env.get("PAYPAL_MODE") === "live" 
    ? "https://api-m.paypal.com" 
    : "https://api-m.sandbox.paypal.com";
  const response = await fetch(`${paypalBaseUrl}/v2/checkout/orders`, {
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
  const corsHeaders = getCorsHeaders(req);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const clientId = Deno.env.get("PAYPAL_CLIENT_ID");
    if (!clientId) throw new Error("PAYPAL_CLIENT_ID is not set");

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

    const clientSecret = Deno.env.get("PAYPAL_CLIENT_SECRET");
    
    // If we have client secret, create order server-side
    if (clientSecret) {
      const accessToken = await getPayPalAccessToken();
      const order = await createPayPalOrder(accessToken, donation!.amount, donation!.currency, donation!.fundType);
      
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
      amount: donation!.amount,
      currency: donation!.currency,
      fundType: donation!.fundType,
      donorName: donation!.donorName,
      donorEmail: donation!.donorEmail,
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
