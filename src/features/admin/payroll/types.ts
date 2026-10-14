export type PayrollStatus = "All" | "Paid" | "Pending" | "Processing";

export interface PayrollItem {
  id: string;
  name: string;
  email: string;
  avatar: string;
  hours: string;
  rate: string;
  totalPayable: string;
  status: "Paid" | "Pending" | "Processing";
}

export interface PayrollMetrics {
  totalCrew: number;
  totalHours: string;
  avgHourlyRate: string;
  totalPayable: string;
}

export interface PayPeriodOption {
  id: string;
  label: string;
  startDate?: string;
  endDate?: string;
  isCustom?: boolean;
}
