import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { CommercialIcons } from "../../../../components/icons/CommercialIcons";
import { EventIcons } from "../../../../components/icons/EventIcons";
import { LandscapeIcons } from "../../../../components/icons/LandscapeIcons";
import { OtherWorkIcons } from "../../../../components/icons/OtherWorkIcons";
import { PhotographyIcons } from "../../../../components/icons/PhotographyIcons";
import { ResidentialLawnCareIcons } from "../../../../components/icons/ResidentialLawnCareIcons";
import SelectBox from "@/components/icons/customer/SelectBox";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { Plus, X } from "lucide-react";
import { NewRequestFormData } from "../schema/requestSchema";

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

const COMMERCIAL_SERVICES_LEFT = [
  "Lawn Restoration",
  "Initial Cleanup",
  "Shrub Trimming",
  "Mulching",
];

const COMMERCIAL_SERVICES_RIGHT = [
  "Pressure Washing",
  "Debris Removal",
  "Listing Preparation Package",
];

const HOA_COMMUNITY_SIZES = [
  "Entrance Only",
  "Medium HOA",
  "Small HOA",
  "Large HOA",
];

const CHURCH_CAMPUS_SIZES = [
  "Small Church",
  "Medium Church",
  "Large Campus",
];

const COMMERCIAL_PROPERTY_TYPES = [
  "Small Office",
  "Retail Strip Center",
  "Medical Office",
  "Industrial Facility",
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

const RECURRING_FREQUENCY_OPTIONS = [
  "Weekly",
  "Bi-Weekly",
  "One-time",
  "Seasonal",
  "12 months",
];

const CustomCheckbox: React.FC<{ checked?: boolean }> = ({ checked }) => {
  return checked ? (
    <SelectBox className="w-[18px] h-[18px] shrink-0 pointer-events-none" />
  ) : (
    <div className="w-[18px] h-[18px] rounded-[3px] border border-border-input bg-card-bg shrink-0 transition-colors group-hover:border-primary/60 pointer-events-none" />
  );
};

const CustomRadio: React.FC<{ checked?: boolean }> = ({ checked }) => {
  return (
    <div className="w-4 h-4 rounded-full border border-border-input bg-card-bg flex items-center justify-center shrink-0 transition-colors group-hover:border-primary/60 pointer-events-none">
      {checked && <div className="w-2 h-2 rounded-full bg-primary" />}
    </div>
  );
};

export const Step3ServiceDetails: React.FC<Step3Props> = ({ form }) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const selectedCategory = watch("serviceCategory") || "Residential Lawn Care";
  const selectedServices = watch("specificServices") || [];
  const selectedCommercialTypes = watch("specificCommercialTypes") || [];
  const selectedAdditional = watch("additionalServices") || [];
  const requestType = watch("requestType");
  const detailsDescription = watch("serviceDetailsDescription") || "";

  // Dynamic commercial sub-fields
  const commercialCommunitySize = watch("commercialCommunitySize");
  const commercialCampusSize = watch("commercialCampusSize");
  const commercialPropertyType = watch("commercialPropertyType");

  const activeCommercialType =
    selectedCommercialTypes[0] || "Rental Property Turnover";

  // Collapsed by default, toggleable per user click
  const [showAddMore, setShowAddMore] = useState(false);

  const handleCategorySelect = (catLabel: string) => {
    setValue("serviceCategory", catLabel, { shouldValidate: true });
    setValue("specificServices", []);
    if (catLabel === "Commercial Services") {
      setValue("specificCommercialTypes", ["Rental Property Turnover"]);
    } else {
      setValue("specificCommercialTypes", []);
    }
  };

  const handleCommercialTypeSelect = (type: string) => {
    setValue("specificCommercialTypes", [type], { shouldValidate: true });
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

  // Render additional services tags section
  const renderAdditionalTags = () => (
    <div className="mt-3">
      <button
        type="button"
        onClick={() => setShowAddMore(!showAddMore)}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-hover cursor-pointer select-none transition-colors mb-2"
      >
        <Plus className="w-4 h-4" />
        <span>Add additional Services</span>
      </button>

      {showAddMore && (
        <div className="p-3 border border-border rounded-lg bg-card-bg flex flex-wrap gap-2.5 shadow-xs">
          {ADDITIONAL_TAGS.map((tag) => {
            const isSelected = selectedAdditional.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => handleTagToggle(tag)}
                className={`px-3 py-1.5 rounded-md text-xs sm:text-sm transition-all cursor-pointer select-none flex items-center gap-1.5 active:scale-95 ${
                  isSelected
                    ? "bg-blue-50 text-primary border border-blue-100 font-medium hover:bg-blue-100/50"
                    : "bg-card-bg text-secondary-subheading border border-border hover:border-slate-300 hover:text-txt-primary hover:bg-slate-50 font-normal"
                }`}
              >
                <span>{tag}</span>
                {isSelected ? (
                  <X className="w-3.5 h-3.5 stroke-[2.5]" />
                ) : (
                  <Plus className="w-3.5 h-3.5 stroke-[2]" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );

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
                className={`flex flex-col items-center justify-center p-5 rounded-lg border transition-all text-center cursor-pointer select-none ${
                  isSelected
                    ? "bg-primary text-primary-text border-primary shadow-sm"
                    : "bg-card-bg text-txt-primary border-border hover:border-slate-300 hover:shadow-xs"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-xl mb-3 transition-colors ${
                    isSelected
                      ? "bg-card-bg text-primary"
                      : "bg-surface text-secondary-subheading"
                  }`}
                >
                  <cat.icon />
                </div>
                <span className="font-medium text-lg leading-snug">
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

      {/* 1. Residential Lawn Care Specific Services */}
      {selectedCategory === "Residential Lawn Care" && (
        <div>
          <label className="block text-lg font-medium text-txt-primary mb-2">
            Select Specific Services <span className="text-trend-down">*</span>
          </label>
          <div className="space-y-2.5">
            {RESIDENTIAL_SERVICES.map((service) => {
              const isChecked = selectedServices.includes(service);
              return (
                <label
                  key={service}
                  className="group relative flex items-center gap-2.5 cursor-pointer select-none text-base text-secondary-subheading hover:text-txt-primary transition-colors py-0.5"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) =>
                      handleServiceToggle(service, e.target.checked)
                    }
                    className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                  />
                  <CustomCheckbox checked={isChecked} />
                  <span>{service}</span>
                </label>
              );
            })}
          </div>

          {renderAdditionalTags()}
        </div>
      )}

      {/* 2. Landscape & Property Maintenance Specific Services */}
      {selectedCategory === "Landscape & Property Maintenance" && (
        <div>
          <label className="block text-lg font-medium text-txt-primary mb-2">
            Select Specific Services <span className="text-trend-down">*</span>
          </label>
          <div className="space-y-2.5">
            {LANDSCAPE_SERVICES.map((service) => {
              const isChecked = selectedServices.includes(service);
              return (
                <label
                  key={service}
                  className="group relative flex items-center gap-2.5 cursor-pointer select-none text-base text-secondary-subheading hover:text-txt-primary transition-colors py-0.5"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) =>
                      handleServiceToggle(service, e.target.checked)
                    }
                    className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                  />
                  <CustomCheckbox checked={isChecked} />
                  <span>{service}</span>
                </label>
              );
            })}
          </div>

          {renderAdditionalTags()}
        </div>
      )}

      {/* 3. Commercial Services Specific Services */}
      {selectedCategory === "Commercial Services" && (
        <div className="space-y-5">
          {/* Select Specific Commercial Service Type */}
          <div>
            <label className="block text-lg font-medium text-txt-primary mb-2">
              Select Specific Commercial Service Type{" "}
              <span className="text-trend-down">*</span>
            </label>
            <div className="space-y-2.5">
              {COMMERCIAL_TYPES.map((type) => {
                const isSelected = activeCommercialType === type;
                return (
                  <label
                    key={type}
                    className="group relative flex items-center gap-2.5 cursor-pointer select-none text-base text-secondary-subheading hover:text-txt-primary transition-colors py-0.5"
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleCommercialTypeSelect(type)}
                      className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                    />
                    <CustomCheckbox checked={isSelected} />
                    <span>{type}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Dynamic Sub-Option Field: HOA Maintenance */}
          {activeCommercialType === "HOA Maintenance" && (
            <div>
              <label className="block text-lg font-medium text-txt-primary mb-2">
                Community Size <span className="text-trend-down">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-6">
                {HOA_COMMUNITY_SIZES.map((size) => {
                  const isChecked = commercialCommunitySize === size;
                  return (
                    <label
                      key={size}
                      className="group relative flex items-center gap-2.5 cursor-pointer text-base text-secondary-subheading hover:text-txt-primary select-none transition-colors py-0.5"
                    >
                      <input
                        type="radio"
                        value={size}
                        {...register("commercialCommunitySize")}
                        className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                      />
                      <CustomRadio checked={isChecked} />
                      <span>{size}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Dynamic Sub-Option Field: Church Maintenance */}
          {activeCommercialType === "Church Maintenance" && (
            <div>
              <label className="block text-lg font-medium text-txt-primary mb-2">
                Campus Size <span className="text-trend-down">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-2.5 gap-x-4">
                {CHURCH_CAMPUS_SIZES.map((size) => {
                  const isChecked = commercialCampusSize === size;
                  return (
                    <label
                      key={size}
                      className="group relative flex items-center gap-2.5 cursor-pointer text-base text-secondary-subheading hover:text-txt-primary select-none transition-colors py-0.5"
                    >
                      <input
                        type="radio"
                        value={size}
                        {...register("commercialCampusSize")}
                        className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                      />
                      <CustomRadio checked={isChecked} />
                      <span>{size}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Dynamic Sub-Option Field: Municipal Services */}
          {activeCommercialType === "Municipal Services" && (
            <div>
              <label className="block text-lg font-medium text-txt-primary mb-2">
                Campus Size <span className="text-trend-down">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-2.5 gap-x-4">
                {CHURCH_CAMPUS_SIZES.map((size) => {
                  const isChecked = commercialCampusSize === size;
                  return (
                    <label
                      key={size}
                      className="group relative flex items-center gap-2.5 cursor-pointer text-base text-secondary-subheading hover:text-txt-primary select-none transition-colors py-0.5"
                    >
                      <input
                        type="radio"
                        value={size}
                        {...register("commercialCampusSize")}
                        className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                      />
                      <CustomRadio checked={isChecked} />
                      <span>{size}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Dynamic Sub-Option Field: Commercial Office Properties */}
          {activeCommercialType === "Commercial Office Properties" && (
            <div>
              <label className="block text-lg font-medium text-txt-primary mb-2">
                Property Type <span className="text-trend-down">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-6">
                {COMMERCIAL_PROPERTY_TYPES.map((propType) => {
                  const isChecked = commercialPropertyType === propType;
                  return (
                    <label
                      key={propType}
                      className="group relative flex items-center gap-2.5 cursor-pointer text-base text-secondary-subheading hover:text-txt-primary select-none transition-colors py-0.5"
                    >
                      <input
                        type="radio"
                        value={propType}
                        {...register("commercialPropertyType")}
                        className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                      />
                      <CustomRadio checked={isChecked} />
                      <span>{propType}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Select Specific Services in 2 Columns */}
          <div>
            <label className="block text-lg font-medium text-txt-primary mb-2">
              Select Specific Services <span className="text-trend-down">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-6">
              {/* Left Column (4 items) */}
              <div className="space-y-2.5">
                {COMMERCIAL_SERVICES_LEFT.map((service) => {
                  const isChecked = selectedServices.includes(service);
                  return (
                    <label
                      key={service}
                      className="group relative flex items-center gap-2.5 cursor-pointer select-none text-base text-secondary-subheading hover:text-txt-primary transition-colors py-0.5"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) =>
                          handleServiceToggle(service, e.target.checked)
                        }
                        className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                      />
                      <CustomCheckbox checked={isChecked} />
                      <span>{service}</span>
                    </label>
                  );
                })}
              </div>

              {/* Right Column (3 items) */}
              <div className="space-y-2.5">
                {COMMERCIAL_SERVICES_RIGHT.map((service) => {
                  const isChecked = selectedServices.includes(service);
                  return (
                    <label
                      key={service}
                      className="group relative flex items-center gap-2.5 cursor-pointer select-none text-base text-secondary-subheading hover:text-txt-primary transition-colors py-0.5"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) =>
                          handleServiceToggle(service, e.target.checked)
                        }
                        className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                      />
                      <CustomCheckbox checked={isChecked} />
                      <span>{service}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {renderAdditionalTags()}
          </div>
        </div>
      )}

      {/* 4. Photography & Videography / DJ & Event Services Details */}
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
              placeholder="e.g. Community party, corporate event, wedding"
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
                placeholder="e.g. 50"
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
                placeholder="e.g. 4 hours"
                {...register("eventDuration")}
                className="w-full h-11 px-3 text-txt-primary bg-card-bg border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-border"
              />
            </div>
          </div>
        </div>
      )}

      {/* 5. Other Work */}
      {selectedCategory === "Other Work" && (
        <div>
          <label className="block text-lg font-medium text-txt-primary mb-1">
            Specify Service Needed <span className="text-trend-down">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Fence repair, painting, custom installation"
            value={selectedServices[0] || ""}
            onChange={(e) =>
              setValue(
                "specificServices",
                e.target.value ? [e.target.value] : [],
                { shouldValidate: true },
              )
            }
            className="w-full h-11 px-3 text-txt-primary bg-card-bg border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-border"
          />
        </div>
      )}

      {/* What type of request is this? */}
      <div>
        <label className="block text-lg font-medium text-txt-primary mb-2">
          What type of request is this?{" "}
          <span className="text-trend-down">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-3.5 gap-x-4">
          {[
            "One-time",
            "Recurring",
            "Emergency / Rush",
            "Estimate Only",
            "Existing Contract",
          ].map((type) => {
            const isChecked = requestType === type;
            return (
              <label
                key={type}
                className="group relative flex items-center gap-2.5 cursor-pointer text-base text-secondary-subheading hover:text-txt-primary select-none transition-colors py-0.5"
              >
                <input
                  type="radio"
                  value={type}
                  {...register("requestType")}
                  className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                />
                <CustomRadio checked={isChecked} />
                <span>{type}</span>
              </label>
            );
          })}
        </div>
        {errors.requestType && (
          <p className="text-xs text-trend-down mt-1">
            {errors.requestType.message}
          </p>
        )}
      </div>

      {/* Conditional: How often you need this service? (Shown when Recurring is chosen) */}
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
          options={RECURRING_FREQUENCY_OPTIONS}
          error={errors.recurringFrequency?.message}
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
            rows={4}
            maxLength={200}
            placeholder="Details description of your services,...."
            className="w-full text-base text-txt-primary resize-none focus:outline-none placeholder:text-secondary-subheading/60"
          />
          <div className="text-right text-xs text-secondary-subheading mt-1">
            {detailsDescription.length}/200
          </div>
        </div>
      </div>
    </div>
  );
};
