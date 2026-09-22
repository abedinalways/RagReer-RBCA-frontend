import type { Metadata } from "next";
import Estimate from "@/features/customer/estimate/components/Estimate";

export const metadata: Metadata = { title: "Estimation" };

export default function CustomerEstimationsPage() {
  return <Estimate />;
}
