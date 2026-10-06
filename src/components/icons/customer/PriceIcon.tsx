import * as React from "react";

const PriceIcon: React.FC<React.SVGProps<SVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
    {...(props as React.SVGProps<SVGSVGElement>)}
  >
    <path
      stroke="#1D1F20"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 0 1 0 4H8m4 2V6m10 6c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10"
    ></path>
  </svg>
);

export default PriceIcon;
