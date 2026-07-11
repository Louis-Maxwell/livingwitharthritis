import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { PawPrint, AlertTriangle } from "lucide-react";
import PET_ARTICLES from "@/data/pets-arthritis.generated";

/**
 * /pets — Pets & Arthritis Hub
 * Card grid of all pet arthritis articles with cover images and species filter.
 * Rename to PetsHub.tsx and register in App.tsx (see PETS-INTEGRATION-GUIDE.md).
 */
export default function PetsHub() {
  const species = ["All", ...Array.from(new Set(PET_ARTICLES.map((a) => a.species)))];
  const [filter, setFilter] = useState("All");
  const shown = filter === "All" ? PET_ARTICLES : PET_ARTICLES.filter((a) => a.species === filter);

  return (
    <>
      <Helmet>
        <title>Pets & Arthritis Hub: Dogs, Cats, Horses, Llamas | Living With Arthritis UK</title>
        <meta
          name="description"
          content="Free UK guides to arthritis in dogs, cats, horses, llamas and alpacas — signs, vet treatments, weight, exercise and home adaptations."
        />
      </Helmet>

      <main className="bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-amber-600 to-amber-700 text-white px-6 py-16">
          <div className="max-w-5xl mx-auto text-center">
            <PawPrint className="w-12 h-12 mx-auto mb-4" aria-hidden="true" />
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Pets Get Arthritis Too</h1>
            <p className="text-lg text-amber-100 max-w-2xl mx-auto">
              Around 80% of dogs over 8 and up to 90% of cats over 12 show arthritic changes.
              Practical, vet-aligned guides for dogs, cats, horses, llamas and alpacas.
            </p>
          </div>
        </section>

        {/* Safety banner — shown site-wide on pet content */}
        <div className="bg-red-50 border-y border-red-200 px-6 py-3">
          <p className="max-w-5xl mx-auto text-sm text-red-800 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
            <span>
              <strong>Never give pets human painkillers.</strong> Paracetamol and ibuprofen are
              toxic to dogs and cats — paracetamol can be fatal to a cat in a single dose. Always
              consult your vet.
            </span>
          </p>
        </div>

        {/* Species filter */}
        <section className="max-w-5xl mx-auto px-6 pt-10">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by species">
            {species.map((s) => (
              <button
                key={s}
                role="tab"
                aria-selected={filter === s}
                onClick={() => setFilter(s)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${
                  filter === s
                    ? "bg-amber-600 text-white border-amber-600"
                    : "bg-white text-gray-700 border-gray-300 hover:border-amber-600"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </section>

        {/* Article cards */}
        <section className="max-w-5xl mx-auto px-6 py-10">
          <div className="grid md:grid-cols-2 gap-8">
            {shown.map((a) => (
              <Link
                key={a.slug}
                to={`/pets/${a.slug}`}
                className="group rounded-xl overflow-hidden border shadow-sm hover:shadow-lg transition"
              >
                <img
                  src={a.images[0].url}
                  alt={a.images[0].alt}
                  width={800}
                  height={450}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-52 object-cover group-hover:scale-[1.02] transition"
                />
                <div className="p-5">
                  <span className="text-xs font-bold uppercase tracking-wide text-amber-700">
                    {a.species}
                  </span>
                  <h2 className="font-bold text-xl mt-1 mb-2 group-hover:text-amber-700 transition">
                    {a.title}
                  </h2>
                  <p className="text-sm text-gray-600 line-clamp-3">{a.summary}</p>
                  <span className="inline-block mt-3 text-amber-700 font-semibold text-sm">
                    Read the guide →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Cross-link to human content — internal linking reduces bounce */}
        <section className="bg-gray-50 px-6 py-12">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-3">Living with arthritis yourself?</h2>
            <p className="text-gray-600 mb-6">
              Caring for an arthritic pet while managing your own joints is common — our human
              guides cover gentle exercise, pain relief and daily living aids.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/exercise-hub" className="px-5 py-2.5 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700">
                Exercise Hub
              </Link>
              <Link to="/glossary" className="px-5 py-2.5 rounded-lg border border-gray-300 font-semibold hover:border-red-600">
                Arthritis Glossary
              </Link>
              <Link to="/guides/heat-vs-cold-arthritis-pain" className="px-5 py-2.5 rounded-lg border border-gray-300 font-semibold hover:border-red-600">
                Heat vs Cold Therapy
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
