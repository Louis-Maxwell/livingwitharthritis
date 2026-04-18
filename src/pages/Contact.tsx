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
      <title>Contact Living With Arthritis UK: Email, Phone & WhatsApp Support</title>
      <meta name="description" content="Contact Living With Arthritis UK for free arthritis support — email, phone, WhatsApp or enquiry form. UK-based team, personal reply within 2 business days." />
      <link rel="canonical" href="https://livingwitharthritis.org.uk/contact" />
    </Helmet>
    <Header />
    <main id="main-content" role="main" tabIndex={-1}>
      <PageHero
        badge="Contact"
        title="Contact Living With Arthritis UK"
        subtitle="Email, phone or message our UK-based team — we reply to every enquiry personally within two business days."
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
