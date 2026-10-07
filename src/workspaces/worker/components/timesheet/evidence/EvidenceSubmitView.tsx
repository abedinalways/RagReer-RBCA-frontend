"use client";

import { useEvidenceSubmit } from "./useEvidenceSubmit";
import { EvidenceHeader } from "./EvidenceHeader";
import { EvidenceJobInfoCard } from "./EvidenceJobInfoCard";
import { EvidenceBeforePhotosSection } from "./EvidenceBeforePhotosSection";
import { EvidenceAfterPhotosSection } from "./EvidenceAfterPhotosSection";
import { EvidenceWorkNotesSection } from "./EvidenceWorkNotesSection";
import { EvidenceServicesSection } from "./EvidenceServicesSection";
import { EvidenceEquipmentSection } from "./EvidenceEquipmentSection";
import { EvidenceSubmitButton } from "./EvidenceSubmitButton";

interface EvidenceSubmitViewProps {
  jobId: string;
}

export function EvidenceSubmitView({ jobId }: EvidenceSubmitViewProps) {
  const {
    beforePhotos,
    afterPhotos,
    workNotes,
    setWorkNotes,
    services,
    toggleService,
    equipmentChecked,
    toggleEquipment,
    fileInputRef,
    triggerAddImage,
    handleFileChange,
    isSubmitting,
    handleSubmit,
    handleBack,
  } = useEvidenceSubmit(jobId);

  return (
    <div className="flex flex-col min-h-screen bg-pure-white-bg pb-12">
      {/* Sticky Header: ← Work Completed */}
      <EvidenceHeader onBack={handleBack} />

      {/* Main Form Content */}
      <main className="flex flex-col gap-4 p-4 max-w-md mx-auto w-full">
        {/* Top Job Info Card */}
        <EvidenceJobInfoCard />

        {/* Before Evidence Section */}
        <EvidenceBeforePhotosSection photos={beforePhotos} />

        {/* After Evidence Section */}
        <EvidenceAfterPhotosSection
          photos={afterPhotos}
          fileInputRef={fileInputRef}
          onAddImage={triggerAddImage}
          onFileChange={handleFileChange}
        />

        {/* Work Notes Section */}
        <EvidenceWorkNotesSection
          value={workNotes}
          onChange={setWorkNotes}
        />

        {/* Services completed Section */}
        <EvidenceServicesSection
          services={services}
          onToggleService={toggleService}
        />

        {/* Equipment Section */}
        <EvidenceEquipmentSection
          equipmentChecked={equipmentChecked}
          onToggleEquipment={toggleEquipment}
        />

        {/* Submit Button */}
        <EvidenceSubmitButton
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
        />
      </main>
    </div>
  );
}
