import * as React from "react";

const InvoicesIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
  className,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    fill="none"
    viewBox="0 0 18 18"
    className={className}
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M9 12.75v-7.5M12 6H7.5a1.5 1.5 0 0 0 0 3h3a1.5 1.5 0 0 1 0 3H6M3 2.25a.75.75 0 0 1 .75-.75.98.98 0 0 1 .525.15l.7.45a.98.98 0 0 0 1.05 0l.7-.45a.98.98 0 0 1 1.05 0l.7.45a.98.98 0 0 0 1.05 0l.7-.45a.98.98 0 0 1 1.05 0l.7.45a.98.98 0 0 0 1.05 0l.7-.45a.98.98 0 0 1 .525-.15.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75.98.98 0 0 1-.525-.15l-.7-.45a.98.98 0 0 0-1.05 0l-.7.45a.97.97 0 0 1-1.05 0l-.7-.45a.98.98 0 0 0-1.05 0l-.7.45a.98.98 0 0 1-1.05 0l-.7-.45a.98.98 0 0 0-1.05 0l-.7.45a.98.98 0 0 1-.525.15.75.75 0 0 1-.75-.75z"
    ></path>
  </svg>
);

export default InvoicesIcon;
