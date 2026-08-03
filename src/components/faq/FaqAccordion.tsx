import { useEffect } from "react";
import { Link2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buildFAQPage, injectJsonLd, type FAQItem } from "@/lib/jsonLd";
import { cn } from "@/lib/utils";

interface FaqAccordionProps {
  /** Unique per-page prefix so anchors/JSON-LD ids never collide with another FAQ block. */
  idPrefix: string;
  items: FAQItem[];
  className?: string;
  /**
   * Set false when the host page already emits FAQPage JSON-LD for these
   * same items elsewhere (e.g. via MedicalPageSchema's `faqs` prop) —
   * otherwise the page ships two FAQPage blocks for identical content,
   * the same duplicate-schema bug fixed for BreadcrumbList sitewide.
   */
  injectSchema?: boolean;
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/**
 * Accessible, collapsible FAQ list. Built on the existing Radix accordion
 * primitive (src/components/ui/accordion.tsx) rather than a hand-rolled
 * widget — Radix's Trigger already renders a real <button> with
 * aria-expanded/aria-controls wired to a matching content id, and supports
 * Enter/Space natively, so those requirements come from the library, not
 * from bespoke JS here.
 *
 * Adds on top: a stable #anchor per question, and on load/hash-change it
 * opens the matching item, scrolls to it and focuses its trigger — so a
 * shared link (?/#faq-slug) lands the user directly on the right answer.
 */
export default function FaqAccordion({
  idPrefix,
  items,
  className,
  injectSchema = true,
}: FaqAccordionProps) {
  useEffect(() => {
    if (!injectSchema) return;
    return injectJsonLd(`${idPrefix}-faqpage`, buildFAQPage(items));
  }, [idPrefix, items, injectSchema]);

  useEffect(() => {
    const openFromHash = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) return;
      const trigger = document.getElementById(`${idPrefix}-trigger-${hash}`);
      if (!trigger) return;
      if (trigger.getAttribute("aria-expanded") !== "true") trigger.click();
      // Wait a frame so the accordion has expanded before measuring position.
      requestAnimationFrame(() => {
        trigger.scrollIntoView({ behavior: "smooth", block: "center" });
        trigger.focus();
      });
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [idPrefix]);

  return (
    <Accordion type="single" collapsible className={cn("space-y-3", className)}>
      {items.map((item) => {
        const slug = slugify(item.question);
        const anchorId = `${idPrefix}-${slug}`;
        const triggerId = `${idPrefix}-trigger-${slug}`;
        return (
          <AccordionItem
            key={anchorId}
            id={anchorId}
            value={anchorId}
            className="scroll-mt-24 rounded-xl border border-border/40 bg-card px-5"
          >
            <AccordionTrigger
              id={triggerId}
              className="text-left font-display text-base md:text-lg font-semibold text-foreground hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
            >
              <span className="flex items-center gap-2 pr-2">
                {item.question}
                <a
                  href={`#${anchorId}`}
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`Direct link to: ${item.question}`}
                  className="text-muted-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded shrink-0"
                >
                  <Link2 className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
