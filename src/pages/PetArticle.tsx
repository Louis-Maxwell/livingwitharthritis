import PetPhotoCredits from "@/components/pets/PetPhotoCredits";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import { Link, useParams, Navigate } from "react-router-dom";
import { AlertTriangle, ChevronLeft } from "lucide-react";
import PET_ARTICLES from "@/data/pets-arthritis.generated";
import SeoHead from "@/components/SeoHead";
import FaqAccordion from "@/components/faq/FaqAccordion";

/** Data-driven pet guides with one source-checked animal illustration each. */
export default function PetArticle() {
  const { slug } = useParams<{ slug: string }>();
  const article = PET_ARTICLES.find((a) => a.slug === slug);
  if (!article) return <Navigate to="/pets" replace />;

  const related = PET_ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <SeoHead
        title={article.title}
        description={article.summary.slice(0, 158)}
        path={`/pets/${article.slug}`}
      />

      <main id="main-content" className="bg-white">
        <article className="max-w-3xl mx-auto px-6 py-10">
          <PageBreadcrumb className="!px-0 !pt-0" segments={[{ label: "Pets", href: "/pets" }, { label: article.title }]} />
          <Link to="/pets" className="inline-flex items-center gap-1 text-sm text-primary font-semibold mb-6 hover:underline">
            <ChevronLeft className="w-4 h-4" aria-hidden="true" /> All pet guides
          </Link>

          <span className="block text-xs font-bold uppercase tracking-wide text-primary">{article.species}</span>
          <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4">{article.title}</h1>
          <p className="text-lg text-gray-600 mb-6">{article.summary}</p>

          {/* Lead image */}
          <figure className="mb-8">
            <img
              src={article.images[0].url}
              alt={article.images[0].alt}
              width={article.images[0].width}
              height={article.images[0].height}
              fetchPriority="high"
              decoding="async"
              className="w-full h-auto rounded-xl object-contain max-h-96 bg-gray-50"
            />
            <figcaption className="text-sm text-gray-500 mt-2">{article.images[0].caption}</figcaption>
          </figure>

          {/* Safety warning — always visible, always early */}
          <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded mb-8" role="note">
            <p className="text-sm text-red-800 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
              <span><strong>Important:</strong> {article.warning}</span>
            </p>
          </div>

          {article.sections.map((section, index) => (
            <section key={index}>
              <h2 className="text-2xl font-bold mt-8 mb-3">{section.heading}</h2>
              <p className="text-gray-700 leading-relaxed">{section.body}</p>
            </section>
          ))}

          {/* FAQs */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Frequently asked questions</h2>
            <FaqAccordion
              idPrefix={`pets-${article.slug}-faq`}
              items={article.faqs.map((f) => ({ question: f.q, answer: f.a }))}
            />
          </section>

          {/* Related — keeps visitors on-site (bounce-rate lever) */}
          <section className="mt-12 border-t pt-8">
            <h2 className="text-xl font-bold mb-4">Keep reading</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {related.map((r) => (
                <Link key={r.slug} to={`/pets/${r.slug}`} className="group rounded-lg overflow-hidden border hover:shadow-md transition">
                  <img
                    src={r.images[0].url}
                    style={{ objectPosition: r.species === "Llamas & Alpacas" ? "center top" : "center" }}
                    alt={r.images[0].alt}
                    width={r.images[0].width}
                    height={r.images[0].height}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-28 object-cover"
                  />
                  <p className="p-3 text-sm font-semibold group-hover:text-primary transition">{r.title}</p>
                </Link>
              ))}
            </div>
          </section>
          <PetPhotoCredits images={[...article.images, ...related.flatMap(guide => guide.images)]} />
        </article>
      </main>
    </>
  );
}
