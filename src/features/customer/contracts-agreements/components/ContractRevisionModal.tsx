"use client";

import React, { useState, useRef } from "react";
import { X } from "lucide-react";
import { Modal } from "@/components/reusable/Modal";
import FileIcon from "@/components/icons/customer/FileIcon";

export interface ContractRevisionFormData {
  description: string;
  attachment?: File | null;
}

interface ContractRevisionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ContractRevisionFormData) => void;
}

export const ContractRevisionModal: React.FC<ContractRevisionModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [description, setDescription] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleReset = () => {
    setDescription("");
    setAttachment(null);
    setIsDragging(false);
    setErrorMessage(null);
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const handleFile = (file: File) => {
    // 5MB limit
    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("File size must not exceed 5MB.");
      return;
    }
    setErrorMessage(null);
    setAttachment(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = () => {
    if (!description.trim()) {
      setErrorMessage("Please describe the changes you would like to request.");
      return;
    }
    onSubmit({
      description: description.trim(),
      attachment,
    });
    handleReset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={
        <span className="text-lg sm:text-xl font-semibold text-primary-heading">
          Request Revision
        </span>
      }
      maxWidth="lg"
      contentClassName="p-5 sm:p-6 space-y-5 text-left"
      footer={
        <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full">
          <button
            type="button"
            onClick={handleClose}
            className="w-full py-2.5 sm:py-3 rounded-xs border border-primary text-primary hover:bg-slate-50 font-medium text-xs sm:text-sm transition-colors cursor-pointer bg-card-bg flex items-center justify-center"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full py-2.5 sm:py-3 rounded-xs bg-primary hover:bg-primary-hover text-white font-medium text-xs sm:text-sm transition-colors cursor-pointer shadow-2xs flex items-center justify-center"
          >
            Submit Change Request
          </button>
        </div>
      }
    >
      {/* What would you like to change? */}
      <div className="space-y-1.5">
        <label className="block text-xs sm:text-sm font-semibold text-primary-heading">
          What would you like to change?
        </label>
        <div className="relative border border-border-input rounded-md focus-within:ring-1 focus-within:ring-primary/40 focus-within:border-primary/50 bg-card-bg">
          <textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value.slice(0, 200));
              if (errorMessage) setErrorMessage(null);
            }}
            rows={4}
            placeholder="Please describe the changes you’d like to request..."
            className="w-full p-3 pb-7 text-xs sm:text-sm focus:outline-none text-primary-heading placeholder:text-secondary-subheading/60 resize-none bg-transparent"
          />
          <div className="absolute bottom-2.5 right-3 text-[11px] sm:text-xs text-secondary-subheading select-none">
            {description.length}/200
          </div>
        </div>
      </div>

      {/* Attachments (optional) */}
      <div className="space-y-1.5">
        <label className="block text-xs sm:text-sm font-semibold text-primary-heading">
          Attachments{" "}
          <span className="font-normal text-secondary-subheading">(optional)</span>
        </label>

        {attachment ? (
          <div className="flex items-center justify-between p-3.5 border border-border rounded-md bg-page-bg/50">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-primary shrink-0">
                <FileIcon className="w-5 h-5 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-medium text-primary-heading truncate">
                  {attachment.name}
                </p>
                <p className="text-[11px] text-secondary-subheading">
                  {(attachment.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setAttachment(null)}
              className="p-1.5 text-secondary-subheading hover:text-decline transition-colors cursor-pointer rounded-xs"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border rounded-md p-6 sm:p-7 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
              isDragging
                ? "border-primary bg-primary/5"
                : "border-border-input bg-card-bg hover:bg-slate-50/50"
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleFileSelect}
              className="hidden"
            />
            <div className="w-12 h-12 rounded-full bg-page-bg flex items-center justify-center text-primary mb-2.5">
              <FileIcon className="w-6 h-6 text-primary" />
            </div>
            <p className="text-xs sm:text-sm text-primary-heading font-medium">
              Drag & Drop image or{" "}
              <span className="text-primary underline cursor-pointer hover:text-primary-hover">
                Browse file
              </span>
            </p>
            <p className="text-[11px] text-secondary-subheading mt-1">
              JPG, PNG or PDF (Max 5MB)
            </p>
          </div>
        )}

        {errorMessage && (
          <p className="text-xs text-decline font-medium pt-1">
            {errorMessage}
          </p>
        )}
      </div>
    </Modal>
  );
};

export default ContractRevisionModal;
