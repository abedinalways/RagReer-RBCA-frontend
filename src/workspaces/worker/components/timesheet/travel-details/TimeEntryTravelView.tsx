"use client";

import { ChevronRight } from "lucide-react";
import { useTimeTravelFlow } from "./useTimeTravelFlow";
import { TimeEntryTravelHeader } from "./TimeEntryTravelHeader";
import { TimeEntryRouteMapCard } from "./TimeEntryRouteMapCard";
import { TimeEntryFullscreenMap } from "./TimeEntryFullscreenMap";
import { TimeEntryStatusPills } from "./TimeEntryStatusPills";
import { TimeEntryJourneyBanner } from "./TimeEntryJourneyBanner";
import { TimeEntryRecentCard, RecentEntryItem } from "./TimeEntryRecentCard";
import { TimeClockCard } from "./TimeClockCard";
import { WeekToDateCard } from "./WeekToDateCard";
import { TravelCompletedConfirmModal } from "./TravelCompletedConfirmModal";
import { AssignTasksPromptModal } from "./AssignTasksPromptModal";
import { AssignTasksFormModal } from "./AssignTasksFormModal";
import { getDailyTimeEntryById } from "../../../data/mockWorkerTimeSheet";

interface TimeEntryTravelViewProps {
  entryId?: string;
}

