import { JobDetailData } from "../types/jobDetailsTypes";
import { INITIAL_JOB_PIPELINE_DATA } from "./jobPipelineData";

export const DEFAULT_JOB_DETAIL_DATA: JobDetailData = {
  id: "job-1",
  jobId: "#JOB12458",
  title: "Landscape & Property Maintenance",
  status: "Scheduled",
  createdOn: "Aug 16, 2026, 02:00 PM",
  customer: {
    id: "#CTR15867",
    name: "Weatherly Property Group",
    customerType: "Commercial",
    role: "Property Owner",
    email: "weatherly@gmail.com",
    billingType: "Monthly",
  },
  property: {
    id: "#PRT14894",
    name: "North Entrance Monument & Islands",
    address: "100 Whispering Pines Blvd at Hwy 43",
    maintainer: "Alex Morgan",
    contact: "999-(1254)-555",
    siteAccess: "Sent",
  },
  description:
    "Complete spring lawn cleanup and landscape refresh for the front and back yard, including removal of leaves and debris, bed edging, trimming of ornamental grasses, and a fresh layer of mulch.",
  serviceIncluded: [
    "Mowing",
    "Trimming",
    "Edging",
    "Blowing",
    "Trim designated shrubs/hedges",
    "Remove resulting debris",
  ],
  equipment: [
    { name: "Push Mower – Honda HRX217", category: "#Mower" },
    { name: "Trimmer #2 – Ego ST1521S", category: "#Trimmer" },
    { name: "Leaf Blower", category: "#Blower" },
    { name: "Truck #1 – Ford F-250 (White)", category: "#Vehicle" },
  ],
  summary: {
    requestedService: "Landscape & Property Maintenance",
    requestType: "Recurring",
    frequency: "Monthly",
    serviceAgreementType: "12 Month Agreement",
    amount: "$789.00",
    scheduleDate: "Sep 24, 2026",
    arrivalWindow: "08:00 AM- 10:00 PM",
  },
  crew: [
    {
      id: "crew-1",
      name: "Daniel Green",
      role: "Crew Leader",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      strikeCount: 0,
      isLeader: true,
    },
    {
      id: "crew-2",
      name: "Liam Chen",
      role: "Navigator",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      strikeCount: 0,
    },
    {
      id: "crew-3",
      name: "Marcus Bell",
      role: "Crew Member",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
      strikeCount: 0,
    },
    {
      id: "crew-4",
      name: "Emma Thompson",
      role: "Crew Member",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      strikeCount: 1,
    },
  ],
  additionalCrewCount: 2,
  timeTracking: [
    {
      id: "tt-1",
      name: "Oliver Davis",
      role: "Crew Leader",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      travelStart: "-",
      arrived: "-",
      workStart: "-",
      breakTime: "-",
      workStop: "-",
      currentStatus: "-",
      totalTime: "-",
      billableHours: "00h 00m",
    },
    {
      id: "tt-2",
      name: "Emma Thompson",
      role: "Crew Member",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      travelStart: "-",
      arrived: "-",
      workStart: "-",
      breakTime: "-",
      workStop: "-",
      currentStatus: "-",
      totalTime: "-",
      billableHours: "00h 00m",
    },
    {
      id: "tt-3",
      name: "Liam Martinez",
      role: "Crew Member",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      travelStart: "-",
      arrived: "-",
      workStart: "-",
      breakTime: "-",
      workStop: "-",
      currentStatus: "-",
      totalTime: "-",
      billableHours: "00h 00m",
    },
    {
      id: "tt-4",
      name: "Liam Martinez",
      role: "Crew Member",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      travelStart: "-",
      arrived: "-",
      workStart: "-",
      breakTime: "-",
      workStop: "-",
      currentStatus: "-",
      totalTime: "-",
      billableHours: "00h 00m",
    },
  ],
  tasks: [
    {
      id: "task-1",
      task: "Lawn Mowing",
      assignedCrew: "-",
      status: "-",
      evidence: "-",
    },
    {
      id: "task-2",
      task: "Trimming",
      assignedCrew: "-",
      status: "-",
      evidence: "-",
    },
    {
      id: "task-3",
      task: "Edging",
      assignedCrew: "-",
      status: "-",
      evidence: "-",
    },
    {
      id: "task-4",
      task: "Blowing",
      assignedCrew: "-",
      status: "-",
      evidence: "-",
    },
    {
      id: "task-5",
      task: "Trim designated shrubs/hedges",
      assignedCrew: "-",
      status: "-",
      evidence: "-",
    },
    {
      id: "task-6",
      task: "Remove resulting debris",
      assignedCrew: "-",
      status: "-",
      evidence: "-",
    },
  ],
  activities: [],
};

