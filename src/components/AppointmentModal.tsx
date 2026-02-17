import { useState, useEffect, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Loader2, Clock, CalendarDays, AlertCircle } from "lucide-react";
import { useAppointment } from "@/hooks/useAppointment";
import { supabase } from "@/integrations/supabase/client";

interface AppointmentModalProps {
  trigger: React.ReactNode;
}

export function AppointmentModal({ trigger }: AppointmentModalProps) {
  const { bookAppointment, isLoading } = useAppointment();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    appointmentType: "consultation",
    preferredDate: "", preferredTime: "", notes: "",
  });
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState("");

  const fetchSlots = useCallback(async (date: string) => {
    if (!date) return;
    setSlotsLoading(true);
    setSlotsError("");
    setAvailableSlots([]);
    setForm((prev) => ({ ...prev, preferredTime: "" }));

    try {
      const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
      const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

      const res = await fetch(
        `https://${projectId}.supabase.co/functions/v1/book-appointment?date=${date}`,
        {
          method: "GET",
          headers: {
            "apikey": anonKey,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        const err = await res.json();
        setSlotsError(err.message || "Failed to load available times");
        return;
      }

      const result = await res.json();
      setAvailableSlots(result.availableSlots || []);
      if (result.availableSlots?.length === 0) {
        setSlotsError(result.message || "No available slots for this date");
      }
    } catch {
      setSlotsError("Failed to check availability");
    } finally {
      setSlotsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (form.preferredDate) {
      fetchSlots(form.preferredDate);
    }
  }, [form.preferredDate, fetchSlots]);

  // Get min date (today)
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await bookAppointment(form);
    if (result.success) {
      setForm({ name: "", email: "", phone: "", appointmentType: "consultation", preferredDate: "", preferredTime: "", notes: "" });
      setAvailableSlots([]);
      setOpen(false);
    }
  };

  // Check if selected date is weekend
  const isWeekend = (dateStr: string) => {
    if (!dateStr) return false;
    const d = new Date(dateStr + "T00:00:00");
    const day = d.getDay();
    return day === 0 || day === 6;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-primary" />
            Book an Appointment
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Name *</Label>
              <Input required maxLength={100} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" />
            </div>
            <div>
              <Label>Email *</Label>
              <Input type="email" required maxLength={255} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" />
            </div>
          </div>

          <div>
            <Label>Phone</Label>
            <Input maxLength={20} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Optional" />
          </div>

          <div>
            <Label>Appointment Type *</Label>
            <Select value={form.appointmentType} onValueChange={(v) => setForm({ ...form, appointmentType: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="consultation">Consultation</SelectItem>
                <SelectItem value="physiotherapy">Physiotherapy</SelectItem>
                <SelectItem value="follow-up">Follow-up</SelectItem>
                <SelectItem value="assessment">Assessment</SelectItem>
                <SelectItem value="treatment">Treatment</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Preferred Date *</Label>
            <Input
              type="date"
              required
              min={today}
              value={form.preferredDate}
              onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
            />
            {form.preferredDate && isWeekend(form.preferredDate) && (
              <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> Weekends are not available. Please select a weekday.
              </p>
            )}
          </div>

          <div>
            <Label className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" /> Available Time Slots *
            </Label>
            {!form.preferredDate ? (
              <p className="text-xs text-muted-foreground mt-1">Select a date first to see available times</p>
            ) : slotsLoading ? (
              <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" /> Checking availability...
              </div>
            ) : slotsError ? (
              <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {slotsError}
              </p>
            ) : (
              <div className="grid grid-cols-4 gap-2 mt-2">
                {availableSlots.map((slot) => (
                  <Button
                    key={slot}
                    type="button"
                    variant={form.preferredTime === slot ? "default" : "outline"}
                    size="sm"
                    className="text-xs h-9"
                    onClick={() => setForm({ ...form, preferredTime: slot })}
                  >
                    {slot}
                  </Button>
                ))}
              </div>
            )}
            {form.preferredTime && (
              <Badge variant="secondary" className="mt-2">
                Selected: {form.preferredTime}
              </Badge>
            )}
          </div>

          <div>
            <Label>Notes</Label>
            <Textarea rows={3} maxLength={1000} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Any additional information..." />
          </div>

          <Button
            type="submit"
            disabled={isLoading || !form.preferredTime || !form.preferredDate || isWeekend(form.preferredDate)}
            className="w-full"
          >
            {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Booking...</> : "Book Appointment"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
