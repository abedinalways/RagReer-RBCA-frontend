import { PhotoItem, ServiceItem, EquipmentPair, EvidenceJobSummary } from "./types";

export const DEFAULT_JOB_SUMMARY: EvidenceJobSummary = {
  badgeTitle: "Submit Completed job",
  tag: "Residential",
  title: "North Entrance Monument & Islands",
  address: "100 Whispering Pines Blvd at Hwy 43",
  size: "Small (up to 1/4 acre)",
};

export const DEFAULT_BEFORE_PHOTOS: PhotoItem[] = [
  {
    id: "before-1",
    url: "https://images.unsplash.com/photo-1558904541-efa8c4a08931?auto=format&fit=crop&q=80&w=500",
  },
  {
    id: "before-2",
    url: "https://images.unsplash.com/photo-1592595896551-12b371d546d5?auto=format&fit=crop&q=80&w=500",
  },
];

export const DEFAULT_AFTER_PHOTOS: PhotoItem[] = [
  {
    id: "after-1",
    url: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=500",
  },
  {
    id: "after-2",
    url: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=500",
  },
];

export const INITIAL_SERVICES: ServiceItem[] = [
  { id: "s-1", label: "Overgrown plants trimmed", checked: true },
  { id: "s-2", label: "Garden waste removed", checked: true },
  { id: "s-3", label: "Pathways cleaned", checked: true },
  { id: "s-4", label: "Shrubs and bushes trimmed", checked: true },
  { id: "s-5", label: "Outdoor area cleared", checked: true },
  { id: "s-6", label: "Property surroundings cleaned", checked: true },
];

export const INITIAL_EQUIPMENT_PAIRS: EquipmentPair[] = [
  { left: "Lawn Mower", right: "Pruning Shears" },
  { left: "String Trimmer", right: "Wheelbarrow" },
  { left: "Edger", right: "Mulch Spreader" },
  { left: "Leaf Blower", right: "Shovel" },
  { left: "Hedge Trimmer", right: "Rake" },
];

export const INITIAL_EQUIPMENT_CHECKED: Record<string, boolean> = {
  "Lawn Mower": true,
  "Pruning Shears": true,
  "String Trimmer": true,
  Wheelbarrow: true,
  Edger: true,
  "Mulch Spreader": true,
  "Leaf Blower": true,
  Shovel: true,
  "Hedge Trimmer": true,
  Rake: true,
};
