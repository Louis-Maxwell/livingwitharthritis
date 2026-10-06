import { Link } from "react-router-dom";
import { GOFUNDME_URL } from "@/components/landing/homeJobs";
import { trackDonationClick } from "@/lib/ga-events";

/** The provider chooses supported amounts/frequency; local controls cannot configure GoFundMe. */
export default function DonationQuickBar() {
  return <div className="bg-primary text-primary-foreground">
    <div className="container mx-auto px-4 py-2 flex flex-wrap items-center justify-center gap-3">
      <span className="text-sm hidden sm:inline">Support Living With Arthritis</span>
      <a href={GOFUNDME_URL} target="_blank" rel="noopener noreferrer"
        onClick={() => trackDonationClick({ source: "header" })}
        className="min-h-11 inline-flex items-center px-5 rounded-full bg-background text-primary text-sm font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2">
        Donate on GoFundMe<span className="sr-only"> (opens in a new tab)</span>
      </a>
      <Link to="/zakat-appeal" className="min-h-11 inline-flex items-center px-4 rounded-full text-sm font-bold hover:bg-background/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background">Zakat appeal</Link>
    </div>
  </div>;
}
