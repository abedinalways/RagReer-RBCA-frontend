import * as React from "react";

const TimeIcon: React.FC<React.SVGProps<SVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="none"
    viewBox="0 0 16 16"
  >
    <path
      stroke="#5C5F60"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.332 1.333H6.665M8 9.333l-2-2M7.999 14.667A5.333 5.333 0 1 1 7.999 4a5.333 5.333 0 0 1 0 10.667"
    ></path>
  </svg>
);

export default TimeIcon;
