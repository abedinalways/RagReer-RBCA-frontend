"use client";

import { Check } from "lucide-react";
import { TravelStage } from "./types";

interface TimeEntryStatusPillsProps {
  currentStage: TravelStage;
  onSelectStage?: (stage: TravelStage) => void;
}

interface StageConfig {
  id: TravelStage;
  label: string;
  order: number;
}

const STAGES: StageConfig[] = [
  { id: "traveling", label: "Traveling", order: 1 },
  { id: "onsite", label: "On-site Work", order: 2 },
  { id: "break", label: "Break", order: 3 },
  { id: "continue_break", label: "Continue After Break", order: 4 },
];

export function TimeEntryStatusPills({
  currentStage,
  onSelectStage,
}: TimeEntryStatusPillsProps) {
  const currentOrder =
    STAGES.find((s) => s.id === currentStage)?.order || 1;

  return (
    <div className="flex flex-wrap items-center gap-2 pt-1">
      {STAGES.map((stage) => {
        const isCurrent = stage.id === currentStage;
        const isPast = stage.order < currentOrder;

        // Visual styles matching Figma tokens
        let pillClass =
          "bg-card-bg text-secondary-subheading border border-border-input font-medium hover:border-primary/50 hover:bg-blue-50/40";
        let iconClass = "text-secondary-subheading/60 stroke-[2]";

        if (isCurrent) {
          pillClass =
            "bg-blue-50 text-primary border border-blue-100 font-semibold shadow-2xs";
          iconClass = "text-primary stroke-[2.5]";
        } else if (isPast) {
          // Completed prior stages show solid primary
          pillClass =
            "bg-primary text-primary-text border border-primary-hover font-semibold shadow-2xs";
          iconClass = "text-primary-text stroke-[2.5]";
        }

        return (
          <button
            key={stage.id}
            type="button"
            onClick={() => onSelectStage?.(stage.id)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs transition-all cursor-pointer select-none active:scale-95 ${pillClass}`}
          >
            <Check className={`h-3.5 w-3.5 ${iconClass}`} />
            <span>{stage.label}</span>
          </button>
        );
      })}
    </div>
  );
}
