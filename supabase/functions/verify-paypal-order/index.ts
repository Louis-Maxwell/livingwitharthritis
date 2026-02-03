import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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

interface VerifyOrderRequest {
  orderId: string;
  amount: number;
  currency: string;
  fundType: string;
}

function validateRequest(data: unknown): { valid: boolean; error?: string; request?: VerifyOrderRequest } {
  if (!data || typeof data !== "object") {
    return { valid: false, error: "Invalid request body" };
  }

  const { orderId, amount, currency, fundType } = data as Record<string, unknown>;

  if (typeof orderId !== "string" || !orderId.trim()) {
    return { valid: false, error: "Order ID is required" };
  }

  // PayPal order IDs are typically alphanumeric, 17 characters
  if (!/^[A-Z0-9]{10,30}$/i.test(orderId)) {
    return { valid: false, error: "Invalid order ID format" };
  }

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

  return {
    valid: true,
    request: {
      orderId: orderId.trim(),
      amount,
      currency: currency.toUpperCase(),
      fundType,
    },
  };
}

async function getPayPalAccessToken(): Promise<string> {
  const clientId = Deno.env.get("PAYPAL_CLIENT_ID");
  const clientSecret = Deno.env.get("PAYPAL_CLIENT_SECRET");
  
  if (!clientId || !clientSecret) {
    throw new Error("PayPal credentials not configured");
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

async function verifyPayPalOrder(accessToken: string, orderId: string): Promise<any> {
  const paypalBaseUrl = Deno.env.get("PAYPAL_MODE") === "live" 
    ? "https://api-m.paypal.com" 
    : "https://api-m.sandbox.paypal.com";
  const response = await fetch(`${paypalBaseUrl}/v2/checkout/orders/${orderId}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(`PayPal order verification failed: ${data.message || "Unknown error"}`);
  }

  return data;
}

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
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

    const validation = validateRequest(requestBody);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ error: validation.error }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { orderId, amount, currency, fundType } = validation.request!;

    // Verify the order with PayPal
    const accessToken = await getPayPalAccessToken();
    const order = await verifyPayPalOrder(accessToken, orderId);

    // Validate order status
    if (order.status !== "COMPLETED") {
      return new Response(
        JSON.stringify({ error: `Order not completed. Status: ${order.status}` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate the amount and currency match
    const purchaseUnit = order.purchase_units?.[0];
    if (!purchaseUnit) {
      return new Response(
        JSON.stringify({ error: "Invalid order structure" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const orderAmount = parseFloat(purchaseUnit.amount?.value || "0");
    const orderCurrency = purchaseUnit.amount?.currency_code || "";

    // Verify amount matches (allow small floating point difference)
    if (Math.abs(orderAmount - amount) > 0.01) {
      console.error(`Amount mismatch: expected ${amount}, got ${orderAmount}`);
      return new Response(
        JSON.stringify({ error: "Amount verification failed" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Verify currency matches
    if (orderCurrency.toUpperCase() !== currency) {
      console.error(`Currency mismatch: expected ${currency}, got ${orderCurrency}`);
      return new Response(
        JSON.stringify({ error: "Currency verification failed" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Extract payer information from verified order
    const payerName = order.payer?.name?.given_name || "Anonymous";
    const payerEmail = order.payer?.email_address || null;

    // Create Supabase client with service role
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Supabase configuration missing");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check if donation already exists (prevent duplicate recording)
    const { data: existingDonation } = await supabase
      .from("donations")
      .select("id")
      .eq("payment_intent_id", orderId)
      .single();

    if (existingDonation) {
      return new Response(
        JSON.stringify({ success: true, message: "Donation already recorded", donationId: existingDonation.id }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Insert verified donation into database
    const { data: donation, error: insertError } = await supabase
      .from("donations")
      .insert({
        amount: orderAmount,
        currency: orderCurrency,
        fund_type: fundType,
        payment_intent_id: orderId,
        status: "completed",
        donor_name: payerName,
        donor_email: payerEmail,
      })
      .select("id")
      .single();

    if (insertError) {
      console.error("Failed to insert donation:", insertError);
      throw new Error("Failed to record donation");
    }

    console.log("Verified donation recorded:", donation.id);

    return new Response(
      JSON.stringify({ success: true, donationId: donation.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("PayPal order verification error:", message);
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
