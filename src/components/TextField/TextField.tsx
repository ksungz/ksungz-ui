import { useId, type InputHTMLAttributes, type ReactNode } from 'react'
import { AlertCircle } from 'lucide-react'
import { cx } from '../../lib/cx'
import styles from './TextField.module.scss'

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string
  helperText?: string
  error?: string
  leadingIcon?: ReactNode
  trailingAction?: ReactNode
}

export function TextField({
  className,
  error,
  helperText,
  id,
  label,
  leadingIcon,
  required,
  trailingAction,
  ...props
}: TextFieldProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const messageId = `${inputId}-message`
  const message = error ?? helperText

  return (
    <div className={cx(styles.field, className)}>
      <label className={styles.label} htmlFor={inputId}>
        {label}
        {required && <span className={styles.required}>Required</span>}
      </label>
      <div className={cx(styles.control, error && styles.invalid)}>
        {leadingIcon && <span className={styles.icon}>{leadingIcon}</span>}
        <input
          aria-describedby={message ? messageId : undefined}
          aria-invalid={Boolean(error)}
          className={styles.input}
          id={inputId}
          required={required}
          {...props}
        />
        {trailingAction && <span className={styles.action}>{trailingAction}</span>}
      </div>
      {message && (
        <p className={cx(styles.message, error && styles.error)} id={messageId}>
          {error && <AlertCircle aria-hidden="true" size={14} />}
          {message}
        </p>
      )}
    </div>
  )
}
