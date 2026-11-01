import Link from 'next/link'
import React from 'react'

export interface TrendingItem {
  name?: string
  title?: string
  category: string
  brand: string
  url: string
  country: string
  weight: string
  form: string
  price: string
  purity: string
  year: number
  supplierId: number
  badge?: string
}

export interface TrendingPicksBlockProps {
  heading?: string
  subheading?: string
  trendingPicks?: TrendingItem[]
  items?: TrendingItem[]
}

export const TrendingPicksBlock: React.FC<TrendingPicksBlockProps> = ({
  heading = 'Trending Picks',
  subheading = 'Most popular bullion items among investors this week.',
  trendingPicks = [],
  items = [],
}) => {
  const defaultItems: TrendingItem[] = [
    {
      name: '1 oz Gold Buffalo Coin',
      price: '$2,670.00',
      category: 'Gold Coins',
      brand: 'U.S. Mint',
      country: 'United States',
      weight: '1 oz',
      form: 'Coin',
      purity: '99.99%',
      year: 2026,
      supplierId: 101,
      url: '/products/trending/gold-buffalo',
      badge: 'Trending',
    },
    {
      name: '100 oz Silver Bar',
      price: '$3,180.00',
      category: 'Silver Bars',
      brand: 'Royal Canadian Mint',
      country: 'Canada',
      weight: '100 oz',
      form: 'Bar',
      purity: '99.99%',
      year: 2026,
      supplierId: 102,
      url: '/products/trending/silver-bar-100oz',
      badge: 'Best Value',
    },
    {
      name: '1 oz Platinum Australian Koala',
      price: '$995.00',
      category: 'Platinum',
      brand: 'Perth Mint',
      country: 'Australia',
      weight: '1 oz',
      form: 'Coin',
      purity: '99.95%',
      year: 2026,
      supplierId: 103,
      url: '/products/trending/platinum-koala',
    },
    {
      name: '1/10 oz Gold American Eagle',
      price: '$290.00',
      category: 'Fractional Gold',
      brand: 'U.S. Mint',
      country: 'United States',
      weight: '1/10 oz',
      form: 'Coin',
      purity: '91.67%',
      year: 2026,
      supplierId: 104,
      url: '/products/trending/gold-eagle-1-10',
      badge: 'Popular',
    },
  ]

  // Accepts both trendingPicks (from config schema) and items (as dynamic fallback)
  const sourceList = trendingPicks.length > 0 ? trendingPicks : items
  const displayItems = sourceList && sourceList.length > 0 ? sourceList : defaultItems

  return (
    <section className="py-12 my-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">{heading}</h2>
            {subheading && <p className="text-muted-foreground mt-2">{subheading}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayItems.map((item, idx) => {
            const itemTitle = item.name || item.title || 'Trending Product'
            const targetUrl = item.url || '#'

            return (
              <Link
                key={idx}
                href={targetUrl}
                className="group bg-card border rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-amber-500/50 transition-all duration-300 cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    {item.category && (
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        {item.category}
                      </span>
                    )}
                    {item.purity && (
                      <span className="px-2.5 py-0.5 text-xs font-semibold bg-amber-500/10 text-amber-600 rounded-full">
                        {item.purity}
                      </span>
                    )}
                  </div>

                  <h3 className="font-semibold text-base mb-2 leading-snug group-hover:text-amber-500 transition-colors">
                    {itemTitle}
                  </h3>

                  {(item.brand || item.weight) && (
                    <p className="text-xs text-muted-foreground mb-3">
                      {item.brand} • {item.weight} {item.year ? `(${item.year})` : ''}
                    </p>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t flex items-center justify-between">
                  <span className="text-xl font-bold">{item.price}</span>
                  <div className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg group-hover:opacity-90 transition-opacity">
                    View
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
