export type AdminPropertyStatus = "Active" | "Pending" | "Inactive";

export interface AdminPropertyCustomer {
  name: string;
  email: string;
  avatar: string;
}

export interface AdminPropertyItem {
  id: string; // e.g. "PRT12458"
  propertyCode: string; // e.g. "#PRT12458"
  propertyType: "Residential" | "Commercial";
  propertyAddress: string;
  customer: AdminPropertyCustomer;
  status: AdminPropertyStatus;
  title?: string;
}

export interface PropertyAmenityDetails {
  gym: boolean;
  parking: string;
  pool: string;
  view: string;
}

export interface PropertyMaintainerDetails {
  name: string;
  phone: string;
  avatarUrl: string;
}

export interface PropertyLocationDetails {
  address: string;
  cityRegion: string;
  lat: number;
  lng: number;
  zoom?: number;
}

export interface ServiceHistoryItem {
  id: string;
  jobId: string;
  service: string;
  assignedCrew: {
    id: string;
    name: string;
    avatar: string;
  }[];
  visitDate: string;
  status: "Completed" | "In Progress" | "Cancelled";
}

export interface ActiveServiceDetails {
  id: string;
  title: string;
  status: "On Going" | "Scheduled" | "Completed";
  time: string;
  address: string;
  crewName: string;
  crewAvatars: string[];
}

export interface UpcomingVisitDetails {
  id: string;
  month: string;
  day: string;
  title: string;
  status: "Scheduled" | "Upcoming" | "In Progress";
  subtitle: string;
  address: string;
  time: string;
  crewName: string;
  crewAvatars: string[];
}

export interface AdminPropertyDetailData {
  id: string;
  propertyCode: string;
  title: string;
  status: AdminPropertyStatus;
  category: "Residential" | "Commercial";
  description: string;
  size: string;
  floors: string;
  amenities: PropertyAmenityDetails;
  siteAccessNotes: string;
  images: string[];
  maintainer: PropertyMaintainerDetails;
  location: PropertyLocationDetails;
  activeService: ActiveServiceDetails;
  upcomingVisits: UpcomingVisitDetails[];
  serviceHistory: ServiceHistoryItem[];
}
