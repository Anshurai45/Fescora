import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/premium.css'
import './styles/blue-mint.css'
import './styles/orange-theme.css'
import './styles/poppins.css'
import './styles/navbar-alignment.css'
import './styles/career-application.css'
import './styles/candidate-registration.css'
import './styles/registration-success.css'
import './styles/responsive.css'
import App from './App.jsx'

const schema = { '@context': 'https://schema.org', '@type': 'Organization', name: 'Fescora Management', url: 'https://fescora.com', description: 'Security, manpower and facility-support services for businesses.' }
const script = document.createElement('script')
script.type = 'application/ld+json'
script.text = JSON.stringify(schema)
document.head.appendChild(script)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
