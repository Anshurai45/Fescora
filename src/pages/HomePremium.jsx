import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import Hero from "../components/HeroPremium";
import SectionTitle from "../components/SectionTitle";
import ServiceCard from "../components/ServiceCard";
import Stats from "../components/Stats";
import Process from "../components/Process";
import Industries from "../components/Industries";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import { services, whyUs } from "../data/content";
export default function HomePremium() {
  return (
    <>
      <Hero />
      <section className="section intro">
        <div className="container intro-grid">
          <SectionTitle
            eyebrow="The Fescora difference"
            title="The capability to make change feel natural."
            text="We bring sharp thinking and hands-on execution to the moments that matter most."
          />
          <div>
            <p className="lead">
              Our multidisciplinary teams turn complex business priorities into
              practical, lasting progress.
            </p>
            <div className="mission">
              <div>
                <span>Mission</span>
                <p>Make meaningful growth easier to achieve.</p>
              </div>
              <div>
                <span>Vision</span>
                <p>Be the partner behind tomorrow’s best businesses.</p>
              </div>
            </div>
            <Link className="text-link red" to="/about">
              More about Fescora <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
      <section className="section service-section">
        <div className="container">
          <SectionTitle
            eyebrow="What we do"
            title="Every capability, connected."
            text="Expertise that moves seamlessly between strategy, people, technology and operations."
          />
          <div className="service-grid">
            {services.slice(0, 6).map((s, i) => (
              <ServiceCard service={s} index={i} key={s[0]} />
            ))}
          </div>
          <Link className="text-link red view-all" to="/services">
            View all services <ArrowRight size={17} />
          </Link>
        </div>
      </section>
      <Stats />
      <section className="section why">
        <div className="container why-grid">
          <div>
            <SectionTitle
              eyebrow="Why Fescora"
              title="Built for outcomes, not optics."
            />
            <p>
              We work with curiosity, accountability and a determined focus on
              what creates real value for your organization.
            </p>
          </div>
          <div className="why-cards">
            {whyUs.map((item, i) => (
              <div key={item}>
                <CheckCircle2 size={20} />
                <b>0{i + 1}</b>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Industries />
      <Process />
      <Testimonials />
      <section className="section careers-band">
        <div className="container careers-grid">
          <div>
            <span className="eyebrow">Careers at Fescora</span>
            <h2>Bring your best work to work.</h2>
            <p>
              Join people who care deeply, think expansively, and build things
              that last.
            </p>
            <Link to="/careers" className="button">
              Explore opportunities <ArrowRight size={17} />
            </Link>
          </div>
          <div className="talent-card">
            <span>Open roles</span>
            <strong>24</strong>
            <p>Across technology, consulting and operations.</p>
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
