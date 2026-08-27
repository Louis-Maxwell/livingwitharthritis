/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, lazy, Suspense } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAdmin } from "@/hooks/useAdmin";
import SeoHead from "@/components/SeoHead";
import { useAdminDonations } from "@/hooks/useAdminDonations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft, DollarSign, Users, TrendingUp, CalendarDays, ExternalLink,
  MessageSquare, Download, CalendarIcon, Check, X, Trash2, Heart, BarChart3,
  Star, Zap, Globe, Shield, Activity,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { startOfDay, endOfDay, format } from "date-fns";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { SkeletonStats, SkeletonTable } from "@/components/ui/SkeletonCard";
import { toast } from "sonner";

const BookingDiary = lazy(() => import("@/components/BookingDiary"));

/* ── Gradient stat card ── */
const GradientStatCard = ({
  icon: Icon,
  label,
  value,
  subtitle,
  gradient,
  iconColor,
}: {
  icon: any;
  label: string;
  value: string | number;
  subtitle: string;
  gradient: string;
  iconColor: string;
}) => (
  <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
    <div className={`absolute inset-0 opacity-[0.07] ${gradient}`} />
    <CardContent className="pt-6 pb-5 relative">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">{label}</p>
          <p className="text-3xl font-extrabold text-foreground tracking-tight">{value}</p>
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        </div>
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${gradient} shadow-md`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
      </div>
    </CardContent>
  </Card>
);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { isAdmin, isLoading: adminLoading } = useAdmin();
  const { donations, stats, isLoading: donationsLoading, error } = useAdminDonations();
  const [feedback, setFeedback] = useState<Array<{ id: string; navigation_rating: number; speed_rating: number; created_at: string }>>([]);
  const [feedbackLoading, setFeedbackLoading] = useState(true);
  const [dateFrom, setDateFrom] = useState<Date | undefined>();
  const [dateTo, setDateTo] = useState<Date | undefined>();
  const [comments, setComments] = useState<Array<{ id: string; slug: string; author_name: string; content: string; status: string; created_at: string }>>([]);
  const [commentsLoading, setCommentsLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin) return;
    const fetchFeedback = async () => {
      const { data } = await supabase
        .from("feedback_responses")
        .select("*")
        .order("created_at", { ascending: false });
      setFeedback(data || []);
      setFeedbackLoading(false);
    };
    const fetchComments = async () => {
      const { data } = await supabase
        .from("blog_comments")
        .select("*")
        .order("created_at", { ascending: false });
      setComments((data as any[]) || []);
      setCommentsLoading(false);
    };
    fetchFeedback();
    fetchComments();

    const commentsChannel = supabase
      .channel('admin-comments')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'blog_comments' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setComments((prev) => [payload.new as any, ...prev]);
          toast.info("New comment received");
        } else if (payload.eventType === 'UPDATE') {
          setComments((prev) => prev.map((c) => c.id === (payload.new as any).id ? payload.new as any : c));
        } else if (payload.eventType === 'DELETE') {
          setComments((prev) => prev.filter((c) => c.id !== (payload.old as any).id));
        }
      })
      .subscribe();

    const donationsChannel = supabase
      .channel('admin-donations')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'donations' }, () => {
        toast.success("New donation received! 🎉");
      })
      .subscribe();

    return () => {
      supabase.removeChannel(commentsChannel);
      supabase.removeChannel(donationsChannel);
    };
  }, [isAdmin]);

  useEffect(() => {
    if (!adminLoading && !isAdmin) navigate("/auth");
  }, [isAdmin, adminLoading, navigate]);

  if (adminLoading || donationsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/[0.03] p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-muted animate-pulse" />
            <div className="space-y-2">
              <div className="h-7 w-48 bg-muted rounded-lg animate-pulse" />
              <div className="h-4 w-64 bg-muted rounded-lg animate-pulse" />
            </div>
          </div>
          <SkeletonStats />
          <SkeletonTable rows={6} />
        </div>
      </div>
    );
  }

  if (!isAdmin) return null;

  const getCurrencySymbol = (currency: string) => {
    switch (currency) { case "GBP": return "£"; case "EUR": return "€"; default: return "$"; }
  };
  const getFundLabel = (fund: string) => {
    const labels: Record<string, string> = { research: "Research", support: "Patient Support", helpline: "Helpline", general: "General", zakat: "Zakat" };
    return labels[fund] || fund;
  };
  const fundColors: Record<string, string> = {
    research: "bg-primary/10 text-primary border-primary",
    support: "bg-primary/10 text-primary border-primary",
    helpline: "bg-primary/10 text-primary border-primary",
    general: "bg-primary/10 text-primary border-primary",
    zakat: "bg-primary/10 text-primary border-primary",
  };

  const exportFeedbackCsv = () => {
    const header = "Date,Navigation Rating,Speed Rating\n";
    const rows = filteredFeedback.map((f) =>
      `${format(new Date(f.created_at), "yyyy-MM-dd HH:mm")},${f.navigation_rating},${f.speed_rating}`
    ).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `feedback-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredFeedback = feedback.filter((f) => {
    const date = new Date(f.created_at);
    if (dateFrom && date < startOfDay(dateFrom)) return false;
    if (dateTo && date > endOfDay(dateTo)) return false;
    return true;
  });
  const avgNav = filteredFeedback.length ? (filteredFeedback.reduce((s, f) => s + f.navigation_rating, 0) / filteredFeedback.length).toFixed(1) : "–";
  const avgSpeed = filteredFeedback.length ? (filteredFeedback.reduce((s, f) => s + f.speed_rating, 0) / filteredFeedback.length).toFixed(1) : "–";

  const pendingComments = comments.filter((c) => c.status === "pending").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/[0.03]">
      <SeoHead title="Admin Dashboard" description="Internal admin dashboard." path="/admin" noindex />
      {/* Top bar */}
      <div className="border-b border-border/40 bg-background/80 backdrop-blur-xl sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="rounded-xl">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-md">
              <Shield className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground leading-tight">Admin Dashboard</h1>
              <p className="text-xs text-muted-foreground">Manage your organisation</p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-primary bg-primary/10 px-3 py-1.5 rounded-full font-medium">
              <Activity className="w-3 h-3" />
              Live
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <Tabs defaultValue="bookings" className="space-y-8">
          <TabsList className="bg-background border border-border/50 shadow-sm p-1.5 rounded-2xl h-auto flex-wrap gap-1">
            <TabsTrigger value="bookings" className="gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all">
              <CalendarDays className="w-4 h-4" />
              Bookings
            </TabsTrigger>
            <TabsTrigger value="donations" className="gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all">
              <Heart className="w-4 h-4" />
              Donations
            </TabsTrigger>
            <TabsTrigger value="feedback" className="gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all">
              <Star className="w-4 h-4" />
              Feedback
            </TabsTrigger>
            <TabsTrigger value="comments" className="gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all">
              <MessageSquare className="w-4 h-4" />
              Comments
              {pendingComments > 0 && (
                <span className="ml-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                  {pendingComments}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          {/* ═══ BOOKINGS ═══ */}
          <TabsContent value="bookings" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground">Booking Diary</h2>
                <p className="text-sm text-muted-foreground">View and manage patient appointments</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Link to="/admin/chat-feedback">
                  <Button variant="outline" className="gap-2 rounded-xl">
                    <MessageSquare className="w-4 h-4" />
                    Chat Feedback
                  </Button>
                </Link>
                <Link to="/admin/emails">
                  <Button variant="outline" className="gap-2 rounded-xl">
                    <MessageSquare className="w-4 h-4" />
                    Email Monitoring
                  </Button>
                </Link>
                <Link to="/admin/appointments">
                  <Button className="gap-2 rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 shadow-md">
                    <ExternalLink className="w-4 h-4" />
                    Full Manager
                  </Button>
                </Link>
              </div>
            </div>
            <Suspense fallback={<div className="animate-pulse h-[400px] bg-muted/30 rounded-2xl border border-border/30" />}>
              <BookingDiary />
            </Suspense>
          </TabsContent>

          {/* ═══ DONATIONS ═══ */}
          <TabsContent value="donations" className="space-y-8">
            {error && (
              <Card className="border-destructive/50 bg-destructive/5">
                <CardContent className="pt-6"><p className="text-destructive font-medium">{error}</p></CardContent>
              </Card>
            )}

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <GradientStatCard
                icon={DollarSign}
                label="Total Raised"
                value={`£${stats.totalAmount.toLocaleString()}`}
                subtitle="From all donations"
                gradient="bg-gradient-to-br from-primary to-primary"
                iconColor="text-primary-foreground"
              />
              <GradientStatCard
                icon={Users}
                label="Total Donations"
                value={stats.totalCount}
                subtitle="Completed donations"
                gradient="bg-gradient-to-br from-primary to-primary"
                iconColor="text-primary-foreground"
              />
              <GradientStatCard
                icon={TrendingUp}
                label="Average Amount"
                value={`£${stats.averageAmount.toFixed(2)}`}
                subtitle="Per donation"
                gradient="bg-gradient-to-br from-primary to-primary"
                iconColor="text-primary-foreground"
              />
              <GradientStatCard
                icon={Globe}
                label="Fund Types"
                value={Object.keys(stats.byFundType).length}
                subtitle="Active categories"
                gradient="bg-gradient-to-br from-primary to-primary"
                iconColor="text-primary-foreground"
              />
            </div>

            {/* Fund Breakdown */}
            {Object.keys(stats.byFundType).length > 0 && (
              <Card className="border-border/30 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Donations by Fund
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {Object.entries(stats.byFundType).map(([fund, data]) => (
                      <div key={fund} className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 border border-border/30 hover:bg-muted/50 transition-colors">
                        <div>
                          <Badge variant="outline" className={cn("mb-1.5", fundColors[fund])}>
                            {getFundLabel(fund)}
                          </Badge>
                          <p className="text-xs text-muted-foreground">{data.count} donations</p>
                        </div>
                        <p className="text-lg font-bold text-foreground">£{data.amount.toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Donations Table */}
            <Card className="border-border/30 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">All Donations</CardTitle>
              </CardHeader>
              <CardContent>
                {donations.length === 0 ? (
                  <div className="text-center py-16">
                    <Heart className="w-12 h-12 mx-auto mb-3 text-muted-foreground/30" />
                    <p className="text-muted-foreground font-medium">No donations yet</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-border/30">
                          <TableHead>Date</TableHead>
                          <TableHead>Donor</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Fund</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {donations.map((donation) => (
                          <TableRow key={donation.id} className="border-border/20 hover:bg-muted/30">
                            <TableCell className="whitespace-nowrap text-sm">
                              {format(new Date(donation.created_at), "MMM d, yyyy")}
                            </TableCell>
                            <TableCell className="font-medium">{donation.donor_name || "Anonymous"}</TableCell>
                            <TableCell className="text-muted-foreground text-sm">{donation.donor_email || "–"}</TableCell>
                            <TableCell className="text-sm">{donation.donor_location || donation.donor_country || "–"}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className={cn("text-xs", fundColors[donation.fund_type])}>
                                {getFundLabel(donation.fund_type)}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right font-bold">
                              {getCurrencySymbol(donation.currency)}{Number(donation.amount).toLocaleString()}
                            </TableCell>
                            <TableCell>
                              <Badge className="bg-primary/10 text-primary border-primary border" variant="outline">
                                {donation.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ═══ FEEDBACK ═══ */}
          <TabsContent value="feedback" className="space-y-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Star className="w-5 h-5 text-primary" />
                  User Feedback
                </h2>
                <p className="text-sm text-muted-foreground">
                  {filteredFeedback.length} of {feedback.length} responses
                  {(dateFrom || dateTo) && " (filtered)"}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("w-[160px] justify-start text-left font-normal rounded-xl", !dateFrom && "text-muted-foreground")}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateFrom ? format(dateFrom, "MMM d, yyyy") : "From"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} initialFocus className={cn("p-3 pointer-events-auto")} />
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("w-[160px] justify-start text-left font-normal rounded-xl", !dateTo && "text-muted-foreground")}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateTo ? format(dateTo, "MMM d, yyyy") : "To"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={dateTo} onSelect={setDateTo} initialFocus className={cn("p-3 pointer-events-auto")} />
                  </PopoverContent>
                </Popover>
                {(dateFrom || dateTo) && (
                  <Button variant="ghost" size="sm" onClick={() => { setDateFrom(undefined); setDateTo(undefined); }} className="rounded-xl">
                    Clear
                  </Button>
                )}
                <Button variant="outline" className="gap-2 rounded-xl" onClick={exportFeedbackCsv} disabled={filteredFeedback.length === 0}>
                  <Download className="w-4 h-4" />
                  Export
                </Button>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              <GradientStatCard
                icon={Users}
                label="Total Responses"
                value={filteredFeedback.length}
                subtitle="User ratings received"
                gradient="bg-gradient-to-br from-primary to-primary"
                iconColor="text-primary-foreground"
              />
              <GradientStatCard
                icon={Zap}
                label="Avg Navigation"
                value={`${avgNav} / 5`}
                subtitle="Ease of use score"
                gradient="bg-gradient-to-br from-primary to-primary"
                iconColor="text-primary-foreground"
              />
              <GradientStatCard
                icon={Activity}
                label="Avg Speed"
                value={`${avgSpeed} / 5`}
                subtitle="Performance score"
                gradient="bg-gradient-to-br from-primary to-primary"
                iconColor="text-primary-foreground"
              />
            </div>

            {/* Chart */}
            {filteredFeedback.length > 0 && (
              <Card className="border-border/30 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Ratings Over Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={(() => {
                          const grouped: Record<string, { date: string; navigation: number; speed: number; count: number }> = {};
                          filteredFeedback.forEach((f) => {
                            const key = format(new Date(f.created_at), "MMM d");
                            if (!grouped[key]) grouped[key] = { date: key, navigation: 0, speed: 0, count: 0 };
                            grouped[key].navigation += f.navigation_rating;
                            grouped[key].speed += f.speed_rating;
                            grouped[key].count += 1;
                          });
                          return Object.values(grouped).map((g) => ({
                            date: g.date,
                            Navigation: +(g.navigation / g.count).toFixed(1),
                            Speed: +(g.speed / g.count).toFixed(1),
                          }));
                        })()}
                        margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border/40" />
                        <XAxis dataKey="date" className="text-xs fill-muted-foreground" />
                        <YAxis domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} className="text-xs fill-muted-foreground" />
                        <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px", boxShadow: "0 8px 24px -4px rgba(0,0,0,0.1)" }} />
                        <Legend />
                        <Bar dataKey="Navigation" fill="hsl(187, 72%, 38%)" radius={[6, 6, 0, 0]} />
                        <Bar dataKey="Speed" fill="hsl(38, 92%, 52%)" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="border-border/30 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">All Responses</CardTitle>
              </CardHeader>
              <CardContent>
                {feedbackLoading ? (
                  <p className="text-center text-muted-foreground py-8">Loading…</p>
                ) : filteredFeedback.length === 0 ? (
                  <div className="text-center py-16">
                    <Star className="w-12 h-12 mx-auto mb-3 text-muted-foreground/30" />
                    <p className="text-muted-foreground font-medium">No feedback for this period</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-border/30">
                          <TableHead>Date</TableHead>
                          <TableHead className="text-center">Navigation</TableHead>
                          <TableHead className="text-center">Speed</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredFeedback.map((f) => (
                          <TableRow key={f.id} className="border-border/20 hover:bg-muted/30">
                            <TableCell className="whitespace-nowrap text-sm">
                              {format(new Date(f.created_at), "MMM d, yyyy HH:mm")}
                            </TableCell>
                            <TableCell className="text-center">
                              <RatingPill value={f.navigation_rating} />
                            </TableCell>
                            <TableCell className="text-center">
                              <RatingPill value={f.speed_rating} />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ═══ COMMENTS ═══ */}
          <TabsContent value="comments" className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                Blog Comment Moderation
              </h2>
              <p className="text-sm text-muted-foreground">{comments.length} total comments</p>
            </div>

            <Card className="border-border/30 shadow-sm">
              <CardContent className="pt-6">
                {commentsLoading ? (
                  <p className="text-center text-muted-foreground py-8">Loading…</p>
                ) : comments.length === 0 ? (
                  <div className="text-center py-16">
                    <MessageSquare className="w-12 h-12 mx-auto mb-3 text-muted-foreground/30" />
                    <p className="text-muted-foreground font-medium">No comments yet</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-border/30">
                          <TableHead>Date</TableHead>
                          <TableHead>Article</TableHead>
                          <TableHead>Author</TableHead>
                          <TableHead>Comment</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {comments.map((c) => (
                          <TableRow key={c.id} className="border-border/20 hover:bg-muted/30">
                            <TableCell className="whitespace-nowrap text-sm">
                              {format(new Date(c.created_at), "MMM d, yyyy")}
                            </TableCell>
                            <TableCell className="max-w-[140px] truncate text-sm text-muted-foreground">{c.slug.replace(/-/g, " ")}</TableCell>
                            <TableCell className="font-medium text-sm">{c.author_name}</TableCell>
                            <TableCell className="max-w-[250px] truncate text-sm">{c.content}</TableCell>
                            <TableCell>
                              <CommentStatusBadge status={c.status} />
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-1">
                                {c.status !== "approved" && (
                                  <Button size="icon" variant="ghost" className="h-8 w-8 rounded-xl text-primary hover:bg-primary hover:text-primary"
                                    onClick={async () => { await supabase.from("blog_comments").update({ status: "approved" }).eq("id", c.id); setComments((prev) => prev.map((x) => x.id === c.id ? { ...x, status: "approved" } : x)); }}>
                                    <Check className="w-4 h-4" />
                                  </Button>
                                )}
                                {c.status !== "rejected" && (
                                  <Button size="icon" variant="ghost" className="h-8 w-8 rounded-xl text-primary hover:bg-primary hover:text-primary"
                                    onClick={async () => { await supabase.from("blog_comments").update({ status: "rejected" }).eq("id", c.id); setComments((prev) => prev.map((x) => x.id === c.id ? { ...x, status: "rejected" } : x)); }}>
                                    <X className="w-4 h-4" />
                                  </Button>
                                )}
                                <Button size="icon" variant="ghost" className="h-8 w-8 rounded-xl text-destructive hover:bg-destructive/10"
                                  onClick={async () => { await supabase.from("blog_comments").delete().eq("id", c.id); setComments((prev) => prev.filter((x) => x.id !== c.id)); }}>
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

/* ── Helpers ── */
const RatingPill = ({ value }: { value: number }) => {
  const color = value >= 4 ? "bg-primary/10 text-primary" : value >= 3 ? "bg-primary/10 text-primary" : "bg-primary/10 text-primary";
  return <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-bold ${color}`}>{value}/5</span>;
};

const CommentStatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    approved: "bg-primary/10 text-primary border-primary",
    rejected: "bg-primary/10 text-primary border-primary",
    pending: "bg-primary/10 text-primary border-primary",
  };
  return <Badge variant="outline" className={cn("text-xs", styles[status])}>{status}</Badge>;
};

export default AdminDashboard;
