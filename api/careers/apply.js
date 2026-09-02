import { json, readBody, requirePost, sendCareerApplication } from '../_mail.js'

export default async function handler(req, res) {
  if (!requirePost(req, res)) return

  try {
    const application = readBody(req)
    const fields = ['fullName', 'fatherName', 'mobile', 'email', 'qualification', 'experience', 'designation']
    if (fields.some((field) => !application[field])) return json(res, 400, { message: 'Please complete all required fields.' })
    if (!/^[6-9]\d{9}$/.test(application.mobile.replace(/[\s-]/g, ''))) return json(res, 400, { message: 'Please enter a valid 10-digit mobile number.' })
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(application.email)) return json(res, 400, { message: 'Please enter a valid email address.' })

    await sendCareerApplication(application)
    return json(res, 201, { message: 'Your application has been submitted successfully.' })
  } catch (error) {
    if (error.message === 'MAIL_NOT_CONFIGURED') return json(res, 503, { message: 'Application service is temporarily unavailable. Please try again later.' })
    console.error(error)
    return json(res, 500, { message: 'We could not process your request right now. Please try again later.' })
  }
}
