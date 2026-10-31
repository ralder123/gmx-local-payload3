import type { Block } from 'payload'

export const TrendingPicksBlock: Block = {
  slug: 'trendingPicks',
  labels: {
    singular: 'Trending Picks Carousel',
    plural: 'Trending Picks Carousels',
  },
  fields: [
    {
      name: 'trendingPicks',
      type: 'array',
      labels: {
        singular: 'Trending Pick Item',
        plural: 'Trending Pick Items',
      },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'category', type: 'text', required: true },
        { name: 'brand', type: 'text', required: true },
        { name: 'country', type: 'text', required: true },
        { name: 'weight', type: 'text', required: true },
        { name: 'form', type: 'text', required: true },
        { name: 'price', type: 'text', required: true },
        { name: 'purity', type: 'text', required: true },
        { name: 'year', type: 'number', required: true },
        { name: 'supplierId', type: 'number', required: true },
      ],
    },
  ],
}
