import type { Meta, StoryObj } from '@storybook/react-vite'
import { SelectField } from './SelectField'

const options = [
  { label: 'Commerce', value: 'commerce' },
  { label: 'Platform', value: 'platform' },
  { label: 'Operations', value: 'operations' },
]

const meta = {
  title: 'Components/SelectField',
  component: SelectField,
  tags: ['autodocs'],
  args: { label: 'Owner', options },
  decorators: [(Story) => <div style={{ width: 360, maxWidth: 'calc(100vw - 48px)' }}><Story /></div>],
} satisfies Meta<typeof SelectField>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
export const WithHelper: Story = { args: { helperText: 'The owner receives review notifications.' } }
export const Error: Story = { args: { error: 'Select an owner before continuing.' } }
