import { useEffect, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/hooks/useAdmin";
import { useAdminDonations } from "@/hooks/useAdminDonations";
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
import { ArrowLeft, DollarSign, Users, TrendingUp, PiggyBank, CalendarDays, ExternalLink, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const BookingDiary = lazy(() => import("@/components/BookingDiary"));

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { isAdmin, isLoading: adminLoading } = useAdmin();
  const { donations, stats, isLoading: donationsLoading, error } = useAdminDonations();

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

  const exportGiftAidCSV = () => {
    const giftAidDonations = donations.filter((d) => d.gift_aid);

    if (giftAidDonations.length === 0) {
      alert("No Gift Aid donations to export.");
      return;
    }

    const headers = [
      "Title",
      "First Name",
      "Last Name",
      "House Name or Number",
      "Postcode",
      "Donation Date",
      "Donation Amount",
      "Currency",
    ];

    const rows = giftAidDonations.map((d) => {
      const nameParts = (d.donor_name || "").trim().split(" ");
      const firstName = nameParts.slice(0, -1).join(" ") || nameParts[0] || "";
      const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";
      const donationDate = format(new Date(d.created_at), "dd/MM/yyyy");
      const address = [d.donor_address_line1, d.donor_address_line2, d.donor_city]
        .filter(Boolean)
        .join(", ");

      return [
        "",
        firstName,
        lastName,
        address || (d.donor_location ?? ""),
        d.donor_postcode ?? "",
        donationDate,
        Number(d.amount).toFixed(2),
        d.currency,
      ];
    });

    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `gift-aid-export-${format(new Date(), "yyyy-MM-dd")}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

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
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>All Donations</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={exportGiftAidCSV}
                >
                  <Download className="w-4 h-4" />
                  Export Gift Aid CSV
                </Button>
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
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
