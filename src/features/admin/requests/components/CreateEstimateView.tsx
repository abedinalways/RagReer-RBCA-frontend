"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ChevronRight,
  Play,
  Check,
  FileText,
  Plus,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { DatePickerInput } from "@/components/ui/DatePickerInput";
import { ADMIN_SERVICE_REQUESTS_DATA } from "../data/serviceRequestsData";

interface LineItem {
  id: string;
  service: string;
  qty: number;
  rate: number;
}

const INITIAL_AVAILABLE_SERVICES = [
  "Aeration",
  "Fertilization",
  "Weed Control",
  "Over seeding",
  "Gutter Cleaning",
  "Pressure Washing",
];

const INITIAL_SELECTED_SERVICES = [
  "Leaf Removal",
  "Hedge/Shrub Trimming",
  "Mulching",
];

export const CreateEstimateView: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedRequestId = searchParams.get("requestId");

  // Selected request state
  const [selectedRequestId, setSelectedRequestId] = useState<string>(
    preselectedRequestId || ""
  );

  // Auto-filled fields
  const [requestedService, setRequestedService] = useState("");
  const [propertyAddress, setPropertyAddress] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [requestType, setRequestType] = useState("");
  const [frequency, setFrequency] = useState("");

  // Accordion open/close states (default: notes is open as in screenshots 1 & 2)
  const [expandedSections, setExpandedSections] = useState({
    scope: false,
    services: false,
    lineItems: false,
    notes: true,
  });

  // Accordion 1: Scope of Work
  const [scopeOfWork, setScopeOfWork] = useState(
    "Complete spring lawn cleanup and landscape refresh for the front and back yard, including removal of leaves and debris, bed edging, trimming of ornamental grasses, and a fresh layer of mulch."
  );

  // Accordion 2: Service Details
  const [specificServices, setSpecificServices] = useState({
    mowing: false,
    stringTrimming: false,
    edging: false,
    blowingHardServices: false,
    basicInspection: false,
  });
  const [selectedAdditionalServices, setSelectedAdditionalServices] = useState<string[]>(
    INITIAL_SELECTED_SERVICES
  );
  const [availableAdditionalServices, setAvailableAdditionalServices] = useState<string[]>(
    INITIAL_AVAILABLE_SERVICES
  );

  // Accordion 3: Add Line Items
  const [lineItems, setLineItems] = useState<LineItem[]>([
    {
      id: "li-1",
      service: "Complete spring lawn cleanup and landscape refresh",
      qty: 1,
      rate: 3995,
    },
  ]);
  const [ownerDiscount, setOwnerDiscount] = useState<number>(50);
  const [taxRate, setTaxRate] = useState<number>(5);
  const [estimatedDuration, setEstimatedDuration] = useState("4-5 hours");
  const [validityUntil, setValidityUntil] = useState("10/11/2026");

  // Accordion 4: Add Note (singular as in Figma)
  const [notes, setNotes] = useState(
    "Complete spring lawn cleanup and landscape refresh for the front and back yard, including removal of leaves and debris, bed edging, trimming of ornamental grasses, and a fresh layer of mulch."
  );

  // Terms & Conditions
  const [termsAndConditions, setTermsAndConditions] = useState(
    "Estimate valid for 14 days. Work will be scheduled after contracts & agreements approval. Pricing includes the listed scope only. Additional work requires written approval before it begins."
  );

  // Bottom Toggles & Radios
  const [consolidatedBilling, setConsolidatedBilling] = useState(false);
  const [hasDoneSiteVisit, setHasDoneSiteVisit] = useState<"yes" | "no">("no");

  // Site Visit Requirements Modal State (Screenshot 3)
  const [isSiteVisitModalOpen, setIsSiteVisitModalOpen] = useState(false);
  const [siteAssessmentAdjustment, setSiteAssessmentAdjustment] = useState(
    "During the site visit, we found that the existing sod and debris need to be removed and the soil needs to be leveled before the requested landscaping work can be completed. These required services have been included in the estimate."
  );
  const [siteVisitLineItems, setSiteVisitLineItems] = useState<LineItem[]>([
    {
      id: "sv-1",
      service: "Sod removal and soil leveling",
      qty: 1,
      rate: 450,
    },
  ]);
  const [siteVisitNote, setSiteVisitNote] = useState(
    "We've completed the site assessment and prepared your final estimate. Once you approved the service estimate we will prepare a contracts & agreements for you."
  );

  // Populate fields when request ID is selected
  useEffect(() => {
    if (!selectedRequestId) return;

    const cleanId = selectedRequestId.replace("#", "").toLowerCase();
    const req = ADMIN_SERVICE_REQUESTS_DATA.find(
      (r) =>
        r.requestId.replace("#", "").toLowerCase() === cleanId ||
        r.id.toLowerCase() === cleanId
    );

    if (req) {
      setRequestedService(req.serviceType);
      setPropertyAddress(req.propertyAddress);
      setCustomerName(req.customer.name);
      setRequestType("One - Time");
      setFrequency("Bi-Weekly");
    }
  }, [selectedRequestId]);

  const requestOptions = useMemo(() => {
    return ADMIN_SERVICE_REQUESTS_DATA.map((r) => ({
      value: r.requestId,
      label: `${r.requestId} - ${r.customer.name}`,
    }));
  }, []);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Additional services chips handlers
  const handleAddChip = (service: string) => {
    setAvailableAdditionalServices((prev) => prev.filter((s) => s !== service));
    setSelectedAdditionalServices((prev) => [...prev, service]);
  };

  const handleRemoveChip = (service: string) => {
    setSelectedAdditionalServices((prev) => prev.filter((s) => s !== service));
    setAvailableAdditionalServices((prev) => [...prev, service]);
  };

  // Line item handlers
  const handleAddLineItem = () => {
    setLineItems((prev) => [
      ...prev,
      {
        id: `li-${Date.now()}`,
        service: "",
        qty: 1,
        rate: 0,
      },
    ]);
  };

  const handleRemoveLineItem = (id: string) => {
    if (lineItems.length <= 1) {
      toast.error("At least one line item is required.");
      return;
    }
    setLineItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateLineItem = (
    id: string,
    field: keyof LineItem,
    value: string | number
  ) => {
    setLineItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  // Site Visit Line Item handlers
  const handleAddSiteVisitLine = () => {
    setSiteVisitLineItems((prev) => [
      ...prev,
      {
        id: `sv-${Date.now()}`,
        service: "",
        qty: 1,
        rate: 0,
      },
    ]);
  };

  const handleRemoveSiteVisitLine = (id: string) => {
    if (siteVisitLineItems.length <= 1) {
      toast.error("At least one line item is required.");
      return;
    }
    setSiteVisitLineItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateSiteVisitLine = (
    id: string,
    field: keyof LineItem,
    value: string | number
  ) => {
    setSiteVisitLineItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleSiteVisitRadioChange = (val: "yes" | "no") => {
    setHasDoneSiteVisit(val);
    if (val === "yes") {
      setIsSiteVisitModalOpen(true);
    }
  };

  const handleCloseSiteVisitModal = () => {
    setIsSiteVisitModalOpen(false);
  };

  const handleAddSiteVisitToEstimate = () => {
    // Add valid site visit items to line items
    const validSvItems = siteVisitLineItems.filter(
      (item) => item.service.trim().length > 0 && item.rate > 0
    );
    if (validSvItems.length > 0) {
      setLineItems((prev) => [...prev, ...validSvItems]);
    }
    setHasDoneSiteVisit("yes");
    setIsSiteVisitModalOpen(false);
    toast.success("Site visit requirements added to estimate!");
  };

  // Pricing summary calculation
  const subtotal = useMemo(() => {
    return lineItems.reduce((acc, item) => acc + item.qty * item.rate, 0);
  }, [lineItems]);

  const discountAmount = ownerDiscount || 0;
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const taxAmount = (taxableAmount * (taxRate || 0)) / 100;
  const totalAmount = taxableAmount + taxAmount;

  // Completion indicators for accordions
  const isScopeComplete = scopeOfWork.trim().length > 0;
  const isServicesComplete =
    Object.values(specificServices).some(Boolean) ||
    selectedAdditionalServices.length > 0;
  const isLineItemsComplete = lineItems.some(
    (item) => item.service.trim().length > 0 && item.rate > 0
  );
  const isNotesComplete = notes.trim().length > 0;

  // Submit handlers
  const handleSaveDraft = () => {
    toast.success("Estimate saved as draft successfully!");
    router.push("/admin/requests");
  };

  const handleSendToCustomer = () => {
    if (!selectedRequestId) {
      toast.error("Please select a Request ID before sending.");
      return;
    }
    toast.success("Estimate sent to customer successfully!");
    router.push("/admin/requests");
  };

  return (
    <div className="w-full space-y-5 md:space-y-6 max-w-5xl pb-12 animate-in fade-in duration-200">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs sm:text-sm text-secondary-subheading">
        <Link
          href="/admin/requests"
          className="hover:text-primary transition-colors cursor-pointer"
        >
          Service Requests
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-secondary-subheading/70" />
        <span className="text-primary-heading font-medium">Create Estimate</span>
      </div>

      {/* Main Form Container */}
      <div className="bg-card-bg rounded-sm border border-border p-5 sm:p-7 md:p-8 shadow-2xs space-y-6">
        {/* Card Heading */}
        <h1 className="text-xl sm:text-2xl font-medium text-primary-heading font-barlow-condensed leading-none">
          Create New Estimate
        </h1>

        {/* Top 6 Request Info Fields (2 rows x 3 columns) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 1. Request ID (Dropdown) */}
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-medium text-primary-heading">
              Request ID
            </label>
            <CustomSelect
              value={selectedRequestId}
              onChange={(val) => setSelectedRequestId(val)}
              options={requestOptions}
              placeholder="Select Request ID"
              size="sm"
              triggerClassName="h-10 px-3 text-xs sm:text-sm border-border-input"
            />
          </div>

          {/* 2. Requested Service (Auto-filled) */}
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-medium text-primary-heading">
              Requested Service
            </label>
            <input
              type="text"
              readOnly
              value={requestedService}
              placeholder="Auto filled"
              className="w-full h-10 px-3 text-xs sm:text-sm border border-border rounded-md bg-page-bg/60 text-secondary-subheading placeholder:text-secondary-subheading/60 cursor-not-allowed focus:outline-hidden select-none"
            />
          </div>

          {/* 3. Property Address (Auto-filled) */}
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-medium text-primary-heading">
              Property Address
            </label>
            <input
              type="text"
              readOnly
              value={propertyAddress}
              placeholder="Auto filled"
              className="w-full h-10 px-3 text-xs sm:text-sm border border-border rounded-md bg-page-bg/60 text-secondary-subheading placeholder:text-secondary-subheading/60 cursor-not-allowed focus:outline-hidden select-none"
            />
          </div>

          {/* 4. Customer Name (Auto-filled) */}
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-medium text-primary-heading">
              Customer Name
            </label>
            <input
              type="text"
              readOnly
              value={customerName}
              placeholder="Auto filled"
              className="w-full h-10 px-3 text-xs sm:text-sm border border-border rounded-md bg-page-bg/60 text-secondary-subheading placeholder:text-secondary-subheading/60 cursor-not-allowed focus:outline-hidden select-none"
            />
          </div>

          {/* 5. Request Type (Auto-filled) */}
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-medium text-primary-heading">
              Request Type
            </label>
            <input
              type="text"
              readOnly
              value={requestType}
              placeholder="Auto filled"
              className="w-full h-10 px-3 text-xs sm:text-sm border border-border rounded-md bg-page-bg/60 text-secondary-subheading placeholder:text-secondary-subheading/60 cursor-not-allowed focus:outline-hidden select-none"
            />
          </div>

          {/* 6. Frequency (Auto-filled) */}
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-medium text-primary-heading">
              Frequency
            </label>
            <input
              type="text"
              readOnly
              value={frequency}
              placeholder="Auto filled"
              className="w-full h-10 px-3 text-xs sm:text-sm border border-border rounded-md bg-page-bg/60 text-secondary-subheading placeholder:text-secondary-subheading/60 cursor-not-allowed focus:outline-hidden select-none"
            />
          </div>
        </div>

        {/* Accordion Sections */}
        <div className="space-y-3 pt-2">
          {/* ACCORDION 1: Scope of Work */}
          <div className="border border-border rounded-md overflow-hidden bg-card-bg transition-colors">
            <button
              type="button"
              onClick={() => toggleSection("scope")}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-page-bg/40 cursor-pointer select-none transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Play
                  className={cn(
                    "w-3.5 h-3.5 fill-[#507294] text-[#507294] transition-transform duration-200",
                    expandedSections.scope ? "rotate-90" : "rotate-0"
                  )}
                />
                <span className="text-xs sm:text-sm font-semibold text-primary-heading font-barlow-condensed">
                  Scope of Work
                </span>
              </div>
              {!expandedSections.scope && (
                isScopeComplete ? (
                  <Check className="w-4 h-4 text-[#507294] stroke-[2.5]" />
                ) : (
                  <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-[#FFF1F3] text-[#F04438] border border-[#FDA29B]/50">
                    Required
                  </span>
                )
              )}
            </button>

            {expandedSections.scope && (
              <div className="p-4 pt-1 space-y-2 border-t border-border/60">
                <textarea
                  rows={4}
                  value={scopeOfWork}
                  maxLength={200}
                  onChange={(e) => setScopeOfWork(e.target.value)}
                  placeholder="Describe scope of work..."
                  className="w-full px-3 py-2 border border-border-input rounded-md bg-card-bg text-txt-primary placeholder:text-secondary-subheading/60 text-xs sm:text-sm focus:outline-hidden focus:border-primary transition-colors resize-y"
                />
                <div className="text-right text-[11px] text-secondary-subheading">
                  {scopeOfWork.length}/200
                </div>
              </div>
            )}
          </div>

          {/* ACCORDION 2: Service Details */}
          <div className="border border-border rounded-md overflow-hidden bg-card-bg transition-colors">
            <button
              type="button"
              onClick={() => toggleSection("services")}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-page-bg/40 cursor-pointer select-none transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Play
                  className={cn(
                    "w-3.5 h-3.5 fill-[#507294] text-[#507294] transition-transform duration-200",
                    expandedSections.services ? "rotate-90" : "rotate-0"
                  )}
                />
                <span className="text-xs sm:text-sm font-semibold text-primary-heading font-barlow-condensed">
                  Service Details
                </span>
              </div>
              {!expandedSections.services && (
                isServicesComplete ? (
                  <Check className="w-4 h-4 text-[#507294] stroke-[2.5]" />
                ) : (
                  <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-[#FFF1F3] text-[#F04438] border border-[#FDA29B]/50">
                    Required
                  </span>
                )
              )}
            </button>

            {expandedSections.services && (
              <div className="p-4 pt-2 space-y-4 border-t border-border/60">
                <div className="space-y-3">
                  <h3 className="text-xs sm:text-sm font-semibold text-primary-heading">
                    Select Specific Services
                  </h3>

                  {/* 2-column Checkbox List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <label className="flex items-center gap-2 text-xs sm:text-sm text-secondary-subheading cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={specificServices.mowing}
                        onChange={(e) =>
                          setSpecificServices((p) => ({
                            ...p,
                            mowing: e.target.checked,
                          }))
                        }
                        className="w-4 h-4 rounded border-border-input text-primary focus:ring-primary cursor-pointer"
                      />
                      <span>Mowing</span>
                    </label>

                    <label className="flex items-center gap-2 text-xs sm:text-sm text-secondary-subheading cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={specificServices.blowingHardServices}
                        onChange={(e) =>
                          setSpecificServices((p) => ({
                            ...p,
                            blowingHardServices: e.target.checked,
                          }))
                        }
                        className="w-4 h-4 rounded border-border-input text-primary focus:ring-primary cursor-pointer"
                      />
                      <span>Blowing Hard Services</span>
                    </label>

                    <label className="flex items-center gap-2 text-xs sm:text-sm text-secondary-subheading cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={specificServices.stringTrimming}
                        onChange={(e) =>
                          setSpecificServices((p) => ({
                            ...p,
                            stringTrimming: e.target.checked,
                          }))
                        }
                        className="w-4 h-4 rounded border-border-input text-primary focus:ring-primary cursor-pointer"
                      />
                      <span>String Trimming</span>
                    </label>

                    <label className="flex items-center gap-2 text-xs sm:text-sm text-secondary-subheading cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={specificServices.basicInspection}
                        onChange={(e) =>
                          setSpecificServices((p) => ({
                            ...p,
                            basicInspection: e.target.checked,
                          }))
                        }
                        className="w-4 h-4 rounded border-border-input text-primary focus:ring-primary cursor-pointer"
                      />
                      <span>Basic Property Inspection</span>
                    </label>

                    <label className="flex items-center gap-2 text-xs sm:text-sm text-secondary-subheading cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={specificServices.edging}
                        onChange={(e) =>
                          setSpecificServices((p) => ({
                            ...p,
                            edging: e.target.checked,
                          }))
                        }
                        className="w-4 h-4 rounded border-border-input text-primary focus:ring-primary cursor-pointer"
                      />
                      <span>Edging</span>
                    </label>
                  </div>

                  {/* Add Additional Services Link */}
                  <div className="pt-1">
                    <span className="text-xs sm:text-sm text-primary font-medium inline-flex items-center gap-1 cursor-pointer hover:underline">
                      <Plus className="w-3.5 h-3.5" />
                      Add additional Services
                    </span>
                  </div>

                  {/* Additional Services Chips Container */}
                  <div className="border border-border rounded-md p-3 space-y-2.5">
                    {/* Selected Chips */}
                    <div className="flex flex-wrap items-center gap-2">
                      {selectedAdditionalServices.map((service) => (
                        <span
                          key={service}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#E8F1F8] border border-primary/20 text-xs font-medium text-primary select-none"
                        >
                          {service}
                          <button
                            type="button"
                            onClick={() => handleRemoveChip(service)}
                            className="hover:text-primary-hover p-0.5 rounded cursor-pointer"
                            aria-label={`Remove ${service}`}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}

                      {/* Available Chips with + */}
                      {availableAdditionalServices.map((service) => (
                        <button
                          key={service}
                          type="button"
                          onClick={() => handleAddChip(service)}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-card-bg border border-border text-xs font-medium text-secondary-subheading hover:bg-page-bg hover:text-primary transition-colors cursor-pointer select-none"
                        >
                          <span>{service}</span>
                          <Plus className="w-3 h-3 text-secondary-subheading" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ACCORDION 3: Add Line Items */}
          <div className="border border-border rounded-md overflow-hidden bg-card-bg transition-colors">
            <button
              type="button"
              onClick={() => toggleSection("lineItems")}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-page-bg/40 cursor-pointer select-none transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Play
                  className={cn(
                    "w-3.5 h-3.5 fill-[#507294] text-[#507294] transition-transform duration-200",
                    expandedSections.lineItems ? "rotate-90" : "rotate-0"
                  )}
                />
                <span className="text-xs sm:text-sm font-semibold text-primary-heading font-barlow-condensed">
                  Add Line Items
                </span>
              </div>
              {!expandedSections.lineItems && (
                isLineItemsComplete ? (
                  <Check className="w-4 h-4 text-[#507294] stroke-[2.5]" />
                ) : (
                  <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-[#FFF1F3] text-[#F04438] border border-[#FDA29B]/50">
                    Required
                  </span>
                )
              )}
            </button>

            {expandedSections.lineItems && (
              <div className="p-4 pt-2 space-y-4 border-t border-border/60">
                {/* Line Items List */}
                {lineItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="border border-border/80 rounded-md p-4 bg-card-bg space-y-3"
                  >
                    {/* Line Item Header */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-semibold text-primary font-barlow-condensed">
                        Line Item {index + 1}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleAddLineItem}
                          className="px-3 py-1 bg-primary hover:bg-primary-hover text-white rounded text-xs font-medium transition-colors shadow-2xs cursor-pointer"
                        >
                          Add Line
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveLineItem(item.id)}
                          className="px-3 py-1 border border-[#F04438] text-[#F04438] hover:bg-red-50 rounded text-xs font-medium transition-colors cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Service Description */}
                    <div className="space-y-1">
                      <label className="block text-xs font-medium text-primary-heading">
                        Service
                      </label>
                      <input
                        type="text"
                        value={item.service}
                        onChange={(e) =>
                          handleUpdateLineItem(item.id, "service", e.target.value)
                        }
                        placeholder="Description of service"
                        className="w-full h-9 px-3 text-xs sm:text-sm border border-border-input rounded-md bg-card-bg text-txt-primary placeholder:text-secondary-subheading/60 focus:outline-hidden focus:border-primary transition-colors"
                      />
                    </div>

                    {/* Qty, Rate, Amount (3 columns) */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="block text-xs font-medium text-primary-heading">
                          Qty.
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={item.qty}
                          onChange={(e) =>
                            handleUpdateLineItem(
                              item.id,
                              "qty",
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className="w-full h-9 px-3 text-xs sm:text-sm border border-border-input rounded-md bg-card-bg text-txt-primary focus:outline-hidden focus:border-primary"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-xs font-medium text-primary-heading">
                          Rate
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.rate}
                          onChange={(e) =>
                            handleUpdateLineItem(
                              item.id,
                              "rate",
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className="w-full h-9 px-3 text-xs sm:text-sm border border-border-input rounded-md bg-card-bg text-txt-primary focus:outline-hidden focus:border-primary"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-xs font-medium text-primary-heading">
                          Amount
                        </label>
                        <input
                          type="text"
                          readOnly
                          value={`$${(item.qty * item.rate).toFixed(2)}`}
                          className="w-full h-9 px-3 text-xs sm:text-sm border border-border rounded-md bg-page-bg/60 text-secondary-subheading cursor-not-allowed select-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {/* Additional Pricing Meta Fields (2 columns) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-primary-heading">
                      Owner Discount ($)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={ownerDiscount}
                      onChange={(e) =>
                        setOwnerDiscount(parseFloat(e.target.value) || 0)
                      }
                      placeholder="$0.00"
                      className="w-full h-9 px-3 text-xs sm:text-sm border border-border-input rounded-md bg-card-bg text-txt-primary focus:outline-hidden focus:border-primary"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-primary-heading">
                      Tax Rate
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={taxRate}
                      onChange={(e) =>
                        setTaxRate(parseFloat(e.target.value) || 0)
                      }
                      placeholder="5%"
                      className="w-full h-9 px-3 text-xs sm:text-sm border border-border-input rounded-md bg-card-bg text-txt-primary focus:outline-hidden focus:border-primary"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-primary-heading">
                      Estimated Duration
                    </label>
                    <input
                      type="text"
                      value={estimatedDuration}
                      onChange={(e) => setEstimatedDuration(e.target.value)}
                      placeholder="4-5 hours"
                      className="w-full h-9 px-3 text-xs sm:text-sm border border-border-input rounded-md bg-card-bg text-txt-primary focus:outline-hidden focus:border-primary"
                    />
                  </div>

                  <div>
                    <DatePickerInput
                      label="Validity Until"
                      value={validityUntil}
                      onChange={(val) => setValidityUntil(val)}
                      placeholder="dd/mm/yyyy"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ACCORDION 4: Add Note (singular as in Figma) */}
          <div className="border border-border rounded-md overflow-hidden bg-card-bg transition-colors">
            <button
              type="button"
              onClick={() => toggleSection("notes")}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-page-bg/40 cursor-pointer select-none transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Play
                  className={cn(
                    "w-3.5 h-3.5 fill-[#507294] text-[#507294] transition-transform duration-200",
                    expandedSections.notes ? "rotate-90" : "rotate-0"
                  )}
                />
                <span className="text-xs sm:text-sm font-semibold text-primary-heading font-barlow-condensed">
                  Add Note
                </span>
              </div>
              {!expandedSections.notes && isNotesComplete && (
                <Check className="w-4 h-4 text-[#507294] stroke-[2.5]" />
              )}
            </button>

            {expandedSections.notes && (
              <div className="p-4 pt-1 space-y-2 border-t border-border/60">
                <textarea
                  rows={3}
                  value={notes}
                  maxLength={200}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any internal or client-facing notes here..."
                  className="w-full px-3 py-2 border border-border-input rounded-md bg-card-bg text-txt-primary placeholder:text-secondary-subheading/60 text-xs sm:text-sm focus:outline-hidden focus:border-primary transition-colors resize-y"
                />
                <div className="text-right text-[11px] text-secondary-subheading">
                  {notes.length}/200
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Terms & Conditions Section */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-primary-heading">
            <FileText className="w-4 h-4 text-primary" />
            <span>Terms & Conditions</span>
          </div>
          <div className="relative">
            <textarea
              rows={3}
              value={termsAndConditions}
              maxLength={200}
              onChange={(e) => setTermsAndConditions(e.target.value)}
              className="w-full px-3 py-2.5 border border-border-input rounded-md bg-card-bg text-txt-primary placeholder:text-secondary-subheading/60 text-xs sm:text-sm focus:outline-hidden focus:border-primary transition-colors resize-y"
            />
            <div className="text-right text-[11px] text-secondary-subheading mt-1">
              {termsAndConditions.length}/200
            </div>
          </div>
        </div>

        {/* Subtotal Summary Box (Under Terms & Conditions, displayed when line items are completed) */}
        {isLineItemsComplete && (
          <div className="bg-[#EAF2FA] rounded-sm border border-[#D6E4F0] p-4 space-y-2 text-xs sm:text-sm animate-in fade-in duration-150">
            <div className="flex items-center justify-between text-secondary-subheading">
              <span>Subtotal</span>
              <span className="font-semibold text-primary-heading">
                ${subtotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex items-center justify-between text-secondary-subheading">
              <span>Discount</span>
              <span className="font-semibold text-primary-heading">
                -${discountAmount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex items-center justify-between text-secondary-subheading">
              <span>Tax</span>
              <span className="font-semibold text-primary-heading">
                ${taxAmount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex items-center justify-between pt-2.5 border-t border-border-subtle">
              <span className="font-bold text-primary-heading text-sm sm:text-base">
                Total
              </span>
              <span className="font-bold text-primary text-sm sm:text-base">
                ${totalAmount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        )}

        {/* Toggles & Radios Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
          {/* Enable Consolidated Billing Toggle */}
          <div className="flex items-center gap-3 select-none">
            <span className="text-xs sm:text-sm font-medium text-primary-heading">
              Enable Consolidated Billing
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={consolidatedBilling}
              onClick={() => setConsolidatedBilling((v) => !v)}
              className={cn(
                "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden",
                consolidatedBilling ? "bg-primary" : "bg-slate-200"
              )}
            >
              <span
                className={cn(
                  "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out",
                  consolidatedBilling ? "translate-x-4" : "translate-x-0"
                )}
              />
            </button>
          </div>

          {/* Have Done Site Visit? Radio Group */}
          <div className="flex items-center gap-3 select-none">
            <span className="text-xs sm:text-sm font-medium text-primary-heading">
              Have Done Site Visit?
            </span>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1.5 text-xs sm:text-sm text-secondary-subheading cursor-pointer">
                <input
                  type="radio"
                  name="siteVisit"
                  value="yes"
                  checked={hasDoneSiteVisit === "yes"}
                  onChange={() => handleSiteVisitRadioChange("yes")}
                  className="w-4 h-4 text-primary border-border-input focus:ring-primary cursor-pointer"
                />
                <span>Yes</span>
              </label>

              <label className="flex items-center gap-1.5 text-xs sm:text-sm text-secondary-subheading cursor-pointer">
                <input
                  type="radio"
                  name="siteVisit"
                  value="no"
                  checked={hasDoneSiteVisit === "no"}
                  onChange={() => handleSiteVisitRadioChange("no")}
                  className="w-4 h-4 text-primary border-border-input focus:ring-primary cursor-pointer"
                />
                <span>No</span>
              </label>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-3">
          <button
            type="button"
            onClick={handleSaveDraft}
            className="px-5 py-2.5 border border-border rounded-md text-xs sm:text-sm font-medium text-secondary-subheading hover:bg-page-bg transition-colors cursor-pointer"
          >
            Save as Draft
          </button>
          <button
            type="button"
            onClick={handleSendToCustomer}
            className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-md text-xs sm:text-sm font-medium transition-colors cursor-pointer shadow-2xs"
          >
            Send to Customer
          </button>
        </div>
      </div>

      {/* Site Visit Requirements Modal (Screenshot 3) */}
      {isSiteVisitModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={handleCloseSiteVisitModal}
        >
          <div
            className="bg-card-bg rounded-xl border border-border shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-5 animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h2 className="text-xl font-medium text-primary-heading font-barlow-condensed">
                Site Visit Requirements
              </h2>
              <button
                type="button"
                onClick={handleCloseSiteVisitModal}
                className="text-secondary-subheading hover:text-primary-heading p-1 rounded-md hover:bg-page-bg transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body Form */}
            <div className="space-y-4 text-xs sm:text-sm">
              {/* Field 1: Site Assessment & Required Adjustments */}
              <div className="space-y-1.5">
                <label className="block text-xs sm:text-sm font-medium text-primary-heading">
                  Site Assessment & Required Adjustments
                </label>
                <textarea
                  rows={3}
                  maxLength={200}
                  value={siteAssessmentAdjustment}
                  onChange={(e) => setSiteAssessmentAdjustment(e.target.value)}
                  placeholder="Describe adjustments..."
                  className="w-full px-3 py-2 border border-border-input rounded-md bg-card-bg text-txt-primary placeholder:text-secondary-subheading/60 text-xs sm:text-sm focus:outline-hidden focus:border-primary transition-colors resize-y"
                />
                <div className="text-right text-[11px] text-secondary-subheading">
                  {siteAssessmentAdjustment.length}/200
                </div>
              </div>

              {/* Field 2: Required Services after Site Assessment */}
              <div className="space-y-2">
                <label className="block text-xs sm:text-sm font-medium text-primary-heading">
                  Required Services after Site Assessment
                </label>

                {siteVisitLineItems.map((item, idx) => (
                  <div
                    key={item.id}
                    className="border border-border/80 rounded-md p-3.5 bg-card-bg space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-semibold text-primary font-barlow-condensed">
                        Line Item {idx + 1}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleAddSiteVisitLine}
                          className="px-3 py-1 bg-primary hover:bg-primary-hover text-white rounded text-xs font-medium transition-colors shadow-2xs cursor-pointer"
                        >
                          Add Line
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveSiteVisitLine(item.id)}
                          className="px-3 py-1 border border-[#F04438] text-[#F04438] hover:bg-red-50 rounded text-xs font-medium transition-colors cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-medium text-primary-heading">
                        Service
                      </label>
                      <input
                        type="text"
                        value={item.service}
                        onChange={(e) =>
                          handleUpdateSiteVisitLine(item.id, "service", e.target.value)
                        }
                        placeholder="Description of service"
                        className="w-full h-9 px-3 text-xs sm:text-sm border border-border-input rounded-md bg-card-bg text-txt-primary placeholder:text-secondary-subheading/60 focus:outline-hidden focus:border-primary"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="block text-xs font-medium text-primary-heading">
                          Qty.
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={item.qty}
                          onChange={(e) =>
                            handleUpdateSiteVisitLine(
                              item.id,
                              "qty",
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className="w-full h-9 px-3 text-xs sm:text-sm border border-border-input rounded-md bg-card-bg text-txt-primary focus:outline-hidden focus:border-primary"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-xs font-medium text-primary-heading">
                          Rate
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.rate}
                          onChange={(e) =>
                            handleUpdateSiteVisitLine(
                              item.id,
                              "rate",
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className="w-full h-9 px-3 text-xs sm:text-sm border border-border-input rounded-md bg-card-bg text-txt-primary focus:outline-hidden focus:border-primary"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-xs font-medium text-primary-heading">
                          Amount
                        </label>
                        <input
                          type="text"
                          readOnly
                          value={`$${(item.qty * item.rate).toFixed(2)}`}
                          className="w-full h-9 px-3 text-xs sm:text-sm border border-border rounded-md bg-page-bg/60 text-secondary-subheading cursor-not-allowed select-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Field 3: Add Note */}
              <div className="space-y-1.5">
                <label className="block text-xs sm:text-sm font-medium text-primary-heading">
                  Add Note
                </label>
                <textarea
                  rows={3}
                  maxLength={200}
                  value={siteVisitNote}
                  onChange={(e) => setSiteVisitNote(e.target.value)}
                  placeholder="Add note..."
                  className="w-full px-3 py-2 border border-border-input rounded-md bg-card-bg text-txt-primary placeholder:text-secondary-subheading/60 text-xs sm:text-sm focus:outline-hidden focus:border-primary transition-colors resize-y"
                />
                <div className="text-right text-[11px] text-secondary-subheading">
                  {siteVisitNote.length}/200
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between gap-3 pt-3 border-t border-border">
              <button
                type="button"
                onClick={handleCloseSiteVisitModal}
                className="px-6 py-2.5 border border-border rounded-md text-xs sm:text-sm font-medium text-secondary-subheading hover:bg-page-bg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddSiteVisitToEstimate}
                className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-md text-xs sm:text-sm font-medium transition-colors cursor-pointer shadow-2xs"
              >
                Add to Estimate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateEstimateView;
