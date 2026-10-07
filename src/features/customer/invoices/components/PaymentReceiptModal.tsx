"use client";

import React from "react";
import Image from "next/image";
import { Modal } from "@/components/reusable/Modal";
import RightIcon from "@/components/icons/customer/RightIcon";

export interface PaymentReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBackToHome?: () => void;
  onDownloadReceipt?: () => void;
  receiptData?: {
    companyName?: string;
    companyCategory?: string;
    invoiceId?: string;
    transactionId?: string;
    customerName?: string;
    propertyAddress?: string;
    completedService?: string;
    totalVisit?: string;
    serviceCompletionDate?: string;
    paymentDate?: string;
    paymentMethod?: string;
    totalPaid?: string;
  };
}

export const PaymentReceiptModal: React.FC<PaymentReceiptModalProps> = ({
  isOpen,
  onClose,
  onBackToHome,
  onDownloadReceipt,
  receiptData = {},
}) => {
  const {
    companyName = "HALF STACHE",
    companyCategory = "Lawn Care",
    invoiceId = "#INV-1024",
    transactionId = "#TX 12458",
    customerName = "Sarah Sidd",
    propertyAddress = "100 Whispering Pines Blvd at Hwy 43",
    completedService = "Landscape & Property Maintenance",
    totalVisit = "03",
    serviceCompletionDate = "Aug 27, 2026",
    paymentDate = "Sep 05, 2026",
    paymentMethod = "Online",
    totalPaid = "$3,995.00",
  } = receiptData;

  const handleDownload = () => {
    if (onDownloadReceipt) {
      onDownloadReceipt();
    } else if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="lg"
      className="max-w-[480px]"
      contentClassName="p-5 sm:p-6 text-center"
      footer={
        <div className="grid grid-cols-2 gap-3 w-full">
          <button
            type="button"
            onClick={onBackToHome || onClose}
            className="w-full py-2.5 rounded-xs border border-border hover:bg-slate-50 text-secondary-subheading font-medium text-xs sm:text-sm transition-colors cursor-pointer bg-card-bg flex items-center justify-center"
          >
            Back to Home
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="w-full py-2.5 rounded-xs bg-primary hover:bg-primary-hover text-white font-medium text-xs sm:text-sm transition-colors cursor-pointer shadow-2xs flex items-center justify-center"
          >
            Download Receipt
          </button>
        </div>
      }
    >
      {/* Success Icon */}
      <div className="w-13 h-13 rounded-full bg-blue-50/70 flex items-center justify-center mx-auto mb-2.5">
        <RightIcon className="w-6 h-6 text-primary" />
      </div>

      <h3 className="text-lg sm:text-xl font-medium text-primary-heading">
        Payment Successful
      </h3>

      {/* Receipt Card Container */}
      <div className="mt-4 border border-border rounded-lg overflow-hidden bg-card-bg text-left">
        {/* Blue Banner Header */}
        <div className="bg-primary text-white p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/30 bg-white/10 shrink-0">
                <Image
                  src="/images/logo.png"
                  alt={companyName}
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold text-xs sm:text-sm text-white leading-tight">
                  {companyName}
                </h4>
                <p className="text-[11px] text-white/80">{companyCategory}</p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-[11px] text-white/80">Invoice</p>
              <p className="font-semibold text-xs sm:text-sm text-white">
                {invoiceId}
              </p>
            </div>
          </div>

          <h3 className="text-sm sm:text-base font-semibold text-white mt-3">
            Payment Receipt
          </h3>
        </div>

        {/* Receipt Detail Rows */}
        <div className="p-4 space-y-2.5 text-xs sm:text-sm">
          <div className="flex items-center justify-between">
            <span className="text-secondary-subheading">Transaction ID</span>
            <span className="font-medium text-primary-heading">
              {transactionId}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-secondary-subheading">Customer Name</span>
            <span className="font-medium text-primary-heading">
              {customerName}
            </span>
          </div>

          <div className="flex items-start justify-between gap-4">
            <span className="text-secondary-subheading shrink-0">
              Property Address
            </span>
            <span className="font-medium text-primary-heading text-right max-w-[200px] truncate">
              {propertyAddress}
            </span>
          </div>

          <div className="flex items-start justify-between gap-4">
            <span className="text-secondary-subheading shrink-0">
              Completed Service
            </span>
            <span className="font-medium text-primary-heading text-right max-w-[200px] truncate">
              {completedService}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-secondary-subheading">Total Visit</span>
            <span className="font-medium text-primary-heading">
              {totalVisit}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-secondary-subheading">
              Service Completion Date
            </span>
            <span className="font-medium text-primary-heading">
              {serviceCompletionDate}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-secondary-subheading">Payment Date</span>
            <span className="font-medium text-primary-heading">
              {paymentDate}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-secondary-subheading">Payment Method</span>
            <span className="font-medium text-primary-heading">
              {paymentMethod}
            </span>
          </div>
        </div>

        {/* Total Paid Row */}
        <div className="mx-4 mb-4 bg-page-bg/70 rounded-md p-3 flex items-center justify-between text-xs sm:text-sm">
          <span className="font-semibold text-primary-heading">Total Paid</span>
          <span className="font-semibold text-primary">{totalPaid}</span>
        </div>
      </div>
    </Modal>
  );
};

export default PaymentReceiptModal;
