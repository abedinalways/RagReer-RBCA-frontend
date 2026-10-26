import {
  AdminContractItem,
  ContractDetailData,
} from "../types/adminContracts.types";

export const ADMIN_CONTRACTS_DATA: AdminContractItem[] = [
  {
    id: "cn-1024-1",
    contractId: "#CN-1024",
    estimateId: "#EST-1024",
    customer: {
      name: "Alex Morgan",
      email: "alexmorgan@gmail.com",
      contact: "999-(1234)-555",
      address: "124 Oak Street",
      avatarUrl:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150",
    },
    propertyAddress: "124 Oak Street",
    serviceType: "Residential Lawn...",
    agreementType: "12 Months",
    period: "Jan 01 - Dec 31, 2026",
    serviceAgreementType: "12 month agreement",
    requestType: "Recurring",
    frequency: "Monthly",
    amount: "$3,600.00",
    status: "Draft",
    schedule: {
      startDate: "01/01/2026",
      endDate: "31/12/2026",
      startTime: "02:00 AM",
      endTime: "04:00 AM",
      daysOfWeek: ["Monday", "Wednesday"],
      estimatedDuration: "2hr/day",
      estimatedVisits: 12,
      perMonth: 1,
    },
    pricing: {
      contractValue: "$3,600.00",
      paymentType: "Recurring",
      billingFrequency: "Monthly",
      billingDate: "1st of every month",
      billingTerms: "Net 30",
      billingPreferences: "Separate Month",
    },
    billingType: "Monthly",
  },
  {
    id: "cn-1025",
    contractId: "#CN-1025",
    estimateId: "#EST-1025",
    customer: {
      name: "Jordan Lee",
      email: "jordan.lee@example.com",
      contact: "+1 (555) 345-6789",
      address: "987 Pine Avenue",
      avatarUrl:
        "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=150",
    },
    propertyAddress: "987 Pine Avenue",
    serviceType: "Commercial Tree...",
    agreementType: "6 Months",
    period: "Feb 15 - Aug 14, 2026",
    serviceAgreementType: "6 month agreement",
    requestType: "Recurring",
    frequency: "Monthly",
    amount: "$5,400.00",
    status: "Sent",
    billingType: "Monthly",
  },
  {
    id: "cn-1024-2",
    contractId: "#CN-1024",
    estimateId: "#EST-1024",
    customer: {
      name: "Alex Morgan",
      email: "alexmorgan@gmail.com",
      contact: "999-(1234)-555",
      address: "124 Oak Street",
      avatarUrl:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150",
    },
    propertyAddress: "124 Oak Street",
    serviceType: "Residential Lawn...",
    agreementType: "12 Months",
    period: "Jan 01 - Dec 31, 2026",
    serviceAgreementType: "12 month agreement",
    requestType: "Recurring",
    frequency: "Monthly",
    amount: "$3,600.00",
    status: "Pending Sign",
    billingType: "Monthly",
  },
  {
    id: "cn-1024-signed",
    contractId: "#CN-1024",
    estimateId: "#EST-1024",
    customer: {
      name: "Alex Morgan",
      email: "alexmorgan@gmail.com",
      contact: "999-(1234)-555",
      address: "124 Oak Street",
      avatarUrl:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150",
    },
    propertyAddress: "124 Oak Street",
    serviceType: "Commercial Lawn Care",
    agreementType: "12 Months",
    period: "Jan 01, 2026 to Dec 31, 2026",
    serviceAgreementType: "12 month agreement (recurring)",
    requestType: "Recurring",
    frequency: "Monthly",
    amount: "$2,518.00",
    status: "Signed",
    billingType: "Monthly",
  },
  {
    id: "cn-1026-1",
    contractId: "#CN-1026",
    estimateId: "#EST-1026",
    customer: {
      name: "Samantha Cruz",
      email: "samantha.cruz@yahoo.com",
      contact: "+1 (555) 789-0123",
      address: "456 Maple Lane",
      avatarUrl:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150",
    },
    propertyAddress: "456 Maple Lane",
    serviceType: "Seasonal Garden...",
    agreementType: "3 Months",
    period: "Mar 01 - May 31, 2026",
    serviceAgreementType: "Month-to-month agreement",
    requestType: "Recurring",
    frequency: "Monthly",
    amount: "$1,850.00",
    status: "Change Requested",
    billingType: "Monthly",
  },
  {
    id: "cn-1026-2",
    contractId: "#CN-1026",
    estimateId: "#EST-1026",
    customer: {
      name: "Samantha Cruz",
      email: "samantha.cruz@yahoo.com",
      contact: "+1 (555) 789-0123",
      address: "456 Maple Lane",
      avatarUrl:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150",
    },
    propertyAddress: "456 Maple Lane",
    serviceType: "Seasonal Garden...",
    agreementType: "3 Months",
    period: "Mar 01 - May 31, 2026",
    serviceAgreementType: "Month-to-month agreement",
    requestType: "Recurring",
    frequency: "Monthly",
    amount: "$1,850.00",
    status: "Active",
    billingType: "Consolidated Monthly",
  },
  {
    id: "cn-1026-3",
    contractId: "#CN-1026",
    estimateId: "#EST-1026",
    customer: {
      name: "Samantha Cruz",
      email: "samantha.cruz@yahoo.com",
      contact: "+1 (555) 789-0123",
      address: "456 Maple Lane",
      avatarUrl:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150",
    },
    propertyAddress: "456 Maple Lane",
    serviceType: "Seasonal Garden...",
    agreementType: "3 Months",
    period: "Mar 01 - May 31, 2026",
    serviceAgreementType: "Month-to-month agreement",
    requestType: "Recurring",
    frequency: "Monthly",
    amount: "$1,850.00",
    status: "Cancelled",
    billingType: "Monthly",
  },
  {
    id: "cn-1030",
    contractId: "#CN-1030",
    estimateId: "#EST-1030",
    customer: {
      name: "David Kim",
      email: "david.kim@hotmail.com",
      contact: "+1 (555) 456-7890",
      address: "44 Chestnut Street",
      avatarUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
    },
    propertyAddress: "44 Chestnut Street",
    serviceType: "Residential Pest...",
    agreementType: "12 Months",
    period: "Jun 01 - May 31, 2027",
    serviceAgreementType: "12 month agreement",
    requestType: "Recurring",
    frequency: "Monthly",
    amount: "$4,200.00",
    status: "Active",
    billingType: "Monthly",
  },
  {
    id: "cn-1031",
    contractId: "#CN-1031",
    estimateId: "#EST-1031",
    customer: {
      name: "Emily Watson",
      email: "emily.watson@gmail.com",
      contact: "+1 (555) 234-5678",
      address: "88 Willow Creek Rd",
      avatarUrl:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
    },
    propertyAddress: "88 Willow Creek Rd",
    serviceType: "Office Cleaning...",
    agreementType: "6 Months",
    period: "Jul 01 - Dec 31, 2026",
    serviceAgreementType: "6 month agreement",
    requestType: "Recurring",
    frequency: "Monthly",
    amount: "$7,800.00",
    status: "Draft",
    billingType: "Separate Per Property",
  },
];

