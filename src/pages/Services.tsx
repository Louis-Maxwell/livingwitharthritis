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
      <title>Arthritis Support Services UK | Living With Arthritis</title>
      <meta name="description" content="Free arthritis support services in the UK — virtual physiotherapy, personalised exercise plans, anti-inflammatory diet guidance and 24/7 community help." />
      <link rel="canonical" href="https://livingwitharthritis.org.uk/services" />
      <meta property="og:title" content="Arthritis Support Services UK | Living With Arthritis" />
      <meta property="og:description" content="Free arthritis support services in the UK — virtual physiotherapy, personalised exercise plans, anti-inflammatory diet guidance and 24/7 community help." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://livingwitharthritis.org.uk/services" />
      <meta property="og:site_name" content="Living With Arthritis UK" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:image" content="https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Arthritis Support Services UK | Living With Arthritis" />
      <meta name="twitter:description" content="Free arthritis support services in the UK — virtual physiotherapy, personalised exercise plans, anti-inflammatory diet guidance and 24/7 community help." />
      <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp" />
    </Helmet>
    <Header />
    <main id="main-content" role="main" tabIndex={-1}>
      <PageHero
        badge="What we offer"
        title="Arthritis Support Services for Everyone in the UK"
        subtitle="Free, evidence-based services designed with HCPC-registered clinicians and aligned to national clinical and NICE guidance."
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
