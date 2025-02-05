import { IconProps } from "../icons/types";

export default function LightningIcon({ size = 20, className = '' }: IconProps)
{
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M12.5921 2.68813C12.6661 2.18825 12.0364 1.9067 11.7132 2.29509L3.53783 12.1178C3.26674 12.4435 3.49836 12.9376 3.92214 12.9376H8.12211C8.42739 12.9376 8.66141 13.2088 8.61673 13.5108L7.90634 18.312C7.83237 18.8119 8.462 19.0935 8.78526 18.7051L16.9606 8.88245C17.2317 8.55673 17.0001 8.06259 16.5763 8.06259H12.3763C12.0711 8.06259 11.837 7.7914 11.8817 7.48941L12.5921 2.68813Z" fill="black" />
      <path d="M12.5921 2.68813C12.6661 2.18825 12.0364 1.9067 11.7132 2.29509L3.53783 12.1178C3.26674 12.4435 3.49836 12.9376 3.92214 12.9376H8.12211C8.42739 12.9376 8.66141 13.2088 8.61673 13.5108L7.90634 18.312C7.83237 18.8119 8.462 19.0935 8.78526 18.7051L16.9606 8.88245C17.2317 8.55673 17.0001 8.06259 16.5763 8.06259H12.3763C12.0711 8.06259 11.837 7.7914 11.8817 7.48941L12.5921 2.68813Z" fill="url(#paint0_linear_64_5351)" />
      <defs>
        <linearGradient id="paint0_linear_64_5351" x1="10.2492" y1="-2.97133" x2="10.2492" y2="20.0744" gradientUnits="userSpaceOnUse">
          <stop stopColor="#9CE6FF" />
          <stop offset="1" stopColor="#1AC4FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}
