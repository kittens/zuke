import { IconProps } from "./types";

export default function StarIcon({ size = 12, className = '' }: IconProps)
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
        stroke="url(#paint0_linear_36_2809)"
        fill="url(#paint0_linear_36_2809)"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 1L7.43845 4.00286L10.75 4.4377L8.3275 6.7284L8.93565 10L6 8.41285L3.06434 10L3.6725 6.7284L1.25 4.4377L4.56152 4.00286L6 1Z"
      />
      <defs>
        <linearGradient
          id="paint0_linear_36_2809"
          x1="6"
          y1="1"
          x2="6"
          y2="10"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F1E084" />
          <stop offset="1" stopColor="#F4DA48" />
        </linearGradient>
      </defs>
    </svg>
  );
}
