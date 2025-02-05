import { IconProps } from "./types";

export default function ChevronTopRightIcon({ size = 12, className = '' }: IconProps)
{
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 12 12"
      className={className}
    >
      <path
        stroke="url(#paint0_linear_120_142)"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 7.5V3M9 3H4.5M9 3L3.125 8.875"
      />
      <defs>
        <linearGradient
          id="paint0_linear_120_142"
          x1="6.0625"
          y1="3"
          x2="6.0625"
          y2="8.875"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#9FEC93" />
          <stop offset="1" stopColor="#6CEE57" />
        </linearGradient>
      </defs>
    </svg>
  );
}
