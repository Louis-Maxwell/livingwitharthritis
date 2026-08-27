/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAdmin } from "@/hooks/useAdmin";
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
import { ArrowLeft, Mail, CheckCircle2, AlertTriangle, Ban, RefreshCw } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

type LogRow = {
  id: string;
  message_id: string | null;
  template_name: string | null;
  recipient_email: string | null;
  status: string;
  error_message: string | null;
  created_at: string;
};

const RANGES = {
  "24h": 1,
  "7d": 7,
  "30d": 30,
  "all": 3650,
} as const;

type RangeKey = keyof typeof RANGES;

const statusBadge: Record<string, string> = {
  sent: "bg-primary text-primary border-primary",
  pending: "bg-primary text-primary border-primary",
  dlq: "bg-primary text-primary border-primary",
  failed: "bg-primary text-primary border-primary",
  bounced: "bg-primary text-primary border-primary",
  complained: "bg-primary text-primary border-primary",
  suppressed: "bg-primary text-primary border-primary",
};

const PAGE_SIZE = 50;

const AdminEmails = () => {
  const navigate = useNavigate();
  const { isAdmin, isLoading: adminLoading } = useAdmin();
  const [rows, setRows] = useState<LogRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState<RangeKey>("7d");
  const [status, setStatus] = useState<string>("all");
  const [template, setTemplate] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (!adminLoading && !isAdmin) navigate("/auth");
  }, [isAdmin, adminLoading, navigate]);

  const fetchLogs = async () => {
    setLoading(true);
    // Supabase email log query removed - functionality to be restored later
    setRows([]);
    setLoading(false);
  };

  useEffect(() => {
    if (isAdmin) fetchLogs();
  }, [isAdmin, range]);

  const templates = useMemo(() => {
    const s = new Set<string>();
    rows.forEach(r => r.template_name && s.add(r.template_name));
    return Array.from(s).sort();
  }, [rows]);

  const filtered = useMemo(() => {
    return rows.filter(r => {
      if (status !== "all" && r.status !== status) return false;
      if (template !== "all" && r.template_name !== template) return false;
      if (search && !(`${r.recipient_email ?? ""} ${r.template_name ?? ""}`)
        .toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [rows, status, template, search]);

  const stats = useMemo(() => {
    const s = { total: filtered.length, sent: 0, failed: 0, suppressed: 0 };
    for (const r of filtered) {
      if (r.status === "sent") s.sent++;
      else if (r.status === "dlq" || r.status === "failed" || r.status === "bounced") s.failed++;
      else if (r.status === "suppressed" || r.status === "complained") s.suppressed++;
    }
    return s;
  }, [filtered]);

  const paged = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  if (adminLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading…</div>;
  }
  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-background">
      <SeoHead title="Email Monitoring · Admin" description="Email delivery dashboard" path="/admin/emails" noindex />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin"><ArrowLeft className="w-4 h-4 mr-1" /> Admin</Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">Email Monitoring</h1>
          </div>
          <Button onClick={fetchLogs} variant="outline" size="sm" disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} /> Refresh
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard icon={Mail} label="Total" value={stats.total} tone="text-foreground" />
          <StatCard icon={CheckCircle2} label="Sent" value={stats.sent} tone="text-primary" />
          <StatCard icon={AlertTriangle} label="Failed" value={stats.failed} tone="text-primary" />
          <StatCard icon={Ban} label="Suppressed" value={stats.suppressed} tone="text-primary" />
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-4 gap-3">
            <Select value={range} onValueChange={(v) => { setRange(v as RangeKey); setPage(0); }}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24 hours</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectContent>
            </Select>
            <Select value={status} onValueChange={(v) => { setStatus(v); setPage(0); }}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="dlq">Failed (DLQ)</SelectItem>
                <SelectItem value="suppressed">Suppressed</SelectItem>
                <SelectItem value="bounced">Bounced</SelectItem>
              </SelectContent>
            </Select>
            <Select value={template} onValueChange={(v) => { setTemplate(v); setPage(0); }}>
              <SelectTrigger><SelectValue placeholder="All templates" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All templates</SelectItem>
                {templates.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
            <Input
              placeholder="Search recipient or template…"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              {filtered.length} email{filtered.length === 1 ? "" : "s"}
              {filtered.length !== rows.length && ` (filtered from ${rows.length})`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Template</TableHead>
                  <TableHead>Recipient</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>When</TableHead>
                  <TableHead>Error</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">Loading…</TableCell></TableRow>
                ) : paged.length === 0 ? (
                  <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No emails in this range.</TableCell></TableRow>
                ) : paged.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-mono text-xs">{r.template_name ?? "—"}</TableCell>
                    <TableCell className="text-sm">{r.recipient_email ?? "—"}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusBadge[r.status] ?? ""}>
                        {r.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                      {formatDistanceToNow(new Date(r.created_at), { addSuffix: true })}
                    </TableCell>
                    <TableCell className="text-xs text-primary max-w-[280px] truncate" title={r.error_message ?? ""}>
                      {r.error_message ?? ""}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-muted-foreground">Page {page + 1} of {totalPages}</span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" disabled={page === 0} onClick={() => setPage(p => p - 1)}>Previous</Button>
                  <Button size="sm" variant="outline" disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)}>Next</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, tone }: { icon: any; label: string; value: number; tone: string }) => (
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

export default AdminEmails;
