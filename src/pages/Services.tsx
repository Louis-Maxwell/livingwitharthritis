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
      <title>Our Services | Living With Arthritis UK</title>
      <meta name="description" content="Free arthritis support services from Living With Arthritis UK — AI physiotherapy, exercise plans, anti-inflammatory diet guidance and 24/7 community support." />
      <link rel="canonical" href="https://livingwitharthritis.org.uk/services" />
    </Helmet>
    <Header />
    <main id="main-content" role="main" tabIndex={-1}>
      <PageHero
        eyebrow="What we offer"
        title="Services for everyone living with arthritis"
        description="Every service is free, evidence-based and designed with NHS-aligned clinicians."
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
