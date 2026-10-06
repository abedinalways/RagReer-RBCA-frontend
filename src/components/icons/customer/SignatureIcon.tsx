import * as React from "react";

const SignatureIcon: React.FC<React.SVGProps<SVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 20 20"
    {...(props as React.SVGProps<SVGSVGElement>)}
  >
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="m17.5 14.167-1.797-1.557a.416.416 0 0 0-.703.307v.417a.833.833 0 0 1-.833.833H12.5a.833.833 0 0 1-.833-.833c0-1.51-1.684-2.546-4.008-3.027m0 0c-.943-.196-1.991-.3-3.076-.307a2.083 2.083 0 0 0 0 4.167c1.486 0 2.425-1.735 3.076-3.86m0 0c.866-2.826 1.223-6.341 1.681-7.39a2.083 2.083 0 1 1 2.758 2.737M2.5 17.5h15"
    ></path>
  </svg>
);

export default SignatureIcon;
