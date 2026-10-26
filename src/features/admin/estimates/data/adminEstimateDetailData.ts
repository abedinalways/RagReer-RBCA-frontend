import { EstimateDetailData } from "../types/adminEstimates.types";

export const DEFAULT_ESTIMATE_DETAIL: EstimateDetailData = {
  id: "est-1024",
  estimateId: "#EST-1024",
  status: "Draft",
  createdDate: "Aug 16, 2026",
  version: "Version 1",
  hasSiteVisit: false,
  property: {
    name: "North Entrance Monument & Islands",
    address: "100 Whispering Pines Blvd at Hwy 43",
    category: "Residential",
    size: "Size: Small (up to 1/4 acre)",
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600",
  },
  scopeOfWork:
    "Complete spring lawn cleanup and landscape refresh for the front and back yard, including removal of leaves and debris, bed edging, trimming of ornamental grasses, and a fresh layer of mulch.",
  termsAndConditions:
    "Estimate valid for 14 days. Work will be scheduled after contracts & agreements approval. Pricing includes the listed scope only. Additional work requires written approval before it begins.",
  serviceDetails: {
    lawnCare: ["Mowing", "Trimming", "Edging", "Blowing"],
    additionalServices: [
      "Trim designated shrubs/hedges",
      "Remove resulting debris",
      "Edging",
      "Blowing",
    ],
  },
  estimateDuration: "4-5 hours",
  siteAssessmentNotes:
    "During the site visit, we found that the existing sod and debris need to be removed and the soil needs to be leveled before the requested landscaping work can be completed. These required services have been included in the estimate below.",
  lineItems: [
    {
      id: "li-1",
      description: "Site preparation & sod removal",
      quantity: "1 job",
      rate: "$85.00",
      amount: "$85.00",
    },
    {
      id: "li-2",
      description: "Soil grading & leveling",
      quantity: "1 job",
      rate: "$85.00",
      amount: "$85.00",
    },
    {
      id: "li-3",
      description: "Drought-tolerant plantings (12 shrubs)",
      quantity: "12 items",
      rate: "$85.00",
      amount: "$1020.00",
    },
    {
      id: "li-4",
      description: "Premium mulch installation",
      quantity: "4 items",
      rate: "$95.00",
      amount: "$380.00",
    },
    {
      id: "li-5",
      description: "Edging & cleanup",
      quantity: "1 job",
      rate: "$85.00",
      amount: "$85.00",
    },
    {
      id: "li-6",
      description: "Equipments",
      quantity: "5 items",
      rate: "$85.00",
      amount: "$1020.00",
    },
  ],
  siteAssessmentLineItems: [
    {
      id: "sa-1",
      description: "Site preparation & sod removal",
      quantity: "1 job",
      rate: "$85.00",
      amount: "$85.00",
    },
    {
      id: "sa-2",
      description: "Soil grading & leveling",
      quantity: "1 job",
      rate: "$85.00",
      amount: "$85.00",
    },
  ],
  financialSummary: {
    subtotal: "$3,995.00",
    discount: "-$50.00",
    tax: "$45.00",
    total: "$3,995.00",
    priorPayment: "$0.00",
    remainingBalance: "$3,995.00",
  },
  requestSummary: {
    requestId: "REQ-1048",
    createdOn: "Aug 16, 2026, 02:00 PM",
    requestedService: "Landscape & Property Maintenance",
    requestType: "Recurring",
    frequency: "Monthly",
  },
  validityPeriod: {
    till: "Till Oct 06, 2026",
    total: "$3,995.00",
  },
  siteVisit: {
    completed: true,
    property: "100 Whispering Pines Blvd at Hwy 43",
    dateTime: "Aug 28, 2026, 03:00 PM - 04:00 PM",
    visitedBy: "Alex Morgan",
  },
  halfStacheNote:
    "We've completed the site assessment and prepared your final estimate. Once you approved the service estimate we will prepare a contracts & agreements for you.",
  changeRequest: {
    changeTarget: "Service",
    reason:
      "Customer requested to remove tree trimming from the scope and update the total accordingly.",
    attachedPhotos: [
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=200",
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&q=80&w=200",
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=200",
    ],
  },
  approvedOn: "Aug 16, 2026, 02:00 PM",
  expiredOn: "Aug 16, 2026, 02:00 PM",
  declinedOn: "Aug 16, 2026, 02:00 PM",
  declineReason: "Price is hire than expected.",
  siteVisitStatusText: "Not Required/ Completed",
  siteVisitCompletedOnText: "— / Aug 16, 2026, 02:00 PM",
};