export function TimeEntryTravelView({ entryId = "entry-2" }: TimeEntryTravelViewProps) {
  const {
    role,
    toggleRole,
    currentStage,
    setCurrentStage,
    isFullscreenMapOpen,
    openFullscreenMap,
    closeFullscreenMap,
    modalStep,
    isOnsiteStarted,
    isClockRunning,
    formattedClock,
    formattedBreakClock,
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
  } = useTimeTravelFlow(entryId);

  const matchedEntry = getDailyTimeEntryById(entryId);

  const title = matchedEntry?.title || "North Entrance Monument & Islands";
  const address =
    matchedEntry?.address || "John Young Pkwy - 100 Whispering Pines Blvd";
  const dateFormatted = matchedEntry
    ? `${matchedEntry.month.slice(0, 3)} ${matchedEntry.day}`
    : "Aug 29";

  // Dynamic Header Title per Stage
  let headerTitle = "Traveling to the Site";
  if (currentStage === "onsite") {
    headerTitle = "Ready to Start Working";
  } else if (currentStage === "break") {
    headerTitle = "Ready for a Break?";
  } else if (currentStage === "continue_break") {
    headerTitle = "Ready to Get Back to Work?";
  }

  // Dynamic Recent Entries matching Images 1 to 5
  const getRecentEntries = (): RecentEntryItem[] => {
    if (currentStage === "traveling") {
      return [
        {
          id: "r-travel",
          title: "Traveling Time",
          duration: "0:25h",
          address: "John Young Pkwy - 100 Whisperi...",
          dateText: dateFormatted,
          timeText: "8:20AM -Running",
          status: "Running",
        },
      ];
    }

    if (currentStage === "onsite") {
      if (!isOnsiteStarted) {
        return [
          {
            id: "r-travel",
            title: "Traveling Time",
            duration: "0:25h",
            address: "John Young Pkwy - 100 Whisp...",
            dateText: dateFormatted,
            timeText: "8:20AM -Running",
            status: "Submited",
          },
        ];
      }

      // Image 3: Active Working
      return [
        {
          id: "r-onsite",
          title: "On-site Working",
          duration: formattedClock,
          address: "John Young Pkwy - 100 Whisper...",
          dateText: dateFormatted,
          timeText: "8:20AM -Running",
          status: isClockRunning ? "Running" : "Submited",
        },
        {
          id: "r-travel",
          title: "Traveling Time",
          duration: "0:25h",
          address: "John Young Pkwy - 100 Whisp...",
          dateText: dateFormatted,
          timeText: "8:20AM -Running",
          status: "Submited",
        },
      ];
    }

    if (currentStage === "break") {
      // Image 4: Ready for a Break
      return [
        {
          id: "r-onsite",
          title: "On-site Working",
          duration: "01:32:34h",
          address: "John Young Pkwy - 100 Whisp...",
          dateText: dateFormatted,
          timeText: "8:20AM -Running",
          status: "Submited",
        },
        {
          id: "r-travel",
          title: "Traveling Time",
          duration: "0:25h",
          address: "John Young Pkwy - 100 Whisp...",
          dateText: dateFormatted,
          timeText: "8:20AM -Running",
          status: "Submited",
        },
      ];
    }

    // Image 5: Continue After Break
    return [
      {
        id: "r-break",
        title: "1st Break",
        duration: "00:28:34 h",
        address: "John Young Pkwy - 100 Whisp...",
        dateText: dateFormatted,
        timeText: "8:20AM -Running",
        status: "Submited",
      },
      {
        id: "r-onsite",
        title: "On-site Working",
        duration: "01:32:34h",
        address: "John Young Pkwy - 100 Whisp...",
        dateText: dateFormatted,
        timeText: "8:20AM -Running",
        status: "Submited",
      },
      {
        id: "r-travel",
        title: "Traveling Time",
        duration: "0:25h",
        address: "John Young Pkwy - 100 Whisp...",
        dateText: dateFormatted,
        timeText: "8:20AM -Running",
        status: "Submited",
      },
    ];
  };

  return (
    <div className="flex flex-col min-h-screen bg-page-bg">
      {/* Sticky Top Header with Back Navigation and Title */}
      <TimeEntryTravelHeader
        title={headerTitle}
        onBack={handleBack}
        role={role}
        onToggleRole={toggleRole}
      />

      {/* Main Screen Content */}
      <main className="flex flex-col gap-3.5 p-4 max-w-md mx-auto w-full">
        {/* Stage 1: Traveling View Top Card (Satellite Map) */}
        {currentStage === "traveling" && (
          <TimeEntryRouteMapCard
            onOpenFullscreen={openFullscreenMap}
            destinationTitle={title}
            destinationAddress={address}
          />
        )}

        {/* Stage 2: On-site Work Clock Card */}
        {currentStage === "onsite" && (
          <TimeClockCard
            timeFormatted={isOnsiteStarted ? formattedClock : "00:00:00 h"}
            statusBadge="Running"
            subtitleNode={
              isOnsiteStarted ? (
                <span className="font-semibold text-primary-heading">Working</span>
              ) : (
                <span>
                  Start <strong className="font-semibold text-primary-heading">Working</strong>
                </span>
              )
            }
          />
        )}

        {/* Stage 3: Break Clock Card */}
        {currentStage === "break" && (
          <TimeClockCard
            timeFormatted={formattedBreakClock}
            statusBadge="Running"
            subtitleNode={
              <span>
                Start 1st <strong className="font-semibold text-primary-heading">Break</strong>
              </span>
            }
          />
        )}

        {/* Stage 4: Continue After Break Clock Card */}
        {currentStage === "continue_break" && (
          <TimeClockCard
            timeFormatted={isOnsiteStarted ? formattedClock : "00:00:00 h"}
            statusBadge="Running"
            subtitleNode={
              <span>
                Start <strong className="font-semibold text-primary-heading">Working After Break</strong>
              </span>
            }
          />
        )}

        {/* Stage Status Pills: Traveling / On-site Work / Break / Continue After Break */}
        <TimeEntryStatusPills
          currentStage={currentStage}
          onSelectStage={setCurrentStage}
        />

        {/* Dynamic Journey / Work Status Message */}
        {currentStage === "traveling" && (
          <TimeEntryJourneyBanner startTime="8:20 AM" statusText="in progress" />
        )}

        {(currentStage === "onsite" || currentStage === "continue_break") && (
          <p className="text-xs text-secondary-subheading font-normal leading-relaxed pt-0.5">
            I&apos;m <strong className="font-semibold text-txt-primary">currently working</strong> on the assigned{" "}
            <strong className="font-semibold text-txt-primary">task</strong> and will share an update once it&apos;s completed.
          </p>
        )}

        {currentStage === "break" && (
          <p className="text-xs text-secondary-subheading font-normal leading-relaxed pt-0.5">
            You have <strong className="font-semibold text-txt-primary">1 hour</strong> of break time available today. Take it once or split it into{" "}
            <strong className="font-semibold text-txt-primary">two breaks</strong> throughout your workday.
          </p>
        )}

        {/* Primary Action Buttons per Stage */}
        <div className="pt-0.5">
          {/* Stage 1: Traveling CTA */}
          {currentStage === "traveling" && (
            <button
              type="button"
              onClick={handleOpenTravelCompletedModal}
              className="w-full flex items-center justify-center gap-1.5 py-3 px-4 rounded-md bg-primary hover:bg-primary-hover text-primary-text font-medium text-sm transition-all shadow-sm cursor-pointer active:scale-[0.99]"
            >
              <span>Travel Completed</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          )}

          {/* Stage 2: On-site Work CTAs */}
          {currentStage === "onsite" && !isOnsiteStarted && (
            <button
              type="button"
              onClick={handleStartWork}
              className="w-full flex items-center justify-center gap-1.5 py-3 px-4 rounded-md bg-primary hover:bg-primary-hover text-primary-text font-medium text-sm transition-all shadow-sm cursor-pointer active:scale-[0.99]"
            >
              <span>Start Work</span>
            </button>
          )}

          {currentStage === "onsite" && isOnsiteStarted && (
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={handleStopWork}
                className="w-full py-2.5 px-4 rounded-md border border-border-input bg-card-bg hover:bg-blue-50/40 text-primary-heading font-medium text-sm transition-all shadow-2xs cursor-pointer active:scale-[0.99]"
              >
                {isClockRunning ? "Stop" : "Resume"}
              </button>

              <button
                type="button"
                onClick={handleWorkCompleted}
                className="w-full flex items-center justify-center gap-1.5 py-3 px-4 rounded-md bg-primary hover:bg-primary-hover text-primary-text font-medium text-sm transition-all shadow-sm cursor-pointer active:scale-[0.99]"
              >
                <span>Work Completed</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Stage 3: Break CTA */}
          {currentStage === "break" && (
            <button
              type="button"
              onClick={handleStartBreak}
              className="w-full flex items-center justify-center gap-1.5 py-3 px-4 rounded-md bg-primary hover:bg-primary-hover text-primary-text font-medium text-sm transition-all shadow-sm cursor-pointer active:scale-[0.99]"
            >
              <span>Start Break</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          )}

          {/* Stage 4: Continue After Break CTA */}
          {currentStage === "continue_break" && (
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={handleContinueWorking}
                className="w-full flex items-center justify-center gap-1.5 py-3 px-4 rounded-md bg-primary hover:bg-primary-hover text-primary-text font-medium text-sm transition-all shadow-sm cursor-pointer active:scale-[0.99]"
              >
                <span>Continue Working</span>
              </button>

              <button
                type="button"
                onClick={handleWorkCompleted}
                className="w-full flex items-center justify-center gap-1.5 py-3 px-4 rounded-md bg-primary hover:bg-primary-hover text-primary-text font-medium text-sm transition-all shadow-sm cursor-pointer active:scale-[0.99]"
              >
                <span>Work Completed</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Week to Date Progress (Images 2, 3, 4, 5) */}
        {currentStage !== "traveling" && (
          <WeekToDateCard currentHours={34.5} totalTargetHours={40} />
        )}

        {/* Dynamic Recent entries list */}
        <TimeEntryRecentCard entries={getRecentEntries()} />
      </main>

      {/* Screen 2: Fullscreen Satellite Route Map */}
      <TimeEntryFullscreenMap
        isOpen={isFullscreenMapOpen}
        onClose={closeFullscreenMap}
        destinationTitle={title}
        destinationAddress={address}
      />

      {/* Screen 3: Travel Completed Confirmation Modal */}
      <TravelCompletedConfirmModal
        isOpen={modalStep === "travel_completed"}
        onClose={closeModal}
        onConfirm={handleConfirmTravelCompleted}
      />

      {/* Screen 4: Assign Tasks Prompt Modal (Leader only) */}
      <AssignTasksPromptModal
        isOpen={modalStep === "assign_tasks_prompt"}
        onClose={closeModal}
        onProceed={handleProceedToAssignTasksForm}
      />

      {/* Screen 5: Assign Tasks Dynamic Form Modal (Leader only) */}
      <AssignTasksFormModal
        isOpen={modalStep === "assign_tasks_form"}
        onClose={closeModal}
        onSubmit={handleSubmitTaskAssignments}
      />
    </div>
  );
}
