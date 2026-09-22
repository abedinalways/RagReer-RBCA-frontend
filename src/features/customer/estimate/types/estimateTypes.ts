export type EstimateStatus = "Pending Approval" | "Approved" | "Declined";

export interface EstimateItem {
  id: string;
  estimateId: string;
  requestId: string;
  propertyAddress: string;
  serviceType: string;
  issueDate: string;
  status: EstimateStatus;
  amount: string;
}

export interface EstimateStatusStyle {
  label: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  dotBg: string;
}

export interface ColumnDef<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (row: T) => React.ReactNode;
  className?: string;
  headerClassName?: string;
}
