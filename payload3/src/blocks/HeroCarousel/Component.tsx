'use client'

import React, { useState } from 'react'

export interface HeroSlide {
  id?: string
  title: string
  subtitle?: string
  cta?: string
  buttonText?: string
  buttonUrl?: string
  category?: string
  brand?: string
  weight?: string
  form?: string
  country?: string
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
      cta: 'Shop All Metals',
      buttonUrl: '/products/metals',
      category: 'Trusted Bullion Dealer',
    },
    {
      title: '2026 American Eagle Gold & Silver Coins',
      subtitle: 'Now available for immediate delivery with fully insured shipping.',
      cta: 'View New Releases',
      buttonUrl: '/products/new-releases',
      category: 'In Stock',
    },
  ]

  const displaySlides = slides && slides.length > 0 ? slides : defaultSlides
  const currentSlide = displaySlides[currentIndex] || displaySlides[0]

  // Resolve CMS props to display values with fallbacks
  const slideBadge = currentSlide.category || currentSlide.badge
  const slideCtaText = currentSlide.cta || currentSlide.buttonText || 'Shop Now'
  const slideCtaUrl = currentSlide.buttonUrl || '#'

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950 text-white rounded-3xl p-8 md:p-16 my-8 shadow-xl">
      <div className="max-w-3xl">
        {slideBadge && (
          <span className="inline-block px-3.5 py-1 text-xs font-semibold uppercase tracking-wider bg-amber-500/20 text-amber-400 rounded-full mb-6 border border-amber-500/30">
            {slideBadge}
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

        {/* Additional Bullion Details (from Payload Schema) */}
        {(currentSlide.brand || currentSlide.weight || currentSlide.form) && (
          <div className="flex flex-wrap gap-3 mb-8 text-sm text-slate-300">
            {currentSlide.brand && (
              <span className="bg-slate-800/80 px-3 py-1 rounded-md border border-slate-700">
                Brand: {currentSlide.brand}
              </span>
            )}
            {currentSlide.weight && (
              <span className="bg-slate-800/80 px-3 py-1 rounded-md border border-slate-700">
                Weight: {currentSlide.weight}
              </span>
            )}
            {currentSlide.form && (
              <span className="bg-slate-800/80 px-3 py-1 rounded-md border border-slate-700">
                Form: {currentSlide.form}
              </span>
            )}
          </div>
        )}

        <div className="flex flex-wrap gap-4 items-center">
          <a
            href={slideCtaUrl}
            className="px-8 py-3.5 bg-amber-500 text-slate-950 font-bold rounded-xl hover:bg-amber-400 transition-colors shadow-lg"
          >
            {slideCtaText}
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
