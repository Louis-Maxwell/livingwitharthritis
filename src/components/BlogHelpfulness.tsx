import { useState, useEffect } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

interface Props {
  slug: string;
}

export default function BlogHelpfulness({ slug }: Props) {
  const [vote, setVote] = useState<boolean | null>(null);
  const [counts, setCounts] = useState({ up: 0, down: 0 });
  const storageKey = `blog_helpful_${slug}`;

  useEffect(() => {
    const saved = sessionStorage.getItem(storageKey);
    if (saved !== null) setVote(saved === "true");

    supabase
      .from("blog_helpfulness" as any)
      .select("helpful")
      .eq("slug", slug)
      .then(({ data }) => {
        if (!data) return;
        const up = (data as any[]).filter((r: any) => r.helpful).length;
        setCounts({ up, down: (data as any[]).length - up });
      });
  }, [slug, storageKey]);

  const handleVote = async (helpful: boolean) => {
    if (vote !== null) return;
    setVote(helpful);
    sessionStorage.setItem(storageKey, String(helpful));
    setCounts((c) => helpful ? { ...c, up: c.up + 1 } : { ...c, down: c.down + 1 });

    await supabase.from("blog_helpfulness" as any).insert({ slug, helpful });
  };

  const total = counts.up + counts.down;

  return (
    <div className="mt-12 mb-8 py-8 border-t border-b border-border/30">
      <div className="text-center space-y-4">
        <p className="text-sm font-semibold text-foreground">Was this article helpful?</p>

        {vote === null ? (
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => handleVote(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border/40 bg-card text-sm font-medium text-muted-foreground hover:border-primary/40 hover:text-primary hover:bg-primary/[0.04] transition-all"
            >
              <ThumbsUp className="w-4 h-4" /> Yes
            </button>
            <button
              onClick={() => handleVote(false)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border/40 bg-card text-sm font-medium text-muted-foreground hover:border-destructive/40 hover:text-destructive hover:bg-destructive/[0.04] transition-all"
            >
              <ThumbsDown className="w-4 h-4" /> No
            </button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <p className="text-sm text-muted-foreground">
              {vote ? "Glad this helped! 💚" : "Thanks for the feedback — we'll improve this."}
            </p>
            {total > 0 && (
              <p className="text-xs text-muted-foreground">
                {counts.up} of {total} reader{total !== 1 ? "s" : ""} found this helpful
              </p>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
