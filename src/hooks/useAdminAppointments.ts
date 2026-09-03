import { useState } from "react";
import { toast } from "sonner";

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

export function useAdminAppointments() {
  const [appointments] = useState<Appointment[]>([]);
  const [isLoading] = useState(false);
  const [error] = useState<string | null>(null);
  const fetchAppointments = async () => {};
  const updateStatus = async (_id: string, _status: string) => {
    toast.error("Admin tools are paused until the backend is added back.");
  };
  return { appointments, isLoading, error, refetch: fetchAppointments, updateStatus };
}
