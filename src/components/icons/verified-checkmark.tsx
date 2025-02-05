import { IconProps } from './types'

const VerifiedCheckmark = ({ className, size = 16 }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 20 20"
    className={className}
  >
    <g filter="url(#filter0_d_120_137)">
      <path d="M8.00163 4.19019L10.0016 2.19019L12.0016 4.19019H14.6683V6.85685L16.6683 8.85685L14.6683 10.8569V13.5235H12.0016L10.0016 15.5235L8.00163 13.5235H5.33496V10.8569L3.33496 8.85685L5.33496 6.85685V4.19019H8.00163Z" fill="url(#paint0_linear_120_137)" />
      <path d="M8.00163 4.19019L10.0016 2.19019L12.0016 4.19019H14.6683V6.85685L16.6683 8.85685L14.6683 10.8569V13.5235H12.0016L10.0016 15.5235L8.00163 13.5235H5.33496V10.8569L3.33496 8.85685L5.33496 6.85685V4.19019H8.00163Z" stroke="url(#paint1_linear_120_137)" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <g filter="url(#filter1_d_120_137)">
      <path d="M8 9.52311L9.33333 10.6898L11.6667 7.35645" stroke="#131517" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <defs>
      <filter id="filter0_d_120_137" x="0.154171" y="0.152131" width="19.6951" height="19.6952" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1.14286" />
        <feGaussianBlur stdDeviation="1.25714" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0.0643339 0 0 0 0 0.675189 0 0 0 0 0.885829 0 0 0 0.12 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_120_137" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_120_137" result="shape" />
      </filter>
      <filter id="filter1_d_120_137" x="5.84778" y="6.34684" width="7.97143" height="7.63818" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1.14286" />
        <feGaussianBlur stdDeviation="0.742857" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_120_137" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_120_137" result="shape" />
      </filter>
      <linearGradient id="paint0_linear_120_137" x1="10.0016" y1="2.19019" x2="10.0016" y2="15.5235" gradientUnits="userSpaceOnUse">
        <stop stopColor="#99D7EC" />
        <stop offset="1" stopColor="#74CBE9" />
      </linearGradient>
      <linearGradient id="paint1_linear_120_137" x1="10.0016" y1="2.19019" x2="10.0016" y2="15.5235" gradientUnits="userSpaceOnUse">
        <stop stopColor="#69C8E9" />
        <stop offset="1" stopColor="#5BCAF0" />
      </linearGradient>
    </defs>
  </svg>

)
export default VerifiedCheckmark
