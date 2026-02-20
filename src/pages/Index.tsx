// src/pages/Index.tsx
import { lazy, Suspense, memo, useEffect, useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { debounce } from "lodash"; // npm install lodash
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import OptimizedImage from "@/components/OptimizedImage";
import ErrorBoundary from "@/components/ErrorBoundary";

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
            image: article.imageUrl.startsWith('http') ? article.imageUrl : `${origin}${article.imageUrl}.jpg`,
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
              fetchpriority={index < 3 ? "high" : "low"} // first 3 cards prioritized
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
        if (!res.ok) throw new Error('Assistant fetch failed');
        const data = await res.json();
        setAssistantResponse(data.response || "No answer found. Try rephrasing.");
      } catch {
        setAssistantResponse("Sorry, the assistant is having trouble right now. Using fallback knowledge.");
        // Fallback logic if backend fails
      }
    }, 450),
    []
  );

  useEffect(() => {
    debouncedSubmit(assistantQuery);
    return () => debouncedSubmit.cancel();
  }, [assistantQuery, debouncedSubmit]);

  // Fetch articles with improved error handling
  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch('/api/articles', { cache: 'no-store' }); // Force fresh data
        if (!res.ok) throw new Error(`Backend error: ${res.status}`);
        const data = await res.json();
        setArticles(data.length > 0 ? data : fallbackArticles);
      } catch (err) {
        console.error(err);
        setArticlesError("Backend unavailable - using latest fallback guides.");
        toast.error("Couldn't connect to backend for latest insights. Showing cached guides.");
        setArticles(fallbackArticles);
      } finally {
        setArticlesLoading(false);
      }
    }

    if (isBelowFoldVisible) {
      fetchArticles();
    }
  }, [isBelowFoldVisible]);

  // Donation toast (unchanged)
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
    <ErrorBoundary fallback={<div className="p-12 text-center text-destructive">Something went wrong. Please refresh.</div>}>
      <Helmet>
        <title>Arthritis Relief – Tai Chi, Pilates & Virtual Physio</title>
        <meta
          name="description"
          content="Gentle, evidence-informed exercises including Tai Chi and Pilates to help manage arthritis pain and improve joint mobility. Free guides & consultations."
        />
        <meta property="og:title" content="Natural Arthritis Support | Tai Chi • Pilates • Physio" />
        <meta property="og:description" content="Open-knowledge inspired resources and professional help for better joint health." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-primary/5">
        <Header />

        <main className="space-y-20 md:space-y-24">
          <HeroSection />

          <div className="container mx-auto px-5 md:px-8 space-y-20">
            <Suspense fallback={<SectionLoader />}>
              <AboutSection />
              <ServicesGrid />
              <VirtualPhysioSection>
                <div className="max-w-2xl mx-auto bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-lg p-8 md:p-10 rounded-3xl shadow-2xl border border-border/40">
                  <label htmlFor="assistant-input" className="sr-only">
                    Ask questions about arthritis exercises, Tai Chi, Pilates or joint health
                  </label>
                  <input
                    id="assistant-input"
                    type="text"
                    value={assistantQuery}
                    onChange={(e) => setAssistantQuery(e.target.value)}
                    placeholder="Ask anything about Tai Chi, Pilates or arthritis relief…"
                    className="w-full px-5 py-4 rounded-xl bg-background/70 border border-input focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none transition-all text-lg"
                  />
                  <div
                    role="region"
                    aria-label="Assistant response area"
                    aria-live="polite"
                    className="mt-6 min-h-[5rem] text-muted-foreground leading-relaxed prose prose-neutral prose-sm"
                  >
                    {assistantResponse || <span className="opacity-60 italic">Your answer will appear here…</span>}
                  </div>
                </div>
              </VirtualPhysioSection>
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
// src/data/articles.ts (updated with new articles from Mayo Clinic and real image URLs)
export interface Article {
  title: string;
  content: string;
  imageUrl: string;  // Now supports full external URLs
  alt: string;
}

