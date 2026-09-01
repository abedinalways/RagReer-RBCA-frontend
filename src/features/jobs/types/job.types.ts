/**
 * features/jobs/types/job.types.ts — Job domain types (shared by Admin + Worker).
 */

export const JOB_STATUS_VALUES = ["CURRENT", "UPCOMING", "COMPLETED", "CANCELLED"] as const;
export type JobStatus = (typeof JOB_STATUS_VALUES)[number];

export interface Job {
  id: string;
  title: string;
  description?: string;
  status: JobStatus;
  scheduledAt: string;
  startedAt?: string | null;
  property: { id: string; address: string };
  customer: { id: string; name: string; phone: string };
}