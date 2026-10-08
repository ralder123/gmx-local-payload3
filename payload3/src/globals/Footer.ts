import type { GlobalConfig } from 'payload'
import { adminOnly } from '@/access/adminOnly'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
    update: adminOnly,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        // Tab 1: Sales Banner
        {
          label: 'Sales Banner',
          fields: [
            {
              name: 'salesBanner',
              type: 'group',
              fields: [
                { name: 'enabled', type: 'checkbox', defaultValue: true },
                { name: 'text', type: 'text', defaultValue: 'All Sales Are Final' },
                { name: 'linkText', type: 'text', defaultValue: 'Buyback Program Available' },
                { name: 'linkUrl', type: 'text', defaultValue: '/buyback-program' },
              ],
            },
          ],
        },
        // Tab 2: Brand Block
        {
          label: 'Brand',
          fields: [
            {
              name: 'brand',
              type: 'group',
              fields: [
                { name: 'siteName', type: 'text', defaultValue: 'GOLDMONEX' },
                { name: 'homeUrl', type: 'text', defaultValue: '/' },
                { name: 'ratingNumber', type: 'number', defaultValue: 4.9 },
                { name: 'reviewCountText', type: 'text', defaultValue: '4.9/5 (2,847 reviews)' },
                {
                  name: 'tagline',
                  type: 'text',
                  defaultValue: "America's trusted precious metals dealer since 2024",
                },
              ],
            },
          ],
        },
        // Tab 3: Link Columns (Products, Services, Support, Company)
        {
          label: 'Link Columns',
          fields: [
            {
              name: 'linkColumns',
              type: 'array',
              maxRows: 5,
              defaultValue: [
                {
                  title: 'PRODUCTS',
                  links: [
                    { label: 'Gold Coins', url: '/products/metals?category=gold&formFactors=coin' },
                    { label: 'Gold Bars', url: '/products/metals?category=gold&formFactors=bar' },
                    {
                      label: 'Silver Coins',
                      url: '/products/metals?category=silver&formFactors=coin',
                    },
                    {
                      label: 'Silver Bars',
                      url: '/products/metals?category=silver&formFactors=bar',
                    },
                    { label: 'Platinum', url: '/products/metals?category=platinum' },
                    { label: 'Rare Coins', url: '/products/metals?category=rare%20coins' },
                  ],
                },
                {
                  title: 'SERVICES',
                  links: [
                    { label: 'Precious Metals IRA', url: '/products/investments' },
                    { label: 'Secure Storage', url: '/products/secure-storage' },
                    { label: 'Other Accessories', url: '/products/other-accessories' },
                    { label: 'Returns', url: '/buyback-program' },
                  ],
                },
                {
                  title: 'SUPPORT',
                  links: [
                    { label: 'Customer Support', url: '/support' },
                    { label: 'Track Order', url: '/track-order' },
                    { label: 'FAQ', url: '/faq' },
                    { label: 'Shipping Info', url: '/shipping-info' },
                    { label: 'Sales Policy', url: '/buyback-program' },
                    { label: 'Quality Guarantee', url: '/quality-guarantee' },
                  ],
                },
                {
                  title: 'COMPANY',
                  links: [
                    { label: 'About Us', url: '/about-us' },
                    { label: 'Reviews', url: '/reviews' },
                    { label: 'Privacy Policy', url: '/privacy-policy' },
                    { label: 'Terms of Service', url: '/terms-of-service' },
                    { label: 'Resources', url: '/resources' },
                  ],
                },
              ],
              fields: [
                { name: 'title', type: 'text', required: true },
                {
                  name: 'links',
                  type: 'array',
                  fields: [
                    { name: 'label', type: 'text', required: true },
                    {
                      name: 'url',
                      type: 'text',
                      required: true,
                      admin: {
                        description: 'Supports query params like /products/metals?category=gold'
                      }
                    },
                    { name: 'newTab', type: 'checkbox', defaultValue: false },
                  ],
                },
              ],
            },
          ],
        },
        // Tab 4: Disclosure Box
        {
          label: 'Disclosure',
          fields: [
            {
              name: 'disclosure',
              type: 'group',
              fields: [
                { name: 'heading', type: 'text', defaultValue: 'Important Disclosure →' },
                {
                  name: 'body',
                  type: 'textarea',
                  defaultValue:
                    'Goldmonex sells physical precious metals — not investments or securities.',
                },
                { name: 'linkText', type: 'text', defaultValue: 'Read the full disclosure' },
                { name: 'linkUrl', type: 'text', defaultValue: '/important-disclosure' },
              ],
            },
          ],
        },
        // Tab 5: Bottom Bar & Trust Badges
        {
          label: 'Bottom Bar',
          fields: [
            {
              name: 'bottomBar',
              type: 'group',
              fields: [
                { name: 'startYear', type: 'text', defaultValue: '2024' },
                { name: 'companyName', type: 'text', defaultValue: 'GoldMonex' },
                {
                  name: 'trustBadges',
                  type: 'array',
                  defaultValue: [
                    { badgeText: 'BBB A+ Rating' },
                    { badgeText: 'SSL Secured' },
                    { badgeText: 'Insured Shipping' },
                  ],
                  fields: [{ name: 'badgeText', type: 'text', required: true }],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
