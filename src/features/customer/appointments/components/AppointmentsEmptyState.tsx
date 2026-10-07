"use client";
import React from "react";
import { useRouter } from "next/navigation";
import TermsIcon from "@/components/icons/customer/TermsIcon";

export const AppointmentsEmptyState: React.FC = () => {
  const router = useRouter();

  return (
    <div className="w-full flex items-center justify-center min-h-[500px] p-4">
      <div className="bg-card-bg rounded-xl border border-border p-8 sm:p-12 max-w-lg w-full text-center space-y-5 shadow-2xs">
        {/* Soft Circular Icon Container */}
        <div className="mx-auto w-14 h-14 rounded-full bg-nav-bg flex items-center justify-center text-primary shadow-2xs">
          <TermsIcon className="w-7 h-7 text-primary" stroke="currentColor" />
        </div>

        {/* Heading & Subtitle */}
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-primary-heading">
            No Appointment Yet
          </h2>
          <p className="text-xs sm:text-sm text-secondary-subheading max-w-sm mx-auto leading-relaxed">
            After confirming a service HALF STACHE will schedule your appointment.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2 flex items-center justify-center">
          <button
            type="button"
            onClick={() => router.push("/customer/requests")}
            className="w-full sm:w-auto px-6 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-medium rounded-md shadow-2xs transition-colors cursor-pointer"
          >
            Go to My Requests
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsEmptyState;
