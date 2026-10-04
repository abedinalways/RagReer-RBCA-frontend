import * as React from "react";

const CarIcon: React.FC<React.SVGProps<SVGElement>> = (props) => (
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
      d="m17.5 6.666-1.667 1.667m0 0-1.25-3.083a1.67 1.67 0 0 0-1.545-1.084H7a1.67 1.67 0 0 0-1.586 1.048l-1.247 3.12m11.666 0H4.167m11.666 0c.92 0 1.667.745 1.667 1.666v3.333c0 .92-.746 1.667-1.667 1.667M4.167 8.333 2.5 6.666m1.667 1.667C3.247 8.333 2.5 9.08 2.5 10v3.333c0 .92.746 1.667 1.667 1.667m1.666-3.334h.009m8.325 0h.008M15.833 15H4.167m11.666 0v1.666M4.167 15v1.666"
    ></path>
  </svg>
);

export default CarIcon;
