import React from "react";

export function NotificationBellIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M10.2676 21C10.4431 21.304 10.6956 21.5565 10.9996 21.732C11.3037 21.9075 11.6485 21.9999 11.9996 21.9999C12.3506 21.9999 12.6955 21.9075 12.9995 21.732C13.3036 21.5565 13.556 21.304 13.7316 21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.6793 2.00977C10.1456 2.09168 8.7018 2.75857 7.64512 3.87311C6.58844 4.98764 5.99939 6.46494 5.99927 8.00077C5.99927 12.4998 4.58827 13.9568 3.26127 15.3268C3.13063 15.4699 3.04442 15.648 3.01312 15.8393C2.98183 16.0306 3.00679 16.2268 3.08498 16.4042C3.16316 16.5815 3.2912 16.7323 3.45352 16.8382C3.61585 16.9442 3.80545 17.0006 3.99927 17.0008H19.9993C20.1931 17.0008 20.3827 16.9446 20.5451 16.8389C20.7076 16.7332 20.8358 16.5825 20.9142 16.4053C20.9926 16.228 21.0178 16.0318 20.9867 15.8406C20.9557 15.6493 20.8697 15.4711 20.7393 15.3278C19.9153 14.4778 19.0613 13.5968 18.5293 11.9798"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
