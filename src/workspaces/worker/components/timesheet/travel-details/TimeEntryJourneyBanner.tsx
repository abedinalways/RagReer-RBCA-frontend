"use client";

interface TimeEntryJourneyBannerProps {
  startTime?: string;
  statusText?: string;
}

export function TimeEntryJourneyBanner({
  startTime = "8:20 AM",
  statusText = "in progress",
}: TimeEntryJourneyBannerProps) {
  return (
    <p className="text-xs text-secondary-subheading font-normal leading-relaxed pt-1">
      The journey began at{" "}
      <span className="font-semibold text-txt-primary">{startTime}</span> and is
      still{" "}
      <span className="font-semibold text-txt-primary">{statusText}</span>.
    </p>
  );
}
