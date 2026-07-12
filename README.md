# KS UI

반응형 서비스 화면을 만들고 검증하는 과정을 정리한 React 컴포넌트 프로젝트입니다.

[Storybook에서 확인하기](https://ksungz-ui.vercel.app)

컴포넌트 개수를 늘리는 것보다 키보드 동작, 포커스 이동, 오류 상태, 화면 크기에 따른 상호작용 변화처럼 구현 중 빠지기 쉬운 부분을 직접 확인할 수 있게 만드는 데 초점을 두고 있습니다.

## 상품 옵션 선택 사례

커머스 상품상세에서 사용하는 색상·사이즈 옵션 선택 흐름을 공개 가능한 데이터로 다시 구성했습니다.

- 옵션 조합별 재고와 추가 금액 계산
- 품절 사이즈와 재고 부족 상태
- 색상 변경 시 기존 사이즈 선택의 유효성 확인
- 재고 범위 안에서 수량 조절
- 필수 옵션 누락 시 오류 안내와 포커스 이동
- 데스크톱 구매 패널과 모바일 바텀시트
- 가상 상품 데이터와 순수 TypeScript 계산 함수 분리

결제나 실제 장바구니 API는 포함하지 않았습니다. 화면에서 다루는 상태와 검증 범위를 명확하게 보여주는 데 필요한 부분만 구현했습니다.

## 구성

- 기초: 색상, 타이포그래피, 간격, 모서리, 그림자, 포커스, 모션 토큰
- 컴포넌트: Button, TextField, SelectField, Badge, Tabs, DialogSheet, Toast
- 패턴: UI 품질 검토 화면, 상품 옵션 선택 화면
- 문서: Storybook 상태별 예제와 구현 사례
- 테스트: Vitest와 Testing Library를 사용한 계산·상호작용 검증

## DialogSheet

`DialogSheet`는 같은 API를 사용하면서 화면 크기에 따라 동작 방식을 바꿉니다.

- 데스크톱: 화면 가운데 표시되는 Dialog
- 모바일: 하단 안전 영역을 포함한 Bottom Sheet
- 키보드: 포커스 잠금, Escape 닫기, 닫은 뒤 포커스 복귀
- 모션: `prefers-reduced-motion` 설정 반영

너비만 바꾸는 것이 아니라 화면 크기에 맞게 상호작용 방식도 달라지도록 구성했습니다.

## 기술 구성

- React 19, TypeScript
- Vite 8
- Storybook 10
- CSS Variables, SCSS Modules
- Radix UI primitives
- Vitest, Testing Library
- GitHub Actions, Vercel

## 로컬 실행

`.nvmrc`에 지정한 Node 버전을 사용합니다.

```bash
nvm use
npm install
npm run storybook
```

검증 명령은 다음과 같습니다.

```bash
npm run typecheck
npm run lint
npm run test
npm run build:storybook
```

## 디렉토리

```text
src/
  components/     기본 컴포넌트, 스타일, Storybook, 테스트
  patterns/       실제 화면 흐름을 조합한 예제
  stories/        소개와 디자인 토큰 문서
  styles/         전역 토큰과 기본 스타일
  lib/            공통 유틸리티와 훅
```

## 구현 기준

- 상태는 숨겨진 CSS 조건보다 컴포넌트 속성과 데이터로 드러냅니다.
- 기본 HTML로 해결할 수 있는 동작은 native element를 우선합니다.
- Dialog처럼 포커스 관리가 중요한 UI는 검증된 primitive를 사용합니다.
- 상태를 색상 하나로만 전달하지 않습니다.
- 카드 모서리는 최대 8px로 제한합니다.
- 실제 서비스 코드와 사내 자산은 포함하지 않습니다.

## 이미지 출처

상품 옵션 선택 사례의 러닝화 사진은 [Mostafa Mahmoudi의 Unsplash 이미지](https://unsplash.com/photos/Kgw9XZEqrak)를 사용했습니다.

## 라이선스

MIT
