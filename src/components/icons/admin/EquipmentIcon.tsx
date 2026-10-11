import * as React from "react";

const EquipmentIcon: React.FC<React.SVGProps<SVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="#5980A6"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.107-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.26 7.057l-7.91 7.91a2.121 2.121 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.26c.438.12.54.663.22.985z"
    ></path>
  </svg>
);

export default EquipmentIcon;
