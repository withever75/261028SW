import { useState, type FormEvent } from 'react'
import { useAuth } from '../context/AuthContext'
import { authorOf, formatDate, useAsync } from '../hooks'
import { addMaterial, deleteMaterial, getMaterials } from '../services/materialService'
import type { MaterialKind } from '../types'
import Loading from './Loading'

const kinds: MaterialKind[] = ['논문', '작업 파일']

// http(s) 주소만 허용
function isHttpUrl(v: string) {
  try {
    return ['http:', 'https:'].includes(new URL(v).protocol)
  } catch {
    return false
  }
}

function Materials({ projectId }: { projectId: string }) {
  const { user } = useAuth()
  const { data, loading, setData } = useAsync(() => getMaterials(projectId), [projectId])
  const [filter, setFilter] = useState<'' | MaterialKind>('')
  const [kind, setKind] = useState<MaterialKind>('논문')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [note, setNote] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!isHttpUrl(url.trim())) {
      setError('http:// 또는 https:// 로 시작하는 올바른 링크를 입력해 주세요.')
      return
    }
    setError('')
    try {
      await addMaterial({ projectId, kind, title: title.trim(), url: url.trim(), note: note.trim() }, authorOf(user))
    } catch {
      setError('등록하지 못했습니다. 잠시 후 다시 시도해 주세요.')
      return
    }
    setTitle('')
    setUrl('')
    setNote('')
    setData(await getMaterials(projectId))
  }

  async function handleDelete(id: string) {
    if (!window.confirm('이 자료를 삭제할까요? (원본 파일은 삭제되지 않습니다)')) return
    await deleteMaterial(id)
    setData(await getMaterials(projectId))
  }

  const list = (data ?? []).filter((m) => !filter || m.kind === filter)

  return (
    <>
      <form onSubmit={handleSubmit} className="card mb-6 space-y-3">
        <h3 className="text-lg font-semibold text-navy-900">자료 등록</h3>
        <p className="text-sm text-slate-600">
          파일은 사이트에 직접 올리지 않고, Google Drive 등에 올린 뒤 <strong>공유 링크</strong>를 붙여넣어 등록합니다.
        </p>
        <div>
          <label htmlFor="m-kind" className="mb-1 block text-sm font-medium">구분</label>
          <select id="m-kind" className="input" value={kind} onChange={(e) => setKind(e.target.value as MaterialKind)}>
            {kinds.map((k) => <option key={k}>{k}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="m-title" className="mb-1 block text-sm font-medium">제목</label>
          <input id="m-title" className="input" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="m-url" className="mb-1 block text-sm font-medium">링크 주소</label>
          <input id="m-url" type="url" className="input" placeholder="https://drive.google.com/..." value={url} onChange={(e) => setUrl(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="m-note" className="mb-1 block text-sm font-medium">설명 (저자·연도, 파일 설명 등)</label>
          <input id="m-note" className="input" value={note} onChange={(e) => setNote(e.target.value)} />
        </div>
        {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
        <button type="submit" className="btn">등록</button>
      </form>

      <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="자료 구분 필터">
        {(['', ...kinds] as const).map((k) => (
          <button
            key={k || 'all'}
            type="button"
            aria-pressed={filter === k}
            onClick={() => setFilter(k)}
            className={`rounded-full border px-3 py-1 text-sm ${filter === k ? 'border-navy-700 bg-navy-700 text-white' : 'border-slate-300 bg-white hover:bg-slate-100'}`}
          >
            {k || '전체'}
          </button>
        ))}
      </div>

      {loading ? <Loading /> : list.length === 0 ? <p className="text-sm text-slate-600">등록된 자료가 없습니다.</p> : (
        <ul className="space-y-3">
          {list.map((m) => (
            <li key={m.id} className="card py-4">
              <span className="tag">{m.kind}</span>
              <p className="mt-2 font-semibold text-navy-900">
                <a href={m.url} target="_blank" rel="noopener noreferrer" className="underline">{m.title} ↗</a>
              </p>
              {m.note && <p className="text-sm text-slate-700">{m.note}</p>}
              <p className="mt-1 text-xs text-slate-600">{m.authorName} · {formatDate(m.createdAt)}</p>
              {!!user && (user.id === m.authorId || user.role === 'admin') && (
                <button type="button" className="mt-2 text-xs text-red-700 underline" onClick={() => handleDelete(m.id)}>삭제</button>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

// 자료실은 로그인 + 승인된 사용자에게만 보입니다 (미리보기 모드는 항상 표시)
export default function MaterialsSection({ projectId }: { projectId: string }) {
  const { user, loading, configured, signIn } = useAuth()
  let body
  if (!configured) body = <Materials projectId={projectId} />
  else if (loading) body = <Loading />
  else if (!user) {
    body = (
      <>
        <p className="mb-3">자료실은 로그인 후 이용할 수 있습니다.</p>
        <button type="button" className="btn" onClick={() => signIn().catch(() => {})}>Google 로그인</button>
      </>
    )
  } else if (!user.allowed) body = <p role="status" className="text-sm text-amber-900">교수님의 승인을 받으면 자료실을 이용할 수 있습니다.</p>
  else body = <Materials projectId={projectId} />

  return (
    <section aria-labelledby="materials-title" className="mt-10">
      <h2 id="materials-title" className="mb-3 text-xl font-bold text-navy-900">자료실 (논문·작업 파일)</h2>
      {body}
    </section>
  )
}
