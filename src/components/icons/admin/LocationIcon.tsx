import * as React from "react";

const LocationIcon: React.FC<React.SVGProps<SVGElement>> = (props) => (
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
      d="M4.001 13.333c0 .736 1.791 1.333 4 1.333s4-.597 4-1.333M6.335 6a1.667 1.667 0 1 0 3.333 0 1.667 1.667 0 0 0-3.333 0Zm.828 5.662a1.21 1.21 0 0 0 1.676 0c2.06-1.995 4.819-4.224 3.473-7.46-.727-1.75-2.474-2.869-4.31-2.869-1.838 0-3.584 1.12-4.312 2.87-1.344 3.23 1.409 5.47 3.473 7.46Z"
    ></path>
  </svg>
);

export default LocationIcon;
