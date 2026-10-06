"use client";
import React from "react";
import WorkIcon from "@/components/icons/customer/WorkIcon";
import TermsIcon from "@/components/icons/customer/TermsIcon";
import {
  EstimateDetailData,
} from "../types/estimateTypes";

interface EstimateServiceDetailsCardProps {
  data: EstimateDetailData;
}

export const EstimateServiceDetailsCard: React.FC<
  EstimateServiceDetailsCardProps
> = ({ data }) => {
  const {
    scopeOfWork,
    serviceDetails,
    estimateDuration,
    siteAssessmentNote,
    lineItems,
    siteAssessmentLineItems,
    financials,
    termsAndConditions,
  } = data;

  return (
    <div className="bg-card-bg rounded-lg border border-border p-4 sm:p-6 space-y-6 shadow-2xs">
      {/* Title Header */}
      <div>
        <h2 className="text-lg md:text-xl font-semibold text-primary-heading">
          Service Estimate Details
        </h2>
        <p className="text-xs md:text-sm text-secondary-subheading mt-0.5">
          Review the proposed work and pricing below
        </p>
      </div>

      <div className="border-t border-border" />

      {/* Scope of Work */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-primary-heading">
          <WorkIcon className="w-5 h-5 text-primary-heading shrink-0" />
          <h3 className="text-base md:text-lg font-semibold">Scope of Work</h3>
        </div>
        <p className="text-xs md:text-sm text-secondary-subheading leading-relaxed">
          {scopeOfWork}
        </p>
      </div>

      {/* Service Details Section */}
      <div className="space-y-3">
        <h3 className="text-base md:text-lg font-semibold text-primary-heading">
          Service Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {serviceDetails.map((service, index) => (
            <div
              key={index}
              className="border border-border rounded-lg p-4 bg-card-bg"
            >
              <h4 className="text-sm md:text-base font-semibold text-primary">
                {service.title}
              </h4>
              <p className="text-xs md:text-sm font-medium text-primary-heading mt-2.5 mb-1.5">
                Work Included:
              </p>
              <ul className="space-y-1">
                {service.workIncluded.map((item, itemIdx) => (
                  <li
                    key={itemIdx}
                    className="flex items-center gap-2 text-xs md:text-sm text-secondary-subheading"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary-subheading/70 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Estimate Duration */}
      <div className="text-base md:text-lg">
        <span className="font-medium text-primary-heading ">
          Estimate Duration:{" "}
        </span>
        <span className="text-secondary-subheading">{estimateDuration}</span>
      </div>

      {/* Site Assessment & Required Adjustments (If With Site Visit) */}
      {siteAssessmentNote && (
        <div className="space-y-1.5">
          <h3 className="text-[0.9375rem] font-semibold text-primary-heading">
            Site Assessment & Required Adjustments
          </h3>
          <p className="text-[0.8125rem] sm:text-[0.875rem] text-secondary-subheading leading-relaxed">
            {siteAssessmentNote}
          </p>
        </div>
      )}

      {/* Line Items Table */}
      <div className="space-y-3">
        <h3 className="text-base md:text-lg font-semibold text-primary-heading">
          Line Items
        </h3>

        <div className="border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="bg-[#F8F9FA] border-b border-border text-secondary-subheading">
                  <th className="py-2.5 px-4 font-medium">Description</th>
                  <th className="py-2.5 px-4 font-medium">Quantity</th>
                  <th className="py-2.5 px-4 font-medium">Rate</th>
                  <th className="py-2.5 px-4 font-medium text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {lineItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 px-4 font-medium text-primary">
                      {item.description}
                    </td>
                    <td className="py-3 px-4 text-secondary-subheading">
                      {item.quantity}
                    </td>
                    <td className="py-3 px-4 text-secondary-subheading">
                      {item.rate}
                    </td>
                    <td className="py-3 px-4 text-right font-medium text-primary-heading">
                      {item.amount}
                    </td>
                  </tr>
                ))}

                {/* Optional Site Assessment Additional Line Items */}
                {siteAssessmentLineItems && siteAssessmentLineItems.length > 0 && (
                  <>
                    <tr className="bg-slate-50/80">
                      <td
                        colSpan={4}
                        className="py-2.5 px-4 font-semibold text-primary-heading text-[0.875rem]"
                      >
                        Required Services after Site Assessment
                      </td>
                    </tr>
                    {siteAssessmentLineItems.map((item) => (
                      <tr
                        key={item.id}
                        className="hover:bg-slate-50/50 transition-colors"
                      >
                        <td className="py-3 px-4 font-medium text-primary">
                          {item.description}
                        </td>
                        <td className="py-3 px-4 text-secondary-subheading">
                          {item.quantity}
                        </td>
                        <td className="py-3 px-4 text-secondary-subheading">
                          {item.rate}
                        </td>
                        <td className="py-3 px-4 text-right font-medium text-primary-heading">
                          {item.amount}
                        </td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Financial Totals Card Box (matches Figma left-aligned box) */}
        <div className="pt-2">
          <div className="border border-border rounded-lg p-3.5 w-full sm:w-64 space-y-1.5 text-xs md:text-sm">
            <div className="flex justify-between items-center text-secondary-subheading">
              <span>Subtotal</span>
              <span className="font-medium text-primary-heading">
                {financials.subtotal}
              </span>
            </div>
            <div className="flex justify-between items-center text-secondary-subheading">
              <span>Discount</span>
              <span className="font-medium text-primary-heading">
                {financials.discount}
              </span>
            </div>
            <div className="flex justify-between items-center text-secondary-subheading">
              <span>Tax</span>
              <span className="font-medium text-primary-heading">
                {financials.tax}
              </span>
            </div>
            <div className="border-t border-border pt-1.5 flex justify-between items-center">
              <span className="font-semibold text-primary-heading">Total</span>
              <span className="font-semibold text-primary text-[0.9375rem]">
                {financials.total}
              </span>
            </div>
          </div>

          {/* Prior payment and remaining balance when present */}
          {(financials.priorPayment !== undefined ||
            financials.remainingBalance !== undefined) && (
            <div className="mt-3 space-y-1 text-[0.8125rem]">
              {financials.priorPayment && (
                <div className="flex items-center gap-6">
                  <span className="text-secondary-subheading w-32">
                    Prior Payment:
                  </span>
                  <span className="font-medium text-primary">
                    {financials.priorPayment}
                  </span>
                </div>
              )}
              {financials.remainingBalance && (
                <div className="flex items-center gap-6">
                  <span className="text-secondary-subheading w-32">
                    Remaining Balance:
                  </span>
                  <span className="font-medium text-primary">
                    {financials.remainingBalance}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-border" />

      {/* Terms & Conditions */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2 text-primary-heading">
          <TermsIcon className="w-5 h-5 text-primary-heading shrink-0" />
          <h3 className="text-base md:text-lg font-semibold">Terms & Conditions</h3>
        </div>
        <p className="text-xs md:text-sm text-secondary-subheading leading-relaxed">
          {termsAndConditions}
        </p>
      </div>
    </div>
  );
};
