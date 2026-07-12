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

type ReviewStatus = 'Ready' | 'Review' | 'Blocked'

interface ReviewItem {
  id: string
  title: string
  owner: string
  status: ReviewStatus
  date: string
}

const reviewItems: ReviewItem[] = [
  { id: 'UI-142', title: 'Checkout option selector', owner: 'Commerce', status: 'Ready', date: 'Today' },
  { id: 'UI-139', title: 'Responsive filter sheet', owner: 'Platform', status: 'Review', date: 'Jul 15' },
  { id: 'UI-136', title: 'Order status timeline', owner: 'Operations', status: 'Blocked', date: 'Jul 18' },
  { id: 'UI-128', title: 'Account recovery dialog', owner: 'Identity', status: 'Ready', date: 'Jul 21' },
]

const statusVariant = {
  Ready: 'success',
  Review: 'info',
  Blocked: 'warning',
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
        <span>Component</span>
        <span>Owner</span>
        <span>Status</span>
        <span>Due</span>
        <span />
      </div>
      {filteredItems.map((item) => (
        <button className={styles.reviewRow} key={item.id} type="button">
          <span className={styles.componentCell}>
            <strong>{item.title}</strong>
            <small>{item.id}</small>
          </span>
          <span data-label="Owner">{item.owner}</span>
          <span data-label="Status"><Badge showDot variant={statusVariant[item.status]}>{item.status}</Badge></span>
          <span data-label="Due">{item.date}</span>
          <ChevronRight aria-hidden="true" className={styles.rowIcon} size={18} />
        </button>
      ))}
      {filteredItems.length === 0 && <p className={styles.empty}>No components match “{query}”.</p>}
    </div>
  )

  return (
    <div className={styles.shell}>
      <header className={styles.topbar}>
        <a className={styles.brand} href="#main-content" aria-label="KS UI home">
          <span className={styles.brandMark}>KS</span>
          <span>Interface review</span>
        </a>
        <Badge showDot variant="success">System healthy</Badge>
      </header>

      <main className={styles.main} id="main-content">
        <div className={styles.headingRow}>
          <div>
            <p className={styles.eyebrow}>Release readiness</p>
            <h1>UI quality review</h1>
            <p>Track component states, accessibility checks, and release decisions in one place.</p>
          </div>
          <DialogSheet
            description="Capture the component owner and the quality gate that needs review."
            footer={
              <>
                <DialogSheetClose><Button variant="secondary">Cancel</Button></DialogSheetClose>
                <DialogSheetClose>
                  <Button onClick={() => notify({ title: 'Review added', description: 'The component is ready for team review.', variant: 'success' })}>
                    Add review
                  </Button>
                </DialogSheetClose>
              </>
            }
            title="Add UI review"
            trigger={<Button leadingIcon={<Plus aria-hidden="true" size={18} />}>Add review</Button>}
          >
            <div className={styles.formGrid}>
              <TextField label="Component name" placeholder="e.g. Filter sheet" required />
              <SelectField
                label="Owner"
                options={[
                  { label: 'Commerce', value: 'commerce' },
                  { label: 'Platform', value: 'platform' },
                  { label: 'Operations', value: 'operations' },
                ]}
              />
              <TextField helperText="Link to the Storybook story or pull request." label="Reference URL" placeholder="https://" type="url" />
            </div>
          </DialogSheet>
        </div>

        <section className={styles.metrics} aria-label="Review summary">
          <div><span>Components</span><strong>24</strong><small>4 changed this week</small></div>
          <div><span>Ready</span><strong>18</strong><small className={styles.positive}><Check aria-hidden="true" size={14} /> 75% passed</small></div>
          <div><span>Needs review</span><strong>4</strong><small>2 accessibility checks</small></div>
          <div><span>Blocked</span><strong>2</strong><small className={styles.attention}>Owner decision needed</small></div>
        </section>

        <section className={styles.workspace} aria-labelledby="workspace-title">
          <div className={styles.workspaceHeader}>
            <div>
              <h2 id="workspace-title">Component queue</h2>
              <p>Review implementation states before the next release.</p>
            </div>
            <Button aria-label="Open filters" iconOnly leadingIcon={<Filter aria-hidden="true" size={18} />} variant="secondary" />
          </div>

          <div className={styles.filters}>
            <TextField
              aria-label="Search components"
              label="Search"
              leadingIcon={<Search aria-hidden="true" size={18} />}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Name, ID, or owner"
              value={query}
            />
          </div>

          <Tabs
            ariaLabel="Component review status"
            items={[
              { value: 'all', label: 'All', count: reviewItems.length, content: reviewList },
              { value: 'ready', label: 'Ready', count: 2, content: <div className={styles.stateNote}><ShieldCheck aria-hidden="true" />Ready components have passed visual and accessibility checks.</div> },
              { value: 'blocked', label: 'Blocked', count: 1, content: <div className={styles.stateNote}>Blocked items require an owner decision before implementation continues.</div> },
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
