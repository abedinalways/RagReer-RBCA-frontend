import type { Metadata } from "next";
import { MyRequests } from "@/features/customer/my-requests/components/MyRequests";

export const metadata: Metadata = { title: "My Requests" };

export default function CustomerRequestsPage() {
  return <MyRequests />;
}
