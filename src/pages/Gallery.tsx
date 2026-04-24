import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { Badge } from "@/components/ui/badge";
import { openverseImages, type OpenverseTheme } from "@/data/openverseImages";

const FILTERS: { value: "all" | OpenverseTheme; label: string }[] = [
  { value: "all", label: "All" },
  { value: "arthritis", label: "Arthritis & joints" },
  { value: "wellness", label: "Wellness & exercise" },
  { value: "nutrition", label: "Food & nutrition" },
  { value: "community", label: "People & community" },
];

const Gallery = () => {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["value"]>("all");

  useEffect(() => {
    document.title = "Image Gallery — 50 Creative Commons photos | Living With Arthritis";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute(
        "content",
        "A curated gallery of 50 Creative Commons images covering arthritis, joint health, exercise, nutrition and community — sourced from Wikimedia Commons.",
      );
    }
  }, []);

  const visible = useMemo(
    () => (filter === "all" ? openverseImages : openverseImages.filter((i) => i.theme === filter)),
    [filter],
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <PageHero
          eyebrow="Image library"
          title="50 Creative Commons photographs"
          description="An open visual library covering arthritis, joint health, low-impact exercise, anti-inflammatory food and the community we serve. All images are licensed under Creative Commons or in the public domain — full attribution is provided for each."
        />

        <section className="container mx-auto px-6 md:px-12 py-10">
          <div className="flex flex-wrap gap-2 mb-10" role="tablist" aria-label="Filter images by theme">
            {FILTERS.map((f) => {
              const active = f.value === filter;
              return (
                <button
                  key={f.value}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(f.value)}
                  className={`px-4 py-2 text-sm font-medium rounded-full border transition-colors ${
                    active
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-transparent text-foreground/70 border-border hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
            <Link
              to="/credits"
              className="ml-auto px-4 py-2 text-sm font-medium rounded-full border border-border text-foreground/70 hover:text-foreground hover:border-primary/40 transition-colors"
            >
              Full credits →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((img) => (
              <figure
                key={img.localPath}
                className="group rounded-xl overflow-hidden bg-muted/30 border border-border/40 flex flex-col"
              >
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={img.localPath}
                    alt={img.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <figcaption className="p-4 text-xs text-muted-foreground space-y-1 flex-1">
                  <p className="text-sm font-semibold text-foreground line-clamp-2">{img.title}</p>
                  <p>
                    by <span className="text-foreground/80">{img.creator}</span>
                  </p>
                  <p className="flex flex-wrap gap-x-2 gap-y-1 items-center pt-1">
                    {img.licenseUrl ? (
                      <a
                        href={img.licenseUrl}
                        target="_blank"
                        rel="noopener noreferrer license"
                        className="underline hover:text-primary"
                      >
                        {img.license}
                      </a>
                    ) : (
                      <span>{img.license}</span>
                    )}
                    <span aria-hidden="true">·</span>
                    <a
                      href={img.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-primary"
                    >
                      Source
                    </a>
                    <Badge variant="outline" className="ml-auto text-[10px] uppercase tracking-wider">
                      {img.theme}
                    </Badge>
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>

          {visible.length === 0 && (
            <p className="text-center text-muted-foreground py-20">No images for this filter.</p>
          )}

          <p className="mt-12 text-xs text-muted-foreground max-w-2xl">
            Images are sourced via Wikimedia Commons (an aggregator indexed by{" "}
            <a
              href="https://openverse.org"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary"
            >
              Openverse
            </a>
            ). All works are licensed under Creative Commons or in the public domain. See the full{" "}
            <Link to="/credits" className="underline hover:text-primary">
              image credits page
            </Link>{" "}
            for complete attribution.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Gallery;
