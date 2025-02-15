import { IconProps } from "./types";

export default function PeopleIcon({ size = 12, className = '' }: IconProps)
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
        d="M1.75 3.5C1.75 2.39543 2.64543 1.5 3.75 1.5C4.85457 1.5 5.75 2.39543 5.75 3.5C5.75 4.60457 4.85457 5.5 3.75 5.5C2.64543 5.5 1.75 4.60457 1.75 3.5Z"
        fill="currentColor"
      />
      <path
        opacity="0.4"
        d="M6.25 3.5C6.25 2.39543 7.14545 1.5 8.25 1.5C9.35455 1.5 10.25 2.39543 10.25 3.5C10.25 4.60457 9.35455 5.5 8.25 5.5C7.14545 5.5 6.25 4.60457 6.25 3.5Z"
        fill="currentColor"
      />
      <path
        d="M3.75 6C5.48535 6 7.06995 7.4284 7.24875 9.96485C7.2585 10.1032 7.21035 10.2394 7.11575 10.3409C7.0212 10.4424 6.8887 10.5 6.75 10.5H0.75C0.611285 10.5 0.478804 10.4424 0.384228 10.3409C0.289653 10.2394 0.241485 10.1032 0.251239 9.96485C0.430034 7.4284 2.01467 6 3.75 6Z"
        fill="currentColor"
      />
      <path
        opacity="0.4"
        d="M11.2498 10.5H8.16395C8.2319 10.308 8.26065 10.102 8.24605 9.8945C8.14255 8.42655 7.61325 7.2051 6.81445 6.34955C7.2602 6.1191 7.7487 6 8.24975 6C9.9851 6 11.5697 7.4284 11.7485 9.96485C11.7689 10.2541 11.5398 10.5 11.2498 10.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
