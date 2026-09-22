export type ContractStatus =
  | "Pending Approval"
  | "Active"
  | "Expired"
  | "Declined";

export interface ContractItem {
  id: string;
  contractId: string;
  propertyAddress: string;
  serviceType: string;
  issueDate: string;
  status: ContractStatus;
  amount: string;
}

export interface ContractStatusStyle {
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
