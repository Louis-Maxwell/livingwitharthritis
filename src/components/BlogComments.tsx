import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Send } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { supabase, isSupabaseConfigured } from "@/integrations/supabase/client";
import { submitBlogComment } from "@/lib/backendSubmit";
import { CONTACT_EMAILS } from "@/config/contact";

const commentSchema = z.object({
  author_name: z.string().trim().min(1, "Name is required").max(100),
  content: z.string().trim().min(3, "Comment too short").max(2000, "Comment too long"),
});

interface Comment {
  id: string;
  author_name: string;
  content: string;
  created_at: string;
}

export default function BlogComments({ slug }: { slug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loadingList, setLoadingList] = useState(false);

  const loadComments = useCallback(async () => {
    if (!isSupabaseConfigured || !supabase || !slug) {
      setComments([]);
      return;
    }
    setLoadingList(true);
    try {
      const { data, error } = await supabase
        .from("blog_comments")
        .select("id, author_name, content, created_at")
        .eq("slug", slug)
        .eq("status", "approved")
        .order("created_at", { ascending: false })
        .limit(50);
      if (!error && data) {
        setComments(data as Comment[]);
      } else {
        setComments([]);
      }
    } catch {
      setComments([]);
    } finally {
      setLoadingList(false);
    }
  }, [slug]);

  useEffect(() => {
    void loadComments();
  }, [loadComments]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = commentSchema.safeParse({ author_name: name, content });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    try {
      const result = await submitBlogComment({
        slug,
        author_name: parsed.data.author_name,
        content: parsed.data.content,
      });
      if (result.ok) {
        toast.success(result.message);
        setName("");
        setContent("");
      } else {
        toast.message(result.message);
        setName("");
        setContent("");
      }
    } catch {
      toast.error(
        `Something went wrong. Please email ${CONTACT_EMAILS.info} or call 07760 512 084.`,
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mt-14 border-t border-border pt-10">
      <h2 className="font-display text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-primary" />
        Comments
      </h2>

      <Card className="p-6 mb-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={100}
            required
          />
          <Textarea
            placeholder="Share your thoughts or experience…"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={2000}
            rows={4}
            required
          />
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <p className="text-xs text-muted-foreground">
              Comments are moderated before they appear. If our database is unavailable, your
              email app opens to {CONTACT_EMAILS.info}.
            </p>
            <Button type="submit" disabled={submitting} size="sm" className="gap-1.5">
              <Send className="w-3.5 h-3.5" />
              {submitting ? "Sending…" : "Post comment"}
            </Button>
          </div>
        </form>
      </Card>

      {loadingList ? (
        <p className="text-muted-foreground text-sm">Loading comments…</p>
      ) : comments.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          No approved comments yet — be the first to share your experience.
        </p>
      ) : (
        <div className="space-y-4">
          {comments.map((c) => (
            <div key={c.id} className="p-4 rounded-xl bg-muted/30 border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm text-foreground">{c.author_name}</span>
                <time className="text-[11px] text-muted-foreground">
                  {new Date(c.created_at).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </time>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line">
                {c.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
