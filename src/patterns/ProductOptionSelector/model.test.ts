import { describe, expect, it } from 'vitest'
import { dailyRunnerProduct } from './fixtures'
import {
  clampQuantity,
  findVariant,
  formatPrice,
  getSizeAvailability,
  getUnitPrice,
  selectColor,
} from './model'

describe('상품 옵션 계산', () => {
  it('선택한 색상의 사이즈별 재고와 추가 금액을 반환한다', () => {
    const sizes = getSizeAvailability(dailyRunnerProduct, 'navy')

    expect(sizes.find((size) => size.id === '250')).toMatchObject({ available: false, stock: 0 })
    expect(sizes.find((size) => size.id === '280')).toMatchObject({ available: true, priceAdjustment: 5000 })
  })

  it('색상을 바꿨을 때 기존 사이즈가 품절이면 사이즈 선택을 해제한다', () => {
    const selection = selectColor(
      dailyRunnerProduct,
      { colorId: 'navy', sizeId: '260' },
      'charcoal',
    )

    expect(selection).toEqual({ colorId: 'charcoal' })
  })

  it('새 색상에서도 구매 가능한 사이즈라면 선택을 유지한다', () => {
    const selection = selectColor(
      dailyRunnerProduct,
      { colorId: 'charcoal', sizeId: '270' },
      'navy',
    )

    expect(selection).toEqual({ colorId: 'navy', sizeId: '270' })
  })

  it('선택 옵션의 추가 금액과 구매 수량 제한을 계산한다', () => {
    const variant = findVariant(dailyRunnerProduct, { colorId: 'silver', sizeId: '290' })

    expect(getUnitPrice(dailyRunnerProduct, variant)).toBe(139000)
    expect(formatPrice(139000)).toBe('139,000원')
    expect(clampQuantity(4, variant?.stock ?? 0)).toBe(2)
  })
})
