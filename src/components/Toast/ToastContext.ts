import { createContext, useContext } from 'react'

export type ToastVariant = 'info' | 'success' | 'warning'

export interface ToastMessage {
  title: string
  description?: string
  variant?: ToastVariant
}

export interface ToastContextValue {
  notify: (message: ToastMessage) => void
}

export const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast() {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast must be used inside ToastProvider')
  }

  return context
}
