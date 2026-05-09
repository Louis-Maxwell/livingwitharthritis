import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { ShieldCheck, Sparkles, Lock, AlertTriangle, Mail, Phone } from "lucide-react";
import ClinicalReviewBadge from "@/components/ai/ClinicalReviewBadge";

export default function AiSafety() {
  return (
    <>
      <Helmet>
        <title>AI Safety & Trust | Living With Arthritis UK</title>
        <meta
          name="description"
          content="How our Arthritis AI assistant works, what data it uses, what it can't do, and how to get urgent help. Built with HCPC-registered clinicians."
        />
        <link rel="canonical" href="https://livingwitharthritis.org.uk/ai-safety" />
      </Helmet>

      <Header />

      <main id="main-content" className="mx-auto max-w-3xl px-4 py-16 md:py-24">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <ShieldCheck className="h-7 w-7 text-primary" aria-hidden="true" />
          </div>
          <h1 className="font-serif text-4xl font-bold text-foreground md:text-5xl">
            AI Safety &amp; Trust
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            What our AI does, what it doesn't, and how to stay safe.
          </p>
          <ClinicalReviewBadge className="mt-4" />
        </div>

        <section className="space-y-10 text-foreground/85">
          <Card icon={Sparkles} title="What the AI is">
            <p>
              Arthritis AI is a general-purpose large language model (currently Google
              Gemini, accessed via the Lovable AI Gateway) wrapped in a system prompt
              and safety filters written by our team. It surfaces educational
              information about arthritis — symptoms, treatments, exercise, diet, and
              UK care pathways.
            </p>
          </Card>

          <Card icon={AlertTriangle} title="What it cannot do" tone="warning">
            <ul className="ml-5 list-disc space-y-1.5">
              <li>It cannot diagnose you. Only a clinician can do that.</li>
              <li>It cannot prescribe medication or set dosage for new prescription drugs.</li>
              <li>It cannot give paediatric medical advice.</li>
              <li>It cannot provide mental-health crisis counselling.</li>
              <li>It can be wrong — always cross-check anything important with your GP.</li>
            </ul>
          </Card>

          <Card icon={Lock} title="What data we send and store">
            <ul className="ml-5 list-disc space-y-1.5">
              <li>
                Only the messages you type are sent to the AI provider. We do not
                attach your name, email, IP address, or browsing history.
              </li>
              <li>
                If you are not signed in, your conversation lives only in your
                browser tab and is gone when you close it.
              </li>
              <li>
                If you are signed in, conversations are saved to your account so you
                can return to them. You can delete them at any time.
              </li>
              <li>
                Server-side logs are scrubbed of personally-identifying data
                (emails, phone numbers, postcodes, NHS numbers) before being kept.
              </li>
            </ul>
          </Card>

          <Card icon={ShieldCheck} title="How we keep it safer">
            <ul className="ml-5 list-disc space-y-1.5">
              <li>Our system prompt forces refusal of diagnosis, dosing, and crisis counselling.</li>
              <li>Inputs are screened for red-flag emergency cues and routed to NHS 111 / 999.</li>
              <li>Inputs that try to bypass safety rules are blocked.</li>
              <li>All AI output is labelled as AI-generated and "not medical advice."</li>
              <li>Rate limits stop abuse and protect the free service for everyone.</li>
            </ul>
          </Card>

          <Card icon={Phone} title="In an emergency" tone="danger">
            <ul className="space-y-2">
              <li>
                <a href="tel:999" className="font-semibold text-destructive underline">
                  999
                </a>{" "}
                — life-threatening emergencies.
              </li>
              <li>
                <a href="tel:111" className="font-semibold text-primary underline">
                  NHS 111
                </a>{" "}
                — urgent but not life-threatening.
              </li>
              <li>
                <a href="tel:116123" className="font-semibold text-primary underline">
                  Samaritans 116 123
                </a>{" "}
                — free, 24/7 mental-health support.
              </li>
            </ul>
          </Card>

          <Card icon={Mail} title="Report a bad answer">
            <p>
              If the AI gave you advice that felt wrong, harmful, or biased, please
              tell us. Email{" "}
              <a
                href="mailto:info@livingwitharthritis.org.uk"
                className="text-primary underline"
              >
                info@livingwitharthritis.org.uk
              </a>{" "}
              with a brief description and we'll review it within five working days.
            </p>
          </Card>
        </section>

        <div className="mt-12 text-center">
          <Link
            to="/chat"
            className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Open Arthritis AI
          </Link>
        </div>
      </main>
    </>
  );
}

function Card({
  icon: Icon,
  title,
  tone = "default",
  children,
}: {
  icon: React.ElementType;
  title: string;
  tone?: "default" | "warning" | "danger";
  children: React.ReactNode;
}) {
  const toneStyles =
    tone === "danger"
      ? "border-destructive/20 bg-destructive/5"
      : tone === "warning"
      ? "border-amber-500/20 bg-amber-500/5"
      : "border-border bg-card";
  const iconStyles =
    tone === "danger"
      ? "text-destructive"
      : tone === "warning"
      ? "text-amber-600 dark:text-amber-400"
      : "text-primary";
  return (
    <article className={`rounded-2xl border p-6 ${toneStyles}`}>
      <h2 className="mb-3 flex items-center gap-2 text-xl font-semibold text-foreground">
        <Icon className={`h-5 w-5 ${iconStyles}`} aria-hidden="true" />
        {title}
      </h2>
      <div className="space-y-2 leading-relaxed">{children}</div>
    </article>
  );
}
