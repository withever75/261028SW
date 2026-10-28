import { Link, useParams } from 'react-router-dom'
import PageTitle from '../components/PageTitle'
import Loading from '../components/Loading'
import PreviewBanner from '../components/PreviewBanner'
import CommentSection from '../components/CommentSection'
import { addComment, getPost } from '../services/discussionService'
import { formatDate, useAsync } from '../hooks'

export default function PostDetail() {
  const { id = '' } = useParams()
  const { data: post, loading, setData } = useAsync(() => getPost(id).then((p) => p ?? null), [id])

  async function handleAdd(content: string) {
    await addComment({ postId: id, content })
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
      </article>
      <CommentSection comments={post.comments} onAdd={handleAdd} />
    </>
  )
}
