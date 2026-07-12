import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ProductOptionSelector } from './ProductOptionSelector'

describe('상품 옵션 선택', () => {
  it('필수 옵션이 빠지면 오류를 표시하고 첫 옵션 그룹으로 이동한다', async () => {
    const user = userEvent.setup()
    render(<ProductOptionSelector />)

    await user.click(screen.getByRole('button', { name: '장바구니 담기' }))

    expect(screen.getByText('색상을 선택해 주세요.')).toBeVisible()
    expect(screen.getByText('사이즈를 선택해 주세요.')).toBeVisible()
    expect(screen.getByRole('group', { name: '색상' })).toHaveFocus()
  })

  it('색상에 맞는 품절 옵션과 추가 금액을 반영한다', async () => {
    const user = userEvent.setup()
    render(<ProductOptionSelector />)

    await user.click(screen.getByLabelText('네이비'))

    expect(screen.getByLabelText('250, 품절')).toBeDisabled()
    expect(screen.getAllByText('+5,000원')).toHaveLength(2)

    await user.click(screen.getByLabelText('280'))

    expect(screen.getByText('134,000원')).toBeVisible()
    expect(screen.getByText('재고 2개')).toBeVisible()
  })

  it('재고 범위 안에서 수량을 변경하고 선택 결과를 전달한다', async () => {
    const user = userEvent.setup()
    const onAddToCart = vi.fn()
    render(<ProductOptionSelector onAddToCart={onAddToCart} />)

    await user.click(screen.getByLabelText('네이비'))
    await user.click(screen.getByLabelText('280'))
    await user.click(screen.getByRole('button', { name: '수량 늘리기' }))

    expect(screen.getByRole('button', { name: '수량 늘리기' })).toBeDisabled()

    await user.click(screen.getByRole('button', { name: '장바구니 담기' }))

    expect(onAddToCart).toHaveBeenCalledWith(expect.objectContaining({
      quantity: 2,
      variant: expect.objectContaining({ id: 'navy-280' }),
    }))
    expect(await screen.findByText('장바구니에 담았습니다.')).toBeVisible()
  })

  it('색상을 바꿔 기존 사이즈가 품절되면 사이즈 선택을 해제한다', async () => {
    const user = userEvent.setup()
    render(<ProductOptionSelector />)

    await user.click(screen.getByLabelText('네이비'))
    await user.click(screen.getByLabelText('260'))
    await user.click(screen.getByLabelText('차콜'))

    expect(screen.getByLabelText('260, 품절')).not.toBeChecked()
    expect(screen.getByText('옵션 선택 후 변경 가능')).toBeVisible()
  })
})
