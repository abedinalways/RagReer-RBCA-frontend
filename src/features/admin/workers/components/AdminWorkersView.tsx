"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { mockCrewMembersList } from "../data/crewMembersData";
import { CrewMemberItem, CrewTabKey } from "../types/crewMembers.types";
import { CrewMembersEmptyState } from "./CrewMembersEmptyState";
import { CrewMembersList } from "./CrewMembersList";
import { AddCrewMemberModal } from "./AddCrewMemberModal";
import { DeleteCrewMemberModal } from "./DeleteCrewMemberModal";
import { CrewMemberLogHistoryView } from "./CrewMemberLogHistoryView";
import { CrewMemberDetailsView } from "./CrewMemberDetailsView";

interface AdminWorkersViewProps {
  initialMemberId?: string;
  initialTab?: CrewTabKey;
}

export const AdminWorkersView: React.FC<AdminWorkersViewProps> = ({
  initialMemberId,
  initialTab = "overview",
}) => {
  const [crewMembers, setCrewMembers] = useState<CrewMemberItem[]>(mockCrewMembersList);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<CrewMemberItem | null>(() => {
    if (initialMemberId) {
      return (
        crewMembers.find(
          (m) =>
            m.id.toLowerCase() === initialMemberId.toLowerCase() ||
            m.crewId.toLowerCase().replace("#", "") ===
              initialMemberId.toLowerCase().replace("#", "")
        ) || null
      );
    }
    return null;
  });
  const [logHistoryMember, setLogHistoryMember] = useState<CrewMemberItem | null>(null);
  const [deletingMember, setDeletingMember] = useState<CrewMemberItem | null>(null);

  const handleCrewMemberCreated = (newMember: CrewMemberItem) => {
    setCrewMembers((prev) => [newMember, ...prev]);
    toast.success(`Crew member ${newMember.name} added successfully!`);
  };

  const handleDeleteMember = (memberId: string) => {
    setCrewMembers((prev) => prev.filter((m) => m.id !== memberId));
    toast.success("Crew member deleted successfully!");
  };

  const handleUpdateMember = (updated: CrewMemberItem) => {
    setCrewMembers((prev) =>
      prev.map((m) => (m.id === updated.id ? updated : m))
    );
    setSelectedMember(updated);
  };

  // 1. Log History View
  if (logHistoryMember) {
    return (
      <div className="space-y-4">
        <CrewMemberLogHistoryView
          member={logHistoryMember}
          onBack={() => setLogHistoryMember(null)}
        />
      </div>
    );
  }

  // 2. Details View (Figma Screenshots 1-5)
  if (selectedMember) {
    return (
      <div className="space-y-4">
        <CrewMemberDetailsView
          member={selectedMember}
          initialTab={initialTab}
          onBack={() => setSelectedMember(null)}
          onUpdateMember={handleUpdateMember}
        />
      </div>
    );
  }

  // 3. Empty State (Screenshot 1)
  if (crewMembers.length === 0) {
    return (
      <div className="space-y-4">
        <CrewMembersEmptyState
          onAddCrewMember={() => setIsAddModalOpen(true)}
        />

        {/* Add Crew Member Modal */}
        <AddCrewMemberModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onCrewMemberCreated={handleCrewMemberCreated}
        />
      </div>
    );
  }

  // 4. Main List Table (Screenshot 2)
  return (
    <div className="space-y-4">
      <CrewMembersList
        crewMembers={crewMembers}
        onSelectMember={(member) => setSelectedMember(member)}
        onViewLogHistory={(member) => setLogHistoryMember(member)}
        onAddCrewMember={() => setIsAddModalOpen(true)}
        onDeleteMember={(member) => setDeletingMember(member)}
      />

      {/* Delete Confirmation Modal */}
      <DeleteCrewMemberModal
        member={deletingMember}
        isOpen={Boolean(deletingMember)}
        onClose={() => setDeletingMember(null)}
        onConfirm={() => {
          if (deletingMember) {
            handleDeleteMember(deletingMember.id);
            setDeletingMember(null);
          }
        }}
      />

      {/* Add Crew Member Modal */}
      <AddCrewMemberModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onCrewMemberCreated={handleCrewMemberCreated}
      />
    </div>
  );
};

export default AdminWorkersView;
