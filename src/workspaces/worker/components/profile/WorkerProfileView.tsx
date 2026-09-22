"use client";

import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { useAuth } from "@/features/auth";
import { INITIAL_WORKER_PROFILE, WorkerProfileData } from "../../data/mockWorkerProfile";
import { ProfileMainCard } from "./ProfileMainCard";
import { ProfileMenuCard } from "./ProfileMenuCard";
import { PersonalInfoView } from "./PersonalInfoView";
import { EditPersonalInfoView } from "./EditPersonalInfoView";
import { JobHistoryView } from "./JobHistoryView";
import { WorkerJobDetailsView } from "../job-details/WorkerJobDetailsView";
import { SupervisorContactModal } from "./SupervisorContactModal";
import { WorkerSettingsModal } from "./WorkerSettingsModal";

export type ProfileViewStep =
  | "menu"
  | "personal-info"
  | "edit-personal-info"
  | "job-history"
  | "job-history-details"
  | "settings"
  | "change-password";

export function WorkerProfileView() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { logOut, isLogoutLoading } = useAuth();

  // Read sub-tab & jobId directly from search params for persistent refresh support
  const tabParam = searchParams.get("tab");
  const currentStep: ProfileViewStep =
    tabParam === "personal-info" ||
    tabParam === "edit-personal-info" ||
    tabParam === "job-history" ||
    tabParam === "job-history-details" ||
    tabParam === "settings" ||
    tabParam === "change-password"
      ? tabParam
      : "menu";

  const selectedHistoryJobId = searchParams.get("jobId") || "history-1";

  const [profile, setProfile] = useState<WorkerProfileData>(INITIAL_WORKER_PROFILE);

  // Modals state
  const [isSupervisorModalOpen, setIsSupervisorModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // Navigate between subtabs by updating search params
  const navigateToStep = (step: ProfileViewStep, jobId?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (step === "menu") {
      params.delete("tab");
      params.delete("jobId");
    } else {
      params.set("tab", step);
      if (step === "job-history-details") {
        if (jobId) {
          params.set("jobId", jobId);
        }
      } else {
        params.delete("jobId");
      }
    }
    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  };

  const handleLogout = async () => {
    await logOut();
    router.replace("/login");
  };

  const handleSaveProfile = (updated: WorkerProfileData) => {
    setProfile(updated);
    navigateToStep("personal-info");
  };

  // View 2: Personal Information Details (Image 2)
  if (currentStep === "personal-info") {
    return (
      <PersonalInfoView
        profile={profile}
        onBack={() => navigateToStep("menu")}
        onEdit={() => navigateToStep("edit-personal-info")}
      />
    );
  }

  // View 3: Edit Personal Information (Image 3)
  if (currentStep === "edit-personal-info") {
    return (
      <EditPersonalInfoView
        profile={profile}
        onSave={handleSaveProfile}
        onCancel={() => navigateToStep("personal-info")}
      />
    );
  }

  // View 4: Job History List (Figma Job History Image)
  if (currentStep === "job-history") {
    return (
      <JobHistoryView
        onBack={() => navigateToStep("menu")}
        onSelectJob={(job) => {
          navigateToStep("job-history-details", job.id);
        }}
      />
    );
  }

  // View 5: Job History Details (No travel button, completed status)
  if (currentStep === "job-history-details") {
    return (
      <WorkerJobDetailsView
        jobId={selectedHistoryJobId}
        showTravelButton={false}
        onBack={() => navigateToStep("job-history")}
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
        onEditAvatar={() => navigateToStep("personal-info")}
      />

      {/* Menu Options */}
      <ProfileMenuCard
        onSelectPersonalInfo={() => navigateToStep("personal-info")}
        onSelectJobHistory={() => navigateToStep("job-history")}
        onSelectSettings={() => {
          setIsSettingsModalOpen(true);
          navigateToStep("settings");
        }}
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

      {/* Settings Modal with Settings & Change Password sub-views */}
      <WorkerSettingsModal
        isOpen={isSettingsModalOpen || currentStep === "settings" || currentStep === "change-password"}
        initialView={currentStep === "change-password" ? "change-password" : "settings"}
        onViewChange={(view) => navigateToStep(view)}
        onClose={() => {
          setIsSettingsModalOpen(false);
          navigateToStep("menu");
        }}
      />
    </div>
  );
}
