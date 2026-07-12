import type { Meta, StoryObj } from '@storybook/react-vite'
import styles from './storyStyles.module.scss'

function Overview() {
  return (
    <main className={styles.docsPage}>
      <p style={{ color: 'var(--ks-color-brand-700)', fontWeight: 800 }}>KS UI · 0.1</p>
      <h1>Product interfaces that stay clear under change.</h1>
      <p>
        KS UI is a small React component system focused on responsive behavior, accessibility, and explicit states.
        It documents not only how components look, but how they should behave when products change.
      </p>
      <div className={styles.principles}>
        <section><h2>Accessible by default</h2><p>Keyboard behavior, focus visibility, semantic structure, and reduced motion are part of the component contract.</p></section>
        <section><h2>Responsive by behavior</h2><p>Components adapt their interaction model when the viewport changes, not only their width.</p></section>
        <section><h2>States before screens</h2><p>Loading, disabled, error, review, and blocked states are documented before composition.</p></section>
      </div>
      <ul className={styles.metaList}>
        <li><strong>Stack</strong><span>React, TypeScript, Storybook, SCSS Modules, Radix primitives</span></li>
        <li><strong>Focus</strong><span>Product UI, responsive overlays, accessibility, component documentation</span></li>
        <li><strong>Scope</strong><span>Portfolio-grade public system, intentionally small and reviewable</span></li>
      </ul>
    </main>
  )
}

const meta = {
  title: 'Overview/Introduction',
  component: Overview,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta<typeof Overview>

export default meta
type Story = StoryObj<typeof meta>

export const Introduction: Story = {}
