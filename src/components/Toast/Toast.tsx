import * as ToastPrimitive from '@radix-ui/react-toast'
import { AlertTriangle, CheckCircle2, Info, X } from 'lucide-react'
import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { ToastContext, type ToastMessage } from './ToastContext'
import styles from './Toast.module.scss'

const icons = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<(ToastMessage & { id: number }) | null>(null)
  const [open, setOpen] = useState(false)

  const notify = useCallback((nextMessage: ToastMessage) => {
    setMessage({ ...nextMessage, id: Date.now() })
    setOpen(false)
    window.requestAnimationFrame(() => setOpen(true))
  }, [])

  const value = useMemo(() => ({ notify }), [notify])
  const variant = message?.variant ?? 'info'
  const Icon = icons[variant]

  return (
    <ToastContext.Provider value={value}>
      <ToastPrimitive.Provider duration={4500} swipeDirection="right">
        {children}
        {message && (
          <ToastPrimitive.Root
            className={`${styles.root} ${styles[variant]}`}
            key={message.id}
            onOpenChange={setOpen}
            open={open}
          >
            <Icon aria-hidden="true" className={styles.icon} size={20} />
            <div className={styles.copy}>
              <ToastPrimitive.Title className={styles.title}>{message.title}</ToastPrimitive.Title>
              {message.description && (
                <ToastPrimitive.Description className={styles.description}>
                  {message.description}
                </ToastPrimitive.Description>
              )}
            </div>
            <ToastPrimitive.Close aria-label="Dismiss notification" className={styles.close}>
              <X aria-hidden="true" size={18} />
            </ToastPrimitive.Close>
          </ToastPrimitive.Root>
        )}
        <ToastPrimitive.Viewport className={styles.viewport} />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  )
}
