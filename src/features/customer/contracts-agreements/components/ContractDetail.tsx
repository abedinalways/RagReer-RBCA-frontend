"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Check } from "lucide-react";
import { getContractDetailData } from "../data/contractDetailData";
import {
  ContractDetailData,
  ContractSignatureData,
} from "../types/contractsAgreementsTypes";
import ContractOverviewCard from "./ContractOverviewCard";
import ContractServiceDetailsCard from "./ContractServiceDetailsCard";
import ContractPricingCard from "./ContractPricingCard";
import ContractTermsCard from "./ContractTermsCard";
import ContractPropertyCard from "./ContractPropertyCard";
import ContractSchedulingCard from "./ContractSchedulingCard";
import ContractPaymentTermsCard from "./ContractPaymentTermsCard";
import ContractAccessNoteCard from "./ContractAccessNoteCard";
import ContractVersionHistoryCard from "./ContractVersionHistoryCard";
import ContractSignatureModal from "./ContractSignatureModal";
import ContractSignedReviewModal from "./ContractSignedReviewModal";

interface ContractDetailProps {
  contractId?: string;
}

export const ContractDetail: React.FC<ContractDetailProps> = ({
  contractId = "cn-1",
}) => {
  const router = useRouter();
  const [data, setData] = useState<ContractDetailData>(
    getContractDetailData(contractId),
  );
  const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleSignatureConfirm = (sigData: ContractSignatureData) => {
    setData((prev) => ({
      ...prev,
      status: "Contract Signed",
      signatureInfo: sigData,
    }));
    showToast("Contract has been digitally signed and acknowledged!");
  };

  const handleDownload = () => {
    showToast("Downloading agreement document...");
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const isContractSigned =
    data.status === "Contract Signed" || data.status === "Active";

  return (
    <div className="min-h-screen bg-page-bg pb-14 space-y-4">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-primary-dark text-white px-4 py-2.5 rounded-md shadow-lg flex items-center gap-2 text-xs sm:text-sm animate-in fade-in slide-in-from-top-2">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => router.push("/customer/contracts")}
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-primary hover:text-primary-hover transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-xl md:text-2xl font-medium text-primary-heading tracking-tight">
              Contract {data.contractId}
            </h1>

            {data.status === "Pending Approval" ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-xs text-xs font-medium bg-badge-pending-bg text-badge-pending-text border border-badge-pending-border/50">
                <span className="w-1.5 h-1.5 rounded-full bg-badge-pending-dot" />
                Pending Approval
              </span>
            ) : isContractSigned ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-xs text-xs font-medium bg-badge-active-bg text-badge-active-text border border-badge-active-border">
                <span className="w-1.5 h-1.5 rounded-full bg-badge-active-dot" />
                Contract Signed
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-xs text-xs font-medium bg-surface/50 text-secondary-subheading border border-border">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary-subheading" />
                {data.status}
              </span>
            )}
          </div>

          <p className="text-xs sm:text-sm text-secondary-subheading">
            Issued on {data.issueDate} • {data.version}
          </p>
        </div>

        {/* Top Right Download Button */}
        <div>
          <button
            type="button"
            onClick={handleDownload}
            className="w-full sm:w-auto px-5 py-2 text-xs sm:text-sm font-medium bg-primary hover:bg-primary-hover text-white rounded-md transition-colors cursor-pointer shadow-2xs flex items-center justify-center gap-1.5"
          >
            Download
          </button>
        </div>
      </div>

      {/* Main 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 items-start">
        {/* Left Column (2/3 width on desktop) */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-5">
          <ContractOverviewCard data={data} />
          <ContractServiceDetailsCard data={data} />
          <ContractPricingCard data={data} />
          <ContractTermsCard
            data={data}
            onReviewAndSign={() => setIsSignatureModalOpen(true)}
            onViewSignedDocument={() => setIsReviewModalOpen(true)}
            isSigned={isContractSigned}
          />
        </div>

        {/* Right Column (1/3 width on desktop) */}
        <div className="space-y-4 sm:space-y-5">
          <ContractPropertyCard property={data.property} />
          <ContractSchedulingCard scheduling={data.schedulingDetails} />
          <ContractPaymentTermsCard payment={data.paymentTerms} />
          <ContractAccessNoteCard note={data.accessNote} />
          <ContractVersionHistoryCard
            onOpen={() => showToast("Showing version history for #CN-1024-v1")}
          />
        </div>
      </div>

      {/* Signature Creation Modal */}
      <ContractSignatureModal
        isOpen={isSignatureModalOpen}
        onClose={() => setIsSignatureModalOpen(false)}
        onConfirm={handleSignatureConfirm}
        initialOrgName="Coastline Group"
        initialPersonName="Sarah William"
      />

      {/* Signed Document Review Modal */}
      <ContractSignedReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        signatureInfo={data.signatureInfo}
        documentVersion={data.documentVersion || "Document version #CN-1024-v1"}
      />
    </div>
  );
};

export default ContractDetail;
