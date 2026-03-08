import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Bot, Sparkles, Target, Zap, Shield, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const VirtualPhysioSection = lazy(() => import("@/components/VirtualPhysioSection"));
const JointExerciseSection = lazy(() => import("@/components/JointExerciseSection"));

const SectionLoader = () => (
  <div className="py-8 flex items-center justify-center">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/30 border-t-primary" />
  </div>
);

/* Humanoid robot SVG illustration */
const RobotIllustration = () => (
  <svg viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-40 h-44 md:w-52 md:h-56 drop-shadow-lg">
    {/* Antenna */}
    <line x1="100" y1="18" x2="100" y2="38" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" />
    <circle cx="100" cy="14" r="6" fill="hsl(var(--primary))" opacity="0.8">
      <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
    </circle>

    {/* Head */}
    <rect x="60" y="38" width="80" height="60" rx="18" fill="hsl(var(--primary))" opacity="0.12" stroke="hsl(var(--primary))" strokeWidth="2.5" />
    {/* Eyes */}
    <circle cx="82" cy="62" r="8" fill="hsl(var(--primary))" opacity="0.85">
      <animate attributeName="r" values="8;6;8" dur="3s" repeatCount="indefinite" />
    </circle>
    <circle cx="118" cy="62" r="8" fill="hsl(var(--primary))" opacity="0.85">
      <animate attributeName="r" values="8;6;8" dur="3s" repeatCount="indefinite" />
    </circle>
    {/* Eye highlights */}
    <circle cx="85" cy="59" r="2.5" fill="white" opacity="0.9" />
    <circle cx="121" cy="59" r="2.5" fill="white" opacity="0.9" />
    {/* Mouth */}
    <path d="M85 80 Q100 90, 115 80" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" />

    {/* Neck */}
    <rect x="90" y="98" width="20" height="12" rx="4" fill="hsl(var(--primary))" opacity="0.15" stroke="hsl(var(--primary))" strokeWidth="1.5" />

    {/* Body */}
    <rect x="50" y="110" width="100" height="70" rx="16" fill="hsl(var(--primary))" opacity="0.1" stroke="hsl(var(--primary))" strokeWidth="2.5" />
    {/* Heart on chest */}
    <path d="M95 135 C95 130, 88 128, 88 133 C88 138, 95 143, 100 148 C105 143, 112 138, 112 133 C112 128, 105 130, 105 135 L100 140 Z"
      fill="hsl(var(--primary))" opacity="0.5">
      <animate attributeName="opacity" values="0.3;0.7;0.3" dur="1.5s" repeatCount="indefinite" />
    </path>
    {/* Body details */}
    <line x1="70" y1="155" x2="130" y2="155" stroke="hsl(var(--primary))" strokeWidth="1.5" opacity="0.2" />

    {/* Left arm */}
    <path d="M50 120 C35 125, 28 140, 32 158" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.7" />
    <circle cx="32" cy="160" r="7" fill="hsl(var(--primary))" opacity="0.15" stroke="hsl(var(--primary))" strokeWidth="2" />

    {/* Right arm */}
    <path d="M150 120 C165 125, 172 140, 168 158" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.7" />
    <circle cx="168" cy="160" r="7" fill="hsl(var(--primary))" opacity="0.15" stroke="hsl(var(--primary))" strokeWidth="2" />

    {/* Left leg */}
    <path d="M80 180 L72 212" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
    <ellipse cx="72" cy="215" rx="10" ry="5" fill="hsl(var(--primary))" opacity="0.2" />

    {/* Right leg */}
    <path d="M120 180 L128 212" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
    <ellipse cx="128" cy="215" rx="10" ry="5" fill="hsl(var(--primary))" opacity="0.2" />
  </svg>
);

const features = [
  { icon: Target, label: "Joint-Specific", desc: "Click any joint for targeted exercises" },
  { icon: Zap, label: "AI-Powered", desc: "Smart recommendations based on your needs" },
  { icon: Shield, label: "NHS Aligned", desc: "Evidence-based physiotherapy protocols" },
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
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-5 md:px-8 py-10 space-y-10 md:space-y-14">
          {/* Hero with Robot */}
          <div className="relative rounded-3xl bg-gradient-to-br from-primary/5 via-background to-primary/3 border border-border/30 p-8 md:p-12 overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

            <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-12">
              {/* Robot */}
              <div className="shrink-0">
                <RobotIllustration />
              </div>

              {/* Content */}
              <div className="text-center md:text-left flex-1">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 mb-4">
                  <Bot className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-primary tracking-wide">AI-Powered Self Help</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
                  Your Virtual{" "}
                  <span className="text-primary">Physio Assistant</span>
                </h1>

                <p className="text-muted-foreground mt-4 max-w-xl text-base md:text-lg leading-relaxed">
                  Click on any joint on the interactive body diagram to get personalised exercises, 
                  stretches, and tips — all backed by UK physiotherapy guidelines.
                </p>

                {/* Feature pills */}
                <div className="flex flex-wrap gap-2 mt-6 justify-center md:justify-start">
                  {features.map((f) => (
                    <div key={f.label} className="flex items-center gap-2 bg-card border border-border/40 rounded-xl px-3.5 py-2 shadow-sm">
                      <f.icon className="w-4 h-4 text-primary shrink-0" />
                      <div className="text-left">
                        <span className="text-xs font-bold text-foreground block leading-tight">{f.label}</span>
                        <span className="text-[10px] text-muted-foreground leading-tight">{f.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-3 justify-center md:justify-start">
                  <Badge className="bg-emerald-500/10 text-emerald-700 border-emerald-200 border text-xs">
                    <Sparkles className="w-3 h-3 mr-1" />
                    HCPC Registered
                  </Badge>
                  <Badge className="bg-blue-500/10 text-blue-700 border-blue-200 border text-xs">
                    CSP Accredited
                  </Badge>
                </div>
              </div>
            </div>
          </div>

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
