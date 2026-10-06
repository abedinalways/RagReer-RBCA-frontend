import * as React from "react";

const SizeIcon: React.FC<React.SVGProps<SVGElement>> = (props) => (
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
      d="M10.833 5.833 7.25 2.25a2.01 2.01 0 0 0-2.833 0L2.25 4.417a2.01 2.01 0 0 0 0 2.833l3.583 3.583M6.666 5l1.667-1.667m6.667 10 1.666-1.667m-2.5-2.5 3.584 3.584c.783.783.783 2.05 0 2.833l-2.167 2.167a2 2 0 0 1-2.833 0l-3.584-3.584m3.334-10L15.833 7.5m1.812-1.824a2.35 2.35 0 1 0-3.322-3.322L3.201 13.478c-.193.193-.336.43-.416.692l-1.101 3.627a.417.417 0 0 0 .52.518l3.627-1.1c.26-.08.498-.222.691-.414z"
    ></path>
  </svg>
);

export default SizeIcon;
