import nodemailer from 'nodemailer'
import { env } from '../config/env.js'

const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]))
const row = (label, value) => `<tr><td style="padding:8px 14px;border-bottom:1px solid #eee;color:#666">${label}</td><td style="padding:8px 14px;border-bottom:1px solid #eee;color:#111;font-weight:600">${escapeHtml(value)}</td></tr>`

const transporter = () => nodemailer.createTransport({ host: env.smtpHost, port: env.smtpPort, secure: env.smtpPort === 465, auth: { user: env.smtpUser, pass: env.smtpPass } })

export async function sendCareerApplication(application) {
  const rows = [row('Full name', application.fullName), row("Father's name", application.fatherName), row('Mobile number', application.mobile), row('Email address', application.email), row('Qualification', application.qualification), row('Experience', application.experience), row('Position applied for', application.designation), row('Application date', new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }))].join('')
  const emailClient = transporter()
  await emailClient.sendMail({ from: env.fromEmail, to: env.receiverEmail, replyTo: application.email, subject: `New Career Application - ${application.designation} - ${application.fullName}`, html: `<div style="font-family:Arial,sans-serif;max-width:650px;margin:auto"><h2 style="color:#DD2E18">New Career Application</h2><p>A candidate has submitted an application through the Fescora Management website.</p><table style="width:100%;border-collapse:collapse;background:#fff7e4">${rows}</table></div>` })
}

export async function sendContactEnquiry(enquiry) {
  const rows = [row('Name', enquiry.name), row('Company', enquiry.company || 'Not provided'), row('Email address', enquiry.email), row('Phone number', enquiry.phone || 'Not provided'), row('Service required', enquiry.service || 'Not selected'), row('Message', enquiry.message), row('Enquiry date', new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }))].join('')
  const emailClient = transporter()
  await emailClient.sendMail({ from: env.fromEmail, to: env.receiverEmail, replyTo: enquiry.email, subject: `New Website Enquiry - ${enquiry.service || 'General enquiry'} - ${enquiry.name}`, html: `<div style="font-family:Arial,sans-serif;max-width:650px;margin:auto"><h2 style="color:#DD2E18">New Website Enquiry</h2><p>A visitor has submitted a contact enquiry through the Fescora Management website.</p><table style="width:100%;border-collapse:collapse;background:#fff7e4">${rows}</table></div>` })
}
