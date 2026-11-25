import { useEffect, useMemo, useRef } from "react";
import { trackFaqToggle } from "@/lib/analytics";
import AnswerBox from "@/components/seo/AnswerBox";
import { hasPriorityDirectAnswer } from "@/lib/priorityDirectAnswer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, CalendarClock } from "lucide-react";
import { getPageAeo } from "@/data/page-aeo";
import KeyTakeaways from "@/components/article/KeyTakeaways";

interface AeoEnhancementProps {
  /** Route path used to look up AEO data, e.g. "/conditions/osteoarthritis". */
  route: string;
  /** Optional inline overrides. */
  question?: string;
  answer?: string;
  faqs?: { q: string; a: string }[];
  synonyms?: { term: string; variants: string }[];
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
  const openFaq = useRef({ route: props.route, value: "" });
  const hasPriorityAnswer = hasPriorityDirectAnswer(props.route);
  const question = props.question ?? configured?.question;
  const answer = props.answer ?? configured?.answer;
  const faqs = useMemo(() => props.faqs ?? configured?.faqs ?? [], [props.faqs, configured?.faqs]);
  const reviewer = props.reviewer ?? configured?.reviewer;
  const takeaways = configured?.takeaways ?? [];
  const synonyms = props.synonyms ?? configured?.synonyms ?? [];
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

  if (!question && !answer && !faqs.length && !synonyms.length) return null;

  return (
    <section className="my-8 space-y-6" aria-label="Key information">
      {!hasPriorityAnswer && question && answer && (
        <AnswerBox question={question} reviewed={updatedAt}>
          <p>{answer}</p>
        </AnswerBox>
      )}
      {!hasPriorityAnswer && question && answer && takeaways.length >= 3 && (
        <KeyTakeaways html="" title={question} items={takeaways} heading="Key clinical takeaways" />
      )}

      {synonyms.length > 0 && (
        <div className="rounded-xl bg-white p-6">
          <h2 className="text-xl font-bold text-foreground mb-3">Also known as</h2>
          <dl className="space-y-2 text-sm">
            {synonyms.map((item, i) => (
              <div key={i} className="flex flex-col gap-0.5">
                <dt className="font-semibold text-foreground">{item.term}</dt>
                <dd className="text-muted-foreground">{item.variants}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {!hasPriorityAnswer && <div className="flex flex-wrap items-center gap-2 text-xs">
        {reviewer && !/clinical team/i.test(reviewer) && (
          <Badge variant="outline" className="gap-1.5 border-primary/30 text-foreground">
            <ShieldCheck className="h-3 w-3 text-primary" />
            Medically reviewed · {reviewer}
          </Badge>
        )}
        <Badge variant="outline" className="gap-1.5 border-primary/30 text-foreground">
          <CalendarClock className="h-3 w-3 text-primary" />
          Updated {new Date(updatedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
        </Badge>
      </div>}

      {faqs.length > 0 && (
        <div className="rounded-xl bg-white p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Frequently asked questions</h2>
          <Accordion key={props.route} type="single" collapsible className="w-full" onValueChange={(value) => {
            const previous = openFaq.current.route === props.route ? openFaq.current.value : "";
            if (previous === value) return;
            if (previous) trackFaqToggle(`${props.route}:${previous}`, false);
            if (value) trackFaqToggle(`${props.route}:${value}`, true);
            openFaq.current = { route: props.route, value };
          }}>
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
