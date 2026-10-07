"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronLeft, Check, CreditCard, ShieldCheck } from "lucide-react";
import { getInvoiceDetailData } from "../data/invoicesData";
import { InvoiceDetailData } from "../types/invoicesTypes";
import { StatusBadge } from "./InvoicesColumns";
import PropertyIcon from "@/components/icons/customer/PropertyIcon";
import { Modal } from "@/components/reusable/Modal";

interface InvoiceDetailProps {
  invoiceId?: string;
}

export const InvoiceDetail: React.FC<InvoiceDetailProps> = ({
  invoiceId = "inv-1024",
}) => {
  const router = useRouter();
  const [data, setData] = useState<InvoiceDetailData>(() =>
    getInvoiceDetailData(invoiceId),
  );
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "bank">("card");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handlePayConfirm = () => {
    setData((prev) => ({
      ...prev,
      status: "Paid",
      amountPaid: prev.total,
      remainingAmount: "$0.00",
    }));
    setIsPayModalOpen(false);
    showToast("Payment of " + data.amountPayable + " completed successfully!");
  };

  const handleDownloadReceipt = () => {
    showToast("Downloading invoice receipt...");
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-page-bg pb-14 space-y-4">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-primary-dark text-white px-4 py-2.5 rounded-md shadow-lg flex items-center gap-2 text-xs sm:text-sm animate-in fade-in slide-in-from-top-2">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header: Back + Invoice Title & Badge (Figma Screenshot 3 & 4) */}
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

      {/* Main 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 items-start">
        {/* Left Column (2/3 width on desktop) */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-5">
          {/* Main Invoice Card */}
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
                <p className="text-xs md:text-sm text-secondary-subheading">Date Issued</p>
                <p className="text-sm md:text-base font-medium text-primary-heading">
                  {data.issueDate}
                </p>
              </div>
            </div>

            {/* Divider */}
            <hr className="border-border" />

            {/* Meta Info Grid (Figma Screenshot 3 & 4) */}
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

              {data.remainingAmount ? (
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

          {/* Invoice Details Table Section (Figma Screenshot 3 & 4) */}
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
        </div>

        {/* Right Column (1/3 width on desktop): Payment & Billing Card */}
        <div className="lg:col-span-1">
          <div className="bg-card-bg rounded-sm border border-border p-5 sm:p-6 sticky top-6 space-y-4">
            <h3 className="text-lg md:text-xl font-medium text-primary-heading">
              Payment & Billing
            </h3>

            <hr className="border-border" />

            <div>
              <p className="text-base md:text-lg text-secondary-subheading">
                {data.status === "Paid" ? "Amount Paid" : "Amount Due"}
              </p>
              <p className="text-xl md:text-2xl  font-medium text-primary mt-1">
                {data.status === "Paid" ? data.total : data.amountPayable}
              </p>
            </div>

            {data.status === "Paid" ? (
              <div className="space-y-3 pt-2">
                <div className="p-3 bg-badge-active-bg border border-badge-active-border rounded-xs text-xs text-badge-active-text flex items-center gap-2">
                  <Check className="w-4 h-4 text-badge-active-dot shrink-0" />
                  <span>This invoice has been paid in full.</span>
                </div>
                <button
                  type="button"
                  onClick={handleDownloadReceipt}
                  className="w-full py-2.5 bg-card-bg hover:bg-page-bg border border-border text-primary font-medium text-xs sm:text-sm rounded-xs transition-colors cursor-pointer shadow-2xs"
                >
                  Download Receipt
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsPayModalOpen(true)}
                className="mt-3 w-full py-2.5 sm:py-3 bg-primary hover:bg-primary-hover text-white font-medium text-sm md:text-base rounded-xs transition-colors cursor-pointer shadow-2xs flex items-center justify-center gap-2"
              >
                Pay Online Now
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Pay Online Modal */}
      <Modal
        isOpen={isPayModalOpen}
        onClose={() => setIsPayModalOpen(false)}
        title={
          <span className="text-lg sm:text-xl font-semibold text-primary-heading">
            Pay Invoice {data.id}
          </span>
        }
        maxWidth="md"
        contentClassName="p-5 sm:p-6 space-y-4 text-left"
        footer={
          <div className="grid grid-cols-2 gap-3 w-full">
            <button
              type="button"
              onClick={() => setIsPayModalOpen(false)}
              className="w-full py-2.5 rounded-xs border border-border hover:bg-slate-50 text-secondary-subheading font-medium text-xs sm:text-sm transition-colors cursor-pointer bg-card-bg"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handlePayConfirm}
              className="w-full py-2.5 rounded-xs bg-primary hover:bg-primary-hover text-white font-medium text-xs sm:text-sm transition-colors cursor-pointer shadow-2xs"
            >
              Confirm Pay {data.amountPayable}
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-md">
            <p className="text-xs text-secondary-subheading">Total Due</p>
            <p className="text-xl font-bold text-primary mt-0.5">
              {data.amountPayable}
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-xs sm:text-sm font-semibold text-primary-heading">
              Select Payment Method
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`p-3 rounded-md border text-left flex items-center gap-2.5 cursor-pointer transition-colors ${
                  paymentMethod === "card"
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border text-txt-primary hover:bg-page-bg"
                }`}
              >
                <CreditCard className="w-4 h-4 shrink-0" />
                <span className="text-xs sm:text-sm font-medium">
                  Credit / Debit
                </span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("bank")}
                className={`p-3 rounded-md border text-left flex items-center gap-2.5 cursor-pointer transition-colors ${
                  paymentMethod === "bank"
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border text-txt-primary hover:bg-page-bg"
                }`}
              >
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span className="text-xs sm:text-sm font-medium">
                  Bank / ACH
                </span>
              </button>
            </div>
          </div>

          <p className="text-[11px] text-secondary-subheading leading-relaxed">
            Transactions are encrypted and processed securely. You will receive an instant receipt upon confirmation.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default InvoiceDetail;
