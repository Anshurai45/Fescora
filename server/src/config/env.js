import 'dotenv/config'

const required = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'FROM_EMAIL']
const parseBoolean = (value) => String(value || '').toLowerCase() === 'true'
export const isMailConfigured = required.every((key) => Boolean(process.env[key]))
export const env = {
  port: Number(process.env.PORT || 5000),
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  smtpHost: process.env.SMTP_HOST,
  smtpPort: Number(process.env.SMTP_PORT || 587),
  smtpSecure: process.env.SMTP_SECURE ? parseBoolean(process.env.SMTP_SECURE) : Number(process.env.SMTP_PORT || 587) === 465,
  smtpUser: process.env.SMTP_USER,
  smtpPass: process.env.SMTP_PASS,
  fromEmail: process.env.FROM_EMAIL,
  careerReceiverEmail: process.env.CAREER_RECEIVER_EMAIL || 'anshu.rai@fescora.com',
  contactReceiverEmail: process.env.CONTACT_RECEIVER_EMAIL || 'hr.kk@fescora.com',
}
