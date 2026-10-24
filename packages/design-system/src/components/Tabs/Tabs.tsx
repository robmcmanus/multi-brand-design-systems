import React, { useId, useRef, useState } from 'react'
import { cx } from '../../utils/cx'
import styles from './Tabs.module.css'

export interface TabItem {
  id: string
  label: string
  disabled?: boolean
  /** Panel content. Omit when the tabs only switch state elsewhere (for example the brand switch). */
  content?: React.ReactNode
}

export interface TabsProps {
  items: TabItem[]
  value?: string
  defaultValue?: string
  onChange?: (id: string) => void
  /** Accessible name for the tab list */
  'aria-label': string
  className?: string
}

export function Tabs({ items, value, defaultValue, onChange, className, 'aria-label': ariaLabel }: TabsProps) {
  const uid = useId()
  const [internal, setInternal] = useState(defaultValue ?? items.find((i) => !i.disabled)?.id)
  const current = value ?? internal
  const refs = useRef<Record<string, HTMLButtonElement | null>>({})

  const select = (id: string) => {
    setInternal(id)
    onChange?.(id)
  }

  const move = (from: number, step: 1 | -1) => {
    const enabled = items.filter((i) => !i.disabled)
    if (enabled.length === 0) return
    const currentId = items[from].id
    const pos = enabled.findIndex((i) => i.id === currentId)
    const next = enabled[(pos + step + enabled.length) % enabled.length]
    refs.current[next.id]?.focus()
    select(next.id)
  }

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); move(index, 1) }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); move(index, -1) }
    else if (e.key === 'Home') { e.preventDefault(); const f = items.find((i) => !i.disabled); if (f) { refs.current[f.id]?.focus(); select(f.id) } }
    else if (e.key === 'End') { e.preventDefault(); const l = [...items].reverse().find((i) => !i.disabled); if (l) { refs.current[l.id]?.focus(); select(l.id) } }
  }

  return (
    <div className={className}>
      <div role="tablist" aria-label={ariaLabel} className={styles.list}>
        {items.map((item, index) => {
          const selected = item.id === current
          return (
            <button
              key={item.id}
              ref={(el) => { refs.current[item.id] = el }}
              role="tab"
              type="button"
              id={`${uid}-tab-${item.id}`}
              aria-selected={selected}
              aria-controls={item.content !== undefined ? `${uid}-panel-${item.id}` : undefined}
              tabIndex={selected ? 0 : -1}
              disabled={item.disabled}
              className={cx(styles.tab, selected && styles.selected)}
              onClick={() => select(item.id)}
              onKeyDown={(e) => onKeyDown(e, index)}
            >
              {item.label}
            </button>
          )
        })}
      </div>
      {items.map((item) =>
        item.content !== undefined ? (
          <div
            key={item.id}
            role="tabpanel"
            id={`${uid}-panel-${item.id}`}
            aria-labelledby={`${uid}-tab-${item.id}`}
            hidden={item.id !== current}
            className={styles.panel}
          >
            {item.content}
          </div>
        ) : null
      )}
    </div>
  )
}
