import { useState } from "react";
export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };
  return (
    <form className="contact-form" onSubmit={submit}>
      {sent ? (
        <div className="form-success">
          <h3>Thank you.</h3>
          <p>Our team will be in touch shortly.</p>
        </div>
      ) : (
        <>
          <div className="form-row">
            <label>
              Name
              <input required placeholder="Your name" />
            </label>
            <label>
              Company
              <input placeholder="Company name" />
            </label>
          </div>
          <div className="form-row">
            <label>
              Email
              <input required type="email" placeholder="you@company.com" />
            </label>
            <label>
              Phone
              <input type="tel" placeholder="+91" />
            </label>
          </div>
          <label>
            Service required
            <select defaultValue="">
              <option value="" disabled>
                Select a service
              </option>
              <option>Technology consulting</option>
              <option>Talent & staffing</option>
              <option>Digital transformation</option>
              <option>Managed services</option>
            </select>
          </label>
          <label>
            Message
            <textarea
              required
              placeholder="Tell us a little about your goals"
              rows="4"
            />
          </label>
          <button className="button" type="submit">
            Send enquiry
          </button>
        </>
      )}
    </form>
  );
}
