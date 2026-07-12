import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from './Badge'
import styles from '../../stories/storyStyles.module.scss'

const meta = {
  title: '컴포넌트/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: { children: '준비 완료', showDot: true },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
Playground.storyName = '기본'
export const Statuses: Story = {
  render: () => <div className={styles.row}><Badge>초안</Badge><Badge showDot variant="info">검토 중</Badge><Badge showDot variant="success">준비 완료</Badge><Badge showDot variant="warning">대기</Badge><Badge showDot variant="danger">실패</Badge></div>,
}
Statuses.storyName = '상태'
