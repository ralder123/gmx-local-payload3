import { adminOnly } from '@/access/adminOnly'
import type { Field, GlobalConfig } from 'payload'

// The storefront should map these names to its Lucide icons.
const iconOptions = [
  { label: 'None', value: 'none' },
  { label: 'Shopping cart', value: 'ShoppingCart' },
  { label: 'Hamburger menu', value: 'Menu' },
  { label: 'Close', value: 'X' },
  { label: 'User', value: 'User' },
  { label: 'Sign up', value: 'UserPlus' },
  { label: 'Sign in', value: 'LogIn' },
  { label: 'Support', value: 'Headphones' },
  { label: 'Track order', value: 'PackageSearch' },
  { label: 'Chevron down', value: 'ChevronDown' },
  { label: 'Trending up', value: 'TrendingUp' },
  { label: 'Trending down', value: 'TrendingDown' },
]

const iconField = (name = 'icon', defaultValue = 'none'): Field => ({
  name,
  type: 'select',
  defaultValue,
  options: iconOptions,
})

const linkFields = (): Field[] => [
  { name: 'label', type: 'text', required: true },
  {
    name: 'url',
    type: 'text',
    required: true,
    admin: {
      description:
        'Internal path or HTTP(S) URL. Query parameters are preserved, e.g. /products/metals?category=gold.',
    },
  },
  { name: 'newTab', type: 'checkbox', defaultValue: false },
  iconField(),
  {
    name: 'description',
    type: 'textarea',
    admin: { description: 'Optional supporting text for submenu links.' },
  },
]

const metals = ['gold', 'silver', 'platinum', 'palladium']

