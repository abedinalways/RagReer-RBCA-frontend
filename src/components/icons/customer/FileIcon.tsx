import * as React from "react";

const FileIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
  stroke = "#5980A6",
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="26"
    height="26"
    fill="none"
    viewBox="0 0 26 26"
    {...props}
  >
    <path
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M15.167 2.166H6.5a2.167 2.167 0 0 0-2.166 2.167v17.333A2.167 2.167 0 0 0 6.5 23.833h13a2.167 2.167 0 0 0 2.167-2.167v-13m-6.5-6.5a2.6 2.6 0 0 1 1.846.765L20.9 6.818a2.6 2.6 0 0 1 .767 1.848m-6.5-6.5v5.417a1.084 1.084 0 0 0 1.083 1.083h5.417M13 12.999v6.5m-3.25-3.25L13 13l3.25 3.25"
    ></path>
  </svg>
);

export default FileIcon;
