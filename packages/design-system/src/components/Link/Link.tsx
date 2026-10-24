import React from 'react'
import { cx } from '../../utils/cx'
import styles from './Link.module.css'

export type LinkVariant = 'inline' | 'standalone'

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Inline sits inside body copy. Standalone stands on its own line with an arrow. */
  variant?: LinkVariant
  /** Opens in a new tab and shows an external icon */
  external?: boolean
}

const Arrow = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M0 6h12M7 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)
const External = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M1 11L11 1M4 1h7v7" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ variant = 'inline', external = false, className, children, ...props }, ref) => (
    <a
      ref={ref}
      className={cx(styles.link, styles[variant], className)}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...props}
    >
      {children}
      {external ? (
        <span className={styles.icon}><External /></span>
      ) : variant === 'standalone' ? (
        <span className={styles.icon}><Arrow /></span>
      ) : null}
    </a>
  )
)
Link.displayName = 'Link'
