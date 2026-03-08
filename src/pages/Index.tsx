import { lazy, Suspense, memo, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { CalendarCheck, Apple, Dumbbell, Stethoscope, Users, MapPin } from "lucide-react";
import { toast } from "sonner";
import { useSearchParams } from "react-router-dom";

import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ScrollProgress from "@/components/ScrollProgress";
import ErrorBoundary from "@/components/ErrorBoundary";

const Footer = lazy(() => import("@/components/Footer"));
const AppointmentModal = lazy(() => import("@/components/AppointmentModal").then(m => ({ default: m.AppointmentModal })));

// Lazy load non-critical overlays
const DonationNotification = lazy(() => import("@/components/DonationNotification"));
const FeedbackPopup = lazy(() => import("@/components/FeedbackPopup"));


// Lazy sections – always on page
const AboutSection = lazy(() => import("@/components/AboutSection"));
const ServicesGrid = lazy(() => import("@/components/ServicesGrid"));
const HowItWorksSection = lazy(() => import("@/components/landing/HowItWorksSection"));
const DailyTipsSection = lazy(() => import("@/components/landing/DailyTipsSection"));
const BlogPreviewSection = lazy(() => import("@/components/landing/BlogPreviewSection"));
const TestimonialsSection = lazy(() => import("@/components/landing/TestimonialsSection"));
const FAQSection = lazy(() => import("@/components/landing/FAQSection"));
const FundraisingProgressSection = lazy(() => import("@/components/landing/FundraisingProgressSection"));
const GetInTouchSection = lazy(() => import("@/components/landing/GetInTouchSection"));
const FinalCTASection = lazy(() => import("@/components/landing/FinalCTASection"));
const NewsletterSection = lazy(() => import("@/components/landing/NewsletterSection"));
const ImpactBannerSection = lazy(() => import("@/components/landing/ImpactBannerSection"));
const QuoteSection = lazy(() => import("@/components/landing/QuoteSection"));

// Lazy sections – inside tabs (loaded on demand)
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

// Import scroll animation wrapper
// AnimatedSection available for non-lazy content if needed

/* ── Tab definitions ── */
const EXPLORE_TABS = [
  {
    value: "nutrition",
    label: "Nutrition",
    icon: Apple,
  },
  {
    value: "exercises",
    label: "Exercises",
    icon: Dumbbell,
  },
  {
    value: "conditions",
    label: "Conditions",
    icon: Stethoscope,
  },
  {
    value: "community",
    label: "Community",
    icon: Users,
  },
  {
    value: "resources",
    label: "UK Resources",
    icon: MapPin,
  },
] as const;

export default function Index() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<string>("nutrition");

  // Donation toast
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
        <title>Living With Arthritis UK – Free Physio, Diet & Joint Pain Help</title>
        <meta name="description" content="Free arthritis support for people across the UK. Virtual physiotherapy, anti-inflammatory nutrition plans, joint exercises and community help for osteoarthritis and rheumatoid arthritis." />
        <meta property="og:title" content="Living With Arthritis UK – Free Physio, Diet & Joint Pain Help" />
        <meta property="og:description" content="Free NHS-complementary arthritis resources for UK residents: virtual physiotherapy, Mediterranean diet plans, gentle exercises and expert guidance." />
        <meta name="keywords" content="arthritis UK, NHS arthritis, joint pain relief UK, osteoarthritis help, rheumatoid arthritis support, free physiotherapy UK, anti-inflammatory diet UK, arthritis exercises, living with arthritis, joint pain NHS" />
        <meta property="og:locale" content="en_GB" />
        <meta name="geo.region" content="GB" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalOrganization",
          "name": "Living With Arthritis",
          "alternateName": "Living With Arthritis UK",
          "url": "https://livingwitharthritis.org.uk",
          "logo": "https://livingwitharthritis.org.uk/favicon.ico",
          "description": "UK charity providing free virtual physiotherapy, anti-inflammatory nutrition guidance, joint exercises and community support for people living with arthritis.",
          "medicalSpecialty": "Rheumatology",
          "areaServed": { "@type": "Country", "name": "United Kingdom", "sameAs": "https://en.wikipedia.org/wiki/United_Kingdom" },
          "serviceType": ["Virtual Physiotherapy", "Nutrition Guidance", "Joint Exercise Programmes", "Arthritis Support"],
          "audience": {
            "@type": "MedicalAudience", "audienceType": "Patient",
            "healthCondition": { "@type": "MedicalCondition", "name": "Arthritis", "alternateName": ["Osteoarthritis", "Rheumatoid Arthritis"], "relevantSpecialty": { "@type": "MedicalSpecialty", "name": "Rheumatology" } },
            "geographicArea": { "@type": "Country", "name": "United Kingdom" }
          },
          "contactPoint": { "@type": "ContactPoint", "telephone": "+44-7760-512-084", "email": "info@livingwitharthritis.org.uk", "contactType": "customer support", "availableLanguage": "English", "areaServed": "GB" },
          "knowsAbout": ["Osteoarthritis", "Rheumatoid Arthritis", "Joint Pain", "Anti-inflammatory Diet", "Physiotherapy", "NHS Arthritis Support"],
          "inLanguage": "en-GB"
        })}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <ScrollProgress />
        <Header />
        <Suspense fallback={null}>
          <DonationNotification />
          <FeedbackPopup />
        </Suspense>

        <main className="space-y-0">
          <HeroSection />

          <div className="container mx-auto px-5 md:px-8 space-y-0 content-deferred">
            {/* Quote */}
            <Suspense fallback={null}>
              <QuoteSection />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
              <AboutSection />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
              <ServicesGrid />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
              <HowItWorksSection />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
              <ImpactBannerSection />
            </Suspense>

            {/* ══════════════════════════════════════════
                 TABBED EXPLORE SECTION
                 Reduces scrolling by grouping heavy content
                ══════════════════════════════════════════ */}
            <section id="explore" className="scroll-mt-24 bg-tint-rose rounded-3xl p-8 md:p-12 border border-border/20">
              <div className="text-center mb-10">
                <span className="section-label text-primary mb-4 block">Resources Library</span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground tracking-tight leading-[1.08]">
                  Explore our{" "}
                  <span className="text-gradient">expert resources</span>
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
                    <Suspense fallback={<SectionLoader />}>
                      <NutritionArticleSection />
                    </Suspense>
                  </TabsContent>

                  <TabsContent value="exercises" className="space-y-10 md:space-y-14 mt-0">
                    <Suspense fallback={<SectionLoader />}>
                      <VirtualPhysioSection />
                      <JointExerciseSection />
                    </Suspense>
                  </TabsContent>

                  <TabsContent value="conditions" className="space-y-10 md:space-y-14 mt-0">
                    <Suspense fallback={<SectionLoader />}>
                      <ConditionsSection />
                    </Suspense>
                  </TabsContent>

                  <TabsContent value="community" className="space-y-10 md:space-y-14 mt-0">
                    <Suspense fallback={<SectionLoader />}>
                      <CommunitySection />
                      <TransparencySection />
                    </Suspense>
                  </TabsContent>

                  <TabsContent value="resources" className="space-y-10 md:space-y-14 mt-0">
                    <Suspense fallback={<SectionLoader />}>
                      <UKResourcesSection />
                    </Suspense>
                  </TabsContent>
                </div>
              </Tabs>
            </section>

            {/* ── Always visible: Tips, Blog, Testimonials, FAQ, Donate ── */}
            <Suspense fallback={<SectionLoader />}>
              <DailyTipsSection />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
              <BlogPreviewSection />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
              <TestimonialsSection />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
              <FAQSection />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
              <FundraisingProgressSection />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
              <NewsletterSection />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
              <GetInTouchSection />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
              <FinalCTASection />
            </Suspense>
          </div>
        </main>

        <Suspense fallback={<div className="h-96 bg-foreground" />}>
          <Footer />
        </Suspense>

        <Suspense fallback={null}>
          <div className="fixed inset-x-0 bottom-0 z-40 sm:hidden bg-background/75 backdrop-blur-2xl border-t border-border/50 px-5 py-5 shadow-2xl">
            <AppointmentModal
              trigger={
                <Button className="w-full h-14 rounded-2xl text-base font-semibold shadow-xl hover:shadow-2xl transition-all duration-300">
                  <CalendarCheck className="mr-3 h-5 w-5" aria-hidden="true" />
                  Book Free Consultation
                </Button>
              }
            />
          </div>
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}
