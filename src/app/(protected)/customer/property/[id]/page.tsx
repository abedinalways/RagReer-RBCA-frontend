import type { Metadata } from "next";
import MyPropertiesDetails from "@/features/customer/my-properties/components/MyPropertiesDetails";

export const metadata: Metadata = { title: "Property Details" };

interface PropertyDetailPageProps {
  params: { id: string };
}

export default function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  return <MyPropertiesDetails propertyId={params.id} />;
}