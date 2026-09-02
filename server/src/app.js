import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { env } from './config/env.js'
import careerRoutes from './routes/careerRoutes.js'
import contactRoutes from './routes/contactRoutes.js'

const app = express()
app.use(helmet())
app.use(cors({ origin: env.clientOrigin, methods: ['POST'], allowedHeaders: ['Content-Type'] }))
app.use(express.json({ limit: '20kb' }))
app.use('/api/careers', careerRoutes)
app.use('/api/contact', contactRoutes)
app.use((error, _req, res, _next) => {
  void _next
  console.error(error)
  res.status(500).json({ message: 'We could not process your request right now. Please try again later.' })
})
export default app
