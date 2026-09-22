import { SectionHeader } from "./SectionHeader";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  badge: "Team Leader" | "Member" | string;
  avatarUrl: string;
  isLeader?: boolean;
}

export interface JobTeamCardProps {
  members?: TeamMember[];
}

const DEFAULT_MEMBERS: TeamMember[] = [
  {
    id: "m-1",
    name: "James Wilson",
    role: "Lawn Care Specialist",
    badge: "Team Leader",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120",
    isLeader: true,
  },
  {
    id: "m-2",
    name: "James Wilson",
    role: "Lawn Care Specialist",
    badge: "Member",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120",
    isLeader: false,
  },
  {
    id: "m-3",
    name: "James Wilson",
    role: "Lawn Care Specialist",
    badge: "Member",
    avatarUrl:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=120",
    isLeader: false,
  },
];

export function JobTeamCard({ members = DEFAULT_MEMBERS }: JobTeamCardProps) {
  return (
    <section className="space-y-2">
      {/* Section Header with exact Figma organization/team tree icon */}
      <SectionHeader
        icon={
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="4" r="2.5" />
            <path d="M12 6.5v3.5m-6 5v-1.5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2V15" />
            <circle cx="6" cy="18.5" r="2.5" />
            <circle cx="18" cy="18.5" r="2.5" />
          </svg>
        }
        title="Team"
      />

      {/* Main Container Card */}
      <div className="flex flex-col gap-2.5 p-3 self-stretch rounded-sm border border-[#D9DADC] bg-white">
        {members.map((member) => {
          const isLeader = member.isLeader || member.badge === "Team Leader";

          return (
            <div
              key={member.id}
              className={`flex items-center gap-3 p-3 rounded-sm border transition-all ${isLeader
                ? "bg-[#EAF3FC] border-[#CADFF4]"
                : "bg-white border-[#D5E3F0]"
                }`}
            >
              {/* Member Avatar */}
              <div className="w-12 h-12 rounded-sm overflow-hidden bg-slate-100 shrink-0 border border-border/50">
                <img
                  src={member.avatarUrl}
                  alt={member.name}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Name & Role */}
              <div className="flex flex-col flex-1 min-w-0">
                <h4 className="font-barlow text-base font-medium text-primary-heading leading-tight truncate">
                  {member.name}
                </h4>
                <p className="text-sm text-secondary-subheading mt-0.5 truncate">
                  {member.role}
                </p>
              </div>

              {/* Leader/Member Badge */}
              <span
                className={`self-start text-sm font-medium px-2 py-0.5 rounded-sm shrink-0 ${isLeader
                  ? "bg-primary text-white font-semibold"
                  : "bg-[#EAF2FA] text-primary"
                  }`}
              >
                {member.badge}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
