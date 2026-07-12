import type { Meta, StoryObj } from '@storybook/react-vite'
import { OperationsPanel } from './OperationsPanel'

const meta = {
  title: 'Patterns/UI Quality Review',
  component: OperationsPanel,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta<typeof OperationsPanel>

export default meta
type Story = StoryObj<typeof meta>

export const DesktopAndMobile: Story = {}
