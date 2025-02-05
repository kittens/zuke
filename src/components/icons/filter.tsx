import { IconProps } from "./types";

export default function FilterIcon({ size = 14, className = '' }: IconProps)
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
        stroke="currentColor"
        strokeWidth="1.16667"
        strokeLinecap="square"
        strokeLinejoin="round"
        d="M3.47255 11.6694V8.16795M3.47255 5.83373V2.33203M7.00086 11.6692V7.58397M7.00086 5.24991V2.33203M10.5292 11.6692V9.33491M10.5292 7.00087V2.33203M2.33203 8.16795H4.61306M5.86039 5.24991H8.1414M9.38874 9.33496H11.6697"
      />
    </svg>
  );
}
