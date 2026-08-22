import { useEffect, useMemo } from "react";
import AnswerBox from "@/components/seo/AnswerBox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, CalendarClock } from "lucide-react";
import { getPageAeo } from "@/data/page-aeo";

interface AeoEnhancementProps {
  /** Route path used to look up AEO data, e.g. "/conditions/osteoarthritis". */
  route: string;
  /** Optional inline overrides. */
  question?: string;
  answer?: string;
  faqs?: { q: string; a: string }[];
  reviewer?: string;
  updatedAt?: string;
}

/**
 * Drop-in AEO/GEO enhancement block. Place immediately after a page's <h1>.
 * Renders:
 *  - Answer-first summary (AnswerBox, wired to Speakable schema)
 *  - Medically-reviewed + last-updated badges
 *  - Optional FAQ accordion with FAQPage JSON-LD injected via useEffect
 *
 * Content is read from src/data/page-aeo.ts unless props are provided.
 * If a route has no configured AEO data and no props, renders nothing —
 * safe to add via codemod to every page.
 */
export default function AeoEnhancement(props: AeoEnhancementProps) {
  const configured = getPageAeo(props.route);
  const question = props.question ?? configured?.question;
  const answer = props.answer ?? configured?.answer;
  const faqs = useMemo(() => props.faqs ?? configured?.faqs ?? [], [props.faqs, configured?.faqs]);
  const reviewer = props.reviewer ?? configured?.reviewer ?? "Living With Arthritis clinical team";
  const updatedAt = props.updatedAt ?? configured?.updatedAt ?? "2026-07-01";

  // Inject FAQPage JSON-LD when FAQs are present
  useEffect(() => {
    if (!faqs.length) return;
    const pageUrl = `https://livingwitharthritis.org.uk${props.route.startsWith("/") ? props.route : `/${props.route}`}`;
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-aeo-faq", props.route);
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      url: pageUrl,
      inLanguage: "en-GB",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.a,
        },
      })),
    });
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  }, [props.route, faqs]);

  if (!question && !answer && !faqs.length) return null;

  return (
    <section className="my-8 space-y-6" aria-label="Key information">
      {question && answer && (
        <AnswerBox question={question} reviewed={updatedAt}>
          <p>{answer}</p>
        </AnswerBox>
      )}

      <div className="flex flex-wrap items-center gap-2 text-xs">
        <Badge variant="outline" className="gap-1.5 border-primary/30 text-foreground">
          <ShieldCheck className="h-3 w-3 text-primary" />
          Medically reviewed · {reviewer}
        </Badge>
        <Badge variant="outline" className="gap-1.5 border-primary/30 text-foreground">
          <CalendarClock className="h-3 w-3 text-primary" />
          Updated {new Date(updatedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
        </Badge>
      </div>

      {faqs.length > 0 && (
        <div className="rounded-xl bg-white p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Frequently asked questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left text-base font-semibold">{f.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </section>
  );
}
