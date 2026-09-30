import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { CommercialIcons } from "../../../../components/icons/CommercialIcons";
import { EventIcons } from "../../../../components/icons/EventIcons";
import { LandscapeIcons } from "../../../../components/icons/LandscapeIcons";
import { OtherWorkIcons } from "../../../../components/icons/OtherWorkIcons";
import { PhotographyIcons } from "../../../../components/icons/PhotographyIcons";
import { ResidentialLawnCareIcons } from "../../../../components/icons/ResidentialLawnCareIcons";
import { NewRequestFormData } from "../schema/requestSchema";
import { CustomSelect } from "@/components/ui/CustomSelect";

interface Step3Props {
  form: UseFormReturn<NewRequestFormData>;
}

const CATEGORIES = [
  {
    id: "lawn",
    label: "Residential Lawn Care",
    icon: ResidentialLawnCareIcons,
  },
  {
    id: "landscape",
    label: "Landscape & Property Maintenance",
    icon: LandscapeIcons,
  },
  { id: "commercial", label: "Commercial Services", icon: CommercialIcons },
  {
    id: "photography",
    label: "Photography & Videography",
    icon: PhotographyIcons,
  },
  { id: "event", label: "DJ & Event Services", icon: EventIcons },
  { id: "other", label: "Other Work", icon: OtherWorkIcons },
];

const RESIDENTIAL_SERVICES = [
  "Mowing",
  "String Trimming",
  "Edging",
  "Blowing Hard Services",
  "Basic Property Inspection",
];

const LANDSCAPE_SERVICES = [
  "Landscape Bed Maintenance",
  "Seasonal Cleanup ( Spring/Fall)",
  "Tree/Shrub Planting",
  "Decorative Rock Installation",
  "Sod Installation",
  "Retaining Walls / Borders",
  "General Property Cleanup",
  "Strom Debris Cleanup",
];

const COMMERCIAL_TYPES = [
  "Rental Property Turnover",
  "HOA Maintenance",
  "Church Maintenance",
  "Municipal Services",
  "Commercial Office Properties",
];

const COMMERCIAL_SERVICES = [
  "Lawn Restoration",
  "Initial Cleanup",
  "Shrub Trimming",
  "Mulching",
  "Pressure Washing",
  "Debris Removal",
  "Listing Preparation Package",
];

const ADDITIONAL_TAGS = [
  "Leaf Removal",
  "Hedge/Shrub Trimming",
  "Mulching",
  "Aeration",
  "Fertilization",
  "Weed Control",
  "Over seeding",
  "Gutter Cleaning",
  "Pressure Washing",
];

