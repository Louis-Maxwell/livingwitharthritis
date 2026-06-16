import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAdmin } from "@/hooks/useAdmin";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoHead from "@/components/SeoHead";
import { Sparkles, Check, X, RefreshCw } from "lucide-react";

interface QueueItem {
  id: string;
  slug: string;
  status: string;
  original_intro: string | null;
  ai_rewritten_intro: string | null;
  queued_at: string;
}

const AdminContentRefresh = () => {
  const { isAdmin, isLoading: adminLoading } = useAdmin();
  const { toast } = useToast();
  const [items, setItems] = useState<QueueItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("content_refresh_queue")
      .select("*")
      .order("queued_at", { ascending: false })
      .limit(50);
    setItems((data as QueueItem[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    if (isAdmin) load();
  }, [isAdmin]);

  if (adminLoading) return null;
  if (!isAdmin) return <Navigate to="/" replace />;

  const runNow = async () => {
    setRunning(true);
    const { error } = await supabase.functions.invoke("daily-content-freshness");
    if (error) toast({ title: "Failed", description: error.message, variant: "destructive" });
    else toast({ title: "Queued a fresh draft" });
    setRunning(false);
    load();
  };

  const decide = async (item: QueueItem, decision: "approved" | "rejected") => {
    if (decision === "approved" && item.ai_rewritten_intro) {
      // Apply rewritten intro to the article's excerpt + bump updated_at.
      await supabase
        .from("blog_articles")
        .update({ excerpt: item.ai_rewritten_intro, updated_at: new Date().toISOString() })
        .eq("slug", item.slug);

      // Best-effort IndexNow ping.
      const url = `https://livingwitharthritis.org.uk/blog/${item.slug}`;
      supabase.functions.invoke("indexnow-ping", { body: { urls: [url] } }).catch(() => {});
    }
    await supabase
      .from("content_refresh_queue")
      .update({ status: decision, reviewed_at: new Date().toISOString() })
      .eq("id", item.id);
    toast({ title: `Marked ${decision}` });
    load();
  };

  return (
    <>
      <SeoHead title="Admin: Content Refresh" description="Internal admin view for the content refresh queue." path="/admin/content-refresh" noindex />
      <Header />
      <main className="container mx-auto px-6 py-10 max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Sparkles className="w-7 h-7 text-primary" />
              Content Refresh Queue
            </h1>
            <p className="text-muted-foreground mt-1">
              Review rewritten intros before they go live. Approved items update the article and ping search engines.
            </p>
          </div>
          <Button onClick={runNow} disabled={running}>
            <RefreshCw className={`w-4 h-4 mr-2 ${running ? "animate-spin" : ""}`} />
            Generate now
          </Button>
        </div>

        {loading ? (
          <p className="text-muted-foreground">Loading…</p>
        ) : items.length === 0 ? (
          <Card className="p-10 text-center text-muted-foreground">
            Queue is empty. Run "Generate now" to create the first draft.
          </Card>
        ) : (
          <div className="space-y-6">
            {items.map((item) => (
              <Card key={item.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-semibold">/blog/{item.slug}</p>
                    <p className="text-xs text-muted-foreground">
                      Queued {new Date(item.queued_at).toLocaleString("en-GB")}
                    </p>
                  </div>
                  <Badge variant={item.status === "pending" ? "default" : "secondary"}>
                    {item.status}
                  </Badge>
                </div>

                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-xs uppercase text-muted-foreground mb-1">Original</p>
                    <div className="bg-muted/40 p-3 rounded-md whitespace-pre-wrap">
                      {item.original_intro}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs uppercase text-muted-foreground mb-1">Rewritten draft</p>
                    <div className="bg-primary/5 p-3 rounded-md whitespace-pre-wrap">
                      {item.ai_rewritten_intro}
                    </div>
                  </div>
                </div>

                {item.status === "pending" && (
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" onClick={() => decide(item, "approved")}>
                      <Check className="w-4 h-4 mr-1" /> Approve & publish
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => decide(item, "rejected")}>
                      <X className="w-4 h-4 mr-1" /> Reject
                    </Button>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default AdminContentRefresh;
