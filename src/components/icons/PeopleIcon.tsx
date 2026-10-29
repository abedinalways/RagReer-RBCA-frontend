import * as React from "react";

const PeopleIcon: React.FC<React.SVGProps<SVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    fill="none"
    viewBox="0 0 18 18"
  >
    <path
      stroke="#5980A6"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M12 15.75v-1.5a3 3 0 0 0-3-3H4.5a3 3 0 0 0-3 3v1.5M12 2.346a3 3 0 0 1 0 5.808m4.5 7.596v-1.5a3 3 0 0 0-2.25-2.902M9.75 5.25a3 3 0 1 1-6 0 3 3 0 0 1 6 0"
    ></path>
  </svg>
);

export default PeopleIcon;
