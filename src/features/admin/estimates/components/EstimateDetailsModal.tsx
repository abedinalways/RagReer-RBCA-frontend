"use client";

import React from "react";
import { X, Mail, Phone, MapPin, Calendar, DollarSign, FileText } from "lucide-react";
import { AdminEstimateItem, AdminEstimateStatus } from "../types/adminEstimates.types";

interface EstimateDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  estimate: AdminEstimateItem | null;
  onEdit?: (estimate: AdminEstimateItem) => void;
  onSend?: (estimate: AdminEstimateItem) => void;
}

const STATUS_STYLES: Record<
  AdminEstimateStatus,
  { pill: string; dot: string }
> = {
  Draft: {
    pill: "bg-[#F2F4F7] text-[#344054] border-[#D0D5DD]",
    dot: "bg-[#475467]",
  },
  Sent: {
    pill: "bg-[#EFF8FF] text-[#175CD3] border-[#B2DDFF]",
    dot: "bg-[#1570EF]",
  },
  "Under Review": {
    pill: "bg-[#FEF7E6] text-[#B54708] border-[#FEDF89]",
    dot: "bg-[#F79009]",
  },
  "Change Requested": {
    pill: "bg-[#FFF4ED] text-[#C2410C] border-[#FED7AA]",
    dot: "bg-[#EA580C]",
  },
  Approved: {
    pill: "bg-[#ECFDF3] text-[#027A48] border-[#ABEFC6]",
    dot: "bg-[#12B76A]",
  },
  Expired: {
    pill: "bg-[#FEF3F2] text-[#E11D48] border-[#FECDCA]",
    dot: "bg-[#E11D48]",
  },
  Declined: {
    pill: "bg-[#FEF3F2] text-[#D92D20] border-[#FDA29B]",
    dot: "bg-[#D92D20]",
  },
};

