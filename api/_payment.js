import crypto from 'crypto'
import Razorpay from 'razorpay'

export const REGISTRATION_AMOUNT = Number(process.env.RAZORPAY_AMOUNT || 35400)
export const REGISTRATION_CURRENCY = 'INR'

export const json = (res, status, body) => res.status(status).json(body)

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
