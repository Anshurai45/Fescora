import crypto from 'crypto'
import { getPublicKeyId, getRazorpayClient, json, REGISTRATION_AMOUNT, REGISTRATION_CURRENCY, requirePost } from './_payment.js'

export default async function handler(req, res) {
  if (!requirePost(req, res)) return

  try {
    if (REGISTRATION_AMOUNT !== 35400) {
      return json(res, 500, { message: 'Payment amount is not configured correctly.' })
    }

    const razorpay = getRazorpayClient()
    const receipt = `candidate_registration_${Date.now()}_${crypto.randomUUID().slice(0, 8)}`
    const order = await razorpay.orders.create({
      amount: REGISTRATION_AMOUNT,
      currency: REGISTRATION_CURRENCY,
      receipt,
      notes: { purpose: 'candidate_registration' },
    })

    return json(res, 200, {
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: getPublicKeyId(),
    })
  } catch (error) {
    if (error.code === 'RAZORPAY_NOT_CONFIGURED') {
      return json(res, 503, { message: 'Payment service is not configured yet.' })
    }

    const statusCode = error.statusCode === 401 ? 401 : 502
    return json(res, statusCode, { message: 'We could not create the payment order right now. Please try again.' })
  }
}
