"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ChevronRight,
  Play,
  Check,
  FileText,
  X,
  ChevronDown,
  Clock,
} from "lucide-react";
import toast from "react-hot-toast";
import { DatePickerInput } from "@/components/ui/DatePickerInput";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { ADMIN_ESTIMATES_DATA } from "@/features/admin/estimates/data/adminEstimatesData";
import { BillingTypeOption } from "../types/adminContracts.types";

const SERVICE_AGREEMENT_OPTIONS = [
  "12 month agreement",
  "6 month agreement",
  "Month-to-month agreement",
  "Annual Custom",
];

const REQUEST_TYPE_OPTIONS = ["Recurring", "One-time"];

const FREQUENCY_OPTIONS = [
  "Monthly",
  "Bi-weekly",
  "Weekly",
  "Quarterly",
];

const PAYMENT_TYPE_OPTIONS = ["Recurring", "One-time"];

const BILLING_FREQUENCY_OPTIONS = [
  "Monthly",
  "Per Visit",
  "Quarterly",
  "Annual",
];

const BILLING_TERMS_OPTIONS = ["Net 30", "Due on receipt", "Net 15", "Net 60"];

const BILLING_PREFERENCES_OPTIONS = [
  "Separate Month",
  "Consolidated",
  "Quarterly Summary",
];

const ALL_DAYS_OF_WEEK = [
  "Friday",
  "Saturday",
  "Sunday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Monday",
];

const TIME_OPTIONS = [
  "12:00 AM",
  "01:00 AM",
  "02:00 AM",
  "03:00 AM",
  "04:00 AM",
  "05:00 AM",
  "06:00 AM",
  "07:00 AM",
  "08:00 AM",
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
];

