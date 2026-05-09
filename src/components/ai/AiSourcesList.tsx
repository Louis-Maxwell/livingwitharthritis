import { ExternalLink } from "lucide-react";

export interface AiSource {
  label: string;
  url?: string;
}

interface AiSourcesListProps {
  sources: AiSource[];
  title?: string;
}

export default function AiSourcesList({ sources, title = "Sources" }: AiSourcesListProps) {
  if (!sources?.length) return null;
  return (
    <div className="mt-4 rounded-lg border border-border/50 bg-muted/30 p-3">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </p>
      <ul className="space-y-1.5 text-xs">
        {sources.map((s, i) => (
          <li key={i}>
            {s.url ? (
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-foreground/80 underline-offset-2 hover:text-primary hover:underline"
              >
                {s.label}
                <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </a>
            ) : (
              <span className="text-foreground/80">{s.label}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
