import React from "react";

interface SectionHeaderProps {
  icon: React.ReactNode;
  title: string;
}

export function SectionHeader({ icon, title }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-2 pb-2 border-b border-[#EAECF0]/80">
      <span className="text-primary-heading shrink-0">{icon}</span>
      <h2 className="font-barlow text-xl font-medium text-primary-heading leading-tight tracking-tight">
        {title}
      </h2>
    </div>
  );
}
