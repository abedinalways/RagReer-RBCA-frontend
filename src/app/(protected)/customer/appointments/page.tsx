import type { Metadata } from "next";
import { Appointments } from "@/features/customer/appointments/components/Appointments";

export const metadata: Metadata = { title: "Appointments" };

export default function CustomerAppointmentsPage() {
  return <Appointments />;
}