import {
  addDoc, collection, deleteDoc, doc, getDocs, query, serverTimestamp, Timestamp, updateDoc, where,
} from 'firebase/firestore'
import { db } from '../firebase'

// 개인 공간(일기·할 일·자료 모음)용 저장소. 내 글만 읽고 쓸 수 있습니다(서버 규칙이 확인).
// Firebase 설정이 없으면 메모리(미리보기)로 동작합니다.
type Item = { id: string; createdAt: string }
type Input<T> = Omit<T, 'id' | 'createdAt'>

const toIso = (t: unknown): string => (t instanceof Timestamp ? t.toDate().toISOString() : new Date().toISOString())

export function createStore<T extends Item>(name: string) {
  let mock: (T & { ownerId: string })[] = []
  let nextId = 1

  return {
    async list(ownerId: string): Promise<T[]> {
      if (!db) return mock.filter((m) => m.ownerId === ownerId)
      // 규칙상 내 문서만 조회 가능. 정렬은 화면에서 처리(색인 불필요)
      const snap = await getDocs(query(collection(db, name), where('authorId', '==', ownerId)))
      return snap.docs.map((d) => ({ ...d.data(), id: d.id, createdAt: toIso(d.data().createdAt) }) as unknown as T)
    },
    async add(ownerId: string, data: Input<T>): Promise<void> {
      if (!db) {
        mock = [{ ...(data as object), id: `l${nextId++}`, createdAt: new Date().toISOString(), ownerId } as unknown as T & { ownerId: string }, ...mock]
        return
      }
      await addDoc(collection(db, name), { ...data, authorId: ownerId, createdAt: serverTimestamp() })
    },
    async update(id: string, patch: Partial<Input<T>>): Promise<void> {
      if (!db) {
        mock = mock.map((m) => (m.id === id ? { ...m, ...patch } : m))
        return
      }
      await updateDoc(doc(db, name, id), patch as object)
    },
    async remove(id: string): Promise<void> {
      if (!db) {
        mock = mock.filter((m) => m.id !== id)
        return
      }
      await deleteDoc(doc(db, name, id))
    },
  }
}
