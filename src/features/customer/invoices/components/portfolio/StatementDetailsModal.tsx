"use client";

import React from "react";
import { X } from "lucide-react";
import { StatementDetailData } from "../../types/invoicesTypes";

export interface StatementDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  statementData: StatementDetailData;
  onDownload?: () => void;
}

export const StatementDetailsModal: React.FC<StatementDetailsModalProps> = ({
  isOpen,
  onClose,
  statementData,
  onDownload,
}) => {
  if (!isOpen) return null;

  const handleDownload = () => {
    if (onDownload) {
      onDownload();
    } else if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-card-bg w-full max-w-[560px] rounded-xl shadow-2xl border border-border flex flex-col overflow-hidden my-auto max-h-[92vh] animate-in zoom-in-95 duration-150">
        {/* Modal Top Bar with Close Icon */}
        <div className="flex items-center justify-end px-5 pt-4 pb-2">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1 rounded-md text-secondary-subheading/70 hover:text-txt-primary hover:bg-page-bg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="px-5 sm:px-6 pb-6 overflow-y-auto flex-1 space-y-4">
          {/* Blue Header Banner matching Figma Screenshot 4 */}
          <div className="bg-primary text-white p-4.5 rounded-lg shadow-2xs">
            <h3 className="text-base sm:text-lg font-semibold text-white tracking-wide">
              {statementData.statementTitle}
            </h3>
            <p className="text-xs sm:text-sm text-white/85 font-normal mt-0.5">
              {statementData.companyGroup}
            </p>
          </div>

          {/* Properties Table matching Figma Screenshot 4 */}
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-border/80">
                  <th className="py-2.5 px-3 font-semibold text-txt-primary">
                    Property Address
                  </th>
                  <th className="py-2.5 px-3 font-semibold text-txt-primary text-center">
                    Visits
                  </th>
                  <th className="py-2.5 px-3 font-semibold text-txt-primary">
                    Status
                  </th>
                  <th className="py-2.5 px-3 font-semibold text-txt-primary text-right">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {statementData.properties.map((item, idx) => (
                  <tr key={item.id || idx} className="hover:bg-blue-50/50">
                    <td className="py-2.5 px-3 text-secondary-subheading font-normal">
                      {item.propertyAddress}
                    </td>
                    <td className="py-2.5 px-3 text-secondary-subheading text-center font-normal">
                      {item.visits}
                    </td>
                    <td className="py-2.5 px-3 text-secondary-subheading font-normal">
                      {item.status}
                    </td>
                    <td className="py-2.5 px-3 text-txt-primary font-medium text-right">
                      {item.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary Box matching Figma Screenshot 4 */}
          <div className="bg-[#F4F7FB] rounded-lg p-3.5 sm:p-4 space-y-1.5 text-xs sm:text-sm border border-border/40">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-txt-primary">
                Total Billed:
              </span>
              <span className="font-semibold text-primary">
                {statementData.totalBilled}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-txt-primary">
                Total Paid:
              </span>
              <span className="font-semibold text-primary">
                {statementData.totalPaid}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-txt-primary">
                Balance:
              </span>
              <span className="font-semibold text-primary">
                {statementData.balance}
              </span>
            </div>
          </div>

          {/* Action Buttons matching Figma Screenshot 4 */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 rounded-sm border border-border bg-card-bg hover:bg-page-bg text-secondary-subheading font-medium text-xs sm:text-sm transition-colors cursor-pointer text-center"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="w-full py-2.5 rounded-sm bg-primary hover:bg-primary-hover text-white font-medium text-xs sm:text-sm transition-colors cursor-pointer text-center shadow-2xs"
            >
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatementDetailsModal;
