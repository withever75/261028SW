import {
  addDoc, collection, deleteDoc, doc, getDocs, query, serverTimestamp, Timestamp, where,
  type DocumentData,
} from 'firebase/firestore'
import { db } from '../firebase'
import type { Author, Material, NewMaterialInput } from '../types'

// 프로젝트 자료실 데이터. Firebase 설정이 없으면 메모리(미리보기)로 동작합니다.
const toIso = (t: unknown): string => (t instanceof Timestamp ? t.toDate().toISOString() : new Date().toISOString())

function toMaterial(id: string, d: DocumentData): Material {
  return {
    id,
    projectId: d.projectId,
    kind: d.kind,
    title: d.title,
    url: d.url,
    note: d.note ?? '',
    authorId: d.authorId,
    authorName: d.authorName,
    createdAt: toIso(d.createdAt),
  }
}

let mock: Material[] = []
let nextId = 1

export async function getMaterials(projectId: string): Promise<Material[]> {
  if (!db) return mock.filter((m) => m.projectId === projectId)
  // 정렬은 화면에서 처리 (Firestore 복합 색인을 만들지 않아도 되도록)
  const snap = await getDocs(query(collection(db, 'materials'), where('projectId', '==', projectId)))
  return snap.docs.map((d) => toMaterial(d.id, d.data())).sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

export async function addMaterial(input: NewMaterialInput, author: Author): Promise<void> {
  if (!db) {
    mock = [{ id: `m${nextId++}`, ...input, authorId: author.id, authorName: author.name, createdAt: new Date().toISOString() }, ...mock]
    return
  }
  await addDoc(collection(db, 'materials'), { ...input, authorId: author.id, authorName: author.name, createdAt: serverTimestamp() })
}

export async function deleteMaterial(id: string): Promise<void> {
  if (!db) {
    mock = mock.filter((m) => m.id !== id)
    return
  }
  await deleteDoc(doc(db, 'materials', id))
}
