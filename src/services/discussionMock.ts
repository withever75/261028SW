import { discussionTopics, samplePosts } from '../data/discussionData'
import type { Author, Comment, NewCommentInput, NewPostInput, Post } from '../types'

// 미리보기 모드(Firebase 설정 없음)용: 메모리에만 저장되어 새로고침하면 초기화됩니다.
let nextId = 100
let posts: Post[] = samplePosts.map((p) => ({
  ...p,
  authorId: 'sample',
  commentCount: p.comments.length,
  comments: p.comments.map((c) => ({ ...c, authorId: 'sample' })),
}))

export const getTopics = async (): Promise<string[]> => discussionTopics

export const getPosts = async (): Promise<Post[]> =>
  [...posts].sort((a, b) => b.createdAt.localeCompare(a.createdAt))

export const getPost = async (id: string): Promise<Post | undefined> => posts.find((p) => p.id === id)

export async function addPost(input: NewPostInput, author: Author): Promise<Post> {
  const post: Post = {
    id: `p${nextId++}`,
    ...input,
    authorId: author.id,
    authorName: author.name,
    createdAt: new Date().toISOString(),
    commentCount: 0,
    comments: [],
  }
  posts = [post, ...posts]
  return post
}

export async function addComment(input: NewCommentInput, author: Author): Promise<Comment> {
  const comment: Comment = {
    id: `c${nextId++}`,
    postId: input.postId,
    content: input.content,
    authorId: author.id,
    authorName: author.name,
    createdAt: new Date().toISOString(),
  }
  posts = posts.map((p) =>
    p.id === input.postId ? { ...p, commentCount: p.commentCount + 1, comments: [...p.comments, comment] } : p,
  )
  return comment
}

export async function deletePost(id: string): Promise<void> {
  posts = posts.filter((p) => p.id !== id)
}

export async function deleteComment(postId: string, commentId: string): Promise<void> {
  posts = posts.map((p) =>
    p.id === postId
      ? { ...p, commentCount: p.commentCount - 1, comments: p.comments.filter((c) => c.id !== commentId) }
      : p,
  )
}
