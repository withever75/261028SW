import { Link } from 'react-router-dom'
import PageTitle from '../components/PageTitle'

export default function NotFound() {
  return (
    <>
      <PageTitle title="페이지를 찾을 수 없습니다" />
      <Link to="/" className="text-navy-700 underline">홈으로 돌아가기</Link>
    </>
  )
}
