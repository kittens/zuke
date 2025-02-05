import { IconProps } from "./types";

export default function MagnifierIcon({ size = 14, className = '' }: IconProps)
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
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M1.75195 7H2.91862M1.75195 4.08333H3.50195M1.75195 9.91667H3.50195M11.3747 9.625L12.833 11.0833M12.2519 7C12.2519 8.93299 10.6849 10.5 8.75195 10.5C6.81896 10.5 5.25195 8.93299 5.25195 7C5.25195 5.067 6.81896 3.5 8.75195 3.5C10.6849 3.5 12.2519 5.067 12.2519 7Z"
      />
    </svg>
  );
}