import { discussionTopics, samplePosts } from '../data/discussionData'
import type { Comment, NewCommentInput, NewPostInput, Post } from '../types'

// 지금은 메모리(변수)에만 저장되어 새로고침하면 초기화됩니다.
// 2단계: 이 파일 안에서만 Firestore(posts, posts/{id}/comments) 호출로 교체합니다.
let posts: Post[] = samplePosts.map((p) => ({ ...p, comments: [...p.comments] }))
let nextId = 100

// 현재 사용자 이름 (2단계에서는 로그인 사용자 정보로 대체)
const GUEST_NAME = '방문자(미리보기)'

export async function getTopics(): Promise<string[]> {
  return discussionTopics
}

export async function getPosts(): Promise<Post[]> {
  return [...posts].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

export async function getPost(id: string): Promise<Post | undefined> {
  return posts.find((p) => p.id === id)
}

export async function addPost(input: NewPostInput): Promise<Post> {
  const post: Post = {
    id: `p${nextId++}`,
    ...input,
    authorName: GUEST_NAME,
    createdAt: new Date().toISOString(),
    comments: [],
  }
  posts = [post, ...posts]
  return post
}

export async function addComment(input: NewCommentInput): Promise<Comment> {
  const post = posts.find((p) => p.id === input.postId)
  if (!post) throw new Error('글을 찾을 수 없습니다.')
  const comment: Comment = {
    id: `c${nextId++}`,
    postId: input.postId,
    content: input.content,
    authorName: GUEST_NAME,
    createdAt: new Date().toISOString(),
  }
  // 새 객체로 교체해 화면이 갱신되도록 함
  posts = posts.map((p) => (p.id === post.id ? { ...p, comments: [...p.comments, comment] } : p))
  return comment
}
