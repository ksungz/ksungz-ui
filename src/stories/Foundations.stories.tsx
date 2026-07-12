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
      <h1>기초 토큰</h1>
      <p>컴포넌트가 달라도 위계가 흔들리지 않도록 공통 토큰을 사용합니다. 색상은 의미 전달에 사용하고, 간격은 4px 단위로 구성했습니다.</p>
      <h2>색상</h2>
      <div className={styles.colorGrid}>
        {colors.map(([name, color, value]) => (
          <div className={styles.swatch} key={name}>
            <i style={{ background: color }} />
            <span><strong>{name}</strong><code>{value}</code></span>
          </div>
        ))}
      </div>
      <h2>타이포그래피</h2>
      <div className={styles.typeScale}>
        <div><code>Display · 32</code><strong style={{ fontSize: 'var(--ks-font-size-700)' }}>배포 준비 상태</strong></div>
        <div><code>Heading · 24</code><strong style={{ fontSize: 'var(--ks-font-size-600)' }}>컴포넌트 검토 목록</strong></div>
        <div><code>Body · 16</code><span style={{ fontSize: 'var(--ks-font-size-400)' }}>명확한 이름은 화면을 검토하는 시간을 줄입니다.</span></div>
        <div><code>Caption · 12</code><span style={{ fontSize: 'var(--ks-font-size-100)' }}>4분 전 업데이트</span></div>
      </div>
    </main>
  )
}

const meta = {
  title: '기초/토큰',
  component: Foundations,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta<typeof Foundations>

export default meta
type Story = StoryObj<typeof meta>

export const Tokens: Story = {}
Tokens.storyName = '토큰'
