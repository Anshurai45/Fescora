const configuredBaseUrl = import.meta.env.VITE_API_URL?.trim() || ''
const isLocalApiUrl = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?\/?$/i.test(configuredBaseUrl)
const baseUrl = import.meta.env.PROD && isLocalApiUrl ? '' : configuredBaseUrl.replace(/\/$/, '')

async function parseResponse(response) {
  return response.json().catch(() => ({}))
}

export async function submitCareerApplication(payload) {
  const response = await fetch(`${baseUrl}/api/careers/apply`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
  const data = await parseResponse(response)
  if (!response.ok) throw new Error(data.message || 'We could not submit your application right now. Please try again later.')
  return data
}

export async function submitContactEnquiry(payload) {
  const response = await fetch(`${baseUrl}/api/contact`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
  const data = await parseResponse(response)
  if (!response.ok) throw new Error(data.message || 'We could not send your enquiry right now. Please try again later.')
  return data
}
