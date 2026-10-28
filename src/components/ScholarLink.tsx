import { getScholarUrl } from '../services/researchService'

// Google Scholar 프로필로 연결 (새 탭)
export default function ScholarLink({ className = 'btn-outline' }: { className?: string }) {
  return (
    <a href={getScholarUrl()} target="_blank" rel="noopener noreferrer" className={className}>
      Google Scholar 프로필 ↗
    </a>
  )
}
