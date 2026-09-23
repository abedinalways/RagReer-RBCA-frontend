import { z } from "zod";

export const step1Schema = z.object({
  role: z.string().min(1, "Please select your role"),
  savedProperty: z.string().optional(),
  propertyName: z.string().optional(),
  street1: z.string().min(1, "Street address is required"),
  street2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  lotSize: z.string().min(1, "Please select approximate lot size"),
  whatYouHave: z.array(z.string()).min(1, "Select at least one feature"),
  propertyDescription: z
    .string()
    .max(200, "Maximum 200 characters allowed")
    .optional(),
  maintainerName: z.string().optional(),
  maintainerPhone: z.string().optional(),
});

export const step2Schema = z.object({
  hasGateCode: z.boolean(),
  gateCodeInstructions: z.string().optional(),
  hasPets: z.boolean(),
  petDetails: z.string().optional(),
  hasHazards: z.boolean(),
  hazardDetails: z.string().optional(),
  hasUtilities: z.boolean(),
  utilityNotes: z.string().optional(),
  isTenantOccupied: z.boolean(),
  tenantName: z.string().optional(),
  tenantPhone: z.string().optional(),
  hasParkingRestrictions: z.boolean(),
  parkingNotes: z.string().optional(),
  mustBePresent: z.boolean(),
});

export const step3Schema = z.object({
  serviceCategory: z.string().min(1, "Please select a service category"),
  specificCommercialTypes: z.array(z.string()).optional(),
  specificServices: z.array(z.string()).optional(),
  additionalServices: z.array(z.string()).optional(),
  requestType: z.enum(
    [
      "One-time",
      "Recurring",
      "Emergency / Rush",
      "Estimate Only",
      "Existing Contract",
    ],
    {
      error: "Please select a request type",
    },
  ),
  recurringFrequency: z.string().optional(),
  contractNumber: z.string().optional(),
  serviceDetailsDescription: z
    .string()
    .max(200, "Maximum 200 characters allowed")
    .optional(),
  eventType: z.string().optional(),
  expectedGuests: z.string().optional(),
  eventDuration: z.string().optional(),
});

export const step4Schema = z.object({
  preferredDate: z.string().min(1, "Please select your preferred date"),
  secondaryDate: z.string().optional(),
  photos: z.array(z.string()).min(1, "At least one property photo is required"),
});

export const newRequestSchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema)
  .merge(step4Schema);

export type NewRequestFormData = z.infer<typeof newRequestSchema>;
