export type PropertyType = "Residential" | "Commercial";
export type PropertyStatus = "Active" | "Inactive";

export interface Property {
  id: string;
  title: string;
  type: PropertyType;
  status?: PropertyStatus;
  address: string;
  size: string;
  imageUrl: string;
}