export const CreateContractView: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedEstimateId = searchParams.get("estimateId");

  // Selected estimate state
  const [selectedEstimateId, setSelectedEstimateId] = useState<string>(
    preselectedEstimateId || ""
  );

  // Provider info state
  const [providerInfo, setProviderInfo] = useState(
    "HALF STACHE\nhalfstach@support.com\n999-(1234)-555"
  );

  // Auto-filled metadata
  const [requestedService, setRequestedService] = useState("");
  const [propertyAddress, setPropertyAddress] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerContact, setCustomerContact] = useState("");
  const [serviceAgreementType, setServiceAgreementType] = useState(
    "12 month agreement"
  );
  const [requestType, setRequestType] = useState("Recurring");
  const [frequency, setFrequency] = useState("Monthly");

  // Accordion Expand/Collapse States
  const [expandedSections, setExpandedSections] = useState({
    scope: false,
    services: false,
    schedule: false,
    pricing: false,
    billing: false,
  });

  // Accordion 1: Scope of work
  const [scopeOfWork, setScopeOfWork] = useState(
    "Complete spring lawn cleanup and landscape refresh for the front and back yard, including removal of leaves and debris, bed edging, trimming of ornamental grasses, and a fresh layer of mulch."
  );

  // Accordion 2: Service details
  const [serviceDetails, setServiceDetails] = useState({
    mowing: true,
    trimming: true,
    edging: true,
    blowing: true,
    shrubTrimming: true,
    debrisRemoval: true,
  });

  // Accordion 3: Schedule Service
  const [scheduleStartDate, setScheduleStartDate] = useState("");
  const [scheduleEndDate, setScheduleEndDate] = useState("");
  const [startTime, setStartTime] = useState("02:00 AM");
  const [endTime, setEndTime] = useState("02:00 AM");
  const [selectedDays, setSelectedDays] = useState<string[]>([
    "Monday",
    "Wednesday",
  ]);
  const [isDaysDropdownOpen, setIsDaysDropdownOpen] = useState(false);
  const daysDropdownRef = useRef<HTMLDivElement>(null);
  const [estimatedDuration, setEstimatedDuration] = useState("2hr/day");

  // Accordion 4: Contract Pricing
  const [contractValue, setContractValue] = useState(
    "Auto filled from estiamtion"
  );
  const [paymentType, setPaymentType] = useState("Recurring");
  const [billingFrequency, setBillingFrequency] = useState("Monthly");
  const [billingDate, setBillingDate] = useState("1st of every month");
  const [billingTerms, setBillingTerms] = useState("Net 30");
  const [billingPreferences, setBillingPreferences] =
    useState("Separate Month");

  // Accordion 5: Set Billing Type
  const [billingType, setBillingType] = useState<BillingTypeOption>("Monthly");

  // Estimate Options for dropdown
  const estimateOptions = useMemo(() => {
    return [
      { value: "", label: "Select Request ID" },
      ...ADMIN_ESTIMATES_DATA.map((est) => ({
        value: est.estimateId,
        label: `${est.estimateId} — ${est.customer.name}`,
      })),
    ];
  }, []);

  // Hydrate form when an estimate is selected
  useEffect(() => {
    if (selectedEstimateId) {
      const match = ADMIN_ESTIMATES_DATA.find(
        (e) =>
          e.estimateId.toLowerCase() === selectedEstimateId.toLowerCase() ||
          e.id.toLowerCase() === selectedEstimateId.toLowerCase()
      );
      if (match) {
        setRequestedService(match.serviceType.replace("...", " Care"));
        setPropertyAddress(match.propertyAddress);
        setCustomerName(match.customer.name);
        setCustomerEmail(match.customer.email);
        setCustomerContact(match.customer.phone || "999-(1234)-555");
        setContractValue(match.amount);
      }
    } else {
      // Default placeholder values matching screenshots
      setRequestedService("");
      setPropertyAddress("");
      setCustomerName("");
      setCustomerEmail("");
      setCustomerContact("");
      setContractValue("Auto filled from estiamtion");
    }
  }, [selectedEstimateId]);

  // Click outside to close days multi-select
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        daysDropdownRef.current &&
        !daysDropdownRef.current.contains(e.target as Node)
      ) {
        setIsDaysDropdownOpen(false);
      }
    };
    if (isDaysDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDaysDropdownOpen]);

  // Accordion toggle helper
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Toggle Day in multi-select
  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  // Remove day tag
  const removeDay = (day: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedDays((prev) => prev.filter((d) => d !== day));
  };

  // Form submit handlers
  const handleSaveDraft = () => {
    toast.success("Contract & Agreement saved as draft!");
    router.push("/admin/contracts");
  };

  const handleSendToCustomer = () => {
    toast.success("Contract & Agreement sent to customer!");
    router.push("/admin/contracts");
  };

  return (
    <div className="w-full space-y-4 md:space-y-5 max-w-[1200px]  animate-in fade-in duration-200 pb-12">
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs sm:text-sm text-secondary-subheading font-normal">
        <Link
          href="/admin/contracts"
          className="hover:text-primary transition-colors cursor-pointer"
        >
          Contracts
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-secondary-subheading/70" />
        <span className="text-txt-primary font-medium">
          Create Contract & agreement
        </span>
      </nav>

      {/* 2. Main Form Card */}
      <div className="rounded-sm border border-border bg-card-bg p-6 sm:p-8 space-y-6 shadow-2xs">
        {/* Title */}
        <h1 className="font-barlow-condensed font-medium text-xl md:text-2xl text-primary-heading leading-tight tracking-tight">
          Create New Contract & Agreement
        </h1>

        {/* Provider Section */}
        <div className="space-y-1.5">
          <label className="block text-base md:text-lg font-medium text-primary-heading">
            Provider
          </label>
          <textarea
            rows={4}
            value={providerInfo}
            onChange={(e) => setProviderInfo(e.target.value)}
            placeholder="Provider details..."
            className="w-full rounded-sm border border-border bg-card-bg p-3 text-xs md:text-sm text-secondary-subheading font-normal leading-relaxed focus:border-primary focus:outline-hidden transition-colors resize-y"
          />
        </div>

        {/* Row 1: Estimate ID, Requested Service, Property Address */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-base md:text-lg font-medium text-primary-heading mb-1.5">
              Estimate ID
            </label>
            <CustomSelect
              options={estimateOptions}
              value={selectedEstimateId}
              onChange={(val) => setSelectedEstimateId(val)}
              placeholder="Select Request ID"
              className="w-full"
              triggerClassName="h-9 text-xs sm:text-sm bg-card-bg border-border"
              size="sm"
            />
          </div>

          <div>
            <label className="block text-base md:text-lg font-medium text-primary-heading mb-1.5">
              Requested Service
            </label>
            <input
              type="text"
              readOnly
              value={requestedService}
              placeholder="Auto filled"
              className="w-full h-9 rounded-sm border border-border bg-page-bg/40 px-3 text-xs sm:text-sm text-txt-primary placeholder:text-secondary-subheading/70 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-base md:text-lg font-medium text-primary-heading mb-1.5">
              Property Address
            </label>
            <input
              type="text"
              readOnly
              value={propertyAddress}
              placeholder="Auto filled"
              className="w-full h-9 rounded-sm border border-border bg-page-bg/40 px-3 text-xs sm:text-sm text-txt-primary placeholder:text-secondary-subheading/70 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Row 2: Customer Name, Customer Email, Customer Contact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-base md:text-lg font-medium text-primary-heading mb-1.5">
              Customer Name
            </label>
            <input
              type="text"
              readOnly
              value={customerName}
              placeholder="Auto filled"
              className="w-full h-9 rounded-sm border border-border bg-page-bg/40 px-3 text-xs sm:text-sm text-txt-primary placeholder:text-secondary-subheading/70 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-base md:text-lg font-medium text-primary-heading mb-1.5">
              Customer Email
            </label>
            <input
              type="text"
              readOnly
              value={customerEmail}
              placeholder="Auto filled"
              className="w-full h-9 rounded-sm border border-border bg-page-bg/40 px-3 text-xs sm:text-sm text-txt-primary placeholder:text-secondary-subheading/70 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-base md:text-lg font-medium text-primary-heading mb-1.5">
              Customer Contact
            </label>
            <input
              type="text"
              readOnly
              value={customerContact}
              placeholder="Auto filled"
              className="w-full h-9 rounded-sm border border-border bg-page-bg/40 px-3 text-xs sm:text-sm text-txt-primary placeholder:text-secondary-subheading/70 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Row 3: Service Agreement Type, Request Type, Frequency */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-base md:text-lg font-medium text-primary-heading mb-1.5">
              Service Agreement type
            </label>
            <CustomSelect
              options={SERVICE_AGREEMENT_OPTIONS}
              value={serviceAgreementType}
              onChange={(val) => setServiceAgreementType(val)}
              className="w-full"
              triggerClassName="h-9 text-xs sm:text-sm bg-card-bg border-border"
              size="sm"
            />
          </div>

          <div>
            <label className="block text-base md:text-lg font-medium text-primary-heading mb-1.5">
              Request Type
            </label>
            <CustomSelect
              options={REQUEST_TYPE_OPTIONS}
              value={requestType}
              onChange={(val) => setRequestType(val)}
              className="w-full"
              triggerClassName="h-9 text-xs sm:text-sm bg-card-bg border-border"
              size="sm"
            />
          </div>

          <div>
            <label className="block text-base md:text-lg font-medium text-primary-heading mb-1.5">
              Frequency
            </label>
            <CustomSelect
              options={FREQUENCY_OPTIONS}
              value={frequency}
              onChange={(val) => setFrequency(val)}
              className="w-full"
              triggerClassName="h-9 text-xs sm:text-sm bg-card-bg border-border"
              size="sm"
            />
          </div>
        </div>

        {/* Accordions Container */}
        <div className="space-y-3 pt-2">
          {/* Accordion 1: Scope of Work */}
          <div className="rounded-sm border border-border bg-card-bg overflow-hidden transition-all">
            <button
              type="button"
              onClick={() => toggleSection("scope")}
              className="w-full py-3 px-4 flex items-center justify-between text-left hover:bg-page-bg/30 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Play
                  className={`h-3 w-3 fill-current text-primary transition-transform duration-150 ${
                    expandedSections.scope ? "rotate-90" : ""
                  }`}
                />
                <span className="font-barlow-condensed font-medium text-base md:text-lg text-primary-heading">
                  Scope of Work
                </span>
              </div>
              <Check className="h-4 w-4 text-primary shrink-0" />
            </button>
            {expandedSections.scope && (
              <div className="p-4 border-t border-border-subtle bg-page-bg/20 space-y-2 animate-in fade-in duration-100">
                <textarea
                  rows={3}
                  value={scopeOfWork}
                  onChange={(e) => setScopeOfWork(e.target.value)}
                  className="w-full rounded-sm border border-border bg-card-bg p-3 text-xs sm:text-sm text-txt-primary leading-relaxed focus:border-primary focus:outline-hidden"
                />
              </div>
            )}
          </div>

          {/* Accordion 2: Service Details */}
          <div className="rounded-sm border border-border bg-card-bg overflow-hidden transition-all">
            <button
              type="button"
              onClick={() => toggleSection("services")}
              className="w-full py-3 px-4 flex items-center justify-between text-left hover:bg-page-bg/30 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Play
                  className={`h-3 w-3 fill-current text-primary transition-transform duration-150 ${
                    expandedSections.services ? "rotate-90" : ""
                  }`}
                />
                <span className="font-barlow-condensed font-medium text-base md:text-lg text-primary-heading">
                  Service Details
                </span>
              </div>
              <Check className="h-4 w-4 text-primary shrink-0" />
            </button>
            {expandedSections.services && (
              <div className="p-4 border-t border-border-subtle bg-page-bg/20 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs animate-in fade-in duration-100">
                <div className="p-3 rounded-sm border border-border bg-card-bg space-y-2">
                  <span className="font-medium text-primary block">
                    Lawn Care Work Included:
                  </span>
                  <div className="space-y-1.5 text-secondary-subheading">
                    {["Mowing", "Trimming", "Edging", "Blowing"].map((s, i) => (
                      <label
                        key={i}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          defaultChecked
                          className="rounded-xs border-border text-primary focus:ring-0"
                        />
                        <span>{s}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="p-3 rounded-sm border border-border bg-card-bg space-y-2">
                  <span className="font-medium text-primary block">
                    Additional Services Included:
                  </span>
                  <div className="space-y-1.5 text-secondary-subheading">
                    {[
                      "Trim designated shrubs/hedges",
                      "Remove resulting debris",
                      "Edging",
                      "Blowing",
                    ].map((s, i) => (
                      <label
                        key={i}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          defaultChecked
                          className="rounded-xs border-border text-primary focus:ring-0"
                        />
                        <span>{s}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Accordion 3: Schedule Service (Screenshots 2 & 3) */}
          <div className="rounded-sm border border-border bg-card-bg overflow-hidden transition-all">
            <button
              type="button"
              onClick={() => toggleSection("schedule")}
              className="w-full py-3 px-4 flex items-center justify-between text-left hover:bg-page-bg/30 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Play
                  className={`h-3 w-3 fill-current text-primary transition-transform duration-150 ${
                    expandedSections.schedule ? "rotate-90" : ""
                  }`}
                />
                <span className="font-barlow-condensed font-medium text-base md:text-lg text-primary-heading">
                  Schedule Service
                </span>
              </div>
              {(scheduleStartDate || selectedDays.length > 0) && (
                <Check className="h-4 w-4 text-primary shrink-0" />
              )}
            </button>

            {expandedSections.schedule && (
              <div className="p-4 sm:p-5 border-t border-border-subtle bg-card-bg space-y-4 animate-in fade-in duration-100">
                {/* Row 1: Schedule Start Date & End Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-primary-heading mb-1.5">
                      Schedule Start Date
                    </label>
                    <DatePickerInput
                      value={scheduleStartDate}
                      onChange={setScheduleStartDate}
                      placeholder="dd/mm/yyyy"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-medium text-primary-heading mb-1.5">
                      Schedule End Date
                    </label>
                    <DatePickerInput
                      value={scheduleEndDate}
                      onChange={setScheduleEndDate}
                      placeholder="dd/mm/yyyy"
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Row 2: Start Time & End Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-primary-heading mb-1.5">
                      Start Time
                    </label>
                    <div className="relative">
                      <CustomSelect
                        options={TIME_OPTIONS}
                        value={startTime}
                        onChange={setStartTime}
                        placeholder="02:00 AM"
                        className="w-full"
                        triggerClassName="h-9 text-xs sm:text-sm bg-card-bg border-border"
                        size="sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-medium text-primary-heading mb-1.5">
                      End Time
                    </label>
                    <div className="relative">
                      <CustomSelect
                        options={TIME_OPTIONS}
                        value={endTime}
                        onChange={setEndTime}
                        placeholder="02:00 AM"
                        className="w-full"
                        triggerClassName="h-9 text-xs sm:text-sm bg-card-bg border-border"
                        size="sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 3: Days of Week & Estimated Duration */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Multi-select Days of Week matching Screenshot 3 */}
                  <div className="relative" ref={daysDropdownRef}>
                    <label className="block text-xs md:text-sm font-medium text-primary-heading mb-1.5">
                      Days of Week
                    </label>
                    <div
                      onClick={() => setIsDaysDropdownOpen((prev) => !prev)}
                      className="min-h-9 w-full rounded-sm border border-border bg-card-bg px-2.5 py-1.5 flex items-center justify-between gap-2 cursor-pointer hover:border-primary/40 transition-colors"
                    >
                      <div className="flex flex-wrap items-center gap-1.5 flex-1 min-w-0">
                        {selectedDays.length === 0 ? (
                          <span className="text-xs md:text-sm text-secondary-subheading/70 font-normal">
                            Select days
                          </span>
                        ) : (
                          selectedDays.map((day) => (
                            <span
                              key={day}
                              className="inline-flex items-center gap-1.5 bg-[#EFF8FF] text-[#175CD3] border border-[#B2DDFF] px-2 py-0.5 rounded-xs text-[11px] font-medium"
                            >
                              <span>{day}</span>
                              <span
                                onClick={(e) => removeDay(day, e)}
                                className="text-[#175CD3] hover:text-decline transition-colors cursor-pointer text-xs ml-0.5"
                              >
                                ×
                              </span>
                            </span>
                          ))
                        )}
                      </div>
                      <ChevronDown
                        className={`h-4 w-4 text-secondary-subheading shrink-0 transition-transform ${
                          isDaysDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>

                    {/* Dropdown with checkboxes matching Screenshot 3 */}
                    {isDaysDropdownOpen && (
                      <div className="absolute left-0 right-0 top-full mt-1 z-30 rounded-sm border border-border bg-card-bg py-1 shadow-lg animate-in fade-in duration-100 max-h-48 overflow-y-auto">
                        {ALL_DAYS_OF_WEEK.map((day) => {
                          const isSelected = selectedDays.includes(day);
                          return (
                            <div
                              key={day}
                              onClick={() => toggleDay(day)}
                              className={`flex items-center gap-2.5 px-3 py-2 text-xs cursor-pointer transition-colors ${
                                isSelected
                                  ? "bg-page-bg/80 text-txt-primary font-medium"
                                  : "text-txt-primary hover:bg-page-bg/40 font-normal"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => {}}
                                className="rounded-xs border-border text-primary focus:ring-0 cursor-pointer"
                              />
                              <span>{day}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Estimated Duration */}
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-primary-heading mb-1.5">
                      Estimated Duration
                    </label>
                    <input
                      type="text"
                      value={estimatedDuration}
                      onChange={(e) => setEstimatedDuration(e.target.value)}
                      placeholder="2hr/day"
                      className="w-full h-9 rounded-sm border border-border bg-card-bg px-3 text-xs sm:text-sm text-txt-primary placeholder:text-secondary-subheading/70 focus:border-primary focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Row 4: Estimated Visits Callout matching Screenshot 2 */}
                <div className="p-3 rounded-sm bg-[#FEFBF0] border-l-2 border-l-[#F79009] text-xs md:text-sm space-y-0.5">
                  <p className="text-secondary-subheading font-normal">
                    Estimated Visits: 12
                  </p>
                  <p className="text-secondary-subheading font-normal">
                    Per month: 1
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Accordion 4: Add Contract Pricing (Screenshot 4) */}
          <div className="rounded-sm border border-border bg-card-bg overflow-hidden transition-all">
            <button
              type="button"
              onClick={() => toggleSection("pricing")}
              className="w-full py-3 px-4 flex items-center justify-between text-left hover:bg-page-bg/30 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Play
                  className={`h-3 w-3 fill-current text-primary transition-transform duration-150 ${
                    expandedSections.pricing ? "rotate-90" : ""
                  }`}
                />
                <span className="font-barlow-condensed font-medium text-base md:text-lg text-primary-heading">
                  Add Contract Pricing
                </span>
              </div>
              {!expandedSections.pricing && (
                <Check className="h-4 w-4 text-primary shrink-0" />
              )}
            </button>

            {expandedSections.pricing && (
              <div className="p-4 sm:p-5 border-t border-border-subtle bg-card-bg space-y-4 animate-in fade-in duration-100">
                {/* Row 1: Contract Value, Payment Type, Billing Frequency */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-primary-heading mb-1.5">
                      Contract Value
                    </label>
                    <input
                      type="text"
                      value={contractValue}
                      onChange={(e) => setContractValue(e.target.value)}
                      placeholder="Auto filled from estiamtion"
                      className="w-full h-9 rounded-sm border border-border bg-card-bg px-3 text-xs sm:text-sm text-txt-primary placeholder:text-secondary-subheading/70 focus:border-primary focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-medium text-primary-heading mb-1.5">
                      Payment Type
                    </label>
                    <CustomSelect
                      options={PAYMENT_TYPE_OPTIONS}
                      value={paymentType}
                      onChange={setPaymentType}
                      className="w-full"
                      triggerClassName="h-9 text-xs md:text-sm bg-card-bg border-border"
                      size="sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-medium text-primary-heading mb-1.5">
                      Billing Frequency
                    </label>
                    <CustomSelect
                      options={BILLING_FREQUENCY_OPTIONS}
                      value={billingFrequency}
                      onChange={setBillingFrequency}
                      className="w-full"
                      triggerClassName="h-9 text-xs sm:text-sm bg-card-bg border-border"
                      size="sm"
                    />
                  </div>
                </div>

                {/* Row 2: Billing Date, Billing Terms, Billing Preferences */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-primary-heading mb-1.5">
                      Billing Date
                    </label>
                    <input
                      type="text"
                      value={billingDate}
                      onChange={(e) => setBillingDate(e.target.value)}
                      placeholder="1st of every month"
                      className="w-full h-9 rounded-sm border border-border bg-card-bg px-3 text-xs md:text-sm text-txt-primary placeholder:text-secondary-subheading/70 focus:border-primary focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-medium text-primary-heading mb-1.5">
                      Billing Terms
                    </label>
                    <CustomSelect
                      options={BILLING_TERMS_OPTIONS}
                      value={billingTerms}
                      onChange={setBillingTerms}
                      className="w-full"
                      triggerClassName="h-9 text-xs sm:text-sm bg-card-bg border-border"
                      size="sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-medium text-primary-heading mb-1.5">
                      Billing Preferences
                    </label>
                    <CustomSelect
                      options={BILLING_PREFERENCES_OPTIONS}
                      value={billingPreferences}
                      onChange={setBillingPreferences}
                      className="w-full"
                      triggerClassName="h-9 text-xs sm:text-sm bg-card-bg border-border"
                      size="sm"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Accordion 5: Set Billing Type (Screenshot 5) */}
          <div className="rounded-sm border border-border bg-card-bg overflow-hidden transition-all">
            <button
              type="button"
              onClick={() => toggleSection("billing")}
              className="w-full py-3 px-4 flex items-center justify-between text-left hover:bg-page-bg/30 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Play
                  className={`h-3 w-3 fill-current text-primary transition-transform duration-150 ${
                    expandedSections.billing ? "rotate-90" : ""
                  }`}
                />
                <span className="font-barlow-condensed font-medium text-base md:text-lg text-primary-heading">
                  {expandedSections.billing
                    ? "Set Billing Type"
                    : "Add Billing Type"}
                </span>
              </div>
              {billingType && !expandedSections.billing && (
                <Check className="h-4 w-4 text-primary shrink-0" />
              )}
            </button>

            {expandedSections.billing && (
              <div className="p-4 sm:p-5 border-t border-border-subtle bg-card-bg animate-in fade-in duration-100">
                <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-xs md:text-sm text-txt-primary">
                  {(
                    [
                      "One-Time",
                      "Monthly",
                      "Consolidated Monthly",
                      "Separate Per Property",
                    ] as BillingTypeOption[]
                  ).map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-2 cursor-pointer font-normal hover:text-primary transition-colors"
                    >
                      <input
                        type="radio"
                        name="billingTypeOption"
                        checked={billingType === opt}
                        onChange={() => setBillingType(opt)}
                        className="h-3.5 w-3.5 text-primary border-border focus:ring-0 cursor-pointer"
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Section 4: Acknowledge Terms & Conditions */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center gap-2 text-base md:text-lg font-medium text-primary-heading">
            <FileText className="h-4 w-4 text-secondary-subheading" />
            <span>Acknowledge Terms & Conditions</span>
          </div>

          <div className="rounded-sm border border-border bg-card-bg p-3.5 max-h-36 overflow-y-auto space-y-1 text-sm md:text-base">
            <h4 className="font-medium text-txt-primary">
              1. Rescheduling & Bad Weather Clause
            </h4>
            <p className="text-secondary-subheading font-normal leading-relaxed">
              In the event of adverse weather conditions (including heavy
              rainfall, hurricane warnings, severe lightning, saturated ground
              preventing machinery operation, or extreme wind events) or
              municipal transportation closures, HALF STACHE Lawn Care reserves
              the right to promptly reschedule the scheduled service date to the
              next available safe operating window without penalty.
            </p>
          </div>
        </div>

        {/* Section 5: Bottom Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-border-subtle">
          <button
            type="button"
            onClick={handleSaveDraft}
            className="rounded-xs border border-border bg-card-bg px-5 py-2 text-xs md:text-sm font-medium text-primary hover:bg-page-bg transition-colors cursor-pointer"
          >
            Save as Draft
          </button>
          <button
            type="button"
            onClick={handleSendToCustomer}
            className="rounded-xs bg-primary px-5 py-2 text-xs md:text-sm font-medium text-white shadow-2xs hover:bg-primary-hover transition-colors cursor-pointer"
          >
            Send to Customer
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateContractView;
