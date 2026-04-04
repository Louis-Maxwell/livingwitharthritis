import { useState, useEffect, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Loader2, Clock, CalendarDays, AlertCircle, CheckCircle2 } from "lucide-react";
import { useAppointment } from "@/hooks/useAppointment";
import { motion, AnimatePresence } from "framer-motion";

interface AppointmentModalProps {
  trigger: React.ReactNode;
}

export function AppointmentModal({ trigger }: AppointmentModalProps) {
  const { bookAppointment, isLoading } = useAppointment();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    appointmentType: "consultation",
    preferredDate: "", preferredTime: "", notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
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
    if (form.preferredDate) fetchSlots(form.preferredDate);
  }, [form.preferredDate, fetchSlots]);

  const today = new Date().toISOString().split("T")[0];

  const isWeekend = (dateStr: string) => {
    if (!dateStr) return false;
    const d = new Date(dateStr + "T00:00:00");
    return d.getDay() === 0 || d.getDay() === 6;
  };

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await bookAppointment(form);
    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        setForm({ name: "", email: "", phone: "", appointmentType: "consultation", preferredDate: "", preferredTime: "", notes: "" });
        setAvailableSlots([]);
        setSuccess(false);
        setStep(1);
        setOpen(false);
      }, 2500);
    }
  };

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: "" });
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) { setStep(1); setErrors({}); setSuccess(false); } }}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto p-0 gap-0 rounded-2xl border-border/50">
        {/* Coloured header */}
        <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-accent px-6 pt-8 pb-6 border-b border-border/30">
          <DialogHeader>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full w-fit mb-3">
              <CalendarDays className="w-3.5 h-3.5" />
              Free Consultation
            </div>
            <DialogTitle className="text-xl font-bold text-foreground">
              Book an Appointment
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              {!success && (step === 1 ? "Step 1 of 2 — Your details" : "Step 2 of 2 — Choose date & time")}
            </DialogDescription>
          </DialogHeader>

          {/* Progress indicator */}
          {!success && (
            <div className="flex gap-2 mt-4">
              <div className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${step >= 1 ? "bg-primary" : "bg-primary/20"}`} />
              <div className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${step >= 2 ? "bg-primary" : "bg-primary/20"}`} />
            </div>
          )}
        </div>

        {/* Content area with subtle tint */}
        <div className="px-6 py-6 bg-primary/[0.02]">
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-10 gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                </div>
                <p className="text-lg font-semibold text-foreground">Appointment Booked!</p>
                <p className="text-sm text-muted-foreground text-center">We'll send a confirmation to {form.email}</p>
              </motion.div>
            ) : step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">Name *</Label>
                    <Input
                      required
                      maxLength={100}
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="Full name"
                      className={errors.name ? "border-destructive" : ""}
                    />
                    {errors.name && <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.name}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">Email *</Label>
                    <Input
                      type="email"
                      required
                      maxLength={255}
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="your@email.com"
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Phone <span className="text-muted-foreground font-normal">(optional)</span></Label>
                  <Input maxLength={20} value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} placeholder="+44..." />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Appointment Type *</Label>
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
                <Button type="button" onClick={handleNext} className="w-full h-12 rounded-xl text-sm font-bold">
                  Continue to Date & Time →
                </Button>
              </motion.div>
            ) : (
              <motion.form
                key="step2"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Preferred Date *</Label>
                  <Input
                    type="date"
                    required
                    min={today}
                    value={form.preferredDate}
                    onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
                  />
                  {form.preferredDate && isWeekend(form.preferredDate) && (
                    <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Weekends are not available.
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5" /> Available Times *
                  </Label>
                  {!form.preferredDate ? (
                    <p className="text-xs text-muted-foreground mt-1">Select a date first</p>
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
                          className="text-xs h-10 rounded-lg transition-all duration-200"
                          onClick={() => setForm({ ...form, preferredTime: slot })}
                        >
                          {slot}
                        </Button>
                      ))}
                    </div>
                  )}
                  {form.preferredTime && (
                    <Badge variant="secondary" className="mt-2">Selected: {form.preferredTime}</Badge>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Notes <span className="text-muted-foreground font-normal">(optional)</span></Label>
                  <Textarea rows={3} maxLength={1000} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Any additional information..." />
                </div>

                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1 h-12 rounded-xl text-sm font-bold">
                    ← Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading || !form.preferredTime || !form.preferredDate || isWeekend(form.preferredDate)}
                    className="flex-[2] h-12 rounded-xl text-sm font-bold"
                  >
                    {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Booking...</> : "Confirm Booking"}
                  </Button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}