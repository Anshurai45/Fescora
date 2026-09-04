import { CheckCircle2 } from 'lucide-react'
import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

function formatAmount(amount) {
  const numericAmount = Number(amount || 35400)
  const rupees = numericAmount > 1000 ? numericAmount / 100 : numericAmount
  return `₹${rupees.toLocaleString('en-IN')}`
}

export default function RegistrationSuccess() {
  const { state } = useLocation()
  const memberId = state?.memberId
  const paymentId = state?.paymentId
  const orderId = state?.orderId
  const amount = state?.amount
  const emailSent = state?.emailSent !== false

  useEffect(() => {
    document.title = 'Registration Successful | Fescora Management'

    const description = 'Your Fescora Management candidate registration and payment have been successfully completed.'
    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', description)
  }, [])

  if (!memberId || !paymentId) {
    return (
      <section className="registration-success-section">
        <div className="container registration-success-shell">
          <div className="registration-success-panel">
            <span className="eyebrow">Registration status</span>
            <h1>Registration Details Unavailable</h1>
            <p className="registration-success-copy">We could not find verified registration details for this page. Please complete the candidate registration payment first.</p>
            <Link className="button registration-home-button" to="/candidate-registration">
              Go to Registration
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="registration-success-section">
      <div className="container registration-success-shell">
        <div className="registration-success-panel">
          <div className="registration-success-icon" aria-hidden="true">
            <CheckCircle2 size={54} strokeWidth={1.8} />
          </div>

          <span className="eyebrow">Payment verified</span>
          <h1>Registration Successful</h1>
          <p className="registration-success-subtitle">Thank you for registering with Fescora Management.</p>
          <p className="registration-success-copy">Your registration and payment have been successfully completed.</p>

          <div className="registration-member-card">
            <span>Fescora Member ID</span>
            <strong>{memberId}</strong>
          </div>

          <div className="registration-summary-grid" aria-label="Payment summary">
            <div>
              <span>Payment Status</span>
              <strong>Successful</strong>
            </div>
            <div>
              <span>Amount Paid</span>
              <strong>{formatAmount(amount)}</strong>
            </div>
            <div>
              <span>Razorpay Payment ID</span>
              <strong>{paymentId}</strong>
            </div>
            <div>
              <span>Razorpay Order ID</span>
              <strong>{orderId || 'Unavailable'}</strong>
            </div>
          </div>

          <p className={`registration-email-note ${emailSent ? '' : 'warning'}`}>
            {emailSent
              ? "We've sent your registration details and payment confirmation to your registered email address."
              : 'Your registration and payment were successful. We were unable to send the confirmation email at this time. Please contact Fescora Management if you need assistance.'}
          </p>

          <div className="registration-next-steps">
            <h2>What&apos;s Next?</h2>
            <ul>
              <li>Your registration details have been received.</li>
              <li>{emailSent ? 'A confirmation email has been sent to your registered email address.' : 'Please contact Fescora Management if you need email confirmation assistance.'}</li>
              <li>Our recruitment team will review your profile.</li>
              <li>Our team will contact you regarding suitable job opportunities and next steps.</li>
            </ul>
          </div>

          <p className="registration-important-note">Please keep your Fescora Member ID safe for future communication.</p>

          <Link className="button registration-home-button" to="/">
            Back to Home
          </Link>

          <p className="registration-support-text">
            Need help? <Link to="/contact">Contact Fescora Management.</Link>
          </p>
        </div>
      </div>
    </section>
  )
}
