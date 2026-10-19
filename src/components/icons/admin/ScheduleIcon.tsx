import * as React from "react";

const ScheduleIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ className, ...props }) => (
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
      d="M12 10.5v1.65l1.2.75M12 1.5v2.25m3.75 1.753V3.75a1.5 1.5 0 0 0-1.5-1.5H3.75a1.5 1.5 0 0 0-1.5 1.5v10.5a1.5 1.5 0 0 0 1.5 1.5h1.753m-3.253-9h4.394M6 1.5v2.25M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0"
    ></path>
  </svg>
);

export default ScheduleIcon;
