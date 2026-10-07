import { TaskAssignmentItem } from "./types";

export const AVAILABLE_TASKS = [
  "Overgrown plants trimmed",
  "Garden waste removed",
  "Lawn mowing and edge trimming",
  "Hedge shaping and pruning",
  "Irrigation sprinkler inspection",
  "Yard cleanup and debris removal",
];

export const CREW_MEMBERS = [
  "David Edison",
  "James Wilson",
  "Alex Morgan",
  "Robert Chen",
  "Sarah Jenkins",
];

export const INITIAL_TASKS: TaskAssignmentItem[] = [
  {
    id: "task-1",
    taskTitle: "Overgrown plants trimmed",
    assignedMember: "David Edison",
  },
  {
    id: "task-2",
    taskTitle: "Garden waste removed",
    assignedMember: "David Edison",
  },
];
