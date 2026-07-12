import type { Meta, StoryObj } from '@storybook/react-vite'
import styles from './storyStyles.module.scss'

const colors = [
  ['Ink', 'var(--ks-color-ink-950)', '#15171a'],
  ['Brand', 'var(--ks-color-brand-600)', '#2457d6'],
  ['Positive', 'var(--ks-color-positive-700)', '#14643e'],
  ['Warning', 'var(--ks-color-warning-100)', '#ffedb8'],
  ['Danger', 'var(--ks-color-danger-700)', '#a32a32'],
  ['Coral', 'var(--ks-color-coral-600)', '#c84d35'],
  ['Surface', 'var(--ks-color-white)', '#ffffff'],
  ['Canvas', 'var(--ks-color-ink-50)', '#f7f8f9'],
]

function Foundations() {
  return (
    <main className={styles.docsPage}>
      <h1>Foundations</h1>
      <p>Tokens keep hierarchy stable across components. Color is reserved for meaning; spacing follows a four-pixel base scale.</p>
      <h2>Color</h2>
      <div className={styles.colorGrid}>
        {colors.map(([name, color, value]) => (
          <div className={styles.swatch} key={name}>
            <i style={{ background: color }} />
            <span><strong>{name}</strong><code>{value}</code></span>
          </div>
        ))}
      </div>
      <h2>Typography</h2>
      <div className={styles.typeScale}>
        <div><code>Display · 32</code><strong style={{ fontSize: 'var(--ks-font-size-700)' }}>Release readiness</strong></div>
        <div><code>Heading · 24</code><strong style={{ fontSize: 'var(--ks-font-size-600)' }}>Component queue</strong></div>
        <div><code>Body · 16</code><span style={{ fontSize: 'var(--ks-font-size-400)' }}>Clear labels make operational decisions faster.</span></div>
        <div><code>Caption · 12</code><span style={{ fontSize: 'var(--ks-font-size-100)' }}>UPDATED 4 MINUTES AGO</span></div>
      </div>
    </main>
  )
}

const meta = {
  title: 'Foundations/Tokens',
  component: Foundations,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta<typeof Foundations>

export default meta
type Story = StoryObj<typeof meta>

export const Tokens: Story = {}
