import * as React from "react";

const RateIcon: React.FC<React.SVGProps<SVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    fill="none"
    viewBox="0 0 32 32"
  >
    <path
      stroke="#5980A6"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M21.33 10.668h-8a2.667 2.667 0 1 0 0 5.333h5.334a2.667 2.667 0 0 1 0 5.334h-8M15.997 24v-16m13.334 8c0 7.364-5.97 13.334-13.334 13.334S2.664 23.365 2.664 16 8.634 2.668 15.997 2.668s13.334 5.97 13.334 13.333"
    ></path>
  </svg>
);

export default RateIcon;
