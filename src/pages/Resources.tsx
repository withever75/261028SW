import { useMemo, useState, type FormEvent } from 'react'
import PageTitle from '../components/PageTitle'
import Loading from '../components/Loading'
import PreviewBanner from '../components/PreviewBanner'
import { resourceStore } from '../services/resourceService'
import { saveErrorMessage, useAsync, useOwnerId } from '../hooks'
import type { ResourceKind } from '../types'

const kinds: ResourceKind[] = ['연구', '수업']

function isHttpUrl(v: string) {
  try {
    return ['http:', 'https:'].includes(new URL(v).protocol)
  } catch {
    return false
  }
}

export default function Resources() {
  const ownerId = useOwnerId()
  const { data, loading, setData } = useAsync(() => resourceStore.list(ownerId), [ownerId])
  const [kind, setKind] = useState<ResourceKind>('연구')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [note, setNote] = useState('')
  const [tagText, setTagText] = useState('')
  const [error, setError] = useState('')
  const [filter, setFilter] = useState<'' | ResourceKind>('')
  const [search, setSearch] = useState('')

  const refresh = async () => setData(await resourceStore.list(ownerId))

  async function handleAdd(e: FormEvent) {
    e.preventDefault()
    if (url.trim() && !isHttpUrl(url.trim())) {
      setError('링크는 http:// 또는 https:// 로 시작해야 합니다.')
      return
    }
    setError('')
    const tags = tagText.split(',').map((t) => t.trim()).filter(Boolean)
    try {
      await resourceStore.add(ownerId, { kind, title: title.trim(), url: url.trim(), note: note.trim(), tags })
    } catch (err) {
      setError(saveErrorMessage(err))
      return
    }
    setTitle('')
    setUrl('')
    setNote('')
    setTagText('')
    await refresh()
  }

  const list = useMemo(() => {
    const q = search.trim().toLowerCase()
    return [...(data ?? [])]
      .filter((r) => (!filter || r.kind === filter) && (!q || [r.title, r.note, ...r.tags].some((t) => t.toLowerCase().includes(q))))
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  }, [data, filter, search])

  return (
    <>
      <PageTitle title="자료 모음" desc="연구와 수업을 위해 모아 두는 나만의 자료입니다. 다른 사람은 볼 수 없습니다." />
      <PreviewBanner />
      <form onSubmit={handleAdd} className="card mb-6 space-y-3">
        <h2 className="text-lg font-semibold text-navy-900">자료 추가</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <div>
            <label htmlFor="r-kind" className="mb-1 block text-sm font-medium">구분</label>
            <select id="r-kind" className="input" value={kind} onChange={(e) => setKind(e.target.value as ResourceKind)}>
              {kinds.map((k) => <option key={k}>{k}</option>)}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="r-title" className="mb-1 block text-sm font-medium">제목</label>
            <input id="r-title" className="input" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
        </div>
        <div>
          <label htmlFor="r-url" className="mb-1 block text-sm font-medium">링크 (선택, Drive·논문 주소 등)</label>
          <input id="r-url" type="url" className="input" placeholder="https://..." value={url} onChange={(e) => setUrl(e.target.value)} />
        </div>
        <div>
          <label htmlFor="r-note" className="mb-1 block text-sm font-medium">메모</label>
          <textarea id="r-note" rows={3} className="input" value={note} onChange={(e) => setNote(e.target.value)} />
        </div>
        <div>
          <label htmlFor="r-tags" className="mb-1 block text-sm font-medium">태그 (쉼표로 구분)</label>
          <input id="r-tags" className="input" placeholder="ACEs, 방법론" value={tagText} onChange={(e) => setTagText(e.target.value)} />
        </div>
        {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
        <button type="submit" className="btn">추가</button>
      </form>

      <div className="mb-4 grid gap-3 sm:grid-cols-[1fr_auto]">
        <div>
          <label htmlFor="r-search" className="mb-1 block text-sm font-medium">검색</label>
          <input id="r-search" type="search" className="input" placeholder="제목, 메모, 태그" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex items-end gap-2" role="group" aria-label="구분 필터">
          {(['', ...kinds] as const).map((k) => (
            <button
              key={k || 'all'}
              type="button"
              aria-pressed={filter === k}
              onClick={() => setFilter(k)}
              className={`rounded-full border px-3 py-2 text-sm ${filter === k ? 'border-navy-700 bg-navy-700 text-white' : 'border-slate-300 bg-white hover:bg-slate-100'}`}
            >
              {k || '전체'}
            </button>
          ))}
        </div>
      </div>

      {loading ? <Loading /> : list.length === 0 ? <p>저장된 자료가 없습니다.</p> : (
        <ul className="space-y-3">
          {list.map((r) => (
            <li key={r.id} className="card py-4">
              <span className="tag">{r.kind}</span>
              <p className="mt-2 font-semibold text-navy-900">
                {r.url ? <a href={r.url} target="_blank" rel="noopener noreferrer" className="underline">{r.title} ↗</a> : r.title}
              </p>
              {r.note && <p className="mt-1 whitespace-pre-wrap text-sm">{r.note}</p>}
              {r.tags.length > 0 && <p className="mt-2 text-xs text-slate-600">{r.tags.map((t) => `#${t}`).join(' ')}</p>}
              <button type="button" className="mt-2 text-xs text-red-700 underline" onClick={async () => { if (window.confirm('삭제할까요?')) { await resourceStore.remove(r.id); await refresh() } }}>삭제</button>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
