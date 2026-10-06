import * as React from "react";

const AgreementIcon: React.FC<React.SVGProps<SVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
    {...(props as React.SVGProps<SVGSVGElement>)}
  >
    <path
      stroke="#1D1F20"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M14.487 7.858A1 1 0 0 1 14 7V2m0 0H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-.355M14 2a2.4 2.4 0 0 1 1.704.706l2.516 2.516M8 18h1m5.364-4.366a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837c.323-.094.616-.268.854-.506l4.013-4.009a2.124 2.124 0 1 0-3.004-3.004z"
    ></path>
  </svg>
);

export default AgreementIcon;
