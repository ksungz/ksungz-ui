import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button/Button'
import { SelectField } from '../SelectField/SelectField'
import { TextField } from '../TextField/TextField'
import { DialogSheet, DialogSheetClose } from './DialogSheet'
import styles from '../../stories/storyStyles.module.scss'

const meta = {
  title: '컴포넌트/DialogSheet',
  component: DialogSheet,
  tags: ['autodocs'],
  parameters: { viewport: { defaultViewport: 'responsive' } },
} satisfies Meta<typeof DialogSheet>

export default meta
type Story = StoryObj<typeof meta>

export const ResponsiveOverlay: Story = {
  args: {
    title: 'UI 검토 추가',
    description: '640px 미만에서는 같은 내용이 바텀시트로 열립니다.',
    trigger: <Button>검토 추가</Button>,
    children: <div className={styles.controlStack}><TextField label="컴포넌트 이름" placeholder="예: 필터 바텀시트" /><SelectField label="담당 조직" options={[{ label: '커머스', value: 'commerce' }, { label: '플랫폼', value: 'platform' }]} /></div>,
    footer: <><DialogSheetClose><Button variant="secondary">취소</Button></DialogSheetClose><DialogSheetClose><Button>저장</Button></DialogSheetClose></>,
  },
}
ResponsiveOverlay.storyName = '반응형 오버레이'
