import { Helmet } from "react-helmet-async";
import { Link, useParams, Navigate } from "react-router-dom";
import { AlertTriangle, ChevronLeft } from "lucide-react";
import PET_ARTICLES from "@/data/pets-arthritis.generated";

/**
 * /pets/:slug — Pet article page
 * Data-driven: one component renders all 8 articles. Images are interleaved
 * between sections (image → section → image → section) so every article
 * shows its 2-3 images spread through the content, not stacked at the top.
 * Rename to PetArticle.tsx and register in App.tsx (see PETS-INTEGRATION-GUIDE.md).
 */
export default function PetArticle() {
  const { slug } = useParams<{ slug: string }>();
  const article = PET_ARTICLES.find((a) => a.slug === slug);
  if (!article) return <Navigate to="/pets" replace />;

  const related = PET_ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <Helmet>
        <title>{article.title} | Living With Arthritis UK</title>
        <meta name="description" content={article.summary.slice(0, 158)} />
        <link rel="canonical" href={`https://livingwitharthritis.org.uk/pets/${article.slug}`} />
      </Helmet>

      <main className="bg-white">
        <article className="max-w-3xl mx-auto px-6 py-10">
          <Link to="/pets" className="inline-flex items-center gap-1 text-sm text-amber-700 font-semibold mb-6 hover:underline">
            <ChevronLeft className="w-4 h-4" aria-hidden="true" /> All pet guides
          </Link>

          <span className="text-xs font-bold uppercase tracking-wide text-amber-700">{article.species}</span>
          <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4">{article.title}</h1>
          <p className="text-lg text-gray-600 mb-6">{article.summary}</p>

          {/* Lead image */}
          <figure className="mb-8">
            <img
              src={article.images[0].url}
              alt={article.images[0].alt}
              width={800}
              height={450}
              fetchPriority="high"
              decoding="async"
              className="w-full rounded-xl object-cover max-h-96"
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

          {/* Sections with remaining images interleaved */}
          {article.sections.map((s, i) => {
            // Interleave images 2..n after sections 1, 2, ... so a 3-image
            // article shows: lead image, section, image 2, section, image 3, rest.
            const img = article.images[i + 1];
            return (
              <div key={i}>
                <h2 className="text-2xl font-bold mt-8 mb-3">{s.heading}</h2>
                <p className="text-gray-700 leading-relaxed">{s.body}</p>
                {img && (
                  <figure className="my-6">
                    <img
                      src={img.url}
                      alt={img.alt}
                      width={800}
                      height={450}
                      loading="lazy"
                      decoding="async"
                      className="w-full rounded-xl object-cover max-h-80"
                    />
                    <figcaption className="text-sm text-gray-500 mt-2">{img.caption}</figcaption>
                  </figure>
                )}
              </div>
            );
          })}

          {/* FAQs */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Frequently asked questions</h2>
            <div className="space-y-3">
              {article.faqs.map((f, i) => (
                <details key={i} className="border rounded-lg p-4 group">
                  <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                    {f.q}
                    <span className="text-amber-700 group-open:rotate-45 transition text-xl leading-none" aria-hidden="true">+</span>
                  </summary>
                  <p className="text-gray-700 mt-2 text-sm leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Related — keeps visitors on-site (bounce-rate lever) */}
          <section className="mt-12 border-t pt-8">
            <h2 className="text-xl font-bold mb-4">Keep reading</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {related.map((r) => (
                <Link key={r.slug} to={`/pets/${r.slug}`} className="group rounded-lg overflow-hidden border hover:shadow-md transition">
                  <img
                    src={r.images[0].url}
                    alt={r.images[0].alt}
                    width={400}
                    height={225}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-28 object-cover"
                  />
                  <p className="p-3 text-sm font-semibold group-hover:text-amber-700 transition">{r.title}</p>
                </Link>
              ))}
            </div>
          </section>
        </article>
      </main>
    </>
  );
}
