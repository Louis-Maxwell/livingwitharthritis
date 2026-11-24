import { lazyWithRetry } from "@/lib/chunkRecovery";
import { Suspense } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import SkeletonSection from "@/components/landing/SkeletonSection";
import PageHero from "@/components/ui/PageHero";

const ServicesGrid = lazyWithRetry(() => import("@/components/ServicesGrid"));
const Footer = lazyWithRetry(() => import("@/components/Footer"));

const Services = () => (
  <>
    <Helmet>
      <title>Arthritis Support Services UK | Living With Arthritis</title>
      <meta name="description" content="Arthritis information, educational resources and support services. Contact Living With Arthritis about suitability and current availability." />
      <meta property="og:title" content="Arthritis Support Services UK | Living With Arthritis" />
      <meta property="og:description" content="Arthritis information, educational resources and support services. Contact Living With Arthritis about suitability and current availability." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://livingwitharthritis.org.uk/services" />
      <meta property="og:site_name" content="Living With Arthritis" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:image" content="https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Services | Living With Arthritis" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Arthritis Support Services UK | Living With Arthritis" />
      <meta name="twitter:description" content="Arthritis information, educational resources and support services. Contact Living With Arthritis about suitability and current availability." />
      <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp" />
    </Helmet>
    <Header />
    <main id="main-content" role="main" tabIndex={-1}>
      <PageHero
        badge="What we offer"
        title="Arthritis Support Services for Everyone in the UK"
        subtitle="Explore arthritis information and support. Contact us to check which service is suitable and its current availability."
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
