import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavbarPremium";
import Footer from "./components/FooterPremium";
const Home = lazy(() => import("./pages/HomeCorporate"));
const About = lazy(() => import("./pages/AboutCorporate"));
const Services = lazy(() => import("./pages/ServicesPremium"));
const Careers = lazy(() => import("./pages/CareersApplication"));
const Contact = lazy(() => import("./pages/ContactPremium"));
const CandidateRegistration = lazy(() => import("./pages/CandidateRegistration"));
const RegistrationSuccess = lazy(() => import("./pages/RegistrationSuccess"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const RefundPolicy = lazy(() => import("./pages/RefundPolicy"));
const CandidateRegistrationTerms = lazy(() => import("./pages/CandidateRegistrationTerms"));

function App() {
  // TEMPORARY HOLDING PAGE: the original application remains below for restoration.
  return (
    <main
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "22px",
        padding: "18px",
        background: "#080000",
      }}
    >
      <img
        src="/chatgpt.png"
        alt="Promotional poster"
        style={{
          display: "block",
          width: "min(100%, 1680px)",
          maxHeight: "calc(100svh - 118px)",
          objectFit: "contain",
          borderRadius: "10px",
          boxShadow: "0 0 40px rgba(245, 20, 33, .32)",
        }}
      />
      <button
        type="button"
        style={{
          border: "2px solid #ff5a5f",
          borderRadius: "999px",
          padding: "14px 30px",
          background: "linear-gradient(135deg, #ff171d, #a90008)",
          boxShadow: "0 8px 28px rgba(255, 23, 29, .5)",
          color: "#fff",
          font: "800 clamp(1rem, 2.4vw, 1.3rem)/1 Arial, sans-serif",
          cursor: "pointer",
        }}
      >
        DK 1000 Daal do
      </button>
    </main>
  );

  return (
    <BrowserRouter>
      <Navbar />

      <Suspense fallback={<div className="page-loader">Loading Fescora…</div>}><Routes>
        <Route path="/" element={<Home />} /><Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} /><Route path="/industries" element={<Services industriesOnly />} />
        <Route path="/careers" element={<Careers />} /><Route path="/candidate-registration" element={<CandidateRegistration />} /><Route path="/registration-success" element={<RegistrationSuccess />} /><Route path="/privacy-policy" element={<PrivacyPolicy />} /><Route path="/terms-and-conditions" element={<TermsAndConditions />} /><Route path="/refund-policy" element={<RefundPolicy />} /><Route path="/candidate-registration-terms" element={<CandidateRegistrationTerms />} /><Route path="/contact" element={<Contact />} />
      </Routes></Suspense>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
