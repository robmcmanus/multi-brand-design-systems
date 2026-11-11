import React from 'react'
import { cx } from '../../utils/cx'
import styles from './Chip.module.css'

export interface ChipProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  /** Whether the chip is selected. Rendered as aria-pressed. */
  selected?: boolean
  /** Called with the next selected value when the chip is toggled */
  onSelectedChange?: (selected: boolean) => void
  /** Optional leading icon. Replaced by the checkmark while selected. */
  icon?: React.ReactNode
}

const Check = () => (
  <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <polyline
      points="4,10.5 8,14.5 16,6"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

/**
 * Selection chip (Material 3 filter chip).
 * A toggle button: clicking flips `selected`. The leading checkmark replaces any icon
 * while selected. Visual height is 32px; the touch target extends to 48px.
 */
export const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  ({ selected = false, onSelectedChange, icon, onClick, className, children, ...props }, ref) => {
    const leading = selected ? <Check /> : icon

    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={selected}
        className={cx(styles.chip, selected && styles.selected, leading ? styles.withIcon : undefined, className)}
        onClick={(e) => {
          onClick?.(e)
          if (!e.defaultPrevented) onSelectedChange?.(!selected)
        }}
        {...props}
      >
        {leading && (
          <span className={cx(styles.icon, selected && styles.check)} aria-hidden="true">
            {leading}
          </span>
        )}
        <span className={styles.label}>{children}</span>
      </button>
    )
  }
)

Chip.displayName = 'Chip'
