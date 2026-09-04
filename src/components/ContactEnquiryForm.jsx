import { useState } from "react";
import { submitContactEnquiry } from "../services/careerApi";
const initialValues = {
  name: "",
  company: "",
  email: "",
  phone: "",
  service: "",
  message: "",
};
export default function ContactEnquiryForm() {
  const [values, setValues] = useState(initialValues),
    [status, setStatus] = useState({ type: "", message: "" }),
    [submitting, setSubmitting] = useState(false);
  const update = (event) =>
    setValues((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  const submit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: "", message: "" });
    try {
      const result = await submitContactEnquiry(values);
      setValues(initialValues);
      setStatus({ type: "success", message: result.message });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      {status.type === "success" ? (
        <div className="form-success">
          <h3>Thank you.</h3>
          <p>{status.message}</p>
          <button
            className="text-link red"
            type="button"
            onClick={() => setStatus({ type: "", message: "" })}
          >
            Send another enquiry
          </button>
        </div>
      ) : (
        <>
          <div className="form-row">
            <label>
              Name *
              <input
                name="name"
                value={values.name}
                onChange={update}
                required
                autoComplete="name"
                placeholder="Your name"
              />
            </label>
            <label>
              Company
              <input
                name="company"
                value={values.company}
                onChange={update}
                autoComplete="organization"
                placeholder="Company name"
              />
            </label>
          </div>
          <div className="form-row">
            <label>
              Email *
              <input
                name="email"
                value={values.email}
                onChange={update}
                required
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
              />
            </label>
            <label>
              Phone
              <input
                name="phone"
                value={values.phone}
                onChange={update}
                type="tel"
                inputMode="tel"
                placeholder="+91 00000 00000"
              />
            </label>
          </div>
          <label>
            Service required
            <select name="service" value={values.service} onChange={update}>
              <option value="">Select a service</option>
              <option>Security Services</option>
              <option>Housekeeping & Facility Services</option>
              <option>Manpower Outsourcing</option>
              <option>Payroll Support</option>
              <option>HR & Workforce Support</option>
              <option>General Enquiry</option>
            </select>
          </label>
          <label>
            Message *
            <textarea
              name="message"
              value={values.message}
              onChange={update}
              required
              placeholder="Tell us a little about your requirement"
              rows="4"
            />
          </label>
          {status.message && (
            <p className={`form-message ${status.type}`} role="status">
              {status.message}
            </p>
          )}
          <button className="button" type="submit" disabled={submitting}>
            {submitting ? "Sending enquiry¦" : "Send enquiry"}
          </button>
        </>
      )}
    </form>
  );
}
