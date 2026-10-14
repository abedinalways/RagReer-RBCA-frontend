export interface CrewMember {
  id: string;
  name: string;
  avatar: string;
  role?: string;
}

export const MOCK_SITE_VISIT_CREW: CrewMember[] = [
  {
    id: "crew-1",
    name: "David Edison",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: "crew-2",
    name: "Noah Garcia",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: "crew-3",
    name: "Liam Patel",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: "crew-4",
    name: "Ava Martinez",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: "crew-5",
    name: "Sophia Chen",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: "crew-6",
    name: "Emma Johnson",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  },
];
