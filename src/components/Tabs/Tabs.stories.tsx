import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tabs } from './Tabs'
import styles from '../../stories/storyStyles.module.scss'

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  args: {
    ariaLabel: 'Review status',
    items: [
      { value: 'all', label: 'All', count: 24, content: <div className={styles.panel}><p>All components across the current release.</p></div> },
      { value: 'ready', label: 'Ready', count: 18, content: <div className={styles.panel}><p>Components that passed visual and accessibility checks.</p></div> },
      { value: 'blocked', label: 'Blocked', count: 2, content: <div className={styles.panel}><p>Components waiting for an owner decision.</p></div> },
    ],
  },
  decorators: [(Story) => <div style={{ width: 620, maxWidth: 'calc(100vw - 48px)' }}><Story /></div>],
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const ReviewStatus: Story = {}
