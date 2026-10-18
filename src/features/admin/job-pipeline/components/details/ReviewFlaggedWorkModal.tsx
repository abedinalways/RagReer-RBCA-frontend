"use client";

import React, { useState } from "react";
import { FileText, Check, ChevronDown, X } from "lucide-react";
import toast from "react-hot-toast";
import { Modal } from "@/components/reusable/Modal";

interface LineItem {
  id: string;
  service: string;
  qty: number | string;
  rate: string;
  amount: string;
}

interface ReviewFlaggedWorkModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobId?: string;
  propertyName?: string;
  propertyAddress?: string;
  onSendToCustomer?: () => void;
  onReject?: () => void;
}

const DEFAULT_LINE_ITEMS: LineItem[] = [
  {
    id: "item-1",
    service: "Waste Removal",
    qty: 1,
    rate: "$85.00",
    amount: "$85.00",
  },
  {
    id: "item-2",
    service: "Lawn Preparation",
    qty: 1,
    rate: "$85.00",
    amount: "$85.00",
  },
];

const ATTACHMENT_IMAGES = [
  "/images/site01.png",
  "/images/site03.png",
  "/images/site02.png",
];

export const ReviewFlaggedWorkModal: React.FC<ReviewFlaggedWorkModalProps> = ({
  isOpen,
  onClose,
  jobId = "#JOB125789",
  propertyName = "North Entrance Monument & Islands",
  propertyAddress = "100 Whispering Pines Blvd at Hwy 43",
  onSendToCustomer,
  onReject,
}) => {
  // Step: "review" (Additional Work Requested) or "create" (Create Additional Work Request)
  const [step, setStep] = useState<"review" | "create">("review");

  // Accordion sections for step 2
  const [openSections, setOpenSections] = useState({
    serviceDetails: true,
    lineItems: true,
    noteToCustomer: true,
  });

  // Services tags
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "Lawn Preparation",
    "Waste Removal",
  ]);

  // Line items state
  const [lineItems, setLineItems] = useState<LineItem[]>(DEFAULT_LINE_ITEMS);
  const [duration, setDuration] = useState("2 Hours");
  const [reason, setReason] = useState(
    "The existing area needs to be cleared and prepared before the requested lawn treatment can be completed."
  );
  const [customerNote, setCustomerNote] = useState(
    "We need to inspect your property before providing a final estimate. Our crew member will visit your site and if there is any new requirements will send to you with the final estimate."
  );
  const [ownerDiscount, setOwnerDiscount] = useState("-$50.00");
  const [taxRate, setTaxRate] = useState("5%");

  // Reset state when closing
  const handleClose = () => {
    setStep("review");
    onClose();
  };

  const toggleSection = (section: "serviceDetails" | "lineItems" | "noteToCustomer") => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const removeServiceTag = (service: string) => {
    setSelectedServices((prev) => prev.filter((s) => s !== service));
  };

  const addLineItem = () => {
    const newItem: LineItem = {
      id: `item-${Date.now()}`,
      service: "Additional Lawn Service",
      qty: 1,
      rate: "$85.00",
      amount: "$85.00",
    };
    setLineItems((prev) => [...prev, newItem]);
  };

  const removeLineItem = (id: string) => {
    if (lineItems.length <= 1) {
      toast("At least one line item is required.", { icon: "ℹ️" });
      return;
    }
    setLineItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleReject = () => {
    toast.error("Additional work request rejected.");
    onReject?.();
    handleClose();
  };

  const handleSendToCustomer = () => {
    toast.success("Additional work request sent to customer!");
    onSendToCustomer?.();
    handleClose();
  };

  // Header Title
  const modalTitle =
    step === "review" ? (
      <div className="flex flex-col">
        <h3 className="font-barlow text-xl md:text-2xl font-medium text-txt-primary leading-tight">
          Additional Work Requested
        </h3>
        <button
          type="button"
          onClick={() => toast(`Opening details for original job ${jobId}`, { icon: "📋" })}
          className="flex items-center gap-1.5 text-xs md:text-sm text-info hover:underline font-normal mt-1 cursor-pointer w-fit"
        >
          <FileText className="w-3.5 h-3.5 text-info stroke-[1.75]" />
          <span className="underline decoration-info underline-offset-2">
            Original Job {jobId.startsWith("#") ? jobId : `#${jobId}`}
          </span>
        </button>
      </div>
    ) : (
      <h3 className="font-barlow text-xl md:text-2xl font-medium text-txt-primary leading-tight">
        Create Additional Work Request
      </h3>
    );

  // Footer Actions
  const modalFooter =
    step === "review" ? (
      <div className="flex items-center gap-3 w-full">
        <button
          type="button"
          onClick={handleReject}
          className="flex-1 py-2.5 rounded-md border border-decline text-decline hover:bg-decline-secondary text-xs sm:text-sm font-medium transition-colors cursor-pointer text-center"
        >
          Reject
        </button>
        <button
          type="button"
          onClick={() => setStep("create")}
          className="flex-1 py-2.5 rounded-md bg-primary text-white hover:bg-primary-hover text-xs sm:text-sm font-medium transition-colors cursor-pointer shadow-2xs text-center"
        >
          Approve & Create Request
        </button>
      </div>
    ) : (
      <div className="flex items-center gap-3 w-full">
        <button
          type="button"
          onClick={() => setStep("review")}
          className="flex-1 py-2.5 rounded-md border border-border bg-card-bg text-txt-primary hover:bg-page-bg text-xs sm:text-sm font-medium transition-colors cursor-pointer text-center"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSendToCustomer}
          className="flex-1 py-2.5 rounded-md bg-primary text-white hover:bg-primary-hover text-xs sm:text-sm font-medium transition-colors cursor-pointer shadow-2xs text-center"
        >
          Send to Customer
        </button>
      </div>
    );

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={modalTitle}
      footer={modalFooter}
      hideHeaderBorder={true}
      hideFooterBorder={true}
      className="max-w-[490px] sm:max-w-[500px]"
      headerClassName="px-5 pt-5 pb-0"
      contentClassName="px-5 py-3 space-y-4 max-h-[76vh] overflow-y-auto"
      footerClassName="px-5 pb-5 pt-1"
    >
      {/* STEP 1: Additional Work Requested */}
      {step === "review" && (
        <div className="space-y-4 animate-in fade-in duration-150">
          {/* Property & Cost Information Card */}
          <div className="rounded-lg border border-border bg-card-bg p-3.5 flex flex-col sm:flex-row justify-between items-stretch gap-3">
            <div className="flex-1 flex flex-col justify-between py-0.5">
              <div>
                <span className="text-[11px] sm:text-xs text-secondary-subheading font-normal block">
                  Property Name
                </span>
                <span className="text-xs sm:text-sm font-medium text-txt-primary block mt-0.5 leading-snug">
                  {propertyName}
                </span>
              </div>
              <div className="mt-2.5">
                <span className="text-sm md:text-base text-secondary-subheading font-normal block">
                  Property Address
                </span>
                <span className="text-sm md:text-base font-medium text-txt-primary block mt-0.5 leading-snug">
                  {propertyAddress}
                </span>
              </div>
            </div>

            <div className="rounded-lg bg-[#edf4fc] p-3 min-w-[145px] shrink-0 flex flex-col justify-between">
              <div>
                <span className="text-sm md:text-base text-secondary-subheading font-normal block">
                  Additional Cost
                </span>
                <span className="text-sm md:text-base font-medium text-txt-primary block mt-0.5">
                  $50.00
                </span>
              </div>
              <div className="mt-2.5">
                <span className="text-sm md:text-base text-secondary-subheading font-normal block">
                  Estimated Duration
                </span>
                <span className="text-sm md:text-base font-medium text-txt-primary block mt-0.5">
                  2 Hours
                </span>
              </div>
            </div>
          </div>

          {/* Reason Section */}
          <div>
            <span className="text-sm md:text-base text-secondary-subheading font-normal block">
              Reason
            </span>
            <p className="text-sm md:text-base font-medium text-txt-primary mt-1 leading-snug">
              Additional work is required before the original service can be completed.
            </p>
          </div>

          {/* Description Section */}
          <div>
            <span className="text-sm md:text-base text-secondary-subheading font-normal block">
              Description
            </span>
            <p className="text-sm md:text-base font-medium text-txt-primary mt-1 leading-snug">
              Remove existing debris and prepare the area before lawn treatment.
            </p>
          </div>

          {/* Attachments Section */}
          <div>
            <h4 className="font-barlow text-sm md:text-base font-medium text-txt-primary block">
              Attachments
            </h4>
            <div className="flex items-center gap-3 mt-2">
              {ATTACHMENT_IMAGES.map((imgSrc, idx) => (
                <div
                  key={idx}
                  className="w-[84px] h-[84px] sm:w-[88px] sm:h-[88px] rounded-lg overflow-hidden border border-border/40 shrink-0 shadow-2xs"
                >
                  <img
                    src={imgSrc}
                    alt={`Attachment ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: Create Additional Work Request */}
      {step === "create" && (
        <div className="space-y-3.5 animate-in fade-in duration-150">
          {/* Top Form Fields (2x2 Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="text-sm md:text-base text-txt-primary font-medium block mb-1">
                Property Name
              </label>
              <input
                type="text"
                disabled
                value="Auto filled"
                className="w-full rounded-sm border border-border bg-[#f8fafc] px-3 py-2 text-sm md:text-base text-secondary-subheading cursor-not-allowed"
              />
            </div>
            <div>
              <label className="text-sm md:text-base text-txt-primary font-medium block mb-1">
                Property Address
              </label>
              <input
                type="text"
                disabled
                value="Auto filled"
                className="w-full rounded-sm border border-border bg-[#f8fafc] px-3 py-2 text-sm md:text-base text-secondary-subheading cursor-not-allowed"
              />
            </div>
            <div>
              <label className="text-sm md:text-base text-txt-primary font-medium block mb-1">
                Linked Request ID
              </label>
              <input
                type="text"
                disabled
                value="Auto filled"
                className="w-full rounded-sm  border border-border bg-[#f8fafc] px-3 py-2 text-sm md:text-base text-secondary-subheading cursor-not-allowed"
              />
            </div>
            <div>
              <label className="text-sm md:text-base text-txt-primary font-medium block mb-1">
                Estimated Duration
              </label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full rounded-sm border border-border bg-card-bg px-3 py-2 text-sm md:text-base text-txt-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          {/* Accordion 1: Service Details */}
          <div className="rounded-lg border border-border bg-card-bg p-3">
            <button
              type="button"
              onClick={() => toggleSection("serviceDetails")}
              className="flex items-center justify-between w-full text-left cursor-pointer"
            >
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-info leading-none">
                  {openSections.serviceDetails ? "▼" : "▶"}
                </span>
                <span className="font-barlow text-sm md:text-base font-medium text-txt-primary">
                  Service Details
                </span>
              </div>
              {!openSections.serviceDetails && (
                <Check className="w-3.5 h-3.5 text-info stroke-[2.5]" />
              )}
            </button>

            {openSections.serviceDetails && (
              <div className="space-y-3 pt-3">
                <div>
                  <label className="text-sm md:text-base text-txt-primary font-medium block mb-1">
                    Required Service
                  </label>
                  <div className="rounded-md border border-border bg-card-bg px-2 py-1.5 flex items-center justify-between min-h-[36px]">
                    <div className="flex flex-wrap gap-1.5 items-center">
                      {selectedServices.map((service) => (
                        <span
                          key={service}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-sm md:text-base font-normal bg-[#edf4fc] text-info border border-[#d2e4f7]"
                        >
                          {service}
                          <button
                            type="button"
                            onClick={() => removeServiceTag(service)}
                            className="text-info/70 hover:text-info cursor-pointer"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                    <ChevronDown className="w-4 h-4 text-secondary-subheading shrink-0 ml-1" />
                  </div>
                </div>

                <div>
                  <label className="text-xs md:text-sm text-txt-primary font-medium block mb-1">
                    Reason
                  </label>
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows={2}
                    className="w-full rounded-md border border-border bg-card-bg p-2 text-sm md:text-base text-secondary-subheading focus:outline-none focus:ring-1 focus:ring-primary resize-none leading-relaxed"
                  />
                  <div className="text-xs text-secondary-subheading text-right mt-0.5">
                    0/200
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Accordion 2: Add Line Items */}
          <div className="rounded-sm border border-border bg-card-bg p-3">
            <button
              type="button"
              onClick={() => toggleSection("lineItems")}
              className="flex items-center justify-between w-full text-left cursor-pointer"
            >
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-info leading-none">
                  {openSections.lineItems ? "▼" : "▶"}
                </span>
                <span className="font-barlow text-sm md:text-base font-medium text-txt-primary">
                  Add Line Items
                </span>
              </div>
              {!openSections.lineItems && (
                <Check className="w-3.5 h-3.5 text-info stroke-[2.5]" />
              )}
            </button>

            {openSections.lineItems && (
              <div className="space-y-3 pt-3">
                {lineItems.map((item, idx) => (
                  <div
                    key={item.id}
                    className="p-2.5 rounded-md border border-border/80 bg-page-bg/40 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs md:text-sm font-normal text-info">
                        Line Item {idx + 1}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={addLineItem}
                          className="px-2.5 py-0.5 rounded bg-primary text-white hover:bg-primary-hover text-xs md:text-sm font-medium transition-colors cursor-pointer shadow-2xs"
                        >
                          Add Line
                        </button>
                        <button
                          type="button"
                          onClick={() => removeLineItem(item.id)}
                          className="px-2.5 py-0.5 rounded border border-red-300 text-decline hover:bg-red-50 text-xs md:text-sm font-medium transition-colors cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm md:text-base text-txt-primary font-medium block mb-1">
                        Service
                      </label>
                      <input
                        type="text"
                        value={item.service}
                        onChange={(e) => {
                          const val = e.target.value;
                          setLineItems((prev) =>
                            prev.map((i) => (i.id === item.id ? { ...i, service: val } : i))
                          );
                        }}
                        className="w-full rounded-md border border-border bg-card-bg px-2.5 py-1.5 text-xs md:text-sm text-txt-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="text-xs md:text-sm text-txt-primary font-medium block mb-1">
                          Qty.
                        </label>
                        <input
                          type="text"
                          value={item.qty}
                          onChange={(e) => {
                            const val = e.target.value;
                            setLineItems((prev) =>
                              prev.map((i) => (i.id === item.id ? { ...i, qty: val } : i))
                            );
                          }}
                          className="w-full rounded-md border border-border bg-card-bg px-2 py-1.5 text-xs text-txt-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-txt-primary font-medium block mb-1">
                          Rate
                        </label>
                        <input
                          type="text"
                          value={item.rate}
                          onChange={(e) => {
                            const val = e.target.value;
                            setLineItems((prev) =>
                              prev.map((i) => (i.id === item.id ? { ...i, rate: val } : i))
                            );
                          }}
                          className="w-full rounded-sm border border-border bg-card-bg px-2 py-1.5 text-xs md:text-sm text-txt-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="text-xs md:text-sm text-txt-primary font-medium block mb-1">
                          Amount
                        </label>
                        <input
                          type="text"
                          value={item.amount}
                          onChange={(e) => {
                            const val = e.target.value;
                            setLineItems((prev) =>
                              prev.map((i) => (i.id === item.id ? { ...i, amount: val } : i))
                            );
                          }}
                          className="w-full rounded-sm border border-border bg-card-bg px-2 py-1.5 text-xs md:text-sm text-txt-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {/* Owner Discount & Tax Rate */}
                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <div>
                    <label className="text-xs md:text-sm text-txt-primary font-medium block mb-1">
                      Owner Discount ($)
                    </label>
                    <input
                      type="text"
                      value={ownerDiscount}
                      onChange={(e) => setOwnerDiscount(e.target.value)}
                      className="w-full rounded-sm border border-border bg-card-bg px-2.5 py-1.5 text-xs text-txt-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs md:text-sm text-txt-primary font-medium block mb-1">
                      Tax Rate
                    </label>
                    <input
                      type="text"
                      value={taxRate}
                      onChange={(e) => setTaxRate(e.target.value)}
                      className="w-full rounded-sm border border-border bg-card-bg px-2.5 py-1.5 text-xs text-txt-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Accordion 3: Add Note to Customer */}
          <div className="rounded-sm border border-border bg-card-bg p-3">
            <button
              type="button"
              onClick={() => toggleSection("noteToCustomer")}
              className="flex items-center justify-between w-full text-left cursor-pointer"
            >
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-info leading-none">
                  {openSections.noteToCustomer ? "▼" : "▶"}
                </span>
                <span className="font-barlow text-sm md:text-base font-medium text-txt-primary">
                  Add Note to Customer
                </span>
              </div>
              {!openSections.noteToCustomer && (
                <Check className="w-3.5 h-3.5 text-info stroke-[2.5]" />
              )}
            </button>

            {openSections.noteToCustomer && (
              <div className="pt-3">
                <textarea
                  value={customerNote}
                  onChange={(e) => setCustomerNote(e.target.value)}
                  rows={3}
                  className="w-full rounded-md border border-border bg-card-bg p-2 text-xs md:text-sm text-secondary-subheading focus:outline-none focus:ring-1 focus:ring-primary resize-none leading-relaxed"
                />
                <div className="text-xs text-secondary-subheading text-right mt-0.5">
                  0/200
                </div>
              </div>
            )}
          </div>

          {/* Totals Summary Box */}
          <div className="rounded-sm bg-[#edf4fc] p-3 space-y-1.5 text-xs md:text-sm">
            <div className="flex items-center justify-between">
              <span className="text-secondary-subheading font-normal">Subtotal</span>
              <span className="font-medium text-txt-primary">$3,995.00</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-secondary-subheading font-normal">Discount</span>
              <span className="font-medium text-txt-primary">-$50.00</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-secondary-subheading font-normal">Tax</span>
              <span className="font-medium text-txt-primary">$45.00</span>
            </div>
            <div className="flex items-center justify-between pt-1">
              <span className="font-medium text-txt-primary">Total</span>
              <span className="font-medium text-info">$3,995.00</span>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ReviewFlaggedWorkModal;
