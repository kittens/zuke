import { IconProps } from "./types";

export default function CheckmarkIcon({ size = 20, className = '' }: IconProps)
{
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
      className={className}
    >
      <path
        stroke="currentColor"
        d="M3 15L9.29412 20L21 4"
        strokeWidth="2"
        strokeLinecap="square"
      />
    </svg>
  );
}