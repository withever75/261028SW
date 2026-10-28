import type { Course } from '../types'

export default function CourseCard({ course }: { course: Course }) {
  return (
    <article className="card">
      <h2 className="text-lg font-semibold text-navy-900">{course.name}</h2>
      <p className="text-sm text-slate-600">{course.semester}</p>
      <p className="mt-2 text-sm text-slate-700">{course.description}</p>
      <ul className="mt-3 divide-y divide-slate-100 text-sm">
        {course.materials.map((m) => (
          <li key={m.week} className="flex items-center justify-between gap-3 py-2">
            <span>
              <strong className="mr-2 text-navy-800">{m.week}주차</strong>
              {m.topic}
            </span>
            <a href={m.url} target="_blank" rel="noopener noreferrer" className="shrink-0 text-navy-700 underline">
              자료 ↗
            </a>
          </li>
        ))}
      </ul>
    </article>
  )
}
