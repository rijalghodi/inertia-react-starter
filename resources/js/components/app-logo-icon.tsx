import type { SVGAttributes } from "react";

export default function AppLogoIcon({ resetColor, ...props }: SVGAttributes<SVGElement> & { resetColor?: boolean }) {
  return (
    <svg width="500" height="500" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath="url(#clip0_2_11)">
        <path
          d="M250 487.5C190.5 487.5 143.75 471.067 109.75 438.2C75.75 404.767 58.75 359.433 58.75 302.2V11.5H165V301.35C165 330.817 172.367 353.767 187.1 370.2C201.833 386.633 222.8 394.85 250 394.85C276.633 394.85 297.317 386.633 312.05 370.2C327.35 353.767 335 330.817 335 301.35V11.5H441.25V302.2C441.25 359.433 423.967 404.767 389.4 438.2C354.833 471.067 308.367 487.5 250 487.5Z"
          fill="url(#paint0_linear_2_11)"
        />
      </g>
      <defs>
        <linearGradient id="paint0_linear_2_11" x1="250" y1="-227" x2="250" y2="573" gradientUnits="userSpaceOnUse">
          <stop stopColor={resetColor ? "currentColor" : "#875F67"} />
          <stop offset="1" stopColor={resetColor ? "currentColor" : "#4D1520"} />
        </linearGradient>
        <clipPath id="clip0_2_11">
          <rect width="500" height="500" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
