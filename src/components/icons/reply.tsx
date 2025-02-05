import { IconProps } from "./types";

export default function ReplyIcon({ size = 12, className = '' }: IconProps)
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
        d="M1.00195 6.00098L5.50195 2.00098V4.25098C9.75195 4.25098 11.002 5.75098 11.002 10.001C10.252 8.50098 9.75195 7.75098 5.50195 7.75098V10.001L1.00195 6.00098Z"
      />
    </svg>
  );
}
