import React from "react";
import { ContractSchedulingInfo } from "../types/contractsAgreementsTypes";

interface ContractSchedulingCardProps {
  scheduling: ContractSchedulingInfo;
}

export const ContractSchedulingCard: React.FC<
  ContractSchedulingCardProps
> = ({ scheduling }) => {
  return (
    <div className="bg-card-bg rounded-lg border border-border p-4 sm:p-5 space-y-3.5 shadow-2xs">
      <h3 className="text-base md:text-lg font-medium text-primary-heading">
        Service Scheduling Details
      </h3>

      <div className="space-y-2.5 pt-1 text-sm md:text-base">
        <div className="flex items-center justify-between">
          <span className="text-secondary-subheading">Frequency</span>
          <span className="text-primary font-medium">{scheduling.frequency}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-secondary-subheading">Start Date</span>
          <span className="text-primary font-medium">{scheduling.startDate}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-secondary-subheading">End Date</span>
          <span className="text-primary font-medium">{scheduling.endDate}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-secondary-subheading">Preferred Time</span>
          <span className="text-primary font-medium">
            {scheduling.preferredTime}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-secondary-subheading">Estimate Duration</span>
          <span className="text-primary font-medium">
            {scheduling.estimateDuration}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-secondary-subheading">Estimate Visit</span>
          <span className="text-primary font-medium">
            {scheduling.estimateVisit}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ContractSchedulingCard;
