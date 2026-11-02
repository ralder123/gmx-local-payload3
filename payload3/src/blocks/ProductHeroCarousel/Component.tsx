'use client'

import Link from 'next/link'
import React, { useState } from 'react'

export interface HeroSlide {
  id?: string
  title: string
  subtitle: string
  cta: string
  url?: string
  category?: string
  brand?: string
  weight?: string
  form?: string
  country?: string
}

export interface HeroCarouselBlockProps {
  slides?: HeroSlide[]
}

/**
 * Builds dynamic target URL for slide action.
 * Priority: Explicit slide.url > Auto-generated /products?filters URL > Default /products
 */
export function getSlideTargetUrl(slide: HeroSlide): string {
  if (slide.url && slide.url.trim() !== '') {
    return slide.url
  }

  const params = new URLSearchParams()

  if (slide.category) params.set('category', slide.category)
  if (slide.brand) params.set('brand', slide.brand)
  if (slide.weight) params.set('weight', slide.weight)
  if (slide.form) params.set('form', slide.form)
  if (slide.country) params.set('country', slide.country)

  const queryString = params.toString()
  return queryString ? `/products?${queryString}` : '/products'
}

export const HeroCarouselBlock: React.FC<HeroCarouselBlockProps> = ({ slides = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const defaultSlides: HeroSlide[] = [
    {
      title: 'Gold American Eagles',
      subtitle: "America's Official Gold Bullion Coin - Premium U.S. Mint Quality",
      cta: 'Shop Gold Eagles',
      category: 'Gold',
      brand: 'U.S. Mint',
      weight: '1 Oz',
      form: 'Coin',
      country: 'United States',
    },
    {
      title: '2026 Canadian Silver Maple Leaf',
      subtitle: 'World renowned 99.99% pure silver bullion with advanced security features.',
      cta: 'Explore Silver Maples',
      category: 'Silver',
      brand: 'Royal Canadian Mint',
      weight: '1 Oz',
      form: 'Coin',
      country: 'Canada',
    },
  ]

  const displaySlides = slides && slides.length > 0 ? slides : defaultSlides
  const currentSlide = displaySlides[currentIndex] || displaySlides[0]
  const targetUrl = getSlideTargetUrl(currentSlide)

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950 text-white rounded-3xl p-8 md:p-16 my-8 shadow-xl">
      <div className="max-w-3xl">
        {/* Category Badge */}
        {currentSlide.category && (
          <span className="inline-block px-3.5 py-1 text-xs font-semibold uppercase tracking-wider bg-amber-500/20 text-amber-400 rounded-full mb-6 border border-amber-500/30">
            {currentSlide.category}
          </span>
        )}

        {/* Title & Subtitle */}
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
          {currentSlide.title}
        </h1>
        {currentSlide.subtitle && (
          <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed">
            {currentSlide.subtitle}
          </p>
        )}

        {/* Spec Badges (Brand, Weight, Form, Country) */}
        <div className="flex flex-wrap gap-2.5 mb-8 text-xs font-medium text-slate-300">
          {currentSlide.brand && (
            <span className="bg-slate-800/80 px-3 py-1 rounded-lg border border-slate-700">
              {currentSlide.brand}
            </span>
          )}
          {currentSlide.weight && (
            <span className="bg-slate-800/80 px-3 py-1 rounded-lg border border-slate-700">
              {currentSlide.weight}
            </span>
          )}
          {currentSlide.form && (
            <span className="bg-slate-800/80 px-3 py-1 rounded-lg border border-slate-700">
              {currentSlide.form}
            </span>
          )}
          {currentSlide.country && (
            <span className="bg-slate-800/80 px-3 py-1 rounded-lg border border-slate-700">
              {currentSlide.country}
            </span>
          )}
        </div>

        {/* Call To Action Button with Next.js Link */}
        <div className="flex flex-wrap gap-4 items-center">
          <Link
            href={targetUrl}
            className="px-8 py-3.5 bg-amber-500 text-slate-950 font-extrabold rounded-xl hover:bg-white hover:text-slate-950 hover:shadow-xl hover:shadow-amber-500/20 active:scale-95 transition-all duration-200 shadow-lg cursor-pointer inline-block"
          >
            {currentSlide.cta || 'Shop Now'}
          </Link>
        </div>
      </div>

      {/* Carousel Navigation Dots */}
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
