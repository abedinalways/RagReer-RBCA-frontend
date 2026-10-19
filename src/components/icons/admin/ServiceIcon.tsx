import * as React from "react";

const ServiceIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ className, ...props }) => (
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
      d="M10.865 5.894a.75.75 0 0 1-.365-.644V1.5m0 0h-6A1.5 1.5 0 0 0 3 3v12a1.5 1.5 0 0 0 1.5 1.5h9A1.5 1.5 0 0 0 15 15v-.266M10.5 1.5a1.8 1.8 0 0 1 1.278.53l1.887 1.887M6 13.5h.75m4.023-3.274a1.5 1.5 0 0 0-.38.64l-.627 2.153a.375.375 0 0 0 .465.464l2.152-.627a1.5 1.5 0 0 0 .64-.38l3.01-3.007a1.593 1.593 0 1 0-2.253-2.252z"
    ></path>
  </svg>
);

export default ServiceIcon;
