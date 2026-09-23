import React from "react";

interface StepSubmittedProps {
  onReset: () => void;
  onRequestView: () => void;
}

export const StepSubmitted: React.FC<StepSubmittedProps> = ({
  onReset,
  onRequestView,
}) => {
  return (
    <div className="py-12 px-4 text-center max-w-md mx-auto space-y-5">
      <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto text-primary ">
        <svg className="w-8 h-8 stroke-current" fill="none" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            d="M5 13l4 4L19 7"
          />
        </svg>
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

      <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          type="button"
          onClick={onReset}
          className="w-full sm:w-auto px-5 h-11 text-sm font-medium text-txt-primary bg-card-bg border border-border rounded-md hover:bg-page-bg transition-colors cursor-pointer"
        >
          Submit Another Request
        </button>
        <button
          type="button"
          onClick={onRequestView}
          className="w-full sm:w-auto px-6 h-11 text-sm font-medium text-primary-text bg-primary rounded-md hover:bg-primary-hover transition-colors cursor-pointer"
        >
          View Request
        </button>
      </div>
    </div>
  );
};
