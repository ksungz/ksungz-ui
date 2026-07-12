import type { Product } from './model'

export const dailyRunnerProduct: Product = {
  id: 'daily-runner-02',
  name: '데일리 러너 02',
  description: '도심 러닝과 가벼운 산책에 맞춘 쿠셔닝 러닝화',
  basePrice: 129000,
  image: {
    src: '/products/daily-runner.jpg',
    alt: '흰 배경 위에 놓인 파란색과 회색 러닝화',
  },
  colors: [
    { id: 'charcoal', label: '차콜', swatch: '#32363d' },
    { id: 'navy', label: '네이비', swatch: '#315d78' },
    { id: 'silver', label: '실버', swatch: '#b7bdc6' },
  ],
  sizes: [
    { id: '250', label: '250' },
    { id: '260', label: '260' },
    { id: '270', label: '270' },
    { id: '280', label: '280' },
    { id: '290', label: '290' },
  ],
  variants: [
    { id: 'charcoal-250', colorId: 'charcoal', sizeId: '250', stock: 6 },
    { id: 'charcoal-260', colorId: 'charcoal', sizeId: '260', stock: 0 },
    { id: 'charcoal-270', colorId: 'charcoal', sizeId: '270', stock: 8 },
    { id: 'charcoal-280', colorId: 'charcoal', sizeId: '280', stock: 1 },
    { id: 'charcoal-290', colorId: 'charcoal', sizeId: '290', stock: 0 },
    { id: 'navy-250', colorId: 'navy', sizeId: '250', stock: 0 },
    { id: 'navy-260', colorId: 'navy', sizeId: '260', stock: 5 },
    { id: 'navy-270', colorId: 'navy', sizeId: '270', stock: 4 },
    { id: 'navy-280', colorId: 'navy', sizeId: '280', stock: 2, priceAdjustment: 5000 },
    { id: 'navy-290', colorId: 'navy', sizeId: '290', stock: 3, priceAdjustment: 5000 },
    { id: 'silver-250', colorId: 'silver', sizeId: '250', stock: 3 },
    { id: 'silver-260', colorId: 'silver', sizeId: '260', stock: 2 },
    { id: 'silver-270', colorId: 'silver', sizeId: '270', stock: 0 },
    { id: 'silver-280', colorId: 'silver', sizeId: '280', stock: 4, priceAdjustment: 10000 },
    { id: 'silver-290', colorId: 'silver', sizeId: '290', stock: 2, priceAdjustment: 10000 },
  ],
}

export const longNameProduct: Product = {
  ...dailyRunnerProduct,
  id: 'daily-runner-long-name',
  name: '데일리 러너 02 리플렉티브 메시 한정 컬러',
  description: '야간 시인성을 높인 반사 소재와 통기성 메시를 함께 사용한 러닝화',
}
