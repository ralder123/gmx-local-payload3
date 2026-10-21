import type { Footer } from '@/payload-types'

interface Props {
  // Update from 'navItems' to 'linkColumns'
  menu: Footer['linkColumns']
}

export function FooterMenu({ menu }: Props) {
  if (!menu?.length) return null

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {menu.map((column) => (
        <div key={column.id || column.title}>
          <h3 className="font-semibold mb-4">{column.title}</h3>
          <ul className="space-y-2">
            {column.links?.map((linkItem) => (
              <li key={linkItem.id}>
                {/* 
                  Note: If your schema uses standard fields (label, url, newTab) 
                  instead of a relationship/link block, map them directly or pass them to CMSLink.
                  Adjusting to match your schema's 'label' and 'url' fields:
                */}
                <a
                  href={linkItem.url}
                  target={linkItem.newTab ? '_blank' : '_self'}
                  rel={linkItem.newTab ? 'noopener noreferrer' : undefined}
                  className="hover:underline"
                >
                  {linkItem.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
