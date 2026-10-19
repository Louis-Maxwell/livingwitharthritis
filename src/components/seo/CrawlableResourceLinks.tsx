import { Link } from "react-router-dom";

const RESOURCE_LINKS = [
  { href: "/blog", label: "Arthritis blog and research" },
  { href: "/conditions/osteoarthritis", label: "Osteoarthritis guide" },
  { href: "/conditions/rheumatoid-arthritis", label: "Rheumatoid arthritis guide" },
  { href: "/conditions/psoriatic-arthritis", label: "Psoriatic arthritis guide" },
  { href: "/conditions/fibromyalgia", label: "Fibromyalgia guide" },
  { href: "/exercises", label: "Arthritis exercise hub" },
  { href: "/diet", label: "Diet and nutrition hub" },
  { href: "/benefits-pip", label: "Benefits and PIP hub" },
  { href: "/resources", label: "Free arthritis resources" },
  { href: "/about", label: "About Living With Arthritis" },
  { href: "/sources", label: "Clinical sources" },
  { href: "/contact", label: "Contact Living With Arthritis" },
] as const;

/** Canonical topic hubs linked from every route for crawl discovery. */
export default function CrawlableResourceLinks() {
  return (
    <nav aria-label="Key arthritis resources" className="border-b border-border/20 bg-muted/20">
      <div className="container mx-auto px-6 py-2">
        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          {RESOURCE_LINKS.map((link) => (
            <li key={link.href}>
              <Link className="hover:text-primary hover:underline" to={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
