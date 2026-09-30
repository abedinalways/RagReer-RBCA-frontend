import React from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { NewRequestFormData } from "../schema/requestSchema";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { Trash2 } from "lucide-react";

interface Step1Props {
  form: UseFormReturn<NewRequestFormData>;
}

const AMENITY_OPTIONS = ["Gym", "Parking", "Pool", "Garden View"];

const ROLE_OPTIONS = [
  "Property Owner",
  "Property Manager",
  "Tenant",
  "Authorized Person",
];

const YARD_SIZE_OPTIONS = [
  "Small (up to 1/4 acre)",
  "Medium (1/4 - 1/2 acre)",
  "Large (1/2 - 1 acre)",
  "X-Large (1+ acre)",
  "Unknown - please assess",
];

const SAVED_PROPERTIES = [
  {
    id: "prop-1",
    name: "North Entrance Monument & Islands",
    role: "Property Owner",
    street1: "742 Evergreen Terrace",
    street2: "Building B, Suite 100",
    city: "Springfield",
    state: "Oregon",
    postalCode: "97477",
    whatYouHave: ["Gym", "Parking"],
    maintainerName: "John Anderson",
    maintainerPhone: "555-234-5678",
  },
  {
    id: "prop-2",
    name: "124 Oak Street Residence",
    role: "Property Manager",
    street1: "124 Oak Street",
    street2: "Apt 4B",
    city: "Seattle",
    state: "Washington",
    postalCode: "98101",
    whatYouHave: ["Pool", "Garden View"],
    maintainerName: "Sarah Jenkins",
    maintainerPhone: "555-876-5432",
  },
  {
    id: "prop-3",
    name: "Sunset Valley Commercial Park",
    role: "Authorized Person",
    street1: "890 Sunset Blvd",
    street2: "",
    city: "Portland",
    state: "Oregon",
    postalCode: "97201",
    whatYouHave: ["Parking", "Garden View"],
    maintainerName: "Robert Vance",
    maintainerPhone: "555-345-6789",
  },
];

