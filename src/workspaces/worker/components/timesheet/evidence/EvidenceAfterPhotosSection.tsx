"use client";

import { RefObject } from "react";
import { Image as ImageIcon } from "lucide-react";
import { PhotoItem } from "./types";

interface EvidenceAfterPhotosSectionProps {
  photos: PhotoItem[];
  fileInputRef: RefObject<HTMLInputElement | null>;
  onAddImage: () => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function EvidenceAfterPhotosSection({
  photos,
  fileInputRef,
  onAddImage,
  onFileChange,
}: EvidenceAfterPhotosSectionProps) {
  return (
    <section className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="font-barlow text-base font-bold text-primary-heading">
          After Evidence
        </h3>
        <span className="text-xs font-normal text-primary">
          {photos.length} Photos
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        {photos.map((photo) => (
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

        {/* Add Image Button */}
        <button
          type="button"
          onClick={onAddImage}
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
          onChange={onFileChange}
        />
      </div>
    </section>
  );
}
