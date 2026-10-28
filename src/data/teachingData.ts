import type { Course } from '../types'

// ✏️ 수업 자료를 바꾸려면 이 파일을 수정하세요. (샘플 데이터입니다)
export const courses: Course[] = [
  {
    id: 'c1',
    name: '아동복지론',
    semester: '2026년 2학기',
    description: '아동복지의 이념과 정책, 실천 현장을 이해하는 과목 (샘플).',
    materials: [
      { week: 1, topic: '강의 소개 및 아동복지의 개념', url: 'https://drive.google.com/' },
      { week: 2, topic: '아동의 권리와 아동복지 역사', url: 'https://drive.google.com/' },
      { week: 3, topic: '아동학대 예방과 보호 체계', url: 'https://drive.google.com/' },
      { week: 4, topic: '가정위탁과 시설보호', url: 'https://drive.google.com/' },
    ],
  },
  {
    id: 'c2',
    name: '인간행동과 사회환경',
    semester: '2026년 2학기',
    description: '인간 발달과 행동을 생태체계적 관점에서 이해하는 과목 (샘플).',
    materials: [
      { week: 1, topic: '인간행동 이해를 위한 이론적 관점', url: 'https://drive.google.com/' },
      { week: 2, topic: '생태체계 이론', url: 'https://drive.google.com/' },
      { week: 3, topic: '애착 이론과 초기 발달', url: 'https://drive.google.com/' },
    ],
  },
]
