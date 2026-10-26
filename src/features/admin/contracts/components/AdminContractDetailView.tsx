"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ChevronRight,
  FileText,
  Briefcase,
  CircleDollarSign,
  ChevronDown,
  MapPin,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  AdminContractStatus,
  ContractDetailData,
} from "../types/adminContracts.types";
import {
  DEFAULT_CONTRACT_DETAIL,
  getContractDetailById,
} from "../data/adminContractsData";
import { contractStatusStyles } from "./AdminContractsColumns";
import { AdminContractSignatureReviewModal } from "./AdminContractSignatureReviewModal";
import { AdminContractCorrectionModal } from "./AdminContractCorrectionModal";

interface AdminContractDetailViewProps {
  contractId?: string;
  initialStatus?: AdminContractStatus;
}

export const AdminContractDetailView: React.FC<
  AdminContractDetailViewProps
> = ({ contractId, initialStatus }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryStatus = searchParams.get("status") as AdminContractStatus | null;

  const [data, setData] = useState<ContractDetailData>(DEFAULT_CONTRACT_DETAIL);
  const [currentStatus, setCurrentStatus] = useState<AdminContractStatus>(
    initialStatus || queryStatus || "Draft"
  );
  const [isTermsExpanded, setIsTermsExpanded] = useState(true);
  const [isSignatureReviewOpen, setIsSignatureReviewOpen] = useState(false);
  const [isCorrectionModalOpen, setIsCorrectionModalOpen] = useState(false);

  // Hydrate data based on contractId
  useEffect(() => {
    if (contractId) {
      const loaded = getContractDetailById(contractId);
      setData(loaded);
      if (!initialStatus && !queryStatus) {
        setCurrentStatus(loaded.status);
      }
    }
  }, [contractId, initialStatus, queryStatus]);

  // Action handlers
  const handleSendToCustomer = () => {
    setCurrentStatus("Sent");
    toast.success(`Contract & Agreement sent to ${data.customer.email}!`);
  };

  const handleEdit = () => {
    router.push(
      `/admin/contracts/create?contractId=${encodeURIComponent(data.id)}`
    );
  };

  const handleViewCustomer = () => {
    toast(`Viewing customer: ${data.customer.name}`, { icon: "👤" });
  };

  const handleDownload = () => {
    toast.success("Downloading Contract PDF...");
  };

  const handleSendReminder = () => {
    toast.success(`Reminder sent to ${data.customer.email}!`);
  };

  const handleReviewSignature = () => {
    setIsSignatureReviewOpen(true);
  };

  const handleVerifySignature = () => {
    setIsSignatureReviewOpen(false);
    setCurrentStatus("Active");
    toast.success("Signature verified! Contract is now Active.");
  };

  const handleOpenCorrection = () => {
    setIsSignatureReviewOpen(false);
    setIsCorrectionModalOpen(true);
  };

  const handleSubmitCorrection = (correctionData: {
    selectedIssues: string[];
    message: string;
  }) => {
    setIsCorrectionModalOpen(false);
    setCurrentStatus("Change Requested");
    toast.success("Correction request submitted to customer!");
  };

  const statusStyle = contractStatusStyles[currentStatus] || {
    badgeBg: "bg-page-bg",
    badgeText: "text-secondary-subheading",
    badgeBorder: "border-border",
    dotBg: "bg-secondary-subheading",
  };

  return (
    <div className="w-full space-y-4 md:space-y-5 max-w-[1600px] mx-auto animate-in fade-in duration-200 pb-12">
      {/* 1. Breadcrumbs matching Figma: Contracts & Agreements > Details */}
      <nav className="flex items-center gap-1.5 text-xs sm:text-sm text-secondary-subheading font-normal">
        <Link
          href="/admin/contracts"
          className="hover:text-primary transition-colors cursor-pointer"
        >
          Contracts & Agreements
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-secondary-subheading/70" />
        <span className="text-txt-primary font-medium">Details</span>
      </nav>

      {/* 2. Page Header: Title, Status Badge, Subtitle & Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="font-barlow-condensed font-medium text-xl md:text-2xl text-primary-heading tracking-tight">
              Contract {data.contractId}
            </h1>
            <span
              className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-xs text-xs font-medium ${statusStyle.badgeBg} ${statusStyle.badgeText} border ${statusStyle.badgeBorder} whitespace-nowrap`}
            >
              <span
                className={`w-2 h-2 rounded-full ${statusStyle.dotBg} shrink-0`}
              />
              {currentStatus}
            </span>
          </div>
          <p className="text-xs md:text-sm text-secondary-subheading font-normal">
            Created on {data.createdAt} • Version {data.version}
          </p>
        </div>

        {/* Dynamic Buttons based on status matching Figma Screenshots */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {currentStatus === "Draft" && (
            <>
              <button
                type="button"
                onClick={handleSendToCustomer}
                className="rounded-xs bg-primary px-4 py-2 text-xs md:text-sm font-medium text-white shadow-2xs hover:bg-primary-hover transition-colors cursor-pointer"
              >
                Send to Customer
              </button>
              <button
                type="button"
                onClick={handleEdit}
                className="rounded-xs border border-border bg-card-bg px-4 py-2 text-xs md:text-sm font-medium text-txt-primary hover:bg-page-bg transition-colors cursor-pointer"
              >
                Edit Contract
              </button>
            </>
          )}

          {currentStatus === "Sent" && (
            <>
              <button
                type="button"
                onClick={handleViewCustomer}
                className="rounded-xs bg-primary px-4 py-2 text-xs md:text-sm font-medium text-white shadow-2xs hover:bg-primary-hover transition-colors cursor-pointer"
              >
                View Customer
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="rounded-xs border border-border bg-card-bg px-4 py-2 text-xs md:text-sm font-medium text-txt-primary hover:bg-page-bg transition-colors cursor-pointer"
              >
                Download
              </button>
            </>
          )}

          {(currentStatus === "Pending Sign" ||
            currentStatus === "Pending Signature") && (
            <>
              <button
                type="button"
                onClick={handleSendReminder}
                className="rounded-xs bg-primary px-4 py-2 text-xs md:text-sm font-medium text-white shadow-2xs hover:bg-primary-hover transition-colors cursor-pointer"
              >
                Send Reminder
              </button>
              <button
                type="button"
                onClick={handleViewCustomer}
                className="rounded-xs border border-border bg-card-bg px-4 py-2 text-xs md:text-sm font-medium text-txt-primary hover:bg-page-bg transition-colors cursor-pointer"
              >
                View Customer
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="rounded-xs border border-border bg-card-bg px-4 py-2 text-xs md:text-sm font-medium text-txt-primary hover:bg-page-bg transition-colors cursor-pointer"
              >
                Download
              </button>
            </>
          )}

          {currentStatus === "Signed" && (
            <>
              <button
                type="button"
                onClick={handleReviewSignature}
                className="rounded-xs bg-primary px-4 py-2 text-xs md:text-sm font-medium text-white shadow-2xs hover:bg-primary-hover transition-colors cursor-pointer"
              >
                Review Signature
              </button>
              <button
                type="button"
                onClick={handleViewCustomer}
                className="rounded-xs border border-border bg-card-bg px-4 py-2 text-xs md:text-sm font-medium text-txt-primary hover:bg-page-bg transition-colors cursor-pointer"
              >
                View Customer
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="rounded-xs border border-border bg-card-bg px-4 py-2 text-xs md:text-sm font-medium text-txt-primary hover:bg-page-bg transition-colors cursor-pointer"
              >
                Download
              </button>
            </>
          )}

          {currentStatus !== "Draft" &&
            currentStatus !== "Sent" &&
            currentStatus !== "Pending Sign" &&
            currentStatus !== "Pending Signature" &&
            currentStatus !== "Signed" && (
              <>
                <button
                  type="button"
                  onClick={handleViewCustomer}
                  className="rounded-xs bg-primary px-4 py-2 text-xs md:text-sm font-medium text-white shadow-2xs hover:bg-primary-hover transition-colors cursor-pointer"
                >
                  View Customer
                </button>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="rounded-xs border border-border bg-card-bg px-4 py-2 text-xs md:text-sm font-medium text-txt-primary hover:bg-page-bg transition-colors cursor-pointer"
                >
                  Download
                </button>
              </>
            )}
        </div>
      </div>

      {/* 3. Main Grid Layout: Left Column & Right Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column (8 cols on large screens) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Card 1: Commercial Lawn Care Agreement */}
          <div className="rounded-sm border border-border bg-card-bg p-5 sm:p-6 shadow-2xs space-y-4">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-secondary-subheading" />
              <h2 className="font-barlow-condensed font-medium text-base md:text-lg text-primary-heading">
                {data.agreementTitle}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-4 gap-x-6 text-xs md:text-sm pt-1">
              {/* Column 1 */}
              <div className="space-y-4">
                <div>
                  <span className="block text-secondary-subheading text-xs font-normal mb-1">
                    Provider
                  </span>
                  <div className="text-txt-primary font-normal leading-relaxed text-xs md:text-sm">
                    <p className="font-normal">{data.provider.name}</p>
                    <p className="text-secondary-subheading">
                      {data.provider.email}
                    </p>
                    <p className="text-secondary-subheading">
                      {data.provider.phone}
                    </p>
                  </div>
                </div>

                <div>
                  <span className="block text-secondary-subheading text-xs font-normal mb-1">
                    Service Agreement type
                  </span>
                  <p className="text-txt-primary font-normal text-xs md:text-sm">
                    {data.serviceAgreementType}
                  </p>
                </div>
              </div>

              {/* Column 2 */}
              <div className="space-y-4">
                <div>
                  <span className="block text-secondary-subheading text-xs font-normal mb-1">
                    Customer
                  </span>
                  <div className="text-txt-primary font-normal leading-relaxed text-xs md:text-sm">
                    <p className="font-normal">{data.customer.name}</p>
                    <p className="text-secondary-subheading">
                      {data.customer.email}
                    </p>
                    <p className="text-secondary-subheading">
                      {data.customer.contact}
                    </p>
                  </div>
                </div>

                <div>
                  <span className="block text-secondary-subheading text-xs font-normal mb-1">
                    Contract Duration
                  </span>
                  <p className="text-txt-primary font-normal text-xs md:text-sm">
                    {data.contractDuration}
                  </p>
                </div>
              </div>

              {/* Column 3 */}
              <div className="space-y-4">
                <div>
                  <span className="block text-secondary-subheading text-xs font-normal mb-1">
                    Requested Service
                  </span>
                  <p className="text-txt-primary font-normal text-xs md:text-sm">
                    {data.requestedService}
                  </p>
                </div>

                <div>
                  <span className="block text-secondary-subheading text-xs font-normal mb-1">
                    Contract Value
                  </span>
                  <p className="text-txt-primary font-normal text-xs md:text-sm">
                    {data.contractValue}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Service Details */}
          <div className="rounded-sm border border-border bg-card-bg p-5 sm:p-6 shadow-2xs space-y-4">
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-secondary-subheading" />
              <h2 className="font-barlow-condensed font-medium text-base md:text-lg text-primary-heading">
                Service Details
              </h2>
            </div>

            {/* Scope of Work */}
            <div className="space-y-1.5 pt-1">
              <h3 className="text-xs md:text-sm font-medium text-primary-heading">
                Scope of Work
              </h3>
              <p className="text-xs md:text-sm text-secondary-subheading font-normal leading-relaxed">
                {data.scopeOfWork}
              </p>
            </div>

            {/* Included Services */}
            <div className="space-y-2 pt-2">
              <h3 className="text-xs md:text-sm font-medium text-primary-heading">
                Included Services
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.includedServices.map((service, idx) => (
                  <div
                    key={idx}
                    className="rounded-xs border border-border bg-card-bg p-4 space-y-2"
                  >
                    <h4 className="text-xs md:text-sm font-medium text-primary">
                      {service.title}
                    </h4>
                    <p className="text-xs text-secondary-subheading font-normal">
                      Work Included:
                    </p>
                    <ul className="space-y-1 text-xs text-secondary-subheading font-normal">
                      {service.workIncluded.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-center gap-1.5">
                          <span className="h-1 w-1 rounded-full bg-secondary-subheading shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 3: Contract Pricing */}
          <div className="rounded-sm border border-border bg-card-bg p-5 sm:p-6 shadow-2xs space-y-4">
            <div className="flex items-center gap-2">
              <CircleDollarSign className="h-4 w-4 text-secondary-subheading" />
              <h2 className="font-barlow-condensed font-medium text-base md:text-lg text-primary-heading">
                Contract Pricing
              </h2>
            </div>

            <div className="space-y-2.5 pt-1">
              <h3 className="text-xs md:text-sm font-medium text-primary-heading">
                Line Items
              </h3>

              <div className="rounded-xs border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs md:text-sm border-collapse">
                    <thead>
                      <tr className="bg-page-bg/50 border-b border-border text-secondary-subheading font-normal">
                        <th className="py-2.5 px-4 font-normal">Description</th>
                        <th className="py-2.5 px-4 font-normal">Quantity</th>
                        <th className="py-2.5 px-4 font-normal">Rate</th>
                        <th className="py-2.5 px-4 font-normal">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {data.lineItems.map((item) => (
                        <tr
                          key={item.id}
                          className="hover:bg-page-bg/30 transition-colors"
                        >
                          <td className="py-2.5 px-4 text-primary font-normal">
                            {item.description}
                          </td>
                          <td className="py-2.5 px-4 text-secondary-subheading font-normal">
                            {item.quantity}
                          </td>
                          <td className="py-2.5 px-4 text-secondary-subheading font-normal">
                            {item.rate}
                          </td>
                          <td className="py-2.5 px-4 text-txt-primary font-medium">
                            {item.amount}
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-page-bg/30 border-t border-border">
                        <td
                          colSpan={3}
                          className="py-3 px-4 font-medium text-primary-heading"
                        >
                          Total Estimates
                        </td>
                        <td className="py-3 px-4 text-primary font-medium text-sm md:text-base">
                          {data.totalEstimates}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Acknowledge Terms & Conditions */}
          <div className="rounded-sm border border-border bg-card-bg overflow-hidden shadow-2xs">
            <button
              type="button"
              onClick={() => setIsTermsExpanded((prev) => !prev)}
              className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-page-bg/30 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-secondary-subheading" />
                <h2 className="font-barlow-condensed font-medium text-base md:text-lg text-primary-heading">
                  Acknowledge Terms & Conditions
                </h2>
              </div>
              <ChevronDown
                className={`h-4 w-4 text-secondary-subheading transition-transform duration-150 ${
                  isTermsExpanded ? "rotate-180" : ""
                }`}
              />
            </button>

            {isTermsExpanded && (
              <div className="px-5 pb-5 pt-1 border-t border-border-subtle space-y-1.5 animate-in fade-in duration-100">
                <h4 className="text-xs md:text-sm font-medium text-txt-primary">
                  {data.termsAndConditions.clauseNumber}.{" "}
                  {data.termsAndConditions.title}
                </h4>
                <p className="text-xs md:text-sm text-secondary-subheading font-normal leading-relaxed">
                  {data.termsAndConditions.content}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar Column (4 cols on large screens) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Card 1: Property Card */}
          <div className="rounded-sm border border-border bg-card-bg overflow-hidden shadow-2xs">
            {data.property.imageUrl && (
              <img
                src={data.property.imageUrl}
                alt={data.property.name}
                className="w-full h-44 object-cover border-b border-border"
              />
            )}
            <div className="p-4 space-y-3">
              <div>
                <h3 className="text-sm md:text-base font-medium text-primary-heading">
                  {data.property.name}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-secondary-subheading font-normal mt-1">
                  <MapPin className="h-3.5 w-3.5 text-secondary-subheading/70 shrink-0" />
                  <span className="truncate">{data.property.address}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  toast(`Viewing property: ${data.property.name}`, {
                    icon: "🏢",
                  })
                }
                className="w-full rounded-xs border border-primary text-primary hover:bg-page-bg py-2 text-xs md:text-sm font-medium transition-colors cursor-pointer text-center"
              >
                View Property Details
              </button>
            </div>
          </div>

          {/* Card 2: Service Scheduling Details */}
          <div className="rounded-sm border border-border bg-card-bg p-4 sm:p-5 shadow-2xs space-y-3">
            <h3 className="text-sm md:text-base font-medium text-primary-heading pb-2 border-b border-border-subtle">
              Service Scheduling Details
            </h3>

            <div className="space-y-2.5 text-xs md:text-sm">
              <div className="flex items-center justify-between">
                <span className="text-secondary-subheading font-normal">
                  Frequency
                </span>
                <span className="text-primary font-medium">
                  {data.scheduling.frequency}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-secondary-subheading font-normal">
                  Start Date
                </span>
                <span className="text-primary font-medium">
                  {data.scheduling.startDate}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-secondary-subheading font-normal">
                  End Date
                </span>
                <span className="text-primary font-medium">
                  {data.scheduling.endDate}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-secondary-subheading font-normal">
                  Preferred Time
                </span>
                <span className="text-primary font-medium">
                  {data.scheduling.preferredTime}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-secondary-subheading font-normal">
                  Estimate Duration
                </span>
                <span className="text-primary font-medium">
                  {data.scheduling.estimateDuration}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-secondary-subheading font-normal">
                  Estimate Visit
                </span>
                <span className="text-primary font-medium">
                  {data.scheduling.estimateVisit}
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: Payment Terms */}
          <div className="rounded-sm border border-border bg-card-bg p-4 sm:p-5 shadow-2xs space-y-3">
            <h3 className="text-sm md:text-base font-medium text-primary-heading">
              Payment Terms
            </h3>

            {/* Banner Callout matching Screenshot */}
            <div className="rounded-xs bg-[#B9D3EA]/50 p-3 text-center space-y-0.5">
              <p className="text-base md:text-lg font-medium text-primary">
                {data.paymentTerms.monthlyAmount}
              </p>
              <p className="text-[11px] sm:text-xs text-secondary-subheading font-normal">
                Next payment date: {data.paymentTerms.nextPaymentDate}
              </p>
            </div>

            <div className="space-y-2.5 text-xs md:text-sm pt-1">
              <div className="flex items-center justify-between">
                <span className="text-secondary-subheading font-normal">
                  Payment Type
                </span>
                <span className="text-primary font-medium">
                  {data.paymentTerms.paymentType}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-secondary-subheading font-normal">
                  Billing Frequency
                </span>
                <span className="text-primary font-medium">
                  {data.paymentTerms.billingFrequency}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-secondary-subheading font-normal">
                  Payment Duration
                </span>
                <span className="text-primary font-medium">
                  {data.paymentTerms.paymentDuration}
                </span>
              </div>
            </div>
          </div>

          {/* Card 4: Access Note */}
          <div className="rounded-xs border border-[#ABEFC6] bg-[#ECFDF3]/40 p-3.5 space-y-1.5">
            <h4 className="text-xs md:text-sm font-medium text-txt-primary">
              Access Note
            </h4>
            <p className="text-xs text-secondary-subheading font-normal leading-relaxed">
              {data.accessNote}
            </p>
          </div>
        </div>
      </div>

      {/* Signature Review Modal matching Figma Screenshot */}
      <AdminContractSignatureReviewModal
        isOpen={isSignatureReviewOpen}
        onClose={() => setIsSignatureReviewOpen(false)}
        documentVersion={`Document version ${data.contractId}-v${data.version}`}
        organizationName="Coastline Group"
        authorizedPersonName="Sarah William"
        authority="Property Owner"
        dateOfSignature="27.08.2026"
        onRequestCorrection={handleOpenCorrection}
        onVerifySignature={handleVerifySignature}
      />

      {/* Correction Request Modal matching Figma Screenshot 4 */}
      <AdminContractCorrectionModal
        isOpen={isCorrectionModalOpen}
        onClose={() => setIsCorrectionModalOpen(false)}
        onSubmit={handleSubmitCorrection}
      />
    </div>
  );
};

export default AdminContractDetailView;
