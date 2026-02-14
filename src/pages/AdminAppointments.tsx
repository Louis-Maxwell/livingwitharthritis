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
  ArrowLeft, CalendarDays, Clock, Mail, Phone, Search, Send, Loader2, Shield, Users, AlertTriangle,
} from "lucide-react";
import { format, parseISO } from "date-fns";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type Appointment = Tables<"appointments">;

const statusColors: Record<string, string> = {
  pending: "bg-amber-500/15 text-amber-700 border-amber-200",
  confirmed: "bg-emerald-500/15 text-emerald-700 border-emerald-200",
  cancelled: "bg-destructive/15 text-destructive border-destructive/30",
  completed: "bg-primary/15 text-primary border-primary/30",
};

const typeLabels: Record<string, string> = {
  consultation: "Consultation",
  physiotherapy: "Physiotherapy",
  "follow-up": "Follow-up",
  assessment: "Assessment",
  treatment: "Treatment",
};

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
    if (!adminLoading && !isAdmin) {
      navigate("/");
    }
  }, [isAdmin, adminLoading, navigate]);

  if (adminLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
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
      if (!session) {
        toast.error("You must be logged in");
        return;
      }

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
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/admin")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Patient Appointments</h1>
            <p className="text-muted-foreground text-sm">View and manage all appointment requests</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-5 pb-4 text-center">
              <Users className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
              <p className="text-2xl font-bold">{appointments.length}</p>
              <p className="text-xs text-muted-foreground">Total</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5 pb-4 text-center">
              <AlertTriangle className="w-5 h-5 mx-auto mb-1 text-amber-500" />
              <p className="text-2xl font-bold text-amber-600">{pendingCount}</p>
              <p className="text-xs text-muted-foreground">Pending</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5 pb-4 text-center">
              <Shield className="w-5 h-5 mx-auto mb-1 text-emerald-500" />
              <p className="text-2xl font-bold text-emerald-600">{confirmedCount}</p>
              <p className="text-xs text-muted-foreground">Confirmed</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5 pb-4 text-center">
              <CalendarDays className="w-5 h-5 mx-auto mb-1 text-primary" />
              <p className="text-2xl font-bold text-primary">{todayCount}</p>
              <p className="text-xs text-muted-foreground">Today</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40">
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
          <Card className="border-destructive">
            <CardContent className="pt-6"><p className="text-destructive">{error}</p></CardContent>
          </Card>
        ) : filtered.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              <CalendarDays className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No appointments found</p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Appointments ({filtered.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
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
                      <TableRow key={apt.id}>
                        <TableCell className="font-medium">{apt.name}</TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Mail className="w-3 h-3" /> {apt.email}
                            </span>
                            {apt.phone && (
                              <span className="flex items-center gap-1">
                                <Phone className="w-3 h-3" /> {apt.phone}
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {typeLabels[apt.appointment_type] || apt.appointment_type}
                          </Badge>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          <div className="flex items-center gap-1 text-sm">
                            <CalendarDays className="w-3.5 h-3.5 text-muted-foreground" />
                            {format(parseISO(apt.preferred_date), "d MMM yyyy")}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                            <Clock className="w-3 h-3" /> {apt.preferred_time}
                          </div>
                        </TableCell>
                        <TableCell className="max-w-[200px]">
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {apt.notes || "—"}
                          </p>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={statusColors[apt.status] || ""}>
                            {apt.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 text-xs gap-1"
                              onClick={() => openContactForm(apt)}
                            >
                              <Send className="w-3 h-3" /> Contact
                            </Button>
                            {apt.status === "pending" && (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 text-xs text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                                  onClick={() => handleStatusChange(apt.id, "confirmed")}
                                >
                                  Confirm
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 text-xs text-destructive border-destructive/30 hover:bg-destructive/10"
                                  onClick={() => handleStatusChange(apt.id, "cancelled")}
                                >
                                  Cancel
                                </Button>
                              </>
                            )}
                            {apt.status === "confirmed" && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 text-xs text-primary border-primary/30 hover:bg-primary/10"
                                onClick={() => handleStatusChange(apt.id, "completed")}
                              >
                                Complete
                              </Button>
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
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary" />
                Contact {selectedPatient?.name}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="rounded-lg bg-muted/50 p-3 text-sm space-y-1">
                <p><span className="font-medium">To:</span> {selectedPatient?.email}</p>
                <p><span className="font-medium">Appointment:</span> {selectedPatient && (typeLabels[selectedPatient.appointment_type] || selectedPatient.appointment_type)}</p>
                <p><span className="font-medium">Date:</span> {selectedPatient && format(parseISO(selectedPatient.preferred_date), "d MMMM yyyy")} at {selectedPatient?.preferred_time}</p>
              </div>
              <div>
                <Label>Subject *</Label>
                <Input
                  value={emailForm.subject}
                  onChange={(e) => setEmailForm({ ...emailForm, subject: e.target.value })}
                  maxLength={200}
                />
              </div>
              <div>
                <Label>Message *</Label>
                <Textarea
                  rows={6}
                  value={emailForm.message}
                  onChange={(e) => setEmailForm({ ...emailForm, message: e.target.value })}
                  placeholder="Write your message to the patient..."
                  maxLength={5000}
                />
                <p className="text-xs text-muted-foreground mt-1">{emailForm.message.length}/5000</p>
              </div>
              <Button onClick={handleSendEmail} disabled={isSending} className="w-full">
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
