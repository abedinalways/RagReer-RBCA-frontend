import * as React from "react";

const ProfileIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 20 20"
    className={className}
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M15.835 17.5v-1.667A3.333 3.333 0 0 0 12.5 12.5h-5a3.333 3.333 0 0 0-3.333 3.333V17.5M13.335 5.833a3.333 3.333 0 1 1-6.667 0 3.333 3.333 0 0 1 6.667 0"
    ></path>
  </svg>
);

export default ProfileIcon;
