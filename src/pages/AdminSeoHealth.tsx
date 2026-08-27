import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import SeoHead from "@/components/SeoHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAdmin } from "@/hooks/useAdmin";
import { useToast } from "@/hooks/use-toast";

type RefreshRun = {
  id: string;
  ran_at: string;
  ok: boolean;
  sitemap_count: number;
  routes_checked: number;
  schema_errors: Array<{ route: string; problem: string }>;
  psi_scores: Array<{ path: string; score: number | null }>;
  duration_ms: number;
  error_message: string | null;
};

function fmtDate(iso: string) {
  return new Date(iso).toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function AdminSeoHealth() {
  const { isAdmin, isLoading } = useAdmin();
  const [runs, setRuns] = useState<RefreshRun[]>([]);
  const [loading, setLoading] = useState(true);
  const [triggering, setTriggering] = useState(false);
  const { toast } = useToast();

  const loadRuns = async () => {
    setLoading(true);
    // Supabase SEO runs query removed - functionality to be restored later
    setRuns([]);
    setLoading(false);
  };

  useEffect(() => {
    if (isAdmin) loadRuns();
  }, [isAdmin]);

  const triggerNow = async () => {
    setTriggering(true);
    const { error } = await supabase.functions.invoke("daily-seo-refresh", {
      body: {},
    });
    setTriggering(false);
    if (error) {
      toast({ title: "Refresh failed", description: error.message });
    } else {
      toast({ title: "Refresh complete", description: "Latest run recorded." });
      await loadRuns();
    }
  };

  if (isLoading) {
    return <div className="p-8">Loading…</div>;
  }
  if (!isAdmin) return <Navigate to="/" replace />;

  const latest = runs[0];

  return (
    <>
      <SeoHead
        title="SEO Health · Admin"
        description="Daily SEO, AEO and GEO refresh history."
        path="/admin/seo-health"
        noindex
      />
      <main id="main-content" className="container mx-auto px-4 py-10 max-w-5xl">
        <header className="flex items-end justify-between mb-8">
          <div>
            <h1 className="text-3xl font-semibold">SEO Health</h1>
            <p className="text-muted-foreground mt-1">
              Daily SEO / AEO / GEO refresh history (last 14 runs).
            </p>
          </div>
          <Button onClick={triggerNow} disabled={triggering}>
            {triggering ? "Running…" : "Run refresh now"}
          </Button>
        </header>

        {latest && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                Latest run
                <Badge variant={latest.ok ? "default" : "destructive"}>
                  {latest.ok ? "OK" : "Failed"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
              <div>
                <div className="text-muted-foreground">When</div>
                <div className="font-medium">{fmtDate(latest.ran_at)}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Sitemap URLs</div>
                <div className="font-medium">{latest.sitemap_count}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Routes checked</div>
                <div className="font-medium">{latest.routes_checked}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Duration</div>
                <div className="font-medium">
                  {(latest.duration_ms / 1000).toFixed(1)}s
                </div>
              </div>
              {latest.schema_errors.length > 0 && (
                <div className="col-span-2 md:col-span-4">
                  <div className="text-muted-foreground mb-2">
                    Schema errors ({latest.schema_errors.length})
                  </div>
                  <ul className="space-y-1 max-h-48 overflow-y-auto">
                    {latest.schema_errors.slice(0, 20).map((e, i) => (
                      <li key={i} className="text-xs">
                        <code>{e.route}</code> — {e.problem}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {latest.error_message && (
                <div className="col-span-2 md:col-span-4 text-destructive">
                  {latest.error_message}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>History</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div>Loading…</div>
            ) : runs.length === 0 ? (
              <div className="text-muted-foreground">
                No runs yet. The daily job fires at 03:00 UTC, or click
                "Run refresh now" above.
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead className="text-left text-muted-foreground border-b">
                  <tr>
                    <th className="py-2">When</th>
                    <th>Status</th>
                    <th>URLs</th>
                    <th>Checked</th>
                    <th>Schema errors</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {runs.map((r) => (
                    <tr key={r.id} className="border-b last:border-0">
                      <td className="py-2">{fmtDate(r.ran_at)}</td>
                      <td>
                        <Badge variant={r.ok ? "default" : "destructive"}>
                          {r.ok ? "OK" : "Failed"}
                        </Badge>
                      </td>
                      <td>{r.sitemap_count}</td>
                      <td>{r.routes_checked}</td>
                      <td>{r.schema_errors.length}</td>
                      <td>{(r.duration_ms / 1000).toFixed(1)}s</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </CardContent>
        </Card>
      </main>
    </>
  );
}
