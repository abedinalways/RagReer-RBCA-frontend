import { Wrench } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

export interface JobEquipmentCardProps {
  equipmentPairs?: [string, string][];
}

const DEFAULT_EQUIPMENT_PAIRS: [string, string][] = [
  ["Lawn Mower", "Pruning Shears"],
  ["String Trimmer", "Wheelbarrow"],
  ["Edger", "Mulch Spreader"],
  ["Leaf Blower", "Shovel"],
  ["Hedge Trimmer", "Rake"],
];

export function JobEquipmentCard({
  equipmentPairs = DEFAULT_EQUIPMENT_PAIRS,
}: JobEquipmentCardProps) {
  return (
    <section className="space-y-2">
      {/* Section Header */}
      <SectionHeader
        icon={<Wrench className="h-4 w-4" />}
        title="Equipment"
      />

      {/* Main Container Card containing the 2-Column Table Grid */}
      <div className="p-3 self-stretch rounded-sm border border-[#D9DADC] bg-white">
        <div className="w-full border border-[#D9DADC] rounded-sm overflow-hidden text-sm">
          {equipmentPairs.map(([left, right], idx) => (
            <div
              key={idx}
              className={`grid grid-cols-2 ${idx !== equipmentPairs.length - 1 ? "border-b border-[#D9DADC]" : ""
                }`}
            >
              {/* Left Cell */}
              <div className="flex items-center gap-2 px-3 py-2 border-r border-[#D9DADC] text-secondary-subheading bg-white">
                <span className="h-1.5 w-1.5 rounded-full bg-secondary-subheading shrink-0" />
                <span className="truncate">{left}</span>
              </div>

              {/* Right Cell */}
              <div className="flex items-center gap-2 px-3 py-2 text-secondary-subheading bg-white">
                <span className="h-1.5 w-1.5 rounded-full bg-secondary-subheading shrink-0" />
                <span className="truncate">{right}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
