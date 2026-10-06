import React from "react";
import PriceIcon from "@/components/icons/customer/PriceIcon";
import { ContractDetailData } from "../types/contractsAgreementsTypes";

interface ContractPricingCardProps {
  data: ContractDetailData;
}

export const ContractPricingCard: React.FC<ContractPricingCardProps> = ({
  data,
}) => {
  const { pricing } = data;

  return (
    <div className="bg-card-bg rounded-lg border border-border p-5 space-y-4 shadow-2xs">
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <PriceIcon className="w-5 h-5 text-primary-heading shrink-0" />
        <h2 className="text-lg md:text-xl font-medium text-primary-heading">
          Contract Pricing
        </h2>
      </div>

      <div className="border-t border-border-subtle pt-3.5 space-y-3">
        <h3 className="text-base md:text-lg font-medium text-primary-heading">
          Line Items
        </h3>

        {/* Pricing Table */}
        <div className="border border-border rounded-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-page-bg/70 border-b border-border text-secondary-subheading font-medium">
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4">Quantity</th>
                  <th className="py-3 px-4">Rate</th>
                  <th className="py-3 px-4">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle bg-card-bg">
                {pricing.lineItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/50 transition-colors">
                    <td className="py-3.5 px-4 text-primary font-medium">
                      {item.description}
                    </td>
                    <td className="py-3.5 px-4 text-secondary-subheading">
                      {item.quantity}
                    </td>
                    <td className="py-3.5 px-4 text-secondary-subheading">
                      {item.rate}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-primary-heading">
                      {item.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-table-total-bg border-t border-border">
                  <td
                    colSpan={3}
                    className="py-3.5 px-4 font-medium text-primary-heading text-sm md:text-base"
                  >
                    Total Estimates
                  </td>
                  <td className="py-3.5 px-4 font-bold text-primary text-sm md:text-base">
                    {pricing.totalEstimates}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractPricingCard;
