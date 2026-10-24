import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Rob McManus',
}

const caseStudies = [
  {
    title: 'Case study title',
    company: 'Company',
    year: '2024',
    description: 'A short description of the project and the problem it solved.',
  },
  {
    title: 'Case study title',
    company: 'Company',
    year: '2023',
    description: 'A short description of the project and the problem it solved.',
  },
]

const workHistory = [
  { role: 'Senior Product Designer', company: 'ahm', period: '2023 – Current' },
  { role: 'Senior UX Designer', company: 'ahm', period: '2022 – 2023' },
  { role: 'Product Designer', company: 'Transurban', period: '2020 – 2021' },
  { role: 'Digital Designer', company: 'Transurban', period: '2017 – 2020' },
  { role: 'Digital Designer', company: 'Freelance', period: '2016 – 2017' },
]

export default function Home() {
  return (
    <main>
      <section>
        <h1>Rob McManus</h1>
        <p>I am a digital product designer, living in Melbourne.</p>
      </section>

      <section>
        <h2>Currently I am:</h2>
        <p>
          Working on user experiences at{' '}
          <a href="https://www.ahm.com.au" target="_blank" rel="noopener noreferrer">
            ahm
          </a>
          , focusing on members.
        </p>
        <p>
          I've worked across healthcare, infrastructure, advertising, and fashion,
          tackling complex projects that balance business objectives with user experience.
          Portfolio available on request.
        </p>
      </section>

      <section>
        <h2>Case studies</h2>
        <ul>
          {caseStudies.map((study, i) => (
            <li key={i}>
              <span>{study.company} — {study.year}</span>
              <h3>{study.title}</h3>
              <p>{study.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Work experience</h2>
        <ul>
          {workHistory.map((job, i) => (
            <li key={i}>
              <h3>{job.role}, {job.company}</h3>
              <span>{job.period}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Contact</h2>
        <ul>
          <li><a href="mailto:rob@robmcmanus.com.au">Email</a></li>
          <li><a href="https://www.linkedin.com/in/robert-mcmanu-28b3a741/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          <li><a href="https://www.instagram.com/foamworks_/" target="_blank" rel="noopener noreferrer">foam.works</a></li>
        </ul>
      </section>
    </main>
  )
}
