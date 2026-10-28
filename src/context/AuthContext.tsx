import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut as fbSignOut } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db, isFirebaseConfigured } from '../firebase'
import type { User } from '../types'

interface AuthValue {
  user: User | null
  loading: boolean
  configured: boolean // Firebase 설정 여부 (false면 미리보기 모드)
  signIn: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthValue>({
  user: null,
  loading: false,
  configured: false,
  signIn: async () => {},
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(isFirebaseConfigured)

  useEffect(() => {
    if (!auth || !db) return
    const firestore = db
    return onAuthStateChanged(auth, async (fbUser) => {
      if (!fbUser) {
        setUser(null)
        setLoading(false)
        return
      }
      // users/{uid} 문서를 읽고, 처음 로그인이면 "미승인 일반 회원"으로 만듭니다.
      const ref = doc(firestore, 'users', fbUser.uid)
      let snap = await getDoc(ref)
      if (!snap.exists()) {
        await setDoc(ref, {
          name: fbUser.displayName ?? '이름 없음',
          email: fbUser.email ?? '',
          role: 'member',
          allowed: false,
        })
        snap = await getDoc(ref)
      }
      const d = snap.data()!
      setUser({ id: fbUser.uid, name: d.name, email: d.email, role: d.role, allowed: d.allowed === true })
      setLoading(false)
    })
  }, [])

  const value: AuthValue = {
    user,
    loading,
    configured: isFirebaseConfigured,
    signIn: async () => {
      if (auth) await signInWithPopup(auth, new GoogleAuthProvider())
    },
    signOut: async () => {
      if (auth) await fbSignOut(auth)
    },
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext)
}
