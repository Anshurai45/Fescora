import { getRazorpayClient, isValidSignature, json, readBody, REGISTRATION_AMOUNT, REGISTRATION_CURRENCY, requirePost } from './_payment.js'

export default async function handler(req, res) {
  if (!requirePost(req, res)) return

  try {
    const body = readBody(req)
    const { razorpay_payment_id: paymentId, razorpay_order_id: orderId, razorpay_signature: signature } = body

    if (!paymentId || !orderId || !signature) {
      return json(res, 400, { message: 'Payment verification details are missing.' })
    }

    const razorpay = getRazorpayClient()
    const order = await razorpay.orders.fetch(orderId)

    if (Number(order.amount) !== REGISTRATION_AMOUNT || order.currency !== REGISTRATION_CURRENCY) {
      return json(res, 400, { message: 'Payment amount verification failed.' })
    }

    if (!isValidSignature(orderId, paymentId, signature)) {
      return json(res, 400, { message: 'Payment signature verification failed.' })
    }

    return json(res, 200, {
      verified: true,
      amount: REGISTRATION_AMOUNT,
      currency: REGISTRATION_CURRENCY,
      razorpay_payment_id: paymentId,
      razorpay_order_id: orderId,
    })
  } catch (error) {
    if (error.code === 'RAZORPAY_NOT_CONFIGURED') {
      return json(res, 503, { message: 'Payment service is not configured yet.' })
    }

    return json(res, 502, { message: 'We could not verify the payment right now. Please try again.' })
  }
}
