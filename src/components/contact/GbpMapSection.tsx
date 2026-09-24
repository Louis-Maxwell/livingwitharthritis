import { CONTACT_EMAILS, CONTACT_PHONE } from "@/config/contact";
import { CHARITY } from "@/config/charity";
import { getGbpMapsEmbedUrl } from "@/config/gbpMaps";

type GbpMapSectionProps = {
  /** Override embed URL (tests). When omitted, reads VITE_GBP_MAPS_EMBED_URL. */
  embedUrl?: string | null;
};

/**
 * Contact / About map block. Renders a Google Maps iframe only when
 * VITE_GBP_MAPS_EMBED_URL is set to an allowlisted embed URL. Otherwise
 * shows UK contact + placeholder copy — areaServed GB only, no street address.
 */
export default function GbpMapSection({ embedUrl: override }: GbpMapSectionProps = {}) {
  const embedUrl =
    override === undefined
      ? getGbpMapsEmbedUrl()
      : override
        ? getGbpMapsEmbedUrl(override)
        : null;

  return (
    <section
      aria-labelledby="gbp-map-heading"
      className="py-12 md:py-16 bg-muted/30 border-t border-border/40"
      data-testid="gbp-map-section"
    >
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <h2
          id="gbp-map-heading"
          className="text-2xl font-bold text-foreground mb-2"
        >
          Where we serve
        </h2>
        <p className="text-muted-foreground text-sm md:text-base mb-6 max-w-2xl leading-relaxed">
          Living With Arthritis UK (charity {CHARITY.number}) supports people
          across Great Britain online and by phone/email. We do not publish a
          public street address while a registered correspondence address is
          pending.
        </p>

        <ul className="text-sm text-foreground space-y-1 mb-6">
          <li>
            Email:{" "}
            <a
              href={`mailto:${CONTACT_EMAILS.info}`}
              className="text-primary underline underline-offset-2"
            >
              {CONTACT_EMAILS.info}
            </a>
          </li>
          <li>
            Phone:{" "}
            <a
              href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
              className="text-primary underline underline-offset-2"
            >
              {CONTACT_PHONE}
            </a>{" "}
            (Mon–Fri, 9am–5pm)
          </li>
          <li>Area served: United Kingdom (GB)</li>
        </ul>

        {embedUrl ? (
          <div
            className="relative w-full overflow-hidden rounded-2xl border border-border bg-card"
            style={{ aspectRatio: "16 / 9" }}
          >
            <iframe
              title="Living With Arthritis UK on Google Maps"
              src={embedUrl}
              width={800}
              height={450}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
              data-testid="gbp-map-iframe"
            />
          </div>
        ) : (
          <p
            className="rounded-xl border border-dashed border-border bg-card/60 px-4 py-6 text-sm text-muted-foreground"
            data-testid="gbp-map-placeholder"
          >
            Map goes live once Google Business Profile is verified. Until then,
            use the email and phone above — we serve the whole UK, not a single
            shopfront.
          </p>
        )}
      </div>
    </section>
  );
}
