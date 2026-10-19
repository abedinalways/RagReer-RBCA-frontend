import * as React from "react";

const ActivityIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
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
      strokeWidth="2"
      d="m11.666 11.667-7.183 7.19a2.33 2.33 0 0 0-.584.971l-1.542 5.087a.583.583 0 0 0 .726.728l5.084-1.544c.366-.112.698-.312.968-.583l7.187-7.192m-4.656-4.657L2.333 2.334m9.333 9.333 4.656 4.656m0 0 .01-.01m-.01.01 9.344 9.344m-10.7-17.299 2.538-2.53m0 0 2.548-2.54a3.29 3.29 0 0 1 4.65 4.65l-2.544 2.544m-4.654-4.654-.005-.004m.005.004 4.654 4.655m0 0-2.534 2.534m2.534-2.534.008.008"
    ></path>
  </svg>
);

export default ActivityIcon;
