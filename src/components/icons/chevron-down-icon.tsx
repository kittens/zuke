import { IconProps } from "./types";

export default function ChevronDownIcon({ size = 12, className = '' }: IconProps)
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
        strokeWidth="1.5"
        strokeLinecap="square"
        d="M3 4.5L6 7.5L9 4.5"
      />
    </svg>
  );
}
