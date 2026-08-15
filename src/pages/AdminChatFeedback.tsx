 
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/hooks/useAdmin";
import { supabase } from "@/integrations/supabase/client";
import SeoHead from "@/components/SeoHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ThumbsUp, ThumbsDown, RefreshCw, Trash2, Database } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from "@/integrations/supabase/config";

type FeedbackRow = {
  id: string;
  rating: number;
  comment: string | null;
  user_message: string | null;
  assistant_message: string | null;
  created_at: string;
  session_key: string | null;
  user_id: string | null;
};

const AdminChatFeedback = () => {
  const navigate = useNavigate();
  const { isAdmin, isLoading: adminLoading } = useAdmin();
  const [rows, setRows] = useState<FeedbackRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "up" | "down">("all");
  const [ingesting, setIngesting] = useState(false);

  useEffect(() => {
    if (!adminLoading && !isAdmin) navigate("/");
  }, [isAdmin, adminLoading, navigate]);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("chat_feedback")
      .select("id, rating, comment, user_message, assistant_message, created_at, session_key, user_id")
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) {
      toast.error(`Failed to load: ${error.message}`);
    } else {
      setRows(data ?? []);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isAdmin) load();
  }, [isAdmin]);

  const filtered = useMemo(() => {
    if (filter === "up") return rows.filter((r) => r.rating === 1);
    if (filter === "down") return rows.filter((r) => r.rating === -1);
    return rows;
  }, [rows, filter]);

  const counts = useMemo(() => {
    const up = rows.filter((r) => r.rating === 1).length;
    const down = rows.filter((r) => r.rating === -1).length;
    return { up, down, total: rows.length };
  }, [rows]);

  const deleteRow = async (id: string) => {
    const { error } = await supabase.from("chat_feedback").delete().eq("id", id);
    if (error) toast.error(error.message);
    else {
      setRows((r) => r.filter((row) => row.id !== id));
      toast.success("Deleted");
    }
  };

  const runIngest = async () => {
    setIngesting(true);
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.access_token) {
        toast.error("Sign in required");
        return;
      }
      const resp = await fetch(
        `${SUPABASE_URL}/functions/v1/ingest-content`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session.session.access_token}`,
            apikey: SUPABASE_PUBLISHABLE_KEY,
            "Content-Type": "application/json",
          },
          body: "{}",
        },
      );
      const body = await resp.json();
      if (!resp.ok) {
        toast.error(body?.error?.message ?? "Ingest failed");
      } else {
        toast.success(`Ingested ${body.ingested} chunks`);
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Network error");
    } finally {
      setIngesting(false);
    }
  };

  if (adminLoading) return <div className="p-8">Loading…</div>;
  if (!isAdmin) return null;

  return (
    <>
      <SeoHead
        title="Chat feedback — Admin"
        description="Review chatbot feedback and refine model prompts."
        path="/admin/chat-feedback"
        noindex
      />

      <div className="min-h-screen bg-background">
        <div className="container mx-auto max-w-6xl px-4 py-8">
          <Button variant="ghost" size="sm" onClick={() => navigate("/admin")} className="mb-4 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to admin
          </Button>

          <div className="flex items-start justify-between flex-wrap gap-3 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-1">Chat feedback</h1>
              <p className="text-sm text-muted-foreground">
                Review user feedback on chatbot responses to refine prompts and knowledge base.
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={load} disabled={loading} className="gap-2">
                <RefreshCw className={loading ? "h-3.5 w-3.5 animate-spin" : "h-3.5 w-3.5"} />
                Refresh
              </Button>
              <Button size="sm" onClick={runIngest} disabled={ingesting} className="gap-2">
                <Database className="h-3.5 w-3.5" />
                {ingesting ? "Ingesting…" : "Rebuild knowledge base"}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            <Card>
              <CardContent className="pt-4 pb-3">
                <div className="text-2xl font-bold">{counts.total}</div>
                <div className="text-xs text-muted-foreground">Total feedback</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4 pb-3">
                <div className="text-2xl font-bold text-primary flex items-center gap-1.5">
                  <ThumbsUp className="h-5 w-5" /> {counts.up}
                </div>
                <div className="text-xs text-muted-foreground">Helpful</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4 pb-3">
                <div className="text-2xl font-bold text-destructive flex items-center gap-1.5">
                  <ThumbsDown className="h-5 w-5" /> {counts.down}
                </div>
                <div className="text-xs text-muted-foreground">Not helpful</div>
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-2 mb-4">
            {(["all", "up", "down"] as const).map((f) => (
              <Button
                key={f}
                variant={filter === f ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(f)}
              >
                {f === "all" ? "All" : f === "up" ? "Helpful" : "Not helpful"}
              </Button>
            ))}
          </div>

          {loading ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : filtered.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground text-sm">
                No feedback yet.
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {filtered.map((row) => (
                <Card key={row.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant={row.rating === 1 ? "default" : "destructive"} className="gap-1">
                          {row.rating === 1 ? (
                            <ThumbsUp className="h-3 w-3" />
                          ) : (
                            <ThumbsDown className="h-3 w-3" />
                          )}
                          {row.rating === 1 ? "Helpful" : "Not helpful"}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(row.created_at), { addSuffix: true })}
                        </span>
                        {row.user_id && (
                          <Badge variant="outline" className="text-[10px]">Signed in</Badge>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteRow(row.id)}
                        className="text-muted-foreground hover:text-destructive h-7 w-7 p-0"
                        aria-label="Delete feedback"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    {row.comment && (
                      <div className="rounded-md bg-muted/50 p-2.5 border-l-2 border-primary">
                        <div className="text-[10px] uppercase tracking-wide text-primary font-medium mb-1">
                          User comment
                        </div>
                        <p className="text-foreground/90 whitespace-pre-wrap">{row.comment}</p>
                      </div>
                    )}
                    {row.user_message && (
                      <div>
                        <div className="text-[10px] uppercase tracking-wide text-muted-foreground font-medium mb-1">
                          User asked
                        </div>
                        <p className="text-foreground/80">{row.user_message}</p>
                      </div>
                    )}
                    {row.assistant_message && (
                      <div>
                        <div className="text-[10px] uppercase tracking-wide text-muted-foreground font-medium mb-1">
                          Assistant replied
                        </div>
                        <p className="text-foreground/70 whitespace-pre-wrap line-clamp-6">
                          {row.assistant_message}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminChatFeedback;
