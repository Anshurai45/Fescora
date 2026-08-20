import { Link } from "react-router-dom";
import { ArrowUpRight, AtSign, Globe, MessageCircle } from "lucide-react";
import BrandLockup from "./BrandLockup";
export default function FooterPremium() {
  return (
    <footer>
      <div className="container footer-grid">
        <div>
          <Link to="/" className="logo" aria-label="Fescora Management home">
            <BrandLockup />
          </Link>
          <p>
            Business solutions designed to help ambitious organizations move
            forward with confidence.
          </p>
        </div>
        <div>
          <b>Explore</b>
          <Link to="/about">About us</Link>
          <Link to="/services">Services</Link>
          <Link to="/careers">Careers</Link>
        </div>
        <div>
          <b>Connect</b>
          <a href="mailto:info@fescora.com">info@fescora.com</a>
          <a href="tel:+917983051409">+91 7983051409</a>
          <div className="socials">
            <a href="#linkedin" aria-label="LinkedIn">
              <Globe />
            </a>
            <a href="#twitter" aria-label="Twitter">
              <MessageCircle />
            </a>
            <a href="#instagram" aria-label="Instagram">
              <AtSign />
            </a>
          </div>
        </div>
        <div className="newsletter">
          <b>Signals worth receiving</b>
          <p>Occasional ideas on the future of work and technology.</p>
          <form>
            <input
              type="email"
              placeholder="Email address"
              aria-label="Email address"
            />
            <button aria-label="Subscribe">
              <ArrowUpRight />
            </button>
          </form>
        </div>
      </div>
      <div className="container footer-bottom">
        © {new Date().getFullYear()} Fescora Management. All rights reserved.
        <span>Privacy · Terms</span>
      </div>
    </footer>
  );
}
