import { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAdmin } from "@/hooks/useAdmin";
import { supabase } from "@/integrations/supabase/client";
import SeoHead from "@/components/SeoHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Mail, CheckCircle2, Clock, Ban, RefreshCw, Download, type LucideIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

type SubscriberRow = {
  id: string;
  email: string;
  categories: string[];
  source: string;
  subscribed_at: string;
  confirmed_at: string | null;
  is_active: boolean;
  frequency: string;
};

type StatusFilter = "all" | "confirmed" | "pending" | "unsubscribed";

const PAGE_SIZE = 50;

const rowStatus = (r: SubscriberRow): StatusFilter =>
  !r.is_active ? "unsubscribed" : r.confirmed_at ? "confirmed" : "pending";

const statusBadge: Record<StatusFilter, string> = {
  all: "",
  confirmed: "bg-primary text-primary border-primary",
  pending: "bg-primary text-primary border-primary",
  unsubscribed: "bg-primary text-primary border-primary",
};

const toCsv = (rows: SubscriberRow[]): string => {
  const header = ["email", "categories", "source", "subscribed_at", "confirmed_at", "status", "frequency"];
  const escape = (v: string) => `"${v.replace(/"/g, '""')}"`;
  const lines = rows.map((r) =>
    [
      r.email,
      r.categories.join("; "),
      r.source,
      r.subscribed_at,
      r.confirmed_at ?? "",
      rowStatus(r),
      r.frequency,
    ].map((v) => escape(String(v))).join(","),
  );
  return [header.join(","), ...lines].join("\n");
};

const AdminNewsletter = () => {
  const navigate = useNavigate();
  const { isAdmin, isLoading: adminLoading } = useAdmin();
  const [rows, setRows] = useState<SubscriberRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<StatusFilter>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (!adminLoading && !isAdmin) navigate("/auth");
  }, [isAdmin, adminLoading, navigate]);

  const fetchSubscribers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("newsletter_subscriptions")
      .select("id, email, categories, source, subscribed_at, confirmed_at, is_active, frequency")
      .order("subscribed_at", { ascending: false })
      .limit(2000);
    if (error) {
      console.error(error);
      setRows([]);
    } else {
      setRows((data ?? []) as SubscriberRow[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isAdmin) fetchSubscribers();
  }, [isAdmin]);

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      if (status !== "all" && rowStatus(r) !== status) return false;
      if (search && !`${r.email} ${r.source}`.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [rows, status, search]);

  const stats = useMemo(() => {
    const s = { total: rows.length, confirmed: 0, pending: 0, unsubscribed: 0 };
    for (const r of rows) {
      const st = rowStatus(r);
      if (st === "confirmed") s.confirmed++;
      else if (st === "pending") s.pending++;
      else s.unsubscribed++;
    }
    return s;
  }, [rows]);

  const paged = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  const exportCsv = () => {
    const csv = toCsv(filtered);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `newsletter-subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (adminLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading…</div>;
  }
  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-background">
      <SeoHead title="Newsletter Subscribers · Admin" description="Newsletter subscriber list" path="/admin/newsletter" noindex />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin"><ArrowLeft className="w-4 h-4 mr-1" /> Admin</Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">Newsletter Subscribers</h1>
          </div>
          <div className="flex gap-2">
            <Button onClick={exportCsv} variant="outline" size="sm" disabled={filtered.length === 0}>
              <Download className="w-4 h-4 mr-2" /> Export CSV
            </Button>
            <Button onClick={fetchSubscribers} variant="outline" size="sm" disabled={loading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} /> Refresh
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard icon={Mail} label="Total" value={stats.total} tone="text-foreground" />
          <StatCard icon={CheckCircle2} label="Confirmed" value={stats.confirmed} tone="text-primary" />
          <StatCard icon={Clock} label="Pending" value={stats.pending} tone="text-primary" />
          <StatCard icon={Ban} label="Unsubscribed" value={stats.unsubscribed} tone="text-primary" />
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
            <Select value={status} onValueChange={(v) => { setStatus(v as StatusFilter); setPage(0); }}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending confirmation</SelectItem>
                <SelectItem value="unsubscribed">Unsubscribed</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Search email or source…"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              {filtered.length} subscriber{filtered.length === 1 ? "" : "s"}
              {filtered.length !== rows.length && ` (filtered from ${rows.length})`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Interests</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Subscribed</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">Loading…</TableCell></TableRow>
                ) : paged.length === 0 ? (
                  <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No subscribers found.</TableCell></TableRow>
                ) : paged.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="text-sm">{r.email}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{r.categories.join(", ") || "—"}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{r.source}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusBadge[rowStatus(r)]}>
                        {rowStatus(r)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                      {formatDistanceToNow(new Date(r.subscribed_at), { addSuffix: true })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-muted-foreground">Page {page + 1} of {totalPages}</span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" disabled={page === 0} onClick={() => setPage((p) => p - 1)}>Previous</Button>
                  <Button size="sm" variant="outline" disabled={page >= totalPages - 1} onClick={() => setPage((p) => p + 1)}>Next</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, tone }: { icon: LucideIcon; label: string; value: number; tone: string }) => (
  <Card>
    <CardContent className="pt-6 pb-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{label}</p>
          <p className={`text-3xl font-extrabold mt-1 ${tone}`}>{value}</p>
        </div>
        <Icon className={`w-7 h-7 ${tone} opacity-70`} />
      </div>
    </CardContent>
  </Card>
);

export default AdminNewsletter;
