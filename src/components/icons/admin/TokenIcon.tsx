import * as React from "react";

const TokenIcon: React.FC<React.SVGProps<SVGElement>> = (props) => (
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
      d="M15.997 2.668a13.333 13.333 0 0 1 9.84 22.333m-9.84-17v8l5.334 2.667m-18-6.833a13.3 13.3 0 0 0-.667 4m1.107 5.5a13.3 13.3 0 0 0 3.24 4.533M6.179 6.981q.559-.608 1.188-1.142m4.156 22.722a13.33 13.33 0 0 0 10.174-.506"
    ></path>
  </svg>
);

export default TokenIcon;