export const SCHEDULED_JOB_DETAIL_DATA = DEFAULT_JOB_DETAIL_DATA;

export const IN_PROGRESS_JOB_DETAIL_DATA: JobDetailData = {
  id: "job-2",
  jobId: "#JOB12458",
  title: "Landscape & Property Maintenance",
  status: "In Progress",
  createdOn: "Aug 16, 2026, 02:00 PM",
  customer: {
    id: "#CTR15867",
    name: "Weatherly Property Group",
    customerType: "Commercial",
    role: "Property Owner",
    email: "weatherly@gmail.com",
    billingType: "Monthly",
  },
  property: {
    id: "#PRT14894",
    name: "North Entrance Monument & Islands",
    address: "100 Whispering Pines Blvd at Hwy 43",
    maintainer: "Alex Morgan",
    contact: "999-(1254)-555",
    siteAccess: "Sent",
  },
  description:
    "Complete spring lawn cleanup and landscape refresh for the front and back yard, including removal of leaves and debris, bed edging, trimming of ornamental grasses, and a fresh layer of mulch.",
  serviceIncluded: [
    "Mowing",
    "Trimming",
    "Edging",
    "Blowing",
    "Trim designated shrubs/hedges",
    "Remove resulting debris",
  ],
  equipment: [
    { name: "Push Mower – Honda HRX217", category: "#Mower" },
    { name: "Trimmer #2 – Ego ST1521S", category: "#Trimmer" },
    { name: "Leaf Blower", category: "#Blower" },
    { name: "Truck #1 – Ford F-250 (White)", category: "#Vehicle" },
  ],
  summary: {
    requestedService: "Landscape & Property Maintenance",
    requestType: "Recurring",
    frequency: "Monthly",
    serviceAgreementType: "12 Month Agreement",
    amount: "$789.00",
    scheduleDate: "Sep 24, 2026",
    arrivalWindow: "08:00 AM- 10:00 PM",
  },
  crew: [
    {
      id: "crew-1",
      name: "Daniel Green",
      role: "Crew Leader",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      strikeCount: 0,
      isLeader: true,
    },
    {
      id: "crew-2",
      name: "Liam Chen",
      role: "Navigator",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      strikeCount: 0,
    },
    {
      id: "crew-3",
      name: "Marcus Bell",
      role: "Crew Member",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
      strikeCount: 0,
    },
    {
      id: "crew-4",
      name: "Emma Thompson",
      role: "Crew Member",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      strikeCount: 1,
    },
  ],
  additionalCrewCount: 2,
  timeTracking: [
    {
      id: "tt-1",
      name: "Oliver Davis",
      role: "Crew Leader",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      travelStart: "08:03 AM",
      arrived: "08:30 AM",
      workStart: "08:40 AM",
      breakTime: "01:00 PM - 01:30 PM",
      workStop: "04:00 PM",
      currentStatus: "In Progress",
      totalTime: "04h 18m",
      billableHours: "-",
    },
    {
      id: "tt-2",
      name: "Emma Thompson",
      role: "Crew Member",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      travelStart: "08:03 AM",
      arrived: "08:30 AM",
      workStart: "08:40 AM",
      breakTime: "01:00 PM - 01:30 PM",
      workStop: "04:00 PM",
      currentStatus: "Break",
      totalTime: "04h 18m",
      billableHours: "-",
    },
    {
      id: "tt-3",
      name: "Liam Martinez",
      role: "Crew Member",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      travelStart: "08:03 AM",
      arrived: "08:30 AM",
      workStart: "08:40 AM",
      breakTime: "01:00 PM - 01:30 PM",
      workStop: "04:00 PM",
      currentStatus: "In Progress",
      totalTime: "04h 18m",
      billableHours: "-",
    },
    {
      id: "tt-4",
      name: "Liam Martinez",
      role: "Crew Member",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      travelStart: "08:03 AM",
      arrived: "08:30 AM",
      workStart: "08:40 AM",
      breakTime: "01:00 PM - 01:30 PM",
      workStop: "04:00 PM",
      currentStatus: "Completed",
      totalTime: "04h 18m",
      billableHours: "03h 20m",
    },
  ],
  tasks: [
    {
      id: "task-1",
      task: "Lawn Mowing",
      assignedCrew: {
        name: "Oliver Davis",
        role: "Crew Leader",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      },
      status: "Completed",
      evidence: "completed",
    },
    {
      id: "task-2",
      task: "Trimming",
      assignedCrew: {
        name: "Oliver Davis",
        role: "Crew Leader",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      },
      status: "Completed",
      evidence: "completed",
    },
    {
      id: "task-3",
      task: "Edging",
      assignedCrew: {
        name: "Liam Martinez",
        role: "Crew Member",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      },
      status: "Completed",
      evidence: "completed",
    },
    {
      id: "task-4",
      task: "Blowing",
      assignedCrew: {
        name: "Liam Martinez",
        role: "Crew Member",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      },
      status: "In Progress",
      evidence: "-",
    },
    {
      id: "task-5",
      task: "Trim designated shrubs/hedges",
      assignedCrew: {
        name: "Emma Brown",
        role: "Crew Member",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
      },
      status: "Break",
      evidence: "-",
    },
    {
      id: "task-6",
      task: "Remove resulting debris",
      assignedCrew: {
        name: "Emma Thompson",
        role: "Crew Member",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      },
      status: "In Progress",
      evidence: "-",
    },
  ],
  activities: [
    {
      id: "act-1",
      dotColor: "amber",
      title: "Travel Started",
      description: "Alex Morgan has start travel",
      timestamp: "3 minutes ago",
    },
    {
      id: "act-2",
      dotColor: "green",
      title: "Arrived at Site",
      description: "Alex Morgan has marked to arrived site",
      timestamp: "4 minutes ago",
    },
    {
      id: "act-3",
      dotColor: "blue",
      title: "Site Inspection Completed",
      description: "Alex Morgan finished the site inspection",
      timestamp: "15 minutes ago",
    },
    {
      id: "act-4",
      dotColor: "blue",
      title: "Work Commenced",
      description: "Crew began foundation work on site",
      timestamp: "1 hour 30 minutes ago",
    },
    {
      id: "act-5",
      dotColor: "green",
      title: "Arrived at Site",
      description: "Alex Morgan has marked to arrived site",
      timestamp: "4 minutes ago",
    },
  ],
};

