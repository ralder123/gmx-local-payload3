import type { Footer as FooterType } from '@/payload-types'
import { getFooterData } from '@/utils/api'
import Link from 'next/link'

export async function Footer() {
  const footer: FooterType | null = await getFooterData().catch(() => null)

  if (!footer) return null

  const linkColumns = footer.linkColumns || []
  const currentYear = new Date().getFullYear()
  const startYear = footer.bottomBar?.startYear || '2024'
  const copyrightYear =
    startYear === String(currentYear) ? startYear : `${startYear}-${currentYear}`

  return (
    <footer className="bg-slate-900 text-slate-300 py-12 px-4 border-t border-slate-800">
      <div className="max-w-7xl mx-auto">
        {/* Sales Banner (Tab 1) */}
        {footer.salesBanner?.enabled && (
          <div className="mb-8 p-4 bg-slate-800/50 rounded-lg flex flex-col sm:flex-row justify-between items-center text-sm">
            <span>{footer.salesBanner.text}</span>
            {footer.salesBanner.linkUrl && (
              <Link
                href={footer.salesBanner.linkUrl}
                className="text-amber-400 hover:underline mt-2 sm:mt-0"
              >
                {footer.salesBanner.linkText || 'Learn More'} →
              </Link>
            )}
          </div>
        )}

        {/* Brand & Main Columns Grid (Tabs 2 & 3) */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <h3 className="text-white font-bold text-lg">
              {footer.brand?.siteName || 'GOLDMONEX'}
            </h3>
            {footer.brand?.tagline && (
              <p className="text-xs text-slate-400">{footer.brand.tagline}</p>
            )}
            {footer.brand?.reviewCountText && (
              <div className="text-xs text-amber-400 font-semibold">
                ★ {footer.brand.reviewCountText}
              </div>
            )}
          </div>

          {/* Link Columns */}
          <div className="md:col-span-4 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {linkColumns.map((col, index) => (
              <div key={col.id || index}>
                <h4 className="text-white font-bold text-sm tracking-wider mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links?.map((link, linkIndex) => (
                    <li key={link.id || linkIndex}>
                      <Link
                        href={link.url || '#'}
                        target={link.newTab ? '_blank' : '_self'}
                        rel={link.newTab ? 'noopener noreferrer' : undefined}
                        className="hover:text-white transition-colors text-xs text-slate-400"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Disclosure Box (Tab 4) */}
        {footer.disclosure?.body && (
          <div className="mb-8 p-4 border border-slate-800 rounded bg-slate-950/50 text-xs text-slate-400 space-y-1">
            {footer.disclosure.heading && (
              <span className="font-semibold text-slate-300 block mb-1">
                {footer.disclosure.heading}
              </span>
            )}
            <p>{footer.disclosure.body}</p>
            {footer.disclosure.linkUrl && (
              <Link
                href={footer.disclosure.linkUrl}
                className="text-amber-400 hover:underline inline-block mt-1"
              >
                {footer.disclosure.linkText || 'Read more'}
              </Link>
            )}
          </div>
        )}

        {/* Bottom Bar & Trust Badges (Tab 5) */}
        <div className="pt-6 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>
            © {copyrightYear} {footer.bottomBar?.companyName || 'GoldMonex'}. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-4">
            {footer.bottomBar?.trustBadges?.map((badge, idx) => (
              <span
                key={badge.id || idx}
                className="bg-slate-800 px-2.5 py-1 rounded text-slate-300"
              >
                {badge.badgeText}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
