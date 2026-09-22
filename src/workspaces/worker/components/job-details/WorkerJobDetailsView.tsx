"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { JobDetailsHeader } from "./JobDetailsHeader";
import { JobPropertyCard } from "./JobPropertyCard";
import { JobServiceDetailsCard } from "./JobServiceDetailsCard";
import { JobProcessStepsCard } from "./JobProcessStepsCard";
import { JobEquipmentCard } from "./JobEquipmentCard";
import { JobTeamCard } from "./JobTeamCard";
import { MOCK_WORKER_JOBS, MOCK_JOB_HISTORY } from "../../data/mockWorkerJobs";
import { useIsTeamLeader } from "../../hooks/useIsTeamLeader";

interface WorkerJobDetailsViewProps {
  jobId?: string;
  onBack?: () => void;
  showTravelButton?: boolean;
}

export function WorkerJobDetailsView({
  jobId = "job-1",
  onBack,
  showTravelButton = true,
}: WorkerJobDetailsViewProps) {
  const router = useRouter();
  const isTeamLeader = useIsTeamLeader();

  // Find job from mock data or job history
  const matchingJob =
    MOCK_WORKER_JOBS.find((j) => j.id === jobId) ||
    MOCK_JOB_HISTORY.find((j) => j.id === jobId);

  const isCompleted = matchingJob?.status === "COMPLETED";

  const propertyData = {
    imageSrc:
      matchingJob?.imageSrc ||
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
    category: isCompleted ? "Completed" : "Residential",
    title: matchingJob?.title || "North Entrance Monument & Islands",
    address: matchingJob?.address || "100 Whispering Pines Blvd at Hwy 43",
    sizeDescription: "Size: Small (up to 1/4 acre)",
  };

  const handleStartTravel = () => {
    router.push(`/worker/jobs/${jobId}/travel`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white pb-10">
      <JobDetailsHeader title="Details" onBack={onBack} />

      <div className="flex flex-col gap-4 p-4 max-w-md mx-auto w-full">
        <JobPropertyCard
          imageSrc={propertyData.imageSrc}
          category={propertyData.category}
          title={propertyData.title}
          address={propertyData.address}
          sizeDescription={propertyData.sizeDescription}
        />
        <JobServiceDetailsCard />
        <JobProcessStepsCard />
        <JobEquipmentCard />
        <JobTeamCard />

        {/* Start travel button - Exclusive for Team Leader and only for active/in-progress jobs (never for completed job history) */}
        {isTeamLeader && showTravelButton && !isCompleted && (
          <div className="pt-2">
            <button
              type="button"
              onClick={handleStartTravel}
              className="w-full flex items-center justify-center gap-1.5 py-3 px-4 rounded-sm bg-primary text-white font-medium text-sm transition-all hover:bg-primary-hover active:scale-[0.99] shadow-sm cursor-pointer"
            >
              <span>Start travel</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
