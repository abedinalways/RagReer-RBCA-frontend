import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/shared/PlaceholderPage";

export const metadata: Metadata = { title: "Appointments" };

export default function CustomerAppointmentsPage() {
  return (
    <PlaceholderPage
      title="Appointments"
      description="Appointment booking & history — implementation lives in features/appointments."
    />
  );
}