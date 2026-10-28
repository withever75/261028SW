// 앱 전체에서 쓰는 데이터 모양(타입) 정의

export type ProjectStatus = '진행 중' | '완료' | '준비 중'

// 외부 링크 (논문·자료는 파일 업로드 대신 링크로 연결)
export interface ExternalLink {
  label: string
  url: string
}

export interface ResearchProject {
  id: string
  title: string
  summary: string
  status: ProjectStatus
  keywords: string[]
  links: ExternalLink[]
  period: string
}

export interface WeeklyMaterial {
  week: number
  topic: string
  url: string
}

export interface Course {
  id: string
  name: string
  semester: string
  description: string
  materials: WeeklyMaterial[]
}

export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'member'
}

export interface Comment {
  id: string
  postId: string
  authorName: string
  content: string
  createdAt: string // ISO 날짜 문자열
}

export interface Post {
  id: string
  topic: string // 연구 주제(게시판)
  title: string
  content: string
  authorName: string
  createdAt: string
  comments: Comment[]
}

// 새 글/댓글 작성 시 입력값
export interface NewPostInput {
  topic: string
  title: string
  content: string
}
export interface NewCommentInput {
  postId: string
  content: string
}
