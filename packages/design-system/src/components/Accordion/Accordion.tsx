import React, { useId, useState } from 'react'
import { cx } from '../../utils/cx'
import styles from './Accordion.module.css'

export interface AccordionItem {
  id: string
  title: string
  content: React.ReactNode
  disabled?: boolean
}

export interface AccordionProps {
  items: AccordionItem[]
  /** Allow more than one item open at once */
  multiple?: boolean
  defaultOpen?: string[]
  className?: string
}

export function Accordion({ items, multiple = false, defaultOpen = [], className }: AccordionProps) {
  const uid = useId()
  const [open, setOpen] = useState<string[]>(defaultOpen)

  const toggle = (id: string) =>
    setOpen((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : multiple ? [...cur, id] : [id]))

  return (
    <div className={cx(styles.root, className)}>
      {items.map((item) => {
        const isOpen = open.includes(item.id)
        return (
          <div key={item.id} className={styles.item}>
            <h3 className={styles.heading}>
              <button
                type="button"
                className={styles.trigger}
                id={`${uid}-${item.id}-trigger`}
                aria-expanded={isOpen}
                aria-controls={`${uid}-${item.id}-panel`}
                disabled={item.disabled}
                onClick={() => toggle(item.id)}
              >
                <span>{item.title}</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className={styles.icon}>
                  <path d="M0 6h12" stroke="currentColor" strokeWidth="1.5" />
                  {!isOpen && <path d="M6 0v12" stroke="currentColor" strokeWidth="1.5" />}
                </svg>
              </button>
            </h3>
            <div
              id={`${uid}-${item.id}-panel`}
              role="region"
              aria-labelledby={`${uid}-${item.id}-trigger`}
              hidden={!isOpen}
              className={cx(styles.panel, item.disabled && styles.panelDisabled)}
            >
              {item.content}
            </div>
          </div>
        )
      })}
    </div>
  )
}
