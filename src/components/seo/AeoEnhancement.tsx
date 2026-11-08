import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
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
  keyTakeaways?: string[];
  faqs?: { q: string; a: string }[];
  /** Set false when the page renders the same FAQ through its own component. */
  renderFaqs?: boolean;
  reviewer?: string;
  updatedAt?: string;
}

/**
 * Drop-in AEO/GEO enhancement block. Place immediately after a page's <h1>.
 * Renders:
 *  - Answer-first summary (AnswerBox, wired to Speakable schema)
 *  - Medically-reviewed + last-updated badges
 *  - Optional key-takeaways list and FAQ accordion with matching FAQPage JSON-LD
 *
 * Content is read from src/data/page-aeo.ts unless props are provided.
 * If a route has no configured AEO data and no props, renders nothing —
 * safe to add via codemod to every page.
 */
export default function AeoEnhancement(props: AeoEnhancementProps) {
  const configured = getPageAeo(props.route);
  const question = props.question ?? configured?.question;
  const answer = props.answer ?? configured?.answer;
  const keyTakeaways = props.keyTakeaways ?? configured?.keyTakeaways ?? [];
  const faqs = useMemo(() => props.faqs ?? configured?.faqs ?? [], [props.faqs, configured?.faqs]);
  const renderFaqs = props.renderFaqs ?? true;
  const reviewer = props.reviewer ?? configured?.reviewer;
  const updatedAt = props.updatedAt ?? configured?.updatedAt ?? "2026-07-01";

  const pageUrl = `https://livingwitharthritis.org.uk${props.route.startsWith("/") ? props.route : `/${props.route}`}`;
  const visibleFaqs = renderFaqs ? faqs : [];
  const faqSchema = visibleFaqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        url: pageUrl,
        inLanguage: "en-GB",
        mainEntity: visibleFaqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  if (!question && !answer && !visibleFaqs.length && !keyTakeaways.length) return null;

  return (
    <>
      {faqSchema && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        </Helmet>
      )}
      <section className="my-8 space-y-6" aria-label="Key information">
        {question && answer && (
          <AnswerBox question={question} reviewed={updatedAt}>
            <p>{answer}</p>
          </AnswerBox>
        )}

        {keyTakeaways.length > 0 && (
          <aside className="rounded-xl border border-primary/25 bg-primary/5 p-5" aria-label="Key takeaways">
            <h2 className="mb-3 text-lg font-bold text-foreground">Key takeaways</h2>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-foreground/85">
              {keyTakeaways.map((takeaway) => <li key={takeaway}>{takeaway}</li>)}
            </ul>
          </aside>
        )}

        <div className="flex flex-wrap items-center gap-2 text-xs">
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
        </div>

        {visibleFaqs.length > 0 && (
          <div className="rounded-xl bg-white p-6">
            <h2 className="mb-4 text-xl font-bold text-foreground">Frequently asked questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {visibleFaqs.map((f, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left text-base font-semibold">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}
      </section>
    </>
  );
}
