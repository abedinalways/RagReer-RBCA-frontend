import type {
  ActivityItem,
  RequestDetailData,
  RequestDetailStateKey,
} from "../types/requestDetailTypes";
import { myRequestsData } from "./myRequestsData";

const sharedProperty = {
  title: "North Entrance Monument & Islands",
  address: "100 Whispering Pines Blvd at Hwy 43",
  tag: "Residential",
  imageUrl:
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&auto=format&fit=crop&q=80",
  description:
    "South Retention Pond & Walking Trail evokes an elegant and serene residential community. It suggests a picturesque neighborhood with modern yet charming homes, possibly surrounded by lus",
  size: "Size : Large (1/2 - 1 acre)",
};

const sharedServiceGroups = [
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
];

const sharedPhotos = [
  "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=300&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=300&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300&auto=format&fit=crop&q=80",
];

const sharedDescription =
  "Complete spring lawn cleanup and landscape refresh for the front and back yard, including removal of leaves and debris, bed edging, trimming of ornamental grasses, and a fresh layer of mulch.";

const sharedSiteAccessNotes =
  "Gate access required , 2 dogs on property (indoors during service) , Tenant currently occupying property (Name,Phone)";

const sharedScheduling = {
  frequency: "Monthly",
  startDate: "Jan 01, 2026",
  endDate: "Dec 31, 2026",
  preferredTime: "11:00 AM- 02:00 PM",
  estimateDuration: "3hr/day",
  estimateVisit: "22 visit",
};

const siteVisitActivityHistory: ActivityItem[] = [
  {
    id: "act-sv-1",
    title: "Site Visit Scheduled - #REQ-125",
    description: "Site visit scheduled for this service",
    timeAgo: "3 minutes ago",
    dotColor: "blue",
  },
  {
    id: "act-sv-2",
    title: "Request Reviewed- #REQ-125— Site Visit Required",
    description: "Site visit required before estimate",
    timeAgo: "3 minutes ago",
    dotColor: "amber",
  },
  {
    id: "act-sv-3",
    title: "Request Submitted-#REQ-125",
    description: "Your request has been submitted for review",
    timeAgo: "1 hour ago",
    dotColor: "grey",
  },
];

export const mockRequestsData: Record<
  RequestDetailStateKey,
  RequestDetailData
