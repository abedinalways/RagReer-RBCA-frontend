"use client";

import React, { useState } from "react";
import { ArrowDownToLine, Info } from "lucide-react";
import { Modal } from "@/components/reusable/Modal";

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
      footer={
        <div className="flex items-center justify-end gap-3 w-full">
          <button
            type="button"
            onClick={handleClose}
            className="px-5 py-2 border border-border rounded-md text-sm font-medium text-txt-primary hover:bg-page-bg transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleUpload}
            disabled={!selectedFile}
            className="px-6 py-2 bg-primary hover:bg-primary-hover disabled:opacity-50 text-white rounded-md text-sm font-medium transition-colors cursor-pointer"
          >
            Upload
          </button>
        </div>
      }
    >
      <div className="space-y-5">
        <div>
          <h4 className="text-sm font-semibold text-primary-heading mb-2">
            Download Sample User CSV File
          </h4>

          <div
            onClick={handleDownloadSample}
            role="button"
            tabIndex={0}
            className="border-2 border-dashed border-border-card rounded-lg p-7 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-blue-50/40 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-primary mb-2">
              <ArrowDownToLine className="w-5 h-5" />
            </div>
            <p className="text-xs font-medium text-secondary-subheading">
              Click to download sample template
            </p>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-1.5 text-sm font-medium text-txt-primary mb-2">
            <span>Select CSV File</span>
            <Info className="w-3.5 h-3.5 text-secondary-subheading" />
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
      </div>
    </Modal>
  );
};
