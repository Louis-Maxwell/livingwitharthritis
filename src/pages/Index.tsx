import { lazy, Suspense, memo, useEffect, useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import { useDeferredVisible } from "@/hooks/useDeferredVisible";
import { AppointmentModal } from "@/components/AppointmentModal";
import { CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useSearchParams } from "react-router-dom";

// Lazy-loaded sections
const AboutSection = lazy(() => import("@/components/AboutSection"));
const ServicesGrid = lazy(() => import("@/components/ServicesGrid"));
const VirtualPhysioSection = lazy(() => import("@/components/VirtualPhysioSection"));
const NutritionArticleSection = lazy(() => import("@/components/NutritionArticleSection"));
const ConditionsSection = lazy(() => import("@/components/ConditionsSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const JointExerciseSection = lazy(() => import("@/components/JointExerciseSection"));
const DonationNotification = lazy(() => import("@/components/DonationNotification"));

// Simple loader
const SectionLoader = memo(() => (
  <div className="py-16 flex items-center justify-center">
    <div className="animate-pulse h-4 w-32 bg-muted rounded" />
  </div>
));
SectionLoader.displayName = "SectionLoader";

// ────────────────────────────────────────────────
// Static fallback articles (updated 2026 sources)
const fallbackArticles = [
  {
    title: "Exercising With Chronic Conditions",
    excerpt:
      "Low-impact activities like swimming, walking, and tai chi put less stress on joints and help manage arthritis pain and function.",
    link: "https://www.nia.nih.gov/health/exercise-and-physical-activity/exercising-chronic-conditions",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cfac13c2a8a?auto=format&fit=crop&w=800&q=80",
    alt: "Senior doing gentle low-impact exercises for arthritis relief",
  },
  {
    title: "About Physical Activity and Arthritis – CDC",
    excerpt:
      "Joint-friendly activities include brisk walking, cycling, swimming, water exercises, tai chi, and dancing to reduce pain and improve mood.",
    link: "https://www.cdc.gov/arthritis/prevention/index.html",
    imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80",
    alt: "Person walking briskly outdoors for joint health",
  },
  {
    title: "Managing Arthritis: 6 Natural Ways to Improve Mobility",
    excerpt:
      "UCLA Health recommends balancing/stretching (yoga), strength training, and low-impact activities like walking, water workouts, and cycling.",
    link: "https://www.uclahealth.org/news/article/managing-arthritis-6-natural-ways-improve-mobility-and",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    alt: "Gentle water-based exercise for arthritis management",
  },
  {
    title: "Living With Arthritis: Health Information Basics",
    excerpt:
      "NIAMS suggests walking, low-impact aerobics, tai chi, and yoga to lower joint pain, stiffness, and improve flexibility and strength.",
    link: "https://www.niams.nih.gov/community-outreach-initiative/understanding-joint-health/living-with-arthritis",
    imageUrl: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=800&q=80",
    alt: "Group practicing tai chi for better joint mobility",
  },
  {
    title: "The Critical Role of Physical Activity in Knee and Hip Osteoarthritis",
    excerpt:
      "PMC/NIH review: Walking, cycling, and aquatic exercise are safe low-impact options that enhance fitness and reduce OA symptoms.",
    link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10922233/",
    imageUrl: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80",
    alt: "Low-impact cycling as joint-friendly arthritis exercise",
  },
];

export default function Index() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [belowFoldRef, isBelowFoldVisible] = useDeferredVisible<HTMLDivElement>("400px");

  // Articles state (now dynamic with backend fetch)
  const [articles, setArticles] = useState(fallbackArticles);
  const [articlesLoading, setArticlesLoading] = useState(true);
  const [articlesError, setArticlesError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch("/api/articles"); // Replace with your real backend API (e.g., '/api/articles' or external)
        if (!res.ok) throw new Error("Failed to fetch articles");
        const data = await res.json();
        setArticles(data.length > 0 ? data : fallbackArticles);
      } catch (err) {
        console.warn("Articles fetch failed, using fallback:", err);
        setArticles(fallbackArticles);
      } finally {
        setArticlesLoading(false);
      }
    }

    if (isBelowFoldVisible) {
      fetchArticles();
    }
  }, [isBelowFoldVisible]);

  // ────────────────────────────────────────────────
  // Donation toast
  useEffect(() => {
    const donation = searchParams.get("donation");
    if (donation === "success") {
      toast.success("Thank you for your generous donation! 💙", {
        description: "Your contribution helps people living with arthritis.",
        duration: 6000,
      });
      setSearchParams(
        (prev) => {
          prev.delete("donation");
          return prev;
        },
        { replace: true },
      );
    } else if (donation === "cancelled") {
      toast.info("Donation cancelled. You can try again any time.");
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
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />

        {/* Grouped upper sections – one Suspense */}
        <Suspense fallback={<SectionLoader />}>
          <AboutSection />
          <ServicesGrid />
          <VirtualPhysioSection />
          <NutritionArticleSection />
        </Suspense>

        

        <div ref={belowFoldRef}>
          {isBelowFoldVisible ? (
            <>
              {/* Grouped lower sections */}
              <Suspense fallback={<SectionLoader />}>
                <ConditionsSection />
                <TestimonialsSection />
                <JointExerciseSection />
              </Suspense>

              {/* Articles & Guides Section (self-help tool, now backend-connected) */}
              <section className="py-16 px-4 md:px-8 bg-muted/30" aria-labelledby="articles-heading">
                <div className="max-w-7xl mx-auto">
                  <h2 id="articles-heading" className="text-3xl md:text-4xl font-bold text-center mb-6">
                    Articles & Guides: Natural Arthritis Relief & Exercises
                  </h2>
                  <p className="text-center text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
                    Discover free, trusted resources with low-impact exercises, pain relief tips, and evidence-based
                    guides to help manage arthritis and improve joint health.
                  </p>

                  {articlesError && <p className="text-center text-destructive mb-8">{articlesError}</p>}

                  {articlesLoading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="bg-card rounded-xl overflow-hidden shadow-md">
                          <div className="w-full h-48 bg-muted animate-pulse" />
                          <div className="p-6">
                            <div className="h-6 w-3/4 bg-muted rounded mb-3 animate-pulse" />
                            <div className="h-4 w-full bg-muted rounded mb-4 animate-pulse" />
                            <div className="h-4 w-32 bg-muted rounded animate-pulse" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {articles.map((article, idx) => (
                        <article
                          key={idx}
                          role="article" // Improved a11y
                          className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                        >
                          <img
                            src={article.imageUrl}
                            alt={article.alt}
                            className="w-full h-48 object-cover"
                            loading="lazy"
                            decoding="async"
                            fetchPriority="low" // Perf hint for below-fold
                            width={800}
                            height={480}
                          />
                          <div className="p-6">
                            <h3 className="text-xl font-semibold mb-3">{article.title}</h3>
                            <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                            <a
                              href={article.link}
                              target="_blank"
                              rel="noopener noreferrer nofollow"
                              className="text-primary hover:underline font-medium"
                            >
                              Read More →
                            </a>
                          </div>
                        </article>
                      ))}
                    </div>
                  )}

                  <div className="text-center mt-12 text-muted-foreground">
                    These evidence-based resources are free from trusted health organizations. Consult your healthcare
                    provider before beginning new exercises.
                  </div>
                </div>
              </section>
            </>
          ) : (
            <div className="min-h-[70vh] sm:min-h-[90vh] bg-muted/20" />
          )}
        </div>
      </main>

      <Footer />
      {/* Copyright example – add this (or similar) inside your actual Footer component */}
      <p className="text-center text-sm text-muted-foreground mt-4">
        © {new Date().getFullYear()} Your Site Name. All rights reserved.
      </p>

      <Suspense fallback={null}>{isBelowFoldVisible && <DonationNotification />}</Suspense>

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-background/95 backdrop-blur-xl border-t border-border/40 px-4 py-3 shadow-large">
        <AppointmentModal
          trigger={
            <Button className="w-full btn-primary-cta h-12 rounded-full text-sm font-bold tracking-wide shadow-medium">
              <CalendarCheck className="w-4 h-4 mr-2" aria-hidden="true" />
              Book Free Consultation
            </Button>
          }
        />
      </div>
    </div>
  );
}


