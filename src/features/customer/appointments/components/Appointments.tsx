"use client";
import React, { useState } from "react";
import { Check } from "lucide-react";
import { AppointmentItem } from "../types/appointmentsTypes";
import { mockAppointmentsData } from "../data/appointmentsData";
import AppointmentsCalendar from "./AppointmentsCalendar";
import AppointmentDetailsModal from "./AppointmentDetailsModal";
import AppointmentsEmptyState from "./AppointmentsEmptyState";

interface AppointmentsProps {
  initialAppointments?: AppointmentItem[];
}

export const Appointments: React.FC<AppointmentsProps> = ({
  initialAppointments = mockAppointmentsData,
}) => {
  const [appointments, setAppointments] = useState<AppointmentItem[]>(initialAppointments);
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleSelectAppointment = (appointment: AppointmentItem) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleRequestReschedule = (appointment: AppointmentItem) => {
    setIsModalOpen(false);
    showToast(`Reschedule request sent for ${appointment.title} (${appointment.dateDisplay})!`);
  };

  const handleToggleMockData = () => {
    if (appointments.length === 0) {
      setAppointments(mockAppointmentsData);
      showToast("Loaded scheduled appointments!");
    } else {
      setAppointments([]);
      showToast("Cleared appointments to view Empty State.");
    }
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-primary-dark text-white px-4 py-2.5 rounded-md shadow-lg flex items-center gap-2 text-xs sm:text-sm animate-in fade-in slide-in-from-top-2">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Content Area */}
      {appointments.length === 0 ? (
        <AppointmentsEmptyState />
      ) : (
        <AppointmentsCalendar
          appointments={appointments}
          onSelectAppointment={handleSelectAppointment}
        />
      )}

      {/* Appointment Details Modal */}
      <AppointmentDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        appointment={selectedAppointment}
        onRequestReschedule={handleRequestReschedule}
      />
    </div>
  );
};

export default Appointments;
