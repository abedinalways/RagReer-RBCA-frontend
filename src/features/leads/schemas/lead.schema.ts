/**
 * features/leads/schemas/lead.schema.ts — Lead form validation (zod).
 */

import { z } from "zod";
import { LEAD_SOURCE_VALUES, LEAD_STATUS_VALUES } from "../types/lead.types";

export const leadFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(6, "Enter a valid phone number"),
  email: z.union([z.string().email("Enter a valid email address"), z.literal("")]).optional(),
  source: z.enum(LEAD_SOURCE_VALUES),
  status: z.enum(LEAD_STATUS_VALUES),
  assignedTo: z.string().optional(),
  notes: z.string().max(500, "Notes must be 500 characters or fewer").optional(),
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;