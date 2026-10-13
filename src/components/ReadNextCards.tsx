import { memo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

export interface ReadNextItem {
  to: string;
  eyebrow: string;
  title: string;
  description: string;
  readTime?: string;
  icon: LucideIcon;
  /** Tailwind tint class, e.g. "bg-tint-emerald" */
  tint?: string;
  /** Tailwind text accent for the icon, e.g. "text-primary" */
  accent?: string;
}

interface ReadNextCardsProps {
  items: ReadNextItem[];
  heading?: string;
  subheading?: string;
}

const ReadNextCards = memo(({ items, heading = "Read Next", subheading = "Hand-picked next steps to keep your learning going." }: ReadNextCardsProps) => {
  if (!items || items.length === 0) return null;

  return (
    <section className="mt-14 mb-10" aria-label="Read next">
      <div className="mb-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-2">
          Continue Reading
        </p>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-1">
          {heading}
        </h2>
        <p className="text-sm text-muted-foreground">{subheading}</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.slice(0, 3).map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.to + idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
            >
              <Link
                to={item.to}
                className={`group relative block h-full rounded-2xl border border-border/60 ${item.tint ?? "bg-card"} p-5 hover:border-primary/40 hover:shadow-medium transition-all duration-300 overflow-hidden`}
              >
                {/* Subtle accent corner */}
                <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors" />

                <div className={`relative w-10 h-10 rounded-xl bg-background/80 backdrop-blur flex items-center justify-center mb-4 ${item.accent ?? "text-primary"}`}>
                  <Icon className="w-5 h-5" />
                </div>

                <p className="relative text-[10px] font-bold uppercase tracking-[0.18em] text-primary mb-1.5">
                  {item.eyebrow}
                </p>
                <h3 className="relative font-display text-base md:text-lg font-bold text-foreground mb-2 leading-snug group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="relative text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                  {item.description}
                </p>

                <div className="relative flex items-center justify-between text-xs">
                  {item.readTime ? (
                    <span className="inline-flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-3 h-3" /> {item.readTime}
                    </span>
                  ) : <span />}
                  <span className="inline-flex items-center gap-1 font-semibold text-primary group-hover:gap-2 transition-all">
                    Read next <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
});

ReadNextCards.displayName = "ReadNextCards";
export default ReadNextCards;
