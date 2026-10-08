export type EquipmentCondition = "Good" | "Fair" | "Poor";
export type EquipmentStatus = "In Use" | "Available" | "Damaged" | "In Repair";

export interface AssignedWorker {
  name: string;
  role: string;
  avatarUrl?: string;
}

export interface EquipmentItem {
  id: string;
  name: string;
  type: string;
  condition: EquipmentCondition;
  assignedTo?: AssignedWorker | null;
  assignedJob?: string | null;
  lastInspection: string; // e.g. "Aug 21, 2026"
  status: EquipmentStatus;
}

export interface EquipmentStats {
  total: number;
  available: number;
  inUse: number;
  inRepair: number;
  damaged: number;
}

export interface EquipmentFilters {
  search: string;
  type: string;
  condition: string;
  status: string;
}
