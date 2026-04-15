/**
 * Supabase Edge Function: send-contact-email
 * ─────────────────────────────────────────────────────────────────────────
 * Location:  supabase/functions/send-contact-email/index.ts
 *
 * PURPOSE:
 *   When someone submits the contact form on livingwitharthritis.org.uk,
 *   this function fires and sends an email notification to:
 *     info@livingwitharthritis.org.uk
 *
 * SETUP (one-time, ~5 minutes):
 *   1. Sign up at https://resend.com (free tier: 100 emails/day)
 *   2. Verify your domain: livingwitharthritis.org.uk
 *   3. Copy your Resend API key
 *   4. In Supabase Dashboard → Settings → Edge Functions → Secrets:
 *        Add: RESEND_API_KEY = re_xxxxxxxxxxxx
 *   5. Deploy: npx supabase functions deploy send-contact-email --no-verify-jwt
 *
 * SQL (run once in Supabase SQL editor):
 *   create table if not exists contact_enquiries (
 *     id         uuid primary key default gen_random_uuid(),
 *     name       text not null,
 *     email      text not null,
 *     subject    text not null,
 *     message    text not null,
 *     created_at timestamptz default now()
 *   );
 *   -- Enable Row Level Security
 *   alter table contact_enquiries enable row level security;
 *   -- Allow anonymous inserts (form submissions)
 *   create policy "Anyone can submit enquiry"
 *     on contact_enquiries for insert to anon with check (true);
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") ?? "";
const TO_EMAIL = "info@livingwitharthritis.org.uk";
const FROM_EMAIL = "noreply@livingwitharthritis.org.uk";
const SITE_NAME = "Living With Arthritis UK";

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://livingwitharthritis.org.uk",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function htmlEmail(p: ContactPayload): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Enquiry — ${SITE_NAME}</title>
</head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:#0f766e;padding:32px 40px;">
              <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:bold;">
                📬 New Enquiry — ${SITE_NAME}
              </h1>
              <p style="margin:6px 0 0;color:#99f6e4;font-size:14px;">
                Received via the contact form on livingwitharthritis.org.uk
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;">
                    <span style="font-size:12px;text-transform:uppercase;letter-spacing:0.08em;color:#94a3b8;font-family:sans-serif;">From</span><br/>
                    <strong style="font-size:16px;color:#0f172a;">${escapeHtml(p.name)}</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;">
                    <span style="font-size:12px;text-transform:uppercase;letter-spacing:0.08em;color:#94a3b8;font-family:sans-serif;">Reply-To</span><br/>
                    <a href="mailto:${escapeHtml(p.email)}" style="font-size:16px;color:#0f766e;text-decoration:none;">
                      ${escapeHtml(p.email)}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;">
                    <span style="font-size:12px;text-transform:uppercase;letter-spacing:0.08em;color:#94a3b8;font-family:sans-serif;">Subject</span><br/>
                    <strong style="font-size:16px;color:#0f172a;">${escapeHtml(p.subject)}</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 0 0;">
                    <span style="font-size:12px;text-transform:uppercase;letter-spacing:0.08em;color:#94a3b8;font-family:sans-serif;">Message</span><br/>
                    <div style="margin-top:10px;padding:20px;background:#f8fafc;border-radius:8px;border-left:4px solid #0f766e;">
                      <p style="margin:0;font-size:15px;color:#334155;line-height:1.7;white-space:pre-wrap;">${escapeHtml(p.message)}</p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Reply CTA -->
          <tr>
            <td style="padding:0 40px 32px;">
              <a
                href="mailto:${escapeHtml(p.email)}?subject=Re: ${encodeURIComponent(p.subject)}"
                style="display:inline-block;background:#0f766e;color:#ffffff;padding:14px 28px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:bold;font-family:sans-serif;"
              >
                Reply to ${escapeHtml(p.name)} →
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f1f5f9;padding:20px 40px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#94a3b8;font-family:sans-serif;">
                This email was sent automatically by <strong>${SITE_NAME}</strong>.<br/>
                All enquiries are stored securely in your Supabase database.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const payload: ContactPayload = await req.json();

    // Basic server-side validation
    if (!payload.name?.trim() || !payload.email?.trim() || !payload.message?.trim()) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Send email via Resend
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `${SITE_NAME} <${FROM_EMAIL}>`,
        to: [TO_EMAIL],
        reply_to: payload.email.trim(),
        subject: `[Enquiry] ${payload.subject} — from ${payload.name}`,
        html: htmlEmail(payload),
        text: `New enquiry from ${payload.name} (${payload.email})\n\nSubject: ${payload.subject}\n\nMessage:\n${payload.message}`,
      }),
    });

    if (!resendResponse.ok) {
      const errBody = await resendResponse.text();
      console.error("Resend API error:", errBody);
      return new Response(JSON.stringify({ error: "Email delivery failed", detail: errBody }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const resendData = await resendResponse.json();
    console.log("Email sent:", resendData.id);

    // Also send an auto-reply to the enquirer
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `${SITE_NAME} <${FROM_EMAIL}>`,
        to: [payload.email.trim()],
        subject: `We've received your message — ${SITE_NAME}`,
        html: `
          <p>Hi ${escapeHtml(payload.name)},</p>
          <p>Thank you for contacting <strong>${SITE_NAME}</strong>. We've received your message about "<em>${escapeHtml(payload.subject)}</em>" and will reply within 2 business days.</p>
          <p>If your matter is urgent, please email us directly at <a href="mailto:${TO_EMAIL}">${TO_EMAIL}</a>.</p>
          <p>Warm regards,<br/><strong>The ${SITE_NAME} Team</strong></p>
          <hr/>
          <p style="font-size:12px;color:#94a3b8;">
            This is an automated confirmation. Please do not reply to this email — 
            use <a href="mailto:${TO_EMAIL}">${TO_EMAIL}</a> to reach us.
          </p>
        `,
        text: `Hi ${payload.name},\n\nThank you for contacting ${SITE_NAME}. We've received your message and will reply within 2 business days.\n\nWarm regards,\nThe ${SITE_NAME} Team`,
      }),
    });

    return new Response(JSON.stringify({ success: true, emailId: resendData.id }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Edge function error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
