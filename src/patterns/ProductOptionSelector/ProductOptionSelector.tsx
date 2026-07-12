import { useId, useMemo, useReducer, useRef } from 'react'
import { Minus, Plus, RotateCcw, ShieldCheck, ShoppingBag, Truck } from 'lucide-react'
import { Badge, Button, DialogSheet, ToastProvider, useToast } from '../../components'
import { useMediaQuery } from '../../lib/useMediaQuery'
import { dailyRunnerProduct } from './fixtures'
import {
  clampQuantity,
  findVariant,
  formatPrice,
  getSizeAvailability,
  getUnitPrice,
  selectColor,
  type Product,
  type ProductSelection,
  type ProductVariant,
} from './model'
import styles from './ProductOptionSelector.module.scss'

interface PurchaseState {
  selection: ProductSelection
  quantity: number
  attempted: boolean
  sheetOpen: boolean
}

type PurchaseAction =
  | { type: 'select'; selection: ProductSelection }
  | { type: 'quantity'; quantity: number }
  | { type: 'attempt' }
  | { type: 'sheet'; open: boolean }

function purchaseReducer(state: PurchaseState, action: PurchaseAction): PurchaseState {
  switch (action.type) {
    case 'select':
      return { ...state, selection: action.selection, quantity: 1 }
    case 'quantity':
      return { ...state, quantity: action.quantity }
    case 'attempt':
      return { ...state, attempted: true }
    case 'sheet':
      return { ...state, sheetOpen: action.open }
  }
}

export interface AddToCartPayload {
  product: Product
  variant: ProductVariant
  quantity: number
}

export interface ProductOptionSelectorProps {
  product?: Product
  initialSelection?: ProductSelection
  initialQuantity?: number
  loading?: boolean
  unavailable?: boolean
  onAddToCart?: (payload: AddToCartPayload) => void
}

interface ConfiguratorProps {
  product: Product
  selection: ProductSelection
  quantity: number
  attempted: boolean
  unavailable: boolean
  showSubmit: boolean
  onColorChange: (colorId: string) => void
  onSizeChange: (sizeId: string) => void
  onQuantityChange: (quantity: number) => void
  onSubmit: () => void
}

