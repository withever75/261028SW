import { useState, type FormEvent } from 'react'
import type { NewPostInput } from '../types'

interface Props {
  topics: string[]
  onSubmit: (input: NewPostInput) => Promise<void>
  onCancel: () => void
}

export default function PostForm({ topics, onSubmit, onCancel }: Props) {
  const [topic, setTopic] = useState(topics[0] ?? '')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return
    await onSubmit({ topic, title: title.trim(), content: content.trim() })
  }

  return (
    <form onSubmit={handleSubmit} className="card mb-6 space-y-4">
      <div>
        <label htmlFor="post-topic" className="mb-1 block text-sm font-medium">연구 주제</label>
        <select id="post-topic" className="input" value={topic} onChange={(e) => setTopic(e.target.value)}>
          {topics.map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="post-title" className="mb-1 block text-sm font-medium">제목</label>
        <input id="post-title" className="input" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="post-content" className="mb-1 block text-sm font-medium">내용</label>
        <textarea id="post-content" rows={5} className="input" value={content} onChange={(e) => setContent(e.target.value)} required />
      </div>
      <div className="flex gap-2">
        <button type="submit" className="btn">등록</button>
        <button type="button" className="btn-outline" onClick={onCancel}>취소</button>
      </div>
    </form>
  )
}
