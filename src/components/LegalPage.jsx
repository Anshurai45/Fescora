import { useEffect } from 'react'

export default function LegalPage({ eyebrow, title, intro, sections }) {
  useEffect(() => {
    document.title = `${title} | Fescora Management`
    const description = `${title} for Fescora Management.`
    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', description)
  }, [title])

  return <><section className="page-hero"><div className="container"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{intro}</p></div></section><section className="section intro"><div className="container"><div className="section-title"><span>Fescora Management</span><h2>Important information for website visitors and candidates.</h2></div>{sections.map((section) => <article className="section-title" key={section.heading}><h3>{section.heading}</h3>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</article>)}</div></section></>
}