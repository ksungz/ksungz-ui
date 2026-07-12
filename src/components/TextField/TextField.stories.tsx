import type { Meta, StoryObj } from '@storybook/react-vite'
import { Search } from 'lucide-react'
import { TextField } from './TextField'

const meta = {
  title: '컴포넌트/TextField',
  component: TextField,
  tags: ['autodocs'],
  args: { label: '컴포넌트 이름', placeholder: '예: 필터 바텀시트' },
  decorators: [(Story) => <div style={{ width: 360, maxWidth: 'calc(100vw - 48px)' }}><Story /></div>],
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
Playground.storyName = '기본'
export const WithHelper: Story = { args: { helperText: 'Storybook 제목과 같은 이름을 사용합니다.' } }
WithHelper.storyName = '도움말'
export const Error: Story = { args: { defaultValue: '필터', error: '8자 이상 입력해 주세요.' } }
Error.storyName = '오류'
export const SearchField: Story = { args: { 'aria-label': '컴포넌트 검색', label: '검색', leadingIcon: <Search aria-hidden="true" size={18} />, placeholder: '이름, ID 또는 담당자' } }
SearchField.storyName = '검색 입력'
