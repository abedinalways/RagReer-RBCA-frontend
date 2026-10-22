import type { Metadata } from "next";
import { AdminPropertiesView } from "@/features/admin/properties/components/AdminPropertiesView";

interface AdminPropertyDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const metadata: Metadata = {
  title: "Property Details | Admin Console",
  description: "View detailed property specifications, maintainer contact, active services, and service history.",
};

export default async function AdminPropertyDetailPage({
  params,
}: AdminPropertyDetailPageProps) {
  const { id } = await params;
  return <AdminPropertiesView initialPropertyId={id} />;
}
