import * as React from "react";

const ActiveJobIcon: React.FC<React.SVGProps<SVGElement>> = (props) => (
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
      d="M15.997 16.001h.014m5.32-8V5.335a2.667 2.667 0 0 0-2.667-2.667h-5.333a2.667 2.667 0 0 0-2.667 2.667V8m18.667 9.334a24.2 24.2 0 0 1-26.667 0M5.331 8h21.333a2.667 2.667 0 0 1 2.667 2.667v13.333a2.667 2.667 0 0 1-2.667 2.667H5.331a2.667 2.667 0 0 1-2.667-2.667V10.668a2.667 2.667 0 0 1 2.667-2.667"
    ></path>
  </svg>
);

export default ActiveJobIcon;
