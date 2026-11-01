import React from 'react'

export interface TrustPillar {
  title: string
  description: string
}

export interface WhyChooseSectionBlockProps {
  heading?: string
  subheading?: string
  pillars?: TrustPillar[]
}

export const WhyChooseSectionBlock: React.FC<WhyChooseSectionBlockProps> = ({
  heading = 'Why Choose Global Metals Exchange',
  subheading = 'Your trusted partner in precious metals acquisition and secure physical delivery.',
  pillars = [],
}) => {
  const defaultPillars: TrustPillar[] = [
    {
      title: 'Verified 99.99% Purity',
      description:
        'All bullion products are sourced directly from accredited mints and rigorously tested for absolute purity.',
    },
    {
      title: 'Fully Insured Shipping',
      description:
        'Every shipment is securely packaged in discreet, tamper-evident boxes and fully insured in transit.',
    },
    {
      title: 'Secure Vault Storage',
      description:
        'Optionally store your holdings in segregated, high-security domestic and international depository vaults.',
    },
    {
      title: 'Guaranteed Buyback',
      description:
        'Enjoy competitive, transparent live-market buyback rates whenever you choose to liquidate your assets.',
    },
  ]

  const displayPillars = pillars && pillars.length > 0 ? pillars : defaultPillars

  return (
    <section className="py-16 bg-muted/20 rounded-3xl px-6 md:px-12 my-12 border">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl font-bold tracking-tight">{heading}</h2>
          {subheading && <p className="text-muted-foreground mt-3 text-lg">{subheading}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayPillars.map((pillar, idx) => (
            <div key={idx} className="bg-background border rounded-2xl p-6 shadow-sm flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold text-lg mb-4">
                0{idx + 1}
              </div>
              <h3 className="font-semibold text-lg mb-2">{pillar.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
