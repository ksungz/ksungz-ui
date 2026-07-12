import * as TabsPrimitive from '@radix-ui/react-tabs'
import type { ReactNode } from 'react'
import styles from './Tabs.module.scss'

export interface TabItem {
  value: string
  label: string
  content: ReactNode
  count?: number
  disabled?: boolean
}

export interface TabsProps {
  items: TabItem[]
  defaultValue?: string
  ariaLabel: string
}

export function Tabs({ ariaLabel, defaultValue, items }: TabsProps) {
  const initialValue = defaultValue ?? items[0]?.value

  return (
    <TabsPrimitive.Root className={styles.root} defaultValue={initialValue}>
      <TabsPrimitive.List aria-label={ariaLabel} className={styles.list}>
        {items.map((item) => (
          <TabsPrimitive.Trigger
            className={styles.trigger}
            disabled={item.disabled}
            key={item.value}
            value={item.value}
          >
            {item.label}
            {typeof item.count === 'number' && <span className={styles.count}>{item.count}</span>}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>
      {items.map((item) => (
        <TabsPrimitive.Content className={styles.content} key={item.value} value={item.value}>
          {item.content}
        </TabsPrimitive.Content>
      ))}
    </TabsPrimitive.Root>
  )
}
