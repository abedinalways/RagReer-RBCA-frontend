import * as React from "react";

const GardenIcon: React.FC<React.SVGProps<SVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 20 20"
  >
    <path
      stroke="#1D1F20"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M10 4.167a2.5 2.5 0 1 1 2.5 2.5m-2.5-2.5a2.5 2.5 0 1 0-2.5 2.5m2.5-2.5V5m2.5 1.667a2.5 2.5 0 1 1-2.5 2.5m2.5-2.5h-.834m-4.166 0a2.5 2.5 0 1 0 2.5 2.5m-2.5-2.5h.833M10 5c-.92 0-1.667.747-1.667 1.667M10 5c.92 0 1.666.747 1.666 1.667M10 9.167v-.833M8.333 6.667c0 .92.746 1.667 1.667 1.667m1.666-1.667c0 .92-.746 1.667-1.666 1.667m0 0v10m0 0c3.5 0 5.833-1.39 5.833-4.167-3.5 0-5.833 1.39-5.833 4.167m0 0c-3.5 0-5.833-1.39-5.833-4.167 3.5 0 5.833 1.39 5.833 4.167"
    ></path>
  </svg>
);

export default GardenIcon;
