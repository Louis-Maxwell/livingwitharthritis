import { memo } from "react";
import { MapPin } from "lucide-react";

const NATIONS = [
  "England",
  "Scotland",
  "Wales",
  "Northern Ireland",
] as const;

/**
 * Visible UK coverage strip under the hero. Search engines already see
 * geo meta tags; visitors need the same signal in plain English.
 */
const UKCoverageBand = memo(() => {
  return (
    <section
      aria-label="Where we cover"
      className="border-y border-border/40 bg-muted/40 py-4"
    >
      <div className="container mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 text-center sm:flex-row sm:justify-center sm:text-left">
        <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          Free support across the United Kingdom
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
          {NATIONS.map((nation) => (
            <li key={nation} className="whitespace-nowrap">
              {nation}
            </li>
          ))}
        </ul>
        <p className="text-xs text-muted-foreground sm:ms-2">
          Based in Oswestry · charity 1218461
        </p>
      </div>
    </section>
  );
});

UKCoverageBand.displayName = "UKCoverageBand";
export default UKCoverageBand;
