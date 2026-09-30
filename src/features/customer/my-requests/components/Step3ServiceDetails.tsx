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
import { Plus, X, Calendar, ChevronUp, ChevronDown } from "lucide-react";
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

const PHOTOGRAPHY_SERVICES = [
  "Real State Photography",
  "Drone Photography",
  "Listing Videos",
  "Before/after Photos",
];

const INDOOR_OUTDOOR_OPTIONS = [
  "Indoor Only",
  "Outdoor Only",
  "Both",
];

const EXISTING_CONTRACT_OPTIONS = [
  "Contract #CN-12586",
  "Contract #CN-1024",
  "Contract #CN-1025",
  "Contract #CN-1026",
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
  const photoIndoorOutdoor = watch("photoIndoorOutdoor");
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

      {/* 4. Photography & Videography */}
      {selectedCategory === "Photography & Videography" && (
        <div className="space-y-5">
          {/* Select Specific Services */}
          <div>
            <label className="block text-lg font-medium text-txt-primary mb-2">
              Select Specific Services <span className="text-trend-down">*</span>
            </label>
            <div className="space-y-2.5">
              {PHOTOGRAPHY_SERVICES.map((service) => {
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
            {errors.specificServices && (
              <p className="text-xs text-trend-down mt-1">
                {errors.specificServices.message}
              </p>
            )}
          </div>

          {/* Indoor or Outdoor? */}
          <div>
            <label className="block text-lg font-medium text-txt-primary mb-2">
              Indoor or Outdoor? <span className="text-trend-down">*</span>
            </label>
            <div className="flex flex-wrap items-center gap-6 sm:gap-8">
              {INDOOR_OUTDOOR_OPTIONS.map((option) => {
                const isChecked = photoIndoorOutdoor === option;
                return (
                  <label
                    key={option}
                    className="group relative flex items-center gap-2.5 cursor-pointer text-base text-secondary-subheading hover:text-txt-primary select-none transition-colors py-0.5"
                  >
                    <input
                      type="radio"
                      value={option}
                      {...register("photoIndoorOutdoor")}
                      onChange={(e) => {
                        setValue("photoIndoorOutdoor", e.target.value, {
                          shouldValidate: true,
                        });
                        form.clearErrors("photoIndoorOutdoor");
                      }}
                      className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                    />
                    <CustomRadio checked={isChecked} />
                    <span>{option}</span>
                  </label>
                );
              })}
            </div>
            {errors.photoIndoorOutdoor && (
              <p className="text-xs text-trend-down mt-1">
                {errors.photoIndoorOutdoor.message}
              </p>
            )}
          </div>
        </div>
      )}

      {/* 5. DJ & Event Services Details */}
      {selectedCategory === "DJ & Event Services" && (
        <div className="space-y-4">
          <div>
            <label className="block text-lg font-medium text-txt-primary mb-1.5">
              If approved, which day is best for you?{" "}
              <span className="text-trend-down">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                placeholder="dd/mm/yyyy"
                {...register("preferredDate")}
                className="w-full h-11 px-3.5 pr-10 text-txt-primary bg-card-bg border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-border text-base relative [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer cursor-pointer"
              />
              <Calendar className="w-5 h-5 text-secondary-subheading absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none stroke-[1.5]" />
            </div>
            {errors.preferredDate && (
              <p className="text-xs text-trend-down mt-1">
                {errors.preferredDate.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-lg font-medium text-txt-primary mb-1.5">
              Event Type <span className="text-trend-down">*</span>
            </label>
            <input
              type="text"
              placeholder="eg. community party"
              {...register("eventType")}
              className="w-full h-11 px-3.5 text-txt-primary bg-card-bg border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-border text-base placeholder:text-secondary-subheading/60"
            />
            {errors.eventType && (
              <p className="text-xs text-trend-down mt-1">
                {errors.eventType.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-lg font-medium text-txt-primary mb-1.5">
                Expected Guests
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  placeholder="04"
                  {...register("expectedGuests")}
                  className="w-full h-11 px-3.5 pr-8 text-txt-primary bg-card-bg border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-border text-base placeholder:text-secondary-subheading/60 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => {
                      const current = parseInt(watch("expectedGuests") || "0", 10);
                      const next = isNaN(current) ? 1 : current + 1;
                      setValue("expectedGuests", String(next).padStart(2, "0"));
                    }}
                    className="text-secondary-subheading hover:text-txt-primary p-0.5 cursor-pointer leading-none"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => {
                      const current = parseInt(watch("expectedGuests") || "1", 10);
                      if (current > 1) {
                        setValue("expectedGuests", String(current - 1).padStart(2, "0"));
                      }
                    }}
                    className="text-secondary-subheading hover:text-txt-primary p-0.5 cursor-pointer leading-none"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-lg font-medium text-txt-primary mb-1.5">
                Event Duration
              </label>
              <input
                type="text"
                placeholder="eg. 4 hours"
                {...register("eventDuration")}
                className="w-full h-11 px-3.5 text-txt-primary bg-card-bg border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-border text-base placeholder:text-secondary-subheading/60"
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

      {/* Conditional: Select your contract * (Shown when Existing Contract is chosen) */}
      {requestType === "Existing Contract" && (
        <CustomSelect
          id="existing-contract-select"
          label="Select your contract"
          required
          placeholder="Select a contract"
          value={watch("contractNumber")}
          onChange={(val) =>
            setValue("contractNumber", val, { shouldValidate: true })
          }
          options={EXISTING_CONTRACT_OPTIONS}
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
