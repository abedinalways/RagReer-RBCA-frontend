"use client";

import { useWorkerTimeSheet } from "../hooks/useWorkerTimeSheet";
import {
  TimeSheetHeader,
  TimeSheetPeriodSelector,
  TotalHoursCard,
  WorkTimeBreakdownCards,
  DailyEntriesSection,
} from "./timesheet";

export function WorkerTimeSheetView() {
  const { selectedPeriod, setSelectedPeriod, periodOptions, currentData } =
    useWorkerTimeSheet("week");

  return (
    <div className="w-full max-w-md mx-auto space-y-4">

      <TimeSheetHeader />

      <TimeSheetPeriodSelector
        selectedPeriod={selectedPeriod}
        periodOptions={periodOptions}
        onPeriodChange={setSelectedPeriod}
      />

      <TotalHoursCard
        periodLabel={currentData.periodLabel}
        totalHours={currentData.totalHours}
        regularPercentage={currentData.regularPercentage}
        overtimePercentage={currentData.overtimePercentage}
      />

      <WorkTimeBreakdownCards
        regularTime={currentData.regularTime}
        overTime={currentData.overTime}
        trend={currentData.trend}
        trendType={currentData.trendType}
      />

      <DailyEntriesSection
        entries={currentData.dailyEntries}
        entriesCountText={currentData.entriesCountText}
      />
    </div>
  );
}
