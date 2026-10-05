import * as React from "react";

const WorkIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
  className,
  stroke = "currentColor",
  ...props
}) => (
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
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M10 10h.008m3.325-5V3.334a1.667 1.667 0 0 0-1.667-1.667H8.333a1.667 1.667 0 0 0-1.667 1.667V5m11.667 5.834a15.13 15.13 0 0 1-16.667 0M3.333 5h13.333c.92 0 1.667.747 1.667 1.667V15c0 .92-.746 1.667-1.667 1.667H3.333c-.92 0-1.667-.746-1.667-1.667V6.667c0-.92.746-1.667 1.667-1.667"
    ></path>
  </svg>
);

export default WorkIcon;
