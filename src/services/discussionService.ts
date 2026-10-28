import {
  addDoc, collection, doc, getDoc, getDocs, increment, orderBy, query, serverTimestamp, Timestamp, writeBatch,
  type DocumentData,
} from 'firebase/firestore'
import { db } from '../firebase'
import * as mock from './discussionMock'
import type { Author, Comment, NewCommentInput, NewPostInput, Post } from '../types'

// 화면은 이 파일의 함수만 호출합니다.
// Firebase 설정이 있으면 Firestore(posts, posts/{id}/comments)를, 없으면 샘플 데이터를 사용합니다.
// 수정·삭제 권한은 화면이 아니라 firestore.rules가 최종적으로 막습니다.

const topics = ['정서 조절 연구', '자립준비 프로그램', '부모교육 모형']

// Firestore 시간값을 ISO 문자열로 변환 (저장 직후에는 null일 수 있음)
const toIso = (t: unknown): string => (t instanceof Timestamp ? t.toDate().toISOString() : new Date().toISOString())

function toPost(id: string, d: DocumentData, comments: Comment[] = []): Post {
  return {
    id,
    topic: d.topic,
    title: d.title,
    content: d.content,
    authorId: d.authorId,
    authorName: d.authorName,
    createdAt: toIso(d.createdAt),
    commentCount: d.commentCount ?? 0,
    comments,
  }
}

function toComment(postId: string, id: string, d: DocumentData): Comment {
  return { id, postId, authorId: d.authorId, authorName: d.authorName, content: d.content, createdAt: toIso(d.createdAt) }
}

export async function getTopics(): Promise<string[]> {
  return db ? topics : mock.getTopics()
}

export async function getPosts(): Promise<Post[]> {
  if (!db) return mock.getPosts()
  const snap = await getDocs(query(collection(db, 'posts'), orderBy('createdAt', 'desc')))
  return snap.docs.map((d) => toPost(d.id, d.data()))
}

export async function getPost(id: string): Promise<Post | undefined> {
  if (!db) return mock.getPost(id)
  const snap = await getDoc(doc(db, 'posts', id))
  if (!snap.exists()) return undefined
  const cs = await getDocs(query(collection(db, 'posts', id, 'comments'), orderBy('createdAt', 'asc')))
  return toPost(snap.id, snap.data(), cs.docs.map((c) => toComment(id, c.id, c.data())))
}

export async function addPost(input: NewPostInput, author: Author): Promise<Post> {
  if (!db) return mock.addPost(input, author)
  const ref = await addDoc(collection(db, 'posts'), {
    ...input,
    authorId: author.id,
    authorName: author.name,
    createdAt: serverTimestamp(),
    commentCount: 0,
  })
  return { id: ref.id, ...input, authorId: author.id, authorName: author.name, createdAt: new Date().toISOString(), commentCount: 0, comments: [] }
}

export async function addComment(input: NewCommentInput, author: Author): Promise<void> {
  if (!db) {
    await mock.addComment(input, author)
    return
  }
  const postRef = doc(db, 'posts', input.postId)
  const commentRef = doc(collection(postRef, 'comments'))
  const batch = writeBatch(db)
  batch.set(commentRef, { content: input.content, authorId: author.id, authorName: author.name, createdAt: serverTimestamp() })
  batch.update(postRef, { commentCount: increment(1) })
  await batch.commit()
}

export async function deleteComment(postId: string, commentId: string): Promise<void> {
  if (!db) return mock.deleteComment(postId, commentId)
  const postRef = doc(db, 'posts', postId)
  const batch = writeBatch(db)
  batch.delete(doc(postRef, 'comments', commentId))
  batch.update(postRef, { commentCount: increment(-1) })
  await batch.commit()
}

export async function deletePost(id: string): Promise<void> {
  if (!db) return mock.deletePost(id)
  const postRef = doc(db, 'posts', id)
  const cs = await getDocs(collection(postRef, 'comments'))
  const batch = writeBatch(db)
  cs.docs.forEach((c) => batch.delete(c.ref))
  batch.delete(postRef)
  await batch.commit()
}
