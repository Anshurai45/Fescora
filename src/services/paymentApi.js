const configuredBaseUrl = import.meta.env.VITE_API_URL?.trim() || ''
const isLocalApiUrl = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?\/?$/i.test(configuredBaseUrl)
const baseUrl = import.meta.env.PROD && isLocalApiUrl ? '' : configuredBaseUrl.replace(/\/$/, '')

async function parseResponse(response) {
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.message || 'Payment request failed. Please try again.')
  return data
}

export async function createRegistrationOrder() {
  const response = await fetch(`${baseUrl}/api/create-order`, { method: 'POST', headers: { 'Content-Type': 'application/json' } })
  return parseResponse(response)
}

export async function verifyRegistrationPayment(payload) {
  const response = await fetch(`${baseUrl}/api/verify-payment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  return parseResponse(response)
}
