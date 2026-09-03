import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createRegistrationOrder, verifyRegistrationPayment } from '../services/paymentApi'

const initialValues = {
  fullName: '',
  mobile: '',
  email: '',
  dob: '',
  gender: '',
  location: '',
  pincode: '',
  qualification: '',
  technicalQualifications: '',
  experience: '',
  terms: false,
}

const qualificationOptions = ['8th Pass', '10th Pass', '12th Pass', 'ITI', 'Diploma', 'Graduate', 'Post Graduate', 'Other']
const experienceOptions = ['Fresher', 'Less than 1 Year', '1-2 Years', '2-5 Years', '5+ Years']
const genderOptions = ['Male', 'Female', 'Other', 'Prefer not to say']

const paymentFailureMessage = 'Payment was not completed. Your registration has not been completed.'

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
const validateMobile = (mobile) => /^[6-9]\d{9}$/.test(mobile)
const validatePincode = (pincode) => /^\d{6}$/.test(pincode)

function getToday() {
  return new Date().toISOString().slice(0, 10)
}

function buildErrors(values, today) {
  const errors = {}

  if (!values.fullName.trim()) errors.fullName = 'Please enter your full name.'
  if (!values.mobile) errors.mobile = 'Please enter your mobile or WhatsApp number.'
  else if (!validateMobile(values.mobile)) errors.mobile = 'Please enter a valid 10-digit Indian mobile number.'
  if (!values.email.trim()) errors.email = 'Please enter your email address.'
  else if (!validateEmail(values.email.trim())) errors.email = 'Please enter a valid email address.'
  if (!values.dob) errors.dob = 'Please select your date of birth.'
  else if (values.dob > today) errors.dob = 'Date of birth cannot be in the future.'
  if (!values.gender) errors.gender = 'Please select your gender.'
  if (!values.location.trim()) errors.location = 'Please enter your current city and state.'
  if (!values.pincode) errors.pincode = 'Please enter your pincode.'
  else if (!validatePincode(values.pincode)) errors.pincode = 'Pincode must contain exactly 6 digits.'
  if (!values.qualification) errors.qualification = 'Please select your highest qualification.'
  if (!values.experience) errors.experience = 'Please select your work experience.'
  if (!values.terms) errors.terms = 'Please accept the Terms & Conditions and Privacy Policy.'

  return errors
}

function FieldError({ id, message }) {
  if (!message) return null
  return (
    <p className="candidate-field-error" id={id}>
      {message}
    </p>
  )
}

