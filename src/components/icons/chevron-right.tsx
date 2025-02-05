import { IconProps } from "./types";

export default function ChevronRightIcon({ size = 14, className = '' }: IconProps)
{
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 14 14"
      className={className}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.552 7.00037L8.16667 11.3857L7.13545 10.3545L9.76045 7.72954L1.75 7.72954L1.75 6.2712L9.76045 6.2712L7.13545 3.6462L8.16667 2.61499L12.552 7.00037Z"
      />
    </svg>
  );
}
