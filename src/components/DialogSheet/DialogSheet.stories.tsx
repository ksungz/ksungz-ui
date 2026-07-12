import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button/Button'
import { SelectField } from '../SelectField/SelectField'
import { TextField } from '../TextField/TextField'
import { DialogSheet, DialogSheetClose } from './DialogSheet'
import styles from '../../stories/storyStyles.module.scss'

const meta = {
  title: 'Components/DialogSheet',
  component: DialogSheet,
  tags: ['autodocs'],
  parameters: { viewport: { defaultViewport: 'responsive' } },
} satisfies Meta<typeof DialogSheet>

export default meta
type Story = StoryObj<typeof meta>

export const ResponsiveOverlay: Story = {
  args: {
    title: 'Add UI review',
    description: 'This dialog becomes a bottom sheet below 640px.',
    trigger: <Button>Add review</Button>,
    children: <div className={styles.controlStack}><TextField label="Component name" placeholder="e.g. Filter sheet" /><SelectField label="Owner" options={[{ label: 'Commerce', value: 'commerce' }, { label: 'Platform', value: 'platform' }]} /></div>,
    footer: <><DialogSheetClose><Button variant="secondary">Cancel</Button></DialogSheetClose><DialogSheetClose><Button>Save review</Button></DialogSheetClose></>,
  },
}
