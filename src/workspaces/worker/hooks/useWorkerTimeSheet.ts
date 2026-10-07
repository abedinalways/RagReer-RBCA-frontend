import { useState } from "react";
import {
  MOCK_TIME_SHEET_DATA,
  TimeSheetPeriodData,
} from "../data/mockWorkerTimeSheet";

export interface PeriodOption {
  value: string;
  label: string;
}

export const PERIOD_OPTIONS: PeriodOption[] = [
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
  { value: "year", label: "Year" },
  { value: "day", label: "Day" },
];

export function useWorkerTimeSheet(initialPeriod: string = "week") {
  const [selectedPeriod, setSelectedPeriod] = useState<string>(initialPeriod);

  const currentData: TimeSheetPeriodData =
    MOCK_TIME_SHEET_DATA[selectedPeriod] || MOCK_TIME_SHEET_DATA.week;

  return {
    selectedPeriod,
    setSelectedPeriod,
    periodOptions: PERIOD_OPTIONS,
    currentData,
  };
}
