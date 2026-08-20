import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import Hero from "../components/HeroPremium";
import SectionTitle from "../components/SectionTitle";
import ServiceCard from "../components/ServiceCard";
import Stats from "../components/Stats";
import Industries from "../components/Industries";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import { services, whyUs } from "../data/content";
export default function HomeCorporate() {
  return (
    <>
      <Hero />
      <section className="section intro corporate-intro">
        <div className="container corporate-intro-grid">
          <div className="corporate-intro-title">
            <span className="eyebrow">
              Leadership & institutional expertise
            </span>
            <h2>Grounded leadership. Modern precision.</h2>
            <p>
              FESCORA is a fresh, agile standard in integrated facilities and
              manpower solutions.
            </p>
          </div>
          <div className="corporate-intro-content">
            <p className="lead">
              Our operational backbone is forged by industry veterans, retired
              defense personnel, labor law experts and corporate HR strategists.
            </p>
            <div className="expertise-grid">
              <article>
                <span>Defense & field experts</span>
                <p>
                  Battle-tested field operations that bring discipline,
                  readiness and operational peace of mind.
                </p>
              </article>
              <article>
                <span>Corporate HR strategists</span>
                <p>
                  Data-driven workforce management built for compliant, scalable
                  enterprise operations.
                </p>
              </article>
            </div>
            <Link className="text-link red" to="/about">
              Discover our operational platform <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
      <section className="section service-section">
        <div className="container">
          <SectionTitle
            eyebrow="Core solutions"
            title="The six pillars of FESCORA."
            text="Integrated security, facility management and human capital solutions under one accountable platform."
          />
          <div className="service-grid">
            {services.map((s, i) => (
              <ServiceCard service={s} index={i} key={s[0]} />
            ))}
          </div>
          <Link className="text-link red view-all" to="/services">
            Explore service details <ArrowRight size={17} />
          </Link>
        </div>
      </section>
      <Stats />
      <section className="section advantage-section">
        <div className="container">
          <div className="advantage-intro">
            <SectionTitle
              eyebrow="The FESCORA advantage"
              title="A service partner built for the realities of your site."
            />
            <p>
              Facilities work best when people, processes and the workplace
              operate as one system. FESCORA brings site support, workforce
              coordination and operational reporting into a clearer, more
              dependable rhythm.
            </p>
          </div>
          <div className="advantage-grid">
            {whyUs.map(([title, text], i) => (
              <article key={title}>
                <div>
                  <CheckCircle2 size={20} />
                  <b>0{i + 1}</b>
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Industries />
      <Testimonials />
      <CTA />
    </>
  );
}
