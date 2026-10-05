import { EstimateDetailData } from "../types/estimateTypes";
import { estimateData } from "./estimateData";

const sharedProperty = {
  title: "North Entrance Monument & Islands",
  address: "100 Whispering Pines Blvd at Hwy 43",
  tag: "Residential",
  size: "Size: Small (up to 1/4 acre)",
  imageUrl:
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80",
};

const sharedScopeOfWork =
  "Complete spring lawn cleanup and landscape refresh for the front and back yard, including removal of leaves and debris, bed edging, trimming of ornamental grasses, and a fresh layer of mulch.";

const sharedServiceDetails = [
  {
    title: "Lawn Care",
    workIncluded: ["Mowing", "Trimming", "Edging", "Blowing"],
  },
  {
    title: "Additional Services",
    workIncluded: [
      "Trim designated shrubs/hedges",
      "Remove resulting debris",
      "Edging",
      "Blowing",
    ],
  },
];

const sharedBaseLineItems = [
  {
    id: "item-1",
    description: "Site preparation & sod removal",
    quantity: "1 job",
    rate: "$85.00",
    amount: "$85.00",
  },
  {
    id: "item-2",
    description: "Soil grading & leveling",
    quantity: "1 job",
    rate: "$85.00",
    amount: "$85.00",
  },
  {
    id: "item-3",
    description: "Drought-tolerant plantings (12 shrubs)",
    quantity: "12 items",
    rate: "$85.00",
    amount: "$1020.00",
  },
  {
    id: "item-4",
    description: "Premium mulch installation",
    quantity: "4 items",
    rate: "$95.00",
    amount: "$380.00",
  },
  {
    id: "item-5",
    description: "Edging & cleanup",
    quantity: "1 job",
    rate: "$85.00",
    amount: "$85.00",
  },
  {
    id: "item-6",
    description: "Equipments",
    quantity: "5 items",
    rate: "$85.00",
    amount: "$1020.00",
  },
];

const sharedSiteAssessmentLineItems = [
  {
    id: "adj-1",
    description: "Site preparation & sod removal",
    quantity: "1 job",
    rate: "$85.00",
    amount: "$85.00",
  },
  {
    id: "adj-2",
    description: "Soil grading & leveling",
    quantity: "1 job",
    rate: "$85.00",
    amount: "$85.00",
  },
];

const sharedRequestSummary = {
  requestId: "REQ-1048",
  createdOn: "Aug 16, 2026, 02:00 PM",
  requestedService: "Landscape & Property Maintenance",
  requestType: "Recurring",
  frequency: "Monthly",
};

const sharedSiteVisit = {
  status: "Completed",
  propertyAddress: "100 Whispering Pines Blvd at Hwy 43",
  dateTime: "Aug 26, 2026, 03:00 PM - 04:00 PM",
  visitedBy: "Alex Morgan",
};

const sharedTermsAndConditions =
  "Estimate valid for 14 days. Work will be scheduled after contracts & agreements approval. Pricing includes the listed scope only. Additional work requires written approval before it begins.";

