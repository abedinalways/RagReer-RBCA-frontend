export type TravelStage =
  | "traveling"
  | "onsite"
  | "break"
  | "continue_break";

export const VALID_TRAVEL_STAGES: readonly TravelStage[] = [
  "traveling",
  "onsite",
  "break",
  "continue_break",
] as const;

export type UserCrewRole = "CREW_LEADER" | "CREW_MEMBER";

export type ModalStep =
  | "none"
  | "travel_completed"
  | "assign_tasks_prompt"
  | "assign_tasks_form"
  | "success";

export interface TaskAssignmentItem {
  id: string;
  taskTitle: string;
  assignedMember: string;
}

export interface TravelEntryDetails {
  id: string;
  title: string;
  address: string;
  dateFormatted: string;
  startTime: string;
  duration: string;
  status: "Running" | "Completed" | "Pending";
}
