import React from 'react'

export interface SpotPriceRow {
  metal: string
  bid: string
  ask: string
  change: string
  isPositive: boolean
}

export interface PromoCardItem {
  title: string
  badge?: string
  buttonText: string
  buttonUrl: string
  image?:
    | {
        url?: string
        alt?: string
      }
    | string
  variant?: 'gold' | 'silver' | 'brand'
}

export interface HomeMarketSectionBlockProps {
  spotPrices?: SpotPriceRow[]
  promoCards?: PromoCardItem[]
}

export const HomeMarketSectionBlock: React.FC<HomeMarketSectionBlockProps> = ({
  spotPrices = [],
  promoCards = [],
}) => {
  // Default mock data if none provided via CMS
  const defaultSpotPrices: SpotPriceRow[] = [
    { metal: 'Gold', bid: '2,650.20', ask: '2,652.40', change: '+1.2%', isPositive: true },
    { metal: 'Silver', bid: '31.45', ask: '31.55', change: '+2.4%', isPositive: true },
    { metal: 'Platinum', bid: '985.00', ask: '990.00', change: '-0.4%', isPositive: false },
    { metal: 'Palladium', bid: '1,040.00', ask: '1,055.00', change: '+0.8%', isPositive: true },
  ]

  const defaultPromoCards: PromoCardItem[] = [
    {
      title: 'Gold American Eagle Series',
      badge: 'BUY NOW',
      buttonText: 'Shop Gold',
      buttonUrl: '/products/metals?category=gold',
      variant: 'gold',
    },
    {
      title: 'Investment Grade Silver Bars',
      badge: 'POPULAR',
      buttonText: 'Shop Silver',
      buttonUrl: '/products/metals?category=silver',
      variant: 'silver',
    },
  ]

  const displayPrices = spotPrices && spotPrices.length > 0 ? spotPrices : defaultSpotPrices
  const displayCards = promoCards && promoCards.length > 0 ? promoCards : defaultPromoCards

  return (
    <section className="py-12 my-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Spot Prices Table */}
        <div className="lg:col-span-7 bg-card border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold tracking-tight">Live Spot Prices</h3>
            <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-500/10 text-emerald-600 rounded-full">
              Live Feed
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b text-xs text-muted-foreground uppercase tracking-wider">
                  <th className="pb-3 font-medium">Metal</th>
                  <th className="pb-3 font-medium">Bid</th>
                  <th className="pb-3 font-medium">Ask</th>
                  <th className="pb-3 font-medium text-right">Change</th>
                </tr>
              </thead>
              <tbody className="divide-y text-sm">
                {displayPrices.map((row, idx) => (
                  <tr key={idx} className="hover:bg-muted/50 transition-colors">
                    <td className="py-3.5 font-semibold">{row.metal}</td>
                    <td className="py-3.5 font-mono text-muted-foreground">${row.bid}</td>
                    <td className="py-3.5 font-mono text-muted-foreground">${row.ask}</td>
                    <td
                      className={`py-3.5 font-mono font-medium text-right ${row.isPositive ? 'text-emerald-600' : 'text-rose-600'}`}
                    >
                      {row.change}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Promo Cards Grid */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          {displayCards.map((card, idx) => {
            const imageUrl =
              typeof card.image === 'object' && card.image !== null ? card.image.url : undefined

            return (
              <div
                key={idx}
                className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 shadow-md flex flex-col justify-between relative overflow-hidden"
              >
                <div>
                  {card.badge && (
                    <span className="inline-block px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-400 rounded-full mb-3">
                      {card.badge}
                    </span>
                  )}
                  <h4 className="text-lg font-bold mb-4">{card.title}</h4>
                </div>

                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={card.title}
                    className="w-full h-32 object-cover rounded-lg mb-4 opacity-90"
                  />
                )}

                <a
                  href={card.buttonUrl}
                  className="inline-flex items-center justify-center px-4 py-2 bg-amber-500 text-slate-950 font-semibold rounded-xl text-sm hover:bg-amber-400 transition-colors"
                >
                  {card.buttonText}
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
