import { lazy, Suspense, memo, useEffect, useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import { useDeferredVisible } from "@/hooks/useDeferredVisible";
import { AppointmentModal } from "@/components/AppointmentModal";
import { CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import BlogTeaserSection from "@/components/BlogTeaserSection";
import { toast } from "sonner";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion"; // Added open source Framer Motion for UI animations

// Lazy-loaded sections
const AboutSection = lazy(() => import("@/components/AboutSection"));
const ServicesGrid = lazy(() => import("@/components/ServicesGrid"));
const VirtualPhysioSection = lazy(() => import("@/components/VirtualPhysioSection")); // Will improvise to make smarter
const NutritionArticleSection = lazy(() => import("@/components/NutritionArticleSection"));
const ConditionsSection = lazy(() => import("@/components/ConditionsSection"));
const JointExerciseSection = lazy(() => import("@/components/JointExerciseSection"));
const DonationNotification = lazy(() => import("@/components/DonationNotification"));

// Simple loader
const SectionLoader = memo(() => (
  <div className="py-16 flex items-center justify-center">
    <div className="animate-pulse h-4 w-32 bg-muted rounded" />
  </div>
));
SectionLoader.displayName = "SectionLoader";

// Static fallback articles (open source from Wikipedia, paraphrased to avoid issues)
const fallbackArticles = [
  {
    title: "Physical Therapy for Arthritis",
    excerpt:
      "Exercises can improve muscle strength, flexibility, and joint function, helping reduce pain and support daily activities.",
    link: "https://en.wikipedia.org/wiki/Arthritis#Treatment",
    imageUrl: "https://cdn.pixabay.com/photo/2015/07/02/10/05/taichi-829957_1280.jpg",
    alt: "Group practicing tai chi for joint health",
  },
  {
    title: "Exercise for Osteoarthritis",
    excerpt:
      "Low-impact activities like walking, swimming, and aerobics can reduce pain and improve function for up to 6 months.",
    link: "https://en.wikipedia.org/wiki/Osteoarthritis#Exercise",
    imageUrl: "https://cdn.pixabay.com/photo/2016/11/22/19/17/girl-1850141_1280.jpg",
    alt: "Person doing yoga for flexibility",
  },
  {
    title: "Conservative Measures for Joint Relief",
    excerpt: "Rest, applying ice or heat, and weight management help decrease joint stress and manage symptoms.",
    link: "https://en.wikipedia.org/wiki/Arthritis#Treatment",
    imageUrl: "https://cdn.pixabay.com/photo/2016/11/29/09/10/man-1868632_1280.jpg",
    alt: "Person walking in nature for low-impact exercise",
  },
  {
    title: "Aquatic Exercises for Arthritis",
    excerpt: "Swimming and water-based activities provide gentle resistance and support for joints.",
    link: "https://en.wikipedia.org/wiki/Osteoarthritis#Exercise",
    imageUrl: "https://cdn.pixabay.com/photo/2014/06/28/00/54/woman-378683_1280.jpg",
    alt: "Person swimming for arthritis relief",
  },
  {
    title: "Strength Training for Joint Support",
    excerpt: "Moderate strengthening exercises protect joints and improve overall mobility.",
    link: "https://en.wikipedia.org/wiki/Osteoarthritis#Exercise",
    imageUrl: "https://cdn.pixabay.com/photo/2017/08/06/12/06/people-2591874_1280.jpg",
    alt: "People cycling as joint-friendly activity",
  },
];

// Fallback conditions data (from Wikipedia, for backend simulation)
const fallbackConditions = [
  {
    title: "Osteoarthritis",
    description:
      "Degenerative joint disease from cartilage breakdown, often in weight-bearing joints, worsened by age, injury, or obesity.",
  },
  {
    title: "Rheumatoid Arthritis",
    description: "Autoimmune condition attacking joint linings, causing inflammation and potential deformity.",
  },
  {
    title: "Gout",
    description: "Caused by uric acid crystals in joints, leading to sudden painful swelling.",
  },
  {
    title: "Lupus",
    description: "Autoimmune disorder with joint inflammation, rashes, and organ effects.",
  },
  {
    title: "Septic Arthritis",
    description: "Infectious arthritis from bacteria, requiring prompt treatment.",
  },
];

export default function Index() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [belowFoldRef, isBelowFoldVisible] = useDeferredVisible<HTMLDivElement>("400px");

  // Articles state (dynamic with backend)
  const [articles, setArticles] = useState(fallbackArticles);
  const [articlesLoading, setArticlesLoading] = useState(true);
  const [articlesError, setArticlesError] = useState<string | null>(null);

  // Conditions state (new backend fetch for conditions button/section)
  const [conditions, setConditions] = useState(fallbackConditions);
  const [conditionsLoading, setConditionsLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch("/api/articles");
        if (!res.ok) throw new Error("Failed to fetch articles");
        const data = await res.json();
        setArticles(data.length > 0 ? data : fallbackArticles);
      } catch (err) {
        console.error("Articles fetch failed:", err);
        setArticlesError("Could not load articles. Using fallback.");
        toast.error("Backend fetch failed—using fallback articles.");
        setArticles(fallbackArticles);
      } finally {
        setArticlesLoading(false);
      }
    }

    async function fetchConditions() {
      try {
        const res = await fetch("/api/conditions");
        if (!res.ok) throw new Error("Failed to fetch conditions");
        const data = await res.json();
        setConditions(data.length > 0 ? data : fallbackConditions);
      } catch (err) {
        console.error("Conditions fetch failed:", err);
        toast.error("Backend fetch failed—using fallback conditions.");
        setConditions(fallbackConditions);
      } finally {
        setConditionsLoading(false);
      }
    }

    if (isBelowFoldVisible) {
      fetchArticles();
      fetchConditions();
    }
  }, [isBelowFoldVisible]);

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

  // Improvised virtual assistant (simple state for smarter interaction, e.g., Q&A)
  const [assistantQuery, setAssistantQuery] = useState("");
  const [assistantResponse, setAssistantResponse] = useState("");
  const handleAssistantSubmit = async () => {
    try {
      // Simulate smarter AI call (could integrate with xAI API or open source model)
      const res = await fetch("/api/virtual-assistant", {
        method: "POST",
        body: JSON.stringify({ query: assistantQuery }),
      });
      const data = await res.json();
      setAssistantResponse(data.response || "Sorry, I couldn't find an answer. Try asking about exercises!");
    } catch {
      setAssistantResponse("Error connecting to assistant.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />

        <Suspense fallback={<SectionLoader />}>
          <AboutSection />
          <ServicesGrid />
          {/* Improvised VirtualPhysioSection with smarter assistant */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <VirtualPhysioSection>
              {/* Added simple chat for smarter virtual assistant */}
              <input
                type="text"
                value={assistantQuery}
                onChange={(e) => setAssistantQuery(e.target.value)}
                placeholder="Ask about arthritis exercises..."
                className="border p-2"
              />
              <button onClick={handleAssistantSubmit}>Ask</button>
              <p>{assistantResponse}</p>
            </VirtualPhysioSection>
          </motion.div>
          <NutritionArticleSection />
        </Suspense>

        <BlogTeaserSection />

        <div ref={belowFoldRef}>
          {isBelowFoldVisible ? (
            <>
              <Suspense fallback={<SectionLoader />}>
                <ConditionsSection conditions={conditions} loading={conditionsLoading} />
                <JointExerciseSection />
              </Suspense>

              <motion.section
                className="py-16 px-4 md:px-8 bg-muted/30"
                aria-labelledby="articles-heading"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="max-w-7xl mx-auto">
                  <h2 id="articles-heading" className="text-3xl md:text-4xl font-bold text-center mb-6">
                    Open Source Guides: Natural Arthritis Relief & Exercises
                  </h2>
                  <p className="text-center text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
                    Free resources from public domain sources like Wikipedia for managing arthritis.
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
                          role="article"
                          className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                        >
                          <img
                            src={article.imageUrl}
                            alt={article.alt}
                            className="w-full h-48 object-cover"
                            loading="lazy"
                            decoding="async"
                            fetchPriority="low"
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
                    These resources are from open sources. Consult a provider before exercises.
                  </div>
                </div>
              </motion.section>
            </>
          ) : null}
        </div>
      </main>

      <Footer />
      <p className="text-center text-sm text-muted-foreground mt-4">
        © {new Date().getFullYear()} Your Site Name. All rights reserved.
      </p>

      <Suspense fallback={null}>{isBelowFoldVisible && <DonationNotification />}</Suspense>

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

export default memo(Index);
