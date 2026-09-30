import React from "react";
import Link from "next/link";
import { Check } from "lucide-react";

interface StepSubmittedProps {
  onReset: () => void;
  requestId?: string;
}

export const StepSubmitted: React.FC<StepSubmittedProps> = ({
  onReset,
  requestId = "REQ-124",
}) => {
  return (
    <div className="py-10 sm:py-14 px-4 text-center max-w-md mx-auto space-y-6">
      {/* Success Checkmark Circle */}
      <div className="w-16 h-16 bg-[#F2F4F7] rounded-full flex items-center justify-center mx-auto text-primary">
        <Check className="w-8 h-8 stroke-[2.5]" />
      </div>

      {/* Title & Subtitle */}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-primary-heading tracking-tight">
          Request Submitted
        </h2>
        <p className="text-sm sm:text-base text-secondary-subheading leading-relaxed">
          Half Stache will review your request ID {requestId} and follow up
          within 1 business day by email.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          type="button"
          onClick={onReset}
          className="w-full sm:flex-1 h-11 px-5 text-sm sm:text-base font-medium text-primary bg-card-bg border border-primary rounded-md hover:bg-page-bg transition-colors cursor-pointer flex items-center justify-center"
        >
          Submit Another Request
        </button>
        <Link
          href="/customer/requests"
          className="w-full sm:flex-1 h-11 px-5 text-sm sm:text-base font-medium text-primary-text bg-primary rounded-md hover:bg-primary-hover transition-colors cursor-pointer flex items-center justify-center"
        >
          View Request
        </Link>
      </div>
    </div>
  );
};
