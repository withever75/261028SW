import { useState } from 'react'

// 로그인 자리: 지금은 "준비 중" 안내만 보여줍니다. (2단계에서 useAuth().signIn 연결)
export default function LoginButton() {
  const [show, setShow] = useState(false)
  return (
    <div className="relative">
      <button type="button" className="btn" onClick={() => setShow(!show)} aria-expanded={show}>
        로그인
      </button>
      {show && (
        <div role="status" className="absolute right-0 z-10 mt-2 w-56 rounded-md border border-slate-300 bg-white p-3 text-sm shadow-lg">
          로그인 기능은 준비 중입니다.
        </div>
      )}
    </div>
  )
}
