import React from "react";
import { ChevronRight } from "lucide-react";
import TermsIcon from "@/components/icons/customer/TermsIcon";

interface ContractVersionHistoryCardProps {
  onOpen?: () => void;
}

export const ContractVersionHistoryCard: React.FC<
  ContractVersionHistoryCardProps
> = ({ onOpen }) => {
  return (
    <div
      onClick={onOpen}
      className="bg-card-bg rounded-lg border border-border p-3.5 sm:p-4 flex items-center justify-between shadow-2xs cursor-pointer hover:bg-slate-50 transition-colors group"
    >
      <div className="flex items-center gap-2.5">
        <TermsIcon className="w-5 h-5 text-primary-heading shrink-0" />
        <span className="text-sm md:text-base font-medium text-primary-heading group-hover:text-primary transition-colors">
          Version History
        </span>
      </div>
      <ChevronRight className="w-4 h-4 text-secondary-subheading group-hover:text-primary transition-colors shrink-0" />
    </div>
  );
};

export default ContractVersionHistoryCard;
