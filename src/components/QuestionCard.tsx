import { useState, type FormEvent } from 'react'
import type { Question } from '../types'
import { formatDate } from '../hooks'

interface Props {
  question: Question
  canAnswer: boolean
  canDelete: boolean
  onAnswer: (answer: string) => Promise<void>
  onDelete: () => Promise<void>
}

export default function QuestionCard({ question: q, canAnswer, canDelete, onAnswer, onDelete }: Props) {
  const [text, setText] = useState(q.answer ?? '')
  const [editing, setEditing] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!text.trim()) return
    await onAnswer(text.trim())
    setEditing(false)
  }

  return (
    <article className="card">
      <div className="flex flex-wrap items-center gap-2">
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${q.answer ? 'bg-emerald-100 text-emerald-900' : 'bg-amber-100 text-amber-900'}`}>
          {q.answer ? '답변 완료' : '답변 대기'}
        </span>
        <span className="text-xs text-slate-600">{q.authorName} · {formatDate(q.createdAt)}</span>
      </div>
      <h2 className="mt-2 text-lg font-semibold text-navy-900">{q.title}</h2>
      <p className="mt-1 whitespace-pre-wrap text-sm">{q.content}</p>

      {q.answer && !editing && (
        <div className="mt-4 rounded-xl bg-navy-50 p-4 text-sm">
          <p className="font-semibold text-navy-800">교수님 답변{q.answeredAt && <span className="ml-2 text-xs font-normal text-slate-600">{formatDate(q.answeredAt)}</span>}</p>
          <p className="mt-1 whitespace-pre-wrap">{q.answer}</p>
        </div>
      )}

      {canAnswer && (editing || !q.answer) ? (
        <form onSubmit={handleSubmit} className="mt-4 space-y-2">
          <label htmlFor={`answer-${q.id}`} className="block text-sm font-medium">답변 작성</label>
          <textarea id={`answer-${q.id}`} rows={4} className="input" value={text} onChange={(e) => setText(e.target.value)} required />
          <div className="flex gap-2">
            <button type="submit" className="btn">답변 등록</button>
            {editing && <button type="button" className="btn-outline" onClick={() => setEditing(false)}>취소</button>}
          </div>
        </form>
      ) : (
        <div className="mt-3 flex gap-3 text-sm">
          {canAnswer && <button type="button" className="text-navy-700 underline" onClick={() => setEditing(true)}>답변 수정</button>}
        </div>
      )}
      {canDelete && (
        <button type="button" className="mt-3 text-xs text-red-700 underline" onClick={onDelete}>질문 삭제</button>
      )}
    </article>
  )
}
