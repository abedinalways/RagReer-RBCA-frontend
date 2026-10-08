"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronDown, Calendar, UploadCloud } from "lucide-react";
import { CompanySettings } from "../types";

interface GeneralTabProps {
  settings: CompanySettings;
  onChange: (settings: CompanySettings) => void;
}

export function GeneralTab({ settings, onChange }: GeneralTabProps) {
  const [formData, setFormData] = useState<CompanySettings>(settings);

  const handleFieldChange = (field: keyof CompanySettings, value: string) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onChange(updated);
  };

  return (
    <div className="space-y-8 divide-y divide-border/60">
      {/* Section 1: Company Profile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 pt-0">
        <div className="lg:col-span-4">
          <h3 className="text-[1.125rem] font-bold text-primary-heading">
            Account Details
          </h3>
          <p className="text-xs sm:text-sm text-secondary-subheading mt-1 leading-relaxed">
            Edit or complete your company information
          </p>
        </div>

        <div className="lg:col-span-8 space-y-4">
          {/* Company Name */}
          <div>
            <label className="block text-xs sm:text-sm md:text-base font-medium text-txt-primary mb-1">
              Company Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleFieldChange("name", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-md border border-border bg-card-bg text-sm md:text-base text-txt-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
            />
          </div>

          {/* Company Email */}
          <div>
            <label className="block text-xs sm:text-sm md:text-base font-medium text-txt-primary mb-1">
              Company Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleFieldChange("email", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-md border border-border bg-card-bg text-sm md:text-base text-txt-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
            />
          </div>

          {/* Company Phone */}
          <div>
            <label className="block text-xs sm:text-sm md:text-base font-medium text-txt-primary mb-1">
              Company Phone
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => handleFieldChange("phone", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-md border border-border bg-card-bg text-sm md:text-base text-txt-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
            />
          </div>

          {/* Company Website */}
          <div>
            <label className="block text-xs sm:text-sm md:text-base font-medium text-txt-primary mb-1">
              Company Website
            </label>
            <input
              type="text"
              value={formData.website}
              onChange={(e) => handleFieldChange("website", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-md border border-border bg-card-bg text-sm md:text-base text-txt-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
            />
          </div>

          {/* Logo Upload */}
          <div>
            <label className="block text-xs sm:text-sm md:text-base font-medium text-txt-primary mb-1">
              Logo
            </label>
            <div className="flex items-center gap-3.5 p-3 rounded-md border border-border/70 bg-page-bg/30">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-border bg-white flex items-center justify-center shrink-0">
                <Image
                  src={formData.logoUrl || "/images/customer_avatar.png"}
                  alt="Company Logo"
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              <div className="flex-1 cursor-pointer">
                <span className="text-sm md:text-base font-medium text-txt-primary hover:text-primary transition-colors block">
                  Upload your company logo
                </span>
                <span className="text-xs text-secondary-subheading block">
                  (SVG, PNG, JPG)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Address Information */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 pt-8">
        <div className="lg:col-span-4">
          <h3 className="text-[1.125rem] font-bold text-primary-heading">
            Account Details
          </h3>
          <p className="text-xs sm:text-sm text-secondary-subheading mt-1 leading-relaxed">
            This address will appear on your invoice.
          </p>
        </div>

        <div className="lg:col-span-8 space-y-4">
          {/* Address */}
          <div>
            <label className="block text-xs sm:text-sm md:text-base font-medium text-txt-primary mb-1">
              Address
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleFieldChange("address", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-md border border-border bg-card-bg text-sm md:text-base text-txt-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
            />
          </div>

          {/* Country or Region */}
          <div>
            <label className="block text-xs sm:text-sm md:text-base font-medium text-txt-primary mb-1">
              Country or Region
            </label>
            <input
              type="text"
              value={formData.country}
              onChange={(e) => handleFieldChange("country", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-md border border-border bg-card-bg text-sm md:text-base text-txt-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
            />
          </div>

          {/* City & Postal Code */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs sm:text-sm md:text-base font-medium text-txt-primary mb-1">
                City
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleFieldChange("city", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-md border border-border bg-card-bg text-sm md:text-base text-txt-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm md:text-base font-medium text-txt-primary mb-1">
                Postal Code
              </label>
              <input
                type="text"
                value={formData.postalCode}
                onChange={(e) => handleFieldChange("postalCode", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-md border border-border bg-card-bg text-sm md:text-base text-txt-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Localization / Timezone */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 pt-8">
        <div className="lg:col-span-4">
          <h3 className="text-[1.125rem] font-bold text-primary-heading">
            Account Details
          </h3>
          <p className="text-xs sm:text-sm text-secondary-subheading mt-1 leading-relaxed">
            This address will appear on your invoice.
          </p>
        </div>

        <div className="lg:col-span-8 space-y-4">
          {/* Timezone */}
          <div>
            <label className="block text-xs sm:text-sm md:text-base font-medium text-txt-primary mb-1">
              Timezone
            </label>
            <div className="relative">
              <select
                value={formData.timezone}
                onChange={(e) => handleFieldChange("timezone", e.target.value)}
                className="appearance-none w-full bg-card-bg border border-border rounded-md px-3.5 py-2.5 pr-8 text-sm md:text-base text-txt-primary focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer transition-colors"
              >
                <option value="(UTC + 09:00) USA">(UTC + 09:00) USA</option>
                <option value="(UTC - 05:00) Eastern Time (US & Canada)">(UTC - 05:00) Eastern Time (US & Canada)</option>
                <option value="(UTC - 08:00) Pacific Time (US & Canada)">(UTC - 08:00) Pacific Time (US & Canada)</option>
                <option value="(UTC + 06:00) Dhaka">(UTC + 06:00) Dhaka</option>
              </select>
              <ChevronDown className="w-4 h-4 text-secondary-subheading absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Currency */}
          <div>
            <label className="block text-xs sm:text-sm md:text-base font-medium text-txt-primary mb-1">
              Currency
            </label>
            <div className="relative">
              <select
                value={formData.currency}
                onChange={(e) => handleFieldChange("currency", e.target.value)}
                className="appearance-none w-full bg-card-bg border border-border rounded-md px-3.5 py-2.5 pr-8 text-sm md:text-base text-txt-primary focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer transition-colors"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="CAD">CAD</option>
              </select>
              <ChevronDown className="w-4 h-4 text-secondary-subheading absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Date Format */}
          <div>
            <label className="block text-xs sm:text-sm md:text-base font-medium text-txt-primary mb-1">
              Date Format
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.dateFormat}
                onChange={(e) => handleFieldChange("dateFormat", e.target.value)}
                placeholder="dd/mm/yyyy"
                className="w-full px-3.5 py-2.5 pr-10 rounded-md border border-border bg-card-bg text-sm md:text-base text-txt-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
              />
              <Calendar className="w-4 h-4 text-secondary-subheading absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
