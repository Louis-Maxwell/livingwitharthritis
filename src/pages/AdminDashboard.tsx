import { useEffect, useState, useMemo, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/hooks/useAdmin";
import { useAdminDonations } from "@/hooks/useAdminDonations";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, DollarSign, Users, TrendingUp, PiggyBank, CalendarDays, ExternalLink, MessageSquare, Download, CalendarIcon, FileText, Check, X, Trash2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { startOfDay, endOfDay, isWithinInterval } from "date-fns";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const BookingDiary = lazy(() => import("@/components/BookingDiary"));

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
  }, [isAdmin]);

  useEffect(() => {
    if (!adminLoading && !isAdmin) {
      navigate("/");
    }
  }, [isAdmin, adminLoading, navigate]);

  if (adminLoading || donationsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  const getCurrencySymbol = (currency: string) => {
    switch (currency) {
      case "GBP": return "£";
      case "EUR": return "€";
      default: return "$";
    }
  };

  const getFundLabel = (fund: string) => {
    const labels: Record<string, string> = {
      research: "Research",
      support: "Patient Support",
      helpline: "Helpline Services",
      general: "General Fund",
    };
    return labels[fund] || fund;
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

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage donations and patient bookings</p>
          </div>
        </div>

        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="bookings" className="gap-2">
              <CalendarDays className="w-4 h-4" />
              Booking Diary
            </TabsTrigger>
            <TabsTrigger value="donations" className="gap-2">
              <DollarSign className="w-4 h-4" />
              Donations
            </TabsTrigger>
            <TabsTrigger value="feedback" className="gap-2">
              <MessageSquare className="w-4 h-4" />
              Feedback
            </TabsTrigger>
            <TabsTrigger value="comments" className="gap-2">
              <FileText className="w-4 h-4" />
              Comments
              {comments.filter((c) => c.status === "pending").length > 0 && (
                <Badge variant="destructive" className="ml-1 text-[10px] px-1.5 py-0">
                  {comments.filter((c) => c.status === "pending").length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Booking Diary Tab */}
          <TabsContent value="bookings">
            <div className="mb-4">
              <Link to="/admin/appointments">
                <Button variant="outline" className="gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Open Full Appointments Manager
                </Button>
              </Link>
            </div>
            <Suspense fallback={<div className="animate-pulse h-[400px] bg-muted rounded-2xl" />}>
              <BookingDiary />
            </Suspense>
          </TabsContent>

          {/* Donations Tab */}
          <TabsContent value="donations" className="space-y-6">
            {error && (
              <Card className="border-destructive">
                <CardContent className="pt-6">
                  <p className="text-destructive">{error}</p>
                </CardContent>
              </Card>
            )}

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Raised</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">£{stats.totalAmount.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">From all donations</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalCount}</div>
                  <p className="text-xs text-muted-foreground">Completed donations</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Donation</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">£{stats.averageAmount.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">Per donation</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Fund Types</CardTitle>
                  <PiggyBank className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{Object.keys(stats.byFundType).length}</div>
                  <p className="text-xs text-muted-foreground">Active fund categories</p>
                </CardContent>
              </Card>
            </div>

            {/* Fund Breakdown */}
            {Object.keys(stats.byFundType).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Donations by Fund</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {Object.entries(stats.byFundType).map(([fund, data]) => (
                      <div key={fund} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                        <div>
                          <p className="font-medium">{getFundLabel(fund)}</p>
                          <p className="text-sm text-muted-foreground">{data.count} donations</p>
                        </div>
                        <p className="text-lg font-bold">£{data.amount.toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Donations Table */}
            <Card>
              <CardHeader>
                <CardTitle>All Donations</CardTitle>
              </CardHeader>
              <CardContent>
                {donations.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No donations yet</p>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
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
                          <TableRow key={donation.id}>
                            <TableCell className="whitespace-nowrap">
                              {format(new Date(donation.created_at), "MMM d, yyyy")}
                            </TableCell>
                            <TableCell>{donation.donor_name || "Anonymous"}</TableCell>
                            <TableCell className="text-muted-foreground">
                              {donation.donor_email || "-"}
                            </TableCell>
                            <TableCell>
                              {donation.donor_location || donation.donor_country || "-"}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{getFundLabel(donation.fund_type)}</Badge>
                            </TableCell>
                            <TableCell className="text-right font-medium">
                              {getCurrencySymbol(donation.currency)}
                              {Number(donation.amount).toLocaleString()}
                            </TableCell>
                            <TableCell>
                              <Badge variant="default" className="bg-secondary/20 text-secondary">
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

          {/* Feedback Tab */}
          <TabsContent value="feedback" className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-foreground">User Feedback</h2>
                <p className="text-sm text-muted-foreground">
                  {filteredFeedback.length} of {feedback.length} responses
                  {(dateFrom || dateTo) && " (filtered)"}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("w-[160px] justify-start text-left font-normal", !dateFrom && "text-muted-foreground")}>
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
                    <Button variant="outline" className={cn("w-[160px] justify-start text-left font-normal", !dateTo && "text-muted-foreground")}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateTo ? format(dateTo, "MMM d, yyyy") : "To"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={dateTo} onSelect={setDateTo} initialFocus className={cn("p-3 pointer-events-auto")} />
                  </PopoverContent>
                </Popover>
                {(dateFrom || dateTo) && (
                  <Button variant="ghost" size="sm" onClick={() => { setDateFrom(undefined); setDateTo(undefined); }}>
                    Clear
                  </Button>
                )}
                <Button variant="outline" className="gap-2" onClick={exportFeedbackCsv} disabled={filteredFeedback.length === 0}>
                  <Download className="w-4 h-4" />
                  Export CSV
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Responses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{filteredFeedback.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Avg Navigation Rating</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{avgNav} / 5</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Avg Speed Rating</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{avgSpeed} / 5</div>
                </CardContent>
              </Card>
            </div>

            {/* Rating Distribution Chart */}
            {filteredFeedback.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Ratings Over Time</CardTitle>
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
                          return Object.values(grouped)
                            .map((g) => ({
                              date: g.date,
                              Navigation: +(g.navigation / g.count).toFixed(1),
                              Speed: +(g.speed / g.count).toFixed(1),
                            }));
                        })()}
                        margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="date" className="text-xs fill-muted-foreground" />
                        <YAxis domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} className="text-xs fill-muted-foreground" />
                        <Tooltip
                          contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }}
                          labelStyle={{ color: "hsl(var(--foreground))" }}
                        />
                        <Legend />
                        <Bar dataKey="Navigation" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="Speed" fill="hsl(var(--accent-foreground))" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>All Responses</CardTitle>
              </CardHeader>
              <CardContent>
                {feedbackLoading ? (
                  <p className="text-center text-muted-foreground py-8">Loading…</p>
                ) : filteredFeedback.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No feedback found for this period</p>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead className="text-center">Navigation</TableHead>
                          <TableHead className="text-center">Speed</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredFeedback.map((f) => (
                          <TableRow key={f.id}>
                            <TableCell className="whitespace-nowrap">
                              {format(new Date(f.created_at), "MMM d, yyyy HH:mm")}
                            </TableCell>
                            <TableCell className="text-center font-medium">{f.navigation_rating}</TableCell>
                            <TableCell className="text-center font-medium">{f.speed_rating}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Comments Moderation Tab */}
          <TabsContent value="comments" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Blog Comment Moderation</h2>
              <p className="text-sm text-muted-foreground">{comments.length} total comments</p>
            </div>

            <Card>
              <CardContent className="pt-6">
                {commentsLoading ? (
                  <p className="text-center text-muted-foreground py-8">Loading…</p>
                ) : comments.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No comments yet</p>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
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
                          <TableRow key={c.id}>
                            <TableCell className="whitespace-nowrap text-sm">
                              {format(new Date(c.created_at), "MMM d, yyyy")}
                            </TableCell>
                            <TableCell className="max-w-[140px] truncate text-sm">{c.slug.replace(/-/g, " ")}</TableCell>
                            <TableCell className="font-medium text-sm">{c.author_name}</TableCell>
                            <TableCell className="max-w-[250px] truncate text-sm">{c.content}</TableCell>
                            <TableCell>
                              <Badge variant={c.status === "approved" ? "default" : c.status === "rejected" ? "destructive" : "outline"}>
                                {c.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-1">
                                {c.status !== "approved" && (
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-7 w-7 text-green-600"
                                    onClick={async () => {
                                      await supabase.from("blog_comments").update({ status: "approved" }).eq("id", c.id);
                                      setComments((prev) => prev.map((x) => x.id === c.id ? { ...x, status: "approved" } : x));
                                    }}
                                  >
                                    <Check className="w-4 h-4" />
                                  </Button>
                                )}
                                {c.status !== "rejected" && (
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-7 w-7 text-orange-500"
                                    onClick={async () => {
                                      await supabase.from("blog_comments").update({ status: "rejected" }).eq("id", c.id);
                                      setComments((prev) => prev.map((x) => x.id === c.id ? { ...x, status: "rejected" } : x));
                                    }}
                                  >
                                    <X className="w-4 h-4" />
                                  </Button>
                                )}
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-7 w-7 text-destructive"
                                  onClick={async () => {
                                    await supabase.from("blog_comments").delete().eq("id", c.id);
                                    setComments((prev) => prev.filter((x) => x.id !== c.id));
                                  }}
                                >
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

export default AdminDashboard;
