import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";
import PageHero from "@/components/ui/PageHero";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import { Badge } from "@/components/ui/badge";
import { Bot, Target, Zap, Shield, Heart } from "lucide-react";
import AiDisclosureBadge from "@/components/ai/AiDisclosureBadge";
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
        <meta name="twitter:card" content="summary" />
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
          <Suspense fallback={<SectionLoader />}>
            <VirtualPhysioSection />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <JointExerciseSection />
          </Suspense>
        </main>

        <Footer />
      </div>
    </ErrorBoundary>
  );
}
