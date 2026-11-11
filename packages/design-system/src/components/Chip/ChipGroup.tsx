import React from 'react'
import { cx } from '../../utils/cx'
import { Chip } from './Chip'
import styles from './Chip.module.css'

export interface ChipOption {
  value: string
  label: React.ReactNode
  icon?: React.ReactNode
  disabled?: boolean
}

export interface ChipGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Accessible name for the group, e.g. "Filter by genre" */
  label: string
  options: ChipOption[]
  /** Selected values */
  value: string[]
  onChange: (value: string[]) => void
  /** Allow more than one chip to be selected. Default true. */
  multiple?: boolean
  disabled?: boolean
}

/**
 * A wrapping group of selection chips. Each chip is a toggle button (aria-pressed),
 * so the group works with Tab and Space/Enter without extra keyboard handling.
 */
export function ChipGroup({
  label,
  options,
  value,
  onChange,
  multiple = true,
  disabled = false,
  className,
  ...props
}: ChipGroupProps) {
  const toggle = (v: string, next: boolean) => {
    if (multiple) onChange(next ? [...value, v] : value.filter((x) => x !== v))
    else onChange(next ? [v] : [])
  }

  return (
    <div role="group" aria-label={label} className={cx(styles.group, className)} {...props}>
      {options.map((o) => (
        <Chip
          key={o.value}
          icon={o.icon}
          selected={value.includes(o.value)}
          disabled={disabled || o.disabled}
          onSelectedChange={(next) => toggle(o.value, next)}
        >
          {o.label}
        </Chip>
      ))}
    </div>
  )
}
