import { SectionHeader } from "./SectionHeader";

export interface JobProcessStepsCardProps {
  steps?: string[];
}

const DEFAULT_STEPS: string[] = [
  "Initial Yard Assessment",
  "Leaf & Debris Removal",
  "Lawn Mowing & Trimming",
  "Bed Edging",
  "Hedge & Shrub Trimming",
  "Ornamental Grass Trimming",
  "Debris Cleanup & Blowing",
  "Fresh Mulch Application",
];

export function JobProcessStepsCard({
  steps = DEFAULT_STEPS,
}: JobProcessStepsCardProps) {
  return (
    <section className="space-y-2">
      {/* Section Header with Process/Flow icon */}
      <SectionHeader
        icon={
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="5" cy="6" r="2.5" />
            <path d="M5 8.5v7" />
            <circle cx="5" cy="18" r="2.5" />
            <path d="M7.5 6h8a3 3 0 0 1 3 3v2" />
            <circle cx="18.5" cy="15" r="2.5" />
          </svg>
        }
        title="Process Steps"
      />

      {/* Main Container Card */}
      <div className="flex flex-col items-start gap-2.5 p-3 self-stretch rounded-sm border border-[#D9DADC] bg-white">
        <h3 className="font-barlow text-base font-medium text-primary-heading">
          Work Process:
        </h3>

        <ul className="space-y-2 pl-0.5 w-full">
          {steps.map((step) => (
            <li
              key={step}
              className="flex items-center gap-2 text-sm text-secondary-subheading leading-normal"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-secondary-subheading shrink-0" />
              <span>{step}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
