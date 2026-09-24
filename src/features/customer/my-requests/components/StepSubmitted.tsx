import React from "react";
import Link from "next/link";
import { Check } from "lucide-react";

interface StepSubmittedProps {
  onReset: () => void;
}

export const StepSubmitted: React.FC<StepSubmittedProps> = ({ onReset }) => {
  return (
    <div className="py-12 px-4 text-center max-w-md mx-auto space-y-5">
      <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto text-primary ">
        <Check className="w-8 h-8 stroke-current" />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-medium text-primary-heading">
          Request Submitted
        </h2>
        <p className="text-base text-secondary-subheading leading-relaxed">
          Half Stache will review your request ID REQ-124 and follow up within 1
          business day by email.
        </p>
      </div>

      <div className="pt-4 flex flex-row items-center justify-center gap-3">
        <button
          type="button"
          onClick={onReset}
          className="flex-1 px-6 h-11 text-sm font-medium text-txt-primary bg-card-bg border border-border rounded-md hover:bg-page-bg transition-colors cursor-pointer"
        >
          Submit Another Request
        </button>
        <Link
          href="/customer/requests"
          className="flex-1 px-6 h-11 text-sm font-medium text-primary-text bg-primary rounded-md hover:bg-primary-hover transition-colors cursor-pointer flex items-center justify-center"
        >
          View Request
        </Link>
      </div>
    </div>
  );
};
