import React, { useId } from 'react'
import { cx } from '../../utils/cx'
import styles from './Input.module.css'

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Visible label. Always provide one. */
  label: string
  /** Supporting text under the field */
  helperText?: string
  /** Error message. When set, the field is shown in its error state. */
  errorText?: string
  /** Icon or element before the value */
  iconLeft?: React.ReactNode
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, helperText, errorText, iconLeft, disabled, className, id, ...props }, ref) => {
    const autoId = useId()
    const inputId = id ?? autoId
    const helperId = `${inputId}-helper`
    const hasError = Boolean(errorText)
    const message = hasError ? errorText : helperText

    return (
      <div className={cx(styles.root, className)}>
        <label className={styles.label} htmlFor={inputId}>
          {label}
        </label>
        <div className={cx(styles.field, hasError && styles.error, disabled && styles.disabled)}>
          {iconLeft && (
            <span className={styles.icon} aria-hidden="true">
              {iconLeft}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={styles.input}
            disabled={disabled}
            aria-invalid={hasError || undefined}
            aria-describedby={message ? helperId : undefined}
            {...props}
          />
        </div>
        {message && (
          <p id={helperId} className={cx(styles.helper, hasError && styles.helperError)}>
            {message}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
