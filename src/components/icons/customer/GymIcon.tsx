import * as React from "react";

const GymIcon: React.FC<React.SVGProps<SVGElement>> = (props) => (
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
      d="M2.084 17.917 3.25 16.75m13.5-13.5 1.167-1.167M8 12l4-4m2.664 2.64a1.667 1.667 0 0 0 2.357-2.358L15.548 6.81a1.666 1.666 0 1 0 2.357-2.358l-2.357-2.356a1.667 1.667 0 0 0-2.357 2.356L11.718 2.98A1.667 1.667 0 0 0 9.36 5.337zM4.453 17.904a1.667 1.667 0 1 0 2.357-2.357l1.473 1.474a1.667 1.667 0 0 0 2.358-2.358L5.336 9.36a1.667 1.667 0 0 0-2.357 2.358l1.473 1.472a1.667 1.667 0 1 0-2.357 2.358z"
    ></path>
  </svg>
);

export default GymIcon;
