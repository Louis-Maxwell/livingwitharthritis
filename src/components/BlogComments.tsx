import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Send } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { submitBlogComment } from "@/lib/backendSubmit";
import { CONTACT_EMAILS } from "@/config/contact";

const commentSchema = z.object({
  author_name: z.string().trim().min(1, "Name is required").max(100),
  content: z.string().trim().min(3, "Comment too short").max(2000, "Comment too long"),
});

export default function BlogComments({ slug }: { slug: string }) {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

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
      if (result.via === "mailto") {
        toast.message(result.message);
        setName("");
        setContent("");
      } else {
        toast.error(result.message);
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
              Comments are sent by email for moderation. Your email app opens a draft to{" "}
              {CONTACT_EMAILS.info}.
            </p>
            <Button type="submit" disabled={submitting} size="sm" className="gap-1.5">
              <Send className="w-3.5 h-3.5" />
              {submitting ? "Sending…" : "Post comment"}
            </Button>
          </div>
        </form>
      </Card>

      <p className="text-muted-foreground text-sm">
        No published comments on this page yet — send yours above and we will review it.
      </p>
    </section>
  );
}
