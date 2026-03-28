import { lazy, Suspense, memo, useEffect, useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Apple, Dumbbell, Stethoscope, Users, MapPin } from "lucide-react";
import { toast } from "sonner";
import { useSearchParams } from "react-router-dom";

import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ScrollProgress from "@/components/ScrollProgress";
import ErrorBoundary from "@/components/ErrorBoundary";
import ViewportSection from "@/components/ui/ViewportSection";

const Footer = lazy(() => import("@/components/Footer"));
const AppointmentModal = lazy(() => import("@/components/AppointmentModal").then(m => ({ default: m.AppointmentModal })));

// Deferred overlays — loaded after paint (reduced: removed DonationNotification & BackToTop)
const DeferredOverlays = memo(() => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const id = typeof requestIdleCallback !== "undefined"
      ? requestIdleCallback(() => setShow(true), { timeout: 4000 })
      : setTimeout(() => setShow(true), 3000) as unknown as number;
    return () => {
      if (typeof cancelIdleCallback !== "undefined") cancelIdleCallback(id);
      else clearTimeout(id);
    };
  }, []);
  if (!show) return null;
  const FeedbackPopup = lazy(() => import("@/components/FeedbackPopup"));
  return (
    <Suspense fallback={null}>
      <FeedbackPopup />
    </Suspense>
  );
});
DeferredOverlays.displayName = "DeferredOverlays";

// Above-fold sections — eagerly loaded
const QuickAccessSection = lazy(() => import("@/components/landing/QuickAccessSection"));
const AboutSection = lazy(() => import("@/components/AboutSection"));
const ServicesGrid = lazy(() => import("@/components/ServicesGrid"));
const QuoteSection = lazy(() => import("@/components/landing/QuoteSection"));
const CampaignBanner = lazy(() => import("@/components/CampaignBanner"));

// Below-fold sections — deferred with ViewportSection
const HowItWorksSection = lazy(() => import("@/components/landing/HowItWorksSection"));
const DailyTipsSection = lazy(() => import("@/components/landing/DailyTipsSection"));
const BlogPreviewSection = lazy(() => import("@/components/landing/BlogPreviewSection"));
const TestimonialsSection = lazy(() => import("@/components/landing/TestimonialsSection"));
const FAQSection = lazy(() => import("@/components/landing/FAQSection"));
const FundraisingProgressSection = lazy(() => import("@/components/landing/FundraisingProgressSection"));
const GetInTouchSection = lazy(() => import("@/components/landing/GetInTouchSection"));
const NewsletterSection = lazy(() => import("@/components/landing/NewsletterSection"));
const ImpactMetricsSection = lazy(() => import("@/components/landing/ImpactMetricsSection"));
const DonationImpactSection = lazy(() => import("@/components/landing/DonationImpactSection"));
const BeneficiarySpotlight = lazy(() => import("@/components/landing/BeneficiarySpotlight"));

// Tab sections — loaded on demand
const NutritionArticleSection = lazy(() => import("@/components/NutritionArticleSection"));
const VirtualPhysioSection = lazy(() => import("@/components/VirtualPhysioSection"));
const JointExerciseSection = lazy(() => import("@/components/JointExerciseSection"));
const ConditionsSection = lazy(() => import("@/components/ConditionsSection"));
const CommunitySection = lazy(() => import("@/components/landing/CommunitySection"));
const UKResourcesSection = lazy(() => import("@/components/landing/UKResourcesSection"));
const TransparencySection = lazy(() => import("@/components/landing/TransparencySection"));

const SectionLoader = memo(() => (
  <div className="py-8 flex items-center justify-center">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/30 border-t-primary" />
  </div>
));
SectionLoader.displayName = "SectionLoader";

const EXPLORE_TABS = [
  { value: "nutrition", label: "Nutrition", icon: Apple },
  { value: "exercises", label: "Exercises", icon: Dumbbell },
  { value: "conditions", label: "Conditions", icon: Stethoscope },
  { value: "community", label: "Community", icon: Users },
  { value: "resources", label: "UK Resources", icon: MapPin },
] as const;