export const Step1PropertyDetails: React.FC<Step1Props> = ({ form }) => {
  const {
    register,
    watch,
    setValue,
    control,
    formState: { errors },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "additionalAddresses",
  });

  const handleAddAddress = () => {
    append({
      street1: "",
      street2: "",
      city: "",
      state: "",
      postalCode: "",
      maintainerName: "",
      maintainerPhone: "",
    });
  };

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

  /**
   * Designer note logic:
   * "if the customer import all property address he can choose a particular property from this dropdown.
   * except description and size all the filed will be auto filled.
   * if any customer wants to request any additional work for an existing contract then he can choose
   * the property and the form will auto filled as the related information were already provided earlier"
   */
  const handleSavedPropertyChange = (propertyName: string) => {
    setValue("savedProperty", propertyName, { shouldValidate: true });
    const selected = SAVED_PROPERTIES.find((p) => p.name === propertyName);
    if (selected) {
      setValue("propertyName", selected.name, { shouldValidate: true });
      setValue("role", selected.role, { shouldValidate: true });
      setValue("street1", selected.street1, { shouldValidate: true });
      setValue("street2", selected.street2 || "", { shouldValidate: true });
      setValue("city", selected.city, { shouldValidate: true });
      setValue("state", selected.state, { shouldValidate: true });
      setValue("postalCode", selected.postalCode, { shouldValidate: true });
      setValue("whatYouHave", selected.whatYouHave, { shouldValidate: true });
      setValue("maintainerName", selected.maintainerName || "", {
        shouldValidate: true,
      });
      setValue("maintainerPhone", selected.maintainerPhone || "", {
        shouldValidate: true,
      });
      // description and size are left untouched per designer specification!
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-medium text-primary-heading">
          Property Details
        </h2>
        <p className="text-sm text-secondary-subheading mt-0.5">
          Provide all the details of your property
        </p>
      </div>

      {/* Select Role */}
      <CustomSelect
        id="role-select"
        label="Select your role for the property"
        required
        placeholder="Select Role"
        value={watch("role")}
        onChange={(val) => setValue("role", val, { shouldValidate: true })}
        options={ROLE_OPTIONS}
        error={errors.role?.message}
      />

      {/* Choose Saved Property */}
      <CustomSelect
        id="saved-property-select"
        label="Choose from your saved property"
        placeholder="Choose Property"
        value={watch("savedProperty")}
        onChange={handleSavedPropertyChange}
        options={SAVED_PROPERTIES.map((p) => ({
          value: p.name,
          label: p.name,
        }))}
        error={errors.savedProperty?.message}
      />

      {/* Property Name */}
      <div>
        <label className="block text-lg font-medium text-txt-primary mb-1">
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
        <label className="block text-lg font-medium text-txt-primary mb-1">
          Address <span className="text-trend-down">*</span>
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
          <p className="text-xs text-trend-down mt-1">
            Please provide complete address details
          </p>
        )}
      </div>

      {/* Approximate Yard Size */}
      <CustomSelect
        id="yard-size-select"
        label="Approximate Yard Size"
        required
        placeholder="Select size"
        value={watch("lotSize")}
        onChange={(val) => setValue("lotSize", val, { shouldValidate: true })}
        options={YARD_SIZE_OPTIONS}
        error={errors.lotSize?.message}
      />

      {/* Choose What you Have */}
      <div>
        <label className="block text-lg font-medium text-txt-primary mb-2">
          Choose What you Have <span className="text-trend-down">*</span>
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
          <p className="text-xs text-trend-down mt-1">
            {errors.whatYouHave.message}
          </p>
        )}
      </div>

      {/* Describe about your property */}
      <div>
        <label className="block text-lg font-medium text-txt-primary mb-1">
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
          <label className="block text-lg font-medium text-txt-primary mb-1">
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
          <label className="block text-lg font-medium text-txt-primary mb-1">
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

      {/* Additional Property Addresses */}
      {fields.length > 0 && (
        <div className="space-y-4 pt-2">
          {fields.map((field, index) => {
            const addressErrors = errors.additionalAddresses?.[index];
            return (
              <div
                key={field.id}
                className="p-4 rounded-lg border border-border bg-page-bg/40 space-y-4 relative"
              >
                <div className="flex items-center justify-between pb-2 border-b border-border">
                  <h4 className="text-base font-medium text-txt-primary">
                    Additional Property Address #{index + 1}
                  </h4>
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="inline-flex items-center gap-1.5 text-xs text-trend-down hover:underline font-medium cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove
                  </button>
                </div>

                {/* Address block */}
                <div>
                  <label className="block text-sm font-medium text-txt-primary mb-1">
                    Address <span className="text-trend-down">*</span>
                  </label>
                  <div className="border border-border rounded-md overflow-hidden bg-card-bg divide-y divide-border">
                    <input
                      type="text"
                      placeholder="Street 1"
                      {...register(`additionalAddresses.${index}.street1` as const)}
                      className="w-full h-11 px-3 text-txt-primary focus:outline-none focus:bg-page-bg text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Street 2"
                      {...register(`additionalAddresses.${index}.street2` as const)}
                      className="w-full h-11 px-3 text-txt-primary focus:outline-none focus:bg-page-bg text-sm"
                    />
                    <div className="grid grid-cols-3 divide-x divide-border">
                      <input
                        type="text"
                        placeholder="City"
                        {...register(`additionalAddresses.${index}.city` as const)}
                        className="w-full h-11 px-3 text-txt-primary focus:outline-none focus:bg-page-bg text-sm"
                      />
                      <input
                        type="text"
                        placeholder="State"
                        {...register(`additionalAddresses.${index}.state` as const)}
                        className="w-full h-11 px-3 text-txt-primary focus:outline-none focus:bg-page-bg text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Postal Code"
                        {...register(`additionalAddresses.${index}.postalCode` as const)}
                        className="w-full h-11 px-3 text-txt-primary focus:outline-none focus:bg-page-bg text-sm"
                      />
                    </div>
                  </div>
                  {(addressErrors?.street1 ||
                    addressErrors?.city ||
                    addressErrors?.state ||
                    addressErrors?.postalCode) && (
                    <p className="text-xs text-trend-down mt-1">
                      Please provide complete address details
                    </p>
                  )}
                </div>

                {/* Maintainer Info for this address */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-txt-primary mb-1">
                      Property Maintainer Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter the person name"
                      {...register(
                        `additionalAddresses.${index}.maintainerName` as const
                      )}
                      className="w-full h-11 px-3 text-txt-primary bg-card-bg border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-border text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-txt-primary mb-1">
                      Property Maintainer Phone
                    </label>
                    <input
                      type="text"
                      placeholder="XXX-(XXXX)-XXX"
                      {...register(
                        `additionalAddresses.${index}.maintainerPhone` as const
                      )}
                      className="w-full h-11 px-3 text-txt-primary bg-card-bg border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-border text-sm"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add another address button */}
      <div>
        <button
          type="button"
          onClick={handleAddAddress}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-secondary-subheading hover:text-txt-primary cursor-pointer select-none transition-colors"
        >
          <span className="text-lg font-normal leading-none">+</span> Add another property
          address
        </button>
      </div>
    </div>
  );
};
