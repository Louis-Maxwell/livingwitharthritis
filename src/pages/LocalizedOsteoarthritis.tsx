import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import { buildLangUrl } from "@/lib/translations";

/**
 * Translated osteoarthritis condition page (ES/FR/DE/PT). Acts as
 * the template for further localized condition pages.
 */
export default function LocalizedOsteoarthritis() {
  const { lang, t } = useTranslation();
  const oa = t.osteoarthritis;

  return (
    <>
      <Helmet>
        <title>{oa.title}</title>
        <meta name="description" content={oa.intro.slice(0, 155)} />
        <meta property="og:title" content={oa.title} />
        <meta property="og:description" content={oa.intro.slice(0, 155)} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://livingwitharthritis.org.uk${buildLangUrl(lang, "/conditions/osteoarthritis")}`} />
        <meta property="og:locale" content={lang} />
        <meta name="twitter:title" content={oa.title} />
        <meta name="twitter:description" content={oa.intro.slice(0, 155)} />
        <html lang={lang} />
      </Helmet>

      <main className="min-h-screen bg-background text-foreground">
        <article className="max-w-3xl mx-auto px-6 py-16 md:py-24">
          <Button asChild variant="ghost" size="sm" className="mb-6">
            <Link to={buildLangUrl(lang, "/")}>
              <ArrowLeft className="w-4 h-4 mr-1" /> {t.common.backHome}
            </Link>
          </Button>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">{oa.title}</h1>
          <p className="text-lg text-muted-foreground mb-8">{oa.intro}</p>

          <div
            role="note"
            className="mb-10 flex items-start gap-3 rounded-lg border border-border bg-muted/40 p-4 text-sm text-muted-foreground"
          >
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
            <p>{t.common.machineTranslationNotice}</p>
          </div>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">{oa.symptomsHeading}</h2>
            <ul className="space-y-2">
              {oa.symptoms.map((s) => (
                <li key={s} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-1 text-primary flex-shrink-0" aria-hidden="true" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">{oa.managementHeading}</h2>
            <ul className="space-y-2">
              {oa.management.map((m) => (
                <li key={m} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-1 text-primary flex-shrink-0" aria-hidden="true" />
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </section>
        </article>
      </main>
    </>
  );
}
