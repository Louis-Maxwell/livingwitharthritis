import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import { openverseImages, type OpenverseTheme } from "@/data/openverseImages";

const THEME_LABELS: Record<OpenverseTheme, string> = {
  arthritis: "Arthritis & joint health",
  wellness: "Wellness & exercise",
  nutrition: "Food & nutrition",
  community: "People & community",
};

const Credits = () => {
  useEffect(() => {
    document.title = "Image Credits & Attribution | Living With Arthritis";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute(
        "content",
        "Full attribution for the 50 Creative Commons images used across Living With Arthritis. Each entry credits the original creator, license and source.",
      );
    }
  }, []);

  const grouped = (Object.keys(THEME_LABELS) as OpenverseTheme[]).map((theme) => ({
    theme,
    label: THEME_LABELS[theme],
    items: openverseImages.filter((i) => i.theme === theme),
  }));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <PageHero
          badge={<span className="text-xs uppercase tracking-[0.2em] text-primary font-bold">Attribution</span>}
          title="Image credits"
          subtitle="We use 50 openly licensed images across this website. Below is the full attribution required by the Creative Commons licences — creator, license, and link to the original source."
        />

        <section className="container mx-auto px-6 md:px-12 py-12 max-w-5xl">
          <div className="rounded-xl border border-border/40 bg-muted/20 p-6 mb-10 text-sm text-muted-foreground">
            <p className="mb-2">
              All images are sourced via{" "}
              <a
                href="https://commons.wikimedia.org"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-primary"
              >
                Wikimedia Commons
              </a>{" "}
              (indexed by{" "}
              <a
                href="https://openverse.org"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-primary"
              >
                Openverse
              </a>
              ) and reused under Creative Commons or public-domain terms. Where a licence requires attribution
              (CC BY) or share-alike (CC BY-SA), we credit the creator and link to the licence and source page.
              You can browse the visual library on the{" "}
              <Link to="/gallery" className="underline hover:text-primary">
                gallery page
              </Link>
              .
            </p>
            <p>
              If you are a rights holder and believe we have made an attribution error, please{" "}
              <Link to="/contact" className="underline hover:text-primary">
                contact us
              </Link>{" "}
              and we will correct it promptly.
            </p>
          </div>

          {grouped.map((group) => (
            <section key={group.theme} className="mb-12">
              <h2 className="text-xl font-bold text-foreground mb-1">{group.label}</h2>
              <p className="text-xs uppercase tracking-widest text-muted-foreground/60 mb-5">
                {group.items.length} images
              </p>
              <ol className="space-y-4">
                {group.items.map((img, idx) => (
                  <li
                    key={img.localPath}
                    className="flex gap-4 items-start py-3 border-b border-border/30 last:border-b-0"
                  >
                    <span className="flex-shrink-0 text-xs font-mono text-muted-foreground/50 pt-1 w-6 text-right">
                      {idx + 1}.
                    </span>
                    <img
                      src={img.localPath}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      decoding="async"
                      className="w-16 h-16 object-cover rounded-md flex-shrink-0 bg-muted"
                    />
                    <div className="flex-1 min-w-0 text-sm">
                      <p className="font-medium text-foreground">&ldquo;{img.title}&rdquo;</p>
                      <p className="text-muted-foreground text-xs mt-1">
                        by <span className="text-foreground/80">{img.creator}</span> ·{" "}
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
                        )}{" "}
                        ·{" "}
                        <a
                          href={img.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline hover:text-primary"
                        >
                          {img.source}
                        </a>
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Credits;
