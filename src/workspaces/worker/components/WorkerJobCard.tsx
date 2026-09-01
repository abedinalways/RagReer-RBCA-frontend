"use client";

import { PermissionGuard } from "@/access-control/guards/PermissionGuard";
import { PERMISSIONS } from "@/access-control/permissions/permissions";
import { JobCard, type JobCardProps } from "@/features/jobs/components/JobCard";

/**
 * Worker PWA presentation wrapper — the WORKSPACE decides what the Worker can
 * see, while the business card itself lives in features/jobs (Feature ≠ Role).
 */
export function WorkerJobCard(props: JobCardProps) {
  return (
    <PermissionGuard permission={PERMISSIONS.JOB.VIEW} fallback={null}>
      <JobCard {...props} />
    </PermissionGuard>
  );
}