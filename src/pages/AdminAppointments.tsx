import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/hooks/useAdmin";
import { useAdminAppointments } from "@/hooks/useAdminAppointments";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  ArrowLeft, CalendarDays, Clock, Mail, Phone, Search, Send, Loader2, Shield, Users, AlertTriangle, Activity, CheckCircle2,
} from "lucide-react";
import { format, parseISO } from "date-fns";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import type { Tables } from "@/integrations/supabase/types";

type Appointment = Tables<"appointments">;

const statusColors: Record<string, string> = {
  pending: "bg-amber-500/10 text-amber-700 border-amber-200",
  confirmed: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
  cancelled: "bg-red-500/10 text-red-700 border-red-200",
  completed: "bg-blue-500/10 text-blue-700 border-blue-200",
};

const typeLabels: Record<string, string> = {
  consultation: "Consultation",
  physiotherapy: "Physiotherapy",
  "follow-up": "Follow-up",
  assessment: "Assessment",
  treatment: "Treatment",
};

const GradientStatCard = ({
  icon: Icon,
  label,
  value,
  gradient,
  iconColor,
}: {
  icon: any;
  label: string;
  value: string | number;
  gradient: string;
  iconColor: string;
}) => (
  <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
    <div className={`absolute inset-0 opacity-[0.07] ${gradient}`} />
    <CardContent className="pt-6 pb-5 relative text-center">
      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center mx-auto mb-3 ${gradient} shadow-md`}>
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </div>
      <p className="text-2xl font-extrabold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
    </CardContent>
  </Card>
);

const AdminAppointments = () => {
  const navigate = useNavigate();
  const { isAdmin, isLoading: adminLoading } = useAdmin();
  const { appointments, isLoading, error, refetch, updateStatus } = useAdminAppointments();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [contactOpen, setContactOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Appointment | null>(null);
  const [emailForm, setEmailForm] = useState({ subject: "", message: "" });
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (!adminLoading && !isAdmin) navigate("/auth");
  }, [isAdmin, adminLoading, navigate]);

  if (adminLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/[0.03]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent" />
          </div>
          <p className="text-sm text-muted-foreground font-medium animate-pulse">Loading appointments...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) return null;

  const filtered = appointments.filter((apt) => {
    const matchesSearch =
      apt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (apt.phone && apt.phone.includes(searchTerm));
    const matchesStatus = statusFilter === "all" || apt.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const pendingCount = appointments.filter((a) => a.status === "pending").length;
  const confirmedCount = appointments.filter((a) => a.status === "confirmed").length;
  const todayStr = format(new Date(), "yyyy-MM-dd");
  const todayCount = appointments.filter((a) => a.preferred_date === todayStr).length;

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateStatus(id, status);
      toast.success(`Appointment ${status}`);
    } catch {
      toast.error("Failed to update status");
    }
  };

  const openContactForm = (apt: Appointment) => {
    setSelectedPatient(apt);
    setEmailForm({
      subject: `Regarding your ${typeLabels[apt.appointment_type] || apt.appointment_type} appointment`,
      message: "",
    });
    setContactOpen(true);
  };

  const handleSendEmail = async () => {
    if (!selectedPatient || !emailForm.subject.trim() || !emailForm.message.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    setIsSending(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { toast.error("You must be logged in"); return; }
      const response = await supabase.functions.invoke("send-patient-email", {
        body: {
          to: selectedPatient.email,
          subject: emailForm.subject.trim(),
          message: emailForm.message.trim(),
          patientName: selectedPatient.name,
        },
      });
      if (response.error) throw response.error;
      toast.success(`Email sent to ${selectedPatient.name}`);
      setContactOpen(false);
      setEmailForm({ subject: "", message: "" });
    } catch (err) {
      console.error("Send email error:", err);
      toast.error("Failed to send email. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/[0.03]">
      {/* Top bar */}
      <div className="border-b border-border/40 bg-background/80 backdrop-blur-xl sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/admin")} className="rounded-xl">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-md">
              <CalendarDays className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground leading-tight">Patient Appointments</h1>
              <p className="text-xs text-muted-foreground">View and manage all requests</p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-500/10 px-3 py-1.5 rounded-full font-medium">
              <Activity className="w-3 h-3" />
              Live
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          <GradientStatCard icon={Users} label="Total" value={appointments.length} gradient="bg-gradient-to-br from-blue-400 to-indigo-500" iconColor="text-white" />
          <GradientStatCard icon={AlertTriangle} label="Pending" value={pendingCount} gradient="bg-gradient-to-br from-amber-400 to-orange-500" iconColor="text-white" />
          <GradientStatCard icon={CheckCircle2} label="Confirmed" value={confirmedCount} gradient="bg-gradient-to-br from-emerald-400 to-teal-500" iconColor="text-white" />
          <GradientStatCard icon={CalendarDays} label="Today" value={todayCount} gradient="bg-gradient-to-br from-violet-400 to-purple-500" iconColor="text-white" />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-xl border-border/50"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-44 rounded-xl border-border/50">
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        {error ? (
          <Card className="border-destructive/50 bg-destructive/5">
            <CardContent className="pt-6"><p className="text-destructive font-medium">{error}</p></CardContent>
          </Card>
        ) : filtered.length === 0 ? (
          <Card className="border-border/30 shadow-sm">
            <CardContent className="py-16 text-center">
              <CalendarDays className="w-14 h-14 mx-auto mb-3 text-muted-foreground/20" />
              <p className="text-muted-foreground font-medium">No appointments found</p>
              <p className="text-xs text-muted-foreground mt-1">Try adjusting your search or filters</p>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-border/30 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-primary" />
                Appointments ({filtered.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border/30">
                      <TableHead>Patient</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Notes</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((apt) => (
                      <TableRow key={apt.id} className="border-border/20 hover:bg-muted/30">
                        <TableCell className="font-semibold">{apt.name}</TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {apt.email}</span>
                            {apt.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {apt.phone}</span>}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 text-xs">
                            {typeLabels[apt.appointment_type] || apt.appointment_type}
                          </Badge>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          <div className="flex items-center gap-1.5 text-sm font-medium">
                            <CalendarDays className="w-3.5 h-3.5 text-muted-foreground" />
                            {format(parseISO(apt.preferred_date), "d MMM yyyy")}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                            <Clock className="w-3 h-3" /> {apt.preferred_time}
                          </div>
                        </TableCell>
                        <TableCell className="max-w-[200px]">
                          <p className="text-xs text-muted-foreground line-clamp-2">{apt.notes || "—"}</p>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={cn("text-xs", statusColors[apt.status] || "")}>
                            {apt.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <Button size="sm" variant="outline" className="h-8 text-xs gap-1 rounded-lg" onClick={() => openContactForm(apt)}>
                              <Send className="w-3 h-3" /> Contact
                            </Button>
                            {apt.status === "pending" && (
                              <>
                                <Button size="sm" variant="outline" className="h-8 text-xs rounded-lg text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                                  onClick={() => handleStatusChange(apt.id, "confirmed")}>Confirm</Button>
                                <Button size="sm" variant="outline" className="h-8 text-xs rounded-lg text-destructive border-destructive/30 hover:bg-destructive/10"
                                  onClick={() => handleStatusChange(apt.id, "cancelled")}>Cancel</Button>
                              </>
                            )}
                            {apt.status === "confirmed" && (
                              <Button size="sm" variant="outline" className="h-8 text-xs rounded-lg text-blue-600 border-blue-200 hover:bg-blue-50"
                                onClick={() => handleStatusChange(apt.id, "completed")}>Complete</Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Contact Patient Dialog */}
        <Dialog open={contactOpen} onOpenChange={setContactOpen}>
          <DialogContent className="sm:max-w-lg rounded-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-primary-foreground" />
                </div>
                Contact {selectedPatient?.name}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="rounded-xl bg-gradient-to-r from-muted/50 to-muted/30 p-4 text-sm space-y-1.5 border border-border/30">
                <p><span className="font-semibold">To:</span> {selectedPatient?.email}</p>
                <p><span className="font-semibold">Appointment:</span> {selectedPatient && (typeLabels[selectedPatient.appointment_type] || selectedPatient.appointment_type)}</p>
                <p><span className="font-semibold">Date:</span> {selectedPatient && format(parseISO(selectedPatient.preferred_date), "d MMMM yyyy")} at {selectedPatient?.preferred_time}</p>
              </div>
              <div>
                <Label className="text-sm font-semibold">Subject *</Label>
                <Input value={emailForm.subject} onChange={(e) => setEmailForm({ ...emailForm, subject: e.target.value })} maxLength={200} className="rounded-xl mt-1.5" />
              </div>
              <div>
                <Label className="text-sm font-semibold">Message *</Label>
                <Textarea rows={6} value={emailForm.message} onChange={(e) => setEmailForm({ ...emailForm, message: e.target.value })}
                  placeholder="Write your message to the patient..." maxLength={5000} className="rounded-xl mt-1.5" />
                <p className="text-xs text-muted-foreground mt-1">{emailForm.message.length}/5000</p>
              </div>
              <Button onClick={handleSendEmail} disabled={isSending} className="w-full rounded-xl h-11 bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 shadow-md">
                {isSending ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Sending...</>
                ) : (
                  <><Send className="mr-2 h-4 w-4" />Send Email</>
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminAppointments;
