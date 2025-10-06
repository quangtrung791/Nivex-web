// Small helper to authorize admin API calls using either API keys or browser cookies
export function getApiKeyFromRequest(request) {
  // support x-api-key or Authorization: Bearer <key>
  const headerKey = request.headers.get('x-api-key') || request.headers.get('x-api')
  if (headerKey) return headerKey
  const auth = request.headers.get('authorization')
  if (auth && auth.toLowerCase().startsWith('bearer ')) return auth.slice(7)
  return null
}

export function isValidApiKey(key) {
  if (!key) return false
  return key === process.env.N8N_API_KEY || key === process.env.ADMIN_API_KEY
}

export function isAuthorized(request) {
  // 1) API key check
  const key = getApiKeyFromRequest(request)
  if (isValidApiKey(key)) return true

  // 2) cookie-based browser session fallback
  const cookieHeader = request.headers.get('cookie') || ''
  if (cookieHeader.includes('admin-auth=true')) return true
  if (/admin-token=/.test(cookieHeader)) return true

  return false
}
