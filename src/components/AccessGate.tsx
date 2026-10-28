import { Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Loading from './Loading'
import PageTitle from './PageTitle'

// 사이트 입구: 로그인 + 교수님 승인된 사용자만 통과 (Firebase 미설정 미리보기 모드는 항상 통과)
export default function AccessGate() {
  const { user, loading, configured, signIn } = useAuth()
  if (!configured) return <Outlet />
  if (loading) return <Loading />
  if (!user) {
    return (
      <>
        <PageTitle title="로그인이 필요합니다" />
        <p className="mb-4">이 사이트는 승인된 구성원만 이용할 수 있습니다. Google 계정으로 로그인해 주세요.</p>
        <button type="button" className="btn" onClick={() => signIn().catch(() => {})}>Google 로그인</button>
      </>
    )
  }
  if (!user.allowed) {
    return (
      <>
        <PageTitle title="승인 대기 중" />
        <p role="status" className="rounded-md border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
          {user.name}님, 로그인되었습니다. 교수님의 승인을 받으면 사이트를 이용할 수 있습니다. ({user.email})
        </p>
      </>
    )
  }
  return <Outlet />
}
