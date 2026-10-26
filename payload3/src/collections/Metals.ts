// src/collections/Metals.ts
import type { CollectionConfig } from 'payload'

export const Metals: CollectionConfig = {
  slug: 'metals',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'symbol', 'bid', 'ask', 'spread', 'showInTicker'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: { description: 'e.g., Gold, Silver, Platinum' },
    },
    {
      name: 'symbol',
      type: 'text',
      required: true,
      admin: { description: 'e.g., XAU, XAG, XPT' },
    },
    {
      name: 'bid',
      type: 'number',
      required: true,
      admin: { description: 'Current market bid price' },
    },
    {
      name: 'ask',
      type: 'number',
      required: true,
      admin: { description: 'Current market ask price' },
    },
    {
      name: 'spread',
      type: 'number',
      admin: { description: 'Optional spread value' },
    },
    {
      name: 'showInTicker',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Check to display this metal in the top menu ticker.',
        position: 'sidebar',
      },
    },
    {
      name: 'tickerOrder',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Priority order in the ticker (e.g., 1 for Gold, 2 for Silver).',
        position: 'sidebar',
      },
    },
  ],
}

export default Metals
