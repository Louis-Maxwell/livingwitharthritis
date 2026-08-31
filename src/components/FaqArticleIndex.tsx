import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { faqArticles } from "@/data/faqArticles";

const CATEGORY_ORDER = [
  "Symptom Management",
  "Work & Support",
  "Support & Benefits",
  "Diagnosis & Specialist Care",
  "Life with Arthritis",
];

function categoryRank(category: string): number {
  const index = CATEGORY_ORDER.indexOf(category);
  return index === -1 ? CATEGORY_ORDER.length : index;
}

export default function FaqArticleIndex() {
  const grouped = [...faqArticles]
    .sort((a, b) => {
      const byCategory = categoryRank(a.category) - categoryRank(b.category);
      if (byCategory !== 0) return byCategory;
      return a.title.localeCompare(b.title);
    })
    .reduce<Record<string, typeof faqArticles>>((acc, article) => {
      (acc[article.category] ??= []).push(article);
      return acc;
    }, {});

  const categories = Object.keys(grouped).sort(
    (a, b) => categoryRank(a) - categoryRank(b),
  );

  return (
    <section
      className="py-16 lg:py-24 bg-muted/30"
      aria-labelledby="faq-guides-heading"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-6xl">
        <div className="max-w-3xl mb-12">
          <p className="section-label text-primary mb-4">Full answers</p>
          <h2
            id="faq-guides-heading"
            className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-4"
          >
            {faqArticles.length} in-depth arthritis questions
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Each card opens a full UK-focused answer you can share with family,
            a GP, or an employer. These are the same pages we list for Google
            and AI assistants.
          </p>
        </div>

        {categories.map((category) => (
          <div key={category} className="mb-12 last:mb-0">
            <h3 className="text-lg font-semibold mb-5">{category}</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {grouped[category].map((article) => (
                <Link
                  key={article.slug}
                  to={`/faq/${article.slug}`}
                  className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl"
                >
                  <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border-border/70 hover:border-primary/40">
                    <CardContent className="p-6 flex flex-col h-full">
                      <Badge variant="secondary" className="self-start mb-3 text-xs">
                        {article.category}
                      </Badge>
                      <h4 className="font-serif text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                        {article.question}
                      </h4>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                        {article.quickAnswer}
                      </p>
                      <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-primary">
                        Read the full answer
                        <ArrowRight
                          size={14}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
