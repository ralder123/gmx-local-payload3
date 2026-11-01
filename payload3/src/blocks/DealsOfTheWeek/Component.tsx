import React from 'react'

export interface DealItem {
  title: string
  price: string
  originalPrice?: string
  discountBadge?: string
  imageUrl?: string
  productUrl: string
}

export interface DealsOfTheWeekBlockProps {
  heading?: string
  subheading?: string
  deals?: DealItem[]
}

export const DealsOfTheWeekBlock: React.FC<DealsOfTheWeekBlockProps> = ({
  heading = 'Deals of the Week',
  subheading = 'Limited-time discounts on premium precious metals and certified bullion.',
  deals = [],
}) => {
  // Default mock deals if none provided by CMS
  const defaultDeals: DealItem[] = [
    {
      title: '1 oz Gold American Eagle (Random Year)',
      price: '$2,685.50',
      originalPrice: '$2,720.00',
      discountBadge: 'Save $34.50',
      productUrl: '#',
    },
    {
      title: '10 oz Silver Bar (A-Mark / Engelhard)',
      price: '$325.00',
      originalPrice: '$345.00',
      discountBadge: 'Save $20.00',
      productUrl: '#',
    },
    {
      title: '1 oz Canadian Silver Maple Leaf',
      price: '$33.80',
      originalPrice: '$36.50',
      discountBadge: 'Best Seller',
      productUrl: '#',
    },
  ]

  const displayDeals = deals && deals.length > 0 ? deals : defaultDeals

  return (
    <section className="py-12 bg-muted/30 rounded-2xl px-6 md:px-12 my-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight">{heading}</h2>
          {subheading && <p className="text-muted-foreground mt-2">{subheading}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayDeals.map((deal, idx) => (
            <div
              key={idx}
              className="bg-background border rounded-xl p-6 shadow-sm flex flex-col justify-between"
            >
              <div>
                {deal.discountBadge && (
                  <span className="inline-block px-3 py-1 text-xs font-semibold bg-amber-500/10 text-amber-600 rounded-full mb-4">
                    {deal.discountBadge}
                  </span>
                )}
                <h3 className="font-semibold text-lg mb-2">{deal.title}</h3>
                <div className="flex items-baseline gap-3 mt-4">
                  <span className="text-2xl font-bold text-primary">{deal.price}</span>
                  {deal.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      {deal.originalPrice}
                    </span>
                  )}
                </div>
              </div>
              <a
                href={deal.productUrl}
                className="mt-6 w-full py-2.5 px-4 bg-primary text-primary-foreground font-medium rounded-lg text-center hover:opacity-90 transition-opacity"
              >
                Claim Deal
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
