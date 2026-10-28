import {
  addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, serverTimestamp, Timestamp, updateDoc,
  type DocumentData,
} from 'firebase/firestore'
import { db } from '../firebase'
import type { Author, NewQuestionInput, Question } from '../types'

// 화면은 이 파일의 함수만 호출합니다. Firebase 설정이 없으면 메모리(미리보기)로 동작합니다.
// 답변은 관리자만 쓸 수 있고, 이는 firestore.rules가 서버에서 최종 확인합니다.

const toIso = (t: unknown): string => (t instanceof Timestamp ? t.toDate().toISOString() : new Date().toISOString())

function toQuestion(id: string, d: DocumentData): Question {
  return {
    id,
    title: d.title,
    content: d.content,
    authorId: d.authorId,
    authorName: d.authorName,
    createdAt: toIso(d.createdAt),
    answer: d.answer,
    answeredAt: d.answeredAt ? toIso(d.answeredAt) : undefined,
  }
}

// 미리보기용 샘플 (가상의 질문)
let mock: Question[] = [
  {
    id: 'q1',
    title: '스코핑 리뷰에서 검색 데이터베이스는 몇 개가 적당한가요?',
    content: '아동복지 주제로 스코핑 리뷰를 준비 중입니다. 최소 몇 개의 데이터베이스를 검색하면 좋을지 궁금합니다.',
    authorId: 'sample',
    authorName: '대학원생A(샘플)',
    createdAt: '2026-10-25T10:00:00',
    answer: '보통 3개 이상을 권장합니다. 주제 분야 DB와 종합 DB를 함께 쓰면 좋습니다. (샘플 답변)',
    answeredAt: '2026-10-26T09:00:00',
  },
]
let nextId = 100

export async function getQuestions(): Promise<Question[]> {
  if (!db) return [...mock].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  const snap = await getDocs(query(collection(db, 'questions'), orderBy('createdAt', 'desc')))
  return snap.docs.map((d) => toQuestion(d.id, d.data()))
}

export async function addQuestion(input: NewQuestionInput, author: Author): Promise<void> {
  if (!db) {
    mock = [{ id: `q${nextId++}`, ...input, authorId: author.id, authorName: author.name, createdAt: new Date().toISOString() }, ...mock]
    return
  }
  await addDoc(collection(db, 'questions'), {
    ...input,
    authorId: author.id,
    authorName: author.name,
    createdAt: serverTimestamp(),
  })
}

export async function answerQuestion(id: string, answer: string): Promise<void> {
  if (!db) {
    mock = mock.map((q) => (q.id === id ? { ...q, answer, answeredAt: new Date().toISOString() } : q))
    return
  }
  await updateDoc(doc(db, 'questions', id), { answer, answeredAt: serverTimestamp() })
}

export async function deleteQuestion(id: string): Promise<void> {
  if (!db) {
    mock = mock.filter((q) => q.id !== id)
    return
  }
  await deleteDoc(doc(db, 'questions', id))
}
