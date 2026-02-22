// src/pages/Index.tsx
import { lazy, Suspense, memo, useEffect, useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { debounce } from "lodash"; // npm install lodash
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarCheck } from "lucide-react";
import { toast } from "sonner";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import BlogTeaserSection from "@/components/BlogTeaserSection";
import { useDeferredVisible } from "@/hooks/useDeferredVisible";
import { AppointmentModal } from "@/components/AppointmentModal";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import ErrorBoundary from "@/components/ErrorBoundary"; // new simple component

// Lazy sections
const AboutSection = lazy(() => import("@/components/AboutSection"));
const ServicesGrid = lazy(() => import("@/components/ServicesGrid"));
const VirtualPhysioSection = lazy(() => import("@/components/VirtualPhysioSection"));
const NutritionArticleSection = lazy(() => import("@/components/NutritionArticleSection"));
const ConditionsSection = lazy(() => import("@/components/ConditionsSection"));
const JointExerciseSection = lazy(() => import("@/components/JointExerciseSection"));
const DonationNotification = lazy(() => import("@/components/DonationNotification"));

// Loader with better UX
const SectionLoader = memo(() => (
  <div className="py-20 flex items-center justify-center">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/30 border-t-primary" />
  </div>
));
SectionLoader.displayName = "SectionLoader";

// Typed data import
import { fallbackArticles, type Article } from "@/data/articles";

// Memoized Article Card with JSON-LD
const ArticleCard = memo(({ article, index }: { article: Article; index: number }) => {
  const origin = typeof window !== "undefined" ? window.location.origin : "";

  return (
    <>
      {/* Per-article structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.content.slice(0, 160) + "...",
            image: `${origin}${article.imageUrl}.jpg`,
            datePublished: "2026-02-01", // ← update or make dynamic
            author: { "@type": "Organization", name: "Your Arthritis Relief" },
            publisher: { "@type": "Organization", name: "Your Site Name" },
          }),
        }}
      />

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
    </>
  );
});
ArticleCard.displayName = "ArticleCard";

export default function Index() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [belowFoldRef, isBelowFoldVisible] = useDeferredVisible<HTMLDivElement>("500px");

  const [articles, setArticles] = useState(fallbackArticles);
  const [articlesLoading, setArticlesLoading] = useState(true);
  const [articlesError, setArticlesError] = useState<string | null>(null);

  const [assistantQuery, setAssistantQuery] = useState("");
  const [assistantResponse, setAssistantResponse] = useState("");

  // Debounced assistant handler (auto-preview / submit)
  const debouncedSubmit = useCallback(
    debounce(async (query: string) => {
      if (!query.trim()) return;
      try {
        // Replace with real API call when ready
        const res = await fetch("/api/virtual-assistant", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query }),
        });
        const data = await res.json();
        setAssistantResponse(data.response || "No answer found. Try rephrasing.");
      } catch {
        setAssistantResponse("Sorry, the assistant is having trouble right now.");
      }
    }, 450),
    [],
  );

  useEffect(() => {
    debouncedSubmit(assistantQuery);
    return () => debouncedSubmit.cancel();
  }, [assistantQuery, debouncedSubmit]);

  // Donation toast (unchanged)
  useEffect(() => {
    const donation = searchParams.get("donation");
    if (donation === "success") {
      toast.success("Thank you! Your donation means a lot.", { duration: 7000 });
      setSearchParams(
        (prev) => {
          prev.delete("donation");
          return prev;
        },
        { replace: true },
      );
    } else if (donation === "cancelled") {
      toast.info("Donation cancelled.", { duration: 5000 });
      setSearchParams(
        (prev) => {
          prev.delete("donation");
          return prev;
        },
        { replace: true },
      );
    }
  }, [searchParams, setSearchParams]);

  return (
    <ErrorBoundary
      fallback={<div className="p-12 text-center text-destructive">Something went wrong. Please refresh.</div>}
    >
      <Helmet>
        <title>Arthritis Relief – Tai Chi, Pilates & Virtual Physio</title>
        <meta
          name="description"
          content="Gentle, evidence-informed exercises including Tai Chi and Pilates to help manage arthritis pain and improve joint mobility. Free guides & consultations."
        />
        <meta property="og:title" content="Natural Arthritis Support | Tai Chi • Pilates • Physio" />
        <meta
          property="og:description"
          content="Open-knowledge inspired resources and professional help for better joint health."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-primary/5">
        <Header />

        <main className="space-y-20 md:space-y-24">
          <HeroSection />

          <div className="container mx-auto px-5 md:px-8 space-y-20">
            <Suspense fallback={<SectionLoader />}>
              <AboutSection />
              <ServicesGrid />
              <VirtualPhysioSection />
              <NutritionArticleSection />
            </Suspense>

            <BlogTeaserSection />

            <div ref={belowFoldRef}>
              {isBelowFoldVisible && (
                <Suspense fallback={<SectionLoader />}>
                  <div className="space-y-20">
                    <ConditionsSection />
                    <JointExerciseSection />

                    <section aria-labelledby="guides-heading" className="space-y-12">
                      <div className="text-center space-y-5">
                        <h2 id="guides-heading" className="text-4xl md:text-5xl font-bold tracking-tight">
                          Gentle Exercise Guides
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                          Tai Chi, Pilates & low-impact movements inspired by open knowledge
                        </p>
                      </div>

                      {articlesError && (
                        <p className="text-center text-lg text-destructive font-medium">{articlesError}</p>
                      )}

                      {articlesLoading ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                          {[...Array(4)].map((_, i) => (
                            <div key={i} className="space-y-4">
                              <Skeleton className="h-72 w-full rounded-2xl" />
                              <Skeleton className="h-8 w-3/4 mx-auto" />
                              <Skeleton className="h-5 w-full" />
                              <Skeleton className="h-5 w-2/3" />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                          {articles.map((article, idx) => (
                            <ArticleCard key={idx} article={article} index={idx} />
                          ))}
                        </div>
                      )}
                    </section>
                  </div>
                </Suspense>
              )}
            </div>
          </div>
        </main>

        <Footer />

        {/* Glass CTA */}
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
