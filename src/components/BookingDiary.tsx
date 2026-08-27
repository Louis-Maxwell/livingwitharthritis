import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Calendar, Clock, User, Mail, Phone, FileText, Filter } from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth, addMonths, subMonths, isToday, parseISO } from "date-fns";
import { useAdminAppointments } from "@/hooks/useAdminAppointments";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

// Supabase type removed - define Appointment inline
type Appointment = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  appointment_type: string;
  preferred_date: string;
  preferred_time: string;
  notes?: string;
  status: string;
};

const statusColors: Record<string, string> = {
  pending: "bg-primary/15 text-primary border-primary",
  confirmed: "bg-secondary/15 text-secondary border-secondary/30",
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

const AppointmentCard = ({
  apt,
  onStatusChange,
}: {
  apt: Appointment;
  onStatusChange: (id: string, status: string) => void;
}) => (
  <div className="p-4 rounded-xl bg-card border border-border/60 hover:border-primary/20 hover:shadow-sm transition-all space-y-3">
    <div className="flex items-start justify-between gap-2">
      <div className="flex items-center gap-2 min-w-0">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-primary" />
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-foreground text-sm truncate">{apt.name}</p>
          <p className="text-[11px] text-muted-foreground">
            {typeLabels[apt.appointment_type] || apt.appointment_type}
          </p>
        </div>
      </div>
      <Badge variant="outline" className={`text-[10px] px-2 py-0.5 flex-shrink-0 ${statusColors[apt.status] || ""}`}>
        {apt.status}
      </Badge>
    </div>

    <div className="space-y-1.5 text-xs text-muted-foreground">
      <div className="flex items-center gap-2">
        <Clock className="w-3 h-3 flex-shrink-0" />
        <span>{apt.preferred_time} · {format(parseISO(apt.preferred_date), "EEE, d MMM yyyy")}</span>
      </div>
      <div className="flex items-center gap-2">
        <Mail className="w-3 h-3 flex-shrink-0" />
        <span className="truncate">{apt.email}</span>
      </div>
      {apt.phone && (
        <div className="flex items-center gap-2">
          <Phone className="w-3 h-3 flex-shrink-0" />
          <span>{apt.phone}</span>
        </div>
      )}
      {apt.notes && (
        <div className="flex items-start gap-2">
          <FileText className="w-3 h-3 flex-shrink-0 mt-0.5" />
          <span className="line-clamp-2">{apt.notes}</span>
        </div>
      )}
    </div>

    {apt.status === "pending" && (
      <div className="flex gap-2 pt-1">
        <Button
          size="sm"
          variant="outline"
          className="flex-1 h-7 text-xs text-secondary border-secondary/30 hover:bg-secondary/10"
          onClick={() => onStatusChange(apt.id, "confirmed")}
        >
          Confirm
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="flex-1 h-7 text-xs text-destructive border-destructive/30 hover:bg-destructive/10"
          onClick={() => onStatusChange(apt.id, "cancelled")}
        >
          Cancel
        </Button>
      </div>
    )}
    {apt.status === "confirmed" && (
      <Button
        size="sm"
        variant="outline"
        className="w-full h-7 text-xs text-primary border-primary/30 hover:bg-primary/10"
        onClick={() => onStatusChange(apt.id, "completed")}
      >
        Mark Completed
      </Button>
    )}
  </div>
);

export default function BookingDiary() {
  const { appointments, isLoading, error, updateStatus } = useAdminAppointments();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const days = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  const appointmentsByDate = useMemo(() => {
    const map = new Map<string, Appointment[]>();
    appointments.forEach((apt) => {
      const key = apt.preferred_date;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(apt);
    });
    return map;
  }, [appointments]);

  const selectedAppointments = useMemo(() => {
    if (!selectedDate) return [];
    const key = format(selectedDate, "yyyy-MM-dd");
    const list = appointmentsByDate.get(key) || [];
    if (statusFilter === "all") return list;
    return list.filter((a) => a.status === statusFilter);
  }, [selectedDate, appointmentsByDate, statusFilter]);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateStatus(id, status);
      toast.success(`Appointment ${status}`);
    } catch {
      toast.error("Failed to update status");
    }
  };

  // Pad the start of the calendar grid to align with day-of-week
  const startDay = days[0].getDay(); // 0=Sun
  const paddedStart = Array.from({ length: startDay }, (_, i) => i);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-[400px] w-full rounded-2xl" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-destructive">
        <CardContent className="pt-6">
          <p className="text-destructive">{error}</p>
        </CardContent>
      </Card>
    );
  }

  const totalBookings = appointments.length;
  const pendingCount = appointments.filter((a) => a.status === "pending").length;
  const todayCount = appointments.filter((a) => a.preferred_date === format(new Date(), "yyyy-MM-dd")).length;

  return (
    <div className="space-y-6">
      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-5 pb-4 text-center">
            <p className="text-2xl font-bold text-foreground">{totalBookings}</p>
            <p className="text-xs text-muted-foreground">Total Bookings</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 pb-4 text-center">
            <p className="text-2xl font-bold text-primary">{pendingCount}</p>
            <p className="text-xs text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 pb-4 text-center">
            <p className="text-2xl font-bold text-primary">{todayCount}</p>
            <p className="text-xs text-muted-foreground">Today</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-6">
        {/* Calendar grid */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="w-5 h-5 text-primary" />
              {format(currentMonth, "MMMM yyyy")}
            </CardTitle>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Previous month" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={() => { setCurrentMonth(new Date()); setSelectedDate(new Date()); }}>
                Today
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Next month" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <div key={d} className="text-center text-[11px] font-medium text-muted-foreground py-1">
                  {d}
                </div>
              ))}
            </div>

            {/* Date cells */}
            <div className="grid grid-cols-7 gap-1">
              {paddedStart.map((i) => (
                <div key={`pad-${i}`} />
              ))}
              {days.map((day) => {
                const key = format(day, "yyyy-MM-dd");
                const dayAppts = appointmentsByDate.get(key) || [];
                const isSelected = selectedDate && isSameDay(day, selectedDate);
                const hasAppts = dayAppts.length > 0;
                const hasPending = dayAppts.some((a) => a.status === "pending");

                return (
                  <button
                    key={key}
                    onClick={() => setSelectedDate(day)}
                    className={`relative p-2 rounded-lg text-sm font-medium transition-all duration-200 min-h-[48px] flex flex-col items-center justify-center gap-0.5
                      ${isSelected ? "bg-primary text-primary-foreground shadow-sm" : "hover:bg-accent"}
                      ${isToday(day) && !isSelected ? "ring-1 ring-primary/40" : ""}
                      ${!isSameMonth(day, currentMonth) ? "text-muted-foreground/40" : "text-foreground"}
                    `}
                  >
                    <span>{format(day, "d")}</span>
                    {hasAppts && (
                      <div className="flex gap-0.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? "bg-primary-foreground" : hasPending ? "bg-primary" : "bg-secondary"}`} />
                        {dayAppts.length > 1 && (
                          <span className={`text-[9px] ${isSelected ? "text-primary-foreground" : "text-muted-foreground"}`}>
                            {dayAppts.length}
                          </span>
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Day detail panel */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">
              {selectedDate ? format(selectedDate, "EEEE, d MMMM") : "Select a date"}
            </h3>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32 h-8 text-xs">
                <Filter className="w-3 h-3 mr-1" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {selectedAppointments.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Calendar className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm">No bookings for this date</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {selectedAppointments.map((apt) => (
                <AppointmentCard key={apt.id} apt={apt} onStatusChange={handleStatusChange} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