> = {
  // 1. Figma Image 1: Draft
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
    description: sharedDescription,
    serviceGroups: sharedServiceGroups,
    siteAccessNotes: sharedSiteAccessNotes,
    attachedPhotos: sharedPhotos,
    property: sharedProperty,
    activityHistory: [
      {
        id: "act-draft-1",
        title: "Request Saved as Draft",
        description: "Your request has been saved as draft",
        timeAgo: "1 hour ago",
        dotColor: "grey",
      },
    ],
  },

  // 2. Figma Image 2: Request Submitted (Version 1 Initial)
  submitted: {
    id: "req-1048-submitted",
    displayId: "#REQ-1048",
    version: "Version 1",
    title: "Landscape & Property Maintenance",
    createdOn: "Aug 16, 2026",
    status: "Request Submitted",
    requestType: "Recurring",
    requestedDateTime: "Aug 16, 2026, 02:00 PM",
    optionalDateTime: "Aug 21, 2026, 02:00 PM",
    serviceCount: "12 Services",
    description: sharedDescription,
    serviceGroups: sharedServiceGroups,
    siteAccessNotes: sharedSiteAccessNotes,
    attachedPhotos: sharedPhotos,
    property: sharedProperty,
    halfStacheNote:
      "HALF STACHE team will review your request and notify you within 24hours.",
    activityHistory: [
      {
        id: "act-sub-1",
        title: "Request Submitted",
        description: "Your request has been submitted to HALF STACHE",
        timeAgo: "1 hour ago",
        dotColor: "grey",
      },
      {
        id: "act-sub-2",
        title: "Request Saved as Draft",
        description: "Your request has been saved as draft",
        timeAgo: "1 hour ago",
        dotColor: "grey",
      },
    ],
  },

  // 3. Figma Image 3: Request Submitted (Version 2 with Customer Update)
  "submitted-update": {
    id: "req-1048-update",
    displayId: "#REQ-1048/1",
    version: "Version 2",
    title: "Landscape & Property Maintenance",
    createdOn: "Aug 16, 2026",
    status: "Request Submitted",
    requestType: "Recurring",
    requestedDateTime: "Aug 16, 2026, 02:00 PM",
    optionalDateTime: "Aug 21, 2026, 02:00 PM",
    serviceCount: "12 Services",
    description: sharedDescription,
    serviceGroups: sharedServiceGroups,
    siteAccessNotes: sharedSiteAccessNotes,
    attachedPhotos: sharedPhotos,
    property: sharedProperty,
    customerUpdate: {
      date: "Aug 29, 2026",
      message: '"Please also access the backyard".',
    },
    halfStacheNote:
      "HALF STACHE team will review your request and notify you within 24hours.",
    activityHistory: [
      {
        id: "act-up-1",
        title: "Request Updated",
        description: "You request has been updated",
        timeAgo: "1 hour ago",
        dotColor: "amber",
      },
      {
        id: "act-up-2",
        title: "Request Submitted",
        description: "Your request has been submitted to HALF STACHE",
        timeAgo: "1 hour ago",
        dotColor: "grey",
      },
      {
        id: "act-up-3",
        title: "Request Saved as Draft",
        description: "Your request has been saved as draft",
        timeAgo: "1 hour ago",
        dotColor: "grey",
      },
    ],
  },

  // 4. Figma Image 4: Request Submitted (Original Version View)
  "submitted-original": {
    id: "req-1048-original",
    displayId: "#REQ-1048",
    version: "Version 1",
    title: "Landscape & Property Maintenance",
    createdOn: "Aug 16, 2026",
    status: "Request Submitted",
    requestType: "Recurring",
    requestedDateTime: "Aug 16, 2026, 02:00 PM",
    optionalDateTime: "Aug 21, 2026, 02:00 PM",
    serviceCount: "12 Services",
    description: sharedDescription,
    serviceGroups: sharedServiceGroups,
    siteAccessNotes: sharedSiteAccessNotes,
    attachedPhotos: sharedPhotos,
    property: sharedProperty,
    isOriginalView: true,
    halfStacheNote:
      "HALF STACHE team will review your request and notify you within 24hours.",
    activityHistory: [
      {
        id: "act-orig-1",
        title: "Request Submitted",
        description: "Your request has been submitted to HALF STACHE",
        timeAgo: "1 hour ago",
        dotColor: "grey",
      },
      {
        id: "act-orig-2",
        title: "Request Saved as Draft",
        description: "Your request has been saved as draft",
        timeAgo: "1 hour ago",
        dotColor: "grey",
      },
    ],
  },

  // 4. Figma Image 4: Estimate Approval Needed (req-9)
  "estimate-approval": {
    id: "req-9",
    displayId: "#REQ-1048",
    title: "Landscape & Property Maintenance",
    createdOn: "Aug 16, 2026, 02:00 PM",
    status: "Estimate Approval Needed",
    hideHeaderMeta: true,
    requestType: "Recurring",
    requestedDateTime: "Aug 16, 2026, 02:00 PM",
    optionalDateTime: "Aug 21, 2026, 02:00 PM",
    serviceCount: "12 Services",
    description: sharedDescription,
    serviceGroups: sharedServiceGroups,
    siteAccessNotes: sharedSiteAccessNotes,
    attachedPhotos: sharedPhotos,
    property: sharedProperty,
    estimate: {
      status: "Pending Approval",
      totalAmount: "$3,794.00",
      statusDotColor: "amber",
      statusTextColor: "amber",
      buttonLabel: "View Estimate Details",
    },
    completedSiteVisit: {
      status: "Completed",
      propertyAddress: "100 Whispering Pines Blvd at Hwy 43",
      dateTime: "Aug 28, 2026, 03:00 PM - 04:00 PM",
      visitedBy: "Alex Morgan",
    },
    activityHistory: siteVisitActivityHistory,
  },

  // 5. Figma Image 2: Estimate Revision Requested (req-11)
  "estimate-revision": {
    id: "req-11",
    displayId: "#REQ-1048",
    title: "Landscape & Property Maintenance",
    createdOn: "Aug 16, 2026, 02:00 PM",
    status: "Estimate Revision Requested",
    hideHeaderMeta: true,
    requestType: "Recurring",
    requestedDateTime: "Aug 16, 2026, 02:00 PM",
    optionalDateTime: "Aug 21, 2026, 02:00 PM",
    serviceCount: "12 Services",
    description: sharedDescription,
    serviceGroups: sharedServiceGroups,
    siteAccessNotes: sharedSiteAccessNotes,
    attachedPhotos: sharedPhotos,
    property: sharedProperty,
    estimate: {
      status: "Request Changes",
      totalAmount: "$3,794.00",
      statusDotColor: "red",
      statusTextColor: "red",
    },
    activityHistory: [
      {
        id: "act-rev-1",
        title: "Estimate #EST-1045 Requested for Changes",
        description: "You have requested changes for this estimate",
        timeAgo: "3 minutes ago",
        dotColor: "red",
      },
      {
        id: "act-rev-2",
        title: "Request Submitted",
        description: "Your request has been submitted to HALF STACHE",
        timeAgo: "1 hour ago",
        dotColor: "grey",
      },
      {
        id: "act-rev-3",
        title: "Request Saved as Draft",
        description: "Your request has been saved as draft",
        timeAgo: "1 hour ago",
        dotColor: "grey",
      },
    ],
  },

  // 6. Figma Image 3: Estimate Accepted (req-12)
  "estimate-accepted": {
    id: "req-12",
    displayId: "#REQ-1048",
    title: "Landscape & Property Maintenance",
    createdOn: "Aug 16, 2026, 02:00 PM",
    status: "Estimate Accepted",
    hideHeaderMeta: true,
    requestType: "Recurring",
    requestedDateTime: "Aug 16, 2026, 02:00 PM",
    optionalDateTime: "Aug 21, 2026, 02:00 PM",
    serviceCount: "12 Services",
    description: sharedDescription,
    serviceGroups: sharedServiceGroups,
    siteAccessNotes: sharedSiteAccessNotes,
    attachedPhotos: sharedPhotos,
    property: sharedProperty,
    estimate: {
      status: "Estimate Approved",
      totalAmount: "$3,794.00",
      statusDotColor: "green",
      statusTextColor: "green",
    },
    activityHistory: [
      {
        id: "act-acc-1",
        title: "Estimate #EST-1045 has been Accepted",
        description: "You accept the estimate",
        timeAgo: "4 minutes ago",
        dotColor: "green",
      },
      {
        id: "act-acc-2",
        title: "Estimate #EST-1045 Requested for Changes",
        description: "You have requested changes for this estimate",
        timeAgo: "3 minutes ago",
        dotColor: "red",
      },
      {
        id: "act-acc-3",
        title: "Request Submitted",
        description: "Your request has been submitted to HALF STACHE",
        timeAgo: "1 hour ago",
        dotColor: "grey",
      },
      {
        id: "act-acc-4",
        title: "Request Saved as Draft",
        description: "Your request has been saved as draft",
        timeAgo: "1 hour ago",
        dotColor: "grey",
      },
    ],
  },

  // 7. Figma Image 4: Estimate Declined (req-10)
  "estimate-declined": {
    id: "req-10",
    displayId: "#REQ-1048",
    title: "Landscape & Property Maintenance",
    createdOn: "Aug 16, 2026, 02:00 PM",
    status: "Estimate Declined",
    hideHeaderMeta: true,
    requestType: "Recurring",
    requestedDateTime: "Aug 16, 2026, 02:00 PM",
    optionalDateTime: "Aug 21, 2026, 02:00 PM",
    serviceCount: "12 Services",
    description: sharedDescription,
    serviceGroups: sharedServiceGroups,
    siteAccessNotes: sharedSiteAccessNotes,
    attachedPhotos: sharedPhotos,
    property: sharedProperty,
    estimate: {
      status: "Declined",
      totalAmount: "$3,794.00",
      statusDotColor: "red",
      statusTextColor: "red",
    },
    activityHistory: [
      {
        id: "act-dec-1",
        title: "Estimate #EST-1045 was Issued",
        description: "Half Stache issued an estimate for your service",
        timeAgo: "3 minutes ago",
        dotColor: "amber",
      },
      {
        id: "act-dec-2",
        title: "Request Saved as Draft",
        description: "Your request has been saved as draft",
        timeAgo: "1 hour ago",
        dotColor: "grey",
      },
    ],
  },

  // 8. Figma Image 5: Contract Awaiting Signature (req-13)
  "contract-awaiting": {
    id: "req-13",
    displayId: "#REQ-1048",
    title: "Landscape & Property Maintenance",
    createdOn: "Aug 16, 2026, 02:00 PM",
    status: "Contract Awaiting Signature",
    hideHeaderMeta: true,
    requestType: "Recurring",
    requestedDateTime: "Aug 16, 2026, 02:00 PM",
    optionalDateTime: "Aug 21, 2026, 02:00 PM",
    serviceCount: "12 Services",
    description: sharedDescription,
    serviceGroups: sharedServiceGroups,
    siteAccessNotes: sharedSiteAccessNotes,
    attachedPhotos: sharedPhotos,
    property: sharedProperty,
    estimate: {
      status: "Estimate Approved",
      totalAmount: "$3,794.00",
      statusDotColor: "green",
      statusTextColor: "green",
    },
    contract: {
      status: "Sign Pending",
      period: "Jan 01, 2026 - Dec 31, 2026",
      statusDotColor: "amber",
      statusTextColor: "amber",
    },
    activityHistory: [
      {
        id: "act-cnt-1",
        title: "Estimate #EST-1045 was Issued",
        description: "Half Stache issued an estimate for your service",
        timeAgo: "3 minutes ago",
        dotColor: "amber",
      },
      {
        id: "act-cnt-2",
        title: "Request Saved as Draft",
        description: "Your request has been saved as draft",
        timeAgo: "1 hour ago",
        dotColor: "grey",
      },
    ],
  },

  // 9. Figma Image 1: Contract Signed (req-14)
  "contract-signed": {
    id: "req-14",
    displayId: "#REQ-1048",
    title: "Landscape & Property Maintenance",
    createdOn: "Aug 16, 2026, 02:00 PM",
    status: "Contract Signed",
    hideHeaderMeta: true,
    requestType: "Recurring",
    requestedDateTime: "Aug 16, 2026, 02:00 PM",
    optionalDateTime: "Aug 21, 2026, 02:00 PM",
    serviceCount: "12 Services",
    description: sharedDescription,
    serviceGroups: sharedServiceGroups,
    siteAccessNotes: sharedSiteAccessNotes,
    attachedPhotos: sharedPhotos,
    property: sharedProperty,
    estimate: {
      status: "Estimate Approved",
      totalAmount: "$3,794.00",
      statusDotColor: "green",
      statusTextColor: "green",
    },
    contract: {
      status: "Contracts & Agreements Signed",
      period: "Jan 01, 2026 - Dec 31, 2026",
      statusDotColor: "green",
      statusTextColor: "green",
    },
    activityHistory: [
      {
        id: "act-cs-1",
        title: "Estimate #EST-1045 was Issued",
        description: "Half Stache issued an estimate for your service",
        timeAgo: "3 minutes ago",
        dotColor: "amber",
      },
      {
        id: "act-cs-2",
        title: "Request Saved as Draft",
        description: "Your request has been saved as draft",
        timeAgo: "1 hour ago",
        dotColor: "grey",
      },
    ],
  },

  // 10. Figma Image 2: Scheduled (req-15)
  scheduled: {
    id: "req-15",
    displayId: "#REQ-1048",
    title: "Landscape & Property Maintenance",
    createdOn: "Aug 16, 2026, 02:00 PM",
    status: "Scheduled",
    hideHeaderMeta: true,
    requestType: "Recurring",
    requestedDateTime: "Aug 16, 2026, 02:00 PM",
    optionalDateTime: "Aug 21, 2026, 02:00 PM",
    serviceCount: "12 Services",
    description: sharedDescription,
    serviceGroups: sharedServiceGroups,
    siteAccessNotes: sharedSiteAccessNotes,
    attachedPhotos: sharedPhotos,
    property: sharedProperty,
    estimate: {
      status: "Estimate Approved",
      totalAmount: "$3,794.00",
      statusDotColor: "green",
      statusTextColor: "green",
    },
    contract: {
      status: "Contracts & Agreements Signed",
      period: "Jan 01, 2026 - Dec 31, 2026",
      statusDotColor: "green",
      statusTextColor: "green",
    },
    scheduling: sharedScheduling,
    activityHistory: [
      {
        id: "act-sch-1",
        title: "Estimate #EST-1045 was Issued",
        description: "Half Stache issued an estimate for your service",
        timeAgo: "3 minutes ago",
        dotColor: "amber",
      },
      {
        id: "act-sch-2",
        title: "Request Saved as Draft",
        description: "Your request has been saved as draft",
        timeAgo: "1 hour ago",
        dotColor: "grey",
      },
    ],
  },

  // 11. In Progress (req-16)
  "in-progress": {
    id: "req-16",
    displayId: "#REQ-1048",
    title: "Landscape & Property Maintenance",
    createdOn: "Aug 16, 2026, 02:00 PM",
    status: "In Progress",
    hideHeaderMeta: true,
    requestType: "Recurring",
    requestedDateTime: "Aug 16, 2026, 02:00 PM",
    optionalDateTime: "Aug 21, 2026, 02:00 PM",
    serviceCount: "12 Services",
    description: sharedDescription,
    serviceGroups: sharedServiceGroups,
    siteAccessNotes: sharedSiteAccessNotes,
    attachedPhotos: sharedPhotos,
    property: sharedProperty,
    estimate: {
      status: "Estimate Approved",
      totalAmount: "$3,794.00",
      statusDotColor: "green",
      statusTextColor: "green",
    },
    contract: {
      status: "Contracts & Agreements Signed",
      period: "Jan 01, 2026 - Dec 31, 2026",
      statusDotColor: "green",
      statusTextColor: "green",
    },
    scheduling: sharedScheduling,
    activityHistory: [
      {
        id: "act-inp-1",
        title: "Estimate #EST-1045 was Issued",
        description: "Half Stache issued an estimate for your service",
        timeAgo: "3 minutes ago",
        dotColor: "amber",
      },
      {
        id: "act-inp-2",
        title: "Request Saved as Draft",
        description: "Your request has been saved as draft",
        timeAgo: "1 hour ago",
        dotColor: "grey",
      },
    ],
  },

  // 12. Figma Image 3: Completed (req-17)
  completed: {
    id: "req-17",
    displayId: "#REQ-1048",
    title: "Landscape & Property Maintenance",
    createdOn: "Aug 16, 2026, 02:00 PM",
    status: "Completed",
    hideHeaderMeta: true,
    requestType: "Recurring",
    requestedDateTime: "Aug 16, 2026, 02:00 PM",
    optionalDateTime: "Aug 21, 2026, 02:00 PM",
    serviceCount: "12 Services",
    description: sharedDescription,
    serviceGroups: sharedServiceGroups,
    siteAccessNotes: sharedSiteAccessNotes,
    attachedPhotos: sharedPhotos,
    property: sharedProperty,
    estimate: {
      status: "Estimate Approved",
      totalAmount: "$3,794.00",
      statusDotColor: "green",
      statusTextColor: "green",
    },
    contract: {
      status: "Contracts & Agreements Signed",
      period: "Jan 01, 2026 - Dec 31, 2026",
      statusDotColor: "green",
      statusTextColor: "green",
    },
    payment: {
      status: "Payment Complete",
      billingCycle: "Monthly",
      amount: "$2,789.00",
      statusDotColor: "green",
      statusTextColor: "green",
      buttonLabel: "Download Receipt",
    },
    scheduling: sharedScheduling,
    activityHistory: [
      {
        id: "act-comp-1",
        title: "Estimate #EST-1045 was Issued",
        description: "Half Stache issued an estimate for your service",
        timeAgo: "3 minutes ago",
        dotColor: "amber",
      },
      {
        id: "act-comp-2",
        title: "Request Saved as Draft",
        description: "Your request has been saved as draft",
        timeAgo: "1 hour ago",
        dotColor: "grey",
      },
    ],
  },

  // 13. Waiting for Payment (req-18)
  "waiting-payment": {
    id: "req-18",
    displayId: "#REQ-1048",
    title: "Landscape & Property Maintenance",
    createdOn: "Aug 16, 2026, 02:00 PM",
    status: "Waiting For Payment",
    hideHeaderMeta: true,
    requestType: "Recurring",
    requestedDateTime: "Aug 16, 2026, 02:00 PM",
    optionalDateTime: "Aug 21, 2026, 02:00 PM",
    serviceCount: "12 Services",
    description: sharedDescription,
    serviceGroups: sharedServiceGroups,
    siteAccessNotes: sharedSiteAccessNotes,
    attachedPhotos: sharedPhotos,
    property: sharedProperty,
    estimate: {
      status: "Estimate Approved",
      totalAmount: "$3,794.00",
      statusDotColor: "green",
      statusTextColor: "green",
    },
    contract: {
      status: "Contracts & Agreements Signed",
      period: "Jan 01, 2026 - Dec 31, 2026",
      statusDotColor: "green",
      statusTextColor: "green",
    },
    payment: {
      status: "Payment Pending",
      billingCycle: "Monthly",
      amount: "$2,789.00",
      statusDotColor: "amber",
      statusTextColor: "amber",
      buttonLabel: "View Invoice & Pay",
    },
    scheduling: sharedScheduling,
    activityHistory: [
      {
        id: "act-wp-1",
        title: "Estimate #EST-1045 was Issued",
        description: "Half Stache issued an estimate for your service",
        timeAgo: "3 minutes ago",
        dotColor: "amber",
      },
      {
        id: "act-wp-2",
        title: "Request Saved as Draft",
        description: "Your request has been saved as draft",
        timeAgo: "1 hour ago",
        dotColor: "grey",
      },
    ],
  },

  // 14. Payment Due (req-19)
  "payment-due": {
    id: "req-19",
    displayId: "#REQ-1048",
    title: "Landscape & Property Maintenance",
    createdOn: "Aug 16, 2026, 02:00 PM",
    status: "Payment Due",
    hideHeaderMeta: true,
    requestType: "Recurring",
    requestedDateTime: "Aug 16, 2026, 02:00 PM",
    optionalDateTime: "Aug 21, 2026, 02:00 PM",
    serviceCount: "12 Services",
    description: sharedDescription,
    serviceGroups: sharedServiceGroups,
    siteAccessNotes: sharedSiteAccessNotes,
    attachedPhotos: sharedPhotos,
    property: sharedProperty,
    estimate: {
      status: "Estimate Approved",
      totalAmount: "$3,794.00",
      statusDotColor: "green",
      statusTextColor: "green",
    },
    contract: {
      status: "Contracts & Agreements Signed",
      period: "Jan 01, 2026 - Dec 31, 2026",
      statusDotColor: "green",
      statusTextColor: "green",
    },
    payment: {
      status: "Payment Due",
      billingCycle: "Monthly",
      amount: "$2,789.00",
      statusDotColor: "red",
      statusTextColor: "red",
      buttonLabel: "View Invoice & Pay",
    },
    scheduling: sharedScheduling,
    activityHistory: [
      {
        id: "act-pd-1",
        title: "Estimate #EST-1045 was Issued",
        description: "Half Stache issued an estimate for your service",
        timeAgo: "3 minutes ago",
        dotColor: "amber",
      },
      {
        id: "act-pd-2",
        title: "Request Saved as Draft",
        description: "Your request has been saved as draft",
        timeAgo: "1 hour ago",
        dotColor: "grey",
      },
    ],
  },

  // 15. Figma Image 1: On Hold (req-21) - Approval Pending
  "on-hold": {
    id: "req-21",
    displayId: "#REQ-1048",
    title: "Landscape & Property Maintenance",
    createdOn: "Aug 16, 2026, 02:00 PM",
    status: "On Hold",
    hideHeaderMeta: true,
    requestType: "Recurring",
    requestedDateTime: "Aug 16, 2026, 02:00 PM",
    optionalDateTime: "Aug 21, 2026, 02:00 PM",
    serviceCount: "12 Services",
    description: sharedDescription,
    serviceGroups: sharedServiceGroups,
    siteAccessNotes: sharedSiteAccessNotes,
    attachedPhotos: sharedPhotos,
    property: sharedProperty,
    originalServiceHeading: true,
    estimate: {
      status: "Estimate Approved",
      totalAmount: "$3,794.00",
      statusDotColor: "green",
      statusTextColor: "green",
    },
    contract: {
      status: "Contracts & Agreements Signed",
      period: "Jan 01, 2026 - Dec 31, 2026",
      statusDotColor: "green",
      statusTextColor: "green",
    },
    additionalWorkHeading: "Additional Work Proposed - Approval Needed",
    additionalWork: {
      status: "Approval Pending",
      serviceName: "Additional Service 1",
      amount: "$280.00",
      statusDotColor: "amber",
      statusTextColor: "amber",
      buttonLabel: "View Details & Approve",
      isPrimaryButton: true,
    },
    scheduling: sharedScheduling,
    activityHistory: [
      {
        id: "act-oh-1",
        title: "Estimate #EST-1045 was Issued",
        description: "Half Stache issued an estimate for your service",
        timeAgo: "3 minutes ago",
        dotColor: "amber",
      },
      {
        id: "act-oh-2",
        title: "Request Saved as Draft",
        description: "Your request has been saved as draft",
        timeAgo: "1 hour ago",
        dotColor: "grey",
      },
    ],
  },

  // 16. Figma Image 2: On Hold - Approved
  "on-hold-approved": {
    id: "req-21-app",
    displayId: "#REQ-1048",
    title: "Landscape & Property Maintenance",
    createdOn: "Aug 16, 2026, 02:00 PM",
    status: "On Hold",
    hideHeaderMeta: true,
    requestType: "Recurring",
    requestedDateTime: "Aug 16, 2026, 02:00 PM",
    optionalDateTime: "Aug 21, 2026, 02:00 PM",
    serviceCount: "12 Services",
    description: sharedDescription,
    serviceGroups: sharedServiceGroups,
    siteAccessNotes: sharedSiteAccessNotes,
    attachedPhotos: sharedPhotos,
    property: sharedProperty,
    originalServiceHeading: true,
    estimate: {
      status: "Estimate Approved",
      totalAmount: "$3,794.00",
      statusDotColor: "green",
      statusTextColor: "green",
    },
    contract: {
      status: "Contracts & Agreements Signed",
      period: "Jan 01, 2026 - Dec 31, 2026",
      statusDotColor: "green",
      statusTextColor: "green",
    },
    additionalWorkHeading: "Additional Work Proposed - Approval Needed",
    additionalWork: {
      status: "Approved",
      serviceName: "Additional Service 1",
      amount: "$280.00",
      statusDotColor: "green",
      statusTextColor: "green",
      buttonLabel: "View Contract Details",
      isPrimaryButton: false,
    },
    scheduling: sharedScheduling,
    activityHistory: [
      {
        id: "act-oha-1",
        title: "Estimate #EST-1045 was Issued",
        description: "Half Stache issued an estimate for your service",
        timeAgo: "3 minutes ago",
        dotColor: "amber",
      },
      {
        id: "act-oha-2",
        title: "Request Saved as Draft",
        description: "Your request has been saved as draft",
        timeAgo: "1 hour ago",
        dotColor: "grey",
      },
    ],
  },

  // 17. Figma Image 3 & 4: Site Visit Required (req-4)
  "site-visit-required": {
    id: "req-4",
    displayId: "#REQ-1048",
    title: "Landscape & Property Maintenance",
    createdOn: "Aug 16, 2026, 02:00 PM",
    status: "Site Visit Required",
    hideHeaderMeta: true,
    topBannerNote:
      "We need to inspect your property before providing a final estimate. Our crew member will visit your site and if there is any new requirements will send to you with the final estimate.",
    requestType: "Recurring",
    requestedDateTime: "Aug 16, 2026, 02:00 PM",
    optionalDateTime: "Aug 21, 2026, 02:00 PM",
    serviceCount: "12 Services",
    description: sharedDescription,
    serviceGroups: sharedServiceGroups,
    siteAccessNotes: sharedSiteAccessNotes,
    attachedPhotos: sharedPhotos,
    property: sharedProperty,
    siteVisit: {
      status: "Site Visit Scheduled",
      month: "August",
      day: "30",
      dayOfWeek: "Sunday",
      propertyTitle: "North Entrance Monument & Islands",
      address: "100 Whispering Pines Blvd at Hwy 43",
      time: "10:00 AM -02:00 PM",
      crewName: "Alex ( Leader)",
      crewAvatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    },
    activityHistory: siteVisitActivityHistory,
  },

  // 18. Figma Image 1: Site Visit Confirmed (req-5)
  "site-visit-confirmed": {
    id: "req-5",
    displayId: "#REQ-1048",
    title: "Landscape & Property Maintenance",
    createdOn: "Aug 16, 2026, 02:00 PM",
    status: "Site Visit Confirmed",
    hideHeaderMeta: true,
    requestType: "Recurring",
    requestedDateTime: "Aug 16, 2026, 02:00 PM",
    optionalDateTime: "Aug 21, 2026, 02:00 PM",
    serviceCount: "12 Services",
    description: sharedDescription,
    serviceGroups: sharedServiceGroups,
    siteAccessNotes: sharedSiteAccessNotes,
    attachedPhotos: sharedPhotos,
    property: sharedProperty,
    siteVisit: {
      status: "Site Visit Scheduled",
      month: "August",
      day: "30",
      dayOfWeek: "Sunday",
      propertyTitle: "North Entrance Monument & Islands",
      address: "100 Whispering Pines Blvd at Hwy 43",
      time: "10:00 AM -02:00 PM",
      crewName: "Alex ( Leader)",
      crewAvatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      isConfirmed: true,
      customerWillBeVisiting: true,
    },
    activityHistory: siteVisitActivityHistory,
  },

  // 19. Figma Image 2: Site Visit in Progress (req-7)
  "site-visit-in-progress": {
    id: "req-7",
    displayId: "#REQ-1048",
    title: "Landscape & Property Maintenance",
    createdOn: "Aug 16, 2026, 02:00 PM",
    status: "Site Visit in Progress",
    hideHeaderMeta: true,
    requestType: "Recurring",
    requestedDateTime: "Aug 16, 2026, 02:00 PM",
    optionalDateTime: "Aug 21, 2026, 02:00 PM",
    serviceCount: "12 Services",
    description: sharedDescription,
    serviceGroups: sharedServiceGroups,
    siteAccessNotes: sharedSiteAccessNotes,
    attachedPhotos: sharedPhotos,
    property: sharedProperty,
    siteVisit: {
      status: "Site Visit Scheduled",
      month: "August",
      day: "30",
      dayOfWeek: "Sunday",
      propertyTitle: "North Entrance Monument & Islands",
      address: "100 Whispering Pines Blvd at Hwy 43",
      time: "10:00 AM -02:00 PM",
      crewName: "Alex ( Leader)",
      crewAvatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      isConfirmed: true,
      customerWillBeVisiting: true,
    },
    activityHistory: siteVisitActivityHistory,
  },

  // 20. Figma Image 3: Site Visit Completed (req-8)
  "site-visit-completed": {
    id: "req-8",
    displayId: "#REQ-1048",
    title: "Landscape & Property Maintenance",
    createdOn: "Aug 16, 2026, 02:00 PM",
    status: "Site Visit Completed",
    hideHeaderMeta: true,
    requestType: "Recurring",
    requestedDateTime: "Aug 16, 2026, 02:00 PM",
    optionalDateTime: "Aug 21, 2026, 02:00 PM",
    serviceCount: "12 Services",
    description: sharedDescription,
    serviceGroups: sharedServiceGroups,
    siteAccessNotes: sharedSiteAccessNotes,
    attachedPhotos: sharedPhotos,
    property: sharedProperty,
    activityHistory: siteVisitActivityHistory,
  },
};

