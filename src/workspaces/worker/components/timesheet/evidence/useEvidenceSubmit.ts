"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { updateStoredCrewMemberStatus } from "@/workspaces/shared/crewTrackingStore";
import { PhotoItem, ServiceItem } from "./types";
import {
  DEFAULT_BEFORE_PHOTOS,
  DEFAULT_AFTER_PHOTOS,
  INITIAL_SERVICES,
  INITIAL_EQUIPMENT_CHECKED,
} from "./mockEvidenceData";

export function useEvidenceSubmit(jobId: string) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [beforePhotos] = useState<PhotoItem[]>(DEFAULT_BEFORE_PHOTOS);
  const [afterPhotos, setAfterPhotos] = useState<PhotoItem[]>(DEFAULT_AFTER_PHOTOS);
  const [workNotes, setWorkNotes] = useState<string>(
    "The property maintenance work has been completed successfully. The grass boundary was trimmed, the garden area was thoroughly cleaned."
  );

  const [services, setServices] = useState<ServiceItem[]>(INITIAL_SERVICES);
  const [equipmentChecked, setEquipmentChecked] = useState<Record<string, boolean>>(
    INITIAL_EQUIPMENT_CHECKED
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Toggle Services checkbox
  const toggleService = (id: string) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, checked: !s.checked } : s))
    );
  };

  // Toggle Equipment checkbox
  const toggleEquipment = (name: string) => {
    setEquipmentChecked((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  // Trigger file selection
  const triggerAddImage = () => {
    fileInputRef.current?.click();
  };

  // Handle uploading custom After Image
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAfterPhotos((prev) => [
        ...prev,
        { id: `after-${Date.now()}`, url },
      ]);
      toast.success("Image added to After Evidence!");
    }
  };

  // Submit Evidence
  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);

    // Update shared crew tracking store so admin sees full completion
    updateStoredCrewMemberStatus("crew-1", {
      status: "Work Completed",
      progressPercent: 100,
      timeElapsed: "01:32:34 h",
    });
    updateStoredCrewMemberStatus("crew-2", {
      status: "Work Completed",
      progressPercent: 100,
      timeElapsed: "01:32:34 h",
    });

    toast.success("Work evidence submitted successfully!", {
      icon: "✅",
    });

    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/worker/home");
    }, 800);
  };

  const handleBack = () => {
    router.back();
  };

  return {
    jobId,
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
  };
}
