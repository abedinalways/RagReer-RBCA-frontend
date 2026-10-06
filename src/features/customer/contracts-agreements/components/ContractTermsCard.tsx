import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import SignatureIcon from "@/components/icons/customer/SignatureIcon";
import TermsIcon from "@/components/icons/customer/TermsIcon";
import { ContractDetailData } from "../types/contractsAgreementsTypes";

interface ContractTermsCardProps {
  data: ContractDetailData;
  onReviewAndSign: () => void;
  onViewSignedDocument?: () => void;
  isSigned?: boolean;
}

export const ContractTermsCard: React.FC<ContractTermsCardProps> = ({
  data,
  onReviewAndSign,
  onViewSignedDocument,
  isSigned = false,
}) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);
  const [isAgreed, setIsAgreed] = useState(isSigned);

  return (
    <div className="bg-card-bg rounded-lg border border-border p-5 space-y-4 shadow-2xs">
      {/* Accordion Header */}
      <button
        type="button"
        onClick={() => setIsAccordionOpen((prev) => !prev)}
        className="w-full flex items-center justify-between text-left cursor-pointer group"
      >
        <div className="flex items-center gap-2.5">
          <TermsIcon className="w-5 h-5 text-primary-heading shrink-0" />
          <h2 className="text-lg md:text-xl font-medium text-primary-heading group-hover:text-primary transition-colors">
            Acknowledge Terms & Conditions
          </h2>
        </div>
        <div className="p-1 rounded text-secondary-subheading group-hover:text-txt-primary">
          {isAccordionOpen ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </div>
      </button>

      {/* Accordion Content */}
      {isAccordionOpen && (
        <div className="border-t border-border-subtle pt-4 space-y-3.5 animate-in fade-in-50 duration-150">
          {data.termsAndConditions.map((term) => (
            <div
              key={term.id}
              className="bg-terms-bg border border-terms-border rounded-md p-3.5 sm:p-4 space-y-1.5"
            >
              <h3 className="text-base sm:text-lg font-medium text-primary-heading">
                {term.title}
              </h3>
              <p className="text-xs md:text-sm text-secondary-subheading leading-relaxed">
                {term.content}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Agreement Checkbox & Action Button or Signed Confirmation */}
      <div className="pt-2">
        {!isSigned ? (
          <div className="space-y-3">
            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isAgreed}
                onChange={(e) => setIsAgreed(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-border text-primary focus:ring-primary/20 cursor-pointer"
              />
              <span className="text-xs sm:text-sm text-secondary-subheading leading-normal">
                I have reviewed and agree to the terms and conditions of this contract.
              </span>
            </label>

            <button
              type="button"
              onClick={onReviewAndSign}
              className="w-full h-11 bg-primary hover:bg-primary-hover text-white font-medium text-xs sm:text-sm rounded-md shadow-2xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <SignatureIcon />
              <span>Review & Sign</span>
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Contracts & Agreements Signed Banner */}
            <div className="bg-badge-active-bg border border-badge-active-border rounded-lg p-3.5 sm:p-4 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-badge-active-text font-bold text-sm sm:text-base leading-none">
                  ✓
                </span>
                <h4 className="text-sm sm:text-base font-semibold text-badge-active-text">
                  Contracts & Agreements Signed
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-secondary-subheading pl-4 sm:pl-5 leading-relaxed">
                This agreement is fully executed. A copy has been sent to{" "}
                <span className="text-txt-primary font-medium">
                  {data.signedNotificationEmail || "jan.m*****@email.com"}
                </span>
              </p>
            </div>

            {/* View Signed Document Button (aligned right) */}
            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={onViewSignedDocument}
                className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs md:text-sm font-medium rounded-md shadow-2xs transition-colors cursor-pointer"
              >
                View Signed Document
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContractTermsCard;
