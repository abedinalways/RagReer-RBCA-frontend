import { Suspense } from "react";
import type { Metadata } from "next";
import { CreateEstimateView } from "@/features/admin/requests/components/CreateEstimateView";

export const metadata: Metadata = {
  title: "Create Estimate — Service Requests",
  description: "Create a new estimate for customer service requests.",
};

export default function CreateEstimatePage() {
  return (
    <Suspense
      fallback={
        <div className="w-full flex items-center justify-center min-h-[400px]">
          <div className="h-8 w-8 animate-spin rounded-sm border-4 border-primary border-t-transparent" />
        </div>
      }
    >
      <CreateEstimateView />
    </Suspense>
  );
}
