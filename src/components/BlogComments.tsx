import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Send } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

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

  useEffect(() => {
    supabase
      .from("blog_comments")
      .select("id, author_name, content, created_at")
      .eq("slug", slug)
      .order("created_at", { ascending: false })
      .then(({ data }) => setComments((data as Comment[]) || []));
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = commentSchema.safeParse({ author_name: name, content });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("blog_comments").insert({
      slug,
      author_name: parsed.data.author_name,
      content: parsed.data.content,
    });
    setSubmitting(false);
    if (error) {
      toast.error("Failed to submit comment");
      return;
    }
    toast.success("Comment submitted for review");
    setName("");
    setContent("");
  };

  return (
    <section className="mt-14 border-t border-border pt-10">
      <h2 className="font-display text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-primary" />
        Comments {comments.length > 0 && `(${comments.length})`}
      </h2>

      {/* Comment form */}
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
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Comments are moderated before appearing.</p>
            <Button type="submit" disabled={submitting} size="sm" className="gap-1.5">
              <Send className="w-3.5 h-3.5" />
              {submitting ? "Submitting…" : "Post Comment"}
            </Button>
          </div>
        </form>
      </Card>

      {/* Comment list */}
      {comments.length === 0 ? (
        <p className="text-muted-foreground text-sm">No comments yet. Be the first to share your thoughts!</p>
      ) : (
        <div className="space-y-4">
          {comments.map((c) => (
            <div key={c.id} className="p-4 rounded-xl bg-muted/30 border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm text-foreground">{c.author_name}</span>
                <time className="text-[11px] text-muted-foreground">
                  {new Date(c.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                </time>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line">{c.content}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
