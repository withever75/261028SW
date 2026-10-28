import { Link } from 'react-router-dom'
import type { ResearchProject } from '../types'

const statusStyle: Record<string, string> = {
  '진행 중': 'bg-emerald-100 text-emerald-900',
  완료: 'bg-slate-200 text-slate-800',
  '준비 중': 'bg-amber-100 text-amber-900',
}

export default function ProjectCard({ project }: { project: ResearchProject }) {
  return (
    <article className="card">
      <div className="flex flex-wrap items-center gap-2">
        <span className={`rounded px-2 py-0.5 text-xs font-medium ${statusStyle[project.status]}`}>{project.status}</span>
        <span className="text-xs text-slate-600">{project.period}</span>
      </div>
      <h2 className="mt-2 text-lg font-semibold text-navy-900">
        <Link to={`/research/${project.id}`} className="hover:underline">{project.title}</Link>
      </h2>
      <p className="mt-1 text-sm text-slate-700">{project.summary}</p>
      <ul className="mt-3 flex flex-wrap gap-2" aria-label="키워드">
        {project.keywords.map((k) => (
          <li key={k} className="tag">#{k}</li>
        ))}
      </ul>
      <p className="mt-3 text-sm">
        <Link to={`/research/${project.id}`} className="font-semibold text-navy-700 underline">자료실 보기 →</Link>
      </p>
      {project.links.length > 0 && (
        <ul className="mt-3 space-y-1 text-sm">
          {project.links.map((l) => (
            <li key={l.label}>
              <a href={l.url} target="_blank" rel="noopener noreferrer" className="text-navy-700 underline">
                {l.label} ↗
              </a>
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}
