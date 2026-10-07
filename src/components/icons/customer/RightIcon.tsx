import * as React from "react";

const RightIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
  stroke = "#5980A6",
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    fill="none"
    viewBox="0 0 28 28"
    {...props}
  >
    <path
      stroke="#5980A6"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M23.333 7 10.5 19.833 4.667 14"
    ></path>
  </svg>
);

export default RightIcon;
