const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'
export async function submitCareerApplication(payload) {
  const response = await fetch(`${baseUrl}/api/careers/apply`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.message || 'We could not submit your application right now. Please try again later.')
  return data
}
export async function submitContactEnquiry(payload) {
  const response = await fetch(`${baseUrl}/api/contact`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.message || 'We could not send your enquiry right now. Please try again later.')
  return data
}
