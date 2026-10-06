import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import SignatureIcon from "@/components/icons/customer/SignatureIcon";
import TermsIcon from "@/components/icons/customer/TermsIcon";
import { ContractDetailData } from "../types/contractsAgreementsTypes";

interface ContractTermsCardProps {
  data: ContractDetailData;
  onReviewAndSign: () => void;
  isSigned?: boolean;
}

export const ContractTermsCard: React.FC<ContractTermsCardProps> = ({
  data,
  onReviewAndSign,
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

      {/* Agreement Checkbox & Action Button */}
      <div className="pt-2 space-y-3">
        <label className="flex items-start gap-2.5 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={isAgreed}
            onChange={(e) => setIsAgreed(e.target.checked)}
            disabled={isSigned}
            className="mt-0.5 w-4 h-4 rounded border-border text-primary focus:ring-primary/20 cursor-pointer"
          />
          <span className="text-xs sm:text-sm text-secondary-subheading leading-normal">
            I have reviewed and agree to the terms and conditions of this contract.
          </span>
        </label>

        {!isSigned ? (
          <button
            type="button"
            onClick={onReviewAndSign}
            className="w-full h-11 bg-primary hover:bg-primary-hover text-white font-medium text-xs sm:text-sm rounded-md shadow-2xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <SignatureIcon/>
            <span>Review & Sign</span>
          </button>
        ) : (
          <div className="w-full py-2.5 px-4 bg-emerald-50 border border-emerald-200 rounded-md text-emerald-800 text-xs sm:text-sm font-medium text-center">
            ✓ This contract has been signed and digitally executed.
          </div>
        )}
      </div>
    </div>
  );
};

export default ContractTermsCard;
