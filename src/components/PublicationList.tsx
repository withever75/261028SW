import { getPublications } from '../services/researchService'
import { useAsync } from '../hooks'

export default function PublicationList() {
  const { data } = useAsync(getPublications)
  if (!data || data.length === 0) return null
  return (
    <section aria-labelledby="pub-title" className="mt-10">
      <h2 id="pub-title" className="mb-3 text-xl font-bold text-navy-900">논문·저술</h2>
      <ul className="space-y-3">
        {data.map((p) => (
          <li key={p.id} className="card py-4">
            <p className="font-semibold text-navy-900">
              {p.url ? (
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="underline">{p.title} ↗</a>
              ) : p.title}
            </p>
            <p className="mt-1 text-sm text-slate-700">{p.authors}</p>
            <p className="text-sm text-slate-600">{p.venue}, {p.year}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
