import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button/Button'
import { ToastProvider, useToast } from './Toast'
import styles from '../../stories/storyStyles.module.scss'

function ToastActions() {
  const { notify } = useToast()
  return (
    <div className={styles.row}>
      <Button onClick={() => notify({ title: 'Review saved', description: 'The component is ready for team review.', variant: 'success' })}>Success</Button>
      <Button onClick={() => notify({ title: 'Accessibility check needed', description: 'Keyboard navigation has not been verified.', variant: 'warning' })} variant="secondary">Warning</Button>
      <Button onClick={() => notify({ title: 'Status updated', description: 'The release queue has been refreshed.', variant: 'info' })} variant="ghost">Info</Button>
    </div>
  )
}

function ToastDemo() {
  return <ToastProvider><ToastActions /></ToastProvider>
}

const meta = {
  title: 'Components/Toast',
  component: ToastDemo,
  parameters: { controls: { disable: true } },
} satisfies Meta<typeof ToastDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Notifications: Story = {}
