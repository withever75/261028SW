import { createContext, useContext, type ReactNode } from 'react'
import type { User } from '../types'

interface AuthValue {
  user: User | null
  loading: boolean
  signIn: () => Promise<void>
  signOut: () => Promise<void>
}

// 지금은 항상 "비로그인" 상태를 돌려주는 껍데기입니다.
// 2단계: Firebase Google 로그인으로 이 파일만 교체하면 됩니다.
const AuthContext = createContext<AuthValue>({
  user: null,
  loading: false,
  signIn: async () => {},
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const value: AuthValue = {
    user: null,
    loading: false,
    signIn: async () => {},
    signOut: async () => {},
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext)
}
