import type { Post } from '../types'

// 토론 게시판 샘플 데이터 (가상의 내용이며 실제 연구 결과·개인정보가 아닙니다)
export const discussionTopics = ['정서 조절 연구', '자립준비 프로그램', '부모교육 모형']

export const samplePosts: Post[] = [
  {
    id: 'p1',
    topic: '정서 조절 연구',
    title: '정서 조절 척도 선정에 대한 의견을 구합니다',
    content: '초등 고학년 대상 설문에 어떤 정서 조절 척도가 적합할지 논의하고 싶습니다. 문항 수와 신뢰도를 함께 고려하면 좋겠습니다.',
    authorName: '김교수(샘플)',
    createdAt: '2026-10-20T09:00:00',
    comments: [
      { id: 'c1', postId: 'p1', authorName: '대학원생A(샘플)', content: '문항 수가 적은 단축형을 사용하는 것도 방법일 것 같습니다.', createdAt: '2026-10-21T14:30:00' },
      { id: 'c2', postId: 'p1', authorName: '대학원생B(샘플)', content: '선행연구에서 사용된 척도의 신뢰도를 표로 정리해 보겠습니다.', createdAt: '2026-10-22T10:10:00' },
    ],
  },
  {
    id: 'p2',
    topic: '자립준비 프로그램',
    title: '프로그램 효과성 분석 방법 논의',
    content: '사전-사후 비교 설계에서 통제집단 확보가 어려운 경우 어떤 대안이 있을지 의견 부탁드립니다.',
    authorName: '대학원생A(샘플)',
    createdAt: '2026-10-18T16:20:00',
    comments: [
      { id: 'c3', postId: 'p2', authorName: '김교수(샘플)', content: '성향점수매칭이나 비동등 비교집단 설계를 검토해 봅시다.', createdAt: '2026-10-19T09:40:00' },
    ],
  },
  {
    id: 'p3',
    topic: '부모교육 모형',
    title: '부모교육 회기 구성 초안 공유',
    content: '8회기 구성 초안을 공유합니다. 각 회기의 목표와 활동에 대한 피드백을 남겨 주세요.',
    authorName: '대학원생B(샘플)',
    createdAt: '2026-10-15T11:00:00',
    comments: [],
  },
]