export const EstimateDetailsModal: React.FC<EstimateDetailsModalProps> = ({
  isOpen,
  onClose,
  estimate,
  onEdit,
  onSend,
}) => {
  if (!isOpen || !estimate) return null;

  const statusStyle = STATUS_STYLES[estimate.status] || {
    pill: "bg-slate-100 text-slate-700 border-slate-200",
    dot: "bg-slate-500",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-2xl rounded-xl border border-border bg-card-bg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-page-bg/40">
          <div className="flex items-center gap-3">
            <h3 className="font-barlow-condensed font-medium text-xl text-primary-heading">
              Estimate Details
            </h3>
            <span className="font-mono text-sm font-medium text-primary">
              {estimate.estimateId}
            </span>
            <span
              className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-xs text-xs font-medium border ${statusStyle.pill}`}
            >
              <span className={`w-2 h-2 rounded-full ${statusStyle.dot} shrink-0`} />
              {estimate.status}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-md text-secondary-subheading hover:text-txt-primary hover:bg-page-bg transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Top Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-lg bg-page-bg/40 border border-border/80">
            {/* Customer Info */}
            <div className="space-y-1.5">
              <span className="text-xs font-medium text-secondary-subheading uppercase tracking-wider">
                Customer Information
              </span>
              <div className="flex items-center gap-3 pt-1">
                <div className="h-10 w-10 rounded-full overflow-hidden bg-primary-light flex items-center justify-center text-primary font-medium text-sm shrink-0">
                  {estimate.customer.avatarUrl ? (
                    <img
                      src={estimate.customer.avatarUrl}
                      alt={estimate.customer.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    estimate.customer.name.charAt(0)
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-txt-primary">
                    {estimate.customer.name}
                  </h4>
                  <p className="text-xs text-secondary-subheading flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    {estimate.customer.email}
                  </p>
                  {estimate.customer.phone && (
                    <p className="text-xs text-secondary-subheading flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {estimate.customer.phone}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Request & Service Info */}
            <div className="space-y-1.5 sm:border-l sm:border-border/60 sm:pl-4">
              <span className="text-xs font-medium text-secondary-subheading uppercase tracking-wider">
                Service & Property
              </span>
              <div className="pt-1 space-y-1 text-xs sm:text-sm text-txt-primary">
                <p className="flex items-center gap-1.5 text-secondary-subheading">
                  <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span className="text-txt-primary font-medium">
                    {estimate.propertyAddress}
                  </span>
                </p>
                <p className="flex items-center gap-1.5 text-secondary-subheading">
                  <FileText className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span>
                    Linked Request:{" "}
                    <span className="font-mono font-medium text-primary">
                      {estimate.requestId}
                    </span>
                  </span>
                </p>
                <p className="flex items-center gap-1.5 text-secondary-subheading">
                  <Calendar className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span>Issue Date: {estimate.issueDate}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Line Items Section */}
          <div>
            <h4 className="font-barlow-condensed font-medium text-base text-primary-heading mb-2">
              Itemized Breakdown
            </h4>
            <div className="rounded-lg border border-border overflow-hidden">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-page-bg/70 border-b border-border text-secondary-subheading font-medium">
                  <tr>
                    <th className="py-2.5 px-3">Item Description</th>
                    <th className="py-2.5 px-3 text-center">Qty</th>
                    <th className="py-2.5 px-3 text-right">Unit Price</th>
                    <th className="py-2.5 px-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle bg-card-bg">
                  {estimate.lineItems && estimate.lineItems.length > 0 ? (
                    estimate.lineItems.map((item) => (
                      <tr key={item.id} className="hover:bg-page-bg/40">
                        <td className="py-2.5 px-3 text-txt-primary">
                          {item.description}
                        </td>
                        <td className="py-2.5 px-3 text-center text-secondary-subheading">
                          {item.quantity}
                        </td>
                        <td className="py-2.5 px-3 text-right text-secondary-subheading">
                          ${item.unitPrice.toFixed(2)}
                        </td>
                        <td className="py-2.5 px-3 text-right font-medium text-txt-primary">
                          ${item.total.toFixed(2)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="py-4 text-center text-secondary-subheading"
                      >
                        Standard package service bundle
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Total Calculation summary */}
              <div className="border-t border-border bg-page-bg/30 p-3 flex flex-col items-end gap-1 text-xs sm:text-sm">
                <div className="flex justify-between w-48 text-secondary-subheading">
                  <span>Subtotal:</span>
                  <span>{estimate.subtotal || estimate.amount}</span>
                </div>
                <div className="flex justify-between w-48 text-secondary-subheading">
                  <span>Tax:</span>
                  <span>{estimate.tax || "$0.00"}</span>
                </div>
                <div className="flex justify-between w-48 pt-1 border-t border-border font-medium text-txt-primary text-sm sm:text-base">
                  <span>Estimated Total:</span>
                  <span className="text-primary">{estimate.amount}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          {estimate.notes && (
            <div className="p-3 rounded-lg bg-page-bg/50 border border-border/60 text-xs text-secondary-subheading">
              <span className="font-medium text-txt-primary block mb-0.5">
                Notes & Terms:
              </span>
              {estimate.notes}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-2.5 px-6 py-4 border-t border-border bg-page-bg/40">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-sm border border-border bg-card-bg text-txt-primary hover:bg-page-bg text-sm font-medium transition-colors cursor-pointer"
          >
            Close
          </button>
          {onEdit && (
            <button
              type="button"
              onClick={() => onEdit(estimate)}
              className="px-4 py-2 rounded-sm border border-primary/30 text-primary hover:bg-primary/10 text-sm font-medium transition-colors cursor-pointer"
            >
              Edit Estimate
            </button>
          )}
          {onSend && (
            <button
              type="button"
              onClick={() => onSend(estimate)}
              className="px-4 py-2 rounded-sm bg-primary hover:bg-primary-hover text-white text-sm font-medium shadow-2xs transition-colors cursor-pointer"
            >
              Send to Customer
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EstimateDetailsModal;
