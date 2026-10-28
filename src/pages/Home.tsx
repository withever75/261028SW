import { Link } from 'react-router-dom'
import PageTitle from '../components/PageTitle'
import Loading from '../components/Loading'
import { profile } from '../data/aboutData'
import { getProjects } from '../services/researchService'
import { getCourses } from '../services/teachingService'
import { useAsync } from '../hooks'

const shortcuts = [
  { to: '/research', title: '연구', desc: '진행 중인 연구 프로젝트' },
  { to: '/teaching', title: '수업', desc: '과목별 주차 자료' },
  { to: '/discussion', title: '토론', desc: '연구 주제별 토론 게시판' },
  { to: '/about', title: '소개', desc: '약력과 연락처' },
]

export default function Home() {
  const projects = useAsync(getProjects)
  const courses = useAsync(getCourses)
  return (
    <>
      <PageTitle title="홈" />
      <section className="rounded-lg bg-navy-800 px-6 py-10 text-white">
        <p className="text-sm text-navy-100">{profile.title}</p>
        <h2 className="mt-1 text-2xl font-bold">{profile.name}</h2>
        <p className="mt-2">{profile.tagline}</p>
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

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <section aria-labelledby="recent-research">
          <h2 id="recent-research" className="mb-3 text-lg font-semibold text-navy-900">최근 연구</h2>
          {projects.loading ? <Loading /> : (
            <ul className="space-y-2">
              {projects.data?.slice(0, 3).map((p) => (
                <li key={p.id} className="card py-3">
                  <Link to="/research" className="font-medium text-navy-800 hover:underline">{p.title}</Link>
                  <p className="text-xs text-slate-600">{p.status} · {p.period}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
        <section aria-labelledby="recent-teaching">
          <h2 id="recent-teaching" className="mb-3 text-lg font-semibold text-navy-900">이번 학기 수업</h2>
          {courses.loading ? <Loading /> : (
            <ul className="space-y-2">
              {courses.data?.map((c) => (
                <li key={c.id} className="card py-3">
                  <Link to="/teaching" className="font-medium text-navy-800 hover:underline">{c.name}</Link>
                  <p className="text-xs text-slate-600">{c.semester} · 자료 {c.materials.length}건</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  )
}
