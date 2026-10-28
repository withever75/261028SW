import type { ResearchProject } from '../types'

// ✏️ 내 연구 내용을 바꾸려면 이 파일을 수정하세요. (샘플 데이터입니다)
export const researchProjects: ResearchProject[] = [
  {
    id: 'r1',
    title: '학령기 아동의 정서 조절 능력과 또래관계 연구',
    summary: '초등학생의 정서 조절 전략이 또래관계의 질에 어떤 영향을 주는지 살펴보는 종단 연구 (샘플).',
    status: '진행 중',
    keywords: ['아동복지', '정서조절', '또래관계'],
    links: [{ label: '연구계획서 (Google Drive)', url: 'https://drive.google.com/' }],
    period: '2025.03 ~ 2027.02',
  },
  {
    id: 'r2',
    title: '보호대상아동의 자립준비 프로그램 효과성 분석',
    summary: '시설 및 가정위탁 보호 종료 예정 청소년을 위한 자립 지원 프로그램의 효과를 검토 (샘플).',
    status: '완료',
    keywords: ['아동복지', '자립지원', '프로그램평가'],
    links: [
      { label: '논문 보기', url: 'https://www.kci.go.kr/' },
      { label: '발표 자료', url: 'https://drive.google.com/' },
    ],
    period: '2023.03 ~ 2024.12',
  },
  {
    id: 'r3',
    title: '행동과학 관점의 부모교육 개입 모형 개발',
    summary: '행동 변화 이론을 적용한 부모교육 프로그램의 구성 요소와 개입 모형을 개발 (샘플).',
    status: '준비 중',
    keywords: ['행동과학', '부모교육', '개입모형'],
    links: [],
    period: '2026.09 ~',
  },
]
