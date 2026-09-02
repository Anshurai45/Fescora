import nodemailer from 'nodemailer'

const required = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'FROM_EMAIL']
const isMailConfigured = () => required.every((key) => Boolean(process.env[key]))
const parseBoolean = (value) => String(value || '').toLowerCase() === 'true'

const env = {
  smtpHost: process.env.SMTP_HOST,
  smtpPort: Number(process.env.SMTP_PORT || 587),
  smtpSecure: process.env.SMTP_SECURE ? parseBoolean(process.env.SMTP_SECURE) : Number(process.env.SMTP_PORT || 587) === 465,
  smtpUser: process.env.SMTP_USER,
  smtpPass: process.env.SMTP_PASS,
  fromEmail: process.env.FROM_EMAIL,
  careerReceiverEmail: process.env.CAREER_RECEIVER_EMAIL || 'anshu.rai@fescora.com',
  contactReceiverEmail: process.env.CONTACT_RECEIVER_EMAIL || 'hr.kk@fescora.com',
}

const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]))
const row = (label, value) => `<tr><td style="padding:8px 14px;border-bottom:1px solid #eee;color:#666">${label}</td><td style="padding:8px 14px;border-bottom:1px solid #eee;color:#111;font-weight:600">${escapeHtml(value)}</td></tr>`
const clean = (value) => String(value || '').trim().replace(/[<>]/g, '')

const transporter = () => nodemailer.createTransport({
  host: env.smtpHost,
  port: env.smtpPort,
  secure: env.smtpSecure,
  auth: { user: env.smtpUser, pass: env.smtpPass },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 15000,
})

export const json = (res, status, body) => res.status(status).json(body)

export function requirePost(req, res) {
  if (req.method === 'POST') return true
  res.setHeader('Allow', 'POST')
  json(res, 405, { message: 'Method not allowed.' })
  return false
}

export function readBody(req) {
  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body
  return Object.fromEntries(Object.entries(body || {}).map(([key, value]) => [key, clean(value)]))
}

export async function sendCareerApplication(application) {
  if (!isMailConfigured()) throw new Error('MAIL_NOT_CONFIGURED')
  const rows = [
    row('Full name', application.fullName),
    row("Father's name", application.fatherName),
    row('Mobile number', application.mobile),
    row('Email address', application.email),
    row('Qualification', application.qualification),
    row('Experience', application.experience),
    row('Position applied for', application.designation),
    row('Application date', new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })),
  ].join('')
  await transporter().sendMail({
    from: env.fromEmail,
    to: env.careerReceiverEmail,
    replyTo: application.email,
    subject: `New Career Application - ${application.designation} - ${application.fullName}`,
    html: `<div style="font-family:Arial,sans-serif;max-width:650px;margin:auto"><h2 style="color:#DD2E18">New Career Application</h2><p>A candidate has submitted an application through the Fescora Management website.</p><table style="width:100%;border-collapse:collapse;background:#fff7e4">${rows}</table></div>`,
  })
}

export async function sendContactEnquiry(enquiry) {
  if (!isMailConfigured()) throw new Error('MAIL_NOT_CONFIGURED')
  const rows = [
    row('Name', enquiry.name),
    row('Company', enquiry.company || 'Not provided'),
    row('Email address', enquiry.email),
    row('Phone number', enquiry.phone || 'Not provided'),
    row('Service required', enquiry.service || 'Not selected'),
    row('Message', enquiry.message),
    row('Enquiry date', new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })),
  ].join('')
  await transporter().sendMail({
    from: env.fromEmail,
    to: env.contactReceiverEmail,
    replyTo: enquiry.email,
    subject: `New Website Enquiry - ${enquiry.service || 'General enquiry'} - ${enquiry.name}`,
    html: `<div style="font-family:Arial,sans-serif;max-width:650px;margin:auto"><h2 style="color:#DD2E18">New Website Enquiry</h2><p>A visitor has submitted a contact enquiry through the Fescora Management website.</p><table style="width:100%;border-collapse:collapse;background:#fff7e4">${rows}</table></div>`,
  })
}
