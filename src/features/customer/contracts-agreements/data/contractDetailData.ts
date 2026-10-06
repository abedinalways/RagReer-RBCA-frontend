import { ContractDetailData } from "../types/contractsAgreementsTypes";

export const defaultContractDetailData: ContractDetailData = {
  id: "cn-1",
  contractId: "#CN-1024",
  status: "Pending Approval",
  issueDate: "Aug 16, 2026",
  version: "Version 1",
  agreementTitle: "Commercial Lawn Care Agreement",
  provider: {
    name: "HALF STACHe",
    email: "halfstach@support.com",
    phone: "999-(1234)-555",
  },
  customer: {
    name: "Alex Morgan",
    email: "alexmorgan@gmail.com",
    phone: "999-(1234)-555",
  },
  requestedService: "Landscape & Property Maintenance",
  requestedServiceType: "Type: Commercial",
  serviceAgreementType: "12 month agreement (recurring)",
  contractDuration: "Jan 01, 2026 to Dec 31, 2026",
  contractValue: "$2,518.00",
  totalEstimateAmount: "$2,518.00",
  documentVersion: "Document version #CN-1024-v1",
  signedNotificationEmail: "jan.m*****@email.com",
  serviceDetails: {
    scopeOfWork:
      "Complete spring lawn cleanup and landscape refresh for the front and back yard, including removal of leaves and debris, bed edging, trimming of ornamental grasses, and a fresh layer of mulch.",
    includedServices: [
      {
        title: "Lawn Care",
        workIncluded: ["Mowing", "Trimming", "Edging", "Blowing"],
      },
      {
        title: "Additional Service",
        workIncluded: [
          "Trim designated shrubs/hedges",
          "Remove resulting debris",
          "Edging",
          "Blowing",
        ],
      },
    ],
  },
  pricing: {
    lineItems: [
      {
        description: "Site preparation & sod removal",
        quantity: "1 job",
        rate: "$85.00",
        amount: "$85.00",
      },
      {
        description: "Soil grading & leveling",
        quantity: "1 job",
        rate: "$85.00",
        amount: "$85.00",
      },
      {
        description: "Drought-tolerant plantings (12 shrubs)",
        quantity: "12 items",
        rate: "$85.00",
        amount: "$1020.00",
      },
      {
        description: "Premium mulch installation",
        quantity: "4 items",
        rate: "$95.00",
        amount: "$380.00",
      },
      {
        description: "Edging & cleanup",
        quantity: "1 job",
        rate: "$85.00",
        amount: "$85.00",
      },
      {
        description: "Equipments",
        quantity: "5 items",
        rate: "$85.00",
        amount: "$1020.00",
      },
    ],
    totalEstimates: "$3,995.00",
  },
  termsAndConditions: [
    {
      id: 1,
      title: "1. Rescheduling & Bad Weather Clause",
      content:
        "In the event of adverse weather conditions (including heavy rainfall, hurricane warnings, severe lightning, saturated ground preventing machinery operation, or extreme wind events) or municipal transportation closures, HALF STACHE Lawn Care reserves the right to promptly reschedule the scheduled service date to the next available safe operating window without penalty.",
    },
    {
      id: 2,
      title: "2. Cancellation Policy",
      content:
        "Regular recurring services may be cancelled with a minimum of 14 calendar days written notice. One-time services may be cancelled up to 24 hours prior to scheduled arrival with no cancellation surcharge. Emergency dispatch calls cancelled after crew en-route are subject to the standard dispatch fee ($150.00).",
    },
    {
      id: 3,
      title: "3. Customer Responsibilities",
      content:
        "Provide property access, ensure service area is accessible, notify provider about relevant restrictions.",
    },
  ],
  property: {
    title: "North Entrance Monument & Islands",
    address: "100 Whispering Pines Blvd at Hwy 43",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80",
    propertyId: "prop-1",
  },
  schedulingDetails: {
    frequency: "Monthly",
    startDate: "Jan 01, 2026",
    endDate: "Dec 31, 2026",
    preferredTime: "11:00 AM- 02:00 PM",
    estimateDuration: "3hr/day",
    estimateVisit: "22 visit",
  },
  paymentTerms: {
    monthlyRate: "$595.00/month",
    nextPaymentDate: "Next payment date: Sep 01, 2026",
    paymentType: "Recurring",
    billingFrequency: "Monthly Payment",
    paymentDuration: "1 month",
  },
  accessNote:
    "Gate access required , 2 dogs on property (indoors during service), Tenant currently occupying property (Name,Phone)",
};

export const getContractDetailData = (id: string): ContractDetailData => {
  return {
    ...defaultContractDetailData,
    id: id || "cn-1",
  };
};
