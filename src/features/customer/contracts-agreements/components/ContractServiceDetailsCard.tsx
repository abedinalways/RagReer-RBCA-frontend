import React from "react";
import WorkIcon from "@/components/icons/customer/WorkIcon";
import { ContractDetailData } from "../types/contractsAgreementsTypes";

interface ContractServiceDetailsCardProps {
  data: ContractDetailData;
}

export const ContractServiceDetailsCard: React.FC<
  ContractServiceDetailsCardProps
> = ({ data }) => {
  const { serviceDetails } = data;

  return (
    <div className="bg-card-bg rounded-lg border border-border p-5 space-y-4 shadow-2xs">
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <WorkIcon className="w-5 h-5 text-primary-heading shrink-0" />
        <h2 className="text-lg md:text-xl font-semibold text-primary-heading">
          Service Details
        </h2>
      </div>

      <div className="border-t border-border-subtle pt-3.5 space-y-4">
        {/* Scope of Work */}
        <div className="space-y-1">
          <h3 className="text-base md:text-lg font-medium text-primary-heading">
            Scope of Work
          </h3>
          <p className="text-xs md:text-sm text-secondary-subheading leading-relaxed">
            {serviceDetails.scopeOfWork}
          </p>
        </div>

        {/* Included Services */}
        <div className="space-y-2 pt-1">
          <h3 className="text-base md:text-lg font-medium text-primary-heading">
            Included Services
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {serviceDetails.includedServices.map((service, idx) => (
              <div
                key={idx}
                className="border border-border/80 rounded-md p-3.5 sm:p-4 bg-card-bg space-y-2"
              >
                <h4 className="text-base md:text-lg font-medium text-primary">
                  {service.title}
                </h4>

                <div className="space-y-1.5">
                  <span className="text-xs md:text-sm text-secondary-subheading font-medium block">
                    Work Included:
                  </span>
                  <ul className="space-y-1 text-xs md:text-sm text-txt-primary">
                    {service.workIncluded.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary-subheading/60 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractServiceDetailsCard;
