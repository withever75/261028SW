import { Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Loading from './Loading'
import PageTitle from './PageTitle'

// 토론 페이지 입구: 로그인 + 관리자 승인된 사용자만 통과 (미리보기 모드는 항상 통과)
export default function DiscussionGate() {
  const { user, loading, configured, signIn } = useAuth()
  if (!configured) return <Outlet />
  if (loading) return <Loading />
  if (!user) {
    return (
      <>
        <PageTitle title="토론" />
        <p className="mb-4">토론은 로그인 후 이용할 수 있습니다.</p>
        <button type="button" className="btn" onClick={() => signIn().catch(() => {})}>Google 로그인</button>
      </>
    )
  }
  if (!user.allowed) {
    return (
      <>
        <PageTitle title="토론" />
        <p role="status" className="rounded-md border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
          {user.name}님, 로그인되었습니다. 교수님의 승인을 받으면 토론에 참여할 수 있습니다. ({user.email})
        </p>
      </>
    )
  }
  return <Outlet />
}