export const Step3ServiceDetails: React.FC<Step3Props> = ({ form }) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const selectedCategory = watch("serviceCategory");
  const selectedServices = watch("specificServices") || [];
  const selectedCommercialTypes = watch("specificCommercialTypes") || [];
  const selectedAdditional = watch("additionalServices") || [];
  const requestType = watch("requestType");
  const detailsDescription = watch("serviceDetailsDescription") || "";

  const [showAddMore, setShowAddMore] = useState(false);

  const handleCategorySelect = (catLabel: string) => {
    setValue("serviceCategory", catLabel, { shouldValidate: true });
    setValue("specificServices", []);
    setValue("specificCommercialTypes", []);
  };

  const handleServiceToggle = (service: string, checked: boolean) => {
    if (checked) {
      setValue("specificServices", [...selectedServices, service], {
        shouldValidate: true,
      });
    } else {
      setValue(
        "specificServices",
        selectedServices.filter((s) => s !== service),
        { shouldValidate: true },
      );
    }
  };

  const handleCommercialTypeToggle = (type: string, checked: boolean) => {
    if (checked) {
      setValue("specificCommercialTypes", [...selectedCommercialTypes, type]);
    } else {
      setValue(
        "specificCommercialTypes",
        selectedCommercialTypes.filter((t) => t !== type),
      );
    }
  };

  const handleTagToggle = (tag: string) => {
    if (selectedAdditional.includes(tag)) {
      setValue(
        "additionalServices",
        selectedAdditional.filter((t) => t !== tag),
      );
    } else {
      setValue("additionalServices", [...selectedAdditional, tag]);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-medium text-primary-heading">
          Service Details
        </h2>
        <p className="text-sm text-secondary-subheading mt-0.5">
          Select a category, then choose specific services & describe service
          details
        </p>
      </div>

      {/* Categories Grid */}
      <div>
        <label className="block text-lg font-medium text-txt-primary mb-3">
          What type of property service do you need?{" "}
          <span className="text-trend-down">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.label;
            return (
              <button
                type="button"
                key={cat.id}
                onClick={() => handleCategorySelect(cat.label)}
                className={`flex flex-col items-center justify-center p-5 rounded-lg border transition-all text-center cursor-pointer ${
                  isSelected
                    ? "bg-primary text-primary-text border-primary"
                    : "bg-card-bg text-txt-primary border-border hover:border-border"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-xl mb-3 ${
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-surface text-secondary-subheading"
                  }`}
                >
                  <cat.icon />
                </div>
                <span className="font-medium text-xl leading-snug">
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
        {errors.serviceCategory && (
          <p className="text-xs text-trend-down mt-1">
            {errors.serviceCategory.message}
          </p>
        )}
      </div>

      {/* Commercial Specific Sub-Type */}
      {selectedCategory === "Commercial Services" && (
        <div className="space-y-2">
          <label className="block text-lg font-medium text-txt-primary">
            Select Specific Commercial Service Type{" "}
            <span className="text-trend-down">*</span>
          </label>
          <div className="space-y-2">
            {COMMERCIAL_TYPES.map((type) => (
              <label
                key={type}
                className="flex items-center gap-2 cursor-pointer text-txt-primary text-sm"
              >
                <input
                  type="checkbox"
                  checked={selectedCommercialTypes.includes(type)}
                  onChange={(e) =>
                    handleCommercialTypeToggle(type, e.target.checked)
                  }
                  className="w-4 h-4 text-secondary-subheading rounded border-border focus:ring-border"
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Dynamic Sub Services Checkboxes */}
      {selectedCategory &&
        !["Photography & Videography", "DJ & Event Services"].includes(
          selectedCategory,
        ) && (
          <div>
            <label className="block text-lg font-medium text-txt-primary mb-2">
              Select Specific Services{" "}
              <span className="text-trend-down">*</span>
            </label>
            <div className="space-y-2">
              {(selectedCategory === "Residential Lawn Care"
                ? RESIDENTIAL_SERVICES
                : selectedCategory === "Landscape & Property Maintenance"
                  ? LANDSCAPE_SERVICES
                  : COMMERCIAL_SERVICES
              ).map((service) => (
                <label
                  key={service}
                  className="flex items-center gap-2 cursor-pointer text-txt-primary text-sm"
                >
                  <input
                    type="checkbox"
                    checked={selectedServices.includes(service)}
                    onChange={(e) =>
                      handleServiceToggle(service, e.target.checked)
                    }
                    className="w-4 h-4 text-secondary-subheading rounded border-border focus:ring-border"
                  />
                  <span>{service}</span>
                </label>
              ))}
            </div>

            {/* Add Additional Services button & tags */}
            <div className="mt-3">
              <button
                type="button"
                onClick={() => setShowAddMore(!showAddMore)}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-secondary-subheading hover:text-txt-primary"
              >
                <span className="text-lg">+</span> Add additional Services
              </button>

              {showAddMore && (
                <div className="mt-3 p-3 border border-border rounded-md bg-page-bg flex flex-wrap gap-2">
                  {ADDITIONAL_TAGS.map((tag) => {
                    const isSelected = selectedAdditional.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => handleTagToggle(tag)}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors ${
                          isSelected
                            ? "bg-primary/10 text-primary border border-primary/30"
                            : "bg-card-bg text-secondary-subheading border border-border hover:bg-page-bg"
                        }`}
                      >
                        <span>{tag}</span>
                        <span>{isSelected ? "✕" : "+"}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

      {/* Date & Event Details for DJ / Event / Photography */}
      {["Photography & Videography", "DJ & Event Services"].includes(
        selectedCategory,
      ) && (
        <div className="space-y-4">
          <div>
            <label className="block text-lg font-medium text-txt-primary mb-1">
              If approved, which day is best for you?{" "}
              <span className="text-trend-down">*</span>
            </label>
            <input
              type="date"
              {...register("preferredDate")}
              className="w-full h-11 px-3 text-txt-primary bg-card-bg border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-border"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-txt-primary mb-1">
              Event Type <span className="text-trend-down">*</span>
            </label>
            <input
              type="text"
              placeholder="eg. community party"
              {...register("eventType")}
              className="w-full h-11 px-3 text-txt-primary bg-card-bg border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-border"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-lg font-medium text-txt-primary mb-1">
                Expected Guests
              </label>
              <input
                type="text"
                placeholder="04"
                {...register("expectedGuests")}
                className="w-full h-11 px-3 text-txt-primary bg-card-bg border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-border"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-txt-primary mb-1">
                Event Duration
              </label>
              <input
                type="text"
                placeholder="eg. 4 hours"
                {...register("eventDuration")}
                className="w-full h-11 px-3 text-txt-primary bg-card-bg border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-border"
              />
            </div>
          </div>
        </div>
      )}

      {/* What type of request is this? */}
      <div>
        <label className="block text-lg font-medium text-txt-primary mb-2">
          What type of request is this?{" "}
          <span className="text-trend-down">*</span>
        </label>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {[
            "One-time",
            "Recurring",
            "Emergency / Rush",
            "Estimate Only",
            "Existing Contract",
          ].map((type) => (
            <label
              key={type}
              className="flex items-center gap-2 cursor-pointer text-sm text-txt-primary"
            >
              <input
                type="radio"
                value={type}
                {...register("requestType")}
                className="w-4 h-4 text-secondary-subheading border-border focus:ring-border"
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
        {errors.requestType && (
          <p className="text-xs text-trend-down mt-1">
            {errors.requestType.message}
          </p>
        )}
      </div>

      {/* Conditional: Recurring frequency dropdown */}
      {requestType === "Recurring" && (
        <CustomSelect
          id="recurring-frequency-select"
          label="How often you need this service?"
          required
          placeholder="Choose an option"
          value={watch("recurringFrequency")}
          onChange={(val) =>
            setValue("recurringFrequency", val, { shouldValidate: true })
          }
          options={[
            "Weekly",
            "Bi-Weekly",
            "One-time",
            "Seasonal",
            "12 months",
          ]}
          error={errors.recurringFrequency?.message}
        />
      )}

      {/* Conditional: Existing Contract dropdown */}
      {requestType === "Existing Contract" && (
        <CustomSelect
          id="contract-number-select"
          label="Select your contract"
          required
          placeholder="Select contract"
          value={watch("contractNumber")}
          onChange={(val) =>
            setValue("contractNumber", val, { shouldValidate: true })
          }
          options={["Contract #CN-12586", "Contract #CN-1024"]}
          error={errors.contractNumber?.message}
        />
      )}

      {/* Describe what you need in details */}
      <div>
        <label className="block text-lg font-medium text-txt-primary mb-1">
          Describe what you need in details
        </label>
        <div className="relative border border-border rounded-md bg-card-bg p-3">
          <textarea
            {...register("serviceDetailsDescription")}
            rows={3}
            maxLength={200}
            placeholder="Details description of your services,...."
            className="w-full text-sm text-txt-primary resize-none focus:outline-none"
          />
          <div className="text-right text-sm text-secondary-subheading mt-1">
            {detailsDescription.length}/200
          </div>
        </div>
      </div>
    </div>
  );
};
