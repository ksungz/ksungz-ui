import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn, userEvent, within } from 'storybook/test'
import { longNameProduct } from './fixtures'
import { ProductOptionSelector } from './ProductOptionSelector'

const meta = {
  title: 'Patterns/Commerce/상품 옵션 선택',
  component: ProductOptionSelector,
  parameters: {
    layout: 'fullscreen',
    controls: { expanded: true },
  },
  args: {
    onAddToCart: fn(),
  },
} satisfies Meta<typeof ProductOptionSelector>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
Default.storyName = '기본 상품'

export const PartialSoldOut: Story = {
  args: { initialSelection: { colorId: 'charcoal' } },
}
PartialSoldOut.storyName = '일부 사이즈 품절'

export const PriceAdjustment: Story = {
  args: {
    initialSelection: { colorId: 'silver', sizeId: '290' },
    initialQuantity: 2,
  },
}
PriceAdjustment.storyName = '옵션 추가 금액'

export const LowStock: Story = {
  args: { initialSelection: { colorId: 'charcoal', sizeId: '280' } },
}
LowStock.storyName = '재고 부족'

export const ValidationError: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: '장바구니 담기' }))
  },
}
ValidationError.storyName = '필수 옵션 검증'

export const Loading: Story = {
  args: { loading: true },
}
Loading.storyName = '불러오는 중'

export const Unavailable: Story = {
  args: { unavailable: true },
}
Unavailable.storyName = '판매 중지'

export const LongContent: Story = {
  args: { product: longNameProduct },
}
LongContent.storyName = '긴 상품명'

export const MobileBottomSheet: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
}
MobileBottomSheet.storyName = '모바일 바텀시트'
