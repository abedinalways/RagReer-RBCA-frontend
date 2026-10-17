import * as React from "react";

const JobsIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    fill="none"
    viewBox="0 0 18 18"
    className={className}
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M9 9h.008M12 4.5V3a1.5 1.5 0 0 0-1.5-1.5h-3A1.5 1.5 0 0 0 6 3v1.5m10.5 5.25a13.61 13.61 0 0 1-15 0M3 4.5h12A1.5 1.5 0 0 1 16.5 6v7.5A1.5 1.5 0 0 1 15 15H3a1.5 1.5 0 0 1-1.5-1.5V6A1.5 1.5 0 0 1 3 4.5"
    ></path>
  </svg>
);

export default JobsIcon;
