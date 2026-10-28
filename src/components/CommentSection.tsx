import { useState, type FormEvent } from 'react'
import type { Comment } from '../types'
import { formatDate } from '../hooks'

interface Props {
  comments: Comment[]
  onAdd: (content: string) => Promise<void>
}

export default function CommentSection({ comments, onAdd }: Props) {
  const [text, setText] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!text.trim()) return
    await onAdd(text.trim())
    setText('')
  }

  return (
    <section aria-labelledby="comments-title" className="mt-8">
      <h2 id="comments-title" className="text-lg font-semibold text-navy-900">댓글 {comments.length}개</h2>
      <ul className="mt-3 space-y-3">
        {comments.map((c) => (
          <li key={c.id} className="rounded-md bg-slate-50 p-3 text-sm">
            <p className="font-medium">{c.authorName} <span className="ml-2 text-xs font-normal text-slate-600">{formatDate(c.createdAt)}</span></p>
            <p className="mt-1 whitespace-pre-wrap">{c.content}</p>
          </li>
        ))}
        {comments.length === 0 && <li className="text-sm text-slate-600">아직 댓글이 없습니다.</li>}
      </ul>
      <form onSubmit={handleSubmit} className="mt-4 space-y-2">
        <label htmlFor="comment-text" className="block text-sm font-medium">댓글 작성</label>
        <textarea id="comment-text" rows={3} className="input" value={text} onChange={(e) => setText(e.target.value)} required />
        <button type="submit" className="btn">댓글 등록</button>
      </form>
    </section>
  )
}
