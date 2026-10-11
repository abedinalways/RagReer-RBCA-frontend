import * as React from "react";

const RefreshIcon: React.FC<React.SVGProps<SVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    fill="none"
    viewBox="0 0 18 18"
  >
    <path
      stroke="#5980A6"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M2.25 9A6.75 6.75 0 0 1 9 2.25a7.31 7.31 0 0 1 5.055 2.055L15.75 6M12 6h3.75V2.25m0 6.75A6.75 6.75 0 0 1 9 15.75a7.3 7.3 0 0 1-5.055-2.055L2.25 12m0 3.75V12H6"
    ></path>
  </svg>
);

export default RefreshIcon;
