import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button/Button'
import { ToastProvider } from './Toast'
import { useToast } from './ToastContext'
import styles from '../../stories/storyStyles.module.scss'

function ToastActions() {
  const { notify } = useToast()
  return (
    <div className={styles.row}>
      <Button onClick={() => notify({ title: '검토를 저장했습니다.', description: '팀 검토를 시작할 수 있습니다.', variant: 'success' })}>완료</Button>
      <Button onClick={() => notify({ title: '접근성 확인이 필요합니다.', description: '키보드 탐색을 아직 확인하지 않았습니다.', variant: 'warning' })} variant="secondary">주의</Button>
      <Button onClick={() => notify({ title: '상태를 변경했습니다.', description: '배포 목록을 새로 반영했습니다.', variant: 'info' })} variant="ghost">안내</Button>
    </div>
  )
}

function ToastDemo() {
  return <ToastProvider><ToastActions /></ToastProvider>
}

const meta = {
  title: '컴포넌트/Toast',
  component: ToastDemo,
  parameters: { controls: { disable: true } },
} satisfies Meta<typeof ToastDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Notifications: Story = {}
Notifications.storyName = '알림'
