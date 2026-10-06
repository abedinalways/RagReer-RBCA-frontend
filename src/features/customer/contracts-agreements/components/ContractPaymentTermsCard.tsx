import React from "react";
import { ContractPaymentInfo } from "../types/contractsAgreementsTypes";

interface ContractPaymentTermsCardProps {
  payment: ContractPaymentInfo;
}

export const ContractPaymentTermsCard: React.FC<
  ContractPaymentTermsCardProps
> = ({ payment }) => {
  return (
    <div className="bg-card-bg rounded-lg border border-border p-4 sm:p-5 space-y-3.5 shadow-2xs">
      <h3 className="text-base md:text-lg font-medium text-primary-heading">
        Payment Terms
      </h3>

      {/* Blue Rate Highlight Card */}
      <div className="rounded-lg bg-banner-blue p-4 text-center text-white space-y-1 shadow-2xs">
        <p className="text-xl sm:text-2xl font-bold tracking-tight">
          {payment.monthlyRate}
        </p>
        <p className="text-sm md:text-base text-white/90 font-normal">
          {payment.nextPaymentDate}
        </p>
      </div>

      {/* Payment Details Rows */}
      <div className="space-y-2.5 pt-1 text-sm md:text-base">
        <div className="flex items-center justify-between">
          <span className="text-secondary-subheading">Payment Type</span>
          <span className="text-primary font-medium">{payment.paymentType}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-secondary-subheading">Billing Frequency</span>
          <span className="text-primary font-medium">
            {payment.billingFrequency}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-secondary-subheading">Payment Duration</span>
          <span className="text-primary font-medium">
            {payment.paymentDuration}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ContractPaymentTermsCard;
