import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Send, CheckCircle2, AlertCircle, Mail } from "lucide-react";
import { useContact } from "@/hooks/useContact";
import { motion, AnimatePresence } from "framer-motion";

interface ContactFormModalProps {
  trigger: React.ReactNode;
}

export function ContactFormModal({ trigger }: ContactFormModalProps) {
  const { submitContact, isLoading } = useContact();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email address";
    if (!form.subject.trim()) errs.subject = "Subject is required";
    if (!form.message.trim()) errs.message = "Message is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const result = await submitContact(form);
    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        setForm({ name: "", email: "", phone: "", subject: "", message: "" });
        setSuccess(false);
        setOpen(false);
      }, 2000);
    }
  };

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: "" });
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) { setErrors({}); setSuccess(false); } }}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md p-0 gap-0 rounded-2xl border-border/50 overflow-hidden">
        {/* Coloured header */}
        <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-accent px-6 pt-8 pb-6 border-b border-border/30">
          <DialogHeader>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full w-fit mb-3">
              <Mail className="w-3.5 h-3.5" />
              Get in Touch
            </div>
            <DialogTitle className="text-xl font-bold text-foreground">Contact Us</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              We'd love to hear from you. Fill in the form below and we'll get back to you.
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Content area with subtle tint */}
        <div className="px-6 py-6 bg-primary/[0.02]">
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center justify-center py-10 gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                </div>
                <p className="text-lg font-semibold text-foreground">Message Sent!</p>
                <p className="text-sm text-muted-foreground">We'll get back to you soon.</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
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
                      placeholder="Your name"
                      className={errors.name ? "border-destructive focus-visible:ring-destructive" : ""}
                    />
                    {errors.name && (
                      <p className="text-xs text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />{errors.name}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">Email *</Label>
                    <Input
                      type="email"
                      required
                      maxLength={255}
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="you@email.com"
                      className={errors.email ? "border-destructive focus-visible:ring-destructive" : ""}
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />{errors.email}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Phone <span className="text-muted-foreground font-normal">(optional)</span></Label>
                  <Input maxLength={20} value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} placeholder="+44..." />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Subject *</Label>
                  <Input
                    required
                    maxLength={200}
                    value={form.subject}
                    onChange={(e) => handleChange("subject", e.target.value)}
                    placeholder="What's this about?"
                    className={errors.subject ? "border-destructive focus-visible:ring-destructive" : ""}
                  />
                  {errors.subject && (
                    <p className="text-xs text-destructive flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />{errors.subject}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Message *</Label>
                  <Textarea
                    required
                    rows={4}
                    maxLength={1000}
                    value={form.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    placeholder="Tell us more..."
                    className={errors.message ? "border-destructive focus-visible:ring-destructive" : ""}
                  />
                  <div className="flex justify-between">
                    {errors.message ? (
                      <p className="text-xs text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />{errors.message}
                      </p>
                    ) : <span />}
                    <span className="text-xs text-muted-foreground">{form.message.length}/1000</span>
                  </div>
                </div>
                <Button type="submit" disabled={isLoading} className="w-full h-12 rounded-xl text-sm font-bold gap-2">
                  {isLoading ? (
                    <><Loader2 className="h-4 w-4 animate-spin" />Sending...</>
                  ) : (
                    <><Send className="h-4 w-4" />Send Message</>
                  )}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}