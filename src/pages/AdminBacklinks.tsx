import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAdmin } from "@/hooks/useAdmin";
import { supabase } from "@/integrations/supabase/client";
import SeoHead from "@/components/SeoHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { ArrowLeft, ExternalLink, Link2, CheckCircle2, Clock, XCircle, Circle } from "lucide-react";
import { toast } from "sonner";

type Status = "not_started" | "submitted" | "live" | "rejected";

interface Submission {
  id: string;
  target_name: string;
  target_url: string;
  tier: number;
  category: string;
  status: Status;
  submission_url: string | null;
  submitted_at: string | null;
  live_at: string | null;
  link_type: string | null;
  notes: string | null;
}

const STATUS_META: Record<Status, { label: string; icon: typeof Circle; cls: string }> = {
  not_started: { label: "Not started", icon: Circle, cls: "bg-muted text-muted-foreground" },
  submitted: { label: "Submitted", icon: Clock, cls: "bg-black/5 text-black" },
  live: { label: "Live", icon: CheckCircle2, cls: "bg-secondary/10 text-secondary" },
  rejected: { label: "Rejected", icon: XCircle, cls: "bg-primary/10 text-primary" },
};

export default function AdminBacklinks() {
  const navigate = useNavigate();
  const { isAdmin, isLoading: adminLoading } = useAdmin();
  const [rows, setRows] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!adminLoading && !isAdmin) navigate("/auth");
  }, [adminLoading, isAdmin, navigate]);

  useEffect(() => {
    if (!isAdmin) return;
    const load = async () => {
      const { data, error } = await supabase
        .from("backlink_submissions")
        .select("*")
        .order("tier", { ascending: true })
        .order("target_name", { ascending: true });
      if (error) {
        toast.error("Failed to load backlink targets");
      } else {
        setRows((data ?? []) as Submission[]);
      }
      setLoading(false);
    };
    load();
  }, [isAdmin]);

  const updateStatus = async (id: string, status: Status) => {
    const patch: Partial<Submission> = { status };
    if (status === "submitted") patch.submitted_at = new Date().toISOString();
    if (status === "live") patch.live_at = new Date().toISOString();

    const { error } = await supabase
      .from("backlink_submissions")
      .update(patch)
      .eq("id", id);

    if (error) {
      toast.error("Update failed");
      return;
    }
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...patch } as Submission : r)),
    );
    toast.success(`Marked ${STATUS_META[status].label}`);
  };

  const counts = rows.reduce<Record<Status, number>>(
    (acc, r) => ({ ...acc, [r.status]: (acc[r.status] ?? 0) + 1 }),
    { not_started: 0, submitted: 0, live: 0, rejected: 0 },
  );

  if (adminLoading) return null;
  if (!isAdmin) return null;

  return (
    <>
      <SeoHead
        title="Backlink Tracker"
        description="Admin tracker for outbound directory submissions and backlink acquisition status."
        path="/admin/backlinks"
        noindex
      />
      <main id="main-content" className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="mb-8">
            <Link to="/admin" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to admin
            </Link>
            <h1 className="font-display text-4xl font-extrabold tracking-tight">Backlink Tracker</h1>
            <p className="text-muted-foreground mt-2">
              20 UK directory and citation targets. Update the status after each submission so we can see link velocity.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {(Object.keys(STATUS_META) as Status[]).map((s) => {
              const Icon = STATUS_META[s].icon;
              return (
                <Card key={s}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          {STATUS_META[s].label}
                        </p>
                        <p className="text-3xl font-extrabold mt-1">{counts[s] ?? 0}</p>
                      </div>
                      <Icon className="w-8 h-8 text-muted-foreground/40" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link2 className="w-5 h-5" /> Outreach targets
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-muted-foreground py-8 text-center">Loading…</p>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Target</TableHead>
                        <TableHead>Tier</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Link type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rows.map((r) => (
                        <TableRow key={r.id}>
                          <TableCell className="font-medium">
                            <a
                              href={r.target_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-primary inline-flex items-center gap-1"
                            >
                              {r.target_name}
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">T{r.tier}</Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">{r.category}</TableCell>
                          <TableCell className="text-sm">{r.link_type ?? "—"}</TableCell>
                          <TableCell>
                            <Badge className={STATUS_META[r.status].cls}>
                              {STATUS_META[r.status].label}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Select
                              value={r.status}
                              onValueChange={(v) => updateStatus(r.id, v as Status)}
                            >
                              <SelectTrigger className="w-[140px] ml-auto">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {(Object.keys(STATUS_META) as Status[]).map((s) => (
                                  <SelectItem key={s} value={s}>
                                    {STATUS_META[s].label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>

          <p className="text-xs text-muted-foreground mt-6">
            Full submission blurbs and forms are in the outreach pack delivered separately.
          </p>
        </div>
      </main>
    </>
  );
}
