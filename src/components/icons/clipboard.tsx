import { IconProps } from "./types";

export default function ClipboardIcon({ size = 20, className = '' }: IconProps)
{
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 20 20"
      className={className}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 4H12.4V7.6H16V16H7.6V12.4H4V4ZM11.5 7.6H7.6V11.5H4.9V4.9H11.5V7.6Z"
      />
    </svg>
  );
}
