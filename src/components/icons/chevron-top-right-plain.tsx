import { IconProps } from "./types";

export default function ChevronTopRightPlainIcon({ size = 12, className = '' }: IconProps)
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
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 7.5V3M9 3H4.5M9 3L3.125 8.875"
      />
    </svg>
  );
}
