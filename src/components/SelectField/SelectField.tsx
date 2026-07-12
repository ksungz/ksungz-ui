import { useId, type SelectHTMLAttributes } from 'react'
import { ChevronDown } from 'lucide-react'
import { cx } from '../../lib/cx'
import styles from './SelectField.module.scss'

export interface SelectOption {
  label: string
  value: string
  disabled?: boolean
}

export interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: SelectOption[]
  helperText?: string
  error?: string
  placeholder?: string
}

export function SelectField({
  className,
  error,
  helperText,
  id,
  label,
  options,
  placeholder = '선택해 주세요',
  required,
  ...props
}: SelectFieldProps) {
  const generatedId = useId()
  const selectId = id ?? generatedId
  const message = error ?? helperText
  const messageId = `${selectId}-message`

  return (
    <div className={cx(styles.field, className)}>
      <label className={styles.label} htmlFor={selectId}>{label}</label>
      <div className={cx(styles.control, error && styles.invalid)}>
        <select
          aria-describedby={message ? messageId : undefined}
          aria-invalid={Boolean(error)}
          className={styles.select}
          defaultValue=""
          id={selectId}
          required={required}
          {...props}
        >
          <option disabled value="">{placeholder}</option>
          {options.map((option) => (
            <option disabled={option.disabled} key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown aria-hidden="true" className={styles.chevron} size={18} />
      </div>
      {message && <p className={cx(styles.message, error && styles.error)} id={messageId}>{message}</p>}
    </div>
  )
}