export const ON_HOLD_JOB_DETAIL_DATA: JobDetailData = {
  id: "job-8",
  jobId: "#JOB12458",
  title: "Landscape & Property Maintenance",
  status: "On Hold",
  createdOn: "Aug 16, 2026, 02:00 PM",
  alertBanner: {
    title: "Additional Work Flagged",
    description: "Remove existing debris and prepare the area before lawn treatment.",
    actionText: "Review Now",
  },
  customer: {
    id: "#CTR15867",
    name: "Weatherly Property Group",
    customerType: "Commercial",
    role: "Property Owner",
    email: "weatherly@gmail.com",
    billingType: "Monthly",
  },
  property: {
    id: "#PRT14894",
    name: "North Entrance Monument & Islands",
    address: "100 Whispering Pines Blvd at Hwy 43",
    maintainer: "Alex Morgan",
    contact: "999-(1254)-555",
    siteAccess: "Sent",
  },
  description:
    "Complete spring lawn cleanup and landscape refresh for the front and back yard, including removal of leaves and debris, bed edging, trimming of ornamental grasses, and a fresh layer of mulch.",
  serviceIncluded: [
    "Mowing",
    "Trimming",
    "Edging",
    "Blowing",
    "Trim designated shrubs/hedges",
    "Remove resulting debris",
  ],
  equipment: [
    { name: "Push Mower – Honda HRX217", category: "#Mower" },
    { name: "Trimmer #2 – Ego ST1521S", category: "#Trimmer" },
    { name: "Leaf Blower", category: "#Blower" },
    { name: "Truck #1 – Ford F-250 (White)", category: "#Vehicle" },
  ],
  summary: {
    requestedService: "Landscape & Property Maintenance",
    requestType: "Recurring",
    frequency: "Monthly",
    serviceAgreementType: "12 Month Agreement",
    amount: "$789.00",
    scheduleDate: "Sep 24, 2026",
    arrivalWindow: "08:00 AM- 10:00 PM",
  },
  crew: [
    {
      id: "crew-1",
      name: "Daniel Green",
      role: "Crew Leader",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      strikeCount: 0,
      isLeader: true,
    },
    {
      id: "crew-2",
      name: "Liam Chen",
      role: "Navigator",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      strikeCount: 0,
    },
    {
      id: "crew-3",
      name: "Marcus Bell",
      role: "Crew Member",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
      strikeCount: 0,
    },
    {
      id: "crew-4",
      name: "Emma Thompson",
      role: "Crew Member",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      strikeCount: 1,
    },
  ],
  additionalCrewCount: 2,
  timeTracking: [
    {
      id: "tt-1",
      name: "Oliver Davis",
      role: "Crew Leader",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      travelStart: "08:03 AM",
      arrived: "08:30 AM",
      workStart: "08:40 AM",
      breakTime: "01:00 PM - 01:30 PM",
      workStop: "04:00 PM",
      currentStatus: "In Progress",
      totalTime: "04h 18m",
      billableHours: "-",
    },
    {
      id: "tt-2",
      name: "Emma Thompson",
      role: "Crew Member",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      travelStart: "08:03 AM",
      arrived: "08:30 AM",
      workStart: "08:40 AM",
      breakTime: "01:00 PM - 01:30 PM",
      workStop: "04:00 PM",
      currentStatus: "Break",
      totalTime: "04h 18m",
      billableHours: "-",
    },
    {
      id: "tt-3",
      name: "Liam Martinez",
      role: "Crew Member",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      travelStart: "08:03 AM",
      arrived: "08:30 AM",
      workStart: "08:40 AM",
      breakTime: "01:00 PM - 01:30 PM",
      workStop: "04:00 PM",
      currentStatus: "Hold",
      totalTime: "04h 18m",
      billableHours: "-",
    },
    {
      id: "tt-4",
      name: "Liam Martinez",
      role: "Crew Member",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      travelStart: "08:03 AM",
      arrived: "08:30 AM",
      workStart: "08:40 AM",
      breakTime: "01:00 PM - 01:30 PM",
      workStop: "04:00 PM",
      currentStatus: "Completed",
      totalTime: "04h 18m",
      billableHours: "03h 20m",
    },
  ],
  tasks: [
    {
      id: "task-1",
      task: "Lawn Mowing",
      assignedCrew: "-",
      status: "-",
      evidence: "-",
    },
    {
      id: "task-2",
      task: "Trimming",
      assignedCrew: "-",
      status: "-",
      evidence: "-",
    },
    {
      id: "task-3",
      task: "Edging",
      assignedCrew: "-",
      status: "-",
      evidence: "-",
    },
    {
      id: "task-4",
      task: "Blowing",
      assignedCrew: "-",
      status: "-",
      evidence: "-",
    },
    {
      id: "task-5",
      task: "Trim designated shrubs/hedges",
      assignedCrew: "-",
      status: "-",
      evidence: "-",
    },
    {
      id: "task-6",
      task: "Remove resulting debris",
      assignedCrew: "-",
      status: "-",
      evidence: "-",
    },
  ],
  activities: [
    {
      id: "act-1",
      dotColor: "amber",
      title: "Travel Started",
      description: "Alex Morgan has start travel",
      timestamp: "3 minutes ago",
    },
    {
      id: "act-2",
      dotColor: "green",
      title: "Arrived at Site",
      description: "Alex Morgan has marked to arrived site",
      timestamp: "4 minutes ago",
    },
    {
      id: "act-3",
      dotColor: "blue",
      title: "Site Inspection Completed",
      description: "Alex Morgan finished the site inspection",
      timestamp: "15 minutes ago",
    },
    {
      id: "act-4",
      dotColor: "blue",
      title: "Work Commenced",
      description: "Crew began foundation work on site",
      timestamp: "1 hour 30 minutes ago",
    },
    {
      id: "act-5",
      dotColor: "green",
      title: "Arrived at Site",
      description: "Alex Morgan has marked to arrived site",
      timestamp: "4 minutes ago",
    },
    {
      id: "act-6",
      dotColor: "orange",
      title: "Additional Work Submitted",
      description: "Alex Morgan submitted additional work for this job",
      timestamp: "30 minutes ago",
    },
  ],
};

