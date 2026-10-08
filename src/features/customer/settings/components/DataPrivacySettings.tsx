"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth";
import DeactivateConfirmModal from "./DeactivateConfirmModal";

export const DataPrivacySettings: React.FC = () => {
  const router = useRouter();
  const { logOut } = useAuth();

  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
  const [downloadRequested, setDownloadRequested] = useState(false);

  const handleDownloadData = () => {
    setDownloadRequested(true);
    setTimeout(() => {
      setDownloadRequested(false);
    }, 4000);
  };

  const handleConfirmDeactivate = async () => {
    setIsDeactivateModalOpen(false);
    await logOut();
    router.replace("/login");
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* 1. Request Data Card matching Figma Screenshot 3 */}
      <div className="bg-card-bg rounded-sm border border-border p-5 sm:p-7 shadow-2xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h4 className="text-base md:text-lg font-medium text-txt-primary">
            Request a copy of all your account data
          </h4>
          <p className="text-sm md:text-base text-secondary-subheading font-normal mt-0.5">
            We&apos;ll email you a download link within 24 hours.
          </p>
        </div>

        <button
          type="button"
          onClick={handleDownloadData}
          className="bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-medium px-5 py-2.5 rounded-xs shadow-2xs transition-colors cursor-pointer whitespace-nowrap self-start sm:self-auto"
        >
          Download My Data
        </button>
      </div>

      {/* 2. Deactivate Account Card matching Figma Screenshot 3 */}
      <div className="bg-card-bg rounded-sm border border-border p-5 sm:p-7 shadow-2xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h4 className="text-base md:text-lg font-medium text-txt-primary">
            Deactivate account
          </h4>
          <p className="text-sm md:text-base text-secondary-subheading font-normal mt-0.5 max-w-xl">
            Your login access will be removed. All contracts, invoices, and
            service records will be retained as required by law.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsDeactivateModalOpen(true)}
          className="bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-medium px-5 py-2.5 rounded-xs shadow-2xs transition-colors cursor-pointer whitespace-nowrap self-start sm:self-auto"
        >
          Deactivate Now
        </button>
      </div>

      {/* Download Request Success Toast Notice */}
      {downloadRequested && (
        <div className="fixed bottom-5 right-5 z-50 bg-primary text-white text-xs sm:text-sm px-4 py-3 rounded-md shadow-lg animate-in slide-in-from-bottom duration-200">
          Data export request received. A download link will be emailed to you within 24 hours.
        </div>
      )}

      {/* Deactivate Confirmation Modal (Figma Screenshot 4 & 5) */}
      <DeactivateConfirmModal
        isOpen={isDeactivateModalOpen}
        onClose={() => setIsDeactivateModalOpen(false)}
        onConfirm={handleConfirmDeactivate}
      />
    </div>
  );
};

export default DataPrivacySettings;
