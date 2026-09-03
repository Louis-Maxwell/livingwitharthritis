import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MailX, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import SeoHead from "@/components/SeoHead";


type Status = "loading" | "valid" | "already" | "invalid" | "confirming" | "done" | "error";

const Unsubscribe = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    if (!token) { setStatus("invalid"); return; }

    setStatus("valid");
  }, [token]);

  const handleConfirm = async () => {
    setStatus("confirming");
    window.location.href = "mailto:info@livingwitharthritis.org.uk?subject=" +
      encodeURIComponent("Please unsubscribe me") +
      "&body=" + encodeURIComponent("Please remove me from the email list. Token: " + (token || "none"));
    setStatus("done");
  };

  return (
    <div className="min-h-screen bg-background px-4 py-16">
      <SeoHead
        title="Unsubscribe from Emails"
        description="Manage your email preferences for Living With Arthritis UK communications."
        path="/unsubscribe"
        noindex
      />
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-start">
        <div className="w-full text-center space-y-6 p-8 rounded-2xl border bg-card shadow-sm">
          {status === "loading" && (
            <>
              <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto" />
              <p className="text-muted-foreground">Verifying…</p>
            </>
          )}

          {status === "valid" && (
            <>
              <MailX className="h-12 w-12 text-primary mx-auto" />
              <h1 className="text-2xl font-bold text-foreground">Unsubscribe</h1>
              <p className="text-muted-foreground">
                Are you sure you want to unsubscribe from emails from Living With Arthritis?
              </p>
              <Button onClick={handleConfirm} variant="destructive" className="w-full">
                Confirm Unsubscribe
              </Button>
            </>
          )}

          {status === "confirming" && (
            <>
              <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto" />
              <p className="text-muted-foreground">Processing…</p>
            </>
          )}

          {status === "done" && (
            <>
              <CheckCircle2 className="h-12 w-12 text-primary mx-auto" />
              <h2 className="text-2xl font-bold text-foreground">Unsubscribed</h2>
              <p className="text-muted-foreground">
                You've been successfully unsubscribed. You won't receive any more emails from us.
              </p>
            </>
          )}

          {status === "already" && (
            <>
              <CheckCircle2 className="h-12 w-12 text-muted-foreground mx-auto" />
              <h2 className="text-2xl font-bold text-foreground">Already Unsubscribed</h2>
              <p className="text-muted-foreground">
                This email address has already been unsubscribed.
              </p>
            </>
          )}

          {(status === "invalid" || status === "error") && (
            <>
              <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
              <h2 className="text-2xl font-bold text-foreground">
                {status === "invalid" ? "Invalid Link" : "Something Went Wrong"}
              </h2>
              <p className="text-muted-foreground">
                {status === "invalid"
                  ? "This unsubscribe link is invalid or has expired."
                  : "Please try again later."}
              </p>
            </>
          )}
        </div>

        <aside className="space-y-6 p-8 rounded-2xl border bg-card/60">
          <p className="text-xs uppercase tracking-[0.18em] text-primary font-semibold">
            Before you go
          </p>
          <h2 className="font-display text-2xl font-bold text-foreground leading-tight">
            You can still keep Living With Arthritis without the emails
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Unsubscribing only stops the emails — your account, saved
            exercise plans and chat history with the virtual physiotherapy
            assistant stay exactly where you left them. You can return any
            time from your phone or laptop without giving up an inbox slot.
          </p>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0" />
              <div>
                <p className="font-semibold text-foreground">Prefer fewer emails, not none?</p>
                <p className="text-muted-foreground">
                  Sign back into your account and choose monthly digest only —
                  one carefully edited email a month instead of weekly tips.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0" />
              <div>
                <p className="font-semibold text-foreground">Still want flare-up reminders?</p>
                <p className="text-muted-foreground">
                  Use the in-app pacing tool and self-help tracker — gentle
                  nudges live inside the dashboard, not your inbox.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0" />
              <div>
                <p className="font-semibold text-foreground">Need to talk to a human?</p>
                <p className="text-muted-foreground">
                  Email info@livingwitharthritis.org.uk or WhatsApp our
                  London team — we reply personally within two business days.
                </p>
              </div>
            </li>
          </ul>
          <p className="text-xs text-muted-foreground border-t border-border/60 pt-4">
            Living With Arthritis UK is a not-for-profit information
            service. We send a small number of emails each month — never
            advertising, never shared with third parties, and never sold.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a href="/self-help" className="text-sm font-semibold text-primary hover:underline">Open self-help tool →</a>
            <a href="/exercises" className="text-sm font-semibold text-primary hover:underline">Exercise hub →</a>
            <a href="/contact" className="text-sm font-semibold text-primary hover:underline">Contact us →</a>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Unsubscribe;
