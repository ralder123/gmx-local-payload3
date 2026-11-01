import type { Block } from 'payload'

export const HeroCarouselBlock: Block = {
  slug: 'heroCarousel',
  labels: {
    singular: 'Hero Carousel',
    plural: 'Hero Carousels',
  },
  fields: [
    {
      name: 'slides',
      type: 'array',
      labels: {
        singular: 'Slide',
        plural: 'Slides',
      },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'subtitle', type: 'text', required: true },
        { name: 'cta', type: 'text', required: true, defaultValue: 'Shop Now' },
        {
          name: 'url',
          type: 'text',
          required: false,
          label: 'Custom Target URL (Optional)',
          admin: {
            description:
              'Leave empty to automatically build a filtered /products URL based on category, brand, weight, form, and country below.',
          },
        },
        { name: 'category', type: 'text', required: true },
        { name: 'brand', type: 'text', required: true },
        { name: 'weight', type: 'text', required: true },
        { name: 'form', type: 'text', required: true },
        { name: 'country', type: 'text', required: true },
      ],
    },
  ],
}
