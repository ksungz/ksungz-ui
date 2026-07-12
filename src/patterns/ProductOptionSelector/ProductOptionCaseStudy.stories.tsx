import type { Meta, StoryObj } from '@storybook/react-vite'
import styles from './ProductOptionCaseStudy.module.scss'

function ProductOptionCaseStudy() {
  return (
    <article className={styles.article}>
      <header>
        <p>UI CASE STUDY · COMMERCE</p>
        <h1>상품 옵션 선택 화면</h1>
        <span>
          상품상세에서 자주 만나는 옵션 선택 흐름을 공개 가능한 데이터로 다시 구성했다.
          화면 모양보다 옵션 조합과 재고 상태가 바뀔 때 사용자가 놓치기 쉬운 지점을 정리하는 데 초점을 맞췄다.
        </span>
        <a href="/?path=/story/patterns-commerce-상품-옵션-선택--default" target="_top">구현 화면 보기</a>
      </header>

      <section>
        <h2>다룬 범위</h2>
        <div className={styles.scopeGrid}>
          <div><strong>옵션 조합</strong><span>색상에 따라 구매 가능한 사이즈와 추가 금액이 달라진다.</span></div>
          <div><strong>재고</strong><span>품절 옵션, 재고 부족, 최대 구매 수량을 한 흐름에서 처리한다.</span></div>
          <div><strong>반응형</strong><span>데스크톱 구매 패널과 모바일 바텀시트가 같은 선택 상태를 사용한다.</span></div>
          <div><strong>검증</strong><span>필수 옵션이 빠지면 메시지를 보여주고 해당 그룹으로 포커스를 옮긴다.</span></div>
        </div>
      </section>

      <section>
        <h2>상태를 나눈 기준</h2>
        <div className={styles.tableWrap}>
          <table>
            <thead><tr><th>상태</th><th>화면 처리</th><th>확인할 점</th></tr></thead>
            <tbody>
              <tr><td>색상 미선택</td><td>사이즈 선택 비활성화</td><td>선택 순서가 모호하지 않은가</td></tr>
              <tr><td>조합 품절</td><td>사이즈에 품절 표기</td><td>색상과 취소선에만 의존하지 않는가</td></tr>
              <tr><td>추가 금액</td><td>사이즈와 선택 요약에 함께 표시</td><td>최종 가격을 선택 전에 오해하지 않는가</td></tr>
              <tr><td>재고 부족</td><td>남은 수량과 수량 상한 표시</td><td>재고보다 많은 수량을 선택할 수 없는가</td></tr>
              <tr><td>필수값 누락</td><td>오류 메시지와 포커스 이동</td><td>키보드 사용자도 오류 위치를 찾을 수 있는가</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>구현 판단</h2>
        <ol className={styles.decisions}>
          <li><strong>계산 로직을 화면에서 분리했다.</strong><span>재고 판정과 가격 계산을 순수 TypeScript 함수로 두어 UI 없이도 확인할 수 있게 했다.</span></li>
          <li><strong>모바일과 데스크톱에 같은 폼을 사용했다.</strong><span>화면별로 선택 상태가 어긋나지 않도록 현재 뷰포트에 필요한 폼만 렌더링한다.</span></li>
          <li><strong>기본 HTML 의미를 우선했다.</strong><span>옵션 그룹은 fieldset과 radio를 사용하고, Dialog의 포커스 처리는 검증된 primitive에 맡겼다.</span></li>
          <li><strong>결과를 과장하지 않았다.</strong><span>실제 매출이나 전환율이 없는 공개 예제이므로 구현 범위와 검증 결과만 기록한다.</span></li>
        </ol>
      </section>

      <section>
        <h2>확인 항목</h2>
        <ul className={styles.checks}>
          <li>옵션 조합별 재고와 추가 금액 단위 테스트</li>
          <li>색상 변경 시 유효하지 않은 사이즈 선택 해제</li>
          <li>키보드만으로 옵션 선택과 수량 변경</li>
          <li>모바일 320px·390px 가로 넘침과 하단 안전 영역</li>
          <li>Storybook 접근성 검사와 원격 빌드</li>
        </ul>
      </section>

      <footer>
        상품 이미지는 Mostafa Mahmoudi가 촬영한 Unsplash 이미지를 사용했다.
        옵션·재고 데이터는 이 사례를 위해 별도로 작성했다.
      </footer>
    </article>
  )
}

const meta = {
  title: 'Case Studies/상품 옵션 선택',
  component: ProductOptionCaseStudy,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta<typeof ProductOptionCaseStudy>

export default meta
type Story = StoryObj<typeof meta>

export const DesignAndVerification: Story = {}
DesignAndVerification.storyName = '설계와 검증'
