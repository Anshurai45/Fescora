import { motion } from 'framer-motion'
const stats = [['100%', 'Statutory adherence'], ['Quick', 'Deployment'], ['ISO', 'Standard SOP framework'], ['Veteran-led', 'Field leadership']]
export default function Stats() { return <section className="stats"><div className="container stats-grid">{stats.map(([n, label]) => <motion.div key={label} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}><strong>{n}</strong><span>{label}</span></motion.div>)}</div></section> }
