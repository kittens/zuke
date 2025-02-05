import { IconProps } from "./types";

export default function NeutralIcon({ size = 14, className = '' }: IconProps)
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
      <rect width="1.2" height="1.2" transform="matrix(-1 0 0 1 4.2002 10.999)" fill="#747986" />
      <rect width="1.2" height="1.2" transform="matrix(-1 0 0 1 4.2002 9.19922)" fill="#747986" />
      <rect width="1.2" height="1.2" transform="matrix(-1 0 0 1 7.40039 10.999)" fill="#747986" />
      <rect width="1.2" height="1.2" transform="matrix(-1 0 0 1 7.40039 9.19922)" fill="#747986" />
      <rect width="1.2" height="1.2" transform="matrix(-1 0 0 1 7.40039 7.39941)" fill="#747986" />
      <rect width="1.2" height="1.2" transform="matrix(-1 0 0 1 7.40039 5.59961)" fill="#747986" />
      <rect width="1.2" height="1.2" transform="matrix(-1 0 0 1 7.40039 3.7998)" fill="#747986" />
      <rect width="1.2" height="1.2" transform="matrix(-1 0 0 1 7.40039 2)" fill="#747986" />
      <rect width="1.2" height="1.2" transform="matrix(-1 0 0 1 10.6001 10.999)" fill="#747986" />
      <rect width="1.2" height="1.2" transform="matrix(-1 0 0 1 10.6001 9.19922)" fill="#747986" />
      <rect width="1.2" height="1.2" transform="matrix(-1 0 0 1 10.6001 7.39941)" fill="#747986" />
      <rect width="1.2" height="1.2" transform="matrix(-1 0 0 1 10.6001 5.59961)" fill="#747986" />
    </svg>
  );
}
