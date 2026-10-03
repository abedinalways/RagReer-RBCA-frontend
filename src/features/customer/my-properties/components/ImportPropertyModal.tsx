"use client";

import React, { useState } from "react";
import { ArrowDownToLine, Info } from "lucide-react";
import { Modal } from "@/components/reusable/Modal";
import InfoIcon from "@/components/icons/customer/InfoIcon";

interface ImportPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: (fileName: string) => void;
}

export const ImportPropertyModal: React.FC<ImportPropertyModalProps> = ({
  isOpen,
  onClose,
  onUploadSuccess,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDownloadSample = () => {
    const csvContent =
      "data:text/csv;charset=utf-8,Property Type,Property Name,Street 1,Street 2\nResidential,North Entrance Monument,124 Oak Street,124 Oak Street\nCommercial,South Retention Pond,220 Oakridge Way,220 Oakridge Way";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "sample_properties.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUpload = () => {
    if (selectedFile) {
      onUploadSuccess(selectedFile.name);
      setSelectedFile(null);
    }
  };

  const handleClose = () => {
    setSelectedFile(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Import"
      maxWidth="lg"
    >
      <div className="space-y-5">
        <div>
          <h4 className="text-lg font-semibold text-primary-heading mb-2">
            Download Sample User CSV File
          </h4>

          <div
            onClick={handleDownloadSample}
            role="button"
            tabIndex={0}
            className="border-2 border-dashed border-border-card rounded-lg p-7 flex flex-col items-center justify-center text-center cursor-pointer "
          >
            <div className="w-12 h-12 rounded-full bg-page-bg flex items-center justify-center text-primary mb-2">
              <ArrowDownToLine className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-1.5 text-lg font-medium text-primary-heading mb-2">
            <span>Select CSV File</span>
            <InfoIcon/>
          </div>

          <div className="flex items-center border border-border rounded-md overflow-hidden bg-card-bg">
            <label className="bg-card-bg hover:bg-page-bg border-r border-border px-4 py-2.5 text-sm font-medium text-txt-primary cursor-pointer shrink-0 transition-colors">
              Choose File
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            <span className="px-3 py-2.5 text-sm text-secondary-subheading truncate flex-1">
              {selectedFile ? selectedFile.name : "No file chosen"}
            </span>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="grid grid-cols-2 gap-4 pt-3">
          <button
            type="button"
            onClick={handleClose}
            className="w-full h-11 flex items-center justify-center rounded-md border border-primary bg-card-bg text-primary hover:bg-blue-50/50 text-base font-medium transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleUpload}
            disabled={!selectedFile}
            className="w-full h-11 flex items-center justify-center rounded-md bg-primary hover:bg-primary-hover disabled:opacity-60 text-white text-base font-medium transition-colors cursor-pointer shadow-xs disabled:cursor-not-allowed"
          >
            Upload
          </button>
        </div>
      </div>
    </Modal>
  );
};
