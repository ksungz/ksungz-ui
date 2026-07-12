import type { Meta, StoryObj } from '@storybook/react-vite'
import styles from './storyStyles.module.scss'

function Overview() {
  return (
    <main className={styles.docsPage}>
      <p style={{ color: 'var(--ks-color-brand-700)', fontWeight: 800 }}>KS UI · 0.2.0</p>
      <h1>화면이 바뀌어도 동작 기준은 흔들리지 않게.</h1>
      <p>
        서비스 UI를 운영하며 자주 만난 상태와 검증 기준을 공개 가능한 형태로 다시 만든 React 컴포넌트 프로젝트입니다.
        컴포넌트의 모양뿐 아니라 화면 크기와 데이터가 달라질 때 어떻게 동작해야 하는지 함께 기록합니다.
      </p>
      <div className={styles.principles}>
        <section><h2>접근성을 기본값으로</h2><p>키보드 동작, 포커스 표시, 시맨틱 구조, 모션 감소 설정을 컴포넌트의 기본 조건으로 다룹니다.</p></section>
        <section><h2>화면 크기에 맞는 동작</h2><p>너비만 줄이는 대신 데스크톱 Dialog와 모바일 Bottom Sheet처럼 상호작용 방식도 함께 바꿉니다.</p></section>
        <section><h2>화면보다 상태를 먼저</h2><p>로딩, 비활성, 오류, 품절처럼 실제 운영에서 빠지기 쉬운 상태를 먼저 나누고 조합합니다.</p></section>
      </div>
      <ul className={styles.metaList}>
        <li><strong>기술 구성</strong><span>React, TypeScript, Storybook, SCSS Modules, Radix primitives</span></li>
        <li><strong>중점</strong><span>서비스 UI, 반응형 오버레이, 접근성, 상태별 문서화</span></li>
        <li><strong>범위</strong><span>구현과 검증 과정을 직접 확인할 수 있는 공개 프로젝트</span></li>
      </ul>
    </main>
  )
}

const meta = {
  title: '소개/프로젝트',
  component: Overview,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta<typeof Overview>

export default meta
type Story = StoryObj<typeof meta>

export const Introduction: Story = {}
Introduction.storyName = '소개'
