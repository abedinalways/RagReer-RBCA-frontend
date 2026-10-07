"use client";

import { ServiceItem } from "./types";

interface EvidenceServicesSectionProps {
  services: ServiceItem[];
  onToggleService: (id: string) => void;
}

export function EvidenceServicesSection({
  services,
  onToggleService,
}: EvidenceServicesSectionProps) {
  return (
    <section className="space-y-2">
      <h3 className="font-barlow text-base font-bold text-primary-heading">
        Services completed
      </h3>

      <div className="rounded-sm border border-border-input bg-card-bg divide-y divide-border shadow-2xs">
        {services.map((item) => (
          <label
            key={item.id}
            onClick={() => onToggleService(item.id)}
            className="flex items-center gap-2.5 p-3 cursor-pointer select-none hover:bg-blue-50/40 transition-colors"
          >
            <div
              className={`h-4 w-4 rounded-xs border flex items-center justify-center transition-colors ${
                item.checked
                  ? "border-primary bg-card-bg text-primary"
                  : "border-border-input bg-card-bg"
              }`}
            >
              {item.checked && (
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
            <span className="text-xs font-normal text-secondary-subheading">
              {item.label}
            </span>
          </label>
        ))}
      </div>
    </section>
  );
}
