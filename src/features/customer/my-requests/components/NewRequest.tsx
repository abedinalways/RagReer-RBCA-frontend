"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Step1PropertyDetails } from "./Step1PropertyDetails";
import { Step2SiteAccess } from "./Step2SiteAccess";
import { Step3ServiceDetails } from "./Step3ServiceDetails";
import { Step4PreferredDates } from "./Step4PreferredDates";
import { StepSubmitted } from "./StepSubmitted";
import { NewRequestFormData, newRequestSchema } from "../schema/requestSchema";
import { Save, ArrowLeft, ArrowRight } from "lucide-react";

const STEP_TITLES = [
  "Property Details",
  "Site access & conditions",
  "Services",
  "Schedule",
];

export const NewRequest: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const form = useForm<NewRequestFormData>({
    resolver: zodResolver(newRequestSchema),
    mode: "onChange",
    defaultValues: {
      role: "",
      savedProperty: "",
      propertyName: "North Entrance Monument & Islands",
      street1: "",
      street2: "",
      city: "",
      state: "",
      postalCode: "",
      lotSize: "",
      whatYouHave: [],
      propertyDescription: "",
      maintainerName: "",
      maintainerPhone: "",
      hasGateCode: false,
      hasPets: false,
      hasHazards: false,
      hasUtilities: false,
      isTenantOccupied: false,
      hasParkingRestrictions: false,
      mustBePresent: false,
      serviceCategory: "",
      specificCommercialTypes: [],
      specificServices: [],
      additionalServices: [],
      requestType: "One-time",
      serviceDetailsDescription: "",
      preferredDate: "",
      secondaryDate: "",
      photos: [],
    },
  });

  const { trigger, handleSubmit } = form;

  const handleNext = async () => {
    let isValid = false;

    if (currentStep === 1) {
      isValid = await trigger([
        "role",
        "street1",
        "city",
        "state",
        "postalCode",
        "lotSize",
        "whatYouHave",
      ]);
    } else if (currentStep === 2) {
      isValid = await trigger([
        "gateCodeInstructions",
        "petDetails",
        "hazardDetails",
        "utilityNotes",
        "tenantName",
        "tenantPhone",
        "parkingNotes",
      ]);
    } else if (currentStep === 3) {
      isValid = await trigger(["serviceCategory", "requestType"]);
    } else if (currentStep === 4) {
      isValid = await trigger(["preferredDate", "photos"]);
    }

    if (isValid && currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = (data: NewRequestFormData) => {
    console.log("Final Request Data:", data);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    form.reset();
    setIsSubmitted(false);
    setCurrentStep(1);
  };

  return (
    <div className="max-w-2xl mx-auto bg-layout-bg border border-border rounded-sm overflow-hidden">
      {!isSubmitted && (
        <div className="p-6 pb-4 border-b border-border-subtle">
          {/* Header Title Bar */}
          <div className="flex items-center justify-between mb-2">
            <h1 className="tex-[24px] font-medium text-primary-heading tracking-tight">
              New Request
            </h1>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 text-[1rem] font-medium text-secondary-subheading hover:text-txt-primary cursor-pointer"
            >
              <span>Save</span>
              <Save className="w-5 h-5" />
            </button>
          </div>

          {/* Subtitle & Step Number */}
          <div className="flex items-center justify-between text-xs text-secondary-subheading mb-3">
            <span>{STEP_TITLES[currentStep - 1]}</span>
            <span>Step {currentStep} of 4</span>
          </div>

          {/* 4 Segmented Progress Bars */}
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  step <= currentStep ? "bg-primary" : "bg-surface"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Main Form Body */}
      <form onSubmit={handleSubmit(onSubmit)} className="p-6">
        {isSubmitted ? (
          <StepSubmitted onReset={handleReset} />
        ) : (
          <>
            {currentStep === 1 && <Step1PropertyDetails form={form} />}
            {currentStep === 2 && <Step2SiteAccess form={form} />}
            {currentStep === 3 && <Step3ServiceDetails form={form} />}
            {currentStep === 4 && <Step4PreferredDates form={form} />}

            {/* Step Navigation Controls */}
            <div className="mt-8 pt-4 border-t border-border-subtle flex items-center gap-3">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="w-1/2 sm:w-auto flex-1 h-11 border border-primary text-primary font-medium rounded-md hover:bg-page-bg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              )}

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full sm:w-auto flex-1 h-11 bg-primary text-primary-text font-medium rounded-md hover:bg-primary-hover transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full sm:w-auto flex-1 h-11 bg-primary text-primary-text font-medium rounded-md hover:bg-primary-hover transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </>
        )}
      </form>
    </div>
  );
};
