import ContactForm from "../components/ContactEnquiryForm";
export default function ContactPremium() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Contact</span>
          <h1>Let’s create momentum together.</h1>
          <p>
            Tell us where you are headed. We’ll bring the right people and
            perspective to help you get there.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container intro-grid">
          <div>
            <span className="eyebrow">Start the conversation</span>
            <h2
              style={{
                fontSize: "clamp(2.3rem,4vw,4rem)",
                letterSpacing: "-.06em",
                marginTop: 12,
              }}
            >
              Your next chapter starts with a simple hello.
            </h2>
            <p style={{ color: "#555", lineHeight: 1.6 }}>
              info@fescora.com
              <br />
              +91 7983051409
              <br />
              <br />
              Monday–Saturday
              <br />
              9:00 AM – 6:00 PM IST
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
