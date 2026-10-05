import * as React from "react";

const TermsIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
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
      d="M11.667 1.667H5.001a1.667 1.667 0 0 0-1.667 1.667v13.333a1.667 1.667 0 0 0 1.667 1.667h10a1.667 1.667 0 0 0 1.666-1.667v-10m-5-5a2 2 0 0 1 1.42.588l2.99 2.99a2 2 0 0 1 .59 1.422m-5-5v4.167a.833.833 0 0 0 .834.833h4.166M8.334 7.5H6.667m6.667 3.334H6.667m6.667 3.333H6.667"
    ></path>
  </svg>
);

export default TermsIcon;
