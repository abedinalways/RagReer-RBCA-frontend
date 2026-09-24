import React from "react";
import { UseFormReturn } from "react-hook-form";
import { NewRequestFormData } from "../schema/requestSchema";

interface Step2Props {
  form: UseFormReturn<NewRequestFormData>;
}

export const Step2SiteAccess: React.FC<Step2Props> = ({ form }) => {
  const { register, watch } = form;

  const hasGateCode = watch("hasGateCode");
  const hasPets = watch("hasPets");
  const hasHazards = watch("hasHazards");
  const hasUtilities = watch("hasUtilities");
  const isTenantOccupied = watch("isTenantOccupied");
  const hasParkingRestrictions = watch("hasParkingRestrictions");

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
          <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-txt-primary">
            <input
              type="checkbox"
              {...register("hasGateCode")}
              className="w-4 h-4 text-secondary-subheading rounded border-border focus:ring-border"
            />
            Gate or access code required
          </label>
          {hasGateCode && (
            <div className="pl-6 space-y-1">
              <label className="block text-sm font-medium text-txt-primary">
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
          <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-txt-primary">
            <input
              type="checkbox"
              {...register("hasPets")}
              className="w-4 h-4 text-secondary-subheading rounded border-border focus:ring-border"
            />
            Pets on property
          </label>
          {hasPets && (
            <div className="pl-6 space-y-1">
              <label className="block text-sm font-medium text-txt-primary">
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
          <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-txt-primary">
            <input
              type="checkbox"
              {...register("hasHazards")}
              className="w-4 h-4 text-secondary-subheading rounded border-border focus:ring-border"
            />
            Known hazards on site
          </label>
          {hasHazards && (
            <div className="pl-6 space-y-1">
              <label className="block text-sm font-medium text-txt-primary">
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
          <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-txt-primary">
            <input
              type="checkbox"
              {...register("hasUtilities")}
              className="w-4 h-4 text-secondary-subheading rounded border-border focus:ring-border"
            />
            Underground utilities present
          </label>
          {hasUtilities && (
            <div className="pl-6 space-y-1">
              <label className="block text-sm font-medium text-txt-primary">
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
          <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-txt-primary">
            <input
              type="checkbox"
              {...register("isTenantOccupied")}
              className="w-4 h-4 text-secondary-subheading rounded border-border focus:ring-border"
            />
            Tenant currently occupying property
          </label>
          {isTenantOccupied && (
            <div className="pl-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-txt-primary mb-1">
                  Tenant Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Name"
                  {...register("tenantName")}
                  className="w-full h-11 px-3 text-txt-primary bg-page-bg border border-border rounded-md focus:outline-none focus:bg-card-bg focus:ring-2 focus:ring-border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-txt-primary mb-1">
                  Tenant Phone
                </label>
                <input
                  type="text"
                  placeholder="XXX-(XXXX)-XXX"
                  {...register("tenantPhone")}
                  className="w-full h-11 px-3 text-txt-primary bg-page-bg border border-border rounded-md focus:outline-none focus:bg-card-bg focus:ring-2 focus:ring-border"
                />
              </div>
            </div>
          )}
        </div>

        {/* Item 6: Parking Restrictions */}
        <div className="pb-4 border-b border-border-subtle space-y-3">
          <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-txt-primary">
            <input
              type="checkbox"
              {...register("hasParkingRestrictions")}
              className="w-4 h-4 text-secondary-subheading rounded border-border focus:ring-border"
            />
            Parking restrictions apply
          </label>
          {hasParkingRestrictions && (
            <div className="pl-6 space-y-1">
              <label className="block text-sm font-medium text-txt-primary">
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
          <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-txt-primary">
            <input
              type="checkbox"
              {...register("mustBePresent")}
              className="w-4 h-4 text-secondary-subheading rounded border-border focus:ring-border"
            />
            I must be present during service
          </label>
        </div>
      </div>
    </div>
  );
};
