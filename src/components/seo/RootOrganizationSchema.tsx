import { useEffect } from "react";

/**
 * Sitewide MedicalOrganization JSON-LD with sameAs links.
 * Strengthens entity disambiguation for LLMs and search engines.
 * Mounted once at root via App.tsx. Injected via useEffect (per project
 * memory — never via Helmet).
 */
const BASE = "https://livingwitharthritis.org.uk";

const PAYLOAD = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  "@id": `${BASE}/#organization`,
  name: "Living With Arthritis UK",
  alternateName: "Living With Arthritis",
  url: BASE,
  logo: {
    "@type": "ImageObject",
    url: `${BASE}/favicon.ico`,
  },
  description:
    "UK charity providing free virtual physiotherapy, NICE-aligned exercise programmes, anti-inflammatory diet guidance, benefits advice and peer support for the ~10 million people living with arthritis across the United Kingdom.",
  email: "info@livingwitharthritis.org.uk",
  address: {
    "@type": "PostalAddress",
    streetAddress: "27 Old Gloucester Street",
    addressLocality: "London",
    postalCode: "WC1N 3AX",
    addressCountry: "GB",
  },
  areaServed: {
    "@type": "Country",
    name: "United Kingdom",
  },
  medicalSpecialty: ["Rheumatology", "Physiotherapy", "Nutrition"],
  knowsAbout: [
    "Osteoarthritis",
    "Rheumatoid arthritis",
    "Psoriatic arthritis",
    "Gout",
    "Ankylosing spondylitis",
    "Fibromyalgia",
    "Lupus",
    "Polymyalgia rheumatica",
    "Anti-inflammatory diet",
    "Mediterranean diet",
    "Joint exercises",
    "PIP arthritis benefits",
  ],
  sameAs: [
    "https://www.pinterest.co.uk/livingwitharthritis",
  ],
};

export default function RootOrganizationSchema() {
  useEffect(() => {
    const id = "root-organization-jsonld";
    const existing = document.getElementById(id);
    if (existing) existing.remove();
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = id;
    script.text = JSON.stringify(PAYLOAD);
    document.head.appendChild(script);
    return () => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };
  }, []);
  return null;
}
