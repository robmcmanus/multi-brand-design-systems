import React from 'react'
import { cx } from '../../utils/cx'
import styles from './Tag.module.css'

export type TagSize = 'sm' | 'md'

interface BaseProps {
  size?: TagSize
  className?: string
  children: React.ReactNode
}

export interface StaticTagProps extends BaseProps, Omit<React.HTMLAttributes<HTMLSpanElement>, 'children' | 'className'> {
  onClick?: undefined
}
export interface InteractiveTagProps extends BaseProps, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'> {
  /** Providing onClick makes the tag a toggle button */
  onClick: React.MouseEventHandler<HTMLButtonElement>
  selected?: boolean
}
export type TagProps = StaticTagProps | InteractiveTagProps

export function Tag(props: TagProps) {
  const { size = 'sm', className, children } = props

  if (props.onClick) {
    const { selected = false, size: _s, className: _c, children: _ch, ...rest } = props as InteractiveTagProps
    return (
      <button
        type="button"
        className={cx(styles.tag, styles[size], styles.interactive, selected && styles.selected, className)}
        aria-pressed={selected}
        {...rest}
      >
        {children}
      </button>
    )
  }
  const { size: _s, className: _c, children: _ch, onClick: _o, ...rest } = props as StaticTagProps
  return (
    <span className={cx(styles.tag, styles[size], className)} {...rest}>
      {children}
    </span>
  )
}
