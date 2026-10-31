import type { Block } from 'payload'

export const HomeMarketSectionBlock: Block = {
  slug: 'homeMarketSection',
  labels: {
    singular: 'Home Market Section',
    plural: 'Home Market Sections',
  },
  fields: [
    {
      name: 'spotPrices',
      type: 'array',
      labels: {
        singular: 'Spot Price Row',
        plural: 'Spot Price Rows',
      },
      admin: {
        description:
          'Configure rows for the spot prices table (Gold, Silver, Platinum, Palladium, etc.).',
      },
      fields: [
        { name: 'metal', type: 'text', required: true },
        { name: 'bid', type: 'text', required: true },
        { name: 'ask', type: 'text', required: true },
        { name: 'change', type: 'text', required: true },
        { name: 'isPositive', type: 'checkbox', required: true, defaultValue: true },
      ],
    },
    {
      name: 'promoCards',
      type: 'array',
      labels: {
        singular: 'Promo Card',
        plural: 'Promo Cards',
      },
      minRows: 1,
      maxRows: 6,
      admin: {
        description: 'Promotional tiles displayed beside or near the spot price table.',
      },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'badge', type: 'text', label: 'Badge Text (e.g. BUY NOW)' },
        { name: 'buttonText', type: 'text', required: true },
        { name: 'buttonUrl', type: 'text', required: true },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Card Image',
        },
        {
          name: 'variant',
          type: 'select',
          defaultValue: 'gold',
          options: [
            { label: 'Gold Accent', value: 'gold' },
            { label: 'Silver Accent', value: 'silver' },
            { label: 'Brand / Dark Accent', value: 'brand' },
          ],
        },
      ],
    },
  ],
}