export const fallbackArticles: Article[] = [
  {
    title: "Tai Chi for Arthritis Relief",
    content: "Tai chi promotes health through correct alignment... [previous full text] ",
    imageUrl: "https://domf5oio6qrcr.cloudfront.net/medialibrary/7698/3941c494-3728-4643-9f9b-6e544d32567416207267240004.jpg",
    alt: "Woman practicing Tai Chi pose indoors for osteoarthritis relief",
  },
  {
    title: "Pilates for Arthritis Management",
    content: "Pilates exercises involve a limited number of repetitions... [previous full text]",
    imageUrl: "https://www.movewellness.com/wp-content/uploads/2023/09/Copy-of-FULL-RES-MBP01377-scaled.jpg",
    alt: "Instructor assisting client on Pilates reformer for arthritis management",
  },
  // New from Mayo
  {
    title: "Range-of-Motion Exercises for Arthritis",
    content: "These exercises lessen stiffness and put joints through their full range of motion. Examples include stretching arms up high or rolling shoulders forward and backward. Most of these exercises can be done every day. They reduce joint pain, improve flexibility, and can be combined with daily activities. Start slowly and consult a provider if pain occurs.",
    imageUrl: "https://media.springernature.com/lw685/springer-static/image/art%3A10.1186%2Fs12906-023-04070-0/MediaObjects/12906_2023_4070_Fig2_HTML.png",
    alt: "Illustrated sequence of Tai Chi poses for knee osteoarthritis relief",
  },
  {
    title: "Strengthening Exercises for Joint Support",
    content: "These exercises help build strong muscles that can support and protect the joints. Weight training is an example, using resistance bands, hand weights or machines. Do every other day for at least two days a week, including all major muscles. They maintain bone strength, increase energy, and prevent muscle weakening. Use proper form to avoid injury.",
    imageUrl: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXd_fAVCtF-W6UYkqco0rJGzlrgtyXjpkLAqU7kh2NjGYLK17jMiaRmR8Djr3QfMZbiIEDSDNFUbYWbC6VlWKR7SxpmJVzeXo7xaVrjaEf0KmGC_0C8eglhWiPObAp50NnjsROXwYEeuXdarknq7VL8HPvsaXlsE5TitUQ1kDQ?key=ehC6xXLlbzYj_c-wtJykJw",
    alt: "Infographic of joint-friendly exercises for arthritis including stretching, water exercises, strength building, walking, yoga and tai chi",
  },
  {
    title: "Aerobic Exercises for Arthritis Fitness",
    content: "Exercises that raise heart rate help with overall fitness. They improve heart and lung health, control weight, and increase energy. Examples of gentle options include walking, bicycling, swimming and water aerobics. Aim for 150 minutes weekly, in 10-minute sessions if needed. Exercise at a moderate rate where breathing is harder but talking possible.",
    imageUrl: "https://i.ytimg.com/vi/hEu--9lGdLk/maxresdefault.jpg",
    alt: "Woman doing seated leg exercise in home workout for arthritis friendly routine",
  },
  {
    title: "Other Gentle Activities for Daily Movement",
    content: "Any movement helps, like mowing the lawn, raking leaves, or walking the dog. Gentle yoga or tai chi improve balance, posture, prevent falls, and ease tenseness. Inform instructors about your arthritis and avoid painful movements. These can be integrated into daily life for sustained benefits.",
    imageUrl: "https://media.cnn.com/api/v1/images/stellar/prod/230203140249-02-exercises-for-arthritis-pain-relief-wellness-stock.jpg?c=original",
    alt: "Group doing low-impact Pilates exercises on reformers for arthritis pain relief",
  },
];
// src/components/OptimizedImage.tsx (updated to handle external full URLs)
import { memo } from 'react';

interface OptimizedImageProps {
  src: string; // now full URL or base path
  alt: string;
  className?: string;
  fetchpriority?: string;
  sizes?: string;
}

const OptimizedImage = memo(({ src, alt, className = "", fetchpriority = "low", sizes = "(max-width: 768px) 100vw, 33vw" }: OptimizedImageProps) => {
  if (src.startsWith('http')) {
    // External full URL - no AVIF/WebP assumption
    return (
      <img
        src={src}
        alt={alt}
        className={`w-full object-cover ${className}`}
        loading="lazy"
        decoding="async"
        fetchpriority={fetchpriority}
        sizes={sizes}
        width={800}
        height={480}
      />
    );
  } else {
    // Local base path
    return (
      <picture>
        <source srcSet={`${src}.avif`} type="image/avif" />
        <source srcSet={`${src}.webp`} type="image/webp" />
        <img
          src={`${src}.jpg`}
          alt={alt}
          className={`w-full object-cover ${className}`}
          loading="lazy"
          decoding="async"
          fetchpriority={fetchpriority}
          sizes={sizes}
          width={800}
          height={480}
        />
      </picture>
    );
  }
});

export default OptimizedImage;
// Backend example (Node.js/Express) - updated with more robust error handling and latest articles
const express = require('express');
const app = express();
app.use(express.json());

// Sample data with new articles
const articles = [
  // ... previous + new from Mayo
  {
    title: "Range-of-Motion Exercises for Arthritis",
    content: "These exercises lessen stiffness... [full from Mayo]",
    imageUrl: "https://media.springernature.com/lw685/springer-static/image/art%3A10.1186%2Fs12906-023-04070-0/MediaObjects/12906_2023_4070_Fig2_HTML.png",
    alt: "Illustrated sequence of Tai Chi poses for knee osteoarthritis relief",
  },
  // add others
];

app.get('/api/articles', (req, res) => {
  try {
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: 'Backend error fetching articles' });
  }
});

// ... other endpoints

app.listen(3000, () => console.log('Backend running on port 3000'));
{
  "@type": "HowTo",
  "name": "Range-of-Motion Exercises for Arthritis",
  "step": [
    {"@type": "HowToStep", "text": "Raise arms slowly overhead..."}
  ]
}
:focus-visible {
  outline: 3px solid hsl(var(--primary));
  outline-offset: 3px;
  box-shadow: 0 0 0 6px hsl(var(--primary) / 0.25);
}
// hooks/useArticles.ts
export function useArticles(visible: boolean) {
  // return { articles, loading, error }
}
interface BackendArticleResponse {
  title: string;
  content: string;
  imageUrl: string;
  alt: string;
}
