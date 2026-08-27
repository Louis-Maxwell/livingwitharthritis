import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAdmin } from "@/hooks/useAdmin";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoHead from "@/components/SeoHead";
import { TrendingUp, Plus, RefreshCw, Trash2 } from "lucide-react";

interface TrackedKeyword {
  id: string;
  keyword: string;
  target_url: string;
  market: string;
  is_active: boolean;
}

interface RankRow {
  keyword_id: string;
  position: number | null;
  search_volume: number | null;
  ranking_url: string | null;
  captured_at: string;
}

const AdminRankTracker = () => {
  const { isAdmin, isLoading: adminLoading } = useAdmin();
  const { toast } = useToast();
  const [keywords, setKeywords] = useState<TrackedKeyword[]>([]);
  const [latest, setLatest] = useState<Record<string, RankRow>>({});
  const [newKw, setNewKw] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [syncing, setSyncing] = useState(false);

  const load = async () => {
    const { data: kws } = await supabase.from("tracked_keywords").select("*").order("keyword");
    setKeywords((kws as TrackedKeyword[]) || []);

    const { data: ranks } = await supabase
      .from("rank_history")
      .select("*")
      .order("captured_at", { ascending: false })
      .limit(500);
    const map: Record<string, RankRow> = {};
    for (const r of (ranks as RankRow[]) || []) {
      if (!map[r.keyword_id]) map[r.keyword_id] = r;
    }
    setLatest(map);
  };

  useEffect(() => {
    if (isAdmin) load();
  }, [isAdmin]);

  if (adminLoading) return null;
  if (!isAdmin) return <Navigate to="/" replace />;

  const add = async () => {
    if (!newKw.trim() || !newUrl.trim()) return;
    const { error } = await supabase
      .from("tracked_keywords")
      .insert({ keyword: newKw.trim(), target_url: newUrl.trim(), market: "uk" });
    if (error) toast({ title: "Failed", description: error.message, variant: "destructive" });
    else {
      setNewKw("");
      setNewUrl("");
      load();
    }
  };

  const remove = async (id: string) => {
    await supabase.from("tracked_keywords").delete().eq("id", id);
    load();
  };

  const sync = async () => {
    setSyncing(true);
    const { data, error } = await supabase.functions.invoke("seo-rank-sync");
    if (error) toast({ title: "Sync failed", description: error.message, variant: "destructive" });
    else toast({ title: "Sync complete", description: JSON.stringify(data) });
    setSyncing(false);
    load();
  };

  const opportunities = keywords.filter((k) => {
    const r = latest[k.id];
    return r?.position && r.position >= 11 && r.position <= 20;
  });

  return (
    <>
      <SeoHead title="Admin: Rank Tracker" description="Internal admin view for tracked keyword rankings." path="/admin/rank-tracker" noindex />
      <Header />
      <main id="main-content" className="container mx-auto px-6 py-10 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <TrendingUp className="w-7 h-7 text-primary" />
              Rank Tracker
            </h1>
            <p className="text-muted-foreground mt-1">
              Weekly Google search positions for tracked UK keywords. Requires Semrush connector.
            </p>
          </div>
          <Button onClick={sync} disabled={syncing}>
            <RefreshCw className={`w-4 h-4 mr-2 ${syncing ? "animate-spin" : ""}`} />
            Sync now
          </Button>
        </div>

        <Card className="p-4 mb-6">
          <div className="flex gap-2">
            <Input placeholder="Keyword (e.g. rheumatoid arthritis support)" value={newKw} onChange={(e) => setNewKw(e.target.value)} />
            <Input placeholder="Target URL path (e.g. /conditions/rheumatoid-arthritis)" value={newUrl} onChange={(e) => setNewUrl(e.target.value)} />
            <Button onClick={add}><Plus className="w-4 h-4 mr-1" />Track</Button>
          </div>
        </Card>

        {opportunities.length > 0 && (
          <Card className="p-4 mb-6 border-primary/30 bg-primary/5">
            <p className="font-semibold mb-2">{opportunities.length} keywords on page 2 — refresh these first</p>
            <div className="flex flex-wrap gap-2">
              {opportunities.map((k) => (
                <Badge key={k.id} variant="secondary">
                  {k.keyword} (pos {latest[k.id]?.position})
                </Badge>
              ))}
            </div>
          </Card>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left">
                <th className="p-3">Keyword</th>
                <th className="p-3">Target</th>
                <th className="p-3">Position</th>
                <th className="p-3">Volume</th>
                <th className="p-3">Ranking URL</th>
                <th className="p-3">Last sync</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {keywords.map((k) => {
                const r = latest[k.id];
                return (
                  <tr key={k.id} className="border-b hover:bg-muted/40">
                    <td className="p-3 font-medium">{k.keyword}</td>
                    <td className="p-3 text-muted-foreground">{k.target_url}</td>
                    <td className="p-3">{r?.position ?? "—"}</td>
                    <td className="p-3">{r?.search_volume ?? "—"}</td>
                    <td className="p-3 text-xs text-muted-foreground truncate max-w-[200px]">{r?.ranking_url ?? "—"}</td>
                    <td className="p-3 text-xs">{r ? new Date(r.captured_at).toLocaleDateString("en-GB") : "Never"}</td>
                    <td className="p-3">
                      <Button size="sm" variant="ghost" onClick={() => remove(k.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                );
              })}
              {keywords.length === 0 && (
                <tr><td colSpan={7} className="p-8 text-center text-muted-foreground">No tracked keywords yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AdminRankTracker;
