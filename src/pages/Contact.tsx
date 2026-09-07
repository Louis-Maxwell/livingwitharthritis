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
      <meta name="description" content="Contact Living With Arthritis: Get in touch with our team. WhatsApp, email & helpline support for arthritis questions & guidance." />
      <meta property="og:title" content="Contact Us | Living With Arthritis UK" />
      <meta property="og:description" content="Contact Living With Arthritis: Get in touch with our team. WhatsApp, email & helpline support for arthritis questions & guidance." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://livingwitharthritis.org.uk/contact" />
      <meta property="og:site_name" content="Living With Arthritis UK" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:image" content="https://livingwitharthritis.org.uk/og/landing-share.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Contact Us | Living With Arthritis UK" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Contact Us | Living With Arthritis UK" />
      <meta name="twitter:description" content="Contact Living With Arthritis: Get in touch with our team. WhatsApp, email & helpline support for arthritis questions & guidance." />
      <meta name="twitter:image" content="https://livingwitharthritis.org.uk/og/landing-share.png" />
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contact Living With Arthritis UK",
        "url": "https://livingwitharthritis.org.uk/contact",
        "inLanguage": "en-GB",
        "isPartOf": { "@id": "https://livingwitharthritis.org.uk/#website" },
        "about": {
          "@type": "Organization",
          "@id": "https://livingwitharthritis.org.uk/#organization",
          "name": "Living With Arthritis UK",
          "email": "info@livingwitharthritis.org.uk",
          "telephone": "+44-7760-512-084",
          "address": { "@type": "PostalAddress", "addressCountry": "GB" },
          "contactPoint": [{
            "@type": "ContactPoint",
            "contactType": "customer support",
            "email": "info@livingwitharthritis.org.uk",
            "telephone": "+44-7760-512-084",
            "availableLanguage": ["English", "en-GB"],
            "areaServed": "GB",
            "hoursAvailable": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
              "opens": "09:00",
              "closes": "17:00"
            }
          }]
        }
      })}</script>
    </Helmet>

    <Header />
    <main id="main-content" role="main" tabIndex={-1}>
      <PageHero
        badge="Contact"
        title="Contact Living With Arthritis UK"
        subtitle="Living with pain is hard enough — you should not have to shout into the void. Email, phone or message us; a real person in the UK will reply within two working days."
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
