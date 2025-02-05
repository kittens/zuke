import { IconProps } from "./types";

export default function RetweetIcon({ size = 12, className = '' }: IconProps)
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
        strokeLinecap="round"
        d="M8.5 10.5L10 9L8.5 7.5M3.5 1.5L2 3L3.5 4.5M2.5 3H10V5.5M2 6.5V9H9.5"
      />
    </svg>
  );
}
