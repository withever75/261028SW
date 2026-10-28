import { Link, useNavigate, useParams } from 'react-router-dom'
import PageTitle from '../components/PageTitle'
import Loading from '../components/Loading'
import PreviewBanner from '../components/PreviewBanner'
import CommentSection from '../components/CommentSection'
import { addComment, deleteComment, deletePost, getPost } from '../services/discussionService'
import { useAuth } from '../context/AuthContext'
import { authorOf, formatDate, useAsync } from '../hooks'
import type { Comment } from '../types'

export default function PostDetail() {
  const { id = '' } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const { data: post, loading, setData } = useAsync(() => getPost(id).then((p) => p ?? null), [id])

  async function handleAdd(content: string) {
    await addComment({ postId: id, content }, authorOf(user))
    setData((await getPost(id)) ?? null)
  }

  // 작성자 또는 관리자만 삭제 버튼 표시 (최종 권한 확인은 서버 규칙이 담당)
  const canDelete = (authorId: string) => !!user && (user.id === authorId || user.role === 'admin')

  async function handleDeletePost() {
    if (!window.confirm('이 글을 삭제할까요?')) return
    await deletePost(id)
    navigate('/discussion')
  }

  async function handleDeleteComment(c: Comment) {
    if (!window.confirm('이 댓글을 삭제할까요?')) return
    await deleteComment(id, c.id)
    setData((await getPost(id)) ?? null)
  }

  if (loading) return <Loading />
  if (!post) {
    return (
      <>
        <PageTitle title="글을 찾을 수 없습니다" />
        <Link to="/discussion" className="text-navy-700 underline">목록으로</Link>
      </>
    )
  }
  return (
    <>
      <PreviewBanner />
      <Link to="/discussion" className="text-sm text-navy-700 underline">← 목록으로</Link>
      <article className="mt-4">
        <span className="tag">{post.topic}</span>
        <PageTitle title={post.title} />
        <p className="-mt-4 mb-4 text-xs text-slate-600">{post.authorName} · {formatDate(post.createdAt)}</p>
        <p className="whitespace-pre-wrap">{post.content}</p>
        {canDelete(post.authorId) && (
          <button type="button" className="btn-outline mt-4" onClick={handleDeletePost}>글 삭제</button>
        )}
      </article>
      <CommentSection comments={post.comments} onAdd={handleAdd} canDelete={(c) => canDelete(c.authorId)} onDelete={handleDeleteComment} />
    </>
  )
}
