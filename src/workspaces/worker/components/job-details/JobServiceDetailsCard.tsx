import { Briefcase } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

interface ServiceItem {
  title: string;
  items: string[];
}

export interface JobServiceDetailsCardProps {
  scopeOfWork?: string;
  includedServices?: ServiceItem[];
}

const DEFAULT_INCLUDED_SERVICES: ServiceItem[] = [
  {
    title: "Lawn Care",
    items: ["Mowing", "Trimming", "Edging", "Blowing"],
  },
  {
    title: "Hedge & Shrub Trimming",
    items: [
      "Trim designated shrubs/hedges",
      "Remove resulting debris",
      "Edging",
      "Blowing",
    ],
  },
];

export function JobServiceDetailsCard({
  scopeOfWork = "Complete spring lawn cleanup and landscape refresh for the front and back yard, including removal of leaves and debris, bed edging, trimming of ornamental grasses, and a fresh layer of mulch.",
  includedServices = DEFAULT_INCLUDED_SERVICES,
}: JobServiceDetailsCardProps) {
  return (
    <section className="space-y-2">
      {/* Section Header */}
      <SectionHeader
        icon={<Briefcase className="h-4 w-4" />}
        title="Service Details"
      />

      {/* Main Container Card */}
      <div className="flex flex-col items-start gap-3 p-3 self-stretch rounded-sm border border-[#D9DADC] bg-white">
        {/* Scope of Work */}
        <div className="space-y-1.5 w-full">
          <h3 className="font-barlow text-lg font-medium text-primary-heading">
            Scope of Work
          </h3>
          <p className="text-sm text-secondary-subheading leading-relaxed">
            {scopeOfWork}
          </p>
        </div>

        {/* Included Services */}
        <div className="space-y-2.5 w-full">
          <h3 className="font-barlow text-lg font-medium text-primary-heading">
            Included Services
          </h3>

          <div className="flex flex-col gap-2.5 w-full">
            {includedServices.map((service) => (
              <div
                key={service.title}
                className="flex flex-col items-start gap-3 py-3 px-4 self-stretch rounded-sm border border-[#D9DADC] bg-[rgba(242,242,243,0.40)] w-full"
              >
                <h4 className="font-barlow text-base font-semibold text-primary">
                  {service.title}
                </h4>
                <div className="space-y-1.5 w-full">
                  <span className="text-xs font-medium text-txt-primary">
                    Work Included:
                  </span>
                  <ul className="space-y-1 pl-1">
                    {service.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm text-secondary-subheading"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-secondary-subheading shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
