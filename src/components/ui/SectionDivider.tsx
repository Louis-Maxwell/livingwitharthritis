import { cn } from "@/lib/utils";

type Variant = "rule" | "dot" | "peaks" | "dashes" | "wave";

interface Props {
  variant?: Variant;
  className?: string;
  label?: string;
}

/**
 * Editorial section dividers. Black strokes + a single red accent dot.
 * Stays within the white/black/red identity.
 */
export function SectionDivider({ variant = "rule", className, label }: Props) {
  return (
    <div
      role="separator"
      aria-label={label ?? "Section divider"}
      className={cn("w-full flex items-center justify-center py-10 lg:py-14", className)}
    >
      {variant === "rule" && (
        <div className="flex items-center w-full max-w-4xl gap-4 px-6">
          <span className="h-px flex-1 bg-foreground/15" />
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-primary" />
          <span className="h-px flex-1 bg-foreground/15" />
        </div>
      )}
      {variant === "dot" && (
        <span aria-hidden className="h-2 w-2 rounded-full bg-primary" />
      )}
      {variant === "peaks" && (
        <svg width="120" height="20" viewBox="0 0 120 20" fill="none" aria-hidden>
          <path d="M0 18 L20 4 L40 18 L60 4 L80 18 L100 4 L120 18" stroke="currentColor" strokeOpacity=".22" strokeWidth="1.3" className="text-foreground" />
          <circle cx="60" cy="4" r="2" className="fill-primary" />
        </svg>
      )}
      {variant === "dashes" && (
        <div className="flex items-center gap-2" aria-hidden>
          {Array.from({ length: 9 }).map((_, i) => (
            <span
              key={i}
              className={cn("h-px w-6", i === 4 ? "bg-primary h-[2px]" : "bg-foreground/20")}
            />
          ))}
        </div>
      )}
      {variant === "wave" && (
        <svg width="160" height="18" viewBox="0 0 160 18" fill="none" aria-hidden>
          <path
            d="M2 9 Q 22 -3 42 9 T 82 9 T 122 9 T 158 9"
            stroke="currentColor"
            strokeOpacity=".22"
            strokeWidth="1.3"
            fill="none"
            className="text-foreground"
          />
          <circle cx="82" cy="9" r="2.2" className="fill-primary" />
        </svg>
      )}
    </div>
  );
}

export default SectionDivider;
