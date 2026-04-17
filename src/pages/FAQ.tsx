import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import SkeletonSection from "@/components/landing/SkeletonSection";
import PageHero from "@/components/ui/PageHero";

const FAQSection = lazy(() => import("@/components/landing/FAQSection"));
const Footer = lazy(() => import("@/components/Footer"));

const FAQ = () => (
  <>
    <Helmet>
      <title>Frequently Asked Questions | Living With Arthritis UK</title>
      <meta name="description" content="Answers to common questions about arthritis support, our free services, AI safety, donations and how to get help from Living With Arthritis UK." />
      <link rel="canonical" href="https://livingwitharthritis.org.uk/faq" />
    </Helmet>
    <Header />
    <main id="main-content" role="main" tabIndex={-1}>
      <PageHero
        eyebrow="FAQ"
        title="Frequently asked questions"
        description="Quick answers about how Living With Arthritis UK supports you."
      />
      <Suspense fallback={<SkeletonSection />}>
        <FAQSection />
      </Suspense>
    </main>
    <Suspense fallback={<div className="h-80 bg-secondary" aria-hidden="true" />}>
      <Footer />
    </Suspense>
  </>
);

export default FAQ;
