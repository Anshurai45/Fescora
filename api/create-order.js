import crypto from 'crypto'
import { getPublicKeyId, getRazorpayClient, json, normalizeCandidate, readBody, REGISTRATION_AMOUNT, REGISTRATION_CURRENCY, requirePost, validateCandidate } from './_payment.js'

const noteValue = (value) => String(value || '').slice(0, 250)

export default async function handler(req, res) {
  if (!requirePost(req, res)) return

  try {
    if (REGISTRATION_AMOUNT !== 35400) {
      return json(res, 500, { message: 'Payment amount is not configured correctly.' })
    }

    const body = readBody(req)
    const candidate = normalizeCandidate(body.candidate)
    const candidateErrors = validateCandidate(candidate)
    if (candidateErrors.length > 0) {
      return json(res, 400, { message: 'Please complete all required candidate details before payment.' })
    }

    const razorpay = getRazorpayClient()
    const receipt = `candidate_registration_${Date.now()}_${crypto.randomUUID().slice(0, 8)}`
    const order = await razorpay.orders.create({
      amount: REGISTRATION_AMOUNT,
      currency: REGISTRATION_CURRENCY,
      receipt,
      notes: {
        purpose: 'candidate_registration',
        fullName: noteValue(candidate.fullName),
        mobile: noteValue(candidate.mobile),
        email: noteValue(candidate.email),
        dob: noteValue(candidate.dob),
        gender: noteValue(candidate.gender),
        location: noteValue(candidate.location),
        pincode: noteValue(candidate.pincode),
        qualification: noteValue(candidate.qualification),
        technicalQualifications: noteValue(candidate.technicalQualifications),
        experience: noteValue(candidate.experience),
      },
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
