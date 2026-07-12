import type { Meta, StoryObj } from '@storybook/react-vite'
import { ArrowRight, Plus } from 'lucide-react'
import { Button } from './Button'
import styles from '../../stories/storyStyles.module.scss'

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Add component' },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost', 'danger'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
export const WithIcon: Story = { args: { leadingIcon: <Plus aria-hidden="true" size={18} /> } }
export const Loading: Story = { args: { loading: true, children: 'Saving' } }
export const IconOnly: Story = { args: { 'aria-label': 'Continue', children: undefined, iconOnly: true, leadingIcon: <ArrowRight aria-hidden="true" size={18} /> } }
export const Variants: Story = {
  render: () => <div className={styles.row}><Button>Primary</Button><Button variant="secondary">Secondary</Button><Button variant="ghost">Ghost</Button><Button variant="danger">Delete</Button></div>,
}
