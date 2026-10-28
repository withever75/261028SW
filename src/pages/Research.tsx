import { useMemo, useState } from 'react'
import PublicationList from '../components/PublicationList'
import ScholarLink from '../components/ScholarLink'
import PageTitle from '../components/PageTitle'
import Loading from '../components/Loading'
import ProjectCard from '../components/ProjectCard'
import { getProjects } from '../services/researchService'
import { useAsync } from '../hooks'

export default function Research() {
  const { data, loading } = useAsync(getProjects)
  const [query, setQuery] = useState('')
  const [keyword, setKeyword] = useState('')

  const allKeywords = useMemo(() => Array.from(new Set(data?.flatMap((p) => p.keywords) ?? [])), [data])
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return (data ?? []).filter(
      (p) =>
        (!keyword || p.keywords.includes(keyword)) &&
        (!q || [p.title, p.summary, ...p.keywords].some((t) => t.toLowerCase().includes(q))),
    )
  }, [data, query, keyword])

  return (
    <>
      <PageTitle title="연구" desc="진행 중이거나 완료된 연구 프로젝트입니다." />
      <div className="mb-6"><ScholarLink /></div>
      <div className="mb-4">
        <label htmlFor="search" className="mb-1 block text-sm font-medium">검색</label>
        <input id="search" type="search" className="input" placeholder="제목, 요약, 키워드로 검색" value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>
      <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="키워드 필터">
        {['', ...allKeywords].map((k) => (
          <button
            key={k || 'all'}
            type="button"
            aria-pressed={keyword === k}
            onClick={() => setKeyword(k)}
            className={`rounded-full border px-3 py-1 text-sm ${keyword === k ? 'border-navy-800 bg-navy-800 text-white' : 'border-slate-300 hover:bg-slate-100'}`}
          >
            {k ? `#${k}` : '전체'}
          </button>
        ))}
      </div>
      {loading ? <Loading /> : filtered.length === 0 ? (
        <p>조건에 맞는 연구가 없습니다.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((p) => <ProjectCard key={p.id} project={p} />)}
        </div>
      )}
      <PublicationList />
    </>
  )
}
