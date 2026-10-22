"use client";
import React, { useState } from "react";
import { Check } from "lucide-react";
import { AdminAppointmentItem } from "../types/adminSchedule.types";
import { mockAdminAppointments } from "../data/adminScheduleData";
import AdminScheduleCalendar from "./AdminScheduleCalendar";
import AdminScheduleEmptyState from "./AdminScheduleEmptyState";
import AdminAppointmentDetailModal from "./AdminAppointmentDetailModal";
import AdminRescheduleModal from "./AdminRescheduleModal";
import AdminCancelModal from "./AdminCancelModal";

interface AdminScheduleViewProps {
  initialAppointments?: AdminAppointmentItem[];
}

export const AdminScheduleView: React.FC<AdminScheduleViewProps> = ({
  initialAppointments = mockAdminAppointments,
}) => {
  const [appointments, setAppointments] =
    useState<AdminAppointmentItem[]>(initialAppointments);
  const [selectedAppointment, setSelectedAppointment] =
    useState<AdminAppointmentItem | null>(null);

  // Modals state
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleSelectAppointment = (appointment: AdminAppointmentItem) => {
    setSelectedAppointment(appointment);
    setIsDetailModalOpen(true);
  };

  const handleOpenReschedule = (appointment: AdminAppointmentItem) => {
    setSelectedAppointment(appointment);
    setIsDetailModalOpen(false);
    setIsRescheduleModalOpen(true);
  };

  const handleOpenCancel = (appointment: AdminAppointmentItem) => {
    setSelectedAppointment(appointment);
    setIsDetailModalOpen(false);
    setIsCancelModalOpen(true);
  };

  const handleRescheduleSuccess = (updatedAppointment: AdminAppointmentItem) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === updatedAppointment.id ? updatedAppointment : apt
      )
    );
    showToast(
      `Appointment #${updatedAppointment.id} rescheduled to ${updatedAppointment.dateDisplay} (${updatedAppointment.timeSlot})!`
    );
  };

  const handleCancelSuccess = (cancelledAppointment: AdminAppointmentItem) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === cancelledAppointment.id ? cancelledAppointment : apt
      )
    );
    showToast(`Appointment #${cancelledAppointment.id} has been cancelled.`);
  };

  const handleCreateSchedule = () => {
    if (appointments.length === 0) {
      setAppointments(mockAdminAppointments);
      showToast("Appointments loaded successfully!");
    } else {
      // Create a new mock appointment or notify
      showToast("Create Schedule: Ready to schedule new active contracts.");
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

      {/* Main Content Area: Empty State vs. Calendar View */}
      {appointments.length === 0 ? (
        <AdminScheduleEmptyState onCreateSchedule={handleCreateSchedule} />
      ) : (
        <AdminScheduleCalendar
          appointments={appointments}
          onSelectAppointment={handleSelectAppointment}
          onCreateSchedule={handleCreateSchedule}
        />
      )}

      {/* 1. Appointment Details Modal */}
      <AdminAppointmentDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        appointment={selectedAppointment}
        onOpenReschedule={handleOpenReschedule}
        onOpenCancel={handleOpenCancel}
      />

      {/* 2. Reschedule Modal */}
      <AdminRescheduleModal
        isOpen={isRescheduleModalOpen}
        onClose={() => setIsRescheduleModalOpen(false)}
        appointment={selectedAppointment}
        onRescheduleSuccess={handleRescheduleSuccess}
      />

      {/* 3. Cancel Appointment Modal */}
      <AdminCancelModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        appointment={selectedAppointment}
        onCancelSuccess={handleCancelSuccess}
      />
    </div>
  );
};

export default AdminScheduleView;
