import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/hooks/useAdmin";
import SeoHead from "@/components/SeoHead";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const BUCKET_BASE =
  `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/lighthouse-reports`;

type RunRow = {
  target: string;
  strategy: string;
  ok: boolean;
  performanceScore?: number | null;
  lcpMs?: number | null;
  storagePath?: string;
  error?: string;
};

type Summary = {
  runStamp: string;
  completedAt: string;
  runs: RunRow[];
};

type HistoryEntry = {
  runStamp: string;
  completedAt: string;
  runs: Array<{
    target: string;
    strategy: string;
    ok: boolean;
    performanceScore?: number | null;
    lcpMs?: number | null;
  }>;
};

const TARGETS = ["published", "production"] as const;
const STRATEGIES = ["mobile", "desktop"] as const;

function scoreColor(score: number | null | undefined) {
  if (score == null) return "bg-muted text-muted-foreground";
  const n = Math.round(score * 100);
  if (n >= 90) return "bg-green-600 text-white";
  if (n >= 50) return "bg-amber-500 text-white";
  return "bg-red-600 text-white";
}

function fmtMs(ms: number | null | undefined) {
  if (ms == null) return "—";
  return ms >= 1000 ? `${(ms / 1000).toFixed(2)}s` : `${Math.round(ms)}ms`;
}

export default function AdminPsiDashboard() {
  const navigate = useNavigate();
  const { isAdmin, isLoading: adminLoading } = useAdmin();
  const [latest, setLatest] = useState<Summary | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!adminLoading && !isAdmin) navigate("/auth");
  }, [isAdmin, adminLoading, navigate]);

  if (adminLoading || !isAdmin) return null;

  useEffect(() => {
    document.title = "PSI Performance Dashboard";
    let cancelled = false;
    (async () => {
      try {
        const cacheBuster = `?t=${Date.now()}`;
        const [latestRes, historyRes] = await Promise.all([
          fetch(`${BUCKET_BASE}/latest.json${cacheBuster}`),
          fetch(`${BUCKET_BASE}/history.json${cacheBuster}`),
        ]);
        if (cancelled) return;
        if (latestRes.ok) setLatest(await latestRes.json());
        if (historyRes.ok) setHistory(await historyRes.json());
        if (!latestRes.ok && !historyRes.ok) {
          setError(
            "No PSI data yet. The scheduled audit runs daily at 03:00 UTC, or trigger run-psi-audit manually.",
          );
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : String(e));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Build chart data: one row per run, columns per target/strategy combo
  const chartData = useMemo(() => {
    return history.map((entry) => {
      const row: Record<string, string | number> = {
        date: new Date(entry.completedAt).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
        }),
      };
      for (const r of entry.runs) {
        const key = `${r.target}-${r.strategy}`;
        if (r.lcpMs != null) row[`${key}-lcp`] = Math.round(r.lcpMs);
        if (r.performanceScore != null) {
          row[`${key}-score`] = Math.round(r.performanceScore * 100);
        }
      }
      return row;
    });
  }, [history]);

  const lineColors: Record<string, string> = {
    "published-mobile": "hsl(var(--primary))",
    "published-desktop": "hsl(217 91% 60%)",
    "production-mobile": "hsl(0 72% 51%)",
    "production-desktop": "hsl(142 71% 45%)",
  };

  return (
    <main className="min-h-screen bg-background py-12 px-4">
      <SeoHead title="Admin: PageSpeed Dashboard" description="Internal PageSpeed Insights performance dashboard." path="/admin/psi" noindex />
      <div className="mx-auto max-w-7xl">
        <header className="mb-10">
          <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground">
            PageSpeed Insights Dashboard
          </h1>
          <p className="mt-2 text-muted-foreground">
            Auto-refreshed daily at 03:00 UTC · Source:{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
              lighthouse-reports
            </code>{" "}
            storage bucket
          </p>
          {latest && (
            <p className="mt-2 text-xs text-muted-foreground">
              Last run: {new Date(latest.completedAt).toLocaleString("en-GB")}
            </p>
          )}
        </header>

        {loading && (
          <p className="text-muted-foreground">Loading reports…</p>
        )}

        {error && !loading && !latest && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">{error}</p>
            </CardContent>
          </Card>
        )}

        {/* Latest scores grid */}
        {latest && (
          <section className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {TARGETS.flatMap((target) =>
              STRATEGIES.map((strategy) => {
                const run = latest.runs.find(
                  (r) => r.target === target && r.strategy === strategy,
                );
                const scorePct =
                  run?.performanceScore != null
                    ? Math.round(run.performanceScore * 100)
                    : null;
                return (
                  <Card key={`${target}-${strategy}`}>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center justify-between text-sm font-medium uppercase tracking-wider text-muted-foreground">
                        <span>{target}</span>
                        <Badge variant="outline" className="capitalize">
                          {strategy}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {run?.ok ? (
                        <>
                          <div
                            className={`mb-3 inline-flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold ${scoreColor(
                              run.performanceScore,
                            )}`}
                          >
                            {scorePct ?? "—"}
                          </div>
                          <dl className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <dt className="text-muted-foreground">LCP</dt>
                              <dd className="font-mono">{fmtMs(run.lcpMs)}</dd>
                            </div>
                          </dl>
                        </>
                      ) : (
                        <p className="text-sm text-destructive">
                          {run?.error ?? "No data"}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                );
              }),
            )}
          </section>
        )}

        {/* LCP trend chart */}
        {chartData.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>LCP trend (ms — lower is better)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                      }}
                    />
                    <Legend />
                    {TARGETS.flatMap((t) =>
                      STRATEGIES.map((s) => {
                        const key = `${t}-${s}-lcp`;
                        return (
                          <Line
                            key={key}
                            type="monotone"
                            dataKey={key}
                            name={`${t} ${s}`}
                            stroke={lineColors[`${t}-${s}`]}
                            strokeWidth={2}
                            dot={{ r: 3 }}
                            connectNulls
                          />
                        );
                      }),
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Performance score trend */}
        {chartData.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Performance score trend (0–100)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                    <YAxis domain={[0, 100]} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                      }}
                    />
                    <Legend />
                    {TARGETS.flatMap((t) =>
                      STRATEGIES.map((s) => {
                        const key = `${t}-${s}-score`;
                        return (
                          <Line
                            key={key}
                            type="monotone"
                            dataKey={key}
                            name={`${t} ${s}`}
                            stroke={lineColors[`${t}-${s}`]}
                            strokeWidth={2}
                            dot={{ r: 3 }}
                            connectNulls
                          />
                        );
                      }),
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
