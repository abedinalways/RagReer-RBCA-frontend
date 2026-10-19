import {
  JobPipelineItem,
  JobPipelineKPI,
  JobPipelineStatus,
  JobStatusStyle,
  JobPipelineActionOption,
  JobCrewMember,
} from "../types/jobPipelineTypes";

export const INITIAL_JOB_PIPELINE_KPIS: JobPipelineKPI = {
  todaysJobs: 12,
  inProgress: 6,
  awaitingReview: 2,
  qualityIssue: 1,
  fieldHoursLogged: "02:45 hr",
};

export const JOB_STATUS_STYLES: Record<JobPipelineStatus, JobStatusStyle> = {
  Scheduled: {
    badgeBg: "bg-blue-50",
    badgeText: "text-info",
    badgeBorder: "border-blue-100",
    dotBg: "bg-info",
    label: "Scheduled",
  },
  "In Progress": {
    badgeBg: "bg-blue-50",
    badgeText: "text-info",
    badgeBorder: "border-blue-100",
    dotBg: "bg-info",
    label: "In Progress",
  },
  "Awaiting Review": {
    badgeBg: "bg-terms-bg",
    badgeText: "text-badge-pending-text",
    badgeBorder: "border-terms-border",
    dotBg: "bg-badge-pending-dot",
    label: "Awaiting Review",
  },
  Completed: {
    badgeBg: "bg-badge-active-bg",
    badgeText: "text-badge-active-text",
    badgeBorder: "border-badge-active-border",
    dotBg: "bg-badge-active-dot",
    label: "Completed",
  },
  "Quality Issue": {
    badgeBg: "bg-decline-secondary",
    badgeText: "text-decline",
    badgeBorder: "border-decline-border",
    dotBg: "bg-decline",
    label: "Quality Issue",
  },
  "Invoice Sent": {
    badgeBg: "bg-terms-bg",
    badgeText: "text-badge-pending-text",
    badgeBorder: "border-terms-border",
    dotBg: "bg-badge-pending-dot",
    label: "Invoice Sent",
  },
  Paid: {
    badgeBg: "bg-badge-active-bg",
    badgeText: "text-badge-active-text",
    badgeBorder: "border-badge-active-border",
    dotBg: "bg-badge-active-dot",
    label: "Paid",
  },
  "On Hold": {
    badgeBg: "bg-terms-bg",
    badgeText: "text-flagged-amber",
    badgeBorder: "border-flagged-amber/50",
    dotBg: "bg-flagged-amber",
    label: "On Hold",
  },
};

const SAMPLE_CREW: JobCrewMember[] = [
  {
    id: "crew-1",
    name: "Marcus Vance",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face",
  },
  {
    id: "crew-2",
    name: "Elena Rostova",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
  },
  {
    id: "crew-3",
    name: "David Kim",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
  },
];

const WEATHERLY_AVATAR = "/images/logo.png";
const OLIVER_AVATAR = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face";
const ETHAN_AVATAR = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face";
const NOAH_AVATAR = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face";
const AVA_AVATAR = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face";

