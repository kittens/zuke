'use client'
import classNames from "classnames"
import { TextScramble } from "../effects/text-scramble"
import { useState } from "react"

interface Props
{
  children?: React.ReactNode
  /**
   * startContent: Mainly used for icons or other elements that should be placed at the start of the button, accepts ReactNode.
   */
  startContent?: React.ReactNode
  /**
   * endContent: Mainly used for icons or other elements that should be placed at the end of the button, accepts ReactNode.
   */
  endContent?: React.ReactNode
  variant?: 'solid' | 'ghost'
  color?: 'turqoise' | 'gray' | 'red'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  newBg?: boolean
  className?: string
  iconOnly?: boolean
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  minWidth?: boolean
  noBorderRadiusOn?: "left" | 'right' | 'both'
  withGlow?: boolean
  animate?: boolean
  /**
   * textColor: Tailwind CSS color classes (e.g., 'indigo-500', 'lime-300'). This prop only accepts Tailwind color classes.
   */
  textColor?: string
  onClick?: () => void
  id?: string
}

export default function Button(props: Props)
{
  const {
    children,
    startContent,
    endContent,
    variant = 'solid',
    color = 'turqoise',
    size = 'md',
    className = '',
    newBg = false,
    iconOnly = false,
    disabled = false,
    loading = false,
    fullWidth = false,
    minWidth = true,
    textColor = '',
    noBorderRadiusOn = false,
    withGlow = true,
    onClick,
    id,
    animate = true,
  } = props

  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  function renderContent()
  {
    if (loading) {
      return (
        <span>
          <svg
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            className="fui-BaseButtonSpinner"
          >
            <path
              fill="currentColor"
              d="M7.229 1.173a9.25 9.25 0 1011.655 11.412 1.25 1.25 0 10-2.4-.698 6.75 6.75 0 11-8.506-8.329 1.25 1.25 0 10-.75-2.385z"
            ></path>
          </svg>
        </span>
      )
    }

    return (
      <span
        className={classNames({
          '!scale-y-[0.85]': isClicking,
          'transition-all duration-100': true,
          'flex items-center gap-1.5 group': true,
        })}
        style={{ pointerEvents: 'none' }}
      >
        {startContent && startContent}
        {!iconOnly && (animate ?
          <TextScramble
            trigger={animate ? isHovering : false}
            as="span"
            speed={0.00095}
            duration={0.13}
            style={{ color: textColor ? textColor : 'inherit' }}
          >{children?.toString() as string}</TextScramble>
          :
          <span>{children}</span>
        )}
        {endContent && endContent}
      </span>
    )
  }

  return (
    <button
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() =>
      {
        setIsHovering(false);
        setIsClicking(false);
      }}
      id={id}
      className={classNames({
        [variant]: true,
        [size]: true,
        [className]: className,
        'px-2 text-l-small': size === 'md',
        'px-2 text-l-small !h-[28px]': size === 'sm',
        'bg-turqoise/15 text-turqoise': color === 'turqoise',
        'bg-[rgba(116,121,134,0.18)] text-white': color === 'gray',
        'icon-only': iconOnly,
        'loading': loading,
        'disabled': disabled,
        'min-width': minWidth,
        'ghost': variant === 'ghost',
        'no-border-left': noBorderRadiusOn === 'left',
        'no-border-right': noBorderRadiusOn === 'right',
        'no-border': noBorderRadiusOn === 'both',
        'button-new-bg': newBg,
        'zuke-button-turqoise-glow': color === 'turqoise' && withGlow,
        'zuke-button-gray-glow': color === 'gray' && withGlow,
        'zuke-button-red-glow': color === 'red' && withGlow,
      }, 'zuke-button tabular-nums group')}
      disabled={disabled}
      onClick={onClick}
      data-hovering={isHovering}
      onMouseDown={() => setIsClicking(true)}
      onMouseUp={() => setIsClicking(false)}
      style={{ cursor: disabled ? 'default' : 'pointer' }}
    >
      {renderContent()}
    </button>
  )
}