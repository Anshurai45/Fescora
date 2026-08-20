import 'dotenv/config'

const required = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'FROM_EMAIL', 'CAREER_RECEIVER_EMAIL']
export const isMailConfigured = required.every((key) => Boolean(process.env[key]))
export const env = {
  port: Number(process.env.PORT || 5000),
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  smtpHost: process.env.SMTP_HOST,
  smtpPort: Number(process.env.SMTP_PORT || 587),
  smtpUser: process.env.SMTP_USER,
  smtpPass: process.env.SMTP_PASS,
  fromEmail: process.env.FROM_EMAIL,
  receiverEmail: process.env.CAREER_RECEIVER_EMAIL || 'anshurai605@gmail.com',
}
