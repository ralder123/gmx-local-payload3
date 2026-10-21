import type { Footer, Header } from '@/payload-types'
import config from '@payload-config'
import { getPayload } from 'payload'

/**
 * Fetch data for the site Header global schema
 */
export async function getHeaderData(): Promise<Header | null> {
  try {
    const payload = await getPayload({ config })
    const data = await payload.findGlobal({
      slug: 'header',
      depth: 1,
    })
    return data
  } catch (error) {
    console.error('Error fetching header data from Payload:', error)
    return null
  }
}

/**
 * Fetch data for the site Footer global schema
 */
export async function getFooterData(): Promise<Footer | null> {
  try {
    const payload = await getPayload({ config })
    const data = await payload.findGlobal({
      slug: 'footer',
      depth: 1,
    })
    return data
  } catch (error) {
    console.error('Error fetching footer data from Payload:', error)
    return null
  }
}
