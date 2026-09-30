"use client";

import React, { useRef } from "react";
import { UseFormReturn } from "react-hook-form";
import { NewRequestFormData } from "../schema/requestSchema";
import { Calendar, Plus, X } from "lucide-react";

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
        <h2 className="text-xl font-medium text-primary-heading">
          Preferred dates & photos
        </h2>
        <p className="text-sm text-secondary-subheading mt-0.5">
          Let us know when works best and share property photos.
        </p>
      </div>

      {/* Field 1: Preferred Date */}
      <div>
        <label className="block text-lg font-medium text-txt-primary mb-1.5">
          If approved, which day is best for you?{" "}
          <span className="text-trend-down">*</span>
        </label>
        <div className="relative">
          <input
            type="date"
            placeholder="dd/mm/yyyy"
            {...register("preferredDate")}
            className="w-full h-11 px-3.5 pr-10 text-txt-primary bg-card-bg border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-border text-base relative [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer cursor-pointer"
          />
          <Calendar className="w-5 h-5 text-secondary-subheading absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none stroke-[1.5]" />
        </div>
        {errors.preferredDate && (
          <p className="text-xs text-trend-down mt-1">
            {errors.preferredDate.message}
          </p>
        )}
      </div>

      {/* Field 2: Secondary Date */}
      <div>
        <label className="block text-lg font-medium text-txt-primary mb-1.5">
          What is another day that is suitable for you?{" "}
          <span className="text-secondary-subheading font-normal">
            (optional)
          </span>
        </label>
        <div className="relative">
          <input
            type="date"
            placeholder="dd/mm/yyyy"
            {...register("secondaryDate")}
            className="w-full h-11 px-3.5 pr-10 text-txt-primary bg-card-bg border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-border text-base relative [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer cursor-pointer"
          />
          <Calendar className="w-5 h-5 text-secondary-subheading absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none stroke-[1.5]" />
        </div>
      </div>

      {/* Field 3: Add Photos */}
      <div>
        <label className="block text-lg font-medium text-txt-primary mb-2">
          Add Photos <span className="text-trend-down">*</span>{" "}
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
              className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden border border-border group shadow-2xs"
            >
              <img
                src={photoUrl}
                alt={`Property upload ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemovePhoto(idx)}
                className="absolute top-1 right-1 w-5 h-5 bg-txt-primary/70 hover:bg-trend-down text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-3 h-3 stroke-[2.5]" />
              </button>
            </div>
          ))}

          {/* Dotted Upload Box Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-20 h-20 sm:w-24 sm:h-24 border border-dashed border-[#D0D5DD] hover:border-primary rounded-lg flex items-center justify-center text-primary/70 hover:text-primary transition-colors bg-card-bg cursor-pointer group"
          >
            <Plus className="w-8 h-8 text-primary stroke-[1.25] group-hover:scale-105 transition-transform" />
          </button>
        </div>
        {errors.photos && (
          <p className="text-xs text-trend-down mt-1">
            {errors.photos.message}
          </p>
        )}
      </div>

      {/* Amber/Yellow Disclaimer Callout Box */}
      <div className="p-4 bg-[#FFFDF5] border border-[#F5B517] rounded-sm">
        <p className="text-xs sm:text-sm text-secondary-subheading leading-relaxed font-normal">
          Submit a request does not authorize work, guarantee pricing, or confirm scheduling.
        </p>
      </div>
    </div>
  );
};
