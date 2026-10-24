import React, { useEffect, useId, useRef, useState } from 'react'
import { cx } from '../../utils/cx'
import styles from './Select.module.css'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps {
  label: string
  options: SelectOption[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  placeholder?: string
  helperText?: string
  errorText?: string
  disabled?: boolean
  className?: string
}

export function Select({
  label,
  options,
  value,
  defaultValue,
  onChange,
  placeholder = 'Select an option',
  helperText,
  errorText,
  disabled = false,
  className,
}: SelectProps) {
  const id = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const [internal, setInternal] = useState(defaultValue)
  const current = value ?? internal
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)

  const selectedIndex = options.findIndex((o) => o.value === current)
  const selected = selectedIndex >= 0 ? options[selectedIndex] : undefined
  const hasError = Boolean(errorText)
  const message = hasError ? errorText : helperText

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open])

  const openMenu = () => {
    if (disabled) return
    setActive(selectedIndex >= 0 ? selectedIndex : firstEnabled(options, 0, 1))
    setOpen(true)
  }

  const choose = (i: number) => {
    const opt = options[i]
    if (!opt || opt.disabled) return
    setInternal(opt.value)
    onChange?.(opt.value)
    setOpen(false)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        open ? setActive((a) => firstEnabled(options, a + 1, 1)) : openMenu()
        break
      case 'ArrowUp':
        e.preventDefault()
        open ? setActive((a) => firstEnabled(options, a - 1, -1)) : openMenu()
        break
      case 'Home':
        if (open) { e.preventDefault(); setActive(firstEnabled(options, 0, 1)) }
        break
      case 'End':
        if (open) { e.preventDefault(); setActive(firstEnabled(options, options.length - 1, -1)) }
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        open ? choose(active) : openMenu()
        break
      case 'Escape':
        if (open) { e.preventDefault(); setOpen(false) }
        break
      case 'Tab':
        setOpen(false)
        break
    }
  }

  return (
    <div ref={rootRef} className={cx(styles.root, className)}>
      <span className={styles.label} id={`${id}-label`}>{label}</span>
      <div className={styles.control}>
        <button
          type="button"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={`${id}-list`}
          aria-labelledby={`${id}-label ${id}-value`}
          aria-activedescendant={open ? `${id}-opt-${active}` : undefined}
          aria-invalid={hasError || undefined}
          aria-describedby={message ? `${id}-helper` : undefined}
          disabled={disabled}
          className={cx(styles.trigger, hasError && styles.error)}
          onClick={() => (open ? setOpen(false) : openMenu())}
          onKeyDown={onKeyDown}
        >
          <span id={`${id}-value`} className={cx(styles.value, !selected && styles.placeholder)}>
            {selected ? selected.label : placeholder}
          </span>
          <svg className={cx(styles.chevron, open && styles.chevronOpen)} width="12" height="6" viewBox="0 0 12 6" fill="none" aria-hidden="true">
            <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
        {open && (
          <ul id={`${id}-list`} role="listbox" aria-labelledby={`${id}-label`} className={styles.menu}>
            {options.map((o, i) => (
              <li
                key={o.value}
                id={`${id}-opt-${i}`}
                role="option"
                aria-selected={o.value === current}
                aria-disabled={o.disabled || undefined}
                className={cx(styles.option, i === active && styles.active, o.value === current && styles.selected, o.disabled && styles.optionDisabled)}
                onMouseEnter={() => !o.disabled && setActive(i)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => choose(i)}
              >
                {o.label}
                {o.value === current && (
                  <svg width="12" height="9" viewBox="0 0 12 9" fill="none" aria-hidden="true">
                    <path d="M1 5l3 3 7-7" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      {message && <p id={`${id}-helper`} className={cx(styles.helper, hasError && styles.helperError)}>{message}</p>}
    </div>
  )
}

function firstEnabled(options: SelectOption[], from: number, step: 1 | -1): number {
  const n = options.length
  if (n === 0) return 0
  let i = Math.min(Math.max(from, 0), n - 1)
  for (let c = 0; c < n; c++) {
    if (!options[i].disabled) return i
    i += step
    if (i < 0 || i >= n) return Math.min(Math.max(from, 0), n - 1)
  }
  return Math.min(Math.max(from, 0), n - 1)
}
