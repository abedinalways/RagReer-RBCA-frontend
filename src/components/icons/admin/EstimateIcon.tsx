import * as React from "react";

const EstimateIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
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
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M13.999 8.166v17.5m3.5-3.5-3.5 3.5-3.5-3.5M2.332 14a1.17 1.17 0 0 0 .677 1.061l5.942 2.702M25.665 14a1.17 1.17 0 0 1-.688 1.073l-5.923 2.693m-9.722-5.668-6.3-2.87a1.167 1.167 0 0 1 0-2.136l9.998-4.55a2.33 2.33 0 0 1 1.937.001l10.022 4.562a1.166 1.166 0 0 1 0 2.136l-6.291 2.858"
    ></path>
  </svg>
);

export default EstimateIcon;
