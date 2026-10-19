import * as React from "react";

const PropertyIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 20 20"
    className={className}
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M8.332 10h3.333M8.332 6.666h3.333M11.665 17.5V15a1.667 1.667 0 1 0-3.333 0v2.5"
    ></path>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M5.001 8.334H3.335a1.667 1.667 0 0 0-1.667 1.667v5.833a1.667 1.667 0 0 0 1.667 1.667h13.333a1.667 1.667 0 0 0 1.667-1.667V7.501a1.667 1.667 0 0 0-1.667-1.667h-1.667"
    ></path>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M5 17.5V4.167A1.667 1.667 0 0 1 6.667 2.5h6.666A1.666 1.666 0 0 1 15 4.167V17.5"
    ></path>
  </svg>
);

export default PropertyIcon;
