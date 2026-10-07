"use client";

import { EquipmentPair } from "./types";
import { INITIAL_EQUIPMENT_PAIRS } from "./mockEvidenceData";

interface EvidenceEquipmentSectionProps {
  pairs?: EquipmentPair[];
  equipmentChecked: Record<string, boolean>;
  onToggleEquipment: (name: string) => void;
}

export function EvidenceEquipmentSection({
  pairs = INITIAL_EQUIPMENT_PAIRS,
  equipmentChecked,
  onToggleEquipment,
}: EvidenceEquipmentSectionProps) {
  return (
    <section className="space-y-2">
      <h3 className="font-barlow text-base font-bold text-primary-heading">
        Equipment
      </h3>

      <div className="rounded-sm border border-border-input bg-card-bg divide-y divide-border shadow-2xs overflow-hidden">
        {pairs.map((pair, index) => (
          <div key={index} className="grid grid-cols-2 divide-x divide-border">
            {/* Left column */}
            <label
              onClick={() => onToggleEquipment(pair.left)}
              className="flex items-center gap-2.5 p-2.5 cursor-pointer select-none hover:bg-blue-50/40 transition-colors"
            >
              <div
                className={`h-4 w-4 rounded-xs border flex items-center justify-center transition-colors ${
                  equipmentChecked[pair.left]
                    ? "border-primary bg-card-bg text-primary"
                    : "border-border-input bg-card-bg"
                }`}
              >
                {equipmentChecked[pair.left] && (
                  <svg
                    className="h-3 w-3 stroke-[2.5]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
              <span className="text-xs font-normal text-secondary-subheading truncate">
                {pair.left}
              </span>
            </label>

            {/* Right column */}
            <label
              onClick={() => onToggleEquipment(pair.right)}
              className="flex items-center gap-2.5 p-2.5 cursor-pointer select-none hover:bg-blue-50/40 transition-colors"
            >
              <div
                className={`h-4 w-4 rounded-xs border flex items-center justify-center transition-colors ${
                  equipmentChecked[pair.right]
                    ? "border-primary bg-card-bg text-primary"
                    : "border-border-input bg-card-bg"
                }`}
              >
                {equipmentChecked[pair.right] && (
                  <svg
                    className="h-3 w-3 stroke-[2.5]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
              <span className="text-xs font-normal text-secondary-subheading truncate">
                {pair.right}
              </span>
            </label>
          </div>
        ))}
      </div>
    </section>
  );
}
