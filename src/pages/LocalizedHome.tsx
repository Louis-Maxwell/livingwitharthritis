import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { ArrowRight, AlertCircle } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { buildLangUrl } from "@/lib/translations";

/**
 * Generic localized homepage for non-English locales (ES/FR/DE/PT).
 * The English homepage remains the rich `src/pages/Index.tsx`.
 *
 * Each translated locale shares this lean landing page until native-
 * reviewer-approved content is rolled out per locale.
 */
export default function LocalizedHome() {
  const { lang, t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t.home.heroTitle}</title>
        <meta name="description" content={t.home.heroSubtitle} />
        <html lang={lang} />
      </Helmet>

      <main className="min-h-screen bg-background text-foreground">
        <section className="px-6 py-20 md:py-32 max-w-4xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-4">
            {t.home.heroEyebrow}
          </p>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            {t.home.heroTitle}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
            {t.home.heroSubtitle}
          </p>

          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full">
              <Link to={buildLangUrl(lang, "/conditions/osteoarthritis")}>
                {t.home.ctaPrimary} <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link to="/exercises">{t.home.ctaSecondary}</Link>
            </Button>
          </div>

          <div
            role="note"
            className="mt-10 flex items-start gap-3 rounded-lg border border-border bg-muted/40 p-4 text-sm text-muted-foreground max-w-2xl"
          >
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
            <p>{t.common.machineTranslationNotice}</p>
          </div>
        </section>

        <section className="px-6 py-16 max-w-5xl mx-auto grid gap-6 md:grid-cols-3">
          {[
            { label: t.home.sectionConditions, to: buildLangUrl(lang, "/conditions/osteoarthritis") },
            { label: t.home.sectionExercises, to: "/exercises" },
            { label: t.home.sectionDiet, to: "/diet" },
          ].map((card) => (
            <Link
              key={card.label}
              to={card.to}
              className="block rounded-xl border border-border p-6 hover:border-primary transition-colors"
            >
              <h2 className="text-lg font-semibold mb-2">{card.label}</h2>
              <span className="text-sm text-primary inline-flex items-center gap-1">
                {t.common.learnMore} <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          ))}
        </section>
      </main>
    </>
  );
}
