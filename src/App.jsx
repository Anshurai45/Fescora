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
