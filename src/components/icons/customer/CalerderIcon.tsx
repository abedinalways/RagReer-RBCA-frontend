import * as React from 'react';

const CalenderIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ className, ...props }) => (
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
      d="M6 1.5v2.25m6-2.25v2.25m-9.75 3h13.5M6 9.75h.008M9 9.75h.008m2.992 0h.008M6 12.75h.008m2.992 0h.008m2.992 0h.008M3.75 2.25h10.5a1.5 1.5 0 0 1 1.5 1.5v10.5a1.5 1.5 0 0 1-1.5 1.5H3.75a1.5 1.5 0 0 1-1.5-1.5V3.75a1.5 1.5 0 0 1 1.5-1.5"
    />
  </svg>
);

export default CalenderIcon;
