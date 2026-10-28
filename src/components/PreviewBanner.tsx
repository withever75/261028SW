import { useAuth } from '../context/AuthContext'

// Firebase가 연결되면 자동으로 사라집니다.
export default function PreviewBanner() {
  const { configured } = useAuth()
  if (configured) return null
  return (
    <div role="note" className="mb-6 rounded-md border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
      현재는 미리보기입니다. 로그인 및 저장 기능은 곧 추가됩니다.
    </div>
  )
}
