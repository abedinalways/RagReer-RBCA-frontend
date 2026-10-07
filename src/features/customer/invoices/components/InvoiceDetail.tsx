"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronLeft, Check, Loader2 } from "lucide-react";
import { getInvoiceDetailData } from "../data/invoicesData";
import { InvoiceDetailData, BillingHistoryItem } from "../types/invoicesTypes";
import { StatusBadge } from "./InvoicesColumns";
import PropertyIcon from "@/components/icons/customer/PropertyIcon";
import BillingHistory from "./BillingHistory";
import PaymentReceiptModal from "./PaymentReceiptModal";
import PaymentFailedModal from "./PaymentFailedModal";
import { initiateCloverCheckout } from "../services/cloverPaymentService";

interface InvoiceDetailProps {
  invoiceId?: string;
  initialPaymentStatus?: string;
  initialTxId?: string;
}

export const InvoiceDetail: React.FC<InvoiceDetailProps> = ({
  invoiceId = "inv-1024",
  initialPaymentStatus,
  initialTxId,
}) => {
  const router = useRouter();
  const [data, setData] = useState<InvoiceDetailData>(() =>
    getInvoiceDetailData(invoiceId),
  );
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [isFailedModalOpen, setIsFailedModalOpen] = useState(false);
  const [isRedirectingToClover, setIsRedirectingToClover] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Handle Clover return callback (e.g. redirected back from Clover)
  useEffect(() => {
    if (initialPaymentStatus === "success") {
      setData((prev) => ({
        ...prev,
        status: "Paid",
        amountPaid: prev.total,
        remainingAmount: "$0.00",
      }));
      setIsReceiptModalOpen(true);
      showToast("Payment completed successfully via Clover!");
      if (typeof window !== "undefined") {
        window.history.replaceState(null, "", window.location.pathname);
      }
    } else if (initialPaymentStatus === "failed") {
      setIsFailedModalOpen(true);
      if (typeof window !== "undefined") {
        window.history.replaceState(null, "", window.location.pathname);
      }
    }
  }, [initialPaymentStatus]);

  const isPaid = data.status === "Paid";

  /**
   * Direct redirect to Clover Hosted Checkout system.
   * Future backend integration only requires updating cloverPaymentService.ts.
   */
  const handlePayWithClover = async (simulateFailure = false) => {
    try {
      setIsRedirectingToClover(true);
      const currentUrl =
        typeof window !== "undefined"
          ? window.location.origin + window.location.pathname
          : `/customer/invoices/${data.rawId}`;

      await initiateCloverCheckout(
        {
          invoiceId: data.id,
          amount: data.amountPayable,
          customerName: data.billedTo.name,
          customerEmail: data.billedTo.email,
          successUrl: currentUrl,
          cancelUrl: currentUrl,
        },
        { simulateFailure }
      );
    } catch (err) {
      setIsRedirectingToClover(false);
      showToast("Unable to connect to Clover checkout. Please try again.");
      console.error("Clover redirect error:", err);
    }
  };

  const handleDownloadReceipt = () => {
    showToast("Downloading invoice receipt...");
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const billingHistoryItems: BillingHistoryItem[] = [
    {
      id: "tx-detail-1",
      transactionId: initialTxId || "#TX 12458",
      billedTo: data.billedTo.name,
      paymentCompletionDate: "Sep 05, 2026",
      amount: data.total,
      paymentMethod: "Clover Hosted Checkout",
      companyName: data.billedBy.name,
      companyCategory: "Lawn Care",
      invoiceId: data.id,
      completedService: "Landscape & Property Maintenance",
      totalVisit: "03",
      serviceCompletionDate: "Aug 27, 2026",
    },
  ];

  return (
    <div className="min-h-screen bg-page-bg pb-14 space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-primary-dark text-white px-4 py-2.5 rounded-md shadow-lg flex items-center gap-2 text-xs sm:text-sm animate-in fade-in slide-in-from-top-2">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header: Back + Invoice Title & Badge */}
      <div className="space-y-1.5">
        <button
          type="button"
          onClick={() => router.push("/customer/invoices")}
          className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-primary hover:text-primary-hover transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-xl sm:text-2xl font-medium text-primary-heading tracking-tight">
            Invoice {data.id}
          </h1>
          <StatusBadge status={data.status} />
        </div>
      </div>

      {/* Main Layout: 2-columns if not paid, full width if paid (Figma Screenshot 4) */}
      <div
        className={
          isPaid
            ? "space-y-6"
            : "grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 items-start"
        }
      >
        {/* Left / Main Section */}
        <div
          className={
            isPaid
              ? "space-y-5"
              : "lg:col-span-2 space-y-4 sm:space-y-5"
          }
        >
          {/* Main Invoice Header & Details Card */}
          <div className="bg-card-bg rounded-sm border border-border p-5 sm:p-6 space-y-5">
            {/* Property Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-primary-heading">
                  <PropertyIcon className="w-5 h-5 text-secondary-subheading shrink-0" />
                  <h2 className="text-lg sm:text-xl font-semibold">
                    {data.propertyName}
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-secondary-subheading pl-7 mt-0.5">
                  {data.propertyAddress}
                </p>
              </div>

              <div className="text-left sm:text-right pl-7 sm:pl-0">
                <p className="text-xs md:text-sm text-secondary-subheading">
                  Date Issued
                </p>
                <p className="text-sm md:text-base font-medium text-primary-heading">
                  {data.issueDate}
                </p>
              </div>
            </div>

            {/* Divider */}
            <hr className="border-border" />

            {/* Meta Info Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-base md:text-lg">
              <div>
                <p className="text-secondary-subheading text-xs md:text-sm">
                  Service Agreement type
                </p>
                <p className="font-normal text-primary-heading mt-0.5">
                  {data.serviceAgreementType}
                </p>
              </div>

              <div>
                <p className="text-secondary-subheading text-xs md:text-sm">
                  {data.remainingMonths ? "Payment Type" : "Billing Type"}
                </p>
                <p className="font-normal text-primary-heading mt-0.5">
                  {data.billingType}
                </p>
              </div>

              <div>
                <p className="text-secondary-subheading text-xs md:text-sm">
                  {data.remainingMonths
                    ? "Current Payable Month"
                    : "Payable Month"}
                </p>
                <p className="font-normal text-primary-heading mt-0.5">
                  {data.payableMonth}
                </p>
              </div>

              <div>
                <p className="text-secondary-subheading text-xs md:text-sm">
                  {data.remainingMonths ? "Remaining" : "Payment Terms"}
                </p>
                <p className="font-normal text-primary-heading mt-0.5">
                  {data.remainingMonths || data.paymentTerms}
                </p>
              </div>
            </div>

            {/* Second Meta Row: Financials & Due Date */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-base md:text-lg pt-1">
              <div>
                <p className="text-secondary-subheading text-xs md:text-sm">
                  Total
                </p>
                <p className="font-normal text-primary-heading mt-0.5">
                  {data.totalAmount}
                </p>
              </div>

              {isPaid ? (
                <>
                  <div>
                    <p className="text-secondary-subheading text-xs md:text-sm">
                      Paid
                    </p>
                    <p className="font-normal text-primary-heading mt-0.5">
                      $0.00
                    </p>
                  </div>
                  <div>
                    <p className="text-secondary-subheading text-xs md:text-sm">
                      Amount Due
                    </p>
                    <p className="font-normal text-primary-heading mt-0.5">
                      {data.totalAmount}
                    </p>
                  </div>
                </>
              ) : data.remainingAmount ? (
                <>
                  <div>
                    <p className="text-secondary-subheading text-xs md:text-sm">
                      Paid
                    </p>
                    <p className="font-normal text-primary-heading mt-0.5">
                      {data.amountPaid}
                    </p>
                  </div>
                  <div>
                    <p className="text-secondary-subheading text-xs md:text-sm">
                      Remaining
                    </p>
                    <p className="font-normal text-primary-heading mt-0.5">
                      {data.remainingAmount}
                    </p>
                  </div>
                </>
              ) : (
                <div>
                  <p className="text-secondary-subheading text-xs md:text-sm">
                    Amount Payable
                  </p>
                  <p className="font-normal text-primary-heading mt-0.5">
                    {data.amountPayable}
                  </p>
                </div>
              )}

              <div>
                <p className="text-secondary-subheading text-xs md:text-sm">
                  Due Date
                </p>
                <p className="font-normal text-primary-heading mt-0.5">
                  {data.dueDate}
                </p>
              </div>
            </div>

            {/* Divider */}
            <hr className="border-border" />

            {/* Billed By & Billed To Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 pt-1">
              {/* Billed By */}
              <div>
                <p className="text-xs md:text-sm text-secondary-subheading font-normal mb-2.5">
                  Billed By:
                </p>
                <div className="flex items-start gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-border shrink-0 bg-page-bg">
                    <Image
                      src={data.billedBy.avatarUrl || "/images/logo.png"}
                      alt={data.billedBy.name}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-base md:text-lg font-normal text-primary-heading">
                      {data.billedBy.name}
                    </h4>
                    <p className="text-xs md:text-sm text-secondary-subheading truncate mt-0.5">
                      {data.billedBy.email}
                    </p>
                    <p className="text-xs text-secondary-subheading truncate">
                      {data.billedBy.address}
                    </p>
                  </div>
                </div>
              </div>

              {/* Billed To */}
              <div>
                <p className="text-xs md:text-sm text-secondary-subheading font-normal mb-2.5">
                  Billed To:
                </p>
                <div className="flex items-start gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-border shrink-0 bg-page-bg">
                    <Image
                      src={data.billedTo.avatarUrl || "/images/customer_avatar.png"}
                      alt={data.billedTo.name}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-base md:text-lg font-normal text-primary-heading">
                      {data.billedTo.name}
                    </h4>
                    <p className="text-xs md:text-sm text-secondary-subheading truncate mt-0.5">
                      {data.billedTo.email}
                    </p>
                    <p className="text-xs text-secondary-subheading truncate">
                      {data.billedTo.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Invoice Details Table Section (Figma Exact) */}
          <div className="bg-card-bg rounded-sm border border-border p-5 sm:p-6 space-y-4">
            <h3 className="text-base md:text-lg font-medium text-primary-heading">
              Invoice Details
            </h3>

            {/* Bordered Table */}
            <div className="overflow-x-auto rounded-md border border-border bg-card-bg">
              <table className="w-full text-left border-collapse text-xs md:text-sm">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-border text-secondary-subheading">
                    <th className="py-3 px-5 font-normal">Description</th>
                    <th className="py-3 px-5 font-normal">Quantity</th>
                    <th className="py-3 px-5 font-normal">Rate</th>
                    <th className="py-3 px-5 font-normal">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {data.lineItems.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-page-bg/40 transition-colors bg-card-bg"
                    >
                      <td className="py-3.5 px-5 font-normal text-primary hover:underline cursor-pointer">
                        {item.description}
                      </td>
                      <td className="py-3.5 px-5 text-secondary-subheading font-normal">
                        {item.quantity}
                      </td>
                      <td className="py-3.5 px-5 text-secondary-subheading font-normal">
                        {item.rate}
                      </td>
                      <td className="py-3.5 px-5 font-semibold text-primary-heading">
                        {item.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bottom Row: Notes + Summary Breakdown (Figma Exact) */}
            <div className="flex flex-col md:flex-row items-start justify-between gap-6 pt-4">
              {/* Left: Notes Box */}
              <div className="w-full md:max-w-md bg-[#F4F5F7] rounded-md p-4 sm:p-5 space-y-2">
                <p className="font-medium text-sm md:text-base text-primary-heading">
                  Notes
                </p>
                <ul className="list-disc list-inside space-y-1 text-xs md:text-sm text-secondary-subheading leading-relaxed pl-0.5">
                  {data.notes.map((note, idx) => (
                    <li key={idx}>{note}</li>
                  ))}
                </ul>
              </div>

              {/* Right: Bordered Financial Breakdown Card */}
              <div className="w-full md:w-72 lg:w-80 ml-auto border border-border rounded-md bg-card-bg p-4 sm:p-5 space-y-2.5 text-xs md:text-sm">
                <div className="flex items-center justify-between text-secondary-subheading">
                  <span>Subtotal</span>
                  <span className="font-medium text-primary-heading">
                    {data.subtotal}
                  </span>
                </div>

                <div className="flex items-center justify-between text-secondary-subheading">
                  <span>Discount</span>
                  <span className="font-medium text-primary-heading">
                    {data.discount}
                  </span>
                </div>

                <div className="flex items-center justify-between text-secondary-subheading">
                  <span>Tax</span>
                  <span className="font-medium text-primary-heading">
                    {data.tax}
                  </span>
                </div>

                <div className="pt-3 flex items-center justify-between font-semibold text-sm md:text-base text-primary-heading">
                  <span>Total</span>
                  <span>{data.total}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Billing History Section on Paid Details Page (Figma Screenshot 4) */}
          {isPaid && (
            <BillingHistory
              items={billingHistoryItems}
              onViewReceipt={() => setIsReceiptModalOpen(true)}
              onDownloadReceipt={handleDownloadReceipt}
              className="mt-6"
            />
          )}
        </div>

        {/* Right Column: Payment & Billing Card (Only shown if NOT paid) */}
        {!isPaid && (
          <div className="lg:col-span-1">
            <div className="bg-card-bg rounded-sm border border-border p-5 sm:p-6 sticky top-6 space-y-4">
              <h3 className="text-lg md:text-xl font-medium text-primary-heading">
                Payment & Billing
              </h3>

              <hr className="border-border" />

              <div>
                <p className="text-base md:text-lg text-secondary-subheading">
                  Amount Due
                </p>
                <p className="text-xl md:text-2xl font-medium text-primary mt-1">
                  {data.amountPayable}
                </p>
              </div>

              {/* Pay Online with Clover Hosted Checkout */}
              <button
                type="button"
                disabled={isRedirectingToClover}
                onClick={() => handlePayWithClover(false)}
                className="mt-3 w-full py-2.5 sm:py-3 bg-primary hover:bg-primary-hover disabled:opacity-75 text-white font-medium text-sm md:text-base rounded-xs transition-colors cursor-pointer shadow-2xs flex items-center justify-center gap-2"
              >
                {isRedirectingToClover ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                    <span>Redirecting to Clover...</span>
                  </>
                ) : (
                  <span>Pay Online Now</span>
                )}
              </button>

              {/* Development helper to test Failed state if needed */}
              <div className="pt-1 flex items-center justify-between text-[11px] text-secondary-subheading">
                <span>Secure payment via Clover</span>
                <button
                  type="button"
                  onClick={() => handlePayWithClover(true)}
                  className="hover:underline text-secondary-subheading hover:text-decline cursor-pointer"
                >
                  Test failure
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Payment Receipt Modal (Figma Screenshot 1) */}
      <PaymentReceiptModal
        isOpen={isReceiptModalOpen}
        onClose={() => setIsReceiptModalOpen(false)}
        onBackToHome={() => router.push("/customer/invoices")}
        onDownloadReceipt={handleDownloadReceipt}
        receiptData={{
          companyName: data.billedBy.name,
          companyCategory: "Lawn Care",
          invoiceId: data.id,
          transactionId: initialTxId || "#TX 12458",
          customerName: data.billedTo.name,
          propertyAddress: data.propertyAddress,
          completedService: "Landscape & Property Maintenance",
          totalVisit: "03",
          serviceCompletionDate: "Aug 27, 2026",
          paymentDate: "Sep 05, 2026",
          paymentMethod: "Online",
          totalPaid: data.total,
        }}
      />

      {/* Payment Failed Modal (Figma Screenshot 2) */}
      <PaymentFailedModal
        isOpen={isFailedModalOpen}
        onClose={() => setIsFailedModalOpen(false)}
        onTryAgain={() => {
          setIsFailedModalOpen(false);
          handlePayWithClover(false);
        }}
        onContactUs={() => {
          setIsFailedModalOpen(false);
          showToast("Redirecting to HALF STACHE team support...");
        }}
      />
    </div>
  );
};

export default InvoiceDetail;
