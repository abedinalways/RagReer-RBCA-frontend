import * as React from 'react';

const EstimateIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ className, ...props }) => (
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
      d="M10.5 1.5h-6A1.5 1.5 0 0 0 3 3v12a1.5 1.5 0 0 0 1.5 1.5h9A1.5 1.5 0 0 0 15 15V6m-4.5-4.5a1.8 1.8 0 0 1 1.278.53l2.691 2.69A1.8 1.8 0 0 1 15 6m-4.5-4.5v3.75a.75.75 0 0 0 .75.75H15m-7.5.75H6m6 3H6m6 3H6"
    />
  </svg>
);

export default EstimateIcon;
