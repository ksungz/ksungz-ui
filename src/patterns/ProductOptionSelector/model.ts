export interface ProductColor {
  id: string
  label: string
  swatch: string
}

export interface ProductSize {
  id: string
  label: string
}

export interface ProductVariant {
  id: string
  colorId: string
  sizeId: string
  stock: number
  priceAdjustment?: number
}

export interface Product {
  id: string
  brand: string
  name: string
  description: string
  basePrice: number
  image: {
    src: string
    alt: string
  }
  colors: ProductColor[]
  sizes: ProductSize[]
  variants: ProductVariant[]
}

export interface ProductSelection {
  colorId?: string
  sizeId?: string
}

export interface SizeAvailability extends ProductSize {
  stock: number
  priceAdjustment: number
  available: boolean
}

export function findVariant(product: Product, selection: ProductSelection) {
  if (!selection.colorId || !selection.sizeId) return undefined

  return product.variants.find((variant) => (
    variant.colorId === selection.colorId && variant.sizeId === selection.sizeId
  ))
}

export function getSizeAvailability(product: Product, colorId?: string): SizeAvailability[] {
  return product.sizes.map((size) => {
    const variant = colorId
      ? product.variants.find((item) => item.colorId === colorId && item.sizeId === size.id)
      : undefined

    return {
      ...size,
      stock: variant?.stock ?? 0,
      priceAdjustment: variant?.priceAdjustment ?? 0,
      available: Boolean(variant && variant.stock > 0),
    }
  })
}

export function selectColor(product: Product, selection: ProductSelection, colorId: string): ProductSelection {
  if (!selection.sizeId) return { colorId }

  const nextVariant = product.variants.find((variant) => (
    variant.colorId === colorId && variant.sizeId === selection.sizeId
  ))

  return nextVariant?.stock
    ? { colorId, sizeId: selection.sizeId }
    : { colorId }
}

export function getUnitPrice(product: Product, variant?: ProductVariant) {
  return product.basePrice + (variant?.priceAdjustment ?? 0)
}

export function clampQuantity(quantity: number, stock: number) {
  if (stock < 1) return 1
  return Math.min(Math.max(1, quantity), stock)
}

export function formatPrice(price: number) {
  return `${new Intl.NumberFormat('ko-KR').format(price)}원`
}
