import { Link } from "react-router-dom";
import { BookOpen, Dumbbell, Stethoscope, FileText, PlayCircle, ArrowRight } from "lucide-react";
import type { ChatResource } from "@/lib/chatResources";

const ICONS: Record<ChatResource["type"], React.ComponentType<{ className?: string }>> = {
  guide: BookOpen,
  exercise: Dumbbell,
  condition: Stethoscope,
  article: FileText,
  video: PlayCircle,
};

const LABELS: Record<ChatResource["type"], string> = {
  guide: "Guide",
  exercise: "Exercise",
  condition: "Condition",
  article: "Article",
  video: "Video",
};

export function ResourceCards({ resources }: { resources: ChatResource[] }) {
  if (!resources.length) return null;

  return (
    <div className="mt-2.5 space-y-1.5">
      {resources.map((r) => {
        const Icon = ICONS[r.type] ?? BookOpen;
        return (
          <Link
            key={r.url}
            to={r.url}
            className="group flex items-start gap-2.5 rounded-lg border border-border/50 bg-background hover:border-primary/40 hover:shadow-sm px-2.5 py-2 transition-all"
          >
            <div className="h-7 w-7 shrink-0 rounded-md bg-primary/8 text-primary flex items-center justify-center">
              <Icon className="h-3.5 w-3.5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] uppercase tracking-wide text-primary/70 font-medium">
                  {LABELS[r.type]}
                </span>
              </div>
              <p className="text-xs font-medium text-foreground leading-tight truncate">{r.title}</p>
              {r.description && (
                <p className="text-[11px] text-muted-foreground leading-snug line-clamp-2 mt-0.5">
                  {r.description}
                </p>
              )}
            </div>
            <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all mt-1" />
          </Link>
        );
      })}
    </div>
  );
}
