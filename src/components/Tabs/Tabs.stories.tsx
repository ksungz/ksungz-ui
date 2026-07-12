import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tabs } from './Tabs'
import styles from '../../stories/storyStyles.module.scss'

const meta = {
  title: '컴포넌트/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  args: {
    ariaLabel: '검토 상태',
    items: [
      { value: 'all', label: '전체', count: 24, content: <div className={styles.panel}><p>이번 배포에서 다루는 전체 컴포넌트입니다.</p></div> },
      { value: 'ready', label: '준비 완료', count: 18, content: <div className={styles.panel}><p>화면과 접근성 검토를 통과한 컴포넌트입니다.</p></div> },
      { value: 'blocked', label: '보류', count: 2, content: <div className={styles.panel}><p>담당자의 결정이 필요한 컴포넌트입니다.</p></div> },
    ],
  },
  decorators: [(Story) => <div style={{ width: 620, maxWidth: 'calc(100vw - 48px)' }}><Story /></div>],
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const ReviewStatus: Story = {}
ReviewStatus.storyName = '검토 상태'
