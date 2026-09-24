import { Metadata } from "next";
import { NewRequest } from "@/features/customer/my-requests/components/NewRequest";

export const metadata: Metadata = { title: "New Requests" };

export default function NewRequestPage() {
  return <NewRequest />;
}
