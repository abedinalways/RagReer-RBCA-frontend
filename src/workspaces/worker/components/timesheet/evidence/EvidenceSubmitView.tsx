"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ChevronRight,
  MapPin,
  Image as ImageIcon,
} from "lucide-react";
import toast from "react-hot-toast";
import { updateStoredCrewMemberStatus } from "@/workspaces/shared/crewTrackingStore";

interface EvidenceSubmitViewProps {
  jobId: string;
}

interface PhotoItem {
  id: string;
  url: string;
}

const DEFAULT_BEFORE_PHOTOS: PhotoItem[] = [
  {
    id: "before-1",
    url: "https://images.unsplash.com/photo-1558904541-efa8c4a08931?auto=format&fit=crop&q=80&w=500",
  },
  {
    id: "before-2",
    url: "https://images.unsplash.com/photo-1592595896551-12b371d546d5?auto=format&fit=crop&q=80&w=500",
  },
];

const DEFAULT_AFTER_PHOTOS: PhotoItem[] = [
  {
    id: "after-1",
    url: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=500",
  },
  {
    id: "after-2",
    url: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=500",
  },
];

const INITIAL_SERVICES = [
  { id: "s-1", label: "Overgrown plants trimmed", checked: true },
  { id: "s-2", label: "Garden waste removed", checked: true },
  { id: "s-3", label: "Pathways cleaned", checked: true },
  { id: "s-4", label: "Shrubs and bushes trimmed", checked: true },
  { id: "s-5", label: "Outdoor area cleared", checked: true },
  { id: "s-6", label: "Property surroundings cleaned", checked: true },
];

const INITIAL_EQUIPMENT_PAIRS = [
  { left: "Lawn Mower", right: "Pruning Shears" },
  { left: "String Trimmer", right: "Wheelbarrow" },
  { left: "Edger", right: "Mulch Spreader" },
  { left: "Leaf Blower", right: "Shovel" },
  { left: "Hedge Trimmer", right: "Rake" },
];

