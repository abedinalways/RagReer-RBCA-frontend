import React from "react";
import { UseFormReturn } from "react-hook-form";
import { NewRequestFormData } from "../schema/requestSchema";

interface Step1Props {
  form: UseFormReturn<NewRequestFormData>;
}

const AMENITY_OPTIONS = ["Gym", "Parking", "Pool", "Garden View"];

export const Step1PropertyDetails: React.FC<Step1Props> = ({ form }) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const descriptionValue = watch("propertyDescription") || "";
  const selectedAmenities = watch("whatYouHave") || [];

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    if (checked) {
      setValue("whatYouHave", [...selectedAmenities, amenity], {
        shouldValidate: true,
      });
    } else {
      setValue(
        "whatYouHave",
        selectedAmenities.filter((item) => item !== amenity),
        { shouldValidate: true },
      );
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-[20px] font-medium text-primary-heading">
          Property Details
        </h2>
        <p className="text-[14px] text-secondary-subheading mt-0.5">
          Provide all the details of your property
        </p>
      </div>

      {/* Select Role */}
      <div>
        <label className="block text-sm font-medium text-txt-primary mb-1">
          Select your role for the property{" "}
          <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <select
            {...register("role")}
            className="w-full h-11 px-3 pr-8 text-txt-primary bg-card-bg border border-border rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-border"
          >
            <option value="">Select Role</option>
            <option value="Owner">Property Owner</option>
            <option value="Property Manager">Property Manager</option>
            <option value="Tenant">Tenant</option>
            <option value="Agent">Real Estate Agent</option>
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-secondary-subheading">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
        {errors.role && (
          <p className="text-xs text-rose-500 mt-1">{errors.role.message}</p>
        )}
      </div>

      {/* Choose Saved Property */}
      <div>
        <label className="block text-sm font-medium text-txt-primary mb-1">
          Choose from your saved property
        </label>
        <div className="relative">
          <select
            {...register("savedProperty")}
            className="w-full h-11 px-3 pr-8 text-txt-primary bg-card-bg border border-border rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-border"
          >
            <option value="">Choose Property</option>
            <option value="North Entrance Monument & Islands">
              North Entrance Monument & Islands
            </option>
            <option value="Oak Street Residence">
              124 Oak Street Residence
            </option>
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-secondary-subheading">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Property Name */}
      <div>
        <label className="block text-sm font-medium text-txt-primary mb-1">
          Property Name
        </label>
        <input
          type="text"
          placeholder="North Entrance Monument & Islands"
          {...register("propertyName")}
          className="w-full h-11 px-3 text-txt-primary bg-card-bg border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-border"
        />
      </div>

      {/* Address Block */}
      <div>
        <label className="block text-sm font-medium text-txt-primary mb-1">
          Address <span className="text-rose-500">*</span>
        </label>
        <div className="border border-border rounded-md overflow-hidden bg-card-bg divide-y divide-border">
          <input
            type="text"
            placeholder="Street 1"
            {...register("street1")}
            className="w-full h-11 px-3 text-txt-primary focus:outline-none focus:bg-page-bg"
          />
          <input
            type="text"
            placeholder="Street 2"
            {...register("street2")}
            className="w-full h-11 px-3 text-txt-primary focus:outline-none focus:bg-page-bg"
          />
          <div className="grid grid-cols-3 divide-x divide-border">
            <input
              type="text"
              placeholder="City"
              {...register("city")}
              className="w-full h-11 px-3 text-txt-primary focus:outline-none focus:bg-page-bg"
            />
            <input
              type="text"
              placeholder="State"
              {...register("state")}
              className="w-full h-11 px-3 text-txt-primary focus:outline-none focus:bg-page-bg"
            />
            <input
              type="text"
              placeholder="Postal Code"
              {...register("postalCode")}
              className="w-full h-11 px-3 text-txt-primary focus:outline-none focus:bg-page-bg"
            />
          </div>
        </div>
        {(errors.street1 ||
          errors.city ||
          errors.state ||
          errors.postalCode) && (
          <p className="text-xs text-rose-500 mt-1">
            Please provide complete address details
          </p>
        )}
      </div>

      {/* Approximate Lot Size */}
      <div>
        <label className="block text-sm font-medium text-txt-primary mb-1">
          Approximate Lot Size <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <select
            {...register("lotSize")}
            className="w-full h-11 px-3 pr-8 text-txt-primary bg-card-bg border border-border rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-border"
          >
            <option value="">Select size</option>
            <option value="Under 0.25 Acres">Under 0.25 Acres</option>
            <option value="0.25 - 0.5 Acres">0.25 - 0.5 Acres</option>
            <option value="0.5 - 1 Acre">0.5 - 1 Acre</option>
            <option value="1+ Acres">1+ Acres</option>
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-secondary-subheading">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
        {errors.lotSize && (
          <p className="text-xs text-rose-500 mt-1">{errors.lotSize.message}</p>
        )}
      </div>

      {/* Choose What you Have */}
      <div>
        <label className="block text-sm font-medium text-txt-primary mb-2">
          Choose What you Have <span className="text-rose-500">*</span>
        </label>
        <div className="space-y-2">
          {AMENITY_OPTIONS.map((item) => {
            const isChecked = selectedAmenities.includes(item);
            return (
              <label
                key={item}
                className="flex items-center gap-2 cursor-pointer text-txt-primary text-sm"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => handleAmenityChange(item, e.target.checked)}
                  className="w-4 h-4 text-secondary-subheading rounded border-border focus:ring-border"
                />
                <span>{item}</span>
              </label>
            );
          })}
        </div>
        {errors.whatYouHave && (
          <p className="text-xs text-rose-500 mt-1">
            {errors.whatYouHave.message}
          </p>
        )}
      </div>

      {/* Describe about your property */}
      <div>
        <label className="block text-sm font-medium text-txt-primary mb-1">
          Describe about your property
        </label>
        <div className="relative border border-border rounded-md bg-card-bg p-3">
          <textarea
            {...register("propertyDescription")}
            rows={3}
            maxLength={200}
            placeholder="Details description of your property,...."
            className="w-full text-sm text-txt-primary resize-none focus:outline-none"
          />
          <div className="text-right text-xs text-secondary-subheading mt-1">
            {descriptionValue.length}/200
          </div>
        </div>
      </div>

      {/* Property Maintainer Contact */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-txt-primary mb-1">
            Property Maintainer Name
          </label>
          <input
            type="text"
            placeholder="Enter the person name"
            {...register("maintainerName")}
            className="w-full h-11 px-3 text-txt-primary bg-card-bg border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-border"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-txt-primary mb-1">
            Property Maintainer Phone
          </label>
          <input
            type="text"
            placeholder="XXX-(XXXX)-XXX"
            {...register("maintainerPhone")}
            className="w-full h-11 px-3 text-txt-primary bg-card-bg border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-border"
          />
        </div>
      </div>

      {/* Add another address button */}
      <button
        type="button"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-secondary-subheading hover:text-txt-primary"
      >
        <span className="text-lg font-normal">+</span> Add another property
        address
      </button>
    </div>
  );
};
