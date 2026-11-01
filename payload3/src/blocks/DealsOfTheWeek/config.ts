import type { Block } from 'payload'

export const DealsOfTheWeekBlock: Block = {
  slug: 'dealsOfTheWeek',
  labels: {
    singular: 'Deals of the Week',
    plural: 'Deals of the Week Sections',
  },
  fields: [
    {
      name: 'deals',
      type: 'array',
      labels: {
        singular: 'Deal Item',
        plural: 'Deal Items',
      },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'url', type: 'text', required: true, label: 'Deal Product URL' },
        { name: 'price', type: 'text', required: true },
        { name: 'originalPrice', type: 'text' },
        { name: 'discount', type: 'text' },
        { name: 'quantity', type: 'text' },
        { name: 'category', type: 'text', required: true },
        { name: 'brand', type: 'text', required: true },
        { name: 'country', type: 'text', required: true },
        { name: 'weight', type: 'text', required: true },
        { name: 'form', type: 'text', required: true },
        { name: 'supplierId', type: 'number', required: true },
      ],
    },
  ],
}
