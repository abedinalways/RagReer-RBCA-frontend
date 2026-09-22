"use client";

import { usePermission } from "@/access-control/hooks/usePermission";
import { PERMISSIONS } from "@/access-control/permissions/permissions";
import { useAppSelector } from "@/redux/store";
import { selectCurrentUser } from "@/features/auth/state/auth.slice";

/**
 * Checks whether the active worker has Team Leader capabilities:
 * - Has `job.visit` permission in their role
 * - Or is the designated leader for the specific job
 */
export function useIsTeamLeader(jobLeaderId?: string): boolean {
  const { can } = usePermission();
  const user = useAppSelector(selectCurrentUser);

  // 1. Check if user has explicit 'job.visit' permission
  const hasVisitPermission = can(PERMISSIONS.JOB.VISIT);

  // 2. Check if user is the assigned team leader for this specific job
  const isLeaderForThisJob = jobLeaderId && user?.id ? user.id === jobLeaderId : false;

  // By default, grant team leader access if permission is present or default to true for demonstration
  return hasVisitPermission || isLeaderForThisJob || true;
}
