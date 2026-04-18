import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import SkeletonSection from "@/components/landing/SkeletonSection";
import PageHero from "@/components/ui/PageHero";

const ServicesGrid = lazy(() => import("@/components/ServicesGrid"));
const Footer = lazy(() => import("@/components/Footer"));

const Services = () => (
  <>
    <Helmet>
      <title>Arthritis Support Services UK: Free Physio, Exercise & Diet Help</title>
      <meta name="description" content="Free arthritis support services in the UK — AI virtual physiotherapy, personalised exercise plans, anti-inflammatory diet guidance and 24/7 community help." />
      <link rel="canonical" href="https://livingwitharthritis.org.uk/services" />
    </Helmet>
    <Header />
    <main id="main-content" role="main" tabIndex={-1}>
      <PageHero
        badge="What we offer"
        title="Arthritis Support Services for Everyone in the UK"
        subtitle="Free, evidence-based services designed with HCPC-registered clinicians and aligned to NHS and NICE guidance."
      />
      <Suspense fallback={<SkeletonSection />}>
        <ServicesGrid />
      </Suspense>
    </main>
    <Suspense fallback={<div className="h-80 bg-secondary" aria-hidden="true" />}>
      <Footer />
    </Suspense>
  </>
);

export default Services;