const defaultNavigation = [
  { label: 'BEST SELLERS', url: '/best-sellers', newTab: false },
  ...metals.map((metal) => ({
    label: metal.toUpperCase(),
    url: `/products/metals?category=${metal}`,
    newTab: false,
    subLinks: ['Coin', 'Bar', 'Ingot', 'Rounds', 'Nugget', 'Fractional'].map((label) => ({
      label,
      url: `/products/metals?category=${metal}&subcategory=${label.toLowerCase()}&formFactors=${label.toLowerCase()}`,
      newTab: false,
    })),
  })),
  {
    label: 'RARE COINS',
    url: '/products/metals?category=rare%20coins',
    newTab: false,
  },
  { label: 'IRA', url: '/products/investments', newTab: false },
  {
    label: 'OTHER ACCESSORIES',
    url: '/products/other-accessories',
    newTab: false,
  },
  {
    label: 'SECURE STORAGE',
    url: '/products/secure-storage',
    newTab: false,
  },
  {
    label: 'RESOURCES',
    url: '/resources',
    newTab: false,
    subLinks: [
      { label: 'Interactive Charts', url: '/charts', newTab: false },
      ...metals.map((metal) => ({
        label: `${metal.charAt(0).toUpperCase()}${metal.slice(1)} Spot Price`,
        url: `/charts?metal=${metal}`,
        newTab: false,
      })),
      { label: 'Guides', url: '/resources?section=guides', newTab: false },
      { label: 'Market Analysis', url: '/market-analysis', newTab: false },
      { label: 'Buyback Program', url: '/buyback-program', newTab: false },
    ],
  },
]

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header',
  access: {
    read: () => true,
    update: adminOnly,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Top Bar & Utility Links',
          fields: [
            {
              name: 'announcement',
              type: 'group',
              fields: [
                { name: 'enabled', type: 'checkbox', defaultValue: true },
                {
                  name: 'text',
                  type: 'textarea',
                  defaultValue: 'Support',
                  admin: { description: 'Plain text, not a rich-text document.' },
                },
                {
                  name: 'linkLabel',
                  label: 'Announcement link text',
                  type: 'text',
                  defaultValue: 'Track Order',
                },
                {
                  name: 'linkUrl',
                  type: 'text',
                  defaultValue: '/track-order',
                },
                { name: 'newTab', type: 'checkbox', defaultValue: false },
                iconField('linkIcon', 'PackageSearch'),
              ],
            },
            {
              name: 'utilityLinks',
              label: 'Support & Track Order Links',
              type: 'array',
              admin: {
                description:
                  'Additional icon-enabled links. When connected, avoid duplicating Track Order if it is also the announcement link.',
              },
              defaultValue: [
                {
                  label: 'Support',
                  url: '/support',
                  newTab: false,
                  icon: 'Headphones',
                },
                {
                  label: 'Track Order',
                  url: '/track-order',
                  newTab: false,
                  icon: 'PackageSearch',
                },
              ],
              fields: linkFields(),
            },
          ],
        },
        {
          label: 'Logo & Branding',
          fields: [
            {
              name: 'brand',
              type: 'group',
              fields: [
                {
                  name: 'siteName',
                  type: 'text',
                  required: true,
                  defaultValue: 'GOLDMONEX',
                },
                {
                  name: 'homeUrl',
                  type: 'text',
                  required: true,
                  defaultValue: '/',
                },
                { name: 'trademark', type: 'text', defaultValue: '®' },
                {
                  name: 'logo',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description:
                      'Optional logo. Requires a publicly readable media collection. Fetch the header with depth=2; site name is the fallback.',
                  },
                },
                { name: 'logoAlt', type: 'text', defaultValue: '' },
              ],
            },
          ],
        },
        {
          label: 'Menus & Submenus',
          fields: [
            {
              name: 'navigation',
              label: 'Primary Navigation',
              type: 'array',
              defaultValue: defaultNavigation,
              admin: {
                description:
                  'Shared by desktop and mobile. Reorder rows to change menu order. Items without sub-links or groups remain direct links.',
              },
              fields: [
                ...linkFields(),
                {
                  name: 'subLinks',
                  label: 'Submenu Links',
                  type: 'array',
                  fields: linkFields(),
                },
                {
                  name: 'groups',
                  label: 'Mega-menu Groups',
                  type: 'array',
                  fields: [
                    { name: 'title', label: 'Group Heading', type: 'text' },
                    {
                      name: 'links',
                      type: 'array',
                      required: true,
                      minRows: 1,
                      fields: linkFields(),
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Sign Up & Sign In',
          fields: [
            {
              name: 'ctaItems',
              label: 'Header Buttons',
              type: 'array',
              defaultValue: [
                {
                  label: 'Sign Up',
                  url: '/create-account',
                  newTab: false,
                  icon: 'UserPlus',
                  variant: 'outline',
                  visibility: 'signedOut',
                },
                {
                  label: 'Sign In',
                  url: '/login',
                  newTab: false,
                  icon: 'LogIn',
                  variant: 'default',
                  visibility: 'signedOut',
                },
              ],
              fields: [
                ...linkFields(),
                {
                  name: 'variant',
                  type: 'select',
                  required: true,
                  defaultValue: 'default',
                  options: [
                    { label: 'Primary', value: 'default' },
                    { label: 'Secondary', value: 'secondary' },
                    { label: 'Outline', value: 'outline' },
                    { label: 'Ghost', value: 'ghost' },
                    { label: 'Link', value: 'link' },
                    { label: 'Destructive', value: 'destructive' },
                  ],
                },
                {
                  name: 'visibility',
                  type: 'select',
                  required: true,
                  defaultValue: 'signedOut',
                  options: [
                    { label: 'Signed-out visitors', value: 'signedOut' },
                    { label: 'Signed-in visitors', value: 'signedIn' },
                    { label: 'Everyone', value: 'always' },
                  ],
                  admin: {
                    description: 'Display only; does not grant account permissions.',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Cart & Mobile Menu',
          fields: [
            {
              name: 'userActions',
              type: 'group',
              fields: [
                { name: 'showCart', type: 'checkbox', defaultValue: true },
                {
                  name: 'cartLabel',
                  type: 'text',
                  required: true,
                  defaultValue: 'Shopping cart',
                },
                {
                  name: 'cartUrl',
                  type: 'text',
                  required: true,
                  defaultValue: '/cart',
                },
                iconField('cartIcon', 'ShoppingCart'),
                {
                  name: 'showCartCount',
                  label: 'Show Cart Quantity Badge',
                  type: 'checkbox',
                  defaultValue: true,
                  admin: { description: 'Quantity comes from the active cart, not the CMS.' },
                },
                {
                  name: 'accountLabel',
                  type: 'text',
                  required: true,
                  defaultValue: 'User account menu',
                },
                iconField('accountIcon', 'User'),
              ],
            },
            {
              name: 'mobileNavigation',
              type: 'group',
              admin: {
                description:
                  'Uses the primary navigation array above, including its submenus. Focus, Escape dismissal, and open state remain controlled by the storefront.',
              },
              fields: [
                iconField('menuIcon', 'Menu'),
                iconField('closeIcon', 'X'),
                iconField('submenuIcon', 'ChevronDown'),
                {
                  name: 'openLabel',
                  type: 'text',
                  required: true,
                  defaultValue: 'Open navigation menu',
                },
                {
                  name: 'closeLabel',
                  type: 'text',
                  required: true,
                  defaultValue: 'Close navigation menu',
                },
                {
                  name: 'expandLabel',
                  type: 'text',
                  required: true,
                  defaultValue: 'Expand',
                },
                {
                  name: 'collapseLabel',
                  type: 'text',
                  required: true,
                  defaultValue: 'Collapse',
                },
              ],
            },
          ],
        },
        {
          label: 'Live Price Ticker',
          fields: [
            {
              name: 'ticker',
              type: 'group',
              admin: {
                description:
                  'Controls ticker presentation and instruments. Actual live prices require a market-data integration; the current storefront simulates updates.',
              },
              fields: [
                { name: 'enabled', type: 'checkbox', defaultValue: true },
                {
                  name: 'accessibleLabel',
                  type: 'text',
                  required: true,
                  defaultValue: 'Precious metal prices',
                },
                {
                  name: 'currency',
                  type: 'select',
                  defaultValue: 'USD',
                  options: [{ label: 'US Dollar', value: 'USD' }],
                },
                {
                  name: 'scrollDurationSeconds',
                  type: 'number',
                  min: 5,
                  max: 120,
                  defaultValue: 25,
                },
                { name: 'pauseOnHover', type: 'checkbox', defaultValue: true },
                { name: 'showChange', type: 'checkbox', defaultValue: true },
                { name: 'showChangePercent', type: 'checkbox', defaultValue: true },
                iconField('upIcon', 'TrendingUp'),
                iconField('downIcon', 'TrendingDown'),
                {
                  name: 'items',
                  label: 'Ticker Instruments',
                  type: 'array',
                  defaultValue: [
                    {
                      label: 'GOLD',
                      symbol: 'XAU',
                      category: 'gold',
                      url: '/charts?metal=gold',
                      newTab: false,
                    },
                    {
                      label: 'SILVER',
                      symbol: 'XAG',
                      category: 'silver',
                      url: '/charts?metal=silver',
                      newTab: false,
                    },
                    {
                      label: 'PLATINUM',
                      symbol: 'XPT',
                      category: 'platinum',
                      url: '/charts?metal=platinum',
                      newTab: false,
                    },
                    {
                      label: 'PALLADIUM',
                      symbol: 'XPD',
                      category: 'palladium',
                      url: '/charts?metal=palladium',
                      newTab: false,
                    },
                  ],
                  fields: [
                    ...linkFields(),
                    { name: 'symbol', type: 'text', required: true },
                    {
                      name: 'category',
                      type: 'select',
                      required: true,
                      options: metals.map((metal) => ({
                        label: metal.toUpperCase(),
                        value: metal,
                      })),
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

export default Header
