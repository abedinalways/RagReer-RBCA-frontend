import { WorkspaceRedirect } from "@/components/shared/WorkspaceRedirect";

/**
 * Root route — redirects to the signed-in user's workspace home
 * (ADMIN → /admin/dashboard, CUSTOMER → /customer/requests, WORKER → /worker/home).
 */
export default function HomePage() {
  return <WorkspaceRedirect />;
}