export const getRequestDetailData = (
  id?: string,
  showOriginal: boolean = false
): RequestDetailData => {
  if (!id) return mockRequestsData["submitted"];

  const normalizedId = id.toLowerCase();

  // If user requested original view directly
  if (showOriginal) {
    return mockRequestsData["submitted-original"];
  }

  // Explicit keyword routes
  if (
    normalizedId === "draft" ||
    normalizedId === "req-1" ||
    normalizedId.includes("draft")
  ) {
    return mockRequestsData["draft"];
  }

  if (
    normalizedId === "submitted-v1" ||
    normalizedId === "v1"
  ) {
    return mockRequestsData["submitted"];
  }

  if (
    normalizedId === "submitted-v2" ||
    normalizedId === "submitted-update" ||
    normalizedId === "update" ||
    normalizedId === "req-2"
  ) {
    return mockRequestsData["submitted-update"];
  }

  if (
    normalizedId === "submitted-original" ||
    normalizedId === "original"
  ) {
    return mockRequestsData["submitted-original"];
  }

  if (
    normalizedId === "estimate-approval" ||
    normalizedId === "req-9"
  ) {
    return mockRequestsData["estimate-approval"];
  }

  if (
    normalizedId === "estimate-revision" ||
    normalizedId === "req-11"
  ) {
    return mockRequestsData["estimate-revision"];
  }

  if (
    normalizedId === "estimate-accepted" ||
    normalizedId === "req-12"
  ) {
    return mockRequestsData["estimate-accepted"];
  }

  if (
    normalizedId === "estimate-declined" ||
    normalizedId === "req-10"
  ) {
    return mockRequestsData["estimate-declined"];
  }

  if (
    normalizedId === "contract-awaiting" ||
    normalizedId === "req-13"
  ) {
    return mockRequestsData["contract-awaiting"];
  }

  if (
    normalizedId === "contract-signed" ||
    normalizedId === "req-14"
  ) {
    return mockRequestsData["contract-signed"];
  }

  if (
    normalizedId === "scheduled" ||
    normalizedId === "req-15"
  ) {
    return mockRequestsData["scheduled"];
  }

  if (
    normalizedId === "in-progress" ||
    normalizedId === "req-16"
  ) {
    return mockRequestsData["in-progress"];
  }

  if (
    normalizedId === "completed" ||
    normalizedId === "req-17" ||
    normalizedId === "payment-completed" ||
    normalizedId === "req-20"
  ) {
    return mockRequestsData["completed"];
  }

  if (
    normalizedId === "waiting-payment" ||
    normalizedId === "req-18"
  ) {
    return mockRequestsData["waiting-payment"];
  }

  if (
    normalizedId === "payment-due" ||
    normalizedId === "req-19"
  ) {
    return mockRequestsData["payment-due"];
  }

  if (
    normalizedId === "on-hold" ||
    normalizedId === "req-21"
  ) {
    return mockRequestsData["on-hold"];
  }

  if (
    normalizedId === "on-hold-approved"
  ) {
    return mockRequestsData["on-hold-approved"];
  }

  if (
    normalizedId === "site-visit-required" ||
    normalizedId === "site-visit" ||
    normalizedId === "req-4"
  ) {
    return mockRequestsData["site-visit-required"];
  }

  if (
    normalizedId === "site-visit-confirmed" ||
    normalizedId === "site-visit-pending" ||
    normalizedId === "req-5"
  ) {
    return mockRequestsData["site-visit-confirmed"];
  }

  if (
    normalizedId === "site-visit-scheduled" ||
    normalizedId === "req-6"
  ) {
    return mockRequestsData["site-visit-confirmed"];
  }

  if (
    normalizedId === "site-visit-in-progress" ||
    normalizedId === "req-7"
  ) {
    return mockRequestsData["site-visit-in-progress"];
  }

  if (
    normalizedId === "site-visit-completed" ||
    normalizedId === "req-8"
  ) {
    return mockRequestsData["site-visit-completed"];
  }

  // Check matching item in myRequestsData
  const found = myRequestsData.find(
    (item) => item.id.toLowerCase() === normalizedId || item.requestId.toLowerCase() === normalizedId
  );

  if (found) {
    if (found.status === "Draft") {
      return {
        ...mockRequestsData["draft"],
        displayId: found.requestId,
      };
    }
    if (found.status === "Estimate Approval Needed") {
      return {
        ...mockRequestsData["estimate-approval"],
        displayId: found.requestId,
      };
    }
    if (found.status === "Estimate Revision Requested") {
      return {
        ...mockRequestsData["estimate-revision"],
        displayId: found.requestId,
      };
    }
    if (found.status === "Estimate Accepted") {
      return {
        ...mockRequestsData["estimate-accepted"],
        displayId: found.requestId,
      };
    }
    if (found.status === "Estimate Declined") {
      return {
        ...mockRequestsData["estimate-declined"],
        displayId: found.requestId,
      };
    }
    if (found.status === "Contract Awaiting Signature") {
      return {
        ...mockRequestsData["contract-awaiting"],
        displayId: found.requestId,
      };
    }
    if (found.status === "Contract Signed") {
      return {
        ...mockRequestsData["contract-signed"],
        displayId: found.requestId,
      };
    }
    if (found.status === "Scheduled") {
      return {
        ...mockRequestsData["scheduled"],
        displayId: found.requestId,
      };
    }
    if (found.status === "In Progress") {
      return {
        ...mockRequestsData["in-progress"],
        displayId: found.requestId,
      };
    }
    if (found.status === "Completed") {
      return {
        ...mockRequestsData["completed"],
        displayId: found.requestId,
      };
    }
    if (found.status === "Waiting For Payment") {
      return {
        ...mockRequestsData["waiting-payment"],
        displayId: found.requestId,
      };
    }
    if (found.status === "Payment Due") {
      return {
        ...mockRequestsData["payment-due"],
        displayId: found.requestId,
      };
    }
    if (found.status === "Payment Completed") {
      return {
        ...mockRequestsData["completed"],
        displayId: found.requestId,
        status: "Payment Completed",
      };
    }
    if (found.status === "On Hold") {
      return {
        ...mockRequestsData["on-hold"],
        displayId: found.requestId,
      };
    }
    if (found.status === "Site Visit Required") {
      return {
        ...mockRequestsData["site-visit-required"],
        displayId: found.requestId,
      };
    }
    if (
      found.status === "Site Visit Confirmed" ||
      found.status === "Site Visit Pending" ||
      found.status === "Site Visit Scheduled"
    ) {
      return {
        ...mockRequestsData["site-visit-confirmed"],
        displayId: found.requestId,
      };
    }
    if (found.status === "Site Visit in Progress") {
      return {
        ...mockRequestsData["site-visit-in-progress"],
        displayId: found.requestId,
      };
    }
    if (found.status === "Site Visit Completed") {
      return {
        ...mockRequestsData["site-visit-completed"],
        displayId: found.requestId,
      };
    }
    return {
      ...mockRequestsData["submitted-update"],
      displayId: found.requestId,
      status: found.status,
    };
  }

  // Default fallback
  return mockRequestsData["submitted-update"];
};

