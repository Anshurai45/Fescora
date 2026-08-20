import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
export default function HeroPremium() {
  return (
    <section className="hero">
      <div className="hero-orb one" />
      <div className="hero-orb two" />
      <div className="container hero-content">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Integrated enterprise solutions
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Integrated security, facility management &{" "}
          <em>human capital solutions.</em>
        </motion.h1>
        <motion.p
          className="hero-copy"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          Engineered by industry veterans. Driven by strict compliance. FESCORA
          delivers precision-trained guarding, commercial housekeeping, turnkey
          manpower, payroll administration and institutional HR auditing.
        </motion.p>
        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <Link className="button" to="/contact">
            Request an enterprise audit <ArrowRight size={17} />
          </Link>
          <Link className="text-link" to="/services">
            <Play size={15} fill="currentColor" /> Explore our services
          </Link>
        </motion.div>
        <div className="trust-row">
          <span>Built for compliant operations</span>
          <b>SECURITY</b>
          <b>FACILITIES</b>
          <b>MANPOWER</b>
          <b>PAYROLL MANAGEMENT</b>
        </div>
      </div>
    </section>
  );
}