function loadRazorpayCheckout() {
  if (window.Razorpay) return Promise.resolve(true)

  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export default function CandidateRegistration() {
  const navigate = useNavigate()
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [paymentStatus, setPaymentStatus] = useState({ type: '', message: '' })
  const [processingPayment, setProcessingPayment] = useState(false)
  const [today] = useState(getToday)

  useEffect(() => {
    document.title = 'Candidate Registration | Fescora Management'

    const description = 'Register with Fescora Management for current and upcoming job opportunities.'
    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', description)
  }, [])

  const update = (event) => {
    const { name, type, checked, value } = event.target
    const nextValue = type === 'checkbox' ? checked : value

    setValues((current) => ({
      ...current,
      [name]: name === 'mobile' || name === 'pincode' ? String(nextValue).replace(/\D/g, '').slice(0, name === 'mobile' ? 10 : 6) : nextValue,
    }))
    setPaymentStatus({ type: '', message: '' })
    setErrors((current) => ({ ...current, [name]: '' }))
  }

  const openCheckout = async (order) => {
    const loaded = await loadRazorpayCheckout()
    if (!loaded) throw new Error('Unable to load Razorpay Checkout. Please check your connection and try again.')

    const key = import.meta.env.VITE_RAZORPAY_KEY_ID || order.key_id
    if (!key) throw new Error('Razorpay public key is not configured.')

    return new Promise((resolve, reject) => {
      const checkout = new window.Razorpay({
        key,
        amount: 35400,
        currency: 'INR',
        name: 'Fescora Management',
        description: 'Candidate Registration Fee',
        order_id: order.order_id,
        image: '/fescora-mark.png',
        prefill: {
          name: values.fullName.trim(),
          email: values.email.trim(),
          contact: values.mobile,
        },
        theme: { color: '#dd2e18' },
        modal: {
          ondismiss: () => reject(new Error(paymentFailureMessage)),
        },
        handler: async (response) => {
          try {
            const verifiedPayment = await verifyRegistrationPayment(response)
            resolve(verifiedPayment)
          } catch (error) {
            reject(error)
          }
        },
      })

      checkout.on('payment.failed', () => reject(new Error(paymentFailureMessage)))
      checkout.open()
    })
  }

  const submit = async (event) => {
    event.preventDefault()
    const nextErrors = buildErrors(values, today)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setPaymentStatus({ type: 'error', message: 'Please fix the highlighted fields before proceeding to payment.' })
      return
    }

    setProcessingPayment(true)
    setPaymentStatus({ type: 'info', message: 'Creating secure payment order...' })

    try {
      const order = await createRegistrationOrder(values)
      if (Number(order.amount) !== 35400 || order.currency !== 'INR') {
        throw new Error('Payment amount verification failed before checkout.')
      }

      setPaymentStatus({ type: 'info', message: 'Opening Razorpay Checkout...' })
      const verifiedPayment = await openCheckout(order)
      if (!verifiedPayment.success) throw new Error(paymentFailureMessage)

      navigate('/registration-success', {
        replace: true,
        state: {
          memberId: verifiedPayment.memberId,
          paymentId: verifiedPayment.paymentId,
          orderId: verifiedPayment.orderId,
          amount: verifiedPayment.amount,
          emailSent: verifiedPayment.emailSent,
        },
      })
    } catch (error) {
      setPaymentStatus({ type: 'error', message: error.message || paymentFailureMessage })
    } finally {
      setProcessingPayment(false)
    }
  }

  return (
    <>
      <section className="page-hero candidate-registration-hero">
        <div className="container">
          <span className="eyebrow">Candidate Registration</span>
          <h1>Candidate Registration</h1>
          <p>Register with Fescora Management for current and upcoming job opportunities.</p>
        </div>
      </section>

      <section className="section candidate-registration-section">
        <div className="container candidate-registration-layout">
          <form className="candidate-registration-form" onSubmit={submit} noValidate>
            <div className="candidate-form-heading">
              <span className="eyebrow">Registration form</span>
              <h2>Share your candidate details.</h2>
              <p>Complete the required fields below to proceed with the secure registration payment.</p>
            </div>

            <div className="candidate-form-section">
              <div className="candidate-section-title">
                <span>Section 1</span>
                <h3>Personal Information</h3>
              </div>

              <div className="candidate-form-grid">
                <label>
                  Full Name <b>*</b>
                  <input name="fullName" value={values.fullName} onChange={update} autoComplete="name" aria-describedby="fullName-error" />
                  <FieldError id="fullName-error" message={errors.fullName} />
                </label>

                <label>
                  Mobile / WhatsApp Number <b>*</b>
                  <input name="mobile" value={values.mobile} onChange={update} inputMode="numeric" autoComplete="tel" aria-describedby="mobile-error" />
                  <FieldError id="mobile-error" message={errors.mobile} />
                </label>

                <label>
                  Email Address <b>*</b>
                  <input name="email" value={values.email} onChange={update} type="email" autoComplete="email" aria-describedby="email-error" />
                  <FieldError id="email-error" message={errors.email} />
                </label>

                <label>
                  Date of Birth <b>*</b>
                  <input name="dob" value={values.dob} onChange={update} type="date" max={today} aria-describedby="dob-error" />
                  <FieldError id="dob-error" message={errors.dob} />
                </label>

                <label>
                  Gender <b>*</b>
                  <select name="gender" value={values.gender} onChange={update} aria-describedby="gender-error">
                    <option value="">Select gender</option>
                    {genderOptions.map((option) => <option key={option}>{option}</option>)}
                  </select>
                  <FieldError id="gender-error" message={errors.gender} />
                </label>

                <label>
                  Current City & State <b>*</b>
                  <input name="location" value={values.location} onChange={update} autoComplete="address-level2" aria-describedby="location-error" />
                  <FieldError id="location-error" message={errors.location} />
                </label>

                <label>
                  Pincode <b>*</b>
                  <input name="pincode" value={values.pincode} onChange={update} inputMode="numeric" autoComplete="postal-code" aria-describedby="pincode-error" />
                  <FieldError id="pincode-error" message={errors.pincode} />
                </label>
              </div>
            </div>

            <div className="candidate-form-section">
              <div className="candidate-section-title">
                <span>Section 2</span>
                <h3>Qualification & Experience</h3>
              </div>

              <div className="candidate-form-grid">
                <label>
                  Highest Qualification <b>*</b>
                  <select name="qualification" value={values.qualification} onChange={update} aria-describedby="qualification-error">
                    <option value="">Select qualification</option>
                    {qualificationOptions.map((option) => <option key={option}>{option}</option>)}
                  </select>
                  <FieldError id="qualification-error" message={errors.qualification} />
                </label>

                <label>
                  Work Experience <b>*</b>
                  <select name="experience" value={values.experience} onChange={update} aria-describedby="experience-error">
                    <option value="">Select experience</option>
                    {experienceOptions.map((option) => <option key={option}>{option}</option>)}
                  </select>
                  <FieldError id="experience-error" message={errors.experience} />
                </label>

                <label className="candidate-field-wide">
                  Technical Qualifications
                  <textarea name="technicalQualifications" value={values.technicalQualifications} onChange={update} rows="4" />
                </label>
              </div>
            </div>

            <div className="candidate-form-section">
              <div className="candidate-section-title">
                <span>Section 3</span>
                <h3>Verification</h3>
              </div>
              <div className="candidate-verification-box" role="group" aria-label="Verification placeholder">
                <b>Verification</b>
                <span>Please complete the verification before proceeding.</span>
              </div>
            </div>

            <div className="candidate-terms">
              <label>
                <input name="terms" checked={values.terms} onChange={update} type="checkbox" aria-describedby="terms-error" />
                <span>
                  I agree to the <a href="#terms">Terms & Conditions</a> and <a href="#privacy">Privacy Policy</a>.
                </span>
              </label>
              <FieldError id="terms-error" message={errors.terms} />
            </div>

            {paymentStatus.message && (
              <p className={`form-message ${paymentStatus.type}`} role="status">
                {paymentStatus.message}
              </p>
            )}

            {paymentStatus.type === 'error' && Object.keys(errors).length === 0 && (
              <button className="candidate-retry-button" type="submit">
                Try Payment Again
              </button>
            )}

            <button className="button candidate-payment-button" type="submit" disabled={processingPayment}>
              {processingPayment ? 'Processing payment...' : 'Proceed to Payment — ₹354'}
            </button>
          </form>

          <aside className="candidate-fee-card" aria-label="Registration fee summary">
            <span className="eyebrow">Registration Fee</span>
            <strong>₹354</strong>
            <p>Registration Fee: ₹300 + 18% GST</p>

            <dl>
              <div>
                <dt>Registration Fee</dt>
                <dd>₹300</dd>
              </div>
              <div>
                <dt>GST (18%)</dt>
                <dd>₹54</dd>
              </div>
              <div className="candidate-fee-total">
                <dt>Total Payable</dt>
                <dd>₹354</dd>
              </div>
            </dl>

            <small>The registration fee is ₹300 plus 18% GST, making the total payable amount ₹354.</small>
          </aside>
        </div>
      </section>
    </>
  )
}
