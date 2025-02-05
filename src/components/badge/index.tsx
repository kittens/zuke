import classNames from "classnames"

export interface LabelProps
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
  color?: 'turqoise' | 'green' | 'yellow' | 'gray' | 'red'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  iconOnly?: boolean
  fullWidth?: boolean
  minWidth?: boolean
  noBorderRadiusOn?: "left" | 'right' | 'both'
  withShadow?: boolean
  withGlow?: boolean
  /**
   * textColor: Tailwind CSS color classes (e.g., 'indigo-500', 'lime-300'). This prop only accepts Tailwind color classes.
   */
  textColor?: string
  onClick?: () => void
}

export default function Label(props: LabelProps)
{
  const {
    children,
    startContent,
    endContent,
    variant = 'solid',
    color = 'turqoise',
    size = 'md',
    className = '',
    iconOnly = false,
    fullWidth = false,
    minWidth = true,
    textColor = '',
    noBorderRadiusOn = false,
    withShadow = false,
    withGlow = false,
    onClick,
  } = props

  function renderContent()
  {
    return (
      <>
        {startContent && startContent}
        {!iconOnly &&
          <p
            className="text-l-small text-[12px]"
            style={{ color: textColor ? textColor : 'inherit' }}
          >{children}</p>}
        {endContent && endContent}
      </>
    )
  }

  return (
    <span
      className={classNames({
        'bg-turqoise/10 text-turqoise badge-turqoise': color === 'turqoise',
        'badge-green': color === 'green',
        'badge-yellow': color === 'yellow',
        'badge-gray': color === 'gray',
        'badge-red': color === 'red',
        [variant]: true,
        [size]: true,
        [className]: className,
        'icon-only': iconOnly,
        'min-width': minWidth,
        'ghost': variant === 'ghost',
        'no-border-left': noBorderRadiusOn === 'left',
        'no-border-right': noBorderRadiusOn === 'right',
        'no-border': noBorderRadiusOn === 'both',
        'with-shadow': withShadow,
        'with-glow': withGlow,
      }, 'zuke-badge tabular-nums font-suisse-intl-mono flex items-center gap-1.5')
      }
      onClick={onClick}
    >
      {renderContent()}
    </span>
  )
}