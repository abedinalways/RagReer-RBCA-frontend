import type {
  RequestDetailData,
  RequestDetailStateKey,
} from "../types/requestDetailTypes";

export const mockRequestsData: Record<
  RequestDetailStateKey,
  RequestDetailData
> = {
  "estimate-approval": {
    id: "req-1048-estimate",
    displayId: "#REQ-1048",
    title: "Landscape & Property Maintenance",
    createdOn: "Aug 16, 2026, 02:00 PM",
    status: "Estimate Approval Needed",
    requestType: "Recurring",
    requestedDateTime: "Aug 16, 2026, 02:00 PM",
    optionalDateTime: "Aug 21, 2026, 02:00 PM",
    serviceCount: "12 Services",
    description:
      "Complete spring lawn cleanup and landscape refresh for the front and back yard, including removal of leaves and debris, bed edging, trimming of ornamental grasses, and a fresh layer of mulch.",
    serviceGroups: [
      {
        category: "Lawn Care",
        items: ["Mowing", "String trimming", "Edging", "Blowing hard surfaces"],
      },
      {
        category: "Additional Services",
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
      "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=300&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=300&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300&auto=format&fit=crop&q=80",
    ],
    property: {
      title: "North Entrance Monument & Islands",
      address: "100 Whispering Pines Blvd at Hwy 43",
      tag: "Residential",
      imageUrl:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&auto=format&fit=crop&q=80",
      description:
        "South Retention Pond & Walking Trail evokes an elegant and serene residential community. It suggests a picturesque neighborhood with modern yet charming homes, possibly surrounded by lus",
      size: "Size : Large (1/2 - 1 acre)",
    },
    estimate: {
      status: "Pending Approval",
      totalAmount: "$3,794.00",
    },
    activityHistory: [
      {
        id: "act-1",
        title: "Estimate #EST-1045 was Issued",
        description: "Half Stache issued an estimate for your service",
        timeAgo: "3 minutes ago",
      },
      {
        id: "act-2",
        title: "Request Submitted",
        description: "Your request has been submitted to HALF STACHE",
        timeAgo: "1 hour ago",
      },
      {
        id: "act-3",
        title: "Request Saved as Draft",
        description: "Your request has been saved as draft",
        timeAgo: "1 hour ago",
      },
    ],
  },

  draft: {
    id: "req-1048-draft",
    displayId: "#REQ-1048",
    version: "Version 1",
    title: "Landscape & Property Maintenance",
    createdOn: "Aug 16, 2026",
    status: "Draft",
    requestType: "Recurring",
    requestedDateTime: "Aug 16, 2026, 02:00 PM",
    optionalDateTime: "Aug 21, 2026, 02:00 PM",
    serviceCount: "12 Services",
    description:
      "Complete spring lawn cleanup and landscape refresh for the front and back yard, including removal of leaves and debris, bed edging, trimming of ornamental grasses, and a fresh layer of mulch.",
    serviceGroups: [
      {
        category: "Lawn Care",
        items: ["Mowing", "String trimming", "Edging", "Blowing hard surfaces"],
      },
      {
        category: "Additional Services",
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
      "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=300&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=300&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300&auto=format&fit=crop&q=80",
    ],
    property: {
      title: "North Entrance Monument & Islands",
      address: "100 Whispering Pines Blvd at Hwy 43",
      tag: "Residential",
      imageUrl:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&auto=format&fit=crop&q=80",
      description:
        "South Retention Pond & Walking Trail evokes an elegant and serene residential community. It suggests a picturesque neighborhood with modern yet charming homes, possibly surrounded by lus",
      size: "Size : Large (1/2 - 1 acre)",
    },
    activityHistory: [
      {
        id: "act-1",
        title: "Request Saved as Draft",
        description: "Your request has been saved as draft",
        timeAgo: "1 hour ago",
      },
    ],
  },

  submitted: {
    id: "req-1048-submitted",
    displayId: "#REQ-1048/1",
    version: "Version 2",
    title: "Landscape & Property Maintenance",
    createdOn: "Aug 16, 2026",
    status: "Request Submitted",
    requestType: "Recurring",
    requestedDateTime: "Aug 16, 2026, 02:00 PM",
    optionalDateTime: "Aug 21, 2026, 02:00 PM",
    serviceCount: "12 Services",
    description:
      "Complete spring lawn cleanup and landscape refresh for the front and back yard, including removal of leaves and debris, bed edging, trimming of ornamental grasses, and a fresh layer of mulch.",
    serviceGroups: [
      {
        category: "Lawn Care",
        items: ["Mowing", "String trimming", "Edging", "Blowing hard surfaces"],
      },
      {
        category: "Additional Services",
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
      "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=300&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=300&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300&auto=format&fit=crop&q=80",
    ],
    property: {
      title: "North Entrance Monument & Islands",
      address: "100 Whispering Pines Blvd at Hwy 43",
      tag: "Residential",
      imageUrl:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&auto=format&fit=crop&q=80",
      description:
        "South Retention Pond & Walking Trail evokes an elegant and serene residential community. It suggests a picturesque neighborhood with modern yet charming homes, possibly surrounded by lus",
      size: "Size : Large (1/2 - 1 acre)",
    },
    customerUpdate: {
      date: "Aug 29, 2026",
      message: '"Please also access the backyard".',
    },
    halfStacheNote:
      "HALF STACHE team will review your request and notify you within 24hours.",
    activityHistory: [
      {
        id: "act-1",
        title: "Request Updated",
        description: "You request has been updated",
        timeAgo: "1 hour ago",
      },
      {
        id: "act-2",
        title: "Request Submitted",
        description: "Your request has been submitted to HALF STACHE",
        timeAgo: "1 hour ago",
      },
      {
        id: "act-3",
        title: "Request Saved as Draft",
        description: "Your request has been saved as draft",
        timeAgo: "1 hour ago",
      },
    ],
  },
};
