import React, { useState } from "react";
import { ChevronUp, ChevronRight } from "lucide-react";
import TermsIcon from "@/components/icons/customer/TermsIcon";
import { ContractVersionHistoryItem } from "../types/contractsAgreementsTypes";

interface ContractVersionHistoryCardProps {
  versions?: ContractVersionHistoryItem[];
  currentVersionNumber?: number;
  onSelectVersion?: (version: ContractVersionHistoryItem) => void;
  onDownloadVersion?: (version: ContractVersionHistoryItem) => void;
  initialOpen?: boolean;
}

export const ContractVersionHistoryCard: React.FC<
  ContractVersionHistoryCardProps
> = ({
  versions = [],
  currentVersionNumber,
  onSelectVersion,
  onDownloadVersion,
  initialOpen = true,
}) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  return (
    <div className="bg-card-bg rounded-lg border border-border shadow-2xs overflow-hidden">
      {/* Header Accordion Toggle */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full p-3.5 sm:p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50/50 transition-colors group text-left"
      >
        <div className="flex items-center gap-2.5">
          <TermsIcon className="w-5 h-5 text-primary-heading shrink-0" />
          <h3 className="text-base md:text-lg font-medium text-primary-heading group-hover:text-primary transition-colors">
            Version History
          </h3>
        </div>
        <div className="text-secondary-subheading group-hover:text-primary transition-colors">
          {isOpen ? (
            <ChevronUp className="w-4 h-4 shrink-0" />
          ) : (
            <ChevronRight className="w-4 h-4 shrink-0" />
          )}
        </div>
      </button>

      {/* Accordion Content */}
      {isOpen && versions.length > 0 && (
        <div className="border-t border-border-subtle p-3.5 sm:p-4 space-y-3.5 animate-in fade-in-50 duration-150">
          {versions.map((ver) => {
            const isCurrent = currentVersionNumber === ver.versionNumber;
            return (
              <div
                key={ver.id || ver.versionNumber}
                className="space-y-1"
              >
                {/* Version Title with Bullet */}
                <div
                  onClick={() => onSelectVersion?.(ver)}
                  className={`flex items-center gap-2 text-xs sm:text-sm font-semibold cursor-pointer group ${
                    isCurrent
                      ? "text-primary-heading"
                      : "text-primary-heading/90 hover:text-primary"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  <span className="group-hover:underline">
                    {ver.versionLabel}
                  </span>
                </div>

                {/* Subtext: Date — Signed ✓ [Download] */}
                <div className="pl-3.5 flex flex-wrap items-center gap-1.5 text-xs text-secondary-subheading">
                  <span>{ver.signedDate} — Signed</span>
                  <span className="font-bold text-txt-primary">✓</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDownloadVersion?.(ver);
                    }}
                    className="text-primary hover:text-primary-hover hover:underline font-medium cursor-pointer ml-1"
                  >
                    [Download]
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ContractVersionHistoryCard;
