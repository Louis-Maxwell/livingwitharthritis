import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";
import PageHero from "@/components/ui/PageHero";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import { Badge } from "@/components/ui/badge";
import { Bot, Target, Zap, Shield, Heart } from "lucide-react";

import ClinicalReviewBadge from "@/components/ai/ClinicalReviewBadge";

const VirtualPhysioSection = lazy(() => import("@/components/VirtualPhysioSection"));
const JointExerciseSection = lazy(() => import("@/components/JointExerciseSection"));

const SectionLoader = () => (
  <div className="py-8 flex items-center justify-center">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/30 border-t-primary" />
  </div>
);

const features = [
  { icon: Target, label: "Joint-Specific", desc: "Click any joint for targeted exercises" },
  { icon: Zap, label: "AI-Powered", desc: "Smart recommendations based on your needs" },
  { icon: Shield, label: "the health service Aligned", desc: "Evidence-based physiotherapy protocols" },
  { icon: Heart, label: "Free Forever", desc: "No cost, no sign-up required" },
];

export default function SelfHelpTool() {
  return (
    <ErrorBoundary
      fallback={<div className="p-12 text-center text-destructive">Something went wrong. Please refresh.</div>}
    >
      <Helmet>
        <title>Self Help Tool – Joint Exercise Diagram | Living With Arthritis UK</title>
        <meta name="description" content="Interactive self-help tool for arthritis joint exercises. Click on any joint to discover targeted exercises for pain relief and mobility." />
        <meta name="keywords" content="arthritis exercises UK, joint exercise diagram, self help arthritis, physiotherapy exercises, knee exercises arthritis, hip exercises arthritis" />
        <meta property="og:title" content="Self Help Tool – Joint Exercise Diagram | Living With Arthritis UK" />
        <meta property="og:description" content="Interactive self-help tool for arthritis joint exercises. Click on any joint to discover targeted exercises." />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://livingwitharthritis.org.uk/self-help" />
        <meta property="og:site_name" content="Living With Arthritis UK" />
        <meta property="og:image" content="https://livingwitharthritis.org.uk/images/hero-community.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-community.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Self Help Tool – Joint Exercise Diagram" />
        <meta name="twitter:description" content="Interactive self-help tool for arthritis joint exercises." />
        <meta name="geo.region" content="GB" />
        <meta name="geo.placename" content="United Kingdom" />
        <link rel="canonical" href="https://livingwitharthritis.org.uk/self-help" />
        <link rel="alternate" hrefLang="en-GB" href="https://livingwitharthritis.org.uk/self-help" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          "name": "Self Help Tool – Joint Exercise Diagram",
          "description": "Interactive self-help tool for arthritis joint exercises.",
          "url": "https://livingwitharthritis.org.uk/self-help",
          "inLanguage": "en-GB",
          "audience": { "@type": "MedicalAudience", "audienceType": "Patient", "geographicArea": { "@type": "Country", "name": "United Kingdom" } }
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://livingwitharthritis.org.uk/" },
            { "@type": "ListItem", "position": 2, "name": "Self Help Tool", "item": "https://livingwitharthritis.org.uk/self-help" }
          ]
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": "How to use the Self Help Tool to find arthritis exercises",
          "description": "A 4-step guide to using our interactive joint diagram to discover personalised exercises for arthritis pain relief and mobility.",
          "inLanguage": "en-GB",
          "totalTime": "PT5M",
          "step": [
            { "@type": "HowToStep", "position": 1, "name": "Open the interactive joint diagram", "text": "Scroll to the body diagram below and identify the joint causing you pain or stiffness.", "url": "https://livingwitharthritis.org.uk/self-help#step-1" },
            { "@type": "HowToStep", "position": 2, "name": "Select your affected joint", "text": "Click or tap on the joint (knee, hip, shoulder, hand, back, or ankle) to load tailored exercise recommendations.", "url": "https://livingwitharthritis.org.uk/self-help#step-2" },
            { "@type": "HowToStep", "position": 3, "name": "Review the recommended exercises", "text": "Read through the physiotherapy-aligned exercises, including reps, duration, and safety notes for your joint.", "url": "https://livingwitharthritis.org.uk/self-help#step-3" },
            { "@type": "HowToStep", "position": 4, "name": "Start gently and track progress", "text": "Begin with a low number of repetitions, stop if pain worsens, and consult your GP or physiotherapist if symptoms persist.", "url": "https://livingwitharthritis.org.uk/self-help#step-4" }
          ]
        })}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <PageBreadcrumb segments={[{ label: "Self Help Tool" }]} />

        <PageHero
          badge={
            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
              <Bot className="w-3.5 h-3.5 mr-1.5" /> AI-Powered Self Help
            </Badge>
          }
          title={<>Your Virtual <span className="text-primary">Physio Assistant</span></>}
          subtitle="Click on any joint on the interactive body diagram to get personalised exercises, stretches, and tips — all backed by UK physiotherapy guidelines."
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
            {features.map((f) => (
              <div key={f.label} className="flex items-center gap-3 bg-card border border-border/30 rounded-xl px-4 py-3">
                <div className="w-9 h-9 rounded-lg bg-primary/5 flex items-center justify-center shrink-0">
                  <f.icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <span className="text-xs font-bold text-foreground block leading-tight">{f.label}</span>
                  <span className="text-[10px] text-muted-foreground leading-tight">{f.desc}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-3">
            <Badge className="bg-primary/10 text-primary border-primary border text-xs">
              HCPC Registered
            </Badge>
            <Badge className="bg-sky/10 text-sky border-sky/20 border text-xs">
              CSP Accredited
            </Badge>
          </div>
        </PageHero>

        <main id="main-content" className="container mx-auto px-5 md:px-8 py-10 space-y-10 md:space-y-14">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <ClinicalReviewBadge />
          </div>
          <Suspense fallback={<SectionLoader />}>
            <VirtualPhysioSection />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <JointExerciseSection />
          </Suspense>

          <section aria-labelledby="meds-and-supplements" className="border-t border-border pt-12">
            <h2 id="meds-and-supplements" className="font-serif text-3xl md:text-4xl text-foreground mb-6">
              Medications and supplements for joint health
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p>
                When exercise, weight management and physiotherapy are not enough on their own, people and their clinicians often turn to medication or supplements to help control joint pain and inflammation. The decision is never trivial — it always involves weighing benefit against risk. UK search behaviour shows steady interest in specific drugs such as allopurinol and corticosteroids, alongside growing curiosity about natural options like turmeric. Understanding what each does, and what it cannot do, helps people make safer, more informed choices alongside their GP or rheumatology team.
              </p>
              <p>
                Allopurinol is widely used to treat chronic gout, a type of inflammatory arthritis caused by excess uric acid in the blood. The high search volume around “allopurinol side effects” suggests many patients are either monitoring their own treatment or hesitating to start. Allopurinol is effective at lowering uric acid levels and preventing painful flares, but it requires careful education. Common side effects include rash and gastrointestinal upset; rare but serious hypersensitivity reactions are also possible. People taking it should know the warning signs and attend the blood tests their GP requests to monitor kidney and liver function.
              </p>
              <p>
                Corticosteroids are another commonly searched group. They are powerful anti-inflammatory drugs that can give rapid relief in conditions such as rheumatoid arthritis, severe osteoarthritis flares and acute back pain. The trade-off is real: long-term systemic steroid use is associated with osteoporosis, weight gain, raised blood sugar and increased infection risk. For that reason, they are typically used either as short courses or as targeted injections into the affected joint, which keeps systemic exposure low.
              </p>
              <p>
                Alongside these pharmaceutical options, interest in natural alternatives continues to grow — turmeric in particular. The active compound curcumin has been studied for its anti-inflammatory effects, and many people prefer it as a long-term option compared with continuous NSAID or steroid use. Evidence supports a modest benefit for joint pain and inflammation, but “natural” does not automatically mean safe. Turmeric can interact with blood thinners and may cause gastrointestinal upset in high doses. Curcumin also has poor natural bioavailability — it is usually combined with piperine (from black pepper) for meaningful absorption.
              </p>
              <p>
                Most people do best with a combined approach rather than a single magic bullet: appropriate prescribed medication where it is genuinely needed, supplements used carefully alongside conventional care, and consistent attention to exercise, sleep and diet underneath it all.
              </p>
              <p className="text-sm italic">
                This is general information, not medical advice. Speak to a GP, rheumatologist or pharmacist before starting, stopping or combining any medication or supplement.
              </p>
            </div>
          </section>
        </main>


        <Footer />
      </div>
    </ErrorBoundary>
  );
}
