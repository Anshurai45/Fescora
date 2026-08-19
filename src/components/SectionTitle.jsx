import { motion } from 'framer-motion'
export default function SectionTitle({ eyebrow, title, text, align = '' }) { return <motion.div className={`section-title ${align}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}><span>{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</motion.div> }
