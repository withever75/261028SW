import { Link } from 'react-router-dom'
import ScholarLink from '../components/ScholarLink'
import PageTitle from '../components/PageTitle'
import { profile } from '../data/aboutData'

const shortcuts = [
  { to: '/research', title: '연구', desc: '진행 중인 연구 프로젝트' },
  { to: '/discussion', title: '토론', desc: '연구 주제별 토론 게시판' },
  { to: '/diary', title: '일기', desc: '나만의 기록' },
  { to: '/todos', title: '할 일', desc: '해야 할 일 관리' },
  { to: '/resources', title: '자료 모음', desc: '연구·수업 자료' },
]

export default function Home() {
  return (
    <>
      <PageTitle title="홈" hidden />
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-700 to-navy-900 px-6 py-14 text-white md:px-12">
        <span aria-hidden="true" className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-accent-500/30" />
        <span aria-hidden="true" className="absolute -bottom-16 right-24 h-40 w-40 rounded-full bg-white/10" />
        <p className="relative inline-block rounded-full bg-white/15 px-3 py-1 text-sm font-medium">{profile.title}</p>
        <h2 className="relative mt-3 text-4xl font-extrabold md:text-5xl">{profile.name}</h2>
        <p className="relative mt-3 text-lg text-navy-100">{profile.tagline}</p>
        <div className="relative mt-6 flex flex-wrap gap-3">
          <Link to="/research" className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-navy-900 hover:bg-navy-50">연구 보기</Link>
          <Link to="/discussion" className="rounded-full border border-white px-5 py-2 text-sm font-semibold text-white hover:bg-white/10">토론 참여</Link>
          <ScholarLink className="rounded-full border border-white/60 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10" />
        </div>
      </section>

      <section aria-labelledby="shortcut-title" className="mt-8">
        <h2 id="shortcut-title" className="mb-3 text-lg font-semibold text-navy-900">바로가기</h2>
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {shortcuts.map((s) => (
            <li key={s.to}>
              <Link to={s.to} className="card block h-full hover:border-navy-700">
                <span className="font-semibold text-navy-800">{s.title}</span>
                <span className="mt-1 block text-sm text-slate-600">{s.desc}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

    </>
  )
}
