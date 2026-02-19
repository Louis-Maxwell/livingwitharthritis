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

// Simple loader for Suspense
const SectionLoader = memo(() => (
  <div className="py-16 flex items-center justify-center">
    <div className="animate-pulse h-4 w-32 bg-muted rounded" />
  </div>
));
SectionLoader.displayName = "SectionLoader";

// Hard-coded fallback articles
const fallbackArticles = [
  {
    title: "Exercise Helps Ease Arthritis Pain and Stiffness",
    excerpt: "Mayo Clinic guide: range-of-motion, strengthening, and low-impact aerobic exercises safe for arthritis.",
    link: "https://www.mayoclinic.org/diseases-conditions/arthritis/in-depth/arthritis/art-20047971",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cfac13c2a8a?auto=format&fit=crop&w=800&q=80",
    alt: "Senior doing gentle range-of-motion exercises for arthritis pain relief",
  },
  {
    title: "14 Joint-Friendly Ways to Work Out With Arthritis",
    excerpt: "Arthritis Foundation: walking in water, tai chi, yoga, and more low-impact activities.",
    link: "https://www.arthritis.org/health-wellness/healthy-living/physical-activity/other-activities/14-ways-to-work-out-with-arthritis",
    imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80",
    alt: "Person performing low-impact water exercises for joint-friendly arthritis workout",
  },
  {
    title: "Exercise for Knee and Hip Osteoarthritis",
    excerpt: "Open-access review (PMC/NIH): evidence-based exercise prescriptions for pain relief.",
    link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10199279/",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    alt: "Gentle stretching and muscle strengthening for osteoarthritis management",
  },
  {
    title: "Strength Training Benefits for Arthritis",
    excerpt: "Mayo Clinic: building muscle protects joints, reduces pain, improves function.",
    link: "https://www.mayoclinic.org/healthy-lifestyle/fitness/in-depth/strength-training/art-20046670",
    imageUrl: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=800&q=80",
    alt: "Senior doing seated strength training for arthritis support",
  },
  {
    title: "At-Home Exercises for Healthy Joints",
    excerpt: "Simple daily stretches and strengthening moves from trusted sources.",
    link: "https://www.arthritisresearch.ca/arthritis-at-home-exercise-guide",
    imageUrl: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80",
    alt: "Group doing low-impact tai chi for arthritis mobility",
  },
];

export default function Index() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [deferRef, showDeferred] = useDeferredVisible<HTMLDivElement>("400px");

  const [articles, setArticles] = useState<typeof fallbackArticles>([]);
  const [articlesLoading, setArticlesLoading] = useState(true);
  const [articlesError, setArticlesError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArticles() {
      try {
        setArticles(fallbackArticles);
      } catch (err) {
        console.error("Articles fetch failed:", err);
        setArticlesError("Could not load latest articles. Showing default guides.");
        setArticles(fallbackArticles);
      } finally {
        setArticlesLoading(false);
      }
    }
    if (showDeferred) {
      fetchArticles();
    }
  }, [showDeferred]);

  // Donation toast logic
  useEffect(() => {
    const donation = searchParams.get("donation");
    if (donation === "success") {
      toast.success("Thank you for your generous donation! 💙", {
        description: "Your contribution helps people living with arthritis.",
        duration: 6000,
      });
      setSearchParams({}, { replace: true });
    } else if (donation === "cancelled") {
      toast.info("Donation cancelled. You can try again any time.");
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <Suspense fallback={<SectionLoader />}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <ServicesGrid />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <VirtualPhysioSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <NutritionArticleSection />
        </Suspense>
        <div ref={deferRef}>
          {showDeferred ? (
            <>
              <Suspense fallback={<SectionLoader />}>
                <ConditionsSection />
              </Suspense>
              <Suspense fallback={<SectionLoader />}>
                <TestimonialsSection />
              </Suspense>
              <Suspense fallback={<SectionLoader />}>
                <JointExerciseSection />
              </Suspense>
              {/* Dynamic Articles & Guides Section */}
              <section className="py-16 px-4 md:px-8 bg-muted/30" aria-labelledby="articles-heading">
                <div className="max-w-7xl mx-auto">
                  <h2 id="articles-heading" className="text-3xl md:text-4xl font-bold text-center mb-6">
                    Articles & Guides: Natural Arthritis Relief & Exercises
                  </h2>
                  <p className="text-center text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
                    Discover free, trusted resources with low-impact exercises, pain relief tips,
                    and evidence-based guides to help manage arthritis and improve joint health.
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
                          className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                        >
                          <img
                            src={article.imageUrl}
                            alt={article.alt}
                            className="w-full h-48 object-cover"
                            loading="lazy"
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
                    These evidence-based resources are free from trusted health organizations.
                    Consult your healthcare provider before beginning new exercises.
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
      <Suspense fallback={null}>{showDeferred && <DonationNotification />}</Suspense>
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
