import type { Meta, StoryObj } from '@storybook/react-vite'
import { Search } from 'lucide-react'
import { TextField } from './TextField'

const meta = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  args: { label: 'Component name', placeholder: 'e.g. Filter sheet' },
  decorators: [(Story) => <div style={{ width: 360, maxWidth: 'calc(100vw - 48px)' }}><Story /></div>],
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
export const WithHelper: Story = { args: { helperText: 'Use the same name as the Storybook title.' } }
export const Error: Story = { args: { defaultValue: 'Filter', error: 'Use at least 8 characters.' } }
export const SearchField: Story = { args: { 'aria-label': 'Search components', label: 'Search', leadingIcon: <Search aria-hidden="true" size={18} />, placeholder: 'Name, ID, or owner' } }
