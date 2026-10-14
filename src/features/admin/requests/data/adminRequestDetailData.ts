import { AdminRequestStatus } from "../types/serviceRequestsTypes";

export interface AdminRequestDetailData {
  id: string;
  requestId: string;
  title: string;
  version: string;
  createdDate: string;
  status: AdminRequestStatus;
  requestedService: string;
  requestType: string;
  requestedDateTime: string;
  optionalDateTime: string;
  servicesCount: string;
  description: string;
  serviceRequested: {
    title: string;
    items: string[];
  }[];
  siteAccessNotes: string;
  attachedPhotos: string[];
  halfStacheNote?: string;
  customer: {
    id: string;
    customerId: string;
    name: string;
    logo?: string;
  };
  property: {
    id: string;
    title: string;
    type: string;
    address: string;
    image: string;
    description: string;
  };
}

export const DEFAULT_ADMIN_REQUEST_DETAIL: AdminRequestDetailData = {
  id: "req-1048",
  requestId: "#REQ-1048",
  title: "Residential Lawn Care",
  version: "Version 1",
  createdDate: "Aug 16, 2026",
  status: "New",
  requestedService: "Residencial Lawn Care",
  requestType: "One - Time",
  requestedDateTime: "Aug 16, 2026, 02:00 PM",
  optionalDateTime: "Aug 21, 2026, 02:00 PM",
  servicesCount: "12 Services",
  description:
    "Complete spring lawn cleanup and landscape refresh for the front and back yard, including removal of leaves and debris, bed edging, trimming of ornamental grasses, and a fresh layer of mulch.",
  serviceRequested: [
    {
      title: "Lawn Care",
      items: [
        "Mowing",
        "String trimming",
        "Edging",
        "Blowing hard surfaces",
      ],
    },
    {
      title: "Additional Services",
      items: [
        "Trim designated shrubs/hedges",
        "Remove resulting debris",
        "Edging",
        "Blowing",
      ],
    },
  ],
  siteAccessNotes:
    "Gate access required , 2 dogs on property (indoors during service) , Tenant currently occupying property (Name,Phone)",
  attachedPhotos: [
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200&h=200&fit=crop",
  ],
  halfStacheNote:
    "HALF STACHE team will review your request and notify you within 24hours.",
  customer: {
    id: "ctr-1278",
    customerId: "Customer ID: #CTR-1278",
    name: "Weatherly Property Group",
    logo: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=100&h=100&fit=crop",
  },
  property: {
    id: "prop-1",
    title: "North Entrance Monument & Islands",
    type: "Residential",
    address: "100 Whispering Pines Blvd at Hwy 43",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=500&fit=crop",
    description:
      "South Retention Pond & Walking Trail evokes an elegant and serene residential community. It suggests a picturesque neighborhood with modern yet charming homes, possibly surrounded by lush greenery, tranquil water views, and welcoming walking paths that invite residents to enjoy peaceful outdoor moments.",
  },
};
