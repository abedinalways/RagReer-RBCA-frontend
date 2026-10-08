export type ServiceCategory =
  | "Residential Lawn Care"
  | "Landscape & Property Maintenance"
  | "Commercial Services"
  | "Photography & Videography"
  | "DJ & Event Services";

export type ServicePricingType =
  | "Fixed Price"
  | "Price Range"
  | "Tiered Pricing"
  | "Custom Quote";

export type ServicePricingBasis =
  | "Per Service"
  | "Per Visit"
  | "Per Property"
  | "Per Hour"
  | "Per Application"
  | "Per Bag"
  | "Per Unit"
  | "Per Cu. Yd."
  | "Per 1,000 sq ft"
  | "Other";

export type TieredSetBy = "Set by Property Size" | "Set by Crew Size";

export type PropertySizeOption =
  | "1/8 acre or less"
  | "1/4 acre"
  | "1/2 acre"
  | "3/4 acre"
  | "1 acre"
  | "Entrance Only"
  | "Small HOA"
  | "Medium HOA"
  | "Large HOA"
  | "Small Church"
  | "Medium Church"
  | "Large Campus"
  | "Small Office"
  | "Medical Office"
  | "Retail Strip"
  | "Industrial";

export type CrewSizeOption = "One person" | "Two person" | "Three person";

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  category: string;
  applicableTo: string[]; // e.g. ["HOA Maintenance", "Church Maintenance", "Commercial Add-On"]
  pricingType: ServicePricingType;
  pricingBasis?: ServicePricingBasis | string;
  price?: string; // For Fixed Price or Tiered (Crew)
  minPrice?: string; // For Price Range or Tiered (Property Size)
  maxPrice?: string; // For Price Range or Tiered (Property Size)
  setBy?: TieredSetBy; // For Tiered Pricing
  propertySize?: PropertySizeOption; // For Tiered Pricing (Property Size)
  crewSize?: CrewSizeOption; // For Tiered Pricing (Crew Size)
  addMaterialCost: boolean;
  isActive: boolean;
  updatedOn: string; // e.g. "Sep 27, 2026"
}

export interface ServiceFilters {
  search: string;
  category: string;
  applicableTo: string;
  pricingType: string;
  status: string; // "all" | "active" | "inactive"
}
