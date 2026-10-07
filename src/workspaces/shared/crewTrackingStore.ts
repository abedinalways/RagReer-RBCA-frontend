"use client";

import { useState, useEffect } from "react";

export type CrewWorkStatus =
  | "Traveling"
  | "On-site Working"
  | "On Break"
  | "Work Completed";

export interface CrewMemberTaskStatus {
  id: string;
  name: string;
  role: "Crew Leader" | "Crew Member";
  avatarUrl: string;
  assignedTask: string;
  status: CrewWorkStatus;
  progressPercent: number;
  timeElapsed: string;
  lastUpdated: string;
  jobAddress: string;
}

const STORAGE_KEY = "raggreer_crew_task_tracking_v1";

export const INITIAL_CREW_STATUSES: CrewMemberTaskStatus[] = [
  {
    id: "crew-1",
    name: "James Wilson",
    role: "Crew Leader",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120",
    assignedTask: "Site Inspection & Quality Oversight",
    status: "On-site Working",
    progressPercent: 75,
    timeElapsed: "01:32:34 h",
    lastUpdated: "Just now",
    jobAddress: "100 Whispering Pines Blvd at Hwy 43",
  },
  {
    id: "crew-2",
    name: "David Edison",
    role: "Crew Member",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120",
    assignedTask: "Overgrown plants trimmed",
    status: "On-site Working",
    progressPercent: 65,
    timeElapsed: "01:32:34 h",
    lastUpdated: "2 mins ago",
    jobAddress: "100 Whispering Pines Blvd at Hwy 43",
  },
  {
    id: "crew-3",
    name: "Alex Morgan",
    role: "Crew Member",
    avatarUrl:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=120",
    assignedTask: "Garden waste removed & Mulching",
    status: "Traveling",
    progressPercent: 25,
    timeElapsed: "00:25:00 h",
    lastUpdated: "5 mins ago",
    jobAddress: "100 Whispering Pines Blvd at Hwy 43",
  },
  {
    id: "crew-4",
    name: "Robert Chen",
    role: "Crew Member",
    avatarUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120",
    assignedTask: "Hedge Shaping & Lawn Edging",
    status: "On Break",
    progressPercent: 45,
    timeElapsed: "00:28:34 h",
    lastUpdated: "12 mins ago",
    jobAddress: "100 Whispering Pines Blvd at Hwy 43",
  },
];

export function getStoredCrewStatuses(): CrewMemberTaskStatus[] {
  if (typeof window === "undefined") return INITIAL_CREW_STATUSES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_CREW_STATUSES;
    return JSON.parse(raw);
  } catch {
    return INITIAL_CREW_STATUSES;
  }
}

export function updateStoredCrewMemberStatus(
  memberId: string,
  updates: Partial<CrewMemberTaskStatus>
) {
  if (typeof window === "undefined") return;
  const current = getStoredCrewStatuses();
  const next = current.map((item) =>
    item.id === memberId
      ? { ...item, ...updates, lastUpdated: "Just now" }
      : item
  );
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event("crew-tracking-updated"));
  } catch (err) {
    console.error("Failed to store crew tracking updates", err);
  }
}

export function useCrewTaskTracking() {
  const [crewList, setCrewList] = useState<CrewMemberTaskStatus[]>(INITIAL_CREW_STATUSES);

  useEffect(() => {
    setCrewList(getStoredCrewStatuses());

    const handleUpdate = () => {
      setCrewList(getStoredCrewStatuses());
    };

    window.addEventListener("crew-tracking-updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("crew-tracking-updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const updateStatus = (
    memberId: string,
    updates: Partial<CrewMemberTaskStatus>
  ) => {
    updateStoredCrewMemberStatus(memberId, updates);
  };

  return { crewList, updateStatus };
}
