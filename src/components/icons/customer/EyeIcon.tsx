import * as React from "react";

const EyeIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
  stroke = "#A5A7A8",
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      stroke="#A5A7A8"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M1.72 9.71a.83.83 0 0 0 0 .58 8.958 8.958 0 0 0 16.562 0 .83.83 0 0 0 0-.58 8.958 8.958 0 0 0-16.563 0"
    ></path>
    <path
      stroke="#A5A7A8"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"
    ></path>
  </svg>
);

export default EyeIcon;
