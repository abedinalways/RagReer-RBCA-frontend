"use client";
import React from "react";
import { FileText } from "lucide-react";

interface AdminScheduleEmptyStateProps {
  onCreateSchedule: () => void;
}

export const AdminScheduleEmptyState: React.FC<AdminScheduleEmptyStateProps> = ({
  onCreateSchedule,
}) => {
  return (
    <div className="w-full flex items-center justify-center min-h-[550px] p-4">
      <div className="bg-card-bg rounded-xl border border-border p-8 sm:p-12 max-w-md w-full text-center space-y-6 shadow-2xs">
        {/* Soft Circular Icon Container */}
        <div className="mx-auto w-16 h-16 rounded-full bg-nav-bg flex items-center justify-center text-primary shadow-2xs">
          <FileText className="w-8 h-8 text-primary" strokeWidth={1.75} />
        </div>

        {/* Heading & Subtitle */}
        <div className="space-y-2">
          <h2 className="text-2xl font-medium text-primary-heading font-barlow-condensed">
            No Appointment Scheduled
          </h2>
          <p className="text-sm text-secondary-subheading max-w-xs mx-auto leading-relaxed">
            Create appointments from here for your active contracts
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-1 flex items-center justify-center">
          <button
            type="button"
            onClick={onCreateSchedule}
            className="w-full sm:w-auto px-8 py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-md shadow-2xs transition-colors cursor-pointer"
          >
            Create Schedule
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminScheduleEmptyState;
