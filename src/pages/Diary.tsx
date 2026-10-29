import { useState, type FormEvent } from 'react'
import PageTitle from '../components/PageTitle'
import Loading from '../components/Loading'
import PreviewBanner from '../components/PreviewBanner'
import { diaryStore } from '../services/diaryService'
import { formatDate, today, useAsync, useOwnerId } from '../hooks'
import type { DiaryEntry } from '../types'

export default function Diary() {
  const ownerId = useOwnerId()
  const { data, loading, setData } = useAsync(() => diaryStore.list(ownerId), [ownerId])
  const [editing, setEditing] = useState<DiaryEntry | null>(null)
  const [date, setDate] = useState(today())
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const refresh = async () => setData(await diaryStore.list(ownerId))

  function reset() {
    setEditing(null)
    setDate(today())
    setTitle('')
    setContent('')
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!content.trim()) return
    const input = { date, title: title.trim(), content: content.trim() }
    if (editing) await diaryStore.update(editing.id, input)
    else await diaryStore.add(ownerId, input)
    reset()
    await refresh()
  }

  function startEdit(d: DiaryEntry) {
    setEditing(d)
    setDate(d.date)
    setTitle(d.title)
    setContent(d.content)
    window.scrollTo(0, 0)
  }

  async function handleDelete(id: string) {
    if (!window.confirm('이 일기를 삭제할까요?')) return
    await diaryStore.remove(id)
    await refresh()
  }

  const list = [...(data ?? [])].sort((a, b) => b.date.localeCompare(a.date) || b.createdAt.localeCompare(a.createdAt))

  return (
    <>
      <PageTitle title="일기" desc="나만 볼 수 있는 공간입니다. 다른 사람(교수님 포함)은 볼 수 없습니다." />
      <PreviewBanner />
      <form onSubmit={handleSubmit} className="card mb-6 space-y-3">
        <h2 className="text-lg font-semibold text-navy-900">{editing ? '일기 수정' : '새 일기'}</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <div>
            <label htmlFor="d-date" className="mb-1 block text-sm font-medium">날짜</label>
            <input id="d-date" type="date" className="input" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="d-title" className="mb-1 block text-sm font-medium">제목 (선택)</label>
            <input id="d-title" className="input" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
        </div>
        <div>
          <label htmlFor="d-content" className="mb-1 block text-sm font-medium">내용</label>
          <textarea id="d-content" rows={6} className="input" value={content} onChange={(e) => setContent(e.target.value)} required />
        </div>
        <div className="flex gap-2">
          <button type="submit" className="btn">{editing ? '수정 저장' : '저장'}</button>
          {editing && <button type="button" className="btn-outline" onClick={reset}>취소</button>}
        </div>
      </form>
      {loading ? <Loading /> : list.length === 0 ? <p>아직 쓴 일기가 없습니다.</p> : (
        <ul className="space-y-3">
          {list.map((d) => (
            <li key={d.id} className="card">
              <p className="text-xs text-slate-600">{formatDate(d.date)}</p>
              {d.title && <h2 className="mt-1 text-lg font-semibold text-navy-900">{d.title}</h2>}
              <p className="mt-1 whitespace-pre-wrap text-sm">{d.content}</p>
              <div className="mt-3 flex gap-3 text-xs">
                <button type="button" className="text-navy-700 underline" onClick={() => startEdit(d)}>수정</button>
                <button type="button" className="text-red-700 underline" onClick={() => handleDelete(d.id)}>삭제</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
