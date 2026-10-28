import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageTitle from '../components/PageTitle'
import Loading from '../components/Loading'
import PreviewBanner from '../components/PreviewBanner'
import PostForm from '../components/PostForm'
import { addPost, getPosts, getTopics } from '../services/discussionService'
import { useAuth } from '../context/AuthContext'
import { authorOf, formatDate, useAsync } from '../hooks'
import type { NewPostInput } from '../types'

export default function Discussion() {
  const { user } = useAuth()
  const posts = useAsync(getPosts)
  const topics = useAsync(getTopics)
  const [writing, setWriting] = useState(false)
  const [topic, setTopic] = useState('')

  async function handleSubmit(input: NewPostInput) {
    await addPost(input, authorOf(user))
    posts.setData(await getPosts())
    setWriting(false)
  }

  const list = (posts.data ?? []).filter((p) => !topic || p.topic === topic)

  return (
    <>
      <PageTitle title="토론" desc="연구 주제별로 의견을 나누는 게시판입니다." />
      <PreviewBanner />
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <label htmlFor="topic-filter" className="mr-2 text-sm font-medium">주제</label>
          <select id="topic-filter" className="rounded-md border border-slate-400 px-3 py-2 text-sm" value={topic} onChange={(e) => setTopic(e.target.value)}>
            <option value="">전체</option>
            {topics.data?.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
        {!writing && <button type="button" className="btn" onClick={() => setWriting(true)}>글쓰기</button>}
      </div>
      {writing && topics.data && <PostForm topics={topics.data} onSubmit={handleSubmit} onCancel={() => setWriting(false)} />}
      {posts.loading ? <Loading /> : list.length === 0 ? <p>글이 없습니다.</p> : (
        <ul className="space-y-3">
          {list.map((p) => (
            <li key={p.id} className="card">
              <span className="tag">{p.topic}</span>
              <h2 className="mt-2 text-lg font-semibold">
                <Link to={`/discussion/${p.id}`} className="text-navy-800 hover:underline">{p.title}</Link>
              </h2>
              <p className="mt-1 text-xs text-slate-600">{p.authorName} · {formatDate(p.createdAt)} · 댓글 {p.commentCount}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
