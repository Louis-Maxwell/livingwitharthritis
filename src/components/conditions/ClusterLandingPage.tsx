import { useEffect } from "react";
import { Link } from "react-router-dom";
import SeoHead from "@/components/SeoHead";
import { distinctSeoTitle } from "@/lib/technicalSeo.mjs";
import MedicalReviewBadge from "@/components/MedicalReviewBadge";
import AnswerBox from "@/components/seo/AnswerBox";
import LastReviewed from "@/components/LastReviewed";
import ClusterGpAndLinks from "@/components/seo/ClusterGpAndLinks";
import UrgentHelpAndSources from "@/components/seo/UrgentHelpAndSources";
import EducationalDisclaimerBox from "@/components/seo/EducationalDisclaimerBox";
import TopicClusterNav from "@/components/seo/TopicClusterNav";
import { injectJsonLd, buildBreadcrumb } from "@/lib/jsonLd";
import { LOUIS_MAXWELL_REF } from "@/lib/louisMaxwell";

type L = { to: string; label: string; desc?: string };
export interface ClusterLandingData {
  path: string;
  name: string;
  h1: string;
  title: string;
  description: string;
  question: string;
  answer: string;
  sections: { id: string; heading: string; intro?: string; items?: string[]; links?: L[] }[];
  readMore: L[];
  faqs: { q: string; a: string }[];
}

const REVIEWED = "2026-11-03";

export default function ClusterLandingPage({ data }: { data: ClusterLandingData }) {
  const url = `https://livingwitharthritis.org.uk${data.path}`;
  useEffect(() => {
    const page = {
      "@context": "https://schema.org", "@type": "MedicalWebPage",
      headline: data.h1, description: data.description, url, mainEntityOfPage: url,
      author: LOUIS_MAXWELL_REF, reviewedBy: LOUIS_MAXWELL_REF, lastReviewed: REVIEWED,
      datePublished: REVIEWED, dateModified: REVIEWED,
      publisher: { "@type": "MedicalOrganization", name: "Living With Arthritis" },
    };
    const faq = {
      "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: data.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    };
    const crumbs = buildBreadcrumb([
      { name: "Home", path: "/" }, { name: "Arthritis", path: "/conditions/arthritis" }, { name: data.name, path: data.path },
    ]);
    const id = data.path.split("/").pop();
    const c = [injectJsonLd(`${id}-page`, page), injectJsonLd(`${id}-faq`, faq), injectJsonLd(`${id}-breadcrumb`, crumbs)];
    return () => c.forEach((f) => f());
  }, [data, url]);

  return (
    <article className="max-w-4xl mx-auto py-12 px-4">
      <SeoHead title={distinctSeoTitle(data.title, data.h1)} includeSiteName={false} description={data.description} path={data.path} type="article" />
      <h1 className="text-3xl md:text-4xl font-bold mb-4">{data.h1}</h1>
      <LastReviewed date={REVIEWED} className="mb-6" />
      <AnswerBox question={data.question} reviewed={REVIEWED}>{data.answer}</AnswerBox>
      <MedicalReviewBadge reviewer="Louis Maxwell" title="First Contact Practitioner" credential="HCPC PH128483" date="November 2026" />

      {data.sections.map((s) => (
        <section key={s.id} id={s.id} className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">{s.heading}</h2>
          {s.intro && <p className="mb-3">{s.intro}</p>}
          {s.items && <ul className="list-disc pl-6 space-y-1">{s.items.map((i) => <li key={i}>{i}</li>)}</ul>}
          {s.links && (
            <ul className="space-y-2">
              {s.links.map((l) => (
                <li key={l.to}><Link to={l.to} className="text-primary underline font-medium">{l.label}</Link>{l.desc && <span>: {l.desc}</span>}</li>
              ))}
            </ul>
          )}
        </section>
      ))}

      <section id="read-more" className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Read more in depth</h2>
        <ul className="space-y-2">
          {data.readMore.map((l) => (
            <li key={l.to}><Link to={l.to} className="text-primary underline">{l.label}</Link>{l.desc && <span>: {l.desc}</span>}</li>
          ))}
        </ul>
      </section>

      <section id="faq" className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Common questions</h2>
        {data.faqs.map((f) => (
          <div key={f.q} className="mb-4"><h3 className="font-semibold">{f.q}</h3><p>{f.a}</p></div>
        ))}
      </section>

      <ClusterGpAndLinks path={data.path} />
      <UrgentHelpAndSources path={data.path} />
      <EducationalDisclaimerBox lastReviewed={REVIEWED} />
      <TopicClusterNav path={data.path} />
    </article>
  );
}
