"use client";
import React, { useState, useMemo } from "react";
import { Check } from "lucide-react";
import { createContractsColumns } from "./ContractsAgreementsColumns";
import { contractsAgreementsData } from "../data/contractsAgreementsData";
import {
  ContractItem,
  ContractSignatureData,
} from "../types/contractsAgreementsTypes";
import { ReusableTable } from "@/components/reusable/ReusableTable";
import EmptyStateCard from "@/components/reusable/EmptyStateCard";
import { DocumentIcon } from "@/components/icons/DocumentIcon";
import { CustomSelect } from "@/components/ui/CustomSelect";
import ContractActionRequiredCard from "./ContractActionRequiredCard";
import ContractRevisionModal, {
  ContractRevisionFormData,
} from "./ContractRevisionModal";
import ContractSignatureModal from "./ContractSignatureModal";

export const ContractsAgreements: React.FC = () => {
  const [contracts] = useState<ContractItem[]>(contractsAgreementsData);
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  // Action Required & Modal States
  const [showActionRequired, setShowActionRequired] = useState(true);
  const [isRevisionModalOpen, setIsRevisionModalOpen] = useState(false);
  const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleRevisionSubmit = (formData: ContractRevisionFormData) => {
    console.log("Revision submitted:", formData);
    showToast("Change request has been submitted successfully for review.");
  };

  const handleSignatureConfirm = (sigData: ContractSignatureData) => {
    console.log("Signature confirmed:", sigData);
    setShowActionRequired(false);
    showToast("Amendment #1 for contract #CN-1245 has been signed successfully!");
  };

  const filteredContracts = useMemo(() => {
    return contracts.filter((cn) => {
      const matchesStatus =
        selectedStatus === "All Status" ? true : cn.status === selectedStatus;
      return matchesStatus;
    });
  }, [contracts, selectedStatus]);

  const columns = useMemo(
    () =>
      createContractsColumns((cn) => {
        console.log("View contract:", cn);
      }),
    [],
  );

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-primary-dark text-white px-4 py-2.5 rounded-md shadow-lg flex items-center gap-2 text-xs sm:text-sm animate-in fade-in slide-in-from-top-2">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Action Required Card (Figma Screenshot 1) */}
      {showActionRequired && (
        <ContractActionRequiredCard
          contractId="#CN-1245"
          contractSlug="cn-1"
          amendmentLabel="Amendment #1"
          date="Aug 25, 2026"
          priceEstimateLabel="Price Estimate"
          previousPrice="$650/mo"
          newPrice="$720/mo"
          reason="Annual pricing review tied to labor and fuel costs."
          onRequestRevision={() => setIsRevisionModalOpen(true)}
          onReviewAndSign={() => setIsSignatureModalOpen(true)}
        />
      )}

      {filteredContracts.length === 0 ? (
        <div className="pt-8 sm:pt-14 pb-12 flex flex-col items-center justify-center p-4">
          <EmptyStateCard
            icon={<DocumentIcon className="w-7 h-7 text-primary" />}
            title="No Contract on Record"
            description="After a proposal is approved, a formal master service agreement will be issued for digital execution."
            actionLabel="Go to My Requests"
            actionHref="/customer/requests"
            className="max-w-xl"
          />
          {selectedStatus !== "All Status" && (
            <button
              type="button"
              onClick={() => setSelectedStatus("All Status")}
              className="mt-4 text-xs text-primary hover:underline cursor-pointer font-medium"
            >
              Reset Status Filter
            </button>
          )}
        </div>
      ) : (
        <div className="bg-card-bg rounded-sm border border-border">
          {/* Header Section */}
          <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h2 className="text-[1.25rem] font-medium text-primary-heading">
              All Contracts & Agreements
            </h2>
            <div className="w-full sm:w-36">
              <CustomSelect
                value={selectedStatus}
                onChange={(val) => setSelectedStatus(val)}
                options={["All Status", "Pending Approval", "Active"]}
                size="sm"
                align="right"
              />
            </div>
          </div>

          <ReusableTable
            data={filteredContracts}
            columns={columns}
            keyExtractor={(item, idx) => idx}
            pagination={{
              currentPage,
              itemsPerPage,
              onPageChange: setCurrentPage,
              onItemsPerPageChange: setItemsPerPage,
            }}
          />
        </div>
      )}

      {/* Request Revision Modal (Figma Screenshot 2) */}
      <ContractRevisionModal
        isOpen={isRevisionModalOpen}
        onClose={() => setIsRevisionModalOpen(false)}
        onSubmit={handleRevisionSubmit}
      />

      {/* Review & Sign Modal */}
      <ContractSignatureModal
        isOpen={isSignatureModalOpen}
        onClose={() => setIsSignatureModalOpen(false)}
        onConfirm={handleSignatureConfirm}
        initialOrgName="Coastline Group"
        initialPersonName="Sarah William"
      />
    </div>
  );
};

export default ContractsAgreements;
