export interface PhotoItem {
  id: string;
  url: string;
}

export interface ServiceItem {
  id: string;
  label: string;
  checked: boolean;
}

export interface EquipmentPair {
  left: string;
  right: string;
}

export interface EvidenceJobSummary {
  badgeTitle: string;
  tag: string;
  title: string;
  address: string;
  size: string;
}
