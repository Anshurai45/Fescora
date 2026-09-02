import { json, readBody, requirePost, sendContactEnquiry } from './_mail.js'

export default async function handler(req, res) {
  if (!requirePost(req, res)) return

  try {
    const enquiry = readBody(req)
    if (!enquiry.name || !enquiry.email || !enquiry.message) return json(res, 400, { message: 'Please complete your name, email address and message.' })
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiry.email)) return json(res, 400, { message: 'Please enter a valid email address.' })
    if (enquiry.phone && !/^[0-9+()\s-]{7,20}$/.test(enquiry.phone)) return json(res, 400, { message: 'Please enter a valid phone number.' })

    await sendContactEnquiry(enquiry)
    return json(res, 201, { message: 'Thank you. Our team will be in touch shortly.' })
  } catch (error) {
    if (error.message === 'MAIL_NOT_CONFIGURED') return json(res, 503, { message: 'Contact service is temporarily unavailable. Please try again later.' })
    console.error(error)
    return json(res, 500, { message: 'We could not process your request right now. Please try again later.' })
  }
}
