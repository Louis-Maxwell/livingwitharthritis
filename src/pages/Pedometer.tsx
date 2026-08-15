import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import { Badge } from "@/components/ui/badge";
import { Footprints } from "lucide-react";
import PedometerApp from "@/components/pedometer/PedometerApp";
import { trackEvent } from "@/lib/analytics";

export default function Pedometer() {
  useEffect(() => {
    trackEvent("pedometer_view", { path: "/pedometer" });
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      "name": "Free Step Counter & Pedometer",
      "description":
        "Free in-browser pedometer to track daily steps, distance and active minutes. Designed to support gentle, low-impact walking for people living with arthritis.",
      "url": "https://livingwitharthritis.org.uk/pedometer",
      "inLanguage": "en-GB",
      "audience": {
        "@type": "MedicalAudience",
        "audienceType": "Patient",
        "geographicArea": { "@type": "Country", "name": "United Kingdom" },
      },
    });
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  return (
    <>
      <Helmet>
        <title>Free Step Counter & Pedometer | Living With Arthritis UK</title>
        <meta
          name="description"
          content="Free pedometer for arthritis: track steps, distance, calories and streaks. Built to support gentle low-impact walking for joint health."
        />
        <meta property="og:title" content="Free Step Counter & Pedometer | Living With Arthritis UK" />
        <meta
          property="og:description"
          content="Free pedometer for arthritis: track steps, distance, calories and streaks."
        />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Pedometer | Living With Arthritis UK" />
        <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <PageBreadcrumb segments={[{ label: "Health Tools", href: "/health-tools" }, { label: "Pedometer" }]} />

        <PageHero
          badge={
            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
              <Footprints className="w-3.5 h-3.5 mr-1.5" /> Step Tracking
            </Badge>
          }
          title={<>Daily <span className="text-primary">Step Counter</span></>}
          subtitle="Walking is one of the safest, most effective ways to ease joint pain and stay mobile with arthritis. Use this free pedometer to set a daily goal, build a streak, and stay motivated."
        />

        <main id="main-content" className="container mx-auto px-5 md:px-8 py-8 md:py-12 max-w-2xl">
          <PedometerApp />

          <section className="mt-12 prose prose-sm max-w-none text-foreground">
            <h2 className="text-xl font-semibold">Why walking helps arthritis</h2>
            <p className="text-muted-foreground">
              Low-impact movement like walking helps lubricate joints, strengthens supporting
              muscles and reduces stiffness. Even short walks broken across the day can ease
              symptoms of osteoarthritis and rheumatoid arthritis. Build up gradually and stop
              if you feel sharp pain — consult your GP or physiotherapist if symptoms flare.
            </p>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
