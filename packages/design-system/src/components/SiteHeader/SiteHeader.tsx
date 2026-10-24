import React, { useId, useState } from 'react'
import { cx } from '../../utils/cx'
import styles from './SiteHeader.module.css'

export interface NavLink {
  label: string
  href: string
  current?: boolean
}

export interface SiteHeaderProps {
  logo: React.ReactNode
  /** Where the logo links to */
  logoHref?: string
  items: NavLink[]
  className?: string
}

export function SiteHeader({ logo, logoHref = '/', items, className }: SiteHeaderProps) {
  const [open, setOpen] = useState(false)
  const menuId = useId()

  const links = items.map((item) => (
    <li key={item.href}>
      <a href={item.href} className={cx(styles.item, item.current && styles.current)} aria-current={item.current ? 'page' : undefined}>
        {item.label}
      </a>
    </li>
  ))

  return (
    <header className={cx(styles.header, className)}>
      <div className={styles.bar}>
        <a href={logoHref} className={styles.logo}>{logo}</a>
        <nav aria-label="Primary" className={styles.desktop}>
          <ul className={styles.list}>{links}</ul>
        </nav>
        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <svg width="16" height="14" viewBox="0 0 16 14" fill="none" aria-hidden="true">
            {open ? (
              <path d="M1 1l14 12M15 1L1 13" stroke="currentColor" strokeWidth="1.5" />
            ) : (
              <path d="M0 1h16M0 7h16M0 13h16" stroke="currentColor" strokeWidth="1.5" />
            )}
          </svg>
        </button>
      </div>
      <nav id={menuId} aria-label="Primary mobile" hidden={!open} className={styles.mobile}>
        <ul className={styles.mobileList}>{links}</ul>
      </nav>
    </header>
  )
}