export const INITIAL_JOB_PIPELINE_DATA: JobPipelineItem[] = [
  {
    id: "job-1",
    jobId: "#JOB14588",
    customer: {
      name: "Weatherly Proper...",
      email: "weatherly@gmail.com",
      avatar: WEATHERLY_AVATAR,
    },
    propertyAddress: "452 Maple Drive",
    service: "Landscape & Property Maintena...",
    serviceType: "Recurring, Monthly",
    assignedCrew: SAMPLE_CREW,
    taskCompleted: "0/5",
    status: "Scheduled",
    dateCategory: "Today",
  },
  {
    id: "job-2",
    jobId: "#JOB14588",
    customer: {
      name: "Oliver Davis",
      email: "oliver.davis@icloud.com",
      avatar: OLIVER_AVATAR,
    },
    propertyAddress: "678 Aspen Road",
    service: "Residential Lawn Care",
    serviceType: "Recurring, Monthly",
    assignedCrew: SAMPLE_CREW,
    taskCompleted: "0/5",
    status: "In Progress",
    dateCategory: "Today",
  },
  {
    id: "job-3",
    jobId: "#JOB14588",
    customer: {
      name: "Weatherly Proper...",
      email: "weatherly@gmail.com",
      avatar: WEATHERLY_AVATAR,
    },
    propertyAddress: "502 Willow Street",
    service: "Commercial Services",
    serviceType: "Recurring, Monthly",
    assignedCrew: SAMPLE_CREW,
    taskCompleted: "0/5",
    status: "Awaiting Review",
    dateCategory: "Today",
  },
  {
    id: "job-4",
    jobId: "#JOB14588",
    customer: {
      name: "Ethan Brooks",
      email: "ethan.brooks@gmail.com",
      avatar: ETHAN_AVATAR,
    },
    propertyAddress: "985 Cedar Avenue",
    service: "Landscape & Property Maintenance",
    serviceType: "Recurring, Monthly",
    assignedCrew: SAMPLE_CREW,
    taskCompleted: "5/5",
    status: "Completed",
    dateCategory: "Today",
  },
  {
    id: "job-5",
    jobId: "#JOB14588",
    customer: {
      name: "Weatherly Proper...",
      email: "weatherly@gmail.com",
      avatar: WEATHERLY_AVATAR,
    },
    propertyAddress: "129 Redwood Drive",
    service: "Residential Lawn Care",
    serviceType: "Recurring, Monthly",
    assignedCrew: SAMPLE_CREW,
    taskCompleted: "5/5",
    status: "Quality Issue",
    dateCategory: "Today",
  },
  {
    id: "job-6",
    jobId: "#JOB14588",
    customer: {
      name: "Noah Smith",
      email: "noah.smith@gmail.com",
      avatar: NOAH_AVATAR,
    },
    propertyAddress: "17 Elm Drive",
    service: "Photography & Videography",
    serviceType: "Recurring, Monthly",
    assignedCrew: SAMPLE_CREW,
    taskCompleted: "5/5",
    status: "Invoice Sent",
    dateCategory: "Today",
  },
  {
    id: "job-7",
    jobId: "#JOB14588",
    customer: {
      name: "Weatherly Proper...",
      email: "weatherly@gmail.com",
      avatar: WEATHERLY_AVATAR,
    },
    propertyAddress: "44 Birch Road",
    service: "Commercial Services",
    serviceType: "Recurring, Monthly",
    assignedCrew: SAMPLE_CREW,
    taskCompleted: "5/5",
    status: "Paid",
    dateCategory: "Today",
  },
  {
    id: "job-8",
    jobId: "#JOB14588",
    customer: {
      name: "Ava Martinez",
      email: "ava.martinez@gmail.com",
      avatar: AVA_AVATAR,
    },
    propertyAddress: "890 Poplar Lane",
    service: "Residential Lawn Care",
    serviceType: "Recurring, Monthly",
    assignedCrew: SAMPLE_CREW,
    taskCompleted: "0/5",
    status: "On Hold",
    dateCategory: "Today",
  },
  {
    id: "job-9",
    jobId: "#JOB14588",
    customer: {
      name: "Oliver Davis",
      email: "oliver.davis@icloud.com",
      avatar: OLIVER_AVATAR,
    },
    propertyAddress: "678 Aspen Road",
    service: "Landscape & Property Maintenance",
    serviceType: "Recurring, Monthly",
    assignedCrew: SAMPLE_CREW,
    taskCompleted: "2/5",
    status: "In Progress",
    dateCategory: "Today",
  },
  {
    id: "job-10",
    jobId: "#JOB14588",
    customer: {
      name: "Weatherly Proper...",
      email: "weatherly@gmail.com",
      avatar: WEATHERLY_AVATAR,
    },
    propertyAddress: "678 Aspen Road",
    service: "Residential Lawn Care",
    serviceType: "Recurring, Monthly",
    assignedCrew: SAMPLE_CREW,
    taskCompleted: "4/5",
    status: "In Progress",
    dateCategory: "Today",
  },
  {
    id: "job-11",
    jobId: "#JOB14588",
    customer: {
      name: "Oliver Davis",
      email: "oliver.davis@icloud.com",
      avatar: OLIVER_AVATAR,
    },
    propertyAddress: "678 Aspen Road",
    service: "DJ & Event Services",
    serviceType: "Recurring, Monthly",
    assignedCrew: SAMPLE_CREW,
    taskCompleted: "1/5",
    status: "In Progress",
    dateCategory: "Today",
  },
  {
    id: "job-12",
    jobId: "#JOB14588",
    customer: {
      name: "Weatherly Proper...",
      email: "weatherly@gmail.com",
      avatar: WEATHERLY_AVATAR,
    },
    propertyAddress: "678 Aspen Road",
    service: "Residential Lawn Care",
    serviceType: "Recurring, Monthly",
    assignedCrew: SAMPLE_CREW,
    taskCompleted: "1/5",
    status: "In Progress",
    dateCategory: "Today",
  },
  {
    id: "job-13",
    jobId: "#JOB14588",
    customer: {
      name: "Oliver Davis",
      email: "oliver.davis@icloud.com",
      avatar: OLIVER_AVATAR,
    },
    propertyAddress: "678 Aspen Road",
    service: "Commercial Services",
    serviceType: "Recurring, Monthly",
    assignedCrew: SAMPLE_CREW,
    taskCompleted: "3/5",
    status: "In Progress",
    dateCategory: "Today",
  },
  {
    id: "job-14",
    jobId: "#JOB14589",
    customer: {
      name: "Ethan Brooks",
      email: "ethan.brooks@gmail.com",
      avatar: ETHAN_AVATAR,
    },
    propertyAddress: "312 Cypress Way",
    service: "Residential Lawn Care",
    serviceType: "Weekly",
    assignedCrew: SAMPLE_CREW,
    taskCompleted: "0/4",
    status: "Scheduled",
    dateCategory: "This Week",
  },
  {
    id: "job-15",
    jobId: "#JOB14590",
    customer: {
      name: "Noah Smith",
      email: "noah.smith@gmail.com",
      avatar: NOAH_AVATAR,
    },
    propertyAddress: "77 Magnolia Court",
    service: "Commercial Services",
    serviceType: "Bi-weekly",
    assignedCrew: SAMPLE_CREW,
    taskCompleted: "4/4",
    status: "Completed",
    dateCategory: "This Week",
  },
];

