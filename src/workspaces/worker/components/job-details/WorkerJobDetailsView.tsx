"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { JobDetailsHeader } from "./JobDetailsHeader";
import { JobPropertyCard } from "./JobPropertyCard";
import { JobServiceDetailsCard } from "./JobServiceDetailsCard";
import { JobProcessStepsCard } from "./JobProcessStepsCard";
import { JobEquipmentCard } from "./JobEquipmentCard";
import { JobTeamCard } from "./JobTeamCard";
import { MOCK_WORKER_JOBS } from "../../data/mockWorkerJobs";

interface WorkerJobDetailsViewProps {
  jobId?: string;
  onBack?: () => void;
}

export function WorkerJobDetailsView({
  jobId,
  onBack,
}: WorkerJobDetailsViewProps) {
  const [isTraveling, setIsTraveling] = useState(false);

  // Find job from mock data if provided, otherwise default to Figma design data
  const matchingJob = MOCK_WORKER_JOBS.find((j) => j.id === jobId);

  const propertyData = {
    imageSrc:
      matchingJob?.imageSrc ||
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
    category: "Residential",
    title: matchingJob?.title || "North Entrance Monument & Islands",
    address: matchingJob?.address || "100 Whispering Pines Blvd at Hwy 43",
    sizeDescription: "Size: Small (up to 1/4 acre)",
  };

  const handleStartTravel = () => {
    setIsTraveling(true);
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
        <div className="pt-2">
          <button
            type="button"
            onClick={handleStartTravel}
            className="w-full flex items-center justify-center gap-1.5 py-3 px-4 rounded-sm bg-primary text-white font-medium text-sm transition-all hover:bg-primary-hover active:scale-[0.99] shadow-sm cursor-pointer"
          >
            <span>{isTraveling ? "Traveling to site..." : "Start travel"}</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
