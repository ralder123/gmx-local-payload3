export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { getPayload } = await import('payload')
    const config = await import('./payload.config')
    const payload = await getPayload({ config: config.default })

    // Ensure database schema/migrations are checked/applied on boot
    if (payload.db && typeof payload.db.migrate === 'function') {
      try {
        await payload.db.migrate()
        console.log('Database migrations completed successfully.')
      } catch (err) {
        console.error('Migration error on boot:', err)
      }
    }
  }
}
