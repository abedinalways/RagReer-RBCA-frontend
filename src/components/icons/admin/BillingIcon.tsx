import * as React from "react";

const BillingIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
  className,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    fill="none"
    viewBox="0 0 28 28"
    className={className}
    {...props}
  >
    <path
      stroke="#5980A6"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M14.001 19.833V8.167m4.667 1.166h-7a2.333 2.333 0 1 0 0 4.667h4.667a2.333 2.333 0 1 1 0 4.667h-7M4.668 3.5a1.167 1.167 0 0 1 1.167-1.167c.289-.001.572.08.816.234l1.089.7a1.52 1.52 0 0 0 1.633 0l1.09-.7a1.52 1.52 0 0 1 1.633 0l1.089.7a1.52 1.52 0 0 0 1.633 0l1.088-.7a1.52 1.52 0 0 1 1.634 0l1.09.7a1.52 1.52 0 0 0 1.633 0l1.088-.7c.245-.154.528-.235.817-.234A1.167 1.167 0 0 1 23.335 3.5v21a1.167 1.167 0 0 1-1.167 1.167 1.5 1.5 0 0 1-.817-.234l-1.088-.7a1.52 1.52 0 0 0-1.634 0l-1.09.7a1.52 1.52 0 0 1-1.633 0l-1.088-.7a1.52 1.52 0 0 0-1.633 0l-1.089.7a1.52 1.52 0 0 1-1.633 0l-1.09-.7a1.52 1.52 0 0 0-1.633 0l-1.089.7a1.5 1.5 0 0 1-.816.234A1.167 1.167 0 0 1 4.668 24.5z"
    ></path>
  </svg>
);

export default BillingIcon;
