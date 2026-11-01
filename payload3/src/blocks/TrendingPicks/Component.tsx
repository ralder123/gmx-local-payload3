import React from 'react'

export interface TrendingItem {
  title: string
  price: string
  category?: string
  productUrl: string
  badge?: string
}

export interface TrendingPicksBlockProps {
  heading?: string
  subheading?: string
  items?: TrendingItem[]
}

export const TrendingPicksBlock: React.FC<TrendingPicksBlockProps> = ({
  heading = 'Trending Picks',
  subheading = 'Most popular bullion items among investors this week.',
  items = [],
}) => {
  const defaultItems: TrendingItem[] = [
    {
      title: '1 oz Gold Buffalo Coin (Uncirculated)',
      price: '$2,670.00',
      category: 'Gold Coins',
      productUrl: '#',
      badge: 'Trending',
    },
    {
      title: '100 oz Silver Bar (Comex Approved)',
      price: '$3,180.00',
      category: 'Silver Bars',
      productUrl: '#',
      badge: 'Best Value',
    },
    {
      title: '1 oz Platinum Australian Koala',
      price: '$995.00',
      category: 'Platinum',
      productUrl: '#',
    },
    {
      title: '1/10 oz Gold American Eagle',
      price: '$290.00',
      category: 'Fractional Gold',
      productUrl: '#',
      badge: 'Popular',
    },
  ]

  const displayItems = items && items.length > 0 ? items : defaultItems

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
          {displayItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-card border rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  {item.category && (
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {item.category}
                    </span>
                  )}
                  {item.badge && (
                    <span className="px-2.5 py-0.5 text-xs font-semibold bg-primary/10 text-primary rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-base mb-3 leading-snug">{item.title}</h3>
              </div>
              <div className="mt-6 pt-4 border-t flex items-center justify-between">
                <span className="text-xl font-bold">{item.price}</span>
                <a
                  href={item.productUrl}
                  className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
                >
                  View
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
