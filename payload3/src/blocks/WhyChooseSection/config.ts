import type { Block } from 'payload'

export const WhyChooseSectionBlock: Block = {
  slug: 'whyChooseSection',
  labels: {
    singular: 'Why Choose Section',
    plural: 'Why Choose Sections',
  },
  fields: [
    {
      name: 'features',
      type: 'array',
      labels: {
        singular: 'Feature',
        plural: 'Features',
      },
      fields: [
        {
          name: 'icon',
          type: 'text',
          required: true,
          admin: { description: 'Lucide icon name (e.g. Shield, Truck, Award)' },
        },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
      ],
    },
  ],
}