export const AWAITING_REVIEW_JOB_DETAIL_DATA: JobDetailData = {
  id: "job-3",
  jobId: "#JOB12458",
  title: "Landscape & Property Maintenance",
  status: "Awaiting Review",
  createdOn: "Aug 16, 2026, 02:00 PM",
  customer: {
    id: "#CTR15867",
    name: "Weatherly Property Group",
    customerType: "Commercial",
    role: "Property Owner",
    email: "weatherly@gmail.com",
    billingType: "Monthly",
  },
  property: {
    id: "#PRT14894",
    name: "North Entrance Monument & Islands",
    address: "100 Whispering Pines Blvd at Hwy 43",
    maintainer: "Alex Morgan",
    contact: "999-(1254)-555",
    siteAccess: "Sent",
  },
  description:
    "Complete spring lawn cleanup and landscape refresh for the front and back yard, including removal of leaves and debris, bed edging, trimming of ornamental grasses, and a fresh layer of mulch.",
  serviceIncluded: [
    "Mowing",
    "Trimming",
    "Edging",
    "Blowing",
    "Trim designated shrubs/hedges",
    "Remove resulting debris",
  ],
  equipment: [
    { name: "Push Mower – Honda HRX217", category: "#Mower" },
    { name: "Trimmer #2 – Ego ST1521S", category: "#Trimmer" },
    { name: "Leaf Blower", category: "#Blower" },
    { name: "Truck #1 – Ford F-250 (White)", category: "#Vehicle" },
  ],
  summary: {
    requestedService: "Landscape & Property Maintenance",
    requestType: "Recurring",
    frequency: "Monthly",
    serviceAgreementType: "12 Month Agreement",
    amount: "$789.00",
    scheduleDate: "Sep 24, 2026",
    arrivalWindow: "08:00 AM- 10:00 PM",
  },
  crew: [
    {
      id: "crew-1",
      name: "Daniel Green",
      role: "Crew Leader",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      strikeCount: 0,
      isLeader: true,
    },
    {
      id: "crew-2",
      name: "Liam Chen",
      role: "Navigator",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      strikeCount: 0,
    },
    {
      id: "crew-3",
      name: "Marcus Bell",
      role: "Crew Member",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
      strikeCount: 0,
    },
    {
      id: "crew-4",
      name: "Emma Thompson",
      role: "Crew Member",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      strikeCount: 1,
    },
  ],
  additionalCrewCount: 2,
  timeTracking: [
    {
      id: "tt-1",
      name: "Oliver Davis",
      role: "Crew Leader",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      travelStart: "08:03 AM",
      arrived: "08:30 AM",
      workStart: "08:40 AM",
      breakTime: "01:00 PM - 01:30 PM",
      workStop: "04:00 PM",
      currentStatus: "Completed",
      totalTime: "04h 18m",
      billableHours: "03h 20m",
    },
    {
      id: "tt-2",
      name: "Emma Thompson",
      role: "Crew Member",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      travelStart: "08:03 AM",
      arrived: "08:30 AM",
      workStart: "08:40 AM",
      breakTime: "01:00 PM - 01:30 PM",
      workStop: "04:00 PM",
      currentStatus: "Completed",
      totalTime: "04h 18m",
      billableHours: "03h 20m",
    },
    {
      id: "tt-3",
      name: "Liam Martinez",
      role: "Crew Member",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      travelStart: "08:03 AM",
      arrived: "08:30 AM",
      workStart: "08:40 AM",
      breakTime: "01:00 PM - 01:30 PM",
      workStop: "04:00 PM",
      currentStatus: "Completed",
      totalTime: "04h 18m",
      billableHours: "03h 20m",
    },
    {
      id: "tt-4",
      name: "Liam Martinez",
      role: "Crew Member",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      travelStart: "08:03 AM",
      arrived: "08:30 AM",
      workStart: "08:40 AM",
      breakTime: "01:00 PM - 01:30 PM",
      workStop: "04:00 PM",
      currentStatus: "Completed",
      totalTime: "04h 18m",
      billableHours: "03h 20m",
    },
  ],
  taskCompletionSubtitle: "Task 2/5 completed",
  tasks: [
    {
      id: "task-1",
      task: "Lawn Mowing",
      assignedCrew: {
        name: "Oliver Davis",
        role: "Crew Leader",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      },
      status: "Completed",
      evidence: "completed",
    },
    {
      id: "task-2",
      task: "Trimming",
      assignedCrew: {
        name: "Oliver Davis",
        role: "Crew Leader",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      },
      status: "Completed",
      evidence: "completed",
    },
    {
      id: "task-3",
      task: "Edging",
      assignedCrew: {
        name: "Liam Martinez",
        role: "Crew Member",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      },
      status: "Completed",
      evidence: "completed",
    },
    {
      id: "task-4",
      task: "Blowing",
      assignedCrew: {
        name: "Liam Martinez",
        role: "Crew Member",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      },
      status: "Completed",
      evidence: "completed",
    },
    {
      id: "task-5",
      task: "Trim designated shrubs/hedges",
      assignedCrew: {
        name: "Emma Brown",
        role: "Crew Member",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
      },
      status: "Completed",
      evidence: "completed",
    },
    {
      id: "task-6",
      task: "Remove resulting debris",
      assignedCrew: {
        name: "Emma Thompson",
        role: "Crew Member",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      },
      status: "Completed",
      evidence: "completed",
    },
  ],
  evidencePhotos: {
    before: ["/images/site01.png", "/images/site03.png", "/images/site01.png"],
    after: ["/images/site01.png", "/images/site03.png", "/images/site01.png"],
  },
  checklist: [
    { id: "chk-1", text: "Overgrown plants trimmed", completed: true },
    { id: "chk-2", text: "Garden waste removed", completed: true },
    { id: "chk-3", text: "Pathways cleaned", completed: true },
    { id: "chk-4", text: "Shrubs and bushes trimmed", completed: true },
    { id: "chk-5", text: "Outdoor area cleared", completed: true },
    { id: "chk-6", text: "Property surroundings cleaned", completed: false },
  ],
  workNote: {
    text: "Completed spring lawn cleanup and landscape refresh for the front and back yard, including removal of leaves and debris, bed edging, trimming of ornamental grasses, and a fresh layer of mulch.",
    submittedBy: "Alex Garden",
    submitterRole: "Crew Leader",
  },
  activities: [
    {
      id: "act-1",
      dotColor: "amber",
      title: "Travel Started",
      description: "Alex Morgan has start travel",
      timestamp: "3 minutes ago",
    },
    {
      id: "act-2",
      dotColor: "green",
      title: "Arrived at Site",
      description: "Alex Morgan has marked to arrived site",
      timestamp: "4 minutes ago",
    },
    {
      id: "act-3",
      dotColor: "blue",
      title: "Site Inspection Completed",
      description: "Alex Morgan finished the site inspection",
      timestamp: "15 minutes ago",
    },
    {
      id: "act-4",
      dotColor: "blue",
      title: "Work Commenced",
      description: "Crew began foundation work on site",
      timestamp: "1 hour 30 minutes ago",
    },
    {
      id: "act-5",
      dotColor: "green",
      title: "Arrived at Site",
      description: "Alex Morgan has marked to arrived site",
      timestamp: "4 minutes ago",
    },
    {
      id: "act-6",
      dotColor: "orange",
      title: "Additional Work Submitted",
      description: "Alex Morgan submitted additional work for this job",
      timestamp: "30 minutes ago",
    },
    {
      id: "act-7",
      dotColor: "green",
      title: "Job marked as completed",
      description: "Alex Morgan completed the job",
      timestamp: "15 minutes ago",
    },
  ],
};

