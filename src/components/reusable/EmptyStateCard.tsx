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
      "inline-flex items-center justify-center px-6 py-2.5 bg-primary hover:bg-primary-hover text-primary-text text-sm font-medium rounded-md shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer";

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
    <div className="max-w-2xl mx-auto">
      <div
        className={`w-full bg-card-bg border border-border rounded-lg p-8 sm:p-12 flex flex-col items-center justify-center text-center shadow-xs ${className}`}
      >
        {/* Circle Icon Container */}
        {icon && (
          <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center mb-5 shrink-0">
            {icon}
          </div>
        )}

        {/* Heading */}
        <h3 className="text-xl sm:text-[22px] font-bold text-primary-heading tracking-tight mb-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-secondary-subheading text-sm sm:text-[15px] leading-relaxed max-w-md mb-6">
          {description}
        </p>

        {/* Action Button */}
        {renderButton()}
      </div>
    </div>
  );
};

export default EmptyStateCard;
