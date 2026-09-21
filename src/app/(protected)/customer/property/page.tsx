import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/shared/PlaceholderPage";
import { MyProperties } from "@/features/customer/my-properties/components/MyProperties";

export const metadata: Metadata = { title: "My Property" };

export default function CustomerPropertyPage() {
  return <MyProperties />;
}
