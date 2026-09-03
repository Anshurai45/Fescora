import crypto from 'crypto'
import Razorpay from 'razorpay'

export const REGISTRATION_AMOUNT = Number(process.env.RAZORPAY_AMOUNT || 35400)
export const REGISTRATION_CURRENCY = 'INR'

export const json = (res, status, body) => res.status(status).json(body)
const clean = (value) => String(value || '').trim().replace(/[<>]/g, '')

export function requirePost(req, res) {
  if (req.method === 'POST') return true
  res.setHeader('Allow', 'POST')
  json(res, 405, { message: 'Method not allowed.' })
  return false
}

export function readBody(req) {
  if (!req.body) return {}
  if (typeof req.body === 'string') return JSON.parse(req.body || '{}')
  return req.body
}

export function normalizeCandidate(candidate = {}) {
  return {
    fullName: clean(candidate.fullName),
    mobile: clean(candidate.mobile).replace(/\D/g, '').slice(0, 10),
    email: clean(candidate.email).toLowerCase(),
    dob: clean(candidate.dob),
    gender: clean(candidate.gender),
    location: clean(candidate.location),
    pincode: clean(candidate.pincode).replace(/\D/g, '').slice(0, 6),
    qualification: clean(candidate.qualification),
    technicalQualifications: clean(candidate.technicalQualifications) || 'Not provided',
    experience: clean(candidate.experience),
  }
}

export function validateCandidate(candidate) {
  const errors = []

  if (!candidate.fullName) errors.push('Full name is required.')
  if (!/^[6-9]\d{9}$/.test(candidate.mobile)) errors.push('A valid Indian mobile number is required.')
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(candidate.email)) errors.push('A valid email address is required.')
  if (!candidate.dob) errors.push('Date of birth is required.')
  else if (candidate.dob > new Date().toISOString().slice(0, 10)) errors.push('Date of birth cannot be in the future.')
  if (!candidate.gender) errors.push('Gender is required.')
  if (!candidate.location) errors.push('Current city and state is required.')
  if (!/^\d{6}$/.test(candidate.pincode)) errors.push('A valid 6-digit pincode is required.')
  if (!candidate.qualification) errors.push('Highest qualification is required.')
  if (!candidate.experience) errors.push('Work experience is required.')

  return errors
}

export function getRazorpayClient() {
  const keyId = process.env.RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET

  if (!keyId || !keySecret) {
    const error = new Error('RAZORPAY_NOT_CONFIGURED')
    error.code = 'RAZORPAY_NOT_CONFIGURED'
    throw error
  }

  return new Razorpay({ key_id: keyId, key_secret: keySecret })
}

export function getPublicKeyId() {
  return process.env.RAZORPAY_KEY_ID
}

export function generateMemberId() {
  return `FSC-${new Date().getFullYear()}-${crypto.randomInt(100000, 1000000)}`
}

export function isValidSignature(orderId, paymentId, signature) {
  const expected = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest('hex')

  const expectedBuffer = Buffer.from(expected, 'hex')
  const signatureBuffer = Buffer.from(String(signature), 'hex')

  if (expectedBuffer.length !== signatureBuffer.length) return false
  return crypto.timingSafeEqual(expectedBuffer, signatureBuffer)
}
