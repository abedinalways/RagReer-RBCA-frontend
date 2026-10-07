import * as React from "react";

const CrossIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
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
      strokeWidth="1.5"
      d="M21 7 7 21M7 7l14 14"
    ></path>
  </svg>
);

export default CrossIcon;