export const DEFAULT_CONTRACT_DETAIL: ContractDetailData = {
  id: "cn-1024-1",
  contractId: "#CN-1024",
  status: "Draft",
  createdAt: "Aug 16, 2026",
  version: "1",
  agreementTitle: "Commercial Lawn Care Agreement",
  provider: {
    name: "HALF STACHE",
    email: "halfstach@support.com",
    phone: "999-(1234)-555",
  },
  customer: {
    name: "Alex Morgan",
    email: "alexmorgan@gmail.com",
    contact: "999-(1234)-555",
    address: "124 Oak Street",
    avatarUrl:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150",
  },
  requestedService: "Landscape & Property Maintenance",
  serviceAgreementType: "12 month agreement (recurring)",
  contractDuration: "Jan 01, 2026 to Dec 31, 2026",
  contractValue: "$2,518.00",
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
  totalEstimates: "$3,995.00",
  termsAndConditions: {
    clauseNumber: "1",
    title: "Rescheduling & Bad Weather Clause",
    content:
      "In the event of adverse weather conditions (including heavy rainfall, hurricane warnings, severe lightning, saturated ground preventing machinery operation, or extreme wind events) or municipal transportation closures, HALF STACHE Lawn Care reserves the right to promptly reschedule the scheduled service date to the next available safe operating window without penalty.",
  },
  property: {
    name: "North Entrance Monument & Islands",
    address: "100 Whispering Pines Blvd at Hwy 43",
    imageUrl:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800",
  },
  scheduling: {
    frequency: "Monthly",
    startDate: "Jan 01, 2026",
    endDate: "Dec 31, 2026",
    preferredTime: "11:00 AM- 02:00 PM",
    estimateDuration: "3hr/day",
    estimateVisit: "22 visit",
  },
  paymentTerms: {
    monthlyAmount: "$595.00/month",
    nextPaymentDate: "Sep 01, 2026",
    paymentType: "Recurring",
    billingFrequency: "Monthly Payment",
    paymentDuration: "1 month",
  },
  accessNote:
    "Gate access required , 2 dogs on property (indoors during service) , Tenant currently occupying property (Name,Phone)",
};

export const getContractDetailById = (
  id?: string
): ContractDetailData => {
  if (!id) return DEFAULT_CONTRACT_DETAIL;

  const match = ADMIN_CONTRACTS_DATA.find(
    (c) =>
      c.id.toLowerCase() === id.toLowerCase() ||
      c.contractId.toLowerCase() === id.toLowerCase() ||
      c.contractId.replace("#", "").toLowerCase() === id.toLowerCase()
  );

  if (!match) return DEFAULT_CONTRACT_DETAIL;

  return {
    ...DEFAULT_CONTRACT_DETAIL,
    id: match.id,
    contractId: match.contractId,
    status: match.status,
    customer: match.customer,
    requestedService: match.serviceType.replace("...", ""),
    serviceAgreementType:
      match.serviceAgreementType || `${match.agreementType} agreement (recurring)`,
    contractDuration: match.period || DEFAULT_CONTRACT_DETAIL.contractDuration,
    property: {
      ...DEFAULT_CONTRACT_DETAIL.property,
      address: match.propertyAddress,
    },
  };
};

