export interface SiteVisitAssessmentData {
  requestId: string;
  propertyName: string;
  propertyAddress: string;
  visitCompletedOn: string;
  completedBy: {
    name: string;
    avatar: string;
  };
  hasAdjustments: boolean;
  assessmentNotes: string;
  requiredServices: string[];
  estimateDuration: string;
  attachments: string[];
}

export const MOCK_SITE_ASSESSMENTS: Record<string, SiteVisitAssessmentData> = {
  // Scenario 1: Adjustments Required (Figma Screenshot 1)
  withAdjustments: {
    requestId: "#REQ125789",
    propertyName: "North Entrance Monument & Islands",
    propertyAddress: "100 Whispering Pines Blvd at Hwy 43",
    visitCompletedOn: "21 Sep, 2026",
    completedBy: {
      name: "David Edison",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    },
    hasAdjustments: true,
    assessmentNotes:
      "During the site visit, we found that the existing sod and debris need to be removed and the soil needs to be leveled before the requested landscaping work can be completed. These required services have been identified.",
    requiredServices: ["Lawn Preparation", "Waste Removal"],
    estimateDuration: "2 Hours",
    attachments: [
      "/images/site01.png",
      "/images/site02.png",
      "/images/site03.png",
    ],
  },

  // Scenario 2: No Additional Service Needed (Figma Screenshot 2)
  withoutAdjustments: {
    requestId: "#REQ125789",
    propertyName: "North Entrance Monument & Islands",
    propertyAddress: "100 Whispering Pines Blvd at Hwy 43",
    visitCompletedOn: "21 Sep, 2026",
    completedBy: {
      name: "David Edison",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    },
    hasAdjustments: false,
    assessmentNotes:
      "There is no additional service needed for completing the requested service. I've attached images for your better understanding.",
    requiredServices: [],
    estimateDuration: "N/A",
    attachments: [
      "/images/site01.png",
      "/images/site02.png",
      "/images/site03.png",
    ],
  },
};

export const getSiteAssessmentByRequestId = (
  requestId?: string
): SiteVisitAssessmentData => {
  // If request ID matches or is provided, return default with adjustments
  // Can be customized per ID or scenario
  return MOCK_SITE_ASSESSMENTS.withAdjustments;
};
