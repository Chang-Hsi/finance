export default defineEventHandler(() => {
  return {
    ok: true,
    service: 'tw-market-pulse',
    timestamp: new Date().toISOString()
  }
})
