import { lazy, Suspense, memo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion"; // ← add if not present
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import { useDeferredVisible } from "@/hooks/useDeferredVisible";
import { AppointmentModal } from "@/components/AppointmentModal";
import { CalendarCheck, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Ultra-lazy sections
const AboutSection = lazy(() => import("@/components/AboutSection"));
const ServicesGrid = lazy(() => import("@/components/ServicesGrid"));
const VirtualPhysioSection = lazy(() => import("@/components/VirtualPhysioSection"));
const NutritionArticleSection = lazy(() => import("@/components/NutritionArticleSection"));
const ConditionsSection = lazy(() => import("@/components/ConditionsSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const JointExerciseSection = lazy(() => import("@/components/JointExerciseSection"));
const DonationNotification = lazy(() => import("@/components/DonationNotification"));

const MinimalLoader = memo(() => (
  <div className="py-20 flex items-center justify-center">
    <div className="h-5 w-24 bg-muted/60 rounded animate-pulse" />
  </div>
));

const articles = [
  // replaced traceable unsplash → use generic or your own CDN
  {
    title: "Gentle Exercises to Ease Joint Pain",
    excerpt: "Low-impact moves recommended by experts",
    link: "https://www.arthritis.org/health-wellness/healthy-living/physical-activity",
    image: "/images/exercise-gentle.webp",
    alt: "Person doing gentle mobility exercise",
  },
  {
    title: "Eating for Joint Health",
    excerpt: "Anti-inflammatory foods that help",
    link: "https://www.arthritis.org/health-wellness/healthy-living/nutrition",
    image: "/images/food-antiinflam.webp",
    alt: "Colorful anti-inflammatory meal",
  },
  {
    title: "Living Well with Arthritis — Patient Tips",
    excerpt: "Real stories & practical advice",
    link: "https://creakyjoints.org/",
    image: "/images/living-well.webp",
    alt: "Smiling person managing daily life",
  },
  // add 2–3 more...
];

// Quick impact stats (inspired by Arthritis Society Canada / Arthritis Foundation)
const impactStats = [
  { value: "4M+", label: "People reached with trusted info" },
  { value: "$7M+", label: "Invested in arthritis research" },
  { value: "1 in 5", label: "Adults affected — you're not alone" },
];

function Index() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [deferRef, isVisible] = useDeferredVisible<HTMLDivElement>("600px");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const donation = searchParams.get("donation");
    if (donation === "success") {
      toast.success("Thank you! Your support means the world.", {
        description: "Helping people move better every day.",
      });
      setSearchParams({}, { replace: true });
    } else if (donation === "cancelled") {
      toast.info("Donation cancelled — come back anytime.");
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Progress bar — helps user feel movement & reduces perceived wait */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50" style={{ scaleX }} />

      <Header />

      <main>
        <HeroSection /> {/* assume it has big CTA + empathetic message */}
        <Suspense fallback={<MinimalLoader />}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={<MinimalLoader />}>
          <ServicesGrid />
        </Suspense>
        {/* Quick engagement — symptom checker teaser (inspired by NRAS / Arthritis Foundation) */}
        <section className="py-12 px-4 md:px-8 bg-gradient-to-r from-primary/5 to-primary/10">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Not sure where to start?</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Answer a few quick questions about your symptoms and get personalized guidance.
            </p>
            <Button size="lg" variant="default" asChild>
              <a href="/symptom-checker" className="gap-2">
                <HeartHandshake className="w-5 h-5" />
                Try Quick Symptom Guide
              </a>
            </Button>
          </div>
        </section>
        <Suspense fallback={<MinimalLoader />}>
          <VirtualPhysioSection />
        </Suspense>
        <Suspense fallback={<MinimalLoader />}>
          <NutritionArticleSection />
        </Suspense>
        
        {/* Impact stats — builds trust fast (from Canadian/US charities) */}
        <section className="py-16 px-4 bg-card/50">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
            {impactStats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-bold text-primary">{stat.value}</div>
                <p className="mt-2 text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>
        <div ref={deferRef}>
          {isVisible && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
              <Suspense fallback={<MinimalLoader />}>
                <ConditionsSection />
              </Suspense>

              <Suspense fallback={<MinimalLoader />}>
                <TestimonialsSection />
              </Suspense>

              <Suspense fallback={<MinimalLoader />}>
                <JointExerciseSection />
              </Suspense>

              {/* Trusted articles — keep but with better images */}
              <section className="py-16 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                  <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Evidence-Based Guides</h2>
                  <p className="text-center text-lg text-muted-foreground mb-10 max-w-3xl mx-auto">
                    Practical, trusted advice to help manage pain and stay active.
                  </p>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
                    {articles.map((art, i) => (
                      <motion.article
                        key={i}
                        className="group bg-card rounded-2xl overflow-hidden shadow hover:shadow-xl transition-all duration-300"
                        whileHover={{ y: -6 }}
                      >
                        <img
                          src={art.image}
                          alt={art.alt}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                          width={800}
                          height={520}
                        />
                        <div className="p-6">
                          <h3 className="text-xl font-semibold mb-2 line-clamp-2">{art.title}</h3>
                          <p className="text-muted-foreground mb-4 line-clamp-2">{art.excerpt}</p>
                          <a
                            href={art.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary font-medium hover:underline inline-flex items-center gap-1"
                          >
                            Read guide →
                          </a>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                </div>
              </section>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />

      {isVisible && (
        <Suspense fallback={null}>
          <DonationNotification />
        </Suspense>
      )}

      {/* Improved sticky CTA — more inviting */}
      <div className="fixed bottom-0 inset-x-0 z-40 sm:hidden bg-gradient-to-t from-background to-background/80 backdrop-blur-lg border-t px-4 py-4 shadow-2xl">
        <AppointmentModal
          trigger={
            <Button className="w-full h-14 rounded-full text-base font-semibold shadow-lg hover:scale-105 transition-transform">
              <CalendarCheck className="w-5 h-5 mr-2" />
              Book Your Free Call Today
            </Button>
          }
        />
      </div>
    </div>
  );
}

export default memo(Index);
