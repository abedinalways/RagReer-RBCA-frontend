"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ModalStep, TaskAssignmentItem, TravelStage, UserCrewRole, VALID_TRAVEL_STAGES } from "./types";
import { useIsTeamLeader } from "../../../hooks/useIsTeamLeader";
import { updateStoredCrewMemberStatus } from "@/workspaces/shared/crewTrackingStore";
import { useTabQueryState } from "@/hooks/useTabQueryState";

export function useTimeTravelFlow(initialJobId: string = "entry-2") {
  const router = useRouter();
  const defaultIsLeader = useIsTeamLeader();

  const [role, setRole] = useState<UserCrewRole>(
    defaultIsLeader ? "CREW_LEADER" : "CREW_MEMBER"
  );

  // Synchronized with URL query param `?stage=...` (refresh persistent!)
  const [currentStage, setCurrentStage] = useTabQueryState<TravelStage>(
    "stage",
    "traveling",
    VALID_TRAVEL_STAGES
  );

  const [isFullscreenMapOpen, setIsFullscreenMapOpen] = useState(false);
  const [modalStep, setModalStep] = useState<ModalStep>("none");
  const [assignedTasks, setAssignedTasks] = useState<TaskAssignmentItem[]>([]);

  // Working & Timer State
  const [isOnsiteStarted, setIsOnsiteStarted] = useState<boolean>(true);
  const [isClockRunning, setIsClockRunning] = useState<boolean>(true);
  const [secondsElapsed, setSecondsElapsed] = useState<number>(5554); // 01:32:34 h
  const [breakSeconds, setBreakSeconds] = useState<number>(0);

  // Live timer interval
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isClockRunning && (currentStage === "onsite" || currentStage === "continue_break")) {
      interval = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    } else if (isClockRunning && currentStage === "break") {
      interval = setInterval(() => {
        setBreakSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isClockRunning, currentStage]);

  // Sync to Admin tracking whenever stage changes
  useEffect(() => {
    const memberId = role === "CREW_LEADER" ? "crew-1" : "crew-2";
    if (currentStage === "traveling") {
      updateStoredCrewMemberStatus(memberId, {
        status: "Traveling",
        progressPercent: 25,
        timeElapsed: "00:25:00 h",
      });
    } else if (currentStage === "onsite" || currentStage === "continue_break") {
      updateStoredCrewMemberStatus(memberId, {
        status: "On-site Working",
        progressPercent: 75,
        timeElapsed: "01:32:34 h",
      });
    } else if (currentStage === "break") {
      updateStoredCrewMemberStatus(memberId, {
        status: "On Break",
        progressPercent: 50,
        timeElapsed: "00:28:34 h",
      });
    }
  }, [currentStage, role]);

  // Format seconds to "HH:MM:SS h"
  const formatTimeClock = (sec: number) => {
    const hours = Math.floor(sec / 3600);
    const minutes = Math.floor((sec % 3600) / 60);
    const seconds = sec % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")} h`;
  };

  // Toggle role for interactive testing between Crew Leader & Crew Member
  const toggleRole = useCallback(() => {
    setRole((prev) => {
      const nextRole = prev === "CREW_LEADER" ? "CREW_MEMBER" : "CREW_LEADER";
      toast.success(
        nextRole === "CREW_LEADER"
          ? "Switched to Crew Leader mode"
          : "Switched to Crew Member mode",
        { id: "role-switch" }
      );
      return nextRole;
    });
  }, []);

  // Back button handler
  const handleBack = useCallback(() => {
    if (modalStep !== "none") {
      setModalStep("none");
      return;
    }
    if (isFullscreenMapOpen) {
      setIsFullscreenMapOpen(false);
      return;
    }
    // If we're past traveling, going back can return to previous stage or /worker/time
    if (currentStage === "continue_break") {
      setCurrentStage("break");
      return;
    }
    if (currentStage === "break") {
      setCurrentStage("onsite");
      return;
    }
    if (currentStage === "onsite") {
      setCurrentStage("traveling");
      return;
    }
    router.push("/worker/time");
  }, [modalStep, isFullscreenMapOpen, currentStage, setCurrentStage, router]);

  // Open & Close Fullscreen Map (Image 2)
  const openFullscreenMap = useCallback(() => {
    setIsFullscreenMapOpen(true);
  }, []);

  const closeFullscreenMap = useCallback(() => {
    setIsFullscreenMapOpen(false);
  }, []);

  // Step 1: Open "Travel Completed" modal
  const handleOpenTravelCompletedModal = useCallback(() => {
    setModalStep("travel_completed");
  }, []);

  // Step 2: Confirm Travel Completed
  const handleConfirmTravelCompleted = useCallback(() => {
    if (role === "CREW_MEMBER") {
      // For Crew Member: Travel completed -> Back to Time page
      setModalStep("none");
      toast.success("Travel Completed! Returning to Time entries.");
      router.push("/worker/time");
    } else {
      // For Crew Leader: Proceed to Assign Tasks prompt
      setModalStep("assign_tasks_prompt");
    }
  }, [role, router]);

  // Step 3: From Prompt to Form
  const handleProceedToAssignTasksForm = useCallback(() => {
    setModalStep("assign_tasks_form");
  }, []);

  // Step 4: Submit Task Assignments -> Transitions to On-site Work (Ready to Start Working)
  const handleSubmitTaskAssignments = useCallback(
    (tasks: TaskAssignmentItem[]) => {
      setAssignedTasks(tasks);
      setModalStep("none");
      toast.success(`${tasks.length} tasks assigned! Ready to Start Working.`);
      // Move to on-site work stage!
      setCurrentStage("onsite");
      setIsOnsiteStarted(false);
      setSecondsElapsed(0);
    },
    []
  );

  // Stage: On-site Work Handlers
  const handleStartWork = useCallback(() => {
    setIsOnsiteStarted(true);
    setIsClockRunning(true);
    setSecondsElapsed(5554); // Jump to realistic in-progress time matching Image 3 (01:32:34 h)
    toast.success("On-site work session started!");
    const memberId = role === "CREW_LEADER" ? "crew-1" : "crew-2";
    updateStoredCrewMemberStatus(memberId, {
      status: "On-site Working",
      progressPercent: 65,
      timeElapsed: "01:32:34 h",
    });
  }, [role]);

  const handleStopWork = useCallback(() => {
    setIsClockRunning((prev) => !prev);
    toast(isClockRunning ? "Timer paused" : "Timer resumed", { icon: "⏱️" });
  }, [isClockRunning]);

  // Stage: Break Handlers
  const handleStartBreak = useCallback(() => {
    setCurrentStage("break");
    setIsClockRunning(true);
    setBreakSeconds(0);
    toast.success("Break started! Enjoy your break.");
    const memberId = role === "CREW_LEADER" ? "crew-1" : "crew-2";
    updateStoredCrewMemberStatus(memberId, {
      status: "On Break",
      progressPercent: 50,
      timeElapsed: "00:00:00 h",
    });
  }, [role]);

  // Stage: Continue Working Handlers
  const handleContinueWorking = useCallback(() => {
    setCurrentStage("continue_break");
    setIsClockRunning(true);
    toast.success("Resumed working after break!");
    const memberId = role === "CREW_LEADER" ? "crew-1" : "crew-2";
    updateStoredCrewMemberStatus(memberId, {
      status: "On-site Working",
      progressPercent: 85,
      timeElapsed: "01:32:34 h",
    });
  }, [role]);

  // Crucial User Requirement: Work Completion Navigation
  // "Crew member will navigate to home after work completion"
  // "Leader will navigate to evidance submit screen after work completion."
  const handleWorkCompleted = useCallback(() => {
    setIsClockRunning(false);
    const memberId = role === "CREW_LEADER" ? "crew-1" : "crew-2";
    updateStoredCrewMemberStatus(memberId, {
      status: "Work Completed",
      progressPercent: 100,
      timeElapsed: formatTimeClock(secondsElapsed),
    });

    if (role === "CREW_MEMBER") {
      toast.success("Work completed successfully! Navigating to Home...");
      setTimeout(() => {
        router.push("/worker/home");
      }, 500);
    } else {
      toast.success("Work completed! Proceeding to Evidence Submission...");
      setTimeout(() => {
        router.push(`/worker/time/${initialJobId}/evidence`);
      }, 500);
    }
  }, [role, secondsElapsed, initialJobId, router]);

  const closeModal = useCallback(() => {
    setModalStep("none");
  }, []);

  return {
    role,
    toggleRole,
    currentStage,
    setCurrentStage,
    isFullscreenMapOpen,
    openFullscreenMap,
    closeFullscreenMap,
    modalStep,
    assignedTasks,
    isOnsiteStarted,
    isClockRunning,
    secondsElapsed,
    formattedClock: formatTimeClock(secondsElapsed),
    formattedBreakClock: formatTimeClock(breakSeconds),
    handleBack,
    handleOpenTravelCompletedModal,
    handleConfirmTravelCompleted,
    handleProceedToAssignTasksForm,
    handleSubmitTaskAssignments,
    handleStartWork,
    handleStopWork,
    handleStartBreak,
    handleContinueWorking,
    handleWorkCompleted,
    closeModal,
  };
}