export const mockEstimateDetails: Record<string, EstimateDetailData> = {
  // 1. Pending Approval - Without Site Visit (Screenshot 1)
  "est-1": {
    id: "est-1",
    estimateId: "#EST-1024",
    version: "Version 1",
    issueDate: "Aug 16, 2026",
    status: "Pending Approval",
    hasSiteVisit: false,
    property: sharedProperty,
    scopeOfWork: sharedScopeOfWork,
    serviceDetails: sharedServiceDetails,
    estimateDuration: "4-5 hours",
    lineItems: sharedBaseLineItems,
    financials: {
      subtotal: "$3,995.00",
      discount: "-$50.00",
      tax: "$45.00",
      total: "$3,995.00",
    },
    termsAndConditions: sharedTermsAndConditions,
    requestSummary: sharedRequestSummary,
    validTill: "Oct 06, 2026",
  },

  // 2. Pending Approval - With Site Visit & Adjustments (Screenshot 2)
  "est-2": {
    id: "est-2",
    estimateId: "#EST-1024",
    version: "Version 1",
    issueDate: "Aug 16, 2026",
    status: "Pending Approval",
    hasSiteVisit: true,
    halfStacheNote:
      "We've completed the site assessment and prepared your final estimate. Once you approved the service estimate we will prepare a contracts & agreements for you.",
    property: sharedProperty,
    scopeOfWork: sharedScopeOfWork,
    serviceDetails: sharedServiceDetails,
    estimateDuration: "4-5 hours",
    siteAssessmentNote:
      "During the site visit, we found that the existing sod and debris need to be removed and the soil needs to be leveled before the requested landscaping work can be completed. These required services have been included in the estimate below.",
    lineItems: sharedBaseLineItems,
    siteAssessmentLineItems: sharedSiteAssessmentLineItems,
    financials: {
      subtotal: "$3,995.00",
      discount: "-$50.00",
      tax: "$45.00",
      total: "$3,995.00",
      priorPayment: "$0.00",
      remainingBalance: "$3,995.00",
    },
    termsAndConditions: sharedTermsAndConditions,
    requestSummary: sharedRequestSummary,
    validTill: "Oct 06, 2026",
    siteVisit: sharedSiteVisit,
  },

  // 3. Pending Approval - With Site Visit & No Adjustments Needed (Screenshot 3)
  "est-3": {
    id: "est-3",
    estimateId: "#EST-1024",
    version: "Version 1",
    issueDate: "Aug 16, 2026",
    status: "Pending Approval",
    hasSiteVisit: true,
    halfStacheNote:
      "We've completed the site assessment and prepared your final estimate. Once you approved the service estimate we will prepare a contracts & agreements for you.",
    property: sharedProperty,
    scopeOfWork: sharedScopeOfWork,
    serviceDetails: sharedServiceDetails,
    estimateDuration: "4-5 hours",
    siteAssessmentNote:
      "The site visit confirmed that no additional requirements or adjustments are needed. The estimate is based on the original requested scope.",
    lineItems: sharedBaseLineItems,
    financials: {
      subtotal: "$3,995.00",
      discount: "-$50.00",
      tax: "$45.00",
      total: "$3,995.00",
      priorPayment: "$0.00",
      remainingBalance: "$3,995.00",
    },
    termsAndConditions: sharedTermsAndConditions,
    requestSummary: sharedRequestSummary,
    validTill: "Oct 06, 2026",
    siteVisit: sharedSiteVisit,
  },

  // 4. Approved - Without Site Visit (Screenshot 4)
  "est-4": {
    id: "est-4",
    estimateId: "#EST-1024",
    version: "Version 1",
    issueDate: "Aug 16, 2026",
    status: "Approved",
    hasSiteVisit: false,
    property: sharedProperty,
    scopeOfWork: sharedScopeOfWork,
    serviceDetails: sharedServiceDetails,
    estimateDuration: "4-5 hours",
    lineItems: sharedBaseLineItems,
    financials: {
      subtotal: "$3,995.00",
      discount: "-$50.00",
      tax: "$45.00",
      total: "$3,995.00",
      priorPayment: "$0.00",
      remainingBalance: "$3,995.00",
    },
    termsAndConditions: sharedTermsAndConditions,
    requestSummary: sharedRequestSummary,
    approvalInfo: {
      approvedOn: "Aug 16, 2026, 02:00 PM",
      siteVisitStatus: "Completed",
      completedOn: "Aug 16, 2026, 02:00 PM",
    },
  },

  // 5. Approved - With Site Visit (Screenshot 5)
  "est-5": {
    id: "est-5",
    estimateId: "#EST-1024",
    version: "Version 1",
    issueDate: "Aug 16, 2026",
    status: "Approved",
    hasSiteVisit: true,
    property: sharedProperty,
    scopeOfWork: sharedScopeOfWork,
    serviceDetails: sharedServiceDetails,
    estimateDuration: "4-5 hours",
    siteAssessmentNote:
      "The site visit confirmed that no additional requirements or adjustments are needed. The estimate is based on the original requested scope.",
    lineItems: sharedBaseLineItems,
    financials: {
      subtotal: "$3,995.00",
      discount: "-$50.00",
      tax: "$45.00",
      total: "$3,995.00",
      priorPayment: "$0.00",
      remainingBalance: "$3,995.00",
    },
    termsAndConditions: sharedTermsAndConditions,
    requestSummary: sharedRequestSummary,
    siteVisit: sharedSiteVisit,
    approvalInfo: {
      approvedOn: "Aug 16, 2026, 02:00 PM",
      siteVisitStatus: "Completed",
      completedOn: "Aug 16, 2026, 02:00 PM",
    },
  },

  // 6. Declined - Without Site Visit (Screenshot 2)
  "est-6": {
    id: "est-6",
    estimateId: "#EST-1024",
    version: "Version 1",
    issueDate: "Aug 16, 2026",
    status: "Declined",
    hasSiteVisit: false,
    property: sharedProperty,
    scopeOfWork: sharedScopeOfWork,
    serviceDetails: sharedServiceDetails,
    estimateDuration: "4-5 hours",
    siteAssessmentNote:
      "During the site visit, we found that the existing sod and debris need to be removed and the soil needs to be leveled before the requested landscaping work can be completed. These required services have been included in the estimate below.",
    lineItems: sharedBaseLineItems,
    siteAssessmentLineItems: sharedSiteAssessmentLineItems,
    financials: {
      subtotal: "$3,995.00",
      discount: "-$50.00",
      tax: "$45.00",
      total: "$3,995.00",
    },
    termsAndConditions: sharedTermsAndConditions,
    requestSummary: sharedRequestSummary,
    declineInfo: {
      declinedOn: "Aug 16, 2026, 02:00 PM",
      reason: "Price is higher than expected.",
    },
  },

  // 7. Declined - With Site Visit (Screenshot 3)
  "est-7": {
    id: "est-7",
    estimateId: "#EST-1024",
    version: "Version 1",
    issueDate: "Aug 16, 2026",
    status: "Declined",
    hasSiteVisit: true,
    property: sharedProperty,
    scopeOfWork: sharedScopeOfWork,
    serviceDetails: sharedServiceDetails,
    estimateDuration: "4-5 hours",
    siteAssessmentNote:
      "The site visit confirmed that no additional requirements or adjustments are needed. The estimate is based on the original requested scope.",
    lineItems: sharedBaseLineItems,
    financials: {
      subtotal: "$3,995.00",
      discount: "-$50.00",
      tax: "$45.00",
      total: "$3,995.00",
    },
    termsAndConditions: sharedTermsAndConditions,
    requestSummary: sharedRequestSummary,
    siteVisit: sharedSiteVisit,
    declineInfo: {
      declinedOn: "Aug 16, 2026, 02:00 PM",
      reason: "Price is higher than expected.",
    },
  },
};

