import type { Meta, StoryObj } from '@storybook/react-vite'
import { SelectField } from './SelectField'

const options = [
  { label: '커머스', value: 'commerce' },
  { label: '플랫폼', value: 'platform' },
  { label: '운영', value: 'operations' },
]

const meta = {
  title: '컴포넌트/SelectField',
  component: SelectField,
  tags: ['autodocs'],
  args: { label: '담당 조직', options },
  decorators: [(Story) => <div style={{ width: 360, maxWidth: 'calc(100vw - 48px)' }}><Story /></div>],
} satisfies Meta<typeof SelectField>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
Playground.storyName = '기본'
export const WithHelper: Story = { args: { helperText: '선택한 담당 조직에 검토 알림이 전달됩니다.' } }
WithHelper.storyName = '도움말'
export const Error: Story = { args: { error: '계속하려면 담당 조직을 선택해 주세요.' } }
Error.storyName = '오류'
