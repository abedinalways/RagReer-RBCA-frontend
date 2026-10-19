import * as React from "react";

const PropertiesIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ className, ...props }) => (
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
      d="M7.5 9h3M7.5 6h3M10.5 15.75V13.5a1.5 1.5 0 1 0-3 0v2.25"
    ></path>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M4.5 7.5H3A1.5 1.5 0 0 0 1.5 9v5.25a1.5 1.5 0 0 0 1.5 1.5h12a1.5 1.5 0 0 0 1.5-1.5v-7.5a1.5 1.5 0 0 0-1.5-1.5h-1.5"
    ></path>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M4.5 15.75v-12A1.5 1.5 0 0 1 6 2.25h6a1.5 1.5 0 0 1 1.5 1.5v12"
    ></path>
  </svg>
);

export default PropertiesIcon;
