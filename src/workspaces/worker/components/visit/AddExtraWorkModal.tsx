"use client";

import { useState } from "react";
import { ArrowLeft, ChevronRight, Plus, X, Camera } from "lucide-react";

export interface ExtraWorkItem {
  id: string;
  reason: string;
  service: string;
  description: string;
  duration: string;
  cost: string;
  images: string[];
}

interface AddExtraWorkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitWork: (work: ExtraWorkItem) => void;
}

export function AddExtraWorkModal({
  isOpen,
  onClose,
  onSubmitWork,
}: AddExtraWorkModalProps) {
  const [reason, setReason] = useState("Customer requested tree branch trim");
  const [service, setService] = useState("Tree Pruning");
  const [description, setDescription] = useState(
    "Remove overhanging branches near the driveway to prevent damage."
  );
  const [duration, setDuration] = useState("2 hours");
  const [cost, setCost] = useState("$120.00");
  const [images, setImages] = useState<string[]>([
    "https://images.unsplash.com/photo-1592595896551-12b371d546d5?auto=format&fit=crop&q=80&w=200",
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=200",
  ]);

  if (!isOpen) return null;

  const handleAddSampleImage = () => {
    // Add sample property work photo
    setImages((prev) => [
      ...prev,
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=200",
    ]);
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitWork({
      id: `work-${Date.now()}`,
      reason,
      service,
      description,
      duration,
      cost,
      images,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#F5F6F8] overflow-y-auto animate-in fade-in duration-150">
      {/* Sticky Header: ← Add Work */}
      <header className="sticky top-0 z-30 flex items-center gap-3 bg-white border-b border-[#EAECF0] px-4 py-3 shadow-xs">
        <button
          type="button"
          onClick={onClose}
          className="p-1 -ml-1 rounded-md text-primary-heading hover:bg-slate-100 transition-colors cursor-pointer active:scale-95"
          aria-label="Back"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="font-barlow text-xl font-medium tracking-tight text-primary-heading">
          Add Work
        </h1>
      </header>

      {/* Main Form Content */}
      <div className="flex-1 p-4 max-w-md mx-auto w-full pb-10">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-4 rounded-sm border border-[#D9DADC] bg-white shadow-xs space-y-3.5">
            <h2 className="font-barlow text-base font-semibold text-primary-heading border-b border-[#EAECF0] pb-2">
              Additional Work Required
            </h2>

            {/* Reason */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-primary-heading">
                Reason
              </label>
              <input
                type="text"
                required
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g. Storm damage cleanup, Customer request"
                className="w-full px-3 py-2 text-xs rounded-sm border border-[#D9DADC] bg-white text-txt-primary focus:outline-none focus:border-primary"
              />
            </div>

            {/* Service */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-primary-heading">
                Service
              </label>
              <input
                type="text"
                required
                value={service}
                onChange={(e) => setService(e.target.value)}
                placeholder="e.g. Tree Pruning, Lawn Mowing"
                className="w-full px-3 py-2 text-xs rounded-sm border border-[#D9DADC] bg-white text-txt-primary focus:outline-none focus:border-primary"
              />
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-primary-heading">
                Description
              </label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Please describe details of the additional work..."
                className="w-full px-3 py-2 text-xs rounded-sm border border-[#D9DADC] bg-white text-txt-primary focus:outline-none focus:border-primary resize-none"
              />
            </div>

            {/* Estimated Duration & Additional Cost */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-primary-heading">
                  Estimated Duration
                </label>
                <input
                  type="text"
                  required
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g. 2 hours"
                  className="w-full px-3 py-2 text-xs rounded-sm border border-[#D9DADC] bg-white text-txt-primary focus:outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-primary-heading">
                  Additional Cost
                </label>
                <input
                  type="text"
                  required
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  placeholder="e.g. $120.00"
                  className="w-full px-3 py-2 text-xs rounded-sm border border-[#D9DADC] bg-white text-txt-primary focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Attachments Section */}
            <div className="space-y-1.5 pt-1">
              <label className="text-xs font-semibold text-primary-heading">
                Attachments
              </label>

              <div className="grid grid-cols-3 gap-2">
                {/* Uploaded images previews */}
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-square rounded-sm overflow-hidden border border-[#D9DADC] bg-slate-100 group"
                  >
                    <img
                      src={img}
                      alt="Work attachment"
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-1 right-1 p-1 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
                      aria-label="Remove image"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}

                {/* Add Image Button */}
                <button
                  type="button"
                  onClick={handleAddSampleImage}
                  className="flex flex-col items-center justify-center gap-1 aspect-square rounded-sm border border-dashed border-[#D9DADC] bg-slate-50 hover:bg-slate-100 text-secondary-subheading transition-colors cursor-pointer"
                >
                  <Plus className="h-5 w-5 text-primary" />
                  <span className="text-[10px] font-medium text-txt-primary">
                    Add image
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-1.5 py-3 px-4 rounded-sm bg-primary text-white font-medium text-sm transition-all hover:bg-primary-hover active:scale-[0.99] shadow-sm cursor-pointer"
            >
              <span>Submit</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
