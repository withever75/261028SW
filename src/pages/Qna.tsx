import { useState, type FormEvent } from 'react'
import PageTitle from '../components/PageTitle'
import Loading from '../components/Loading'
import PreviewBanner from '../components/PreviewBanner'
import QuestionCard from '../components/QuestionCard'
import { useAuth } from '../context/AuthContext'
import { authorOf, useAsync } from '../hooks'
import { addQuestion, answerQuestion, deleteQuestion, getQuestions } from '../services/qnaService'

export default function Qna() {
  const { user, configured } = useAuth()
  const { data, loading, setData } = useAsync(getQuestions)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  // 미리보기 모드에서는 누구나 답변·삭제 체험 가능 (실제 권한은 서버 규칙이 결정)
  const isAdmin = !configured || user?.role === 'admin'
  const refresh = async () => setData(await getQuestions())

  async function handleAsk(e: FormEvent) {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return
    await addQuestion({ title: title.trim(), content: content.trim() }, authorOf(user))
    setTitle('')
    setContent('')
    await refresh()
  }

  return (
    <>
      <PageTitle title="질문과 답변" desc="궁금한 점을 남기면 교수님이 답변해 드립니다." />
      <PreviewBanner />
      <form onSubmit={handleAsk} className="card mb-6 space-y-3">
        <h2 className="text-lg font-semibold text-navy-900">질문하기</h2>
        <div>
          <label htmlFor="q-title" className="mb-1 block text-sm font-medium">제목</label>
          <input id="q-title" className="input" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="q-content" className="mb-1 block text-sm font-medium">내용</label>
          <textarea id="q-content" rows={4} className="input" value={content} onChange={(e) => setContent(e.target.value)} required />
        </div>
        <button type="submit" className="btn">질문 등록</button>
      </form>
      {loading ? <Loading /> : data?.length === 0 ? <p>아직 질문이 없습니다.</p> : (
        <div className="space-y-4">
          {data?.map((q) => (
            <QuestionCard
              key={q.id}
              question={q}
              canAnswer={isAdmin}
              canDelete={isAdmin || (!!user && user.id === q.authorId)}
              onAnswer={async (a) => { await answerQuestion(q.id, a); await refresh() }}
              onDelete={async () => {
                if (!window.confirm('이 질문을 삭제할까요?')) return
                await deleteQuestion(q.id)
                await refresh()
              }}
            />
          ))}
        </div>
      )}
    </>
  )
}
