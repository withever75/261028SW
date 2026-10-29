import { useState, type FormEvent } from 'react'
import PageTitle from '../components/PageTitle'
import Loading from '../components/Loading'
import PreviewBanner from '../components/PreviewBanner'
import { todoStore } from '../services/todoService'
import { formatDate, today, useAsync, useOwnerId } from '../hooks'
import type { TodoCategory } from '../types'

const categories: TodoCategory[] = ['연구', '수업', '기타']
type Filter = '진행 중' | '완료' | '전체'

export default function Todos() {
  const ownerId = useOwnerId()
  const { data, loading, setData } = useAsync(() => todoStore.list(ownerId), [ownerId])
  const [text, setText] = useState('')
  const [due, setDue] = useState('')
  const [category, setCategory] = useState<TodoCategory>('연구')
  const [filter, setFilter] = useState<Filter>('진행 중')

  const refresh = async () => setData(await todoStore.list(ownerId))

  async function handleAdd(e: FormEvent) {
    e.preventDefault()
    if (!text.trim()) return
    await todoStore.add(ownerId, { text: text.trim(), done: false, due, category })
    setText('')
    setDue('')
    await refresh()
  }

  // 마감일 빠른 순(없으면 뒤), 같으면 최근 등록 순
  const list = (data ?? [])
    .filter((t) => filter === '전체' || (filter === '완료' ? t.done : !t.done))
    .sort((a, b) => (a.due || '9999').localeCompare(b.due || '9999') || b.createdAt.localeCompare(a.createdAt))

  return (
    <>
      <PageTitle title="해야 할 일" desc="나만 볼 수 있는 할 일 목록입니다." />
      <PreviewBanner />
      <form onSubmit={handleAdd} className="card mb-6 space-y-3">
        <div>
          <label htmlFor="t-text" className="mb-1 block text-sm font-medium">할 일</label>
          <input id="t-text" className="input" value={text} onChange={(e) => setText(e.target.value)} required />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="t-due" className="mb-1 block text-sm font-medium">마감일 (선택)</label>
            <input id="t-due" type="date" className="input" value={due} onChange={(e) => setDue(e.target.value)} />
          </div>
          <div>
            <label htmlFor="t-cat" className="mb-1 block text-sm font-medium">구분</label>
            <select id="t-cat" className="input" value={category} onChange={(e) => setCategory(e.target.value as TodoCategory)}>
              {categories.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <button type="submit" className="btn">추가</button>
      </form>

      <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="보기 필터">
        {(['진행 중', '완료', '전체'] as Filter[]).map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={`rounded-full border px-3 py-1 text-sm ${filter === f ? 'border-navy-700 bg-navy-700 text-white' : 'border-slate-300 bg-white hover:bg-slate-100'}`}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? <Loading /> : list.length === 0 ? <p>표시할 할 일이 없습니다.</p> : (
        <ul className="space-y-2">
          {list.map((t) => {
            const overdue = !t.done && t.due && t.due < today()
            return (
              <li key={t.id} className="card flex items-start gap-3 py-3">
                <input
                  type="checkbox"
                  className="mt-1 h-5 w-5"
                  checked={t.done}
                  aria-label={`${t.text} 완료`}
                  onChange={async () => { await todoStore.update(t.id, { done: !t.done }); await refresh() }}
                />
                <div className="flex-1">
                  <p className={t.done ? 'text-slate-500 line-through' : ''}>{t.text}</p>
                  <p className="mt-1 text-xs">
                    <span className="tag">{t.category}</span>
                    {t.due && <span className={`ml-2 ${overdue ? 'font-semibold text-red-700' : 'text-slate-600'}`}>마감 {formatDate(t.due)}{overdue && ' (지남)'}</span>}
                  </p>
                </div>
                <button type="button" className="text-xs text-red-700 underline" onClick={async () => { await todoStore.remove(t.id); await refresh() }}>삭제</button>
              </li>
            )
          })}
        </ul>
      )}
    </>
  )
}
