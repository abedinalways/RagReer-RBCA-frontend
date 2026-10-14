import type { Metadata } from "next";
import { PayrollView } from "@/features/admin/payroll/components/PayrollView";

export const metadata: Metadata = {
  title: "Payroll | Admin Console",
  description: "Track staff hours, hourly rates, disbursements, and pay records.",
};

export default function AdminPayrollPage() {
  return <PayrollView />;
}
