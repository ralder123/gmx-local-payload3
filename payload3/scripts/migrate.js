import { getPayload } from 'payload'
import config from '../src/payload.config.ts'
import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

async function runMigration() {
  if (!process.env.DATABASE_URI || !process.env.PAYLOAD_SECRET) {
    console.error('❌ Error: Missing DATABASE_URI or PAYLOAD_SECRET environment variables.')
    process.exit(1)
  }

  console.log('🔄 Initializing Payload for migration...')
  try {
    const payload = await getPayload({ config })
    console.log('🚀 Running Payload database migrations...')
    await payload.migrate()
    console.log('✅ Migrations completed successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}

runMigration()
