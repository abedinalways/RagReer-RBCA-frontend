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
  street1?: string;
  street2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  description?: string;
  amenities?: string[];
  maintainerName?: string;
  maintainerPhone?: string;
  siteAccessNote?: string;
}

export interface ImportPreviewItem {
  id: string;
  type: PropertyType;
  name: string;
  street1: string;
  street2: string;
}
