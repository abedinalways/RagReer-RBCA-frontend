import * as React from "react";

const JobIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ className, ...props }) => (
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
      d="M10.001 10h.009m3.325-5V3.332a1.667 1.667 0 0 0-1.667-1.667H8.335a1.667 1.667 0 0 0-1.667 1.667v1.666m11.667 5.834a15.12 15.12 0 0 1-16.667 0m1.667-5.834h13.333c.92 0 1.667.747 1.667 1.667v8.333c0 .92-.747 1.667-1.667 1.667H3.335c-.92 0-1.667-.746-1.667-1.667V6.666c0-.92.746-1.667 1.667-1.667"
    ></path>
  </svg>
);

export default JobIcon;
