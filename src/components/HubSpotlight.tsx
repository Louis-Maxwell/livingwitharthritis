import { Link, useLocation } from "react-router-dom";
import spotlight from "@/data/hub-spotlight.json";

type Spot = { heading: string; links: { href: string; title: string }[] };
const DATA = spotlight as Record<string, Spot>;

/** Related guides for strong hub pages (same list as the static HTML body). */
const HubSpotlight = () => {
  const { pathname } = useLocation();
  const spot = DATA[pathname.replace(/\/$/, "") || "/"];
  if (!spot) return null;
  return (
    <nav aria-labelledby="hub-spotlight-heading" className="container mx-auto px-4 py-8">
      <h2 id="hub-spotlight-heading" className="text-xl font-semibold mb-4">{spot.heading}</h2>
      <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 text-sm">
        {spot.links.map((l) => (
          <li key={l.href}>
            <Link to={l.href} className="text-primary hover:underline">{l.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default HubSpotlight;