export const COMPLETED_JOB_DETAIL_DATA: JobDetailData = {
  id: "job-4",
  jobId: "#JOB12458",
  title: "Landscape & Property Maintenance",
  status: "Completed",
  createdOn: "Aug 16, 2026, 02:00 PM",
  customer: {
    id: "#CTR15867",
    name: "Weatherly Property Group",
    customerType: "Commercial",
    role: "Property Owner",
    email: "weatherly@gmail.com",
    billingType: "Monthly",
  },
  property: {
    id: "#PRT14894",
    name: "North Entrance Monument & Islands",
    address: "100 Whispering Pines Blvd at Hwy 43",
    maintainer: "Alex Morgan",
    contact: "999-(1254)-555",
    siteAccess: "Sent",
  },
  description:
    "Complete spring lawn cleanup and landscape refresh for the front and back yard, including removal of leaves and debris, bed edging, trimming of ornamental grasses, and a fresh layer of mulch.",
  serviceIncluded: [
    "Mowing",
    "Trimming",
    "Edging",
    "Blowing",
    "Trim designated shrubs/hedges",
    "Remove resulting debris",
  ],
  equipment: [
    { name: "Push Mower – Honda HRX217", category: "#Mower" },
    { name: "Trimmer #2 – Ego ST1521S", category: "#Trimmer" },
    { name: "Leaf Blower", category: "#Blower" },
    { name: "Truck #1 – Ford F-250 (White)", category: "#Vehicle" },
  ],
  summary: {
    requestedService: "Landscape & Property Maintenance",
    requestType: "Recurring",
    frequency: "Monthly",
    serviceAgreementType: "12 Month Agreement",
    amount: "$789.00",
    scheduleDate: "Sep 24, 2026",
    arrivalWindow: "08:00 AM- 10:00 PM",
  },
  crew: [
    {
      id: "crew-1",
      name: "Daniel Green",
      role: "Crew Leader",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      strikeCount: 0,
      isLeader: true,
    },
    {
      id: "crew-2",
      name: "Liam Chen",
      role: "Navigator",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      strikeCount: 0,
    },
    {
      id: "crew-3",
      name: "Marcus Bell",
      role: "Crew Member",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
      strikeCount: 0,
    },
    {
      id: "crew-4",
      name: "Emma Thompson",
      role: "Crew Member",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      strikeCount: 1,
    },
  ],
  additionalCrewCount: 2,
  timeTracking: [
    {
      id: "tt-1",
      name: "Oliver Davis",
      role: "Crew Leader",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      travelStart: "08:03 AM",
      arrived: "08:30 AM",
      workStart: "08:40 AM",
      breakTime: "01:00 PM - 01:30 PM",
      workStop: "04:00 PM",
      currentStatus: "Completed",
      totalTime: "04h 18m",
      billableHours: "03h 20m",
    },
    {
      id: "tt-2",
      name: "Emma Thompson",
      role: "Crew Member",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      travelStart: "08:03 AM",
      arrived: "08:30 AM",
      workStart: "08:40 AM",
      breakTime: "01:00 PM - 01:30 PM",
      workStop: "04:00 PM",
      currentStatus: "Completed",
      totalTime: "04h 18m",
      billableHours: "03h 20m",
    },
    {
      id: "tt-3",
      name: "Liam Martinez",
      role: "Crew Member",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      travelStart: "08:03 AM",
      arrived: "08:30 AM",
      workStart: "08:40 AM",
      breakTime: "01:00 PM - 01:30 PM",
      workStop: "04:00 PM",
      currentStatus: "Completed",
      totalTime: "04h 18m",
      billableHours: "03h 20m",
    },
    {
      id: "tt-4",
      name: "Liam Martinez",
      role: "Crew Member",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      travelStart: "08:03 AM",
      arrived: "08:30 AM",
      workStart: "08:40 AM",
      breakTime: "01:00 PM - 01:30 PM",
      workStop: "04:00 PM",
      currentStatus: "Completed",
      totalTime: "04h 18m",
      billableHours: "03h 20m",
    },
  ],
  taskCompletionSubtitle: "Task 2/5 completed",
  tasks: [
    {
      id: "task-1",
      task: "Lawn Mowing",
      assignedCrew: {
        name: "Oliver Davis",
        role: "Crew Leader",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      },
      status: "Completed",
      evidence: "completed",
    },
    {
      id: "task-2",
      task: "Trimming",
      assignedCrew: {
        name: "Oliver Davis",
        role: "Crew Leader",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      },
      status: "Completed",
      evidence: "completed",
    },
    {
      id: "task-3",
      task: "Edging",
      assignedCrew: {
        name: "Liam Martinez",
        role: "Crew Member",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      },
      status: "Completed",
      evidence: "completed",
    },
    {
      id: "task-4",
      task: "Blowing",
      assignedCrew: {
        name: "Liam Martinez",
        role: "Crew Member",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      },
      status: "Completed",
      evidence: "completed",
    },
    {
      id: "task-5",
      task: "Trim designated shrubs/hedges",
      assignedCrew: {
        name: "Emma Brown",
        role: "Crew Member",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
      },
      status: "Completed",
      evidence: "completed",
    },
    {
      id: "task-6",
      task: "Remove resulting debris",
      assignedCrew: {
        name: "Emma Thompson",
        role: "Crew Member",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      },
      status: "Completed",
      evidence: "completed",
    },
  ],
  evidencePhotos: {
    before: ["/images/site01.png", "/images/site03.png", "/images/site01.png"],
    after: ["/images/site01.png", "/images/site03.png", "/images/site01.png"],
  },
  checklist: [
    { id: "chk-1", text: "Overgrown plants trimmed", completed: true },
    { id: "chk-2", text: "Garden waste removed", completed: true },
    { id: "chk-3", text: "Pathways cleaned", completed: true },
    { id: "chk-4", text: "Shrubs and bushes trimmed", completed: true },
    { id: "chk-5", text: "Outdoor area cleared", completed: true },
    { id: "chk-6", text: "Property surroundings cleaned", completed: false },
  ],
  workNote: {
    text: "Completed spring lawn cleanup and landscape refresh for the front and back yard, including removal of leaves and debris, bed edging, trimming of ornamental grasses, and a fresh layer of mulch.",
    submittedBy: "Alex Garden",
    submitterRole: "Crew Leader",
  },
  activities: [
    {
      id: "act-1",
      dotColor: "amber",
      title: "Travel Started",
      description: "Alex Morgan has start travel",
      timestamp: "3 minutes ago",
    },
    {
      id: "act-2",
      dotColor: "green",
      title: "Arrived at Site",
      description: "Alex Morgan has marked to arrived site",
      timestamp: "4 minutes ago",
    },
    {
      id: "act-3",
      dotColor: "blue",
      title: "Site Inspection Completed",
      description: "Alex Morgan finished the site inspection",
      timestamp: "15 minutes ago",
    },
    {
      id: "act-4",
      dotColor: "blue",
      title: "Work Commenced",
      description: "Crew began foundation work on site",
      timestamp: "1 hour 30 minutes ago",
    },
    {
      id: "act-5",
      dotColor: "green",
      title: "Arrived at Site",
      description: "Alex Morgan has marked to arrived site",
      timestamp: "4 minutes ago",
    },
    {
      id: "act-6",
      dotColor: "green",
      title: "Materials Delivered",
      description: "Delivery team dropped off construction materials",
      timestamp: "30 minutes ago",
    },
    {
      id: "act-7",
      dotColor: "orange",
      title: "Additional Work Submitted",
      description: "Alex Morgan submitted additional work for this job",
      timestamp: "30 minutes ago",
    },
    {
      id: "act-8",
      dotColor: "green",
      title: "Job marked as completed",
      description: "Alex Morgan completed the job",
      timestamp: "15 minutes ago",
    },
  ],
};