export function EvidenceSubmitView({ jobId }: EvidenceSubmitViewProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [beforePhotos] = useState<PhotoItem[]>(DEFAULT_BEFORE_PHOTOS);
  const [afterPhotos, setAfterPhotos] = useState<PhotoItem[]>(DEFAULT_AFTER_PHOTOS);
  const [workNotes, setWorkNotes] = useState<string>(
    "The property maintenance work has been completed successfully. The grass boundary was trimmed, the garden area was thoroughly cleaned."
  );

  const [services, setServices] = useState(INITIAL_SERVICES);
  const [equipmentChecked, setEquipmentChecked] = useState<Record<string, boolean>>({
    "Lawn Mower": true,
    "Pruning Shears": true,
    "String Trimmer": true,
    Wheelbarrow: true,
    Edger: true,
    "Mulch Spreader": true,
    "Leaf Blower": true,
    Shovel: true,
    "Hedge Trimmer": true,
    Rake: true,
  });

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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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

  return (
    <div className="flex flex-col min-h-screen bg-pure-white-bg pb-12">
      {/* Sticky Header matching screenshot: ← Work Completed */}
      <header className="sticky top-0 z-30 flex items-center gap-3 bg-pure-white-bg border-b border-border px-4 py-3.5 shadow-2xs">
        <button
          type="button"
          onClick={() => router.back()}
          className="p-1 -ml-1 rounded-md text-primary-heading hover:bg-blue-50/60 transition-colors cursor-pointer active:scale-95"
          aria-label="Back"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="font-barlow text-xl sm:text-2xl font-bold tracking-tight text-primary-heading">
          Work Completed
        </h1>
      </header>

      {/* Main Form Content */}
      <main className="flex flex-col gap-4 p-4 max-w-md mx-auto w-full">
        {/* Top Job Info Card */}
        <div className="rounded-lg border border-border-card bg-blue-50/70 p-3.5 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-normal text-primary">
              Submit Completed job
            </span>
            <span className="text-[11px] font-normal px-2 py-0.5 rounded-sm bg-blue-100/60 text-secondary-subheading">
              Residential
            </span>
          </div>

          <h2 className="font-barlow text-base font-bold text-primary-heading leading-tight pt-0.5">
            North Entrance Monument & Islands
          </h2>

          <div className="flex items-center gap-1.5 text-xs text-secondary-subheading">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-secondary-subheading" />
            <span className="truncate">100 Whispering Pines Blvd at Hwy 43</span>
          </div>

          <p className="text-xs font-normal text-primary pt-0.5">
            Size: Small (up to 1/4 acre)
          </p>
        </div>

        {/* Before Evidence Section */}
        <section className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-barlow text-base font-bold text-primary-heading">
              Before Evidence
            </h3>
            <span className="text-xs font-normal text-primary">
              {beforePhotos.length} Photos
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {beforePhotos.map((photo) => (
              <div
                key={photo.id}
                className="aspect-square rounded-sm overflow-hidden border border-border-input bg-surface/50"
              >
                <img
                  src={photo.url}
                  alt="Before Evidence"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </section>

        {/* After Evidence Section */}
        <section className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-barlow text-base font-bold text-primary-heading">
              After Evidence
            </h3>
            <span className="text-xs font-normal text-primary">
              {afterPhotos.length} Photos
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            {afterPhotos.map((photo) => (
              <div
                key={photo.id}
                className="aspect-square rounded-sm overflow-hidden border border-border-input bg-surface/50"
              >
                <img
                  src={photo.url}
                  alt="After Evidence"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}

            {/* Add Image Box */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="aspect-square rounded-sm border border-border-input bg-blue-50/50 hover:bg-blue-50 transition-colors flex flex-col items-center justify-center gap-1.5 cursor-pointer active:scale-95 text-primary"
            >
              <ImageIcon className="h-5 w-5 text-primary" />
              <span className="text-xs font-medium">Add Image</span>
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </section>

        {/* Work Notes Section */}
        <section className="space-y-2">
          <h3 className="font-barlow text-base font-bold text-primary-heading">
            Work Notes
          </h3>

          <div className="rounded-sm border border-border-input bg-card-bg p-3 shadow-2xs">
            <textarea
              rows={3}
              value={workNotes}
              onChange={(e) => setWorkNotes(e.target.value)}
              className="w-full text-xs text-secondary-subheading leading-relaxed focus:outline-hidden resize-none bg-transparent"
              placeholder="Enter property work summary..."
            />
          </div>
        </section>

        {/* Services completed Section */}
        <section className="space-y-2">
          <h3 className="font-barlow text-base font-bold text-primary-heading">
            Services completed
          </h3>

          <div className="rounded-sm border border-border-input bg-card-bg divide-y divide-border shadow-2xs">
            {services.map((item) => (
              <label
                key={item.id}
                onClick={() => toggleService(item.id)}
                className="flex items-center gap-2.5 p-3 cursor-pointer select-none hover:bg-blue-50/40 transition-colors"
              >
                <div
                  className={`h-4 w-4 rounded-xs border flex items-center justify-center transition-colors ${
                    item.checked
                      ? "border-primary bg-card-bg text-primary"
                      : "border-border-input bg-card-bg"
                  }`}
                >
                  {item.checked && (
                    <svg
                      className="h-3 w-3 stroke-[2.5]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
                <span className="text-xs font-normal text-secondary-subheading">
                  {item.label}
                </span>
              </label>
            ))}
          </div>
        </section>

        {/* Equipment Section */}
        <section className="space-y-2">
          <h3 className="font-barlow text-base font-bold text-primary-heading">
            Equipment
          </h3>

          <div className="rounded-sm border border-border-input bg-card-bg divide-y divide-border shadow-2xs overflow-hidden">
            {INITIAL_EQUIPMENT_PAIRS.map((pair, index) => (
              <div key={index} className="grid grid-cols-2 divide-x divide-border">
                {/* Left column */}
                <label
                  onClick={() => toggleEquipment(pair.left)}
                  className="flex items-center gap-2.5 p-2.5 cursor-pointer select-none hover:bg-blue-50/40 transition-colors"
                >
                  <div
                    className={`h-4 w-4 rounded-xs border flex items-center justify-center transition-colors ${
                      equipmentChecked[pair.left]
                        ? "border-primary bg-card-bg text-primary"
                        : "border-border-input bg-card-bg"
                    }`}
                  >
                    {equipmentChecked[pair.left] && (
                      <svg
                        className="h-3 w-3 stroke-[2.5]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  <span className="text-xs font-normal text-secondary-subheading truncate">
                    {pair.left}
                  </span>
                </label>

                {/* Right column */}
                <label
                  onClick={() => toggleEquipment(pair.right)}
                  className="flex items-center gap-2.5 p-2.5 cursor-pointer select-none hover:bg-blue-50/40 transition-colors"
                >
                  <div
                    className={`h-4 w-4 rounded-xs border flex items-center justify-center transition-colors ${
                      equipmentChecked[pair.right]
                        ? "border-primary bg-card-bg text-primary"
                        : "border-border-input bg-card-bg"
                    }`}
                  >
                    {equipmentChecked[pair.right] && (
                      <svg
                        className="h-3 w-3 stroke-[2.5]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  <span className="text-xs font-normal text-secondary-subheading truncate">
                    {pair.right}
                  </span>
                </label>
              </div>
            ))}
          </div>
        </section>

        {/* Submit Button matching screenshot: Submit > */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-1.5 py-3 px-4 rounded-md bg-primary hover:bg-primary-hover text-primary-text font-medium text-sm transition-all shadow-sm cursor-pointer active:scale-[0.99] disabled:opacity-50"
          >
            <span>{isSubmitting ? "Submitting..." : "Submit"}</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </main>
    </div>
  );
}
