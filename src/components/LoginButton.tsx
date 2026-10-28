import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function LoginButton() {
  const { user, loading, configured, signIn, signOut } = useAuth()
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')

  // 설정 전(미리보기)에는 "준비 중" 안내만 표시
  if (!configured) {
    return (
      <div className="relative">
        <button type="button" className="btn" onClick={() => setShow(!show)} aria-expanded={show}>로그인</button>
        {show && (
          <div role="status" className="absolute right-0 z-10 mt-2 w-56 rounded-md border border-slate-300 bg-white p-3 text-sm shadow-lg">
            로그인 기능은 준비 중입니다.
          </div>
        )}
      </div>
    )
  }
  if (loading) return <span className="text-sm text-slate-600">확인 중...</span>
  if (user) {
    return (
      <div className="flex items-center gap-2">
        <span className="hidden text-sm sm:inline">{user.name}</span>
        <button type="button" className="btn-outline" onClick={signOut}>로그아웃</button>
      </div>
    )
  }
  return (
    <div className="relative">
      <button
        type="button"
        className="btn"
        onClick={() => signIn().catch(() => setError('로그인에 실패했습니다. 다시 시도해 주세요.'))}
      >
        Google 로그인
      </button>
      {error && <p role="alert" className="absolute right-0 mt-2 w-56 rounded-md border bg-white p-3 text-sm shadow-lg">{error}</p>}
    </div>
  )
}
