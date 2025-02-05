import { IconProps } from "./types";

export default function CrossIcon({ size = 16, className = '' }: IconProps)
{
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 16 16"
      className={className}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.33281 2.15454L7.99947 6.82119L12.6661 2.15454L13.8447 3.33305L9.178 7.99973L13.8447 12.6664L12.6661 13.8449L7.99947 9.17826L3.33281 13.8449L2.1543 12.6664L6.82094 7.99973L2.1543 3.33305L3.33281 2.15454Z"
      />
    </svg>
  );
}
