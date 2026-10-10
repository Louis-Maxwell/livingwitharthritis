import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Heart } from "lucide-react";
import Header from "@/components/Header";
import AeoEnhancement from "@/components/seo/AeoEnhancement";
import TopicClusterNav from "@/components/seo/TopicClusterNav";
import EducationalDisclaimerBox from "@/components/seo/EducationalDisclaimerBox";
import Footer from "@/components/Footer";
import SeoHead from "@/components/SeoHead";
import PageHero from "@/components/ui/PageHero";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import FaqAccordion from "@/components/faq/FaqAccordion";
import { sanitizeHtml } from "@/utils/sanitizeHtml";
import {
  MED_DIET_DESCRIPTION,
  MED_DIET_FAQS,
  MED_DIET_HTML,
  MED_DIET_META_TITLE,
  MED_DIET_QUICK_ANSWER,
  MED_DIET_TITLE,
} from "@/data/dietGuides/mediterraneanDietContent";

/**
 * /diet/mediterranean-diet-for-arthritis (Diet & Nutrition batch 4, topic 56).
 * Content lives in src/data/dietGuides/mediterraneanDietContent.ts. Claims
 * checked against NICE NG100/NG226, the NHS Eatwell Guide, Arthritis UK and
 * PubMed-indexed reviews on 10 October 2026. Pending clinical and editorial
 * review, so no reviewer is claimed in schema or on the page.
 */

const heroImage = "/openverse/cover-0469-organic-olive-oil-salad.webp";
const PATH = "/diet/mediterranean-diet-for-arthritis";
const SITE = "https://livingwitharthritis.org.uk";

const PROSE =
  "prose prose-neutral dark:prose-invert max-w-none prose-headings:font-display prose-a:text-primary prose-table:text-sm";

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: MED_DIET_TITLE,
  description: MED_DIET_DESCRIPTION,
  inLanguage: "en-GB",
  image: `${SITE}${heroImage}`,
  datePublished: "2024-09-01",
  dateModified: "2026-10-10",
  author: { "@type": "Organization", name: "Living With Arthritis Editorial Team", url: SITE },
  publisher: { "@type": "Organization", name: "Living With Arthritis", url: SITE },
  mainEntityOfPage: `${SITE}${PATH}`,
};

const keepGoing = [
  { title: "Pain relief", desc: "Practical UK pain-relief steps when joints hurt today.", to: "/guides/arthritis-pain-relief" },
  { title: "Newly diagnosed", desc: "First steps after an arthritis diagnosis.", to: "/guides/newly-diagnosed" },
  { title: "Benefits & PIP", desc: "Help when pain or stiffness limits daily living or mobility.", to: "/benefits-pip" },
  { title: "Turmeric / curcumin", desc: "Evidence and safety for curcumin supplements.", to: "/supplements/turmeric" },
  { title: "Foods supported by research", desc: "Which foods have real evidence behind them.", to: "/blog/best-foods-to-eat-for-arthritis" },
  { title: "Diet Hub", desc: "All our eating guides in one place.", to: "/diet" },
];

export default function MediterraneanDietForArthritis() {
  useEffect(() => {
    // BreadcrumbList is emitted by <PageBreadcrumb>; FAQPage by <FaqAccordion>.
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.text = JSON.stringify(articleJsonLd);
    document.head.appendChild(s);
    return () => {
      document.head.removeChild(s);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SeoHead
        title={MED_DIET_META_TITLE}
        description={MED_DIET_DESCRIPTION}
        path={PATH}
        type="article"
        keywords="mediterranean diet for arthritis, mediterranean diet rheumatoid arthritis, mediterranean diet osteoarthritis, mediterranean meal plan UK, NICE diet rheumatoid arthritis"
      />
      <Header />

      <PageBreadcrumb
        segments={[
          { label: "Diet", href: "/diet" },
          { label: "Mediterranean Diet for Arthritis" },
        ]}
      />

      <PageHero
        badge={
          <Badge variant="secondary" className="bg-background text-primary border-0">
            Eating pattern · UK · Evidence checked
          </Badge>
        }
        title={MED_DIET_TITLE}
        subtitle="What NICE and the research really say, plus a UK shopping list, a sample week and the medicine safety points to know."
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <a href="#seven-day-plan">
              See the sample week <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/diet">Back to the Diet Hub</Link>
          </Button>
        </div>
      </PageHero>

      <div className="container mx-auto px-6 md:px-10 max-w-3xl">
        <p className="speakable-intro text-lg text-muted-foreground leading-relaxed mb-4">
          <strong>Quick answer:</strong> {MED_DIET_QUICK_ANSWER}
        </p>
        <AeoEnhancement route={PATH} />
        <EducationalDisclaimerBox lastReviewed="2026-09-16" reviewStatus="pending" />
      </div>

      <section className="bg-secondary/30 border-y border-border/15">
        <div className="container mx-auto px-6 md:px-12 max-w-[1200px] py-10">
          <figure className="rounded-xl overflow-hidden shadow-lg">
            <img
              src={heroImage}
              alt="Olive oil, salad and vegetables, typical foods in a Mediterranean-style diet"
              className="w-full h-auto object-cover"
              loading="eager"
              decoding="async"
              width={1600}
              height={900}
            />
          </figure>
        </div>
      </section>

      <article className="container mx-auto px-6 md:px-10 max-w-3xl py-12">
        <div className={PROSE} dangerouslySetInnerHTML={{ __html: sanitizeHtml(MED_DIET_HTML) }} />
      </article>

      <section className="py-16 lg:py-20 bg-secondary/30 border-y border-border/15">
        <div className="container mx-auto px-6 md:px-12 max-w-[900px]">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-8">
            Mediterranean Diet for Arthritis: FAQs
          </h2>
          <FaqAccordion idPrefix="diet-mediterranean-faq" items={MED_DIET_FAQS} />
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-6 md:px-12 max-w-[1200px]">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-8">Keep going</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {keepGoing.map((c) => (
              <Link key={c.to} to={c.to} className="group">
                <Card className="p-6 h-full border border-border/40 group-hover:border-primary/40 group-hover:shadow-md transition-all flex flex-col">
                  <div className="rounded-lg bg-primary/10 p-3 w-fit mb-4">
                    <Heart className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-2">{c.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{c.desc}</p>
                  <span className="inline-flex items-center text-primary font-semibold text-sm">
                    Open <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <TopicClusterNav path={PATH} />
      <Footer />
    </div>
  );
}
