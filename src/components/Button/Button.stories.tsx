import type { Meta, StoryObj } from '@storybook/react-vite'
import { ArrowRight, Plus } from 'lucide-react'
import { Button } from './Button'
import styles from '../../stories/storyStyles.module.scss'

const meta = {
  title: '컴포넌트/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: '컴포넌트 추가' },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost', 'danger'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
Playground.storyName = '기본'
export const WithIcon: Story = { args: { leadingIcon: <Plus aria-hidden="true" size={18} /> } }
WithIcon.storyName = '아이콘 포함'
export const Loading: Story = { args: { loading: true, children: '저장 중' } }
Loading.storyName = '처리 중'
export const IconOnly: Story = { args: { 'aria-label': '계속', children: undefined, iconOnly: true, leadingIcon: <ArrowRight aria-hidden="true" size={18} /> } }
IconOnly.storyName = '아이콘 전용'
export const Variants: Story = {
  render: () => <div className={styles.row}><Button>기본</Button><Button variant="secondary">보조</Button><Button variant="ghost">텍스트</Button><Button variant="danger">삭제</Button></div>,
}
Variants.storyName = '종류'
