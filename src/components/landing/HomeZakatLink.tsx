import { Link } from "react-router-dom";
import { trackDonationClick } from "@/lib/ga-events";

/**
 * Collapsed Zakat entry point — keeps discoverability without competing
 * with primary homepage CTAs (homepage redesign § deprioritise).
 */
export default function HomeZakatLink() {
  return (
    <aside
      aria-label="Zakat appeal"
      className="border-t border-border/40 bg-background"
    >
      <div className="container mx-auto max-w-6xl px-5 md:px-10 py-4 text-center text-sm text-muted-foreground">
        Giving Zakat or Sadaqah?{" "}
        <Link
          to="/zakat-appeal"
          onClick={() => trackDonationClick({ source: "home_zakat_footer_link" })}
          className="font-semibold text-foreground underline underline-offset-2 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
        >
          Read our Palestine &amp; Gaza rehabilitation appeal
        </Link>
      </div>
    </aside>
  );
}
