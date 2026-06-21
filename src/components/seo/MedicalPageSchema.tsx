import { useEffect } from 'react';
import {
  injectJsonLd,
  buildMedicalWebPage,
  buildFAQPage,
  buildHowTo,
  buildBreadcrumb,
  type MedicalWebPageInput,
  type FAQItem,
  type HowToInput,
  type BreadcrumbItem,
} from '@/lib/jsonLd';

interface MedicalPageSchemaProps {
  /** Stable id prefix — usually the route slug, e.g. "knee-arthritis". */
  id: string;
  /** MedicalWebPage payload. Omit to skip (e.g. non-medical landing pages). */
  medical?: MedicalWebPageInput;
  /** FAQ items rendered visibly on the page (Google requires visible parity). */
  faqs?: FAQItem[];
  /** HowTo block — e.g. an exercise programme or step-by-step tool. */
  howTo?: HowToInput;
  /** Breadcrumb trail for the page. */
  breadcrumbs?: BreadcrumbItem[];
}

/**
 * Drop-in JSON-LD schema bundle for medical pages.
 *
 * Emits MedicalWebPage + (optional) FAQPage + HowTo + BreadcrumbList,
 * each as a separate <script> tag with namespaced ids so multiple
 * blocks can coexist without collision. Uses useEffect (per project
 * memory — never react-helmet-async for JSON-LD).
 *
 * Usage:
 *   <MedicalPageSchema
 *     id="knee-arthritis"
 *     medical={{ path: '/conditions/knee-arthritis', name: '...', description: '...', lastReviewed: '2026-06-01', conditions: ['Knee Osteoarthritis'] }}
 *     faqs={visibleFaqs}
 *   />
 */
export default function MedicalPageSchema({
  id,
  medical,
  faqs,
  howTo,
  breadcrumbs,
}: MedicalPageSchemaProps) {
  useEffect(() => {
    const cleanups: Array<() => void> = [];

    if (medical) {
      cleanups.push(injectJsonLd(`${id}-medicalwebpage`, buildMedicalWebPage(medical)));
    }
    if (faqs && faqs.length) {
      cleanups.push(injectJsonLd(`${id}-faqpage`, buildFAQPage(faqs)));
    }
    if (howTo) {
      cleanups.push(injectJsonLd(`${id}-howto`, buildHowTo(howTo)));
    }
    if (breadcrumbs && breadcrumbs.length) {
      cleanups.push(injectJsonLd(`${id}-breadcrumb`, buildBreadcrumb(breadcrumbs)));
    }

    return () => {
      for (const cleanup of cleanups) cleanup();
    };
  }, [id, medical, faqs, howTo, breadcrumbs]);

  return null;
}
