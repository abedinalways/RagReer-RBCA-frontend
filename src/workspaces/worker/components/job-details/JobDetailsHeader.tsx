"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface JobDetailsHeaderProps {
  title?: string;
  onBack?: () => void;
}

export function JobDetailsHeader({
  title = "Details",
  onBack,
}: JobDetailsHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 bg-white/95 backdrop-blur-sm border-b border-[#EAECF0] px-4 py-3 shadow-xs">
      <button
        type="button"
        onClick={handleBack}
        className="p-1 -ml-1 rounded-md text-primary-heading hover:bg-slate-100 transition-colors cursor-pointer active:scale-95"
        aria-label="Go back"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>
      <h1 className="font-barlow text-xl font-medium tracking-tight text-primary-heading">
        {title}
      </h1>
    </header>
  );
}
