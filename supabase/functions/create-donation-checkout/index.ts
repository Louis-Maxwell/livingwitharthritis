import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createRateLimiter, getClientIp } from "../_shared/rate-limiter.ts";
import { errJson, okJson, parseJsonBody, preflight, newRequestId } from "../_shared/http.ts";
import { z, parseWithSchema, emailSchema } from "../_shared/validation.ts";

// 20 checkout sessions per IP per 10 minutes (allow donors to retry / change amount)
const limiter = createRateLimiter({ windowMs: 600_000, maxRequests: 20 });

const VALID_CURRENCIES = ["GBP", "USD", "EUR"] as const;
const VALID_FUND_TYPES = ["research", "support", "helpline", "general", "zakat"] as const;
const MAX_AMOUNT = 100000;
const MIN_AMOUNT = 1;

function escapeMetadata(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const DonationSchema = z.object({
  amount: z
    .number({ invalid_type_error: "Amount must be a number" })
    .finite("Amount must be a finite number")
    .min(MIN_AMOUNT, `Amount must be at least ${MIN_AMOUNT}`)
    .max(MAX_AMOUNT, `Amount must be ${MAX_AMOUNT} or less`),
  currency: z.enum(VALID_CURRENCIES, { errorMap: () => ({ message: "Allowed: GBP, USD, EUR" }) })
    .or(z.string().transform((s) => s.toUpperCase()).pipe(z.enum(VALID_CURRENCIES))),
  fundType: z.enum(VALID_FUND_TYPES, { errorMap: () => ({ message: "Invalid fund type" }) }),
  donorName: z.string().trim().max(100, "Donor name must be 100 characters or fewer").optional(),
  donorEmail: emailSchema.optional(),
  giftAid: z.boolean().optional(),
  recurring: z.boolean().optional(),
});

const ALLOWED_REDIRECT_ORIGINS = new Set([
  "https://livingwitharthritis.lovable.app",
  "https://livingwitharthritis.org.uk",
  "https://www.livingwitharthritis.org.uk",
]);

serve(async (req) => {
  if (req.method === "OPTIONS") return preflight(req);

  const requestId = newRequestId();

  try {
    if (!limiter.check(getClientIp(req))) {
      return errJson(req, {
        code: "rate_limited",
        message: "Too many checkout attempts. Please wait a moment.",
        requestId,
        headers: { "Retry-After": "30" },
      });
    }

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      console.error(`[${requestId}] STRIPE_SECRET_KEY not set`);
      return errJson(req, {
        code: "service_unavailable",
        message: "Payments are not configured.",
        requestId,
      });
    }

    const parsed = await parseJsonBody(req, requestId);
    if (!parsed.ok) return parsed.response;

    const validated = parseWithSchema(DonationSchema, parsed.data, req, requestId);
    if (!validated.ok) return validated.response;

    const donation = validated.data;

    const rawOrigin = req.headers.get("origin") || "";
    const redirectOrigin = ALLOWED_REDIRECT_ORIGINS.has(rawOrigin)
      ? rawOrigin
      : "https://livingwitharthritis.lovable.app";

    const amountInSmallestUnit = Math.round(donation.amount * 100);
    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    const isRecurring = donation.recurring === true;
    const productName = isRecurring
      ? `Monthly Donation - ${donation.fundType}`
      : `Donation - ${donation.fundType}`;
    const productDescription = isRecurring
      ? `Monthly recurring donation to ${donation.fundType}`
      : `Thank you for your generous donation to ${donation.fundType}`;

    const priceData: Stripe.Checkout.SessionCreateParams.LineItem.PriceData = {
      currency: donation.currency.toLowerCase(),
      product_data: { name: productName, description: productDescription },
      unit_amount: amountInSmallestUnit,
    };
    if (isRecurring) priceData.recurring = { interval: "month" };

    const session = await stripe.checkout.sessions.create({
      customer_email: donation.donorEmail || undefined,
      line_items: [{ price_data: priceData, quantity: 1 }],
      mode: isRecurring ? "subscription" : "payment",
      success_url: `${redirectOrigin}/donation-result?donation=success`,
      cancel_url: `${redirectOrigin}/donation-result?donation=cancelled`,
      metadata: {
        fundType: donation.fundType,
        donorName: donation.donorName ? escapeMetadata(donation.donorName.trim()) : "Anonymous",
        giftAid: donation.giftAid ? "yes" : "no",
        recurring: isRecurring ? "monthly" : "one-time",
      },
    });

    return okJson({ url: session.url }, req, { requestId });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(`[${requestId}] Donation checkout error:`, message);
    return errJson(req, {
      code: "server_error",
      message: "An error occurred processing your donation.",
      requestId,
    });
  }
});