export default function Index() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<string>("nutrition");

  useEffect(() => {
    const donation = searchParams.get("donation");
    if (donation === "success") {
      toast.success("Thank you! Your donation means a lot.", { duration: 7000 });
      setSearchParams((prev) => { prev.delete("donation"); return prev; }, { replace: true });
    } else if (donation === "cancelled") {
      toast.info("Donation cancelled.", { duration: 5000 });
      setSearchParams((prev) => { prev.delete("donation"); return prev; }, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  return (
    <ErrorBoundary
      fallback={<div className="p-12 text-center text-destructive">Something went wrong. Please refresh.</div>}
    >
      <Helmet>
        <title>Living With Arthritis UK – Free Physio, Diet Plans & Joint Pain Help</title>
        <meta name="description" content="Free arthritis support for people across the UK. Virtual physiotherapy, anti-inflammatory Mediterranean diet plans, joint exercises, AI health assistant and community support for osteoarthritis, rheumatoid arthritis and psoriatic arthritis." />
        <meta property="og:title" content="Living With Arthritis UK – Free Physio, Diet & Joint Pain Help" />
        <meta property="og:description" content="Free NHS-complementary arthritis resources for UK residents: virtual physiotherapy, Mediterranean diet plans, gentle exercises, AI chatbot and expert guidance for osteoarthritis and RA." />
        <meta name="keywords" content="arthritis UK, NHS arthritis help, joint pain relief UK, osteoarthritis help UK, rheumatoid arthritis support UK, free physiotherapy UK, anti-inflammatory diet UK, arthritis exercises UK, living with arthritis, joint pain NHS, arthritis charity UK, first contact practitioner, psoriatic arthritis UK, knee pain UK, hip arthritis UK, arthritis supplements UK, PIP arthritis disability, NICE guidelines arthritis, Mediterranean diet arthritis UK, arthritis flare up UK, arthritis treatment UK, arthritis GP referral, rheumatology NHS referral, arthritis support group UK, swimming arthritis UK, yoga arthritis UK, turmeric arthritis UK, glucosamine collagen arthritis, arthritis pain management UK, gentle exercises arthritis UK, arthritis self help tools" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://livingwitharthritis.org.uk/" />
        <meta name="geo.region" content="GB" />
        <link rel="canonical" href="https://livingwitharthritis.org.uk/" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalOrganization",
          "name": "Living With Arthritis",
          "alternateName": "Living With Arthritis UK",
          "url": "https://livingwitharthritis.org.uk",
          "description": "UK charity providing free virtual physiotherapy, nutrition guidance, joint exercises, AI health assistant and community support for people living with arthritis.",
          "medicalSpecialty": "Rheumatology",
          "areaServed": { "@type": "Country", "name": "United Kingdom" },
          "serviceType": ["Virtual Physiotherapy", "Nutrition Guidance", "Joint Exercise Programmes", "AI Health Assistant"],
          "contactPoint": { "@type": "ContactPoint", "telephone": "+44-7760-512-084", "email": "info@livingwitharthritis.org.uk", "contactType": "customer support", "availableLanguage": "English", "areaServed": "GB" },
          "inLanguage": "en-GB"
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Living With Arthritis UK",
          "url": "https://livingwitharthritis.org.uk",
          "inLanguage": "en-GB",
          "potentialAction": {
            "@type": "SearchAction",
            "target": { "@type": "EntryPoint", "urlTemplate": "https://livingwitharthritis.org.uk/?q={search_term_string}" },
            "query-input": "required name=search_term_string"
          }
        })}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <ScrollProgress />
        <Header />
        <DeferredOverlays />

        <main id="main-content" className="space-y-0" role="main">
          {/* Campaign banner */}
          <Suspense fallback={null}>
            <CampaignBanner />
          </Suspense>

          <HeroSection />

          <div className="w-full px-0 space-y-0">
            {/* ABOVE FOLD — eagerly rendered */}
            <Suspense fallback={<SectionLoader />}>
              <QuickAccessSection />
            </Suspense>

            <Suspense fallback={null}>
              <QuoteSection />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
              <AboutSection />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
              <ServicesGrid />
            </Suspense>

            {/* BELOW FOLD — viewport-deferred for perf */}
            <ViewportSection minHeight="300px" rootMargin="400px">
              <Suspense fallback={<SectionLoader />}>
                <HowItWorksSection />
              </Suspense>
            </ViewportSection>

            {/* Removed SocialProofSection and ImpactBannerSection — redundant */}

            {/* TABBED EXPLORE SECTION */}
            <ViewportSection minHeight="600px" rootMargin="400px">
              <section id="explore" className="scroll-mt-24 bg-tint-rose p-6 md:p-12 border-y border-border/20">
                <div className="max-w-7xl mx-auto">
                  <div className="text-center mb-10">
                    <span className="section-label text-primary mb-4 block">Resources Library</span>
                    <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight leading-[1.06]">
                      Explore our{" "}
                      <span className="text-gradient italic">expert resources</span>
                    </h2>
                    <p className="text-muted-foreground mt-4 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
                      Discover nutrition guides, physiotherapy exercises, condition information, community support and UK resources — all clinically reviewed.
                    </p>
                  </div>

                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="w-full flex flex-wrap justify-center gap-1 bg-muted/50 p-1.5 rounded-2xl h-auto">
                      {EXPLORE_TABS.map((tab) => {
                        const Icon = tab.icon;
                        return (
                          <TabsTrigger
                            key={tab.value}
                            value={tab.value}
                            className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all duration-200"
                          >
                            <Icon className="w-4 h-4" />
                            <span className="hidden sm:inline">{tab.label}</span>
                            <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
                          </TabsTrigger>
                        );
                      })}
                    </TabsList>

                    <div className="mt-8">
                      <TabsContent value="nutrition" className="space-y-10 md:space-y-14 mt-0">
                        <Suspense fallback={<SectionLoader />}><NutritionArticleSection /></Suspense>
                      </TabsContent>
                      <TabsContent value="exercises" className="space-y-10 md:space-y-14 mt-0">
                        <Suspense fallback={<SectionLoader />}><VirtualPhysioSection /><JointExerciseSection /></Suspense>
                      </TabsContent>
                      <TabsContent value="conditions" className="space-y-10 md:space-y-14 mt-0">
                        <Suspense fallback={<SectionLoader />}><ConditionsSection /></Suspense>
                      </TabsContent>
                      <TabsContent value="community" className="space-y-10 md:space-y-14 mt-0">
                        <Suspense fallback={<SectionLoader />}><CommunitySection /><TransparencySection /></Suspense>
                      </TabsContent>
                      <TabsContent value="resources" className="space-y-10 md:space-y-14 mt-0">
                        <Suspense fallback={<SectionLoader />}><UKResourcesSection /></Suspense>
                      </TabsContent>
                    </div>
                  </Tabs>
                </div>
              </section>
            </ViewportSection>

            {/* DEEP SECTIONS — generous rootMargin for smooth reveal */}
            <ViewportSection minHeight="300px" rootMargin="300px">
              <Suspense fallback={<SectionLoader />}><DailyTipsSection /></Suspense>
            </ViewportSection>

            <ViewportSection minHeight="300px" rootMargin="300px">
              <Suspense fallback={<SectionLoader />}><BlogPreviewSection /></Suspense>
            </ViewportSection>

            <ViewportSection minHeight="300px" rootMargin="300px">
              <Suspense fallback={<SectionLoader />}><TestimonialsSection /></Suspense>
            </ViewportSection>

            <Suspense fallback={<SectionLoader />}><BeneficiarySpotlight /></Suspense>

            <Suspense fallback={<SectionLoader />}><DonationImpactSection /></Suspense>

            <Suspense fallback={<SectionLoader />}><FAQSection /></Suspense>

            <Suspense fallback={<SectionLoader />}><FundraisingProgressSection /></Suspense>

            <Suspense fallback={<SectionLoader />}><ImpactMetricsSection /></Suspense>

            <Suspense fallback={<SectionLoader />}><NewsletterSection /></Suspense>

            <ViewportSection minHeight="300px" rootMargin="300px">
              <Suspense fallback={<SectionLoader />}><GetInTouchSection /></Suspense>
            </ViewportSection>

            {/* FinalCTASection removed — merged into NewsletterSection */}
          </div>
        </main>

        <Suspense fallback={<div className="h-96 bg-foreground" />}>
          <Footer />
        </Suspense>

        {/* Removed duplicate fixed bottom CTA — MobileBottomNav handles mobile navigation */}
      </div>
    </ErrorBoundary>
  );
}
