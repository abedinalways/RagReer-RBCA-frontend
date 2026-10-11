import * as React from "react";

const CalenderIcon: React.FC<React.SVGProps<SVGElement>> = (props) => (
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
      d="M16 14v2.2l1.6 1M16 2v3m5 2.338V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h2.338M3 9h5.859M8 2v3m14 11a6 6 0 1 1-12 0 6 6 0 0 1 12 0"
    ></path>
  </svg>
);

export default CalenderIcon;
