import * as React from "react";

const TotalHourIcon: React.FC<React.SVGProps<SVGElement>> = (props) => (
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
      d="M6.664 29.335h2.667m0 0h13.333m-13.333 0v-5.563c0-.707.28-1.385.781-1.885L15.997 16m6.667 13.334h2.667m-2.667 0v-5.563c0-.707-.281-1.385-.781-1.885L15.997 16M6.664 2.668h2.667m0 0h13.333m-13.333 0v5.563c0 .707.28 1.385.781 1.885l5.885 5.885m6.667-13.333h2.667m-2.667 0v5.563c0 .707-.281 1.385-.781 1.885l-5.886 5.885"
    ></path>
  </svg>
);

export default TotalHourIcon;
