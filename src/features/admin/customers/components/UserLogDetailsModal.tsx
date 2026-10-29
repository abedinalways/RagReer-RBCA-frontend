"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { CustomerLogItem } from "../types/customerLogHistory.types";

interface UserLogDetailsModalProps {
  log: CustomerLogItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const UserLogDetailsModal: React.FC<UserLogDetailsModalProps> = ({
  log,
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !log) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-card-bg rounded-xl border border-border shadow-2xl max-w-lg w-full p-6 space-y-6 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h2 className="text-xl font-medium text-primary-heading font-barlow-condensed">
            User Log Details
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-secondary-subheading hover:text-primary-heading p-1 rounded-md hover:bg-page-bg transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2-Column Grid (Figma Image 2) */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-xs sm:text-sm">
          {/* Status & Country */}
          <div className="space-y-0.5">
            <p className="font-medium text-primary-heading">Status</p>
            <p className="text-secondary-subheading">{log.status || "Success"}</p>
          </div>
          <div className="space-y-0.5">
            <p className="font-medium text-primary-heading">Country</p>
            <p className="text-secondary-subheading">{log.country || "United States"}</p>
          </div>

          {/* Country Code & Region */}
          <div className="space-y-0.5">
            <p className="font-medium text-primary-heading">Country Code</p>
            <p className="text-secondary-subheading">{log.countryCode || "US"}</p>
          </div>
          <div className="space-y-0.5">
            <p className="font-medium text-primary-heading">Region</p>
            <p className="text-secondary-subheading">{log.region || "CA"}</p>
          </div>

          {/* Region Name & City */}
          <div className="space-y-0.5">
            <p className="font-medium text-primary-heading">Region Name</p>
            <p className="text-secondary-subheading">{log.regionName || "California"}</p>
          </div>
          <div className="space-y-0.5">
            <p className="font-medium text-primary-heading">City</p>
            <p className="text-secondary-subheading">{log.city || "Stockton"}</p>
          </div>

          {/* Zip & Latitude */}
          <div className="space-y-0.5">
            <p className="font-medium text-primary-heading">Zip</p>
            <p className="text-secondary-subheading">{log.zip || "95207"}</p>
          </div>
          <div className="space-y-0.5">
            <p className="font-medium text-primary-heading">Latitude</p>
            <p className="text-secondary-subheading">{log.latitude || "37.9957"}</p>
          </div>

          {/* Longitude & Timezone */}
          <div className="space-y-0.5">
            <p className="font-medium text-primary-heading">Longitude</p>
            <p className="text-secondary-subheading">{log.longitude || "-121.3224"}</p>
          </div>
          <div className="space-y-0.5">
            <p className="font-medium text-primary-heading">Timezone</p>
            <p className="text-secondary-subheading">{log.timezone || "America/Los_Angeles"}</p>
          </div>

          {/* Isp & Org */}
          <div className="space-y-0.5">
            <p className="font-medium text-primary-heading">Isp</p>
            <p className="text-secondary-subheading">{log.isp || "T-Mobile USA, Inc."}</p>
          </div>
          <div className="space-y-0.5">
            <p className="font-medium text-primary-heading">Org</p>
            <p className="text-secondary-subheading">{log.org || "T-Mobile USA, Inc."}</p>
          </div>

          {/* As & IP */}
          <div className="space-y-0.5">
            <p className="font-medium text-primary-heading">As</p>
            <p className="text-secondary-subheading">{log.as || "AS21928 T-Mobile USA, Inc."}</p>
          </div>
          <div className="space-y-0.5">
            <p className="font-medium text-primary-heading">IP</p>
            <p className="text-secondary-subheading">{log.ip || "172.59.155.161"}</p>
          </div>

          {/* Browser Name & Os Name */}
          <div className="space-y-0.5">
            <p className="font-medium text-primary-heading">Browser Name</p>
            <p className="text-secondary-subheading">{log.browserName || "Chrome"}</p>
          </div>
          <div className="space-y-0.5">
            <p className="font-medium text-primary-heading">Os Name</p>
            <p className="text-secondary-subheading">{log.osName || log.os || "Windows"}</p>
          </div>

          {/* Browser Language & Device Type */}
          <div className="space-y-0.5">
            <p className="font-medium text-primary-heading">Browser Language</p>
            <p className="text-secondary-subheading">{log.browserLanguage || "en"}</p>
          </div>
          <div className="space-y-0.5">
            <p className="font-medium text-primary-heading">Device Type</p>
            <p className="text-secondary-subheading">{log.deviceType || log.device || "Desktop"}</p>
          </div>

          {/* Referrer Host & Referrer Path */}
          <div className="space-y-0.5">
            <p className="font-medium text-primary-heading">Referrer Host</p>
            <p className="text-secondary-subheading">{log.referrerHost || "1"}</p>
          </div>
          <div className="space-y-0.5">
            <p className="font-medium text-primary-heading">Referrer Path</p>
            <p className="text-secondary-subheading">{log.referrerPath || "1"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogDetailsModal;