export const FILTER_SERVICES = [
  "All Service",
  "Landscape & Property Maintenance",
  "Residential Lawn Care",
  "Commercial Services",
  "Photography & Videography",
  "DJ & Event Services",
];

export const FILTER_SERVICE_TYPES = [
  "All Service types",
  "Recurring, Monthly",
  "One-time",
  "Weekly",
  "Bi-weekly",
];

export const FILTER_STATUSES: (string | JobPipelineStatus)[] = [
  "All Status",
  "Scheduled",
  "In Progress",
  "Awaiting Review",
  "Completed",
  "Quality Issue",
  "Invoice Sent",
  "Paid",
  "On Hold",
];

export const FILTER_DATE_RANGES = [
  "Today",
  "Yesterday",
  "This Week",
  "This Month",
  "All Time",
];

export function getJobActionOptions(status: JobPipelineStatus): JobPipelineActionOption[] {
  switch (status) {
    case "Scheduled":
      return [
        { label: "View Job Details", actionKey: "view_details", isPrimary: true },
        { label: "Edit Crew/Equipment", actionKey: "edit_crew_equipment" },
        { label: "Mark as Complete", actionKey: "mark_as_complete" },
      ];

    case "In Progress":
      return [
        { label: "View Job Details", actionKey: "view_details", isPrimary: true },
        { label: "Edit Crew/Equipment", actionKey: "edit_crew_equipment" },
        { label: "Mark as Complete", actionKey: "mark_as_complete" },
      ];

    case "Awaiting Review":
      return [
        { label: "View Job Details", actionKey: "view_details", isPrimary: true },
        { label: "Review Tasks", actionKey: "review_tasks" },
        { label: "Approve & Complete", actionKey: "approve_complete" },
      ];

    case "Quality Issue":
      return [
        { label: "View Job Details", actionKey: "view_details", isPrimary: true },
        { label: "Inspect Issue", actionKey: "inspect_issue" },
        { label: "Reassign Crew", actionKey: "reassign_crew" },
      ];

    case "Completed":
      return [
        { label: "View Job Details", actionKey: "view_details", isPrimary: true },
        { label: "View Invoice", actionKey: "view_invoice" },
        { label: "Archive Job", actionKey: "archive_job" },
      ];

    case "Invoice Sent":
      return [
        { label: "View Job Details", actionKey: "view_details", isPrimary: true },
        { label: "View Invoice", actionKey: "view_invoice" },
        { label: "Send Reminder", actionKey: "send_reminder" },
      ];

    case "Paid":
      return [
        { label: "View Job Details", actionKey: "view_details", isPrimary: true },
        { label: "View Invoice", actionKey: "view_invoice" },
        { label: "Download Receipt", actionKey: "download_receipt" },
      ];

    case "On Hold":
      return [
        { label: "View Job Details", actionKey: "view_details", isPrimary: true },
        { label: "Resume Job", actionKey: "resume_job" },
        { label: "Cancel Job", actionKey: "cancel_job" },
      ];

    default:
      return [
        { label: "View Job Details", actionKey: "view_details", isPrimary: true },
        { label: "Edit Crew/Equipment", actionKey: "edit_crew_equipment" },
        { label: "Mark as Complete", actionKey: "mark_as_complete" },
      ];
  }
}
