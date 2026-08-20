import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { isMailConfigured } from '../config/env.js'
import { sendContactEnquiry } from '../services/mailService.js'

const router = Router()
const enquiryLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 8, standardHeaders: true, legacyHeaders: false, message: { message: 'Too many enquiries. Please try again later.' } })
const clean = (value) => String(value || '').trim().replace(/[<>]/g, '')

router.post('/', enquiryLimiter, async (req, res, next) => {
  try {
    const enquiry = Object.fromEntries(Object.entries(req.body || {}).map(([key, value]) => [key, clean(value)]))
    if (!enquiry.name || !enquiry.email || !enquiry.message) return res.status(400).json({ message: 'Please complete your name, email address and message.' })
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiry.email)) return res.status(400).json({ message: 'Please enter a valid email address.' })
    if (enquiry.phone && !/^[0-9+()\s-]{7,20}$/.test(enquiry.phone)) return res.status(400).json({ message: 'Please enter a valid phone number.' })
    if (!isMailConfigured) return res.status(503).json({ message: 'Contact service is temporarily unavailable. Please try again later.' })
    await sendContactEnquiry(enquiry)
    return res.status(201).json({ message: 'Thank you. Our team will be in touch shortly.' })
  } catch (error) { return next(error) }
})

export default router
