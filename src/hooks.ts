import { useEffect, useState } from 'react'
import { useAuth } from './context/AuthContext'
import type { Author, User } from './types'

// 서비스 함수를 불러와 로딩 상태와 함께 돌려주는 작은 훅
export function useAsync<T>(load: () => Promise<T>, deps: unknown[] = []) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    let alive = true
    setLoading(true)
    load().then((d) => {
      if (alive) {
        setData(d)
        setLoading(false)
      }
    })
    return () => {
      alive = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
  return { data, loading, setData }
}

// 오늘 날짜 (YYYY-MM-DD, 내 컴퓨터 기준)
export const today = () => new Date().toLocaleDateString('sv-SE')

// 로그인 사용자의 개인 공간 ID (미리보기에서는 guest)
export function useOwnerId() {
  const { user } = useAuth()
  return user?.id ?? 'guest'
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })
}

// 글·댓글 작성자 정보 (비로그인 미리보기에서는 방문자)
export function authorOf(user: User | null): Author {
  return user ? { id: user.id, name: user.name } : { id: 'guest', name: '방문자(미리보기)' }
}