function Configurator({
  attempted,
  onColorChange,
  onQuantityChange,
  onSizeChange,
  onSubmit,
  product,
  quantity,
  selection,
  showSubmit,
  unavailable,
}: ConfiguratorProps) {
  const colorGroupId = useId()
  const sizeGroupId = useId()
  const colorErrorId = `${colorGroupId}-error`
  const sizeErrorId = `${sizeGroupId}-error`
  const colorFieldsetRef = useRef<HTMLFieldSetElement>(null)
  const sizeFieldsetRef = useRef<HTMLFieldSetElement>(null)
  const sizeAvailability = useMemo(
    () => getSizeAvailability(product, selection.colorId),
    [product, selection.colorId],
  )
  const selectedVariant = findVariant(product, selection)
  const selectedColor = product.colors.find((color) => color.id === selection.colorId)
  const selectedSize = product.sizes.find((size) => size.id === selection.sizeId)
  const colorError = attempted && !selection.colorId
  const sizeError = attempted && !selection.sizeId
  const maxQuantity = selectedVariant?.stock ?? 1

  const submit = () => {
    if (!selection.colorId || !selection.sizeId) {
      onSubmit()
      queueMicrotask(() => {
        if (!selection.colorId) colorFieldsetRef.current?.focus()
        else sizeFieldsetRef.current?.focus()
      })
      return
    }

    onSubmit()
  }

  return (
    <div className={styles.configurator}>
      <fieldset
        aria-describedby={colorError ? colorErrorId : undefined}
        className={styles.optionGroup}
        ref={colorFieldsetRef}
        tabIndex={-1}
      >
        <legend>
          색상
          {selectedColor && <span>{selectedColor.label}</span>}
        </legend>
        <div className={styles.colorOptions}>
          {product.colors.map((color) => (
            <div key={color.id}>
              <input
                checked={selection.colorId === color.id}
                className={styles.visuallyHidden}
                id={`${colorGroupId}-${color.id}`}
                name={colorGroupId}
                onChange={() => onColorChange(color.id)}
                type="radio"
                value={color.id}
              />
              <label htmlFor={`${colorGroupId}-${color.id}`}>
                <span aria-hidden="true" className={styles.swatch} style={{ backgroundColor: color.swatch }} />
                {color.label}
              </label>
            </div>
          ))}
        </div>
        {colorError && <p className={styles.error} id={colorErrorId}>색상을 선택해 주세요.</p>}
      </fieldset>

      <fieldset
        aria-describedby={sizeError ? sizeErrorId : undefined}
        className={styles.optionGroup}
        disabled={!selection.colorId || unavailable}
        ref={sizeFieldsetRef}
        tabIndex={-1}
      >
        <legend>
          사이즈
          {!selection.colorId && <span>색상을 먼저 선택해 주세요</span>}
          {selectedSize && <span>{selectedSize.label} mm</span>}
        </legend>
        <div className={styles.sizeOptions}>
          {sizeAvailability.map((size) => {
            const soldOut = Boolean(selection.colorId && !size.available)
            const adjustment = size.priceAdjustment > 0 ? `+${formatPrice(size.priceAdjustment)}` : undefined

            return (
              <div key={size.id}>
                <input
                  aria-label={soldOut ? `${size.label}, 품절` : size.label}
                  checked={selection.sizeId === size.id}
                  className={styles.visuallyHidden}
                  disabled={soldOut}
                  id={`${sizeGroupId}-${size.id}`}
                  name={sizeGroupId}
                  onChange={() => onSizeChange(size.id)}
                  type="radio"
                  value={size.id}
                />
                <label htmlFor={`${sizeGroupId}-${size.id}`}>
                  <strong>{size.label}</strong>
                  {soldOut && <span>품절</span>}
                  {!soldOut && adjustment && <span>{adjustment}</span>}
                </label>
              </div>
            )
          })}
        </div>
        {sizeError && <p className={styles.error} id={sizeErrorId}>사이즈를 선택해 주세요.</p>}
      </fieldset>

      {selectedVariant && (
        <div aria-live="polite" className={styles.selectionSummary}>
          <div>
            <span>{selectedColor?.label} / {selectedSize?.label}</span>
            <strong>{formatPrice(getUnitPrice(product, selectedVariant))}</strong>
          </div>
          {selectedVariant.stock <= 2 && <Badge variant="warning">재고 {selectedVariant.stock}개</Badge>}
        </div>
      )}

      <div className={styles.quantityRow}>
        <div>
          <strong>수량</strong>
          <span>{selectedVariant ? `최대 ${selectedVariant.stock}개` : '옵션 선택 후 변경 가능'}</span>
        </div>
        <div aria-label="구매 수량" className={styles.stepper} role="group">
          <button
            aria-label="수량 줄이기"
            disabled={!selectedVariant || quantity <= 1}
            onClick={() => onQuantityChange(quantity - 1)}
            type="button"
          >
            <Minus aria-hidden="true" size={16} />
          </button>
          <output aria-live="polite">{quantity}</output>
          <button
            aria-label="수량 늘리기"
            disabled={!selectedVariant || quantity >= maxQuantity}
            onClick={() => onQuantityChange(quantity + 1)}
            type="button"
          >
            <Plus aria-hidden="true" size={16} />
          </button>
        </div>
      </div>

      {showSubmit && (
        <Button
          className={styles.submitButton}
          disabled={unavailable}
          leadingIcon={<ShoppingBag aria-hidden="true" size={18} />}
          onClick={submit}
          size="lg"
        >
          {unavailable ? '현재 구매할 수 없습니다' : '장바구니 담기'}
        </Button>
      )}
    </div>
  )
}

