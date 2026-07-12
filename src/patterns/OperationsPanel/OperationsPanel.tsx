import { useMemo, useState } from 'react'
import { Check, ChevronRight, Filter, Plus, Search, ShieldCheck } from 'lucide-react'
import {
  Badge,
  Button,
  DialogSheet,
  DialogSheetClose,
  SelectField,
  Tabs,
  TextField,
  ToastProvider,
  useToast,
} from '../../components'
import styles from './OperationsPanel.module.scss'

type ReviewStatus = '준비 완료' | '검토 중' | '보류'

interface ReviewItem {
  id: string
  title: string
  owner: string
  status: ReviewStatus
  date: string
}

const reviewItems: ReviewItem[] = [
  { id: 'UI-142', title: '결제 옵션 선택', owner: '커머스', status: '준비 완료', date: '오늘' },
  { id: 'UI-139', title: '반응형 필터 바텀시트', owner: '플랫폼', status: '검토 중', date: '7월 15일' },
  { id: 'UI-136', title: '주문 상태 타임라인', owner: '운영', status: '보류', date: '7월 18일' },
  { id: 'UI-128', title: '계정 복구 Dialog', owner: '계정', status: '준비 완료', date: '7월 21일' },
]

const statusVariant = {
  '준비 완료': 'success',
  '검토 중': 'info',
  '보류': 'warning',
} as const

function PanelContent() {
  const { notify } = useToast()
  const [query, setQuery] = useState('')

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) return reviewItems
    return reviewItems.filter((item) => `${item.id} ${item.title} ${item.owner}`.toLowerCase().includes(normalizedQuery))
  }, [query])

  const reviewList = (
    <div className={styles.reviewList}>
      <div className={styles.tableHeader} aria-hidden="true">
        <span>컴포넌트</span>
        <span>담당 조직</span>
        <span>상태</span>
        <span>기한</span>
        <span />
      </div>
      {filteredItems.map((item) => (
        <button className={styles.reviewRow} key={item.id} type="button">
          <span className={styles.componentCell}>
            <strong>{item.title}</strong>
            <small>{item.id}</small>
          </span>
          <span data-label="담당 조직">{item.owner}</span>
          <span data-label="상태"><Badge showDot variant={statusVariant[item.status]}>{item.status}</Badge></span>
          <span data-label="기한">{item.date}</span>
          <ChevronRight aria-hidden="true" className={styles.rowIcon} size={18} />
        </button>
      ))}
      {filteredItems.length === 0 && <p className={styles.empty}>“{query}”에 맞는 컴포넌트가 없습니다.</p>}
    </div>
  )

  return (
    <div className={styles.shell}>
      <header className={styles.topbar}>
        <a className={styles.brand} href="#main-content" aria-label="KS UI 홈">
          <span className={styles.brandMark}>KS</span>
          <span>인터페이스 검토</span>
        </a>
        <Badge showDot variant="success">정상 운영</Badge>
      </header>

      <main className={styles.main} id="main-content">
        <div className={styles.headingRow}>
          <div>
            <p className={styles.eyebrow}>배포 준비 상태</p>
            <h1>UI 품질 검토</h1>
            <p>컴포넌트 상태, 접근성 확인, 배포 결정을 한곳에서 관리합니다.</p>
          </div>
          <DialogSheet
            description="컴포넌트 담당 조직과 확인할 품질 기준을 기록합니다."
            footer={
              <>
                <DialogSheetClose><Button variant="secondary">취소</Button></DialogSheetClose>
                <DialogSheetClose>
                  <Button onClick={() => notify({ title: '검토를 추가했습니다.', description: '팀 검토를 시작할 수 있습니다.', variant: 'success' })}>
                    검토 추가
                  </Button>
                </DialogSheetClose>
              </>
            }
            title="UI 검토 추가"
            trigger={<Button leadingIcon={<Plus aria-hidden="true" size={18} />}>검토 추가</Button>}
          >
            <div className={styles.formGrid}>
              <TextField label="컴포넌트 이름" placeholder="예: 필터 바텀시트" required />
              <SelectField
                label="담당 조직"
                options={[
                  { label: '커머스', value: 'commerce' },
                  { label: '플랫폼', value: 'platform' },
                  { label: '운영', value: 'operations' },
                ]}
              />
              <TextField helperText="Storybook 화면이나 Pull Request 주소를 입력합니다." label="참고 URL" placeholder="https://" type="url" />
            </div>
          </DialogSheet>
        </div>

        <section className={styles.metrics} aria-label="검토 요약">
          <div><span>컴포넌트</span><strong>24</strong><small>이번 주 4개 변경</small></div>
          <div><span>준비 완료</span><strong>18</strong><small className={styles.positive}><Check aria-hidden="true" size={14} /> 75% 통과</small></div>
          <div><span>검토 필요</span><strong>4</strong><small>접근성 확인 2건</small></div>
          <div><span>보류</span><strong>2</strong><small className={styles.attention}>담당자 결정 필요</small></div>
        </section>

        <section className={styles.workspace} aria-labelledby="workspace-title">
          <div className={styles.workspaceHeader}>
            <div>
              <h2 id="workspace-title">컴포넌트 검토 목록</h2>
              <p>다음 배포 전에 구현 상태를 확인합니다.</p>
            </div>
            <Button aria-label="필터 열기" iconOnly leadingIcon={<Filter aria-hidden="true" size={18} />} variant="secondary" />
          </div>

          <div className={styles.filters}>
            <TextField
              aria-label="컴포넌트 검색"
              label="검색"
              leadingIcon={<Search aria-hidden="true" size={18} />}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="이름, ID 또는 담당 조직"
              value={query}
            />
          </div>

          <Tabs
            ariaLabel="컴포넌트 검토 상태"
            items={[
              { value: 'all', label: '전체', count: reviewItems.length, content: reviewList },
              { value: 'ready', label: '준비 완료', count: 2, content: <div className={styles.stateNote}><ShieldCheck aria-hidden="true" />준비 완료된 컴포넌트는 화면과 접근성 확인을 통과했습니다.</div> },
              { value: 'blocked', label: '보류', count: 1, content: <div className={styles.stateNote}>보류 항목은 구현을 계속하기 전에 담당자의 결정이 필요합니다.</div> },
            ]}
          />
        </section>
      </main>
    </div>
  )
}

export function OperationsPanel() {
  return <ToastProvider><PanelContent /></ToastProvider>
}
