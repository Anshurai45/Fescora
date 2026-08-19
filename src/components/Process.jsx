import SectionTitle from './SectionTitle'
const steps = ['Discovery', 'Strategy', 'Planning', 'Execution', 'Quality assurance', 'Delivery', 'Support']
export default function Process() { return <section className="section process"><div className="container"><SectionTitle eyebrow="How we work" title="A clearer path from ambition to impact." /><div className="process-line">{steps.map((step, i) => <div className="process-step" key={step}><b>0{i + 1}</b><span>{step}</span></div>)}</div></div></section> }
