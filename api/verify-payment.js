import { sendPaidCandidateRegistration } from './_mail.js'
import { generateMemberId, getRazorpayClient, isValidSignature, json, normalizeCandidate, readBody, REGISTRATION_AMOUNT, REGISTRATION_CURRENCY, requirePost, validateCandidate } from './_payment.js'

const processedPayments = new Map()
const activeVerifications = new Map()

async function completeRegistration({ paymentId, orderId, signature }) {
  const cachedResult = processedPayments.get(paymentId)
  if (cachedResult) return cachedResult

  const razorpay = getRazorpayClient()
  const order = await razorpay.orders.fetch(orderId)

  if (!order || order.id !== orderId) {
    const error = new Error('ORDER_NOT_FOUND')
    error.statusCode = 400
    throw error
  }

  if (Number(order.amount) !== REGISTRATION_AMOUNT || order.currency !== REGISTRATION_CURRENCY) {
    const error = new Error('AMOUNT_MISMATCH')
    error.statusCode = 400
    throw error
  }

  if (!isValidSignature(orderId, paymentId, signature)) {
    const error = new Error('INVALID_SIGNATURE')
    error.statusCode = 400
    throw error
  }

  const candidate = normalizeCandidate(order.notes || {})
  const candidateErrors = validateCandidate(candidate)
  if (candidateErrors.length > 0) {
    const error = new Error('CANDIDATE_DETAILS_MISSING')
    error.statusCode = 400
    throw error
  }

  const memberId = generateMemberId()
  let emailResult = { candidateEmailSent: false, adminEmailSent: false }

  try {
    emailResult = await sendPaidCandidateRegistration({ candidate, memberId, paymentId, orderId })
  } catch (error) {
    console.error('Paid candidate registration email failed:', error.message)
  }

  const result = {
    success: true,
    memberId,
    paymentId,
    orderId,
    amount: REGISTRATION_AMOUNT,
    emailSent: emailResult.candidateEmailSent && emailResult.adminEmailSent,
    candidateEmailSent: emailResult.candidateEmailSent,
    adminEmailSent: emailResult.adminEmailSent,
  }

  processedPayments.set(paymentId, result)
  return result
}

export default async function handler(req, res) {
  if (!requirePost(req, res)) return

  let paymentId
  try {
    const body = readBody(req)
    const { razorpay_payment_id: receivedPaymentId, razorpay_order_id: orderId, razorpay_signature: signature } = body
    paymentId = receivedPaymentId

    if (!paymentId || !orderId || !signature) {
      return json(res, 400, { message: 'Payment verification details are missing.' })
    }

    if (!activeVerifications.has(paymentId)) {
      activeVerifications.set(paymentId, completeRegistration({ paymentId, orderId, signature }))
    }

    const result = await activeVerifications.get(paymentId)
    activeVerifications.delete(paymentId)
    return json(res, 200, result)
  } catch (error) {
    if (paymentId) activeVerifications.delete(paymentId)

    if (error.code === 'RAZORPAY_NOT_CONFIGURED') {
      return json(res, 503, { message: 'Payment service is not configured yet.' })
    }

    if (error.statusCode === 400) {
      return json(res, 400, { message: 'Payment verification failed.' })
    }

    return json(res, 502, { message: 'We could not verify the payment right now. Please try again.' })
  }
}
