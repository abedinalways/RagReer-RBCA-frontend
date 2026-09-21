import React from "react";
import Link from "next/link";

export interface EmptyStateCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  actionHref?: string;
  className?: string;
}

export const EmptyStateCard: React.FC<EmptyStateCardProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  actionHref,
  className = "",
}) => {
  // Helper to render button content
  const renderButton = () => {
    if (!actionLabel) return null;

    const buttonClass =
      "inline-flex items-center justify-center px-6 py-2.5 bg-[#5C82A6] hover:bg-[#4C6F91] text-white text-sm font-medium rounded-md shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-[#5C82A6] focus:ring-offset-2 cursor-pointer";

    if (actionHref) {
      return (
        <Link href={actionHref} className={buttonClass}>
          {actionLabel}
        </Link>
      );
    }

    return (
      <button type="button" onClick={onAction} className={buttonClass}>
        {actionLabel}
      </button>
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div
        className={`w-full bg-white border border-[#E5E7EB] rounded-lg p-8 sm:p-12 flex flex-col items-center justify-center text-center shadow-[0_1px_3px_rgba(0,0,0,0.02)] ${className}`}
      >
        {/* Circle Icon Container */}
        {icon && (
          <div className="w-16 h-16 rounded-full bg-[#F0F3F6] flex items-center justify-center mb-5 shrink-0">
            {icon}
          </div>
        )}

        {/* Heading */}
        <h3 className="text-xl sm:text-[22px] font-bold text-[#111827] tracking-tight mb-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-[#6B7280] text-sm sm:text-[15px] leading-relaxed max-w-md mb-6">
          {description}
        </p>

        {/* Action Button */}
        {renderButton()}
      </div>
    </div>
  );
};

export default EmptyStateCard;
