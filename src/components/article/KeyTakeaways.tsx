import { useMemo } from "react";
import { Sparkles } from "lucide-react";

interface KeyTakeawaysProps {
  html: string;
  title: string;
}

/**
 * Extract 3 short takeaway bullets from article HTML.
 * Priority: first <ul>/<ol> items → otherwise first 3 sentences from opening paragraphs.
 * Pure presentational; no GA, no state.
 */
function extractTakeaways(html: string): string[] {
  // Try first list
  const listMatch = html.match(/<(?:ul|ol)[^>]*>([\s\S]*?)<\/(?:ul|ol)>/i);
  if (listMatch) {
    const items = Array.from(listMatch[1].matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi))
      .map((m) => m[1].replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim())
      .filter((t) => t.length > 20 && t.length < 220)
      .slice(0, 3);
    if (items.length >= 3) return items;
  }
  // Fallback: first 3 sentences of opening paragraphs
  const paras = Array.from(html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi))
    .map((m) => m[1].replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim())
    .filter(Boolean);
  const joined = paras.slice(0, 3).join(" ");
  const sentences = joined.split(/(?<=[.!?])\s+/).filter((s) => s.length > 30);
  return sentences.slice(0, 3);
}

const KeyTakeaways = ({ html, title }: KeyTakeawaysProps) => {
  const items = useMemo(() => extractTakeaways(html), [html]);
  if (items.length < 2) return null;

  return (
    <aside
      aria-label={`Key takeaways from ${title}`}
      className="speakable-takeaways not-prose mb-10 rounded-xl border border-primary/20 bg-primary/[0.04] p-5 md:p-6 shadow-sm"
    >
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-primary" aria-hidden="true" />
        <h2 className="font-display text-sm font-bold uppercase tracking-[0.12em] text-primary m-0">
          Key takeaways
        </h2>
      </div>
      <ul className="space-y-2 m-0 p-0 list-none">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3 text-[0.95rem] leading-relaxed text-foreground/85">
            <span
              aria-hidden="true"
              className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default KeyTakeaways;
