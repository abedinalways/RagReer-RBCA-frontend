import React from "react";
import AgreementIcon from "@/components/icons/customer/AgreementIcon";
import { ContractDetailData } from "../types/contractsAgreementsTypes";

interface ContractOverviewCardProps {
  data: ContractDetailData;
}

export const ContractOverviewCard: React.FC<ContractOverviewCardProps> = ({
  data,
}) => {
  return (
    <div className="bg-card-bg rounded-lg border border-border p-5 space-y-4 shadow-2xs">
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <AgreementIcon className="w-5 h-5 text-primary-heading shrink-0" />
        <h2 className="text-lg sm:text-xl font-medium text-primary-heading">
          {data.agreementTitle}
        </h2>
      </div>

      <div className="border-t border-border-subtle pt-3.5 space-y-4">
        {/* Top Grid: Provider, Customer, Requested Service */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Provider */}
          <div className="space-y-0.5">
            <span className="text-xs md:text-sm text-secondary-subheading font-medium">
              Provider
            </span>
            <p className="text-base md:text-lg font-medium text-primary-heading">
              {data.provider.name}
            </p>
            <p className="text-base md:text-lg text-txt-primary">{data.provider.email}</p>
            <p className="text-base md:text-lg text-txt-primary">{data.provider.phone}</p>
          </div>

          {/* Customer */}
          <div className="space-y-0.5">
            <span className="text-xs md:text-sm text-secondary-subheading font-medium">
              Customer
            </span>
            <p className="text-base md:text-lg font-medium text-primary-heading">
              {data.customer.name}
            </p>
            <p className="text-base md:text-lg text-txt-primary">{data.customer.email}</p>
            <p className="text-base md:text-lg text-txt-primary">{data.customer.phone}</p>
          </div>

          {/* Requested Service */}
          <div className="space-y-0.5">
            <span className="text-xs md:text-sm text-secondary-subheading font-medium">
              Requested Service
            </span>
            <p className="text-base md:text-lg font-medium text-primary-heading">
              {data.requestedService}
            </p>
          </div>
        </div>

        {/* Bottom Grid: Agreement type, Duration, Value */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 border-t border-border-subtle pt-3.5">
          <div className="space-y-0.5">
            <span className="text-xs md:text-sm text-secondary-subheading font-medium">
              Service Agreement type
            </span>
            <p className="text-base md:text-lg font-medium text-primary-heading">
              {data.serviceAgreementType}
            </p>
          </div>

          <div className="space-y-0.5">
            <span className="text-xs md:text-sm text-secondary-subheading font-medium">
              Contract Duration
            </span>
            <p className="text-base md:text-lg font-medium text-primary-heading">
              {data.contractDuration}
            </p>
          </div>

          <div className="space-y-0.5">
            <span className="text-xs md:text-sm text-secondary-subheading font-medium">
              Contract Value
            </span>
            <p className="text-base md:text-lg font-medium  text-primary-heading">
              {data.contractValue}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractOverviewCard;
