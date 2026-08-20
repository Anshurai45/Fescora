import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { isMailConfigured } from '../config/env.js'
import { sendCareerApplication } from '../services/mailService.js'

const router = Router()
const applicationLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 5, standardHeaders: true, legacyHeaders: false, message: { message: 'Too many requests. Please try again later.' } })
const clean = (value) => String(value || '').trim().replace(/[<>]/g, '')

router.post('/apply', applicationLimiter, async (req, res, next) => {
  try {
    const application = Object.fromEntries(Object.entries(req.body || {}).map(([key, value]) => [key, clean(value)]))
    const fields = ['fullName', 'fatherName', 'mobile', 'email', 'qualification', 'experience', 'designation']
    if (fields.some((field) => !application[field])) return res.status(400).json({ message: 'Please complete all required fields.' })
    if (!/^[6-9]\d{9}$/.test(application.mobile.replace(/[\s-]/g, ''))) return res.status(400).json({ message: 'Please enter a valid 10-digit mobile number.' })
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(application.email)) return res.status(400).json({ message: 'Please enter a valid email address.' })
    if (!isMailConfigured) return res.status(503).json({ message: 'Application service is temporarily unavailable. Please try again later.' })
    await sendCareerApplication(application)
    return res.status(201).json({ message: 'Your application has been submitted successfully.' })
  } catch (error) { return next(error) }
})

export default router