function ProductPage({
  initialQuantity = 1,
  initialSelection = {},
  loading = false,
  onAddToCart,
  product = dailyRunnerProduct,
  unavailable = false,
}: ProductOptionSelectorProps) {
  const { notify } = useToast()
  const isMobile = useMediaQuery('(max-width: 40rem)')
  const [state, dispatch] = useReducer(purchaseReducer, {
    selection: initialSelection,
    quantity: initialQuantity,
    attempted: false,
    sheetOpen: false,
  })
  const selectedVariant = findVariant(product, state.selection)
  const unitPrice = getUnitPrice(product, selectedVariant)
  const totalPrice = unitPrice * state.quantity

  const handleColorChange = (colorId: string) => {
    dispatch({ type: 'select', selection: selectColor(product, state.selection, colorId) })
  }

  const handleSizeChange = (sizeId: string) => {
    dispatch({ type: 'select', selection: { ...state.selection, sizeId } })
  }

  const handleQuantityChange = (quantity: number) => {
    dispatch({ type: 'quantity', quantity: clampQuantity(quantity, selectedVariant?.stock ?? 1) })
  }

  const handleSubmit = () => {
    if (!selectedVariant) {
      dispatch({ type: 'attempt' })
      return
    }

    onAddToCart?.({ product, variant: selectedVariant, quantity: state.quantity })
    notify({
      title: '장바구니에 담았습니다.',
      description: `${product.name} · ${state.quantity}개`,
      variant: 'success',
    })
    dispatch({ type: 'sheet', open: false })
  }

  const configurator = (
    <Configurator
      attempted={state.attempted}
      onColorChange={handleColorChange}
      onQuantityChange={handleQuantityChange}
      onSizeChange={handleSizeChange}
      onSubmit={handleSubmit}
      product={product}
      quantity={state.quantity}
      selection={state.selection}
      showSubmit={!isMobile}
      unavailable={unavailable}
    />
  )

  if (loading) {
    return (
      <div aria-busy="true" aria-label="상품 정보를 불러오는 중" className={styles.loadingPage}>
        <div className={styles.loadingHeader} />
        <div className={styles.loadingGrid}>
          <div className={styles.loadingImage} />
          <div className={styles.loadingLines}><span /><span /><span /><span /></div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <a href="#product-main" aria-label="KS UI 상품 화면으로 이동">
          <span>KS</span>
          <strong>커머스 UI 사례</strong>
        </a>
        <Badge variant="info">옵션 선택</Badge>
      </header>

      <main className={styles.main} id="product-main">
        <nav aria-label="상품 위치" className={styles.breadcrumb}>
          <span>신발</span><span aria-hidden="true">/</span><span>러닝화</span>
        </nav>

        <section className={styles.productLayout} aria-labelledby="product-name">
          <figure className={styles.gallery}>
            <div className={styles.imageFrame}>
              <img alt={product.image.alt} src={product.image.src} />
            </div>
            <figcaption>
              사진: <a href="https://unsplash.com/photos/Kgw9XZEqrak" rel="noreferrer" target="_blank">Mostafa Mahmoudi / Unsplash</a>
            </figcaption>
          </figure>

          <div className={styles.productDetails}>
            <div className={styles.productHeading}>
              <p>{product.brand}</p>
              <h1 id="product-name">{product.name}</h1>
              <span>{product.description}</span>
              <strong>{formatPrice(product.basePrice)}</strong>
            </div>

            {unavailable && (
              <div className={styles.unavailableNotice} role="status">
                <strong>현재 판매가 중지된 상품입니다.</strong>
                <span>재입고 또는 판매 재개 일정은 아직 정해지지 않았습니다.</span>
              </div>
            )}

            {!isMobile && configurator}

            <dl className={styles.serviceInfo}>
              <div><Truck aria-hidden="true" size={19} /><dt>배송</dt><dd>오후 2시 이전 주문 시 당일 출고</dd></div>
              <div><RotateCcw aria-hidden="true" size={19} /><dt>교환·반품</dt><dd>수령 후 7일 이내 신청 가능</dd></div>
              <div><ShieldCheck aria-hidden="true" size={19} /><dt>품질 보증</dt><dd>구매일로부터 1년</dd></div>
            </dl>
          </div>
        </section>
      </main>

      {isMobile && (
        <div className={styles.mobilePurchaseBar}>
          <div><span>총 상품 금액</span><strong>{formatPrice(totalPrice)}</strong></div>
          <DialogSheet
            description="색상과 사이즈를 선택한 뒤 수량을 확인해 주세요."
            footer={
              <Button
                disabled={unavailable}
                leadingIcon={<ShoppingBag aria-hidden="true" size={18} />}
                onClick={handleSubmit}
                size="lg"
              >
                {unavailable ? '구매 불가' : '장바구니 담기'}
              </Button>
            }
            onOpenChange={(open) => dispatch({ type: 'sheet', open })}
            open={state.sheetOpen}
            size="lg"
            title={product.name}
            trigger={<Button disabled={unavailable} size="lg">옵션 선택</Button>}
          >
            {configurator}
          </DialogSheet>
        </div>
      )}
    </div>
  )
}

export function ProductOptionSelector(props: ProductOptionSelectorProps) {
  return <ToastProvider><ProductPage {...props} /></ToastProvider>
}
