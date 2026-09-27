import * as React from 'react';

const ContractIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ className, ...props }) => (
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
      d="m15.75 12.75-1.617-1.4a.375.375 0 0 0-.633.275V12a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1-.75-.75c0-1.358-1.515-2.29-3.607-2.724m0 0A14.3 14.3 0 0 0 4.125 9a1.875 1.875 0 0 0 0 3.75c1.337 0 2.182-1.561 2.768-3.474m0 0c.78-2.543 1.1-5.707 1.513-6.65a1.875 1.875 0 1 1 2.483 2.462M2.25 15.75h13.5"
    />
  </svg>
);

export default ContractIcon;
