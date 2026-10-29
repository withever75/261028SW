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
  allowed: boolean // 관리자가 승인한 사용자만 토론 이용 가능
}

// 글·댓글 작성자 정보
export interface Author {
  id: string
  name: string
}

export interface Comment {
  id: string
  postId: string
  authorId: string
  authorName: string
  content: string
  createdAt: string // ISO 날짜 문자열
}

export interface Post {
  id: string
  topic: string // 연구 주제(게시판)
  title: string
  content: string
  authorId: string
  authorName: string
  createdAt: string
  commentCount: number
  comments: Comment[] // 목록에서는 비어 있고, 상세(getPost)에서만 채워짐
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

// 논문·저술 (Google Scholar에서 복사해 data 파일에 직접 입력)
export interface Publication {
  id: string
  title: string
  authors: string
  venue: string // 학술지/학회명
  year: number
  url?: string // 논문 링크 (DOI, KCI, Scholar 등)
}

// 대학원생 질문과 교수 답변
export interface Question {
  id: string
  title: string
  content: string
  authorId: string
  authorName: string
  createdAt: string
  answer?: string // 교수(관리자)가 작성
  answeredAt?: string
}
export interface NewQuestionInput {
  title: string
  content: string
}

// 프로젝트 자료실: 논문과 작업 중인 파일은 파일 업로드가 아니라 외부 링크로 등록
export type MaterialKind = '논문' | '작업 파일'
export interface Material {
  id: string
  projectId: string
  kind: MaterialKind
  title: string
  url: string
  note: string // 저자·연도, 파일 설명 등
  authorId: string
  authorName: string
  createdAt: string
}
export interface NewMaterialInput {
  projectId: string
  kind: MaterialKind
  title: string
  url: string
  note: string
}

// ---- 개인 공간 (본인만 볼 수 있음) ----
export interface DiaryEntry {
  id: string
  date: string // YYYY-MM-DD
  title: string
  content: string
  createdAt: string
}
export type TodoCategory = '연구' | '수업' | '기타'
export interface Todo {
  id: string
  text: string
  done: boolean
  due: string // YYYY-MM-DD, 없으면 빈 문자열
  category: TodoCategory
  createdAt: string
}
export type ResourceKind = '연구' | '수업'
export interface ResourceItem {
  id: string
  kind: ResourceKind
  title: string
  url: string // 외부 링크(없으면 빈 문자열)
  note: string
  tags: string[]
  createdAt: string
}
