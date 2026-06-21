/**
 * PageSchema — reusable JSON-LD injector for AEO / AI-visibility.
 *
 * Inserts BreadcrumbList + FAQPage + (optional) MedicalWebPage,
 * HowTo and SpeakableSpecification via useEffect (per project memory:
 * never inject JSON-LD through Helmet to avoid crashes).
 *
 * Designed to be dropped into any route component as a sibling:
 *   <PageSchema
 *     url="https://livingwitharthritis.org.uk/guides/diet"
 *     name="Anti-Inflammatory Diet for Arthritis (UK)"
 *     description="..."
 *     breadcrumbs={[{ name: "Home", item: "/" }, { name: "Diet" }]}
 *     faqs={[{ question, answer }, ...]}
 *     medical={{ condition: "Arthritis" }}
 *     howTo={{ name, totalTime: "PT15M", steps: [{ name, text }, ...] }}
 *     speakableSelector=".speakable-intro"
 *   />
 */

import { useEffect } from "react";

const BASE = "https://livingwitharthritis.org.uk";

export interface SchemaFAQ {
  question: string;
  answer: string;
}

export interface SchemaBreadcrumb {
  name: string;
  /** Relative or absolute URL. Omit on the final crumb. */
  item?: string;
}

export interface SchemaHowToStep {
  name: string;
  text: string;
}

export interface SchemaHowTo {
  name: string;
  /** ISO 8601 duration, e.g. "PT15M" */
  totalTime?: string;
  steps: SchemaHowToStep[];
}

export interface PageSchemaProps {
  /** Canonical page URL (absolute or root-relative). */
  url: string;
  /** Page name for MedicalWebPage. */
  name?: string;
  /** Page description for MedicalWebPage. */
  description?: string;
  breadcrumbs?: SchemaBreadcrumb[];
  faqs?: SchemaFAQ[];
  medical?: {
    /** Primary MedicalCondition name (e.g. "Arthritis"). */
    condition?: string;
  };
  howTo?: SchemaHowTo;
  /** CSS selector for SpeakableSpecification (e.g. ".speakable-intro"). */
  speakableSelector?: string;
  /** ISO date (YYYY-MM-DD) the page was last clinically reviewed. Drives the
   *  MedicalWebPage `lastReviewed` field — a strong YMYL E-E-A-T signal. */
  lastReviewed?: string;
  /** Override the default reviewer (HCPC-registered chartered physiotherapist). */
  reviewedBy?: {
    name: string;
    jobTitle: string;
    /** Professional registration, e.g. "HCPC PH128483". */
    identifier?: string;
  };
  /** Stable id prefix to scope script cleanup if multiple instances render. */
  idPrefix?: string;
}

const DEFAULT_REVIEWER = {
  "@type": "Person",
  name: "Maxwell",
  jobTitle: "First Contact Practitioner — Chartered Physiotherapist",
  identifier: "HCPC PH128483",
  affiliation: {
    "@type": "MedicalOrganization",
    name: "Chartered Society of Physiotherapy (CSP)",
  },
};

function toAbsolute(url: string): string {
  if (!url) return BASE;
  if (url.startsWith("http")) return url;
  return `${BASE}${url.startsWith("/") ? url : `/${url}`}`;
}

export default function PageSchema({
  url,
  name,
  description,
  breadcrumbs,
  faqs,
  medical,
  howTo,
  speakableSelector,
  lastReviewed,
  reviewedBy,
  idPrefix = "page-schema",
}: PageSchemaProps) {
  useEffect(() => {
    const absUrl = toAbsolute(url);
    const blocks: Record<string, unknown>[] = [];

    if (breadcrumbs && breadcrumbs.length > 0) {
      blocks.push({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((b, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: b.name,
          ...(b.item ? { item: toAbsolute(b.item) } : {}),
        })),
      });
    }

    if (faqs && faqs.length > 0) {
      blocks.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      });
    }

    if (name && description) {
      const medicalPage: Record<string, unknown> = {
        "@context": "https://schema.org",
        "@type": "MedicalWebPage",
        name,
        description,
        url: absUrl,
        inLanguage: "en-GB",
        publisher: {
          "@type": "Organization",
          name: "Living With Arthritis UK",
          url: BASE,
          logo: { "@type": "ImageObject", url: `${BASE}/favicon.ico` },
        },
        audience: {
          "@type": "MedicalAudience",
          audienceType: "Patient",
          geographicArea: { "@type": "Country", name: "United Kingdom" },
        },
      };
      if (medical?.condition) {
        medicalPage.about = {
          "@type": "MedicalCondition",
          name: medical.condition,
        };
      }
      if (speakableSelector) {
        medicalPage.speakable = {
          "@type": "SpeakableSpecification",
          cssSelector: [speakableSelector],
        };
      }
      if (lastReviewed) {
        medicalPage.lastReviewed = lastReviewed;
        medicalPage.reviewedBy = reviewedBy
          ? {
              "@type": "Person",
              name: reviewedBy.name,
              jobTitle: reviewedBy.jobTitle,
              ...(reviewedBy.identifier ? { identifier: reviewedBy.identifier } : {}),
            }
          : DEFAULT_REVIEWER;
      }
      blocks.push(medicalPage);
    }

    if (howTo && howTo.steps.length > 0) {
      blocks.push({
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: howTo.name,
        ...(howTo.totalTime ? { totalTime: howTo.totalTime } : {}),
        step: howTo.steps.map((s, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: s.name,
          text: s.text,
        })),
      });
    }

    const nodes = blocks.map((block, i) => {
      const node = document.createElement("script");
      node.type = "application/ld+json";
      node.dataset.schema = `${idPrefix}-${i}`;
      node.text = JSON.stringify(block);
      document.head.appendChild(node);
      return node;
    });

    return () => nodes.forEach((n) => n.remove());
  }, [url, name, description, breadcrumbs, faqs, medical, howTo, speakableSelector, lastReviewed, reviewedBy, idPrefix]);

  return null;
}
