import type { Publication } from '../types'

// ✏️ Google Scholar 프로필 주소 (바꾸려면 따옴표 안만 수정)
export const scholarUrl = 'https://scholar.google.com/citations?user=ivEBX6UAAAAJ&hl=ko'

// ✏️ 논문 목록: Google Scholar에서 복사해 아래 형식으로 추가하세요. 최신순으로 적으면 됩니다.
// 목록이 비어 있으면 논문 영역은 화면에 나타나지 않고, Scholar 링크만 보입니다.
export const publications: Publication[] = [
  // {
  //   id: 'pub1',
  //   title: '논문 제목',
  //   authors: '양미연, 공저자',
  //   venue: '학술지명',
  //   year: 2025,
  //   url: 'https://doi.org/...',
  // },
]
