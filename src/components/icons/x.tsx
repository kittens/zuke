import { IconProps } from "./types";

export default function XIcon({ size = 16, className = '' }: IconProps)
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
        d="M11.602 2.333h1.921L9.326 7.134l4.938 6.533h-3.866L7.369 9.705l-3.465 3.962H1.982l4.49-5.135-4.738-6.199H5.7l2.737 3.622 3.166-3.622Zm-.674 10.183h1.064L5.12 3.424H3.978l6.95 9.092Z"
      />
    </svg>
  );
}