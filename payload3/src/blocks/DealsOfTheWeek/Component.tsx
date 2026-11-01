import React from 'react'
import Link from 'next/link'

export interface DealItem {
  name?: string
  title?: string
  url?: string
  productUrl?: string
  price: string
  originalPrice?: string
  discount?: string
  discountBadge?: string
  quantity?: string
  category?: string
  brand?: string
  country?: string
  weight?: string
  form?: string
  supplierId?: number
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
  // Default mock deals matching the CMS schema structure
  const defaultDeals: DealItem[] = [
    {
      name: '1 oz Gold American Eagle (Random Year)',
      price: '$2,685.50',
      originalPrice: '$2,720.00',
      discount: 'Save $34.50',
      url: '/products/deals/gold-eagle',
      category: 'Gold Coins',
      brand: 'U.S. Mint',
      country: 'United States',
      weight: '1 oz',
      form: 'Coin',
      supplierId: 101,
    },
    {
      name: '10 oz Silver Bar (A-Mark / Engelhard)',
      price: '$325.00',
      originalPrice: '$345.00',
      discount: 'Save $20.00',
      url: '/products/deals/silver-bar',
      category: 'Silver Bars',
      brand: 'A-Mark',
      country: 'United States',
      weight: '10 oz',
      form: 'Bar',
      supplierId: 102,
    },
    {
      name: '1 oz Canadian Silver Maple Leaf',
      price: '$33.80',
      originalPrice: '$36.50',
      discount: 'Best Seller',
      url: '/products/deals/silver-maple',
      category: 'Silver Coins',
      brand: 'Royal Canadian Mint',
      country: 'Canada',
      weight: '1 oz',
      form: 'Coin',
      supplierId: 103,
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
          {displayDeals.map((deal, idx) => {
            const dealTitle = deal.name || deal.title || 'Special Deal'
            const discountBadge = deal.discount || deal.discountBadge
            const targetUrl = deal.url || deal.productUrl || '#'

            return (
              <Link
                key={idx}
                href={targetUrl}
                className="group bg-background border rounded-xl p-6 shadow-sm hover:shadow-md hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    {discountBadge && (
                      <span className="inline-block px-3 py-1 text-xs font-semibold bg-amber-500/10 text-amber-600 rounded-full">
                        {discountBadge}
                      </span>
                    )}
                    {deal.weight && (
                      <span className="text-xs font-medium text-muted-foreground">
                        {deal.weight} • {deal.form}
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-amber-500 transition-colors">
                    {dealTitle}
                  </h3>
                  {deal.brand && (
                    <p className="text-xs text-muted-foreground mb-3">
                      {deal.brand} ({deal.country})
                    </p>
                  )}
                  <div className="flex items-baseline gap-3 mt-4">
                    <span className="text-2xl font-bold text-primary">{deal.price}</span>
                    {deal.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {deal.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-6 w-full py-2.5 px-4 bg-primary text-primary-foreground font-medium rounded-lg text-center group-hover:opacity-90 transition-opacity">
                  Claim Deal
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
