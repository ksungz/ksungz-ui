import type { HTMLAttributes } from 'react'
import { cx } from '../../lib/cx'
import styles from './Badge.module.scss'

export type BadgeVariant = 'neutral' | 'info' | 'success' | 'warning' | 'danger'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  showDot?: boolean
}

export function Badge({ children, className, showDot = false, variant = 'neutral', ...props }: BadgeProps) {
  return (
    <span className={cx(styles.badge, styles[variant], className)} {...props}>
      {showDot && <span aria-hidden="true" className={styles.dot} />}
      {children}
    </span>
  )
}
