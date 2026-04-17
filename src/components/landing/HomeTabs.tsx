import { lazy, memo, Suspense, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import SkeletonSection from "./SkeletonSection";

const WhyUsSection = lazy(() => import("./WhyUsSection"));
const TestimonialsSection = lazy(() => import("./TestimonialsSection"));
const DonationImpactSection = lazy(() => import("./DonationImpactSection"));
const FAQSection = lazy(() => import("./FAQSection"));
const AITrustSection = lazy(() => import("./AITrustSection"));

const tabs = [
  { value: "why", label: "Why us" },
  { value: "stories", label: "Real stories" },
  { value: "impact", label: "Your impact" },
  { value: "faq", label: "FAQ" },
  { value: "ai", label: "AI safety" },
];

/**
 * Groups 5 secondary sections into a single tabbed area to eliminate
 * forced scrolling for users in pain. Lazy-loads each tab's content on demand.
 */
const HomeTabs = memo(() => {
  const [active, setActive] = useState("why");

  return (
    <section id="explore" className="py-16 lg:py-24 scroll-mt-32">
      <div className="container mx-auto px-4 sm:px-6 mb-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-block text-[11px] font-bold tracking-[0.25em] text-primary/80 uppercase mb-3">
            Explore
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground tracking-tight">
            Pick what helps you most
          </h2>
          <p className="mt-3 text-muted-foreground">
            Tap a tab — no need to scroll through everything.
          </p>
        </div>
      </div>

      <Tabs value={active} onValueChange={setActive} className="w-full">
        <div className="container mx-auto px-3 sm:px-6 mb-6">
          <TabsList className="flex w-full overflow-x-auto h-auto bg-card p-1.5 rounded-full justify-start sm:justify-center [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {tabs.map((t) => (
              <TabsTrigger
                key={t.value}
                value={t.value}
                className="shrink-0 min-h-[44px] px-5 rounded-full text-sm font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value="why" className="mt-0">
          <Suspense fallback={<SkeletonSection />}>{active === "why" && <WhyUsSection />}</Suspense>
        </TabsContent>
        <TabsContent value="stories" className="mt-0">
          <Suspense fallback={<SkeletonSection />}>{active === "stories" && <TestimonialsSection />}</Suspense>
        </TabsContent>
        <TabsContent value="impact" className="mt-0">
          <Suspense fallback={<SkeletonSection />}>{active === "impact" && <DonationImpactSection />}</Suspense>
        </TabsContent>
        <TabsContent value="faq" className="mt-0">
          <Suspense fallback={<SkeletonSection />}>{active === "faq" && <FAQSection />}</Suspense>
        </TabsContent>
        <TabsContent value="ai" className="mt-0">
          <Suspense fallback={<SkeletonSection />}>{active === "ai" && <AITrustSection />}</Suspense>
        </TabsContent>
      </Tabs>
    </section>
  );
});

HomeTabs.displayName = "HomeTabs";
export default HomeTabs;
