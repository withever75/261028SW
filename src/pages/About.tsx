import type { ReactNode } from 'react'
import PageTitle from '../components/PageTitle'
import { profile } from '../data/aboutData'

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="card">
      <h2 className="mb-2 text-lg font-semibold text-navy-900">{title}</h2>
      {children}
    </section>
  )
}

function List({ items }: { items: string[] }) {
  return <ul className="list-disc space-y-1 pl-5 text-sm">{items.map((i) => <li key={i}>{i}</li>)}</ul>
}

export default function About() {
  return (
    <>
      <PageTitle title="소개" desc={`${profile.name} · ${profile.title} (샘플 텍스트)`} />
      <div className="grid gap-4 md:grid-cols-2">
        <Section title="학력"><List items={profile.education} /></Section>
        <Section title="경력"><List items={profile.career} /></Section>
        <Section title="연구 관심사"><List items={profile.interests} /></Section>
        <Section title="연락처">
          <dl className="space-y-1 text-sm">
            <div><dt className="inline font-medium">이메일: </dt><dd className="inline">{profile.contact.email}</dd></div>
            <div><dt className="inline font-medium">연구실: </dt><dd className="inline">{profile.contact.office}</dd></div>
            <div><dt className="inline font-medium">전화: </dt><dd className="inline">{profile.contact.phone}</dd></div>
          </dl>
        </Section>
      </div>
    </>
  )
}
