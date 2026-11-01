import React, { useState } from 'react'

export interface HeroSlide {
  title: string
  subtitle?: string
  buttonText: string
  buttonUrl: string
  badge?: string
}

export interface HeroCarouselBlockProps {
  slides?: HeroSlide[]
}

export const HeroCarouselBlock: React.FC<HeroCarouselBlockProps> = ({ slides = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const defaultSlides: HeroSlide[] = [
    {
      title: 'Secure Your Wealth with Physical Precious Metals',
      subtitle:
        'Explore our certified selection of gold, silver, platinum, and palladium bullion bars and coins.',
      buttonText: 'Shop All Metals',
      buttonUrl: '/products/metals',
      badge: 'Trusted Bullion Dealer',
    },
    {
      title: '2026 American Eagle Gold & Silver Coins',
      subtitle: 'Now available for immediate delivery with fully insured shipping.',
      buttonText: 'View New Releases',
      buttonUrl: '/products/new-releases',
      badge: 'In Stock',
    },
  ]

  const displaySlides = slides && slides.length > 0 ? slides : defaultSlides
  const currentSlide = displaySlides[currentIndex] || displaySlides[0]

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950 text-white rounded-3xl p-8 md:p-16 my-8 shadow-xl">
      <div className="max-w-3xl">
        {currentSlide.badge && (
          <span className="inline-block px-3.5 py-1 text-xs font-semibold uppercase tracking-wider bg-amber-500/20 text-amber-400 rounded-full mb-6 border border-amber-500/30">
            {currentSlide.badge}
          </span>
        )}
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
          {currentSlide.title}
        </h1>
        {currentSlide.subtitle && (
          <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed">
            {currentSlide.subtitle}
          </p>
        )}
        <div className="flex flex-wrap gap-4 items-center">
          <a
            href={currentSlide.buttonUrl}
            className="px-8 py-3.5 bg-amber-500 text-slate-950 font-bold rounded-xl hover:bg-amber-400 transition-colors shadow-lg"
          >
            {currentSlide.buttonText}
          </a>
        </div>
      </div>

      {/* Carousel Dots Indicator if multiple slides */}
      {displaySlides.length > 1 && (
        <div className="flex gap-2 mt-10">
          {displaySlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2.5 rounded-full transition-all ${
                idx === currentIndex ? 'w-8 bg-amber-400' : 'w-2.5 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
