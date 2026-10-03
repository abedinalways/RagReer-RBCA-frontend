import * as React from "react";

const InfoIcon: React.FC<React.SVGProps<SVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    fill="none"
    viewBox="0 0 18 18"
  >
    <path
      stroke="#A5A7A8"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12V9m0-3h.008M16.5 9a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0"
    ></path>
  </svg>
);

export default InfoIcon;