/**
 * Returns dynamic job detail data according to job ID and status
 */
export function getJobDetailById(rawId?: string): JobDetailData {
  if (!rawId) return DEFAULT_JOB_DETAIL_DATA;
  const cleanId = rawId.replace("#", "").trim();

  const pipelineJob = INITIAL_JOB_PIPELINE_DATA.find((j) => j.id === cleanId);
  const status = pipelineJob?.status;

  if (status === "Completed" || cleanId === "job-4" || cleanId === "job-15") {
    return {
      ...COMPLETED_JOB_DETAIL_DATA,
      id: cleanId,
      jobId: pipelineJob?.jobId || "#JOB12458",
      title: pipelineJob?.service.replace(/\.+$/, "") || COMPLETED_JOB_DETAIL_DATA.title,
    };
  }

  if (status === "Awaiting Review" || cleanId === "job-3") {
    return {
      ...AWAITING_REVIEW_JOB_DETAIL_DATA,
      id: cleanId,
      jobId: pipelineJob?.jobId || "#JOB12458",
      title: pipelineJob?.service.replace(/\.+$/, "") || AWAITING_REVIEW_JOB_DETAIL_DATA.title,
    };
  }

  if (status === "On Hold" || cleanId === "job-8") {
    return {
      ...ON_HOLD_JOB_DETAIL_DATA,
      id: cleanId,
      jobId: pipelineJob?.jobId || "#JOB12458",
      title: pipelineJob?.service.replace(/\.+$/, "") || ON_HOLD_JOB_DETAIL_DATA.title,
    };
  }

  if (status === "In Progress" || cleanId === "job-2" || cleanId === "job-9") {
    return {
      ...IN_PROGRESS_JOB_DETAIL_DATA,
      id: cleanId,
      jobId: pipelineJob?.jobId || "#JOB12458",
      title: pipelineJob?.service.replace(/\.+$/, "") || IN_PROGRESS_JOB_DETAIL_DATA.title,
    };
  }

  if (status === "Scheduled" || cleanId === "job-1") {
    return {
      ...SCHEDULED_JOB_DETAIL_DATA,
      id: cleanId,
      jobId: pipelineJob?.jobId || "#JOB12458",
      title: pipelineJob?.service.replace(/\.+$/, "") || SCHEDULED_JOB_DETAIL_DATA.title,
    };
  }

  // Fallback default
  return {
    ...DEFAULT_JOB_DETAIL_DATA,
    id: cleanId,
    jobId: pipelineJob?.jobId || `#${cleanId.toUpperCase()}`,
  };
}
