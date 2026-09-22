"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useAuth } from "@/features/auth";
import { INITIAL_WORKER_PROFILE, WorkerProfileData } from "../../data/mockWorkerProfile";
import { ProfileMainCard } from "./ProfileMainCard";
import { ProfileMenuCard } from "./ProfileMenuCard";
import { PersonalInfoView } from "./PersonalInfoView";
import { EditPersonalInfoView } from "./EditPersonalInfoView";
import { SupervisorContactModal } from "./SupervisorContactModal";
import { WorkerSettingsModal } from "./WorkerSettingsModal";
import { JobHistoryModal } from "./JobHistoryModal";

export type ProfileViewStep = "menu" | "personal-info" | "edit-personal-info";

export function WorkerProfileView() {
  const router = useRouter();
  const { logOut, isLogoutLoading } = useAuth();

  const [currentStep, setCurrentStep] = useState<ProfileViewStep>("menu");
  const [profile, setProfile] = useState<WorkerProfileData>(INITIAL_WORKER_PROFILE);

  // Modals state
  const [isSupervisorModalOpen, setIsSupervisorModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  const handleLogout = async () => {
    await logOut();
    router.replace("/login");
  };

  const handleSaveProfile = (updated: WorkerProfileData) => {
    setProfile(updated);
    setCurrentStep("personal-info");
  };

  // View 2: Personal Information Details (Image 2)
  if (currentStep === "personal-info") {
    return (
      <PersonalInfoView
        profile={profile}
        onBack={() => setCurrentStep("menu")}
        onEdit={() => setCurrentStep("edit-personal-info")}
      />
    );
  }

  // View 3: Edit Personal Information (Image 3)
  if (currentStep === "edit-personal-info") {
    return (
      <EditPersonalInfoView
        profile={profile}
        onSave={handleSaveProfile}
        onCancel={() => setCurrentStep("personal-info")}
      />
    );
  }

  // View 1: Main Profile Menu (Image 1)
  return (
    <div className="flex flex-col gap-4">
      {/* Header matching Image 1: Profile */}
      <header className="border-b border-[#D9DADC]/60 pb-3">
        <h1 className="font-barlow text-2xl font-semibold tracking-tight text-primary-heading">
          Profile
        </h1>
      </header>

      {/* Top Profile Card */}
      <ProfileMainCard
        profile={profile}
        onEditAvatar={() => setCurrentStep("personal-info")}
      />

      {/* Menu Options */}
      <ProfileMenuCard
        onSelectPersonalInfo={() => setCurrentStep("personal-info")}
        onSelectJobHistory={() => setIsHistoryModalOpen(true)}
        onSelectSettings={() => setIsSettingsModalOpen(true)}
        onSelectContactSupervisor={() => setIsSupervisorModalOpen(true)}
      />

      {/* Log Out Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={() => void handleLogout()}
          disabled={isLogoutLoading}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-sm border border-primary text-primary text-sm font-semibold hover:bg-primary/5 active:scale-[0.99] transition-all cursor-pointer bg-white disabled:opacity-50"
        >
          <LogOut className="h-4 w-4" />
          <span>{isLogoutLoading ? "Logging out..." : "Log Out"}</span>
        </button>
      </div>

      {/* Helper Modals */}
      <SupervisorContactModal
        isOpen={isSupervisorModalOpen}
        onClose={() => setIsSupervisorModalOpen(false)}
      />

      <WorkerSettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
      />

      <JobHistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
      />
    </div>
  );
}
