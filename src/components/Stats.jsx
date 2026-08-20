import { motion } from "framer-motion";
const standards = [
  [
    "Compliance-ready operations",
    "Structured payroll, attendance and statutory documentation support.",
  ],
  [
    "Rapid mobilisation",
    "Trained teams and site-readiness plans built around your operating needs.",
  ],
  [
    "Defined site procedures",
    "Clear SOPs, escalation paths and service expectations for every location.",
  ],
  [
    "Accountable supervision",
    "Field-led oversight, routine reviews and transparent communication.",
  ],
];
export default function Stats() {
  return (
    <section className="stats operating-standards">
      <div className="container">
        <div className="standards-heading">
          <span>How we operate</span>
          <h2>Control where it matters. Clarity everywhere else.</h2>
        </div>
        <div className="standards-grid">
          {standards.map(([title, text], index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
            >
              <b>0{index + 1}</b>
              <h3>{title}</h3>
              <p>{text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
