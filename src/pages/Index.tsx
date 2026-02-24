import { lazy, Suspense, memo, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarCheck } from "lucide-react";
import { toast } from "sonner";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import { useDeferredVisible } from "@/hooks/useDeferredVisible";
import { AppointmentModal } from "@/components/AppointmentModal";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import ErrorBoundary from "@/components/ErrorBoundary";
import DonationNotification from "@/components/DonationNotification";
import { fallbackArticles, type Article } from "@/data/articles";

// Lazy sections (existing)
const AboutSection = lazy(() => import("@/components/AboutSection"));
const ServicesGrid = lazy(() => import("@/components/ServicesGrid"));
const VirtualPhysioSection = lazy(() => import("@/components/VirtualPhysioSection"));
const NutritionArticleSection = lazy(() => import("@/components/NutritionArticleSection"));
const ConditionsSection = lazy(() => import("@/components/ConditionsSection"));
const JointExerciseSection = lazy(() => import("@/components/JointExerciseSection"));

// Lazy sections (landing page sections – curated for optimal flow)
const TrustBarSection = lazy(() => import("@/components/landing/TrustBarSection"));
const HowItWorksSection = lazy(() => import("@/components/landing/HowItWorksSection"));
const ImpactBannerSection = lazy(() => import("@/components/landing/ImpactBannerSection"));
const TestimonialsSection = lazy(() => import("@/components/landing/TestimonialsSection"));
const ExpertsSection = lazy(() => import("@/components/landing/ExpertsSection"));
const DailyTipsSection = lazy(() => import("@/components/landing/DailyTipsSection"));
const FAQSection = lazy(() => import("@/components/landing/FAQSection"));
const VideoCTASection = lazy(() => import("@/components/landing/VideoCTASection"));
const CommunitySection = lazy(() => import("@/components/landing/CommunitySection"));
const FundraisingProgressSection = lazy(() => import("@/components/landing/FundraisingProgressSection"));
const BlogPreviewSection = lazy(() => import("@/components/landing/BlogPreviewSection"));
const NewsletterSection = lazy(() => import("@/components/landing/NewsletterSection"));
const FinalCTASection = lazy(() => import("@/components/landing/FinalCTASection"));

const SectionLoader = memo(() => (
  <div className="py-20 flex items-center justify-center">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/30 border-t-primary" />
  </div>
));
SectionLoader.displayName = "SectionLoader";

const ArticleCard = memo(({ article, index }: { article: Article; index: number }) => (
  <motion.div
    whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.08 }}
  >
    <Accordion type="single" collapsible>
      <AccordionItem
        value={`item-${index}`}
        className="bg-card/90 backdrop-blur-sm border-none rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
      >
        <OptimizedImage
          src={article.imageUrl}
          alt={article.alt}
          className="h-64 md:h-72 lg:h-80"
          priority={index < 3}
        />
        <AccordionTrigger className="px-6 py-5 text-xl font-semibold hover:no-underline">
          {article.title}
        </AccordionTrigger>
        <AccordionContent className="px-6 pb-8 text-muted-foreground leading-relaxed prose prose-sm max-w-none">
          {article.content}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </motion.div>
));
ArticleCard.displayName = "ArticleCard";

export default function Index() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [belowFoldRef, isBelowFoldVisible] = useDeferredVisible<HTMLDivElement>("500px");
  const articles = fallbackArticles;

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

      <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-primary/5">
        <Header />
        <DonationNotification />

        <main className="space-y-0">
          <HeroSection />

          {/* Trust Bar – immediately after hero */}
          <Suspense fallback={<SectionLoader />}>
            <TrustBarSection />
          </Suspense>

          <div className="container mx-auto px-5 md:px-8 space-y-20">
            <Suspense fallback={<SectionLoader />}>
              <AboutSection />
              <ServicesGrid />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
              <HowItWorksSection />
              <VirtualPhysioSection />
            </Suspense>

            {/* Impact Banner */}
            <Suspense fallback={<SectionLoader />}>
              <ImpactBannerSection />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
              <NutritionArticleSection />
              <DailyTipsSection />
            </Suspense>

          <div ref={belowFoldRef}>
              {isBelowFoldVisible && (
                <Suspense fallback={<SectionLoader />}>
                  <div className="space-y-20">
                    <ConditionsSection />
                    <JointExerciseSection />
                    <VideoCTASection />
                    <TestimonialsSection />
                    <ExpertsSection />
                    <CommunitySection />
                    <FundraisingProgressSection />
                    <BlogPreviewSection />
                    <NewsletterSection />
                    <FAQSection />

                    <section aria-labelledby="guides-heading" className="space-y-12">
                      <div className="text-center space-y-5">
                        <h2 id="guides-heading" className="text-4xl md:text-5xl font-bold tracking-tight">
                          Gentle Exercise Guides
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                          Tai Chi, Pilates & low-impact movements inspired by open knowledge
                        </p>
                      </div>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                        {articles.map((article, idx) => (
                          <ArticleCard key={idx} article={article} index={idx} />
                        ))}
                      </div>
                    </section>

                    <FinalCTASection />
                  </div>
                </Suspense>
              )}
            </div>
          </div>
        </main>

        <Footer />

        <div className="fixed inset-x-0 bottom-0 z-50 sm:hidden bg-background/75 backdrop-blur-2xl border-t border-border/50 px-5 py-5 shadow-2xl">
          <AppointmentModal
            trigger={
              <Button className="w-full h-14 rounded-2xl text-base font-semibold shadow-xl hover:shadow-2xl transition-all duration-300">
                <CalendarCheck className="mr-3 h-5 w-5" aria-hidden="true" />
                Book Free Consultation
              </Button>
            }
          />
        </div>
      </div>
    </ErrorBoundary>
  );
}
