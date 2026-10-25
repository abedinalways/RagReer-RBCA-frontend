import * as React from "react";

const FlagIcon: React.FC<React.SVGProps<SVGElement>> = (props) => (
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
      d="M5.336 29.335v-8.63m0 0V5.335a1.33 1.33 0 0 1 .533-1.067 8 8 0 0 1 4.8-1.6c4 0 6.667 2.667 9.778 2.667q2.665 0 4.089-1.067a1.334 1.334 0 0 1 2.133 1.067v13.333a1.33 1.33 0 0 1-.533 1.067 8 8 0 0 1-4.8 1.6c-4 0-6.667-2.667-10.667-2.667a8 8 0 0 0-5.333 2.037"
    ></path>
  </svg>
);

export default FlagIcon;
