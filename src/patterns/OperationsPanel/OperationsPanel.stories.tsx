import type { Meta, StoryObj } from '@storybook/react-vite'
import { OperationsPanel } from './OperationsPanel'

const meta = {
  title: '패턴/UI 품질 검토',
  component: OperationsPanel,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta<typeof OperationsPanel>

export default meta
type Story = StoryObj<typeof meta>

export const DesktopAndMobile: Story = {}
DesktopAndMobile.storyName = '데스크톱과 모바일'
