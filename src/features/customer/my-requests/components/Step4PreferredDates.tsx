"use client";

import React, { useRef } from "react";
import { UseFormReturn } from "react-hook-form";
import { NewRequestFormData } from "../schema/requestSchema";

interface Step4Props {
  form: UseFormReturn<NewRequestFormData>;
}

export const Step4PreferredDates: React.FC<Step4Props> = ({ form }) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const photos = watch("photos") || [];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newPhotoUrls: string[] = [];
      Array.from(files).forEach((file) => {
        const url = URL.createObjectURL(file);
        newPhotoUrls.push(url);
      });
      const updatedPhotos = [...photos, ...newPhotoUrls];
      setValue("photos", updatedPhotos, { shouldValidate: true });
    }
  };

  const handleRemovePhoto = (index: number) => {
    const updatedPhotos = photos.filter((_, i) => i !== index);
    setValue("photos", updatedPhotos, { shouldValidate: true });
  };

  return (
    <div className="space-y-6">
      {/* Title section */}
      <div>
        <h2 className="text-xl font-bold text-primary-heading">
          Preferred dates & photos
        </h2>
        <p className="text-sm text-secondary-subheading mt-0.5">
          Let us know when works best and share property photos.
        </p>
      </div>

      {/* Field 1: Preferred Date */}
      <div>
        <label className="block text-sm font-medium text-txt-primary mb-1.5">
          If approved, which day is best for you?{" "}
          <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <input
            type="date"
            {...register("preferredDate")}
            className="w-full h-12 px-3 pr-10 text-txt-primary bg-card-bg border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-border font-normal"
          />
        </div>
        {errors.preferredDate && (
          <p className="text-xs text-rose-500 mt-1">
            {errors.preferredDate.message}
          </p>
        )}
      </div>

      {/* Field 2: Secondary Date */}
      <div>
        <label className="block text-sm font-medium text-txt-primary mb-1.5">
          What is another day that is suitable for you?{" "}
          <span className="text-secondary-subheading font-normal">(optional)</span>
        </label>
        <div className="relative">
          <input
            type="date"
            {...register("secondaryDate")}
            className="w-full h-12 px-3 pr-10 text-txt-primary bg-card-bg border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-border font-normal"
          />
        </div>
      </div>

      {/* Field 3: Add Photos */}
      <div>
        <label className="block text-sm font-medium text-txt-primary mb-2">
          Add Photos <span className="text-rose-500">*</span>{" "}
          <span className="text-secondary-subheading font-normal">
            (Thumbnail, front view, side view, back view etc)
          </span>
        </label>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
          accept="image/*"
          className="hidden"
        />

        <div className="flex flex-wrap gap-3 items-center">
          {/* Uploaded Thumbnails Preview */}
          {photos.map((photoUrl, idx) => (
<div
                key={idx}
                className="relative w-24 h-24 rounded-md overflow-hidden border border-border group"
              >
              <img
                src={photoUrl}
                alt={`Property upload ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemovePhoto(idx)}
                className="absolute top-1 right-1 w-5 h-5 bg-rose-500 text-white rounded-full flex items-center justify-center text-xs opacity-80 hover:opacity-100"
              >
                ✕
              </button>
            </div>
          ))}

          {/* Dotted Upload Box Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-24 h-24 border-2 border-dashed border-border rounded-md flex items-center justify-center text-secondary-subheading hover:border-border hover:text-txt-primary transition-colors bg-page-bg/50"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>
        {errors.photos && (
          <p className="text-xs text-rose-500 mt-1">{errors.photos.message}</p>
        )}
      </div>

      {/* Amber/Yellow Disclaimer Callout Box */}
      <div className="p-3.5 bg-[#FFFBEB] border border-[#FCD34D] rounded-md">
        <p className="text-xs text-txt-primary leading-relaxed font-normal">
          Submit a request does not authorize work, guarantee pricing, or
          confirm scheduling.
        </p>
      </div>
    </div>
  );
};