/**
 * Helper to fetch estimate details by id.
 * Supports direct match (e.g. "est-1", "est-2", etc.)
 * or matching by estimateId / requestId or fallback.
 */
export function getEstimateDetailData(id?: string): EstimateDetailData {
  if (!id) return mockEstimateDetails["est-1"];

  const direct = mockEstimateDetails[id];
  if (direct) return direct;

  const foundInList = estimateData.find(
    (item) =>
      item.id === id ||
      item.estimateId.toLowerCase() === id.toLowerCase() ||
      item.estimateId.replace("#", "").toLowerCase() === id.toLowerCase()
  );

  if (foundInList) {
    if (foundInList.status === "Approved") {
      return {
        ...(foundInList.hasSiteVisit
          ? mockEstimateDetails["est-5"]
          : mockEstimateDetails["est-4"]),
        id: foundInList.id,
        estimateId: foundInList.estimateId,
        status: "Approved",
      };
    }
    if (foundInList.status === "Declined") {
      return {
        ...(foundInList.hasSiteVisit
          ? mockEstimateDetails["est-7"]
          : mockEstimateDetails["est-6"]),
        id: foundInList.id,
        estimateId: foundInList.estimateId,
        status: "Declined",
      };
    }
    return {
      ...(foundInList.hasSiteVisit
        ? mockEstimateDetails["est-2"]
        : mockEstimateDetails["est-1"]),
      id: foundInList.id,
      estimateId: foundInList.estimateId,
      status: "Pending Approval",
    };
  }

  // Fallback default
  return mockEstimateDetails["est-1"];
}
