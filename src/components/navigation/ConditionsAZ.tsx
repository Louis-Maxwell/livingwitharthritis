import { Link } from "react-router-dom";

import { CONDITIONS_AZ } from "./conditionsAZData";


export default function ConditionsAZ({ className = "" }: { className?: string }) {
  return (
    <section aria-labelledby="conditions-az" data-jump-to-skip className={`my-12 ${className}`}>
      <h2 id="conditions-az" className="font-display text-2xl font-bold text-foreground mb-4">
        Conditions A–Z
      </h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-1">
        {CONDITIONS_AZ.map((c) => (
          <li key={c.href} className="text-base">
            <Link to={c.href} className="block py-1.5 text-primary underline underline-offset-2 hover:text-foreground">
              {c.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
