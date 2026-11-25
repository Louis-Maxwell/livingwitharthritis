import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MailX, AlertCircle, Loader2 } from "lucide-react";
import SeoHead from "@/components/SeoHead";


type Status = "loading" | "valid" | "invalid" | "draft";

const Unsubscribe = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    if (!token) { setStatus("invalid"); return; }

    setStatus("valid");
  }, [token]);

  const mailtoHref =
    "mailto:info@livingwitharthritis.org.uk?subject=" +
    encodeURIComponent("Please unsubscribe me") +
    "&body=" +
    encodeURIComponent("Please remove me from the email list. Token: " + (token || "none"));

  const handleConfirm = () => {
    window.location.href = mailtoHref;
    setStatus("draft");
  };

  return (
    <div className="min-h-dvh bg-background px-4 py-16">
      <SeoHead
        title="Unsubscribe from Emails"
        description="Manage your email preferences for Living With Arthritis communications."
        path="/unsubscribe"
        noindex
      />
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-start">
        <div className="w-full min-w-0 text-center space-y-6 p-4 sm:p-8 rounded-2xl border bg-card shadow-sm">
          {status === "loading" && (
            <>
              <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto" />
              <p className="text-muted-foreground">Loading…</p>
            </>
          )}

          {status === "valid" && (
            <>
              <MailX className="h-12 w-12 text-primary mx-auto" />
              <h1 className="text-2xl font-bold text-foreground">Unsubscribe</h1>
              <p className="text-muted-foreground break-words">
                Unsubscribing works through your own email app. The button
                below opens a pre-written draft email to{" "}
                info@livingwitharthritis.org.uk. Nothing is sent until you
                press Send in your email app, and this website does not send
                or store the request itself. Sending the email submits your
                request to the charity — it does not remove your address by
                itself.
              </p>
              <Button onClick={handleConfirm} variant="destructive" className="w-full h-auto whitespace-normal leading-snug py-2.5">
                Open email draft
              </Button>
            </>
          )}

          {status === "draft" && (
            <>
              <MailX className="h-12 w-12 text-primary mx-auto" />
              <h2 className="text-2xl font-bold text-foreground">Check your email app</h2>
              <p className="text-muted-foreground break-words">
                We have tried to open a draft email to{" "}
                info@livingwitharthritis.org.uk in your email app. Press Send
                there to submit your removal request to the charity's inbox.
                Your address is not removed yet: this website does not send
                or store the request itself, and removal happens only after
                the charity processes your email.
              </p>
              <p className="text-muted-foreground break-words">
                If no draft opened,{" "}
                <a href={mailtoHref} className="text-primary font-semibold hover:underline">
                  open it again
                </a>{" "}
                or email the same address with the subject "Unsubscribe"
                from the address you want removed.
              </p>
            </>
          )}

          {status === "invalid" && (
            <>
              <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
              <h2 className="text-2xl font-bold text-foreground">No email token in this link</h2>
              <p className="text-muted-foreground break-words">
                This link does not include an email token. You can still
                unsubscribe:{" "}
                <a
                  href="mailto:info@livingwitharthritis.org.uk?subject=Unsubscribe"
                  className="text-primary font-semibold hover:underline"
                >
                  email info@livingwitharthritis.org.uk
                </a>{" "}
                with the subject "Unsubscribe" from the address you want
                removed.
              </p>
            </>
          )}
        </div>

        <aside className="min-w-0 space-y-6 p-4 sm:p-8 rounded-2xl border bg-card/60">
          <p className="text-xs uppercase tracking-[0.18em] text-primary font-semibold">
            Before you go
          </p>
          <h2 className="font-display text-2xl font-bold text-foreground leading-tight">
            You can still keep Living With Arthritis without the emails
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Unsubscribing only stops the emails. Every guide stays free to
            read on this website, with no account and no sign-in.
          </p>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0" />
              <div>
                <p className="font-semibold text-foreground">Prefer fewer emails, not none?</p>
                <p className="text-muted-foreground">
                  Say so in the same email — your request goes to the
                  charity's own inbox, and there is no settings page to miss.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0" />
              <div>
                <p className="font-semibold text-foreground">Tracking a flare?</p>
                <p className="text-muted-foreground">
                  The{" "}
                  <a
                    href="/resources/symptom-flare-tracker"
                    className="text-primary font-semibold hover:underline"
                  >
                    symptom and flare tracker
                  </a>{" "}
                  is free and printable — no account or sign-in.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0" />
              <div>
                <p className="font-semibold text-foreground">Need to talk to a human?</p>
                <p className="text-muted-foreground">
                  Email info@livingwitharthritis.org.uk — it goes to the
                  charity's own inbox.
                </p>
              </div>
            </li>
          </ul>
          <p className="text-xs text-muted-foreground border-t border-border/60 pt-4">
            Living With Arthritis is a registered charity in England and
            Wales (no. 1218461).
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a href="/resources/symptom-flare-tracker" className="text-sm font-semibold text-primary hover:underline break-words">Symptom and flare tracker (free printable) →</a>
            <a href="/contact" className="text-sm font-semibold text-primary hover:underline">Contact us →</a>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Unsubscribe;
