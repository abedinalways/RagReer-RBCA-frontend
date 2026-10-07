"use client";

import { PhotoItem } from "./types";

interface EvidenceBeforePhotosSectionProps {
  photos: PhotoItem[];
}

export function EvidenceBeforePhotosSection({
  photos,
}: EvidenceBeforePhotosSectionProps) {
  return (
    <section className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="font-barlow text-base font-bold text-primary-heading">
          Before Evidence
        </h3>
        <span className="text-xs font-normal text-primary">
          {photos.length} Photos
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {photos.map((photo) => (
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
  );
}
