import { IconProps } from "./types";

export default function HeartIcon({ size = 12, className = '' }: IconProps)
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
        strokeWidth="0.942857"
        strokeLinejoin="round"
        d="M10.5 5C10.5 7.875 6.375 10 6 10C5.625 10 1.5 7.875 1.5 5C1.5 3 2.75 2 4 2C5.25 2 6 2.75 6 2.75C6 2.75 6.75 2 8 2C9.25 2 10.5 3 10.5 5Z"
      />
    </svg>
  );
}
