import React from "react";
import { UseFormReturn } from "react-hook-form";
import { NewRequestFormData } from "../schema/requestSchema";
import SelectBox from "@/components/icons/customer/SelectBox";

interface Step2Props {
  form: UseFormReturn<NewRequestFormData>;
}

const CustomCheckbox: React.FC<{ checked?: boolean }> = ({ checked }) => {
  return checked ? (
    <SelectBox className="w-[18px] h-[18px] shrink-0" />
  ) : (
    <div className="w-[18px] h-[18px] rounded-[3px] border border-border-input bg-card-bg shrink-0 transition-colors hover:border-primary/60" />
  );
};

export const Step2SiteAccess: React.FC<Step2Props> = ({ form }) => {
  const { register, watch } = form;

  const hasGateCode = watch("hasGateCode");
  const hasPets = watch("hasPets");
  const hasHazards = watch("hasHazards");
  const hasUtilities = watch("hasUtilities");
  const isTenantOccupied = watch("isTenantOccupied");
  const hasParkingRestrictions = watch("hasParkingRestrictions");
  const mustBePresent = watch("mustBePresent");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-medium text-primary-heading">
          Site Access & Conditions
        </h2>
        <p className="text-sm text-secondary-subheading mt-0.5">
          Select everything that applies to this property
        </p>
      </div>

      <div className="space-y-5">
        {/* Item 1: Gate Code */}
        <div className="pb-4 border-b border-border-subtle space-y-3">
          <label className="flex items-center gap-2 cursor-pointer text-base font-normal text-secondary-subheading select-none">
            <input
              type="checkbox"
              {...register("hasGateCode")}
              className="sr-only"
            />
            <CustomCheckbox checked={hasGateCode} />
            Gate or access code required
          </label>
          {hasGateCode && (
            <div className="pl-6 space-y-1">
              <label className="block text-base font-medium text-primary-heading">
                Access instructions
              </label>
              <input
                type="text"
                placeholder="Do not enter full codes...."
                {...register("gateCodeInstructions")}
                className="w-full h-11 px-3 text-txt-primary bg-page-bg border border-border rounded-md focus:outline-none focus:bg-card-bg focus:ring-2 focus:ring-border"
              />
            </div>
          )}
        </div>

        {/* Item 2: Pets */}
        <div className="pb-4 border-b border-border-subtle space-y-3">
          <label className="flex items-center gap-2 cursor-pointer text-base font-normal text-secondary-subheading select-none">
            <input
              type="checkbox"
              {...register("hasPets")}
              className="sr-only"
            />
            <CustomCheckbox checked={hasPets} />
            Pets on property
          </label>
          {hasPets && (
            <div className="pl-6 space-y-1">
              <label className="block text-base font-medium text-primary-heading">
                Describe if you have any pet
              </label>
              <input
                type="text"
                placeholder="eg. 2 dog will be indoors during services"
                {...register("petDetails")}
                className="w-full h-11 px-3 text-txt-primary bg-page-bg border border-border rounded-md focus:outline-none focus:bg-card-bg focus:ring-2 focus:ring-border"
              />
            </div>
          )}
        </div>

        {/* Item 3: Hazards */}
        <div className="pb-4 border-b border-border-subtle space-y-3">
          <label className="flex items-center gap-2 cursor-pointer text-base font-normal text-secondary-subheading select-none">
            <input
              type="checkbox"
              {...register("hasHazards")}
              className="sr-only"
            />
            <CustomCheckbox checked={hasHazards} />
            Known hazards on site
          </label>
          {hasHazards && (
            <div className="pl-6 space-y-1">
              <label className="block text-base font-medium text-primary-heading">
                Describe if there is any hazard
              </label>
              <input
                type="text"
                placeholder="eg. exposed roots near fence, uneven terrain in backyard"
                {...register("hazardDetails")}
                className="w-full h-11 px-3 text-txt-primary bg-page-bg border border-border rounded-md focus:outline-none focus:bg-card-bg focus:ring-2 focus:ring-border"
              />
            </div>
          )}
        </div>

        {/* Item 4: Underground Utilities */}
        <div className="pb-4 border-b border-border-subtle space-y-3">
          <label className="flex items-center gap-2 cursor-pointer text-base font-normal text-secondary-subheading select-none">
            <input
              type="checkbox"
              {...register("hasUtilities")}
              className="sr-only"
            />
            <CustomCheckbox checked={hasUtilities} />
            Underground utilities present
          </label>
          {hasUtilities && (
            <div className="pl-6 space-y-1">
              <label className="block text-base font-medium text-primary-heading">
                Notes
              </label>
              <input
                type="text"
                placeholder="Location or any relevant details"
                {...register("utilityNotes")}
                className="w-full h-11 px-3 text-txt-primary bg-page-bg border border-border rounded-md focus:outline-none focus:bg-card-bg focus:ring-2 focus:ring-border"
              />
            </div>
          )}
        </div>

        {/* Item 5: Tenant Occupied */}
        <div className="pb-4 border-b border-border-subtle space-y-3">
          <label className="flex items-center gap-2 cursor-pointer text-base font-normal text-secondary-subheading select-none">
            <input
              type="checkbox"
              {...register("isTenantOccupied")}
              className="sr-only"
            />
            <CustomCheckbox checked={isTenantOccupied} />
            Tenant currently occupying property
          </label>
          {isTenantOccupied && (
            <div className="pl-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-base font-medium text-primary-heading mb-1">
                  Tenant Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Name"
                  {...register("tenantName")}
                  className="w-full h-11 px-3 text-secondary-subheading bg-page-bg border border-border rounded-md focus:outline-none focus:bg-card-bg focus:ring-2 focus:ring-border"
                />
              </div>
              <div>
                <label className="block text-base font-medium text-primary-heading mb-1">
                  Tenant Phone
                </label>
                <input
                  type="text"
                  placeholder="XXX-(XXXX)-XXX"
                  {...register("tenantPhone")}
                  className="w-full h-11 px-3 text-secondary-subheading bg-page-bg border border-border rounded-md focus:outline-none focus:bg-card-bg focus:ring-2 focus:ring-border"
                />
              </div>
            </div>
          )}
        </div>

        {/* Item 6: Parking Restrictions */}
        <div className="pb-4 border-b border-border-subtle space-y-3">
          <label className="flex items-center gap-2 cursor-pointer text-base font-normal text-secondary-subheading select-none">
            <input
              type="checkbox"
              {...register("hasParkingRestrictions")}
              className="sr-only"
            />
            <CustomCheckbox checked={hasParkingRestrictions} />
            Parking restrictions apply
          </label>
          {hasParkingRestrictions && (
            <div className="pl-6 space-y-1">
              <label className="block text-base font-medium text-primary-heading">
                Notes
              </label>
              <input
                type="text"
                placeholder="eg. street parking only, no trucks allowed"
                {...register("parkingNotes")}
                className="w-full h-11 px-3 text-txt-primary bg-page-bg border border-border rounded-md focus:outline-none focus:bg-card-bg focus:ring-2 focus:ring-border"
              />
            </div>
          )}
        </div>

        {/* Item 7: Must be Present */}
        <div>
          <label className="flex items-center gap-2 cursor-pointer text-base font-normal text-secondary-subheading select-none">
            <input
              type="checkbox"
              {...register("mustBePresent")}
              className="sr-only"
            />
            <CustomCheckbox checked={mustBePresent} />
            I must be present during service
          </label>
        </div>
      </div>
    </div>
  );
};
