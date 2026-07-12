import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from './Badge'
import styles from '../../stories/storyStyles.module.scss'

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: { children: 'Ready', showDot: true },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
export const Statuses: Story = {
  render: () => <div className={styles.row}><Badge>Draft</Badge><Badge showDot variant="info">Review</Badge><Badge showDot variant="success">Ready</Badge><Badge showDot variant="warning">Waiting</Badge><Badge showDot variant="danger">Failed</Badge></div>,
}
