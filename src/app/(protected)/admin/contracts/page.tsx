import type { Metadata } from "next";
import { AdminContractsView } from "@/features/admin/contracts/components/AdminContractsView";

export const metadata: Metadata = {
  title: "Contracts — Admin",
};

export default function AdminContractsPage() {
  return <AdminContractsView />;
}
