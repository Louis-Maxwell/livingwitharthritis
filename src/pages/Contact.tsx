import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import SkeletonSection from "@/components/landing/SkeletonSection";
import PageHero from "@/components/ui/PageHero";

const ContactSection = lazy(() => import("@/components/landing/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));

const Contact = () => (
  <>
    <Helmet>
      <title>Contact Us | Living With Arthritis UK</title>
      <meta name="description" content="Get in touch with Living With Arthritis UK — email, phone, WhatsApp or our enquiry form. We respond to every message personally." />
      <link rel="canonical" href="https://livingwitharthritis.org.uk/contact" />
    </Helmet>
    <Header />
    <main id="main-content" role="main" tabIndex={-1}>
      <PageHero
        eyebrow="Contact"
        title="We'd love to hear from you"
        description="Email, phone or message us — we respond to every enquiry personally."
      />
      <Suspense fallback={<SkeletonSection />}>
        <ContactSection />
      </Suspense>
    </main>
    <Suspense fallback={<div className="h-80 bg-secondary" aria-hidden="true" />}>
      <Footer />
    </Suspense>
  </>
);

export default Contact;